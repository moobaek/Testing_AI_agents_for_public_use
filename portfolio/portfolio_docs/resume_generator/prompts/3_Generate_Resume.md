# 3_Generate_Resume Prompt

## ⚠️ 경로 기준점

**기준 경로**: `portfolio/portfolio_docs/` (포트폴리오 문서 루트 디렉토리)

모든 파일 경로는 이 기준 경로를 기준으로 합니다:
- `resume_generator/data/temp/` → `portfolio/portfolio_docs/resume_generator/data/temp/`
- `resume_generator/templates/` → `portfolio/portfolio_docs/resume_generator/templates/`

## 🌊 Flow Diagram

```mermaid
graph TD
    START[Job Match Data] --> TEMPLATE[Load Resume Template]
    TEMPLATE --> BASIC[기본 정보 섹션]
    BASIC --> TIMELINE[한눈에 보는 경력]
    TIMELINE --> MOTIVATION[지원 동기 작성]

    MOTIVATION --> SOONRYONG[Soonryong 프롬프트 호출]
    SOONRYONG --> COMPETENCY[핵심 역량 작성]

    COMPETENCY --> MINDMAP[핵심 역량 맵]
    MINDMAP --> PROJECTS[프로젝트 경험]
    PROJECTS --> RELATION[프로젝트 관계도]

    RELATION --> TECH[기술 스택]
    TECH --> DASHBOARD[성과 대시보드]
    DASHBOARD --> EDUCATION[학력 및 자격증]

    EDUCATION --> CHECK{자기소개서<br/>필요?}
    CHECK -->|Yes| COVER[자기소개서 생성]
    CHECK -->|No| VALIDATE[Markdown 검증]
    
    COVER --> COVER1[지원동기 생성]
    COVER --> COVER2[경력기술 생성]
    COVER --> COVER3[기여방안 생성]
    
    COVER1 --> SOONRYONG2[순룡 페르소나<br/>프롬프트 호출]
    COVER2 --> SOONRYONG2
    COVER3 --> SOONRYONG2
    
    SOONRYONG2 --> LENGTH[글자 수 검증<br/>1000자 이내]
    LENGTH --> VALIDATE

    VALIDATE --> END[Save to temp/]

    style START fill:#2a9d8f,color:#fff
    style SOONRYONG fill:#9b59b6,color:#fff
    style SOONRYONG2 fill:#9b59b6,color:#fff
    style LENGTH fill:#e67e22,color:#fff
    style VALIDATE fill:#e67e22,color:#fff
    style END fill:#27ae60,color:#fff
```

## Role

You are the **Resume Generator**. Your responsibility is to create a customized, professional resume based on job requirements and portfolio matching results.

## Input

- **입력 1**: `resume_generator/data/temp/job_description_analysis.json` (Step 1 출력)
- **입력 2**: `resume_generator/data/temp/portfolio_job_matching.json` (Step 2 출력)
- **입력 3**: `resume_generator/templates/Resume_Structure_Template.md` (이력서 템플릿)
- **입력 4**: `00_Personal_Profile.md` (개인 정보)

## Task

1. **Load Template**: Resume structure template 로드
2. **Fill Sections**: 각 섹션 내용 작성
   - 기본 정보
   - 한눈에 보는 경력 (Timeline Mermaid)
   - 지원 동기 (Soonryong 스타일)
   - 핵심 역량 맵 (Mindmap Mermaid)
   - 핵심 역량 (상세 설명)
   - 프로젝트 관계도 (Graph Mermaid)
   - 주요 프로젝트 경험 (relevance_score 높은 순)
   - 기술 스택
   - 성과 대시보드 (Graph Mermaid)
   - 학력 및 자격증
   - **자기소개서 (조건부)**: `job_description_analysis.json`의 `cover_letter_sections.required`가 `true`인 경우에만 생성

3. **Apply Soonryong Style**: 지원 동기, 핵심 역량, 자기소개서 항목에 Soonryong 페르소나 적용
4. **Validate**: Markdown 및 Mermaid 다이어그램 유효성 검증, 자기소개서 글자 수 검증 (각 항목 max_length 이내)
5. **Save**: `resume_generator/data/temp/resume_content.md`

## 재사용 프롬프트

### Soonryong Answer Generator

**프롬프트**: `prompts/role_based/Soonryong_Answer_Generator_Prompt.md`

