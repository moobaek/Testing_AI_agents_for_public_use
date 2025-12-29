"""
PM Document Parser MCP Server
============================
FastMCP 기반 문서 파싱 MCP 서버

지원 형식: HWP, DOCX, XLSX, XLS, MD
"""

from mcp.server.fastmcp import FastMCP
import os
import json

# 파서 임포트
from parsers.hwp_parser import parse_hwp
from parsers.docx_parser import parse_docx
from parsers.meeting_parser import parse_meeting_docx
from parsers.excel_parser import parse_weekly_report, parse_quotation, parse_issue_list


# MCP 서버 생성
mcp = FastMCP("pm-document-parser")


@mcp.tool()
def parse_hwp_document(file_path: str) -> str:
    """
    한글(HWP) 문서를 파싱하여 JSON 반환
    
    Args:
        file_path: HWP 파일 경로
    
    Returns:
        파싱된 문서 내용 (JSON)
    """
    result = parse_hwp(file_path)
    return json.dumps(result, ensure_ascii=False, indent=2)


@mcp.tool()
def parse_word_document(file_path: str) -> str:
    """
    Word(DOCX) 문서를 파싱하여 JSON 반환
    
    Args:
        file_path: DOCX 파일 경로
    
    Returns:
        파싱된 문서 내용 (JSON)
    """
    result = parse_docx(file_path)
    return json.dumps(result, ensure_ascii=False, indent=2)


@mcp.tool()
def parse_meeting_document(file_path: str) -> str:
    """
    회의록(DOCX) 파싱 - 액션아이템 추출 및 연동 제안 포함
    
    Args:
        file_path: 회의록 DOCX 파일 경로
    
    Returns:
        파싱된 회의록 (액션아이템, 연동 제안 포함)
    """
    result = parse_meeting_docx(file_path)
    return json.dumps(result, ensure_ascii=False, indent=2)


@mcp.tool()
def parse_excel_document(file_path: str, doc_type: str = "auto") -> str:
    """
    엑셀(XLSX/XLS) 문서 파싱
    
    Args:
        file_path: 엑셀 파일 경로
        doc_type: 문서 유형 (weekly, quotation, issue, auto)
    
    Returns:
        파싱된 문서 내용 (JSON)
    """
    # 자동 감지
    if doc_type == "auto":
        filename = os.path.basename(file_path).lower()
        if "주간" in filename or "weekly" in filename:
            doc_type = "weekly"
        elif "견적" in filename or "quotation" in filename:
            doc_type = "quotation"
        elif "이슈" in filename or "issue" in filename:
            doc_type = "issue"
        else:
            doc_type = "weekly"  # 기본값
    
    # 유형별 파서 호출
    if doc_type == "weekly":
        result = parse_weekly_report(file_path)
    elif doc_type == "quotation":
        result = parse_quotation(file_path)
    elif doc_type == "issue":
        result = parse_issue_list(file_path)
    else:
        result = {"error": f"지원하지 않는 유형: {doc_type}"}
    
    return json.dumps(result, ensure_ascii=False, indent=2)


@mcp.tool()
def read_file_chunk(file_path: str, offset: int = 0, length: int = 2000) -> str:
    """
    파일의 일부분을 읽어 반환 (인코딩/포맷 확인용)
    
    Args:
        file_path: 파일 경로
        offset: 읽기 시작 위치 (기본 0)
        length: 읽을 바이트 수 (기본 2000)
    
    Returns:
        Hex 문자열 및 디코딩 시도 결과 (JSON)
    """
    try:
        with open(file_path, "rb") as f:
            f.seek(offset)
            data = f.read(length)
        
        # Hex 변환
        hex_data = data.hex()[:100] + "..." if len(data) > 50 else data.hex()
        
        # 텍스트 디코딩 시도
        decoded = {}
        for enc in ['utf-8', 'euc-kr', 'cp949', 'latin-1']:
            try:
                decoded[enc] = data.decode(enc)[:500] # 너무 길면 자름
            except:
                decoded[enc] = "<decode error>"
        
        return json.dumps({
            "size": len(data),
            "hex_preview": hex_data,
            "decoded_preview": decoded
        }, ensure_ascii=False, indent=2)
    except Exception as e:
        return json.dumps({"error": str(e)})


