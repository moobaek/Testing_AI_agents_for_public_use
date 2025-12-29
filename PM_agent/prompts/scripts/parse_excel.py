"""
엑셀 문서 파서 (Excel Parser)
============================
주간보고, 견적서, 이슈리스트 등 XLSX/XLS 파일 파싱

사용법:
    python parse_excel.py --file <파일경로> --type <문서유형>
"""

import os
import sys
import json
import re
from datetime import datetime
from typing import Dict, List, Any, Optional


def parse_weekly_report(file_path: str) -> Dict[str, Any]:
    """주간보고 XLSX 파싱"""
    try:
        import pandas as pd
    except ImportError:
        return {"error": "pandas 설치 필요: pip install pandas openpyxl"}
    
    filename = os.path.basename(file_path)
    engine = 'xlrd' if file_path.endswith('.xls') else 'openpyxl'
    
    try:
        sheets = pd.read_excel(file_path, sheet_name=None, engine=engine)
    except Exception as e:
        return {"error": str(e)}
    
    # 날짜 추출
    date_match = re.search(r'(\d{6})', filename)
    report_date = None
    if date_match:
        d = date_match.group(1)
        report_date = f"20{d[:2]}-{d[2:4]}-{d[4:6]}"
    
    content = {}
    progress_data = []
    issues = []
    
    for sheet_name, df in sheets.items():
        df = df.fillna('')
        headers = df.columns.tolist()
        rows = df.values.tolist()
        
        content[sheet_name] = {
            "headers": [str(h) for h in headers],
            "rows": [[str(cell) for cell in row] for row in rows],
            "row_count": len(rows)
        }
        
        # 진척률 추출
        for col in headers:
            if '진척' in str(col) or '진행' in str(col) or '%' in str(col):
                for row in rows:
                    for cell in row:
                        if '%' in str(cell) or (isinstance(cell, (int, float)) and 0 <= cell <= 100):
                            try:
                                rate = float(str(cell).replace('%', ''))
                                if 0 <= rate <= 100:
                                    progress_data.append(rate)
                            except:
                                pass
        
        # 이슈 추출
        for i, col in enumerate(headers):
            if '이슈' in str(col) or '문제' in str(col) or 'issue' in str(col).lower():
                for row in rows:
                    if len(row) > i and str(row[i]).strip():
                        issues.append(str(row[i]))
    
    # 진행률 계산
    avg_progress = sum(progress_data) / len(progress_data) if progress_data else None
    
    return {
        "filename": filename,
        "type": "weekly_report",
        "parsed_at": datetime.now().isoformat(),
        "report_date": report_date,
        "content": content,
        "sheet_count": len(sheets),
        "extracted": {
            "progress_rate": avg_progress,
            "issues": issues,
            "issue_count": len(issues)
        },
        "sync_suggestions": [
            {
                "type": "Progress_Tracker",
                "reason": "진행률 업데이트"
            }
        ] if avg_progress else [],
        "template": "2_project_execution/01_status_report/weekly_report.md"
    }


def parse_quotation(file_path: str) -> Dict[str, Any]:
    """견적서 XLSX/XLS 파싱"""
    try:
        import pandas as pd
    except ImportError:
        return {"error": "pandas 설치 필요"}
    
    filename = os.path.basename(file_path)
    engine = 'xlrd' if file_path.endswith('.xls') else 'openpyxl'
    
    try:
        sheets = pd.read_excel(file_path, sheet_name=None, engine=engine)
    except Exception as e:
        return {"error": str(e)}
    
    content = {}
    amounts = []
    
    for sheet_name, df in sheets.items():
        df = df.fillna('')
        headers = df.columns.tolist()
        rows = df.values.tolist()
        
        content[sheet_name] = {
            "headers": [str(h) for h in headers],
            "rows": [[str(cell) for cell in row] for row in rows]
        }
        
        # 금액 추출
        for row in rows:
            for cell in row:
                cell_str = str(cell)
                # 숫자 추출 (쉼표 제거)
                num_match = re.search(r'[\d,]+', cell_str.replace(' ', ''))
                if num_match:
                    try:
                        amount = int(num_match.group().replace(',', ''))
                        if amount > 10000:  # 만원 이상만
                            amounts.append(amount)
                    except:
                        pass
    
    # 총액 추정
    total_amount = max(amounts) if amounts else None
    
    return {
        "filename": filename,
        "type": "quotation",
        "parsed_at": datetime.now().isoformat(),
        "content": content,
        "sheet_count": len(sheets),
        "extracted": {
            "estimated_total": total_amount,
            "amounts_found": len(amounts)
        },
        "template": "1_project_initiation/05_quotation/quotation_template.md"
    }