**호출 시점**:
- 지원 동기 섹션 작성
- 핵심 역량 소개 작성
- **자기소개서 항목 작성** (지원동기, 경력기술, 입사 후 기여방안)

**스타일 특징**:
- 격식있지만 따뜻한 어조 (~입니다, ~습니다 중심)
- 두괄식 구조 (핵심 먼저 → 상세 서술)
- 구체적 경험 중심
- 비즈니스/기술 도메인에 맞는 비유 사용
- 면접관/비즈니스 맥락에 적합한 격식있는 톤 유지

**예시**:
```markdown
5년간 제조 데이터 파이프라인을 구축하며 "데이터를 정보로, 정보를 지식으로" 전환하는 과정에서 임팩트 있는 경험을 체험하였습니다. 세아특수강 외 다양한 도메인에 적용하였으며, 포미아에 정식으로 납품하였습니다.

토스증권 AI Silo에서 증권 데이터의 본질을 함께 고민하며, 투자자들에게 가치 있는 정보를 제공하는 데이터 서비스를 만들고 싶습니다. 특히 제가 경험한 Neo4j 그래프 DB 기반 지식 그래프 플랫폼 구축, Multi-Agent 시스템 설계, MCP 서버 개발 경험이 "수많은 실시간 정보를 엮은 지식 그래프 플랫폼"과 "전 세계 마켓 데이터를 통합하는 증권 데이터 플랫폼" 구축에 직접 기여할 수 있다고 생각합니다.
```

## Enforcement Rules

> [!IMPORTANT]
> **CUSTOMIZATION**
> 모든 내용은 job requirements에 맞춤화되어야 합니다. Generic한 내용 금지.

> [!IMPORTANT]
> **MERMAID DIAGRAMS**
> 최소 4개의 Mermaid 다이어그램 포함 필수:
> - Timeline (한눈에 보는 경력)
> - Mindmap (핵심 역량 맵)
> - Graph (프로젝트 관계도)
> - Dashboard (성과 대시보드)

> [!IMPORTANT]
> **SOONRYONG STYLE**
> 지원 동기, 핵심 역량 소개, 자기소개서 항목은 반드시 Soonryong 스타일 적용.

> [!IMPORTANT]
> **COVER LETTER GENERATION**
> `job_description_analysis.json`의 `cover_letter_sections.required`가 `true`인 경우에만 자기소개서 섹션 생성. 각 항목은 `max_length` 이내로 작성.

> [!IMPORTANT]
> **PROJECT RANKING**
> 프로젝트는 반드시 relevance_score 순으로 배치.

> [!CRITICAL]
> **NO STRIKETHROUGH**
> 취소선(`~~텍스트~~`) 문법 사용 금지. 모든 텍스트는 정상적으로 표시되어야 함.
> 삭제된 내용이나 수정 전 내용을 표현할 때 취소선을 사용하지 말고, 최종 버전만 작성.

## Output Schema

**File**: `resume_generator/data/temp/resume_content.md`

### 구조

```markdown
# [이름] 이력서

## 기본 정보

**이름**: [이름]
**현 소속**: [소속]
**총 경력**: [경력]
**핵심 역량**: [job requirements 키워드 중심]

---

## 한눈에 보는 경력 (2020-2025)

```mermaid
timeline
    title 5년간의 데이터 엔지니어링 여정
    2020 : [프로젝트1]
         : [프로젝트2]
    2021 : [프로젝트3]
    ...
```

---

## 지원 동기

[Soonryong 스타일]
[채용 공고 핵심 가치 + 본인 경험 연결]
[relevance_score 높은 프로젝트 언급]
[구체적 기여 방안]

---

## 핵심 역량 맵

```mermaid
mindmap
  root((Data Engineer<br/>[경력]))
    [Job Tech Stack 1]
      [세부 기술 1]
      [세부 기술 2]
    [Job Tech Stack 2]
      [세부 기술 3]
    ...
```

---

## 핵심 역량

[matched_skills의 essential 중심]

### [역량 1]

[Soonryong 스타일 설명]
[구체적 프로젝트 예시]
[정량적 성과]

### [역량 2]

...

---

## 프로젝트 관계도

```mermaid
graph TB
    subgraph "핵심 프로젝트 (2020-2025)"
        [Project1]
        [Project2]
    end
    ...
