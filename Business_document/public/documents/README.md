# 🗺️ Obsidian Design Origin

**ID 기반 온톨로지 맵 문서 시스템**

프로젝트 설계부터 구현, 테스트, 문서화까지 전체 개발 워크플로우를 관리하는 통합 문서 시스템입니다.

---

> **🤖 AI에게 중요한 안내**
>
> 이 README를 읽고 있다면, **이 README를 끝까지 읽은 후** 반드시:
> 1. `docs/obsidian_design_origin/specs/04_Prompts/Master_Workflow_Prompt.md` 파일을 읽고
> 2. 해당 프롬프트를 **즉시 실행**해주세요
> 3. Phase 0부터 시작하여 사용자에게 4가지 질문 (Function Call)을 해주세요
>
> ❌ "어떤 작업을 진행할까요?" 같은 질문을 바로 하지 마세요!
> ✅ 먼저 이 README 전체를 읽고, Master_Workflow_Prompt.md를 실행하세요!

---

## 📚 이 문서 시스템은 무엇인가요?

Obsidian Design Origin은 **ID 기반 참조 시스템**을 활용한 프로젝트 설계 문서 모음입니다.

### 핵심 특징

1. **ID 기반 참조**: 모든 요소에 고유 ID 부여 (`page.*`, `comp.*`, `api.*`, `db.*`)
2. **관계 추적**: 의존성과 데이터 흐름을 명확하게 문서화
3. **대화형 워크플로우**: Function Call 방식으로 AI와 대화하며 프로젝트 설정
4. **자동 검증**: S/A/B/C/D/F 등급으로 품질 자동 평가
5. **역설계 지원**: 기존 코드를 분석하여 설계 문서 역생성

### 이런 분들에게 추천합니다

- ✅ 새 프로젝트를 체계적으로 설계하고 싶은 분
- ✅ 기존 프로젝트를 역설계하여 문서화하고 싶은 분
- ✅ AI를 활용한 자동화된 개발 워크플로우가 필요한 분
- ✅ 팀과 일관된 설계 컨벤션을 공유하고 싶은 분
- ✅ 설계와 코드의 일치성을 자동으로 검증하고 싶은 분

---

## 🚀 빠른 시작

### Step 1: 이 README 읽기 ← 지금 여기! ✅

이 문서로 전체 구조를 파악하세요.

### Step 2: Master Workflow 실행

AI(Cursor/Claude Code)에게 다음 프롬프트를 전달하세요:

```bash
@docs/obsidian_design_origin/specs/04_Prompts/Master_Workflow_Prompt.md
```

프롬프트가 자동으로 이 README를 다시 한 번 확인하라고 안내합니다.

### Step 3: 대화형 설정 완료

AI가 Function Call 방식으로 4가지를 질문합니다:

1. **작업 유형**: 신규 설계 vs 역설계
2. **입력 소스**: 폴더 경로 / Git URL / PPT / JSON+CS 파일 / 요구사항 문서
3. **베이스 전략**: 표준 템플릿 vs 커스터마이징
4. **기술 스택**:
   - 베이스 있음 → 자동 분석 + 추가 항목 추천
   - 베이스 없음 → 프로젝트 유형별 추천 + 주관식 입력 가능

### Step 4: 자동 문서 생성 (Phase 1-8)

AI가 자동으로 8단계를 실행하여 전체 설계 문서를 생성합니다:
- Project Structure, Blue Print, API Design, Database Design
- Component Interfaces, State Management
- Initial Situation Report, Quality Assessment

### Step 5: 최종 검증 및 승인

테스트 결과를 확인하고 다음 중 선택합니다:
- ✅ 승인 및 완료
- 🔄 특정 단계 재실행
- 🔁 전체 재실행
- 🛠️ 수동 수정 후 재검증

---

## 📁 폴더 구조

