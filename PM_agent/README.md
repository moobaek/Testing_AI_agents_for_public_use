# PM Agent (Project Management AI Assistant) 🚀

**PM Agent**는 프로젝트 관리자가 다루는 비정형 문서(계약서, 회의록, 과업지시서 등)를 **AI와 MCP(Model Context Protocol)** 기술을 활용하여 자동으로 분석하고, 체계적인 프로젝트 산출물(리포트)로 변환해주는 지능형 에이전트 시스템입니다.

단순한 텍스트 변환을 넘어, **"읽고(Parsing) → 검증하고(Integrity) → 이해하여(Insight)"** 핵심 리스크와 액션 아이템을 도출합니다.

---

## 🏗️ 프로젝트 구조 (Directory Structure)

이 프로젝트는 데이터(보안)와 로직(시스템)이 철저히 분리되어 있습니다.

```bash
PM_agent/
├── prompts/                 # 🧠 Agent Brain (시스템 로직)
│   ├── mcp/                 # MCP 서버 (Docker 기반 파서)
│   ├── scripts/             # 클라이언트 실행 스크립트 (Python)
│   ├── parsers/             # 문서 유형별 상세 파싱 가이드
│   ├── document_to_template.md  # [Core] 에이전트 메인 프롬프트
│   └── temp/                # (Git 제외) 파싱된 JSON 중간 데이터
├── background/              # 🔒 (Git 제외) 원본 프로젝트 문서 (비공개)
├── templates/               # 📄 산출물 템플릿 및 생성된 리포트
│   └── 세아특수강_프로젝트/   # (Git 제외) 실제 프로젝트 분석 산출물
└── .gitignore               # 보안 설정 파일
```

---

## ✨ 핵심 기능 (Key Features)

### 1. 강력한 문서 파싱 (MCP Server)
- **FastMCP** 기반의 고성능 파싱 서버를 Docker로 제공합니다.
- **지원 포맷**: HWP(한글), DOCX(워드), XLSX(엑셀), PDF 등.
- **특화 기능**: 회의록(액션아이템 추출), 견적서(비용 분석), 주간보고(진척률 계산).

### 2. 파싱 무결성 검증 (Integrity Check) 🛡️
- **"빠짐없이 읽었는가?"**를 시스템적으로 보장합니다.
- `scan_folder_files` 도구가 폴더 전체를 스캔하여, 파싱된 결과와 대조합니다.
- 리포트 상단에 **[데이터 신뢰도 리포트]**를 자동으로 생성하여 누락 여부(0%)를 증명합니다.

### 3. 적응형 파싱 (Adaptive Parsing) 🔄
- 파일 인코딩(EUC-KR/UTF-8) 오류나 포맷 문제를 AI가 스스로 진단합니다.
- `read_file_chunk` 도구로 헤더를 미리 읽어보고, 올바른 방식으로 다시 시도합니다.

---

## 🚀 실행 방법 (How to Run)

### 사전 요구사항 (Prerequisites)
- Docker Desktop
- Python 3.8+
- Claude Desktop App (권장)

### Step 1. MCP 서버 실행 (Docker)
파싱 엔진을 백그라운드에서 실행합니다.

```bash
cd prompts/mcp
docker-compose up --build -d
```

### Step 2. 에이전트 연동 (두 가지 방법)

#### 방법 A: Claude Desktop (권장)
`claude_desktop_config.json`에 아래 설정을 추가하여 에이전트와 대화하듯 사용합니다.

```json
{
  "mcpServers": {
    "pm-parser": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-v", "C:/Users/k_dragon/Documents/github_moobeak/Testing_AI_agents_for_public_use/PM_agent/background:/app/data", "pm-parser-mcp"]
    }
  }
}
```

#### 방법 B: 스크립트 실행 (수동 테스트)
Python 스크립트로 도구를 직접 호출하여 테스트할 수 있습니다.

```bash
cd prompts/scripts
# 폴더 전체 파싱 테스트
python mcp_client_runner.py --tool batch_parse_folder --args '{"folder_path": "/app/data/견적서"}'

# 무결성 검증 테스트
python mcp_client_runner.py --tool scan_folder_files --args '{"folder_path": "/app/data/견적서"}'
```

---

## 📊 워크플로우 (Workflow)

1.  **Input**: 사용자가 `background` 폴더에 문서를 넣습니다.
2.  **Scan**: 에이전트가 `scan_folder_files`로 파일 목록을 확인합니다.
3.  **Parse**: `batch_parse_folder`로 문서를 JSON 데이터로 변환합니다.
4.  **Verify**: 스캔 결과와 파싱 결과를 대조하여 누락을 체크합니다.
5.  **Analyze**: AI(Claude)가 JSON 데이터를 분석하여 인사이트를 도출합니다.
6.  **Report**: `templates` 폴더에 마크다운 형식의 리포트를 생성합니다.

---

> **Note**: 이 저장소에는 시스템 코드만 포함되어 있으며, 실제 고객 데이터는 포함되어 있지 않습니다.