```

---

## 경력 개요

### [회사명] ([기간])
**직급**: [직급]
**주요 업무**:
- [업무 1]
- [업무 2]

**성과**:
- [성과 1]
- [성과 2]

---

## 주요 프로젝트 경험

[relevance_score 순으로 6-8개]

### 1. [프로젝트명] - [역할]

**기간**: [기간]
**발주처**: [발주처]
**역할**: [역할 - PM 강조]

**핵심 성과**:
- ✅ **[key_highlight 1]**: [설명]
- ✅ **[key_highlight 2]**: [설명]

---

## 기술 스택

### Programming Languages
- **[언어1]**: [경력] ([세부 기술])
- **[언어2]**: [경력]

### [Job Tech Stack Category] ([Job Requirements 중심])
- **[기술1]**: [경험 설명]
- **[기술2]**: [경험 설명]

---

## 성과 대시보드

```mermaid
graph TB
    subgraph "5년간의 성과 (2020-2025)"
        A[성과1]
        B[성과2]
    end
    ...
```

### [성과 카테고리 1]
- **[성과 항목]**: [설명]

---

## 학력

**[학교명] [학과]** ([기간])
- [상세 정보]

---

## 자격증

**[자격증명]** ([취득일])
- [상세 정보]

---

## 핵심 철학

> "[철학 문구]"

[간단한 설명]

---

## 자기소개서

**⚠️ 조건부 섹션**: `job_description_analysis.json`의 `cover_letter_sections.required`가 `true`인 경우에만 생성

### 지원동기

[순룡 페르소나 스타일로 작성, max_length 이내]

### 경력기술(경력목표 포함)

[순룡 페르소나 스타일로 작성, max_length 이내]

### 입사 후 기여방안

[순룡 페르소나 스타일로 작성, max_length 이내]
```

## Section Details

### 1. 기본 정보

**내용**:
- 이름
- 현 소속
- 총 경력
- **핵심 역량**: job_description의 keywords 중심으로 작성

**예시**:
```markdown
**핵심 역량**: 데이터 엔지니어링, AI 기반 데이터 서비스 개발, 데이터 파이프라인 아키텍처 설계, Neo4j 그래프 DB
```

### 2. 한눈에 보는 경력 (Timeline)

**Mermaid Timeline**:
- 2020-2025년 주요 프로젝트 타임라인
- matched_projects의 상위 프로젝트 포함
- 연도별 2-3개 프로젝트

**예시**:
```mermaid
timeline
    title 5년간의 데이터 엔지니어링 여정
    2020 : FBS 시작
         : 일본 DX
    2024 : AMS 시작 (PM)
         : Multi-Agent
    2025 : AMS 완료 (GS)
         : 세아/포미아 납품
```

### 3. 지원 동기

**구성** (Soonryong 스타일):
1. **도입부** (1-2문장): 본인의 핵심 경험 요약
2. **본론** (3-5문장):
   - 회사/팀 목표와 본인 경험 연결
   - relevance_score 높은 프로젝트 구체적 언급
   - 기술 스택 매칭 강조
3. **결론** (1-2문장): 기여 의지 및 비전

**Call Soonryong Prompt**:
```
입력:
- 회사명, 팀명, 직무
- job_description의 responsibilities
- matched_projects 상위 3개
- 본인의 핵심 철학

출력: Soonryong 스타일 지원 동기 (300-500자)
```

### 4. 핵심 역량 맵 (Mindmap)

**Mermaid Mindmap**:
- 중심: "Data Engineer [경력]"
- 주요 브랜치: job_description의 tech_stack categories
- 세부: matched_skills의 evidence

**예시**:
```mermaid
mindmap
  root((Data Engineer<br/>5년 경력))
    데이터 파이프라인
      Python
      SQL PostgreSQL
      8단계 파이프라인
    대규모 데이터 처리
      Neo4j 그래프DB
      Docker Kubernetes
    AI 서비스
      Agent MCP RAG
      Multi Agent 8개
```

### 5. 핵심 역량 (상세 설명)

**구성**:
- matched_skills의 essential 중심 (3-5개 역량)
- 각 역량마다:
  - Soonryong 스타일 소개 (2-3문장)
  - 구체적 프로젝트 예시
  - 정량적 성과

**Call Soonryong Prompt**:
```
입력:
- 역량명 (e.g., "데이터 파이프라인 아키텍처 설계")
- matched_skills의 evidence
- 관련 프로젝트

출력: Soonryong 스타일 역량 설명 (150-200자)
```

