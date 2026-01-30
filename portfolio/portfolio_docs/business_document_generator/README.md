# Business Document Generator System - 사용 가이드

요구조건 문서와 기술 스택을 입력받아 자동으로 사업계획서, 제안서, 착수보고서를 생성하는 시스템입니다.

---

## 🎯 주요 기능

1. **요구조건 문서 자동 파싱**: TXT 파일에서 프로젝트 정보, 요구사항, 일정, 예산 추출
2. **Architecture 파일 파싱**: 선택한 Architecture 파일(단수/복수)에서 기술 스택 및 구조 분석
3. **포트폴리오 스마트 매칭**: 회사 포트폴리오에서 관련 경험 및 역량 자동 선별
4. **발주처 유형별 맞춤 문서**: 정부/민간/공공기관별 페르소나 적용
5. **다이어그램 자동 생성**: 각 섹션마다 머메이드 다이어그램 포함
6. **PDF 자동 변환**: Mermaid 다이어그램 포함 PDF 자동 생성

---

## 📋 사전 준비

### 1. 요구조건 문서 준비

**위치**: `business_document_generator/data/requirements/[프로젝트명]_requirements.txt`

**형식**: TXT 또는 MD 파일

**내용**:
- 프로젝트명 및 목적
- 지원분야 및 기술분류
- 핵심 요구사항
- 기술적 요구사항
- 일정 및 예산 정보 (있는 경우)
- 발주처 정보 (있는 경우)

### 2. Architecture 파일 선택

**경로**: `platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/`

**선택 방법**:
- 단수: 하나의 파일만 선택 (예: `API_Design.md`)
- 복수: 여러 파일 선택 (예: `API_Design.md` + `Database_Design.md` + `Component_Interfaces_Design.md`)

### 3. 포트폴리오 문서 확인

다음 문서들이 최신 상태인지 확인:
- `00_Personal_Profile.md`
- `02_Projects_Overview.md`
- `Architecture_Overview.md`
- `04_Academic_Publications.md`

---

## 🚀 사용 방법

### 기본 사용법

**1단계: 진입점 선택**

다음 중 하나의 방식으로 접근:
- **통합 진입점 사용 (권장)**: `@Testing_AI_agents_for_public_use/portfolio` 또는 `@Testing_AI_agents_for_public_use/portfolio/portfolio_docs` 언급
  - 통합 진입점에서 "사업 문서 생성" 선택 → 자동으로 이 시스템으로 라우팅
- **직접 접근**: 사업계획서/제안서 관련 키워드 직접 언급
- 클로드 에이전트로 호출

**2단계: 자동 감지 및 실행**

시스템이 자동으로 다음을 수행합니다:
- ✅ 통합 진입점에서 라우팅된 경우: 바로 Step 0.5로 진행
- ✅ 직접 접근한 경우: 발주처 유형 선택 (정부/민간/공공기관/기타)
- ✅ 문서 유형 선택 (제안서/사업계획서/착수보고서)
- ✅ Step 1: 요구조건 파싱
- ✅ Step 2: Architecture 파일 선택 및 파싱
- ✅ Step 3: 포트폴리오 매칭
- ✅ Step 3.5: 정보 통합 연결
- ✅ Step 4: 문서 생성 (다이어그램 포함)

**3단계: 결과 확인**

생성된 파일 확인:
- `business_document_generator/data/temp/[문서유형]_content.md`

**4단계: 승인 후 저장**

승인하면 자동으로:
- `assets/[프로젝트명]/[프로젝트명]_[문서유형].md` 저장
- PDF 파일 생성 (선택사항)

---

## 🔧 고급 사용법

### 발주처 유형 지정

```
"정부 기관용 사업계획서 만들어줘"
```

자동으로 정부 기관 페르소나 적용

### Architecture 파일 지정

```
"API_Design.md와 Database_Design.md 사용해서 제안서 만들어줘"
```

지정한 파일들만 파싱하여 사용

### 특정 프로젝트 강조

```
"AMS와 CoCTK 프로젝트를 중심으로 사업계획서 만들어줘"
```

특정 프로젝트를 우선적으로 강조하여 작성

---

## 📁 폴더 구조