def parse_issue_list(file_path: str) -> Dict[str, Any]:
    """이슈리스트 XLSX 파싱"""
    try:
        import pandas as pd
    except ImportError:
        return {"error": "pandas 설치 필요"}
    
    filename = os.path.basename(file_path)
    engine = 'xlrd' if file_path.endswith('.xls') else 'openpyxl'
    
    try:
        sheets = pd.read_excel(file_path, sheet_name=None, engine=engine)
    except Exception as e:
        return {"error": str(e)}
    
    content = {}
    issues = []
    severity_count = {"Critical": 0, "High": 0, "Medium": 0, "Low": 0}
    
    for sheet_name, df in sheets.items():
        df = df.fillna('')
        headers = df.columns.tolist()
        rows = df.values.tolist()
        
        content[sheet_name] = {
            "headers": [str(h) for h in headers],
            "rows": [[str(cell) for cell in row] for row in rows]
        }
        
        # 이슈 추출
        for row in rows:
            row_text = ' '.join(str(cell) for cell in row).lower()
            issue = {"row": [str(cell) for cell in row]}
            
            # 심각도 분류
            if 'critical' in row_text or '긴급' in row_text or '심각' in row_text:
                issue["severity"] = "Critical"
                severity_count["Critical"] += 1
            elif 'high' in row_text or '높음' in row_text:
                issue["severity"] = "High"
                severity_count["High"] += 1
            elif 'medium' in row_text or '중간' in row_text or '보통' in row_text:
                issue["severity"] = "Medium"
                severity_count["Medium"] += 1
            elif 'low' in row_text or '낮음' in row_text:
                issue["severity"] = "Low"
                severity_count["Low"] += 1
            else:
                issue["severity"] = "Unknown"
            
            if any(str(cell).strip() for cell in row):
                issues.append(issue)
    
    # 연동 제안
    sync_suggestions = []
    if severity_count["Critical"] > 0 or severity_count["High"] > 0:
        sync_suggestions.append({
            "type": "Troubleshooting_Management",
            "reason": f"Critical: {severity_count['Critical']}건, High: {severity_count['High']}건"
        })
    
    return {
        "filename": filename,
        "type": "issue_list",
        "parsed_at": datetime.now().isoformat(),
        "content": content,
        "sheet_count": len(sheets),
        "extracted": {
            "total_issues": len(issues),
            "severity_count": severity_count,
            "issues": issues[:10]  # 처음 10개만
        },
        "sync_suggestions": sync_suggestions,
        "template": "2_project_execution/05_issue_list/issue_list.md"
    }


def main():
    import argparse
    parser = argparse.ArgumentParser(description="엑셀 파서")
    parser.add_argument("--file", "-f", required=True, help="파일 경로")
    parser.add_argument("--type", "-t", choices=["weekly", "quotation", "issue"], help="문서 유형")
    parser.add_argument("--output", "-o", help="출력 파일")
    
    args = parser.parse_args()
    
    # 유형별 파서 선택
    if args.type == "weekly":
        result = parse_weekly_report(args.file)
    elif args.type == "quotation":
        result = parse_quotation(args.file)
    elif args.type == "issue":
        result = parse_issue_list(args.file)
    else:
        # 파일명으로 자동 감지
        filename = os.path.basename(args.file).lower()
        if '주간' in filename or 'weekly' in filename:
            result = parse_weekly_report(args.file)
        elif '견적' in filename or 'quotation' in filename:
            result = parse_quotation(args.file)
        elif '이슈' in filename or 'issue' in filename:
            result = parse_issue_list(args.file)
        else:
            result = parse_weekly_report(args.file)  # 기본값
    
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        print(f"✅ 저장: {args.output}")
    else:
        print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
