"""
HWP 파서 (한글 문서)
===================
한글(.hwp) 문서를 파싱하여 텍스트 및 테이블 추출

요구사항: pip install olefile
"""

import os
import json
import struct
import zlib
from datetime import datetime
from typing import Dict, List, Any, Optional


def parse_hwp(file_path: str) -> Dict[str, Any]:
    """HWP 파일 파싱"""
    try:
        import olefile
    except ImportError:
        return {"error": "olefile 설치 필요: pip install olefile"}
    
    filename = os.path.basename(file_path)
    
    try:
        ole = olefile.OleFileIO(file_path)
    except Exception as e:
        return {"error": f"HWP 파일 열기 실패: {str(e)}"}
    
    # 문서 정보 추출
    doc_info = {}
    if ole.exists("DocInfo"):
        try:
            doc_info_data = ole.openstream("DocInfo").read()
            doc_info["size"] = len(doc_info_data)
        except:
            pass
    
    # 본문 텍스트 추출
    paragraphs = []
    tables = []
    
    # BodyText 섹션 읽기
    for i in range(256):
        section_name = f"BodyText/Section{i}"
        if not ole.exists(section_name):
            break
        
        try:
            section_data = ole.openstream(section_name).read()
            
            # 압축 여부 확인 후 압축 해제
            if ole.exists("FileHeader"):
                header = ole.openstream("FileHeader").read()
                if len(header) >= 36:
                    flags = struct.unpack("<I", header[32:36])[0]
                    if flags & 1:  # 압축됨
                        try:
                            section_data = zlib.decompress(section_data, -15)
                        except:
                            pass
            
            # 텍스트 추출 (한글 인코딩)
            text = extract_text_from_section(section_data)
            if text:
                paragraphs.extend(text)
        except Exception as e:
            continue
    
    ole.close()
    
    return {
        "filename": filename,
        "type": "hwp",
        "parsed_at": datetime.now().isoformat(),
        "content": {
            "paragraphs": paragraphs,
            "paragraph_count": len(paragraphs),
            "tables": tables,
            "doc_info": doc_info
        },
        "extracted": {
            "text_preview": "\n".join(paragraphs[:5]) if paragraphs else ""
        }
    }


def extract_text_from_section(data: bytes) -> List[str]:
    """섹션 데이터에서 텍스트 추출"""
    paragraphs = []
    current_text = []
    
    i = 0
    while i < len(data):
        try:
            # 레코드 헤더 읽기
            if i + 4 > len(data):
                break
            
            header = struct.unpack("<I", data[i:i+4])[0]
            tag_id = header & 0x3FF
            level = (header >> 10) & 0x3FF
            size = (header >> 20) & 0xFFF
            
            if size == 0xFFF:
                if i + 8 > len(data):
                    break
                size = struct.unpack("<I", data[i+4:i+8])[0]
                i += 8
            else:
                i += 4
            
            if i + size > len(data):
                break
            
            record_data = data[i:i+size]
            i += size
            
            # HWPTAG_PARA_TEXT (67) - 문단 텍스트
            if tag_id == 67:
                try:
                    text = record_data.decode('utf-16-le', errors='ignore')
                    # 특수 문자 제거
                    text = ''.join(c for c in text if c.isprintable() or c in '\n\t ')
                    text = text.strip()
                    if text and len(text) > 1:
                        paragraphs.append(text)
                except:
                    pass
        except:
            break
    
    return paragraphs


def main():
    import argparse
    parser = argparse.ArgumentParser(description="HWP 파서")
    parser.add_argument("--file", "-f", required=True, help="HWP 파일 경로")
    parser.add_argument("--output", "-o", help="출력 파일")
    
    args = parser.parse_args()
    
    result = parse_hwp(args.file)
    
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        print(f"✅ 저장: {args.output}")
    else:
        print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
