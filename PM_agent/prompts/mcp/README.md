# PM Document Parser MCP Server

PM 문서 파싱을 위한 MCP(Model Context Protocol) 서버

## 🚀 빠른 시작

### 1. Docker 빌드 및 실행

```bash
docker-compose up -d
```

### 2. 확인

```bash
docker ps
# CONTAINER ID   IMAGE           STATUS   PORTS
# xxxx           pm-parser-mcp   Up       0.0.0.0:8080->8080/tcp
```

### 3. Claude Desktop 연동

**Mac/Linux**: `~/.claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "pm-parser": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-v", "/path/to/your/documents:/app/data",
        "pm-parser-mcp"
      ]
    }
  }
}
```

> ⚠️ `/path/to/your/documents`를 실제 문서 폴더 경로로 변경하세요

### 4. Claude 재시작

Claude Desktop을 재시작하면 MCP 도구가 활성화됩니다.

---

## 🔧 MCP 도구

| 도구 | 형식 | 설명 |
|------|------|------|
| `parse_hwp_document` | HWP | 한글 문서 파싱 |
| `parse_word_document` | DOCX | Word 문서 파싱 |
| `parse_meeting_document` | DOCX | 회의록 → 액션아이템 추출 |
| `parse_excel_document` | XLSX | 주간보고/견적서/이슈 파싱 |
| `batch_parse_folder` | * | 폴더 일괄 파싱 |

---

## 💡 사용 예시

### 회의록 파싱

```
parse_meeting_document("/app/data/회의록.docx")
```

**결과**:
```json
{
  "filename": "회의록.docx",
  "meeting_date": "2025-07-03",
  "extracted": {
    "action_items": [...],
    "categorized_actions": {
      "요구사항변경": [...],
      "일정변경": [...],
      "이슈발생": [...]
    }
  },
  "sync_suggestions": [
    {"type": "Document_Update_Checker"}
  ]
}
```

### 주간보고 파싱

```
parse_excel_document("/app/data/주간보고.xlsx", doc_type="weekly")
```

### 폴더 일괄 파싱

```
batch_parse_folder("/app/data/회의록")
```

---

## 📁 구조

```
mcp/
├── server.py           # MCP 서버
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── parsers/
    ├── hwp_parser.py      # 한글
    ├── docx_parser.py     # Word
    ├── meeting_parser.py  # 회의록
    └── excel_parser.py    # 엑셀
```

---

## ⚙️ 로컬 실행 (Docker 없이)

```bash
# 의존성 설치
pip install -r requirements.txt

# 서버 실행
python server.py
```

---

## 🔗 연동

파싱 결과의 `sync_suggestions`를 확인하여 후속 작업 연동:

| 감지 | 연동 프롬프트 |
|------|--------------|
| 요구사항 변경 | Document_Update_Checker |
| 일정 변경 | Progress_Tracker |
| 이슈 발생 | Troubleshooting_Management |