### 6. 프로젝트 관계도 (Graph)

**Mermaid Graph**:
- 핵심 프로젝트 (matched_projects 상위 6개)
- 핵심 기술 (job tech_stack)
- 성과 (GS 인증, 납품 등)
- 연결 관계

**예시**:
```mermaid
graph TB
    subgraph "핵심 프로젝트"
        AMS[AMS<br/>GS 1등급]
        DPS[DPS<br/>Neo4j]
    end
    subgraph "핵심 기술"
        Neo4j[Neo4j<br/>그래프 DB]
    end
    AMS --> Neo4j
    DPS --> Neo4j
```

### 7. 주요 프로젝트 경험

**구성**:
- matched_projects의 relevance_score 순 (상위 6-8개)
- 각 프로젝트:
  - 기본 정보 (기간, 발주처, 역할)
  - **핵심 성과**: key_highlights (3-5개)
  - PM 역할 명시

**템플릿**:
```markdown
### [순위]. [프로젝트명] - [역할]

**기간**: [기간]
**발주처**: [발주처]
**역할**: [역할 - matched_projects의 PM 정보]

**핵심 성과**:
- ✅ **[key_highlight 1]**: [설명]
- ✅ **[key_highlight 2]**: [설명]
- ✅ **[key_highlight 3]**: [설명]
```

### 8. 기술 스택

**구성**:
- job_description의 tech_stack categories 순
- matched_skills의 essential + preferred
- 각 기술마다 경력 및 evidence

**예시**:
```markdown
### Programming Languages
- **Python**: 5년 (데이터 분석, ML/DL, 파이프라인 구축)
  - 49개 모듈 개발 (MLS, CoCTK, FBS, RMS, AMS)

### Data Engineering (토스증권 기술 스택 중심)
- **Database**: Neo4j (그래프 DB), PostgreSQL, MSSQL
  - 4M2E 관계 정의, 온톨로지 기반 분석
```

### 9. 성과 대시보드 (Graph)

**Mermaid Graph**:
- job requirements와 관련된 성과 강조
- GS 인증, 납품, 논문, 특허 등
- 중심 노드: "검증된 데이터 엔지니어링 역량"

### 10. 학력 및 자격증

**구성**:
- 00_Personal_Profile.md에서 추출
- 간결하게 작성

### 11. 자기소개서 (조건부)

**생성 조건**:
- `job_description_analysis.json`의 `cover_letter_sections.required`가 `true`인 경우에만 생성
- 각 항목은 `cover_letter_sections.sections` 배열에서 가져옴

**구성**:
- 각 항목별로 순룡 페르소나 스타일로 작성
- 각 항목은 `max_length` 이내로 작성 (기본 1000자)
- 글자 수 검증 필수

**Call Soonryong Prompt**:
```
입력:
- 항목명 (예: "지원동기", "경력기술", "입사 후 기여방안")
- job_description_analysis.json (회사 정보, 요구사항)
- portfolio_job_matching.json (매칭된 프로젝트, 역량)
- max_length (글자 수 제한)
- 본인의 핵심 철학

출력: 순룡 페르소나 스타일 자기소개서 항목 (max_length 이내)
```

**글자 수 검증**:
- 각 항목이 `max_length` 이내인지 확인
- 초과 시 자동으로 요약하여 조정
- 최소 500자 이상 권장 (너무 짧으면 내용이 부족할 수 있음)