```
obsidian_design_origin/
│
├── 📖 README.md                          ← 지금 보고 있는 파일 (시작점)
│
├── 📂 conventions/                       # 개발 컨벤션 및 가이드
│   ├── Development_Workflow_Guide.md     # 개발 워크플로우 가이드
│   ├── Token_Optimization_Guide.md       # 토큰 최적화 가이드
│   └── Accuracy_Improvement_Guide.md     # 정확도 향상 가이드
│
├── 📂 meta/                               # 메타 문서 및 전략
│   ├── Workflow_Orchestrator.md          # 워크플로우 실행 순서 및 의존성 관리
│   ├── Workflow_Status_Tracker.md       # 실행 상태 추적
│   ├── Data_Flow_Map.md                 # 데이터 흐름 시각화
│   └── Prompt_Chaining_Strategy.md       # 프롬프트 체인화 전략
│
├── 📂 specs/                             # 핵심 스펙 문서
│   ├── 04_Prompts/                       # AI 프롬프트 모음
│   │   ├── 🎯 Master_Workflow_Prompt.md ← 시작 프롬프트 (Step 2에서 사용)
│   │   ├── chain/                        # 체인 프롬프트 (Phase 2-8)
│   │   │   ├── 2.1_Define_Pages.md       # 페이지 정의
│   │   │   ├── 2.2_Map_Components_To_Pages.md # 컴포넌트 매핑
│   │   │   ├── 2.3_Generate_Dependency_Graph.md # 의존성 그래프
│   │   │   ├── 2.4_Assemble_Blueprint.md # 청사진 조립
│   │   │   ├── 3.1_Define_API_Endpoints_From_Flows.md # API 엔드포인트 정의
│   │   │   ├── 3.2_Design_API_Schemas_DB_Mapping.md # API 스키마 및 DB 매핑
│   │   │   ├── 3.3_Assemble_API_Design.md # API 설계 조립
│   │   │   ├── 4.1_Finalize_DB_Schema.md # DB 스키마 확정
│   │   │   ├── 4.2_Define_DB_Relationships.md # DB 관계 정의
│   │   │   ├── 4.3_Assemble_Database_Design.md # DB 설계 조립
│   │   │   └── ... (기타 체인 프롬프트)
│   │   ├── Blue_Print_Prompt.md          # 청사진 생성 (레거시)
│   │   ├── API_Design_Prompt.md          # API 설계 (레거시)
│   │   ├── Database_Design_Prompt.md     # DB 설계 (레거시)
│   │   └── ... (기타 프롬프트)
│   │
│   └── 05_Templates/                     # 출력 템플릿
│       ├── Blue_Print_Template.md        # 청사진 템플릿
│       ├── Project_Structure_Template.md # 프로젝트 구조 템플릿
│       └── Initial_Situation_Report_Template.md # 상황 보고서 템플릿
│
└── 📂 architecture/                      # 생성될 설계 문서 (Phase 1-8 출력)
    ├── Blue_Print.md
    ├── API_Design.md
    ├── Database_Design.md
    ├── Project_Structure_Design.md
    ├── Component_Interfaces_Design.md
    └── State_Management_Design.md
```

---

## 🎯 워크플로우 관리 시스템

### 워크플로우 통합 관리 문서

전체 워크플로우의 실행 순서, 상태 추적, 데이터 흐름을 관리하는 통합 시스템이 구축되어 있습니다.

| 문서 | 역할 | 위치 |
|------|------|------|
| **Workflow_Orchestrator** | 워크플로우 실행 순서 및 의존성 정의 | `meta/Workflow_Orchestrator.md` |
| **Workflow_Status_Tracker** | Phase별 및 체인 프롬프트별 실행 상태 추적 | `meta/Workflow_Status_Tracker.md` |
| **Data_Flow_Map** | 중간 결과물의 생성 위치와 전달 경로 시각화 | `meta/Data_Flow_Map.md` |

**사용 방법**:
1. **워크플로우 시작**: `Master_Workflow_Prompt.md` 실행
2. **실행 순서 확인**: `Workflow_Orchestrator.md` 참조하여 Phase별 체인 프롬프트 실행 순서 확인
3. **상태 추적**: 각 단계 완료 후 `Workflow_Status_Tracker.md` 업데이트
4. **데이터 흐름 확인**: `Data_Flow_Map.md` 참조하여 중간 결과물 위치 및 전달 경로 확인

**주요 기능**:
- ✅ 체인 프롬프트 의존성 관리
- ✅ Phase별 실행 순서 명확화
- ✅ 실시간 상태 추적
- ✅ 데이터 흐름 시각화
- ✅ 온톨로지 기반 관계 정의

