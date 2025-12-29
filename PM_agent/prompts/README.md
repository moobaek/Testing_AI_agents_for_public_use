# PM 문서 템플릿 변환 시스템

PM 문서를 자동으로 파싱하여 표준 템플릿으로 변환하는 시스템

## 🚀 빠른 시작

### 1. 환경 준비

```bash
# Docker 설치 확인
docker --version

# 저장소 클론
git clone <repo-url>
cd PM_agent/prompts
```

### 2. MCP 서버 설치

```bash
cd mcp
docker-compose up -d

# 확인
docker ps
```

### 3. Claude Desktop 연동

`~/.claude/claude_desktop_config.json` (Mac/Linux) 또는  
`%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "pm-parser": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-v", "C:/path/to/your/docs:/app/data",
        "pm-parser-mcp"
      ]
    }
  }
}
```

### 4. 사용

Claude에서:
```
parse_meeting_document("/app/data/회의록.docx")
```

---

## 📁 구조

```
prompts/
├── document_to_template.md    # 메인 프롬프트
├── README.md                  # 이 파일
│
├── parsers/                   # 클로드 에이전트 (10개)
│   ├── 0_pre_sales/           # 영업/제안
│   ├── 1_initiation/          # 착수
│   ├── 2_execution/           # 수행
│   ├── 3_closure/             # 종료
│   └── common/                # 공통
│
├── mcp/                       # MCP 서버 (Docker)
│   ├── server.py
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── parsers/
│
├── scripts/                   # 로컬 스크립트
│   ├── parse_documents.py
│   ├── parse_meeting.py
│   ├── parse_excel.py
│   └── parse_hwp.py
│
└── temp/                      # 파싱 결과
```

---

## 🔧 MCP 도구

| 도구 | 형식 | 설명 |
|------|------|------|
| `parse_hwp_document` | HWP | 한글 문서 |
| `parse_word_document` | DOCX | Word 문서 |
| `parse_meeting_document` | DOCX | 회의록 → 액션아이템 추출 |
| `parse_excel_document` | XLSX | 주간보고/견적서/이슈 |
| `batch_parse_folder` | * | 폴더 일괄 파싱 |

---

## 📊 워크플로우

```
원본 파일 → MCP 도구 → 파싱 JSON → 클로드 에이전트 → 템플릿 생성
     ↓
[HWP/DOCX/XLSX]    [parse_*]    [extracted]    [parsers/*]    [templates/*]
                                     ↓
                           sync_suggestions
                                     ↓
                    Document_Update_Checker / Progress_Tracker
```

---

## 📋 파서 목록

| 단계 | 파서 | 대상 |
|------|------|------|
| Pre-sales | pre_sales_parser | RFP, 제안서 |
| Initiation | quotation_parser | 견적서 |
| | contract_parser | 계약서 |
| | sow_parser | 과업지시서 |
| Execution | meeting_parser | 회의록 |
| | status_report_parser | 주간/월간 보고 |
| | change_request_parser | 변경요청 |
| | issue_parser | 이슈리스트 |
| Closure | uat_parser | UAT 결과 |
| Common | architecture_parser | 기술문서 |

---

## 🔗 연동

회의록 파싱 시 자동 연동 제안:

| 감지 | 연동 프롬프트 |
|------|--------------|
| 요구사항 변경 | Document_Update_Checker |
| 일정 변경 | Progress_Tracker |
| 이슈 발생 | Troubleshooting_Management |

---

## 💡 사용 예시

### 회의록 → 템플릿

```python
# 1. MCP로 파싱
result = parse_meeting_document("/app/data/회의록.docx")

# 2. 결과 확인
{
  "filename": "회의록.docx",
  "meeting_date": "2025-07-03",
  "extracted": {
    "action_items": [...]
  },
  "sync_suggestions": [
    {"type": "Document_Update_Checker"}
  ]
}

# 3. 템플릿 생성 (클로드 에이전트)
@parsers/2_execution/meeting_parser.md
```

---

## 📚 관련 문서

- [MCP 서버 상세](./mcp/README.md)
- [로컬 스크립트](./scripts/README.md)
- [메인 프롬프트](./document_to_template.md)
