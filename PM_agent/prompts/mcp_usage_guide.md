# MCP 도구 사용 가이드

PM 문서 파싱 MCP 도구의 상세 사용법

---

## 📋 도구 목록

### 1. `parse_hwp_document`

**한글(HWP) 문서 파싱**

```
parse_hwp_document(file_path: str) → JSON
```

**입력**:
- `file_path`: HWP 파일 경로 (예: `/app/data/과업지시서.hwp`)

**출력**:
```json
{
  "filename": "과업지시서.hwp",
  "type": "hwp",
  "content": {
    "paragraphs": ["...", "..."],
    "paragraph_count": 25
  }
}
```

---

### 2. `parse_word_document`

**Word(DOCX) 문서 파싱**

```
parse_word_document(file_path: str) → JSON
```

**입력**:
- `file_path`: DOCX 파일 경로

**출력**:
```json
{
  "filename": "문서.docx",
  "type": "docx",
  "content": {
    "paragraphs": [...],
    "tables": [...],
    "table_count": 3
  }
}
```

---

### 3. `parse_meeting_document` ⭐

**회의록 파싱 + 액션아이템 추출**

```
parse_meeting_document(file_path: str) → JSON
```

**입력**:
- `file_path`: 회의록 DOCX 파일 경로

**출력** (상세):
```json
{
  "filename": "250703 회의록.docx",
  "type": "meeting",
  "meeting_date": "2025-07-03",
  "content": {
    "paragraphs": [...],
    "tables": [...]
  },
  "extracted": {
    "action_items": [...],
    "action_item_count": 5,
    "categorized_actions": {
      "요구사항변경": [...],
      "일정변경": [...],
      "이슈발생": [...],
      "기타": [...]
    }
  },
  "sync_suggestions": [
    {"type": "Document_Update_Checker", "reason": "요구사항 변경 감지"}
  ],
  "template": "2_project_execution/04_meeting/meeting_template.md"
}
```

**sync_suggestions 연동**:
- `Document_Update_Checker` → 요구사항/설계 문서 업데이트
- `Progress_Tracker` → 일정 업데이트
- `Troubleshooting_Management` → 이슈 관리

---

### 4. `parse_excel_document`

**엑셀(XLSX/XLS) 문서 파싱**

```
parse_excel_document(file_path: str, doc_type: str = "auto") → JSON
```

**입력**:
- `file_path`: 엑셀 파일 경로
- `doc_type`: 문서 유형
  - `weekly`: 주간보고
  - `quotation`: 견적서
  - `issue`: 이슈리스트
  - `auto`: 파일명으로 자동 감지

**출력 (주간보고)**:
```json
{
  "filename": "주간보고_251222.xlsx",
  "type": "weekly_report",
  "report_date": "2025-12-22",
  "content": {
    "시트명": {
      "headers": [...],
      "rows": [...]
    }
  },
  "sync_suggestions": [
    {"type": "Progress_Tracker", "reason": "진행률 업데이트"}
  ]
}
```

---

### 5. `batch_parse_folder`

**폴더 일괄 파싱**

```
batch_parse_folder(folder_path: str) → JSON
```

**입력**:
- `folder_path`: 폴더 경로

**출력**:
```json
{
  "folder": "/app/data/회의록",
  "total": 10,
  "success": 9,
  "failed": 1,
  "documents": [
    {"filename": "회의록1.docx", "type": "meeting", "status": "success"},
    ...
  ]
}
```

---

## 🔄 워크플로우

```
1. 문서 파싱
   parse_meeting_document("/app/data/회의록.docx")
   
2. sync_suggestions 확인
   → "Document_Update_Checker" 제안 발견
   
3. 클로드 에이전트 프롬프트 실행
   @parsers/2_execution/meeting_parser.md
   
4. 연동 프롬프트 실행
   @Document_Update_Checker_Prompt.md
```