---

## 🎯 Master Workflow 개요

### Phase 0: 초기 설정 (대화형)

Function Call로 프로젝트 설정을 받습니다:

```
┌─────────────────────────────────┐
│ 질문 1: 작업 유형              │
│ ○ 신규 설계                    │
│ ○ 역설계                       │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│ 질문 2: 입력 소스              │
│ ☑ 폴더 경로                    │
│ ☑ Git URL                      │
│ ☑ PPT                          │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│ 질문 3: 베이스 전략            │
│ ○ 표준 템플릿                  │
│ ○ 커스터마이징                 │
│ ○ 하이브리드                   │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│ 질문 4: 기술 스택              │
│ 📊 자동 분석 (베이스 있을 때) │
│ 💡 추천 옵션 (베이스 없을 때) │
│ ✏️ 주관식 (Other 선택 시)     │
└─────────────────────────────────┘
```

### Phase 1-8: 자동 문서 생성

AI가 순차적으로 실행:

1. **Project Structure Design** → 폴더 구조, 네이밍 컨벤션
2. **Blue Print** → 페이지, 컴포넌트, 의존성 테이블, 데이터 흐름
3. **API Design** → 엔드포인트, Request/Response, 에러 처리
4. **Database Design** → 테이블, 관계, 인덱스, 제약조건
5. **Component Interfaces** → Props 인터페이스, 타입 정의
6. **State Management** → 전역/로컬 상태, Store 설계
7. **Initial Situation Report** → 현황 분석, 리스크, NFR
8. **Quality Assessment** → 평가 기준, 체크리스트

각 단계마다 **검증** 실행 → 사용자에게 진행 확인

### Phase 9: 최종 검증

```
🧪 테스트 실행
├─ ✅ 문서 완전성: 100% (8/8)
├─ ✅ ID 일관성: 98.5%
├─ ⚠️ 의존성 검증: 95% (순환 참조 1개)
└─ ✅ NFR 명시: 100%

📊 총점: 168/190 (88.4%) - 등급: A

다음 중 어떤 작업을 진행하시겠습니까?
○ ✅ 승인 및 완료
○ 📝 특정 Phase 문서 검토/수정 (Blue_Print.md, API_Design.md 등)
○ 🔄 특정 단계 재실행
○ 💡 프롬프트 개선 (생성된 문서 기반)
○ 📂 문서 구조 정리 (폴더 재구성, 추가 문서 생성)
○ 🚀 새로운 기능 추가 (아키텍처에 기능 추가)
○ 🔁 전체 재실행
○ 🛠️ 기타 요청 (자유 입력)
```

---

## 📖 주요 문서 가이드

### 개발 시작 전 필독

1. **README.md** (현재 파일) - 전체 개요
2. **Master_Workflow_Prompt.md** - 대화형 시작 프롬프트
3. **Development_Workflow_Guide.md** - 개발 워크플로우 가이드

### 프롬프트 파일 (AI에게 전달)

| 프롬프트 | 용도 | 출력 |
|---------|------|------|
| `Master_Workflow_Prompt.md` | 전체 워크플로우 시작 | 모든 설계 문서 |
| `Blue_Print_Prompt.md` | 청사진만 생성 | `Blue_Print.md` |
| `API_Design_Prompt.md` | API만 설계 | `API_Design.md` |
| `Database_Design_Prompt.md` | DB만 설계 | `Database_Design.md` |
| `Quality_Assessment_Prompt.md` | 품질 평가 | 평가 리포트 (190점) |
| `Test_Report_Prompt.md` | 테스트 리포트 | 테스트 결과 (160점) |

### 템플릿 파일 (참조용)

| 템플릿 | 용도 |
|--------|------|
| `Blue_Print_Template.md` | 청사진 구조 참조 |
| `Project_Structure_Template.md` | 프로젝트 구조 참조 |
| `Initial_Situation_Report_Template.md` | 상황 보고서 참조 |

---

## 🔧 주요 기능

### 1. ID 기반 참조 시스템

모든 요소에 고유 ID 부여:

```
page.user.profile          # 페이지
comp.user.profileImage     # 컴포넌트
api.user.uploadImage       # API
db.user_images             # 데이터베이스 테이블
hook.user.profile          # 커스텀 훅
store.auth                 # 상태 스토어
```

### 2. 의존성 관계 추적

```
page.user.profile
  → uses → comp.user.profileImage
  → calls → api.user.uploadImage
  → queries → db.user_images
```

### 3. 자동 기술 스택 분석

**베이스 프로젝트가 있는 경우**:

```bash
# 자동 분석 대상
- package.json → React, Vue, Next.js, TypeScript
- .csproj → .NET, C#
- requirements.txt → Python
- prisma/schema.prisma → Prisma + DB
```

**분석 결과 예시**:
```
✅ React 18.2.0
✅ TypeScript 5.3.0
✅ Supabase (PostgreSQL)
❌ E2E 테스트 없음
❌ Docker 미사용
```

→ AI가 **누락된 항목 추천**

### 4. 비기능 요구사항 (NFR) 자동 평가

- 보안 (인증/인가, 암호화, HTTPS)
- 성능 (응답시간, 동시사용자, 최적화)
- 확장성 (수평확장, 부하분산)
- 모니터링 (로깅, 알림, 메트릭)
- 테스트 (단위/통합/E2E)
- 배포 (CI/CD, 롤백)
- 예외 처리 (에러 핸들링, Fallback)

### 5. 등급 시스템

| 등급 | 점수 | 설명 |
|------|------|------|
| **S** | 90-100% | 탁월함 - 모든 요구사항 완벽 충족 |
| **A** | 80-89% | 우수함 - 대부분 요구사항 충족 |
| **B** | 70-79% | 양호함 - 기본 요구사항 충족 |
| **C** | 60-69% | 보통 - 일부 개선 필요 |
| **D** | 50-59% | 미흡 - 많은 개선 필요 |
| **F** | 0-49% | 불합격 - 재작업 필요 |

---

## 💡 사용 시나리오

### 시나리오 1: 신규 프로젝트 설계

**상황**: 처음부터 새로운 웹 애플리케이션 설계

**단계**:
1. `Master_Workflow_Prompt.md` 실행
2. 작업 유형: **신규 설계** 선택
3. 입력 소스: **요구사항 문서** 제공
4. 베이스 전략: **표준 템플릿** 선택
5. 기술 스택: **옵션 A (Modern Stack)** 선택
   - Next.js + Supabase + Tailwind

**결과**: 전체 설계 문서 8개 자동 생성 → 바로 구현 시작 가능

### 시나리오 2: 기존 프로젝트 역설계

**상황**: 레거시 React 프로젝트를 분석하여 문서화

**단계**:
1. `Master_Workflow_Prompt.md` 실행
2. 작업 유형: **역설계** 선택
3. 입력 소스: **폴더 경로** + **Git URL** 제공
4. 베이스 전략: **표준 템플릿** 선택
5. 기술 스택: **자동 분석**
   ```
   ✅ React 17.0.2
   ✅ JavaScript (TypeScript 없음)
   ✅ Redux (전역 상태)
   ❌ 테스트 없음
   ```
   → AI 추천: TypeScript 마이그레이션, Vitest 추가

**결과**: 기존 코드를 분석하여 설계 문서 역생성 → 리팩토링 계획 수립

### 시나리오 3: 커스텀 기술 스택

**상황**: Vue + Python FastAPI + MongoDB 조합 사용

**단계**:
1. `Master_Workflow_Prompt.md` 실행
2. 작업 유형: **신규 설계**
3. 기술 스택: **Other (주관식)** 선택
   ```
   Frontend: Vue 3 + TypeScript + Pinia
   Backend: Python FastAPI
   Database: MongoDB + Mongoose
   Additional: Redis (캐싱), Docker
   ```

**결과**: 커스텀 스택에 맞춘 설계 문서 생성

---

## 📚 자주 묻는 질문 (FAQ)

### Q1. Obsidian이 필요한가요?

**A**: 아니요! 이 문서 시스템은 **일반 마크다운**으로 작성되어 있어 모든 에디터(VS Code, Cursor 등)에서 사용 가능합니다. Obsidian은 선택 사항이며, 관계 그래프를 시각화하려면 유용합니다.

