"""
엑셀 파서 (주간보고, 견적서, 이슈리스트)
"""

import os
import re
from datetime import datetime
from typing import Dict, Any


def parse_weekly_report(file_path: str) -> Dict[str, Any]:
    """주간보고 XLSX 파싱"""
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
    
    date_match = re.search(r'(\d{6})', filename)
    report_date = f"20{date_match.group(1)[:2]}-{date_match.group(1)[2:4]}-{date_match.group(1)[4:6]}" if date_match else None
    
    content = {}
    progress_data = []
    
    for sheet_name, df in sheets.items():
        df = df.fillna('')
        content[sheet_name] = {
            "headers": [str(h) for h in df.columns.tolist()],
            "rows": [[str(cell) for cell in row] for row in df.values.tolist()]
        }
    
    return {
        "filename": filename,
        "type": "weekly_report",
        "parsed_at": datetime.now().isoformat(),
        "report_date": report_date,
        "content": content,
        "sync_suggestions": [{"type": "Progress_Tracker", "reason": "진행률 업데이트"}],
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
    for sheet_name, df in sheets.items():
        df = df.fillna('')
        content[sheet_name] = {
            "headers": [str(h) for h in df.columns.tolist()],
            "rows": [[str(cell) for cell in row] for row in df.values.tolist()]
        }
    
    return {
        "filename": filename,
        "type": "quotation",
        "parsed_at": datetime.now().isoformat(),
        "content": content,
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
    severity_count = {"Critical": 0, "High": 0, "Medium": 0, "Low": 0}
    
    for sheet_name, df in sheets.items():
        df = df.fillna('')
        content[sheet_name] = {
            "headers": [str(h) for h in df.columns.tolist()],
            "rows": [[str(cell) for cell in row] for row in df.values.tolist()]
        }
    
    sync = []
    if severity_count["Critical"] > 0 or severity_count["High"] > 0:
        sync.append({"type": "Troubleshooting_Management", "reason": "Critical/High 이슈 감지"})
    
    return {
        "filename": filename,
        "type": "issue_list",
        "parsed_at": datetime.now().isoformat(),
        "content": content,
        "extracted": {"severity_count": severity_count},
        "sync_suggestions": sync,
        "template": "2_project_execution/05_issue_list/issue_list.md"
    }