```
business_document_generator/
├── README.md                   # 이 파일
├── PLAN.md                     # 구현 계획서
├── prompts/
│   ├── Business_Document_Entry_Prompt.md    # 진입점 감지
│   ├── Business_Document_Chain_Prompt.md    # 오케스트레이터
│   ├── 0.5_Select_Client_Type.md            # Step 0.5
│   ├── 1_Parse_Requirements.md              # Step 1
│   ├── 2_Parse_Architecture.md              # Step 2
│   ├── 3_Match_Company_Portfolio.md          # Step 3
│   ├── 3.5_Connect_All_Information.md        # Step 3.5
│   ├── 4_Generate_Document.md               # Step 4
│   └── personas/                            # 발주처 유형별 페르소나
│       ├── Government_Persona.md
│       ├── Private_Company_Persona.md
│       ├── Public_Institution_Persona.md
│       └── Other_Persona.md
├── templates/
│   ├── Proposal_Structure_Template.md        # 제안서 템플릿
│   ├── Business_Plan_Structure_Template.md    # 사업계획서 템플릿
│   └── Inception_Report_Structure_Template.md # 착수보고서 템플릿
└── data/
    ├── requirements/                  # 요구조건 문서 저장소
    └── temp/                          # 임시 데이터
        ├── client_type.txt
        ├── requirements_analysis.json
        ├── architecture_analysis.json
        ├── company_portfolio_matching.json
        ├── integrated_document_data.json
        └── [문서유형]_content.md
```

---

## 🔄 워크플로우 상세

### Step 0.5: 발주처 유형 선택

**선택 옵션**:
- 정부 기관 (Government)
- 민간 기업 (Private Company)
- 공공기관 (Public Institution)
- 기타 (Other)

**출력**: `client_type.txt`

### Step 1: Parse Requirements

**입력**: `data/requirements/[프로젝트명]_requirements.txt`

**출력**: `data/temp/requirements_analysis.json`

### Step 2: Parse Architecture Files

**입력**: 선택한 Architecture 파일들

**출력**: `data/temp/architecture_analysis.json`

### Step 3: Match Company Portfolio

**입력**: 
- `requirements_analysis.json`
- `architecture_analysis.json`
- 포트폴리오 문서들

**출력**: `data/temp/company_portfolio_matching.json`

### Step 3.5: Connect All Information

**입력**: Step 1, 2, 3 출력 + 발주처 유형

**출력**: `data/temp/integrated_document_data.json`

### Step 4: Generate Document

**입력**: `integrated_document_data.json` + 템플릿

**출력**: `data/temp/[문서유형]_content.md`

---

## ✅ 체크리스트

### 실행 전

- [ ] 요구조건 문서 준비 완료
- [ ] 포트폴리오 문서 최신 상태 확인
- [ ] Architecture 파일 경로 확인
- [ ] `assets/` 폴더 존재 확인

### 실행 중

- [ ] 발주처 유형 선택 완료
- [ ] 문서 유형 선택 완료
- [ ] Step 1 완료 (JSON 파일 생성 확인)
- [ ] Step 2 완료 (Architecture 파일 파싱 확인)
- [ ] Step 3 완료 (매칭 점수 확인)
- [ ] Step 4 완료 (Markdown 파일 생성 확인)

### 실행 후

- [ ] 생성된 문서 내용 검토
- [ ] Mermaid 다이어그램 렌더링 확인
- [ ] 발주처 유형별 페르소나 적용 확인
- [ ] 승인 후 `assets/` 폴더에 저장 확인
- [ ] PDF 생성 (선택사항)

---

## 🛠️ 문제 해결

### 요구조건 파일을 찾을 수 없습니다

**해결 방법**:
1. 파일 경로 확인: `business_document_generator/data/requirements/[프로젝트명]_requirements.txt`
2. 파일 존재 여부 확인
3. 절대 경로로 직접 지정

### Architecture 파일이 비어있습니다

**해결 방법**:
1. 파일 경로 확인
2. 파일 내용 확인
3. 기본 구조만 참조하도록 처리

### 페르소나가 적용되지 않았습니다

**해결 방법**:
1. `client_type.txt` 파일 확인
2. 해당 페르소나 프롬프트 파일 확인
3. Step 4에서 페르소나 적용 로직 확인

---

## 🔗 관련 문서

- `PLAN.md` - 시스템 구현 계획서
- `prompts/Business_Document_Chain_Prompt.md` - 오케스트레이터 프롬프트
- `../prompts/role_based/Soonryong_Answer_Generator_Prompt.md` - 순룡 페르소나 기본 스타일
- `../resume_generator/README.md` - 이력서 생성 시스템 (참고)

---

## 💡 팁

1. **요구조건 문서 상세하게 작성**: 정보가 상세할수록 정확한 문서 생성
2. **포트폴리오 최신 유지**: 프로젝트 정보 항상 최신 상태로
3. **Architecture 파일 적절히 선택**: 프로젝트에 필요한 기술만 선택
4. **발주처 유형 정확히 선택**: 어조와 강조점이 달라짐
5. **다이어그램 확인**: 생성된 다이어그램이 올바르게 렌더링되는지 확인

---

**생성 일시**: 2025-01-XX
**작성자**: Claude Code