### Q2. 어떤 AI 도구가 필요한가요?

**A**: 다음 도구 중 하나면 됩니다:
- **Claude Code** (추천)
- **Cursor**
- **GitHub Copilot Chat**
- **ChatGPT** (프롬프트 복사 후 사용)

### Q3. 역설계는 어떤 언어를 지원하나요?

**A**: 대부분의 주요 언어와 프레임워크 지원:
- **Frontend**: React, Vue, Angular, Next.js, Nuxt
- **Backend**: Node.js, .NET, Python, Go, Java
- **Database**: PostgreSQL, MySQL, MongoDB, Supabase

### Q4. 기존 프로젝트에 적용할 수 있나요?

**A**: 가능합니다! 역설계 모드를 사용하면 기존 코드를 분석하여 설계 문서를 자동 생성합니다.

### Q5. 팀 프로젝트에서 사용할 수 있나요?

**A**: 네! 이 문서 시스템을 Git으로 공유하면 팀 전체가 일관된 컨벤션을 사용할 수 있습니다. 특히 ID 기반 참조 시스템이 코드 리뷰와 협업에 매우 유용합니다.

---

## 🔗 관련 문서

### 워크플로우 관리 시스템
- [[meta/Workflow_Orchestrator|Workflow_Orchestrator.md]]: 워크플로우 실행 순서 및 의존성 관리
- [[meta/Workflow_Status_Tracker|Workflow_Status_Tracker.md]]: 실행 상태 추적 및 모니터링
- [[meta/Data_Flow_Map|Data_Flow_Map.md]]: 데이터 흐름 시각화 및 파일 위치 매핑
- [[meta/Prompt_Chaining_Strategy|Prompt_Chaining_Strategy.md]]: 프롬프트 체인화 전략

### 핵심 가이드
- [[conventions/Development_Workflow_Guide|Development_Workflow_Guide.md]]: 개발 워크플로우 상세 가이드
- [[conventions/Token_Optimization_Guide|Token_Optimization_Guide.md]]: AI 토큰 최적화 팁
- [[conventions/Accuracy_Improvement_Guide|Accuracy_Improvement_Guide.md]]: 정확도 향상 가이드

### 시작 프롬프트
- [[specs/04_Prompts/Master_Workflow_Prompt|Master_Workflow_Prompt.md]]: 전체 워크플로우 시작

### 평가 시스템
- [[specs/04_Prompts/Quality_Assessment_Prompt|Quality_Assessment_Prompt.md]]: 품질 평가 (190점 만점)
- [[specs/04_Prompts/Test_Report_Prompt|Test_Report_Prompt.md]]: 테스트 리포트 (160점 만점)

---

## 🎓 다음 단계

---

## 🚨 중요: AI에게 전달하는 메시지

**이 README를 읽었다면, 이제 Master Workflow를 시작해주세요!**

다음 프롬프트를 **자동으로 읽고 실행**해주세요:

```
docs/obsidian_design_origin/specs/04_Prompts/Master_Workflow_Prompt.md
```

**실행 방법**:
1. 위 파일을 Read 도구로 읽기
2. 프롬프트 본문(💬 프롬프트 본문 섹션) 실행
3. Phase 0부터 시작 (4가지 질문 - Function Call)

**❌ 하지 말아야 할 것**:
- ❌ "어떤 작업을 진행할까요?" 같은 질문을 바로 하지 마세요
- ❌ Phase 0을 건너뛰지 마세요
- ❌ 사용자에게 "무엇을 도와드릴까요?"를 묻지 마세요

**✅ 해야 할 것**:
- ✅ Master_Workflow_Prompt.md 파일을 읽고 실행
- ✅ Phase 0에서 4가지 질문 (작업 유형, 입력 소스, 베이스 전략, 기술 스택)
- ✅ Phase 1-8 자동 실행
- ✅ Phase 9에서 8가지 액션 옵션 제공

**지금 바로 Master_Workflow_Prompt.md를 읽고 시작해주세요!**

---

## 📄 라이선스

이 문서 시스템은 프로젝트의 라이선스를 따릅니다.

---

**Made with ❤️ for better software design**