@mcp.tool()
def batch_parse_folder(folder_path: str) -> str:
    """
    폴더 내 모든 문서 일괄 파싱
    
    Args:
        folder_path: 폴더 경로
    
    Returns:
        파싱 결과 요약 (JSON)
    """
    supported_ext = ['.hwp', '.docx', '.xlsx', '.xls']
    results = {
        "folder": folder_path,
        "total": 0,
        "success": 0,
        "failed": 0,
        "documents": []
    }
    
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.startswith('~$'):
                continue
            
            ext = os.path.splitext(file)[1].lower()
            if ext not in supported_ext:
                continue
            
            file_path = os.path.join(root, file)
            results["total"] += 1
            
            try:
                if ext == '.hwp':
                    result = parse_hwp(file_path)
                elif ext == '.docx':
                    # 회의록 감지
                    if "회의" in file or "meeting" in file.lower():
                        result = parse_meeting_docx(file_path)
                    else:
                        result = parse_docx(file_path)
                elif ext in ['.xlsx', '.xls']:
                    filename_lower = file.lower()
                    if "주간" in filename_lower or "weekly" in filename_lower:
                        result = parse_weekly_report(file_path)
                    elif "견적" in filename_lower:
                        result = parse_quotation(file_path)
                    elif "이슈" in filename_lower:
                        result = parse_issue_list(file_path)
                    else:
                        result = parse_weekly_report(file_path)
                
                if "error" not in result:
                    results["success"] += 1
                else:
                    results["failed"] += 1
                
                results["documents"].append({
                    "filename": file,
                    "type": result.get("type", "unknown"),
                    "status": "success" if "error" not in result else "failed",
                    "content": result.get("content", {}), 
                    "extracted": result.get("extracted", {})
                })
            except Exception as e:
                results["failed"] += 1
                results["documents"].append({
                    "filename": file,
                    "error": str(e)
                })
    
    return json.dumps(results, ensure_ascii=False, indent=2)


@mcp.tool()
def scan_folder_files(folder_path: str) -> str:
    """
    폴더 내 "파싱 대상"이어야 하는 모든 유효 파일 목록 반환 (무결성 검증용)
    
    Args:
        folder_path: 대상 폴더 경로
        
    Returns:
        JSON: {"total": int, "files": [str], "ignored": [str]}
    """
    valid_files = []
    ignored_files = []
    
    # 무시할 패턴
    ignore_prefixes = ["~", ".", "_"] # 임시파일, 숨김파일, 시스템파일
    ignore_exts = [".tmp", ".bak", ".log", ".pyc"]
    
    for root, dirs, files in os.walk(folder_path):
        # 숨김 폴더 무시
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            file_path = os.path.join(root, file)
            # 검증: 무시할 파일인가?
            if any(file.startswith(p) for p in ignore_prefixes):
                ignored_files.append(file)
                continue
            if any(file.lower().endswith(e) for e in ignore_exts):
                ignored_files.append(file)
                continue
                
            # 나머지 모든 파일은 "잠재적 대상"으로 간주
            valid_files.append({
                "path": file_path,
                "name": file,
                "size": os.path.getsize(file_path)
            })
            
    return json.dumps({
        "total": len(valid_files),
        "files": valid_files,
        "ignored_count": len(ignored_files),
        "ignored_samples": ignored_files[:5]
    }, ensure_ascii=False, indent=2)


@mcp.resource("parse://readme")
def get_readme() -> str:
    """파서 사용법 반환"""
    return """
# PM Document Parser MCP Server

## 도구

| 도구 | 설명 |
|------|------|
| parse_hwp_document | 한글(HWP) 파싱 |
| parse_word_document | Word(DOCX) 파싱 |
| parse_meeting_document | 회의록 파싱 + 액션아이템 |
| parse_excel_document | 엑셀 파싱 (주간/견적/이슈) |
| batch_parse_folder | 폴더 일괄 파싱 |

## 예시

```python
parse_hwp_document("/path/to/document.hwp")
parse_meeting_document("/path/to/회의록.docx")
parse_excel_document("/path/to/주간보고.xlsx", doc_type="weekly")
batch_parse_folder("/path/to/folder")
```
"""


if __name__ == "__main__":
    mcp.run()