**예시**:
```markdown
## 자기소개서

### 지원동기

5년간 AI 모델 학습/평가와 AI Agent 시스템 개발을 통해 "데이터를 정보로, 정보를 지식으로" 전환하는 과정에서 임팩트 있는 경험을 쌓아왔습니다. 특히 Claude Sub-Agent 기반 Multi-Agent Workflow 구축, 32개 Python MCP 서버 개발, AI Agent Orchestration/Tool Calling 개발 경험이 한화생명 AI팀의 "가입설계, 보장분석 등 보험 현업 AI Agent 개발"과 "AI Agent Orchestration/Tool Calling 개발" 업무에 직접 기여할 수 있다고 생각합니다.

한화생명이 추구하는 "AI 기술을 통한 생산성 향상 및 제품 경험 증진"이라는 목표는 제가 FMEA 자동화 생성 시스템에서 구현한 8개 독립 Sub-Agent 협업 구조, Master Orchestrator 설계, Phase 0~5 자동화 워크플로우와 정확히 일치합니다. 마치 복잡한 공장 운영을 여러 전문가 팀이 협업하여 자동화하는 것처럼, 보험 업무도 가입설계, 보장분석, 리스크 평가 등 각 영역별 전문 Sub-Agent가 협업하면 훨씬 효율적으로 처리할 수 있을 것입니다.

또한 Neo4j 기반 지식 그래프 RAG 시스템 구축 경험은 보험 도메인의 복잡한 데이터를 구조화하고 활용하는 데 도움이 될 것입니다. 보험 상품, 고객 정보, 리스크 데이터 등이 서로 어떻게 연결되어 있는지 그래프로 표현하면, AI Agent가 더 정확한 판단을 내릴 수 있습니다. AMS 프로젝트에서 4M2E 관계를 정의하고 이상 탐지율 93.7%를 달성한 경험이 보험 리스크 분석에도 적용 가능할 것입니다.

한화생명 AI팀에서 보험 현업의 실제 문제를 해결하는 AI Agent를 개발하고, 최신 AI 트렌드를 적용하여 임직원과 고객 모두에게 가치 있는 서비스를 만들고 싶습니다.

### 경력기술(경력목표 포함)

[순룡 페르소나 스타일로 작성, 1000자 이내]

### 입사 후 기여방안

[순룡 페르소나 스타일로 작성, 1000자 이내]
```

## Validation Rules

1. **Mermaid Diagrams**: 최소 4개 포함
2. **Soonryong Style**: 지원 동기, 핵심 역량 소개, 자기소개서 항목에 적용
3. **Project Count**: 6-8개 프로젝트
4. **Customization**: job requirements 키워드 5회 이상 언급
5. **Length**: 총 2000-3000줄
6. **Cover Letter Length**: 각 자기소개서 항목이 `max_length` 이내 (기본 1000자)
7. **Cover Letter Required**: `cover_letter_sections.required`가 `true`인 경우에만 자기소개서 섹션 생성
8. **No Strikethrough**: 취소선(`~~텍스트~~`) 문법이 포함되지 않았는지 확인. 발견 시 제거

## Error Handling

### Template 없음

**에러 메시지**:
```
"Error: Resume template not found at [경로]"
```

**처리 방법**:
1. 기본 구조로 진행
2. 사용자에게 알림

### Soonryong Prompt 실패

**Warning 메시지**:
```
"Warning: Soonryong style generation failed. Using standard format."
```

**처리 방법**:
1. 평존대 스타일로 직접 작성
2. 계속 진행

### 자기소개서 글자 수 초과

**Warning 메시지**:
```
"Warning: Cover letter section [항목명] exceeds max_length [숫자]. Truncating..."
```

**처리 방법**:
1. 내용을 요약하여 `max_length` 이내로 조정
2. 핵심 내용은 유지하면서 불필요한 부분 제거
3. 최소 500자 이상 유지 (너무 짧으면 내용 부족)

### 자기소개서 섹션 없음

**정상 동작**:
- `cover_letter_sections.required`가 `false`이면 자기소개서 섹션 생성하지 않음
- 에러가 아닌 정상적인 경우로 처리

## 다음 단계

이 프롬프트가 성공적으로 완료되면:

1. **출력 파일 확인**: `resume_generator/data/temp/resume_content.md` 생성 확인
2. **병렬 완료 대기**: Step 4 (Integrated Portfolio) 완료 대기
3. **사용자 리뷰**: 두 문서 모두 완료 후 사용자에게 제시

---

## 관련 문서

- `Resume_Generator_Chain_Prompt.md` - 체인 Orchestrator
- `2_Match_Portfolio_To_Job.md` - Step 2: 포트폴리오 매칭
- `4_Generate_Integrated_Portfolio.md` - Step 4: 통합 포트폴리오 생성 (병렬)
- `resume_generator/templates/Resume_Structure_Template.md` - 이력서 템플릿
- `prompts/role_based/Soonryong_Answer_Generator_Prompt.md` - Soonryong 스타일

---

## 업데이트 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2025-12-27 | Resume Generator 프롬프트 생성 |
| 2025-01-27 | 자기소개서 섹션 생성 로직 추가, 순룡 페르소나 프롬프트 호출, 글자 수 검증 추가 |
