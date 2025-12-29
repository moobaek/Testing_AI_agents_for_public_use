import json
import os
import sys

# 설정
BASE_DIR = r"c:\Users\k_dragon\Documents\github_moobeak\Testing_AI_agents_for_public_use\PM_agent"
TEMP_DIR = os.path.join(BASE_DIR, "prompts", "temp")
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates", "세아특수강_프로젝트")

FILES = {
    "meeting": "batch_meetings_mcp.json",
    "weekly": "batch_weekly_mcp.json",
    "quotation": "batch_quotation_mcp.json",
    "issue": "batch_issue_mcp.json",
    "sow": "batch_sow_mcp.json",
    "contract": "batch_contract_mcp.json",
    "hansol_contract": "batch_hansol_contract_mcp.json",
    "requirements": "batch_req_mcp.json"
}

DIRS = {
    "meeting": "2_project_execution/04_meeting",
    "weekly": "2_project_execution/01_status_report",
    "quotation": "1_project_initiation/05_quotation",
    "issue": "2_project_execution/05_issue_list",
    "sow": "1_project_initiation/07_sow",
    "contract": "1_project_initiation/06_contract",
    "hansol_contract": "1_project_initiation/06_contract/hansol",
    "requirements": "1_project_initiation/03_requirements"
}

def load_json(filename):
    path = os.path.join(TEMP_DIR, filename)
    print(f"📂 Loading: {path}")
    if not os.path.exists(path):
        print(f"❌ File not found: {path}")
        return {}
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"❌ JSON Load Error ({filename}): {e}")
        return {}

def generate_generic_md(doc, output_path, type_name):
    filename = doc.get("filename", "")
    content = doc.get("content", {})
    
    md = f"# {type_name} - {filename}\n\n"
    
    paragraphs = content.get("paragraphs", [])
    if paragraphs:
        md += "## 내용\n\n"
        for p in paragraphs[:50]: 
            if p.strip():
                md += f"{p.strip()}\n\n"
    
    tables = content.get("tables", [])
    if tables:
        md += "## 테이블 데이터\n\n"
        for i, table in enumerate(tables):
            md += f"### 표 {i+1}\n\n"
            
            # 테이블이 리스트인 경우 (Generic DOCX)
            if isinstance(table, list):
                if not table: continue
                # 첫 번째 행을 헤더로 가정
                headers = table[0]
                rows = table[1:]
            
            # 테이블이 딕셔너리인 경우 (일부 파서)
            elif isinstance(table, dict):
                headers = table.get("headers", [])
                rows = table.get("rows", [])
            else:
                continue
            
            if headers:
                md += "| " + " | ".join(str(h).replace('\n', ' ') for h in headers) + " |\n"
                md += "| " + " | ".join(["---"] * len(headers)) + " |\n"
            
            for row in rows[:10]:
                md += "| " + " | ".join(str(c).replace('\n', ' ') for c in row) + " |\n"
            md += "\n"

    md += f"""
---
> **파싱 출처**: `{filename}`
> **DOC TYPE**: {doc.get('type', 'unknown')}
"""
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(md)

def generate_meeting_md(doc, output_path):
    extracted = doc.get("extracted", {})
    content = doc.get("content", {})
    date = doc.get("meeting_date", "Unknown")
    
    md = f"""# 회의록

## 기본 정보

| 항목 | 내용 |
|------|------|
| **회의 제목** | {doc.get("filename", "").replace(".docx", "")} |
| **일시** | {date} |
| **장소** | - |
| **작성자** | - |

## 안건

(안건 내용 추출 필요)

## 논의 내용

"""
    paragraphs = content.get("paragraphs", [])
    for p in paragraphs[:20]:
        if p.strip():
            md += f"- {p.strip()}\n"

    md += """
## 액션 아이템

| No. | 내용 | 담당자 | 기한 | 상태 |
|-----|------|--------|------|------|
"""
    
    actions = extracted.get("action_items", [])
    for i, item in enumerate(actions, 1):
        if isinstance(item, dict):
            text = str(item.get('content', ''))
        else:
            text = str(item)
        text = text.replace('\n', ' ').strip()[:50]
        md += f"| {i} | {text} | - | - | 진행 | \n"

    md += f"""
---
> **파싱 출처**: `{doc.get('filename')}`
> **생성일**: 2025-12-29
"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(md)

def generate_excel_md(doc, output_path, type_name):
    filename = doc.get("filename", "")
    content = doc.get("content", {})
    
    md = f"# {type_name} - {filename}\n\n"
    
    for sheet_name, sheet_data in content.items():
        md += f"## 시트: {sheet_name}\n\n"
        headers = sheet_data.get("headers", [])
        rows = sheet_data.get("rows", [])
        
        if headers:
            md += "| " + " | ".join(str(h) for h in headers) + " |\n"
            md += "| " + " | ".join(["---"] * len(headers)) + " |\n"
        
        for row in rows[:20]:
            md += "| " + " | ".join(str(c) for c in row) + " |\n"
            
        md += "\n"

    md += f"""
---
> **파싱 출처**: `{filename}`
"""
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(md)

def main():
    print("🚀 템플릿 생성 시작 (Debug Mode)...")
    print(f"TEMP_DIR: {TEMP_DIR}")
    print(f"TEMPLATE_DIR: {TEMPLATE_DIR}")
    
    for type_key, filename in FILES.items():
        data = load_json(filename)
        
        documents = data.get("documents", [])
        if not documents and isinstance(data, list):
             documents = data
             
        print(f"[{type_key}] 문서 수: {len(documents)}")
        
        target_dir = os.path.join(TEMPLATE_DIR, DIRS[type_key])
        try:
            os.makedirs(target_dir, exist_ok=True)
            print(f"  📂 Target Dir: {target_dir}")
        except Exception as e:
            print(f"  ❌ Dir Create Error: {e}")
            continue
        
        for doc in documents:
            status = doc.get("status")
            if status == "failed" or "error" in doc:
                print(f"  ⚠️ Skipping failed doc: {doc.get('filename')}")
                continue
                
            fname = doc.get("filename", "unknown")
            output_name = os.path.splitext(fname)[0] + ".md"
            output_path = os.path.join(target_dir, output_name)
            
            try:
                if type_key == "meeting":
                    generate_meeting_md(doc, output_path)
                elif type_key in ["weekly", "quotation", "issue"]:
                    generate_excel_md(doc, output_path, type_key.upper())
                else:
                    generate_generic_md(doc, output_path, type_key.upper())
                print(f"  ✅ Generated: {output_name}")
            except Exception as e:
                print(f"  ❌ Generation Error ({fname}): {e}")

    print("✅ 완료!")

if __name__ == "__main__":
    main()
