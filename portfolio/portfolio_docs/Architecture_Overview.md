# Architecture Overview

**문서 ID**: `page.portfolio.architecture`

> [!NOTE] 옵시디언 네비게이션 허브
> 본 문서는 **옵시디언에서 네비게이션 역할을 하는 위키백과 첫 페이지**처럼 설계되었습니다. 포트폴리오의 전체 구조를 한눈에 파악하고, 각 문서로 빠르게 이동할 수 있도록 구성되어 있습니다.

---

## 👤 사용자 소개 및 문서 개요

### 작성자 정보

**이름**: 권순룡  
**소속**: 한솔코에버 연구소 대리 (2020.09 ~ 재직중)  
**총 경력**: 5년 (2020~2025)  
**이메일**: m920831@naver.com

> [!QUOTE] 핵심 철학
> **"모델보다 데이터, 데이터보다 정보, 지식구조를 정리하는 현장친화적 연구원"**

### 주요 성과

- **GS 인증 2개**: CoCTK, AMS(PDS) 소프트웨어 품질 인증 1등급
- **12개 섹션, 53개+ 프로젝트**: 기술 진화 계보부터 미래 프로젝트까지 다양한 솔루션 구축
- **9편 논문**: 학술 연구 및 논문 발표
- **특허 출원/등록**: 피쉬본 관리 시스템 등

### 문서 목적

본 문서는 단순한 단일 시스템이 아닌, **4대 전문 영역(AI, 플랫폼, 센서, 산업안전/에너지)**에서 구축된 다양한 솔루션들의 통합 아키텍처와 기술 스택을 상세히 설명합니다.

**대상 독자**:
- 기술자: 시스템 아키텍처와 기술 스택을 이해하고자 하는 개발자
- PM/기획자: 프로젝트 구조와 비즈니스 가치를 파악하고자 하는 기획자
- 연구자: 기술의 학술적 근거와 실증 사례를 확인하고자 하는 연구자
- 처음 보는 사람: 포트폴리오의 전체 구조를 빠르게 파악하고자 하는 독자

**관련 문서**: [[00_Personal_Profile|개인 프로필]] (`page.portfolio.personal_profile`) - 상세한 개인 정보 및 기술 철학

---

## 📑 목차 (Table of Contents)

1. [👤 사용자 소개 및 문서 개요](#사용자-소개-및-문서-개요) - 권순룡 소개 및 핵심 철학
2. [📂 포트폴리오 문서 구조](#포트폴리오-문서-구조) - 폴더 구조 및 문서 간 관계
3. [🧭 옵시디언 빠른 네비게이션](#옵시디언-빠른-네비게이션) - 카테고리별 빠른 링크
4. [🏗️ 솔루션 도메인별 아키텍처](#솔루션-도메인별-아키텍처)
   - 1. AI & Analytics: AMS/CoCTK 엔진
   - 2. Digital Transformation Platform: DPS
   - 3. Energy Optimization
   - 4. Smart Sensors & IoT
5. [🎯 AMS 프로젝트 핵심 성과](#ams-프로젝트-핵심-성과)
6. [🏗️ AMS 시스템 아키텍처](#ams-시스템-아키텍처)
7. [📊 데이터 파이프라인](#데이터-파이프라인)
8. [📋 데이터베이스 설계](#데이터베이스-설계)
9. [🗺️ obsidian_design_origin 시스템](#obsidian_design_origin-시스템)
10. [🤖 Cloud Sub-Agent & Governance](#ai-workflow--automation)
11. [🚀 사무 자동화의 미래 비전](#사무-자동화의-미래-비전)
12. [🌐 Platform All: 통합 플랫폼 생태계](#platform-all-통합-플랫폼-생태계)
    - 7.1 Original_Development_Plan: LangGraph Chain 설계 방법론 및 LLM 트러블슈팅 시스템

> [!TIP] 옵시디언 네비게이션
> 옵시디언에서 자동으로 앵커 링크가 생성되므로, 목차의 링크를 클릭하면 해당 섹션으로 바로 이동할 수 있습니다.

---

## 📂 포트폴리오 문서 구조

### 폴더 구조 개요

포트폴리오 문서는 `portfolio/portfolio_docs/` 폴더에 체계적으로 구성되어 있습니다. 각 폴더와 파일의 역할은 다음과 같습니다:

**폴더 구조 머메이드 그래프**:

```mermaid
graph TB
    subgraph "portfolio/portfolio_docs/"
        direction TB
        
        subgraph "핵심 문서 (00_*.md)"
            Index[00_Portfolio_Index.md<br/>포트폴리오 인덱스]
            Profile[00_Personal_Profile.md<br/>개인 프로필]
            IDGuide[00_ID_System_Guide.md<br/>ID 시스템 가이드]
            AIGuide[00_AI_Workflow_Guide.md<br/>AI 워크플로우 가이드]
            PMGuide[00_PM_Roles_Guide.md<br/>PM 역할 가이드]
            TeamGuide[00_Team_Roles_Guide.md<br/>팀 역할 가이드]
            RelMap[00_Relationship_Map.md<br/>관계 맵]
        end
        
        subgraph "프로젝트 문서"
            Projects[02_Projects_Overview.md<br/>프로젝트 개요]
            Architecture[Architecture_Overview.md<br/>아키텍처 개요<br/>현재 문서]
            Academic[04_Academic_Publications.md<br/>학술 논문]
            Testing[Testing_Context.md<br/>테스트 컨텍스트]
        end
        
        subgraph "Executive_Summary/"
            Exec00[00_Overview_For_Non_Technical.md<br/>비전문가용 개요]
            Exec01[01_Key_Achievements.md<br/>핵심 성과]
            Exec02[02_Business_Value.md<br/>비즈니스 가치]
            Exec03[03_Technology_Simplified.md<br/>기술 간소화]
            Exec04[04_Visual_Portfolio.md<br/>시각적 포트폴리오]
        end
        
        subgraph "Phase_1_Foundation/"
            Step01[Step_01_Repetitive_Work.md<br/>반복 업무 식별]
            Step02[Step_02_Expertise_Targeting.md<br/>전문성 타겟팅]
            Step03[Step_03_Micro_Starts.md<br/>초소형 시작]
            Step04[Step_04_Modularization.md<br/>모듈화]
            Step05[Step_05_IO_Optimization.md<br/>I/O 최적화]
        end
        
        subgraph "Phase_2_Assets/"
            Step06[Step_06_Daily_Log.md<br/>데일리 로그]
            Step07[Step_07_Visuals.md<br/>시각 자산]
        end
        
        subgraph "Phase_3_Expansion/"
            Step08[Step_08_Feedback_Loop.md<br/>피드백 루프]
            Step09[Step_09_Continuous_Update.md<br/>지속 업데이트]
        end
        
        subgraph "templates/"
            Templates[템플릿 문서들<br/>8개 파일]
        end
        
        subgraph "assets/"
            Assets[자산 파일들<br/>PDF, 이미지 등]
        end
    end
    
    Architecture -.->|참조| Index
    Architecture -.->|참조| Profile
    Architecture -.->|참조| Projects
    Architecture -.->|참조| Academic
    Architecture -.->|참조| Testing
    Architecture -.->|참조| Exec01
    Architecture -.->|참조| Step02
    
    style Architecture fill:#e74c3c,color:#fff
    style Index fill:#3498db,color:#fff
    style Profile fill:#9b59b6,color:#fff
    style Projects fill:#e67e22,color:#fff
```

### 문서 간 연결 관계

**문서 간 연결 관계 머메이드 그래프**:

```mermaid
graph LR
    Start[Architecture_Overview.md<br/>현재 문서<br/>네비게이션 허브]
    
    Profile[00_Personal_Profile.md<br/>개인 프로필]
    Index[00_Portfolio_Index.md<br/>포트폴리오 인덱스]
    Projects[02_Projects_Overview.md<br/>프로젝트 개요]
    Academic[04_Academic_Publications.md<br/>학술 논문]
    Testing[Testing_Context.md<br/>테스트 컨텍스트]
    Exec00[Executive_Summary/<br/>00_Overview_For_Non_Technical.md]
    Exec01[Executive_Summary/<br/>01_Key_Achievements.md]
    Exec02[Executive_Summary/<br/>02_Business_Value.md]
    Step02[Phase_1_Foundation/<br/>Step_02_Expertise_Targeting.md]
    IDGuide[00_ID_System_Guide.md<br/>ID 시스템 가이드]
    AIGuide[00_AI_Workflow_Guide.md<br/>AI 워크플로우 가이드]
    RelMap[00_Relationship_Map.md<br/>관계 맵]
    
    Start -->|개인 정보| Profile
    Start -->|전체 개요| Index
    Start -->|프로젝트 상세| Projects
    Start -->|학술 성과| Academic
    Start -->|실증 사례| Testing
    Start -->|비전문가용| Exec00
    Start -->|핵심 성과| Exec01
    Start -->|비즈니스 가치| Exec02
    Start -->|실행 가이드| Step02
    Start -->|ID 시스템| IDGuide
    Start -->|AI 워크플로우| AIGuide
    Start -->|관계 맵| RelMap
    
    style Start fill:#e74c3c,color:#fff
    style Profile fill:#9b59b6,color:#fff
    style Projects fill:#e67e22,color:#fff
    style Exec01 fill:#3498db,color:#fff
```

### 각 폴더/파일의 역할

#### 핵심 문서 (00_*.md)

- **[[00_Portfolio_Index|00_Portfolio_Index.md]]**: 포트폴리오의 전체 인덱스 및 9단계 실행 가이드
- **[[00_Personal_Profile|00_Personal_Profile.md]]**: 개인 프로필, 학력, 경력, 기술 철학
- **[[00_ID_System_Guide|00_ID_System_Guide.md]]**: ID 시스템 명명 규칙 및 사용 방법
- **[[00_AI_Workflow_Guide|00_AI_Workflow_Guide.md]]**: AI 워크플로우 및 문서 참조 전략
- **[[00_PM_Roles_Guide|00_PM_Roles_Guide.md]]**: PM 역할 및 책임 가이드
- **[[00_Team_Roles_Guide|00_Team_Roles_Guide.md]]**: 팀 역할 및 협업 가이드
- **[[00_Relationship_Map|00_Relationship_Map.md]]**: 프로젝트 간 관계 시각화

#### 프로젝트 문서

- **[[02_Projects_Overview|02_Projects_Overview.md]]**: 12개 섹션, 53개+ 프로젝트 상세 요약
- **Architecture_Overview.md** (현재 문서): 통합 시스템 아키텍처 및 기술 스택
- **[[04_Academic_Publications|04_Academic_Publications.md]]**: 학술 연구 및 논문 성과
- **[[Testing_Context|Testing_Context.md]]**: 실증 및 검증 사례

#### Executive_Summary/ (요약 문서)

- **[[Executive_Summary/00_Overview_For_Non_Technical|00_Overview_For_Non_Technical.md]]**: 비전문가를 위한 개요
- **[[Executive_Summary/01_Key_Achievements|01_Key_Achievements.md]]**: 핵심 성과 요약
- **[[Executive_Summary/02_Business_Value|02_Business_Value.md]]**: 비즈니스 가치 분석
- **[[Executive_Summary/03_Technology_Simplified|03_Technology_Simplified.md]]**: 기술 간소화 설명
- **[[Executive_Summary/04_Visual_Portfolio|04_Visual_Portfolio.md]]**: 시각적 포트폴리오

#### Phase_1_Foundation/ (Phase 1 문서)

- **[[Phase_1_Foundation/Step_01_Repetitive_Work|Step_01_Repetitive_Work.md]]**: 반복 업무 식별
- **[[Phase_1_Foundation/Step_02_Expertise_Targeting|Step_02_Expertise_Targeting.md]]**: 전문성 타겟팅
- **[[Phase_1_Foundation/Step_03_Micro_Starts|Step_03_Micro_Starts.md]]**: 초소형 시작
- **[[Phase_1_Foundation/Step_04_Modularization|Step_04_Modularization.md]]**: 모듈화 전략
- **[[Phase_1_Foundation/Step_05_IO_Optimization|Step_05_IO_Optimization.md]]**: I/O 최적화

#### Phase_2_Assets/ (Phase 2 문서)

- **[[Phase_2_Assets/Step_06_Daily_Log|Step_06_Daily_Log.md]]**: 데일리 로그 기록
- **[[Phase_2_Assets/Step_07_Visuals|Step_07_Visuals.md]]**: 시각적 자산 생성

#### Phase_3_Expansion/ (Phase 3 문서)

- **[[Phase_3_Expansion/Step_08_Feedback_Loop|Step_08_Feedback_Loop.md]]**: 피드백 루프
- **[[Phase_3_Expansion/Step_09_Continuous_Update|Step_09_Continuous_Update.md]]**: 지속 업데이트

#### templates/ (템플릿)

- 8개의 문서 템플릿 (프로젝트 요약, 평가, 메트릭, 타임라인 등)

#### assets/ (자산)

- PDF 문서, 이미지 등 자산 파일

### ID 시스템

모든 문서는 고유 ID를 가지며, `type.module.name` 형식으로 명명됩니다:
- `page.portfolio.*`: 포트폴리오 문서
- `phase.foundation.*`: Phase 1 단계
- `project.*`: 프로젝트

자세한 내용은 [[00_ID_System_Guide|ID 시스템 가이드]]를 참조하세요.

---

## 🧭 옵시디언 빠른 네비게이션

### 📋 시작하기

- [[00_Portfolio_Index|포트폴리오 인덱스]] (`page.portfolio.index`) - 전체 포트폴리오 개요
- [[00_Personal_Profile|개인 프로필]] (`page.portfolio.personal_profile`) - 권순룡 소개 및 기술 철학

### 📊 프로젝트 정보

- [[02_Projects_Overview|프로젝트 개요]] (`page.portfolio.projects`) - 12개 섹션, 53개+ 프로젝트 상세
- [[04_Academic_Publications|학술 논문]] (`page.portfolio.academic`) - 10편 논문 목록
- [[Testing_Context|테스트 컨텍스트]] (`page.portfolio.testing`) - 실증 사례

### 📈 요약 문서

- [[Executive_Summary/00_Overview_For_Non_Technical|비전문가용 개요]] - 비전문가를 위한 간단한 설명
- [[Executive_Summary/01_Key_Achievements|핵심 성과]] - 주요 성과 요약
- [[Executive_Summary/02_Business_Value|비즈니스 가치]] - 비즈니스 가치 분석
- [[Executive_Summary/03_Technology_Simplified|기술 간소화]] - 기술을 쉽게 설명
- [[Executive_Summary/04_Visual_Portfolio|시각적 포트폴리오]] - 시각화된 포트폴리오

### 🎯 실행 가이드

#### Phase 1: Foundation (작은 성공)
- [[Phase_1_Foundation/Step_01_Repetitive_Work|Step 1: 반복 업무 식별]]
- [[Phase_1_Foundation/Step_02_Expertise_Targeting|Step 2: 전문성 타겟팅]]
- [[Phase_1_Foundation/Step_03_Micro_Starts|Step 3: 초소형 시작]]
- [[Phase_1_Foundation/Step_04_Modularization|Step 4: 모듈화]]
- [[Phase_1_Foundation/Step_05_IO_Optimization|Step 5: I/O 최적화]]

#### Phase 2: Assets (지식 자산화)
- [[Phase_2_Assets/Step_06_Daily_Log|Step 6: 데일리 로그]]
- [[Phase_2_Assets/Step_07_Visuals|Step 7: 시각 자산]]

#### Phase 3: Expansion (확장)
- [[Phase_3_Expansion/Step_08_Feedback_Loop|Step 8: 피드백 루프]]
- [[Phase_3_Expansion/Step_09_Continuous_Update|Step 9: 지속 업데이트]]

### 📚 가이드 문서

- [[00_ID_System_Guide|ID 시스템 가이드]] (`guide.id.system`) - ID 명명 규칙 및 사용 방법
- [[00_AI_Workflow_Guide|AI 워크플로우 가이드]] (`guide.ai.workflow`) - AI 워크플로우 및 문서 참조 전략
- [[00_Relationship_Map|관계 맵]] (`page.portfolio.relationship_map`) - 프로젝트 간 관계 시각화
- [[00_PM_Roles_Guide|PM 역할 가이드]] - PM 역할 및 책임
- [[00_Team_Roles_Guide|팀 역할 가이드]] - 팀 역할 및 협업

### 📖 문서 읽기 순서 가이드

#### 처음 보는 사람
1. [[00_Personal_Profile|개인 프로필]] - 작성자 소개
2. [[00_Portfolio_Index|포트폴리오 인덱스]] - 전체 개요
3. [[Executive_Summary/00_Overview_For_Non_Technical|비전문가용 개요]] - 간단한 설명

#### 기술자
1. **Architecture_Overview.md** (현재 문서) - 시스템 아키텍처
2. [[02_Projects_Overview|프로젝트 개요]] - 프로젝트 상세
3. [[Testing_Context|테스트 컨텍스트]] - 실증 사례

#### PM/기획자
1. [[Executive_Summary/02_Business_Value|비즈니스 가치]] - 비즈니스 가치 분석
2. [[Executive_Summary/01_Key_Achievements|핵심 성과]] - 주요 성과
3. [[02_Projects_Overview|프로젝트 개요]] - 프로젝트 상세

#### 연구자
1. [[04_Academic_Publications|학술 논문]] - 논문 목록
2. [[Testing_Context|테스트 컨텍스트]] - 실증 사례
3. **Architecture_Overview.md** (현재 문서) - 기술 아키텍처

---

## 🏛️ Global Governance Architecture

> [!IMPORTANT] 거버넌스 레이어 (The "Overseers")
> 단순한 기능 구현을 넘어, 전체 시스템의 품질, 표준 준수, 리스크를 관리하는 **3대 거버넌스 에이전트**가 존재합니다.

### 시스템 거버넌스 계층 구조

```mermaid
graph TB
    subgraph "Governance & QA Layer (Supervisory)"
        EVAL["Evaluation Framework<br/>Validation"]
        PROMPT["Prompt Eval Engine<br/>Gating"]
        PM["PM Agent<br/>Management"]
    end

    subgraph "Implementation Layer (Execution)"
        AMS[AMS Engine]
        DPS[DPS Platform]
        CoCTK[CoCTK Tool]
        Service[Microservices]
    end

    EVAL --> AMS
    EVAL --> DPS
    EVAL --> CoCTK
    EVAL --> Service
    PROMPT --> AMS
    PROMPT --> DPS
    PROMPT --> CoCTK
    PROMPT --> Service
    PM --> AMS
    PM --> DPS
    PM --> CoCTK
    PM --> Service

    style EVAL fill:#ffcdd2,stroke:#d32f2f
    style PROMPT fill:#e1bee7,stroke:#7b1fa2
    style PM fill:#bbdefb,stroke:#1976d2
```

### 3대 거버넌스 에이전트

#### 1. Evaluation Framework (System-wide Validator)
- **역할**: 전사적 코드 및 문서 품질 검증
- **범위**: 49개 Python 모듈, 298개 기술 문서 전수 검사
- **권한**: 아키텍처 위배 사항 발견 시 배포 차단 권고

#### 2. Prompt Evaluation Engine (AI Gatekeeper)
- **역할**: AI 프롬프트 최적화 및 승인
- **범위**: 모든 AI 생성물(코드, 문서)의 입력 프롬프트 검열
- **권한**: 저품질 프롬프트 실행 차단 (Gatekeeping)

#### 3. PM Agent (Execution Manager)
- **역할**: 비즈니스 리스크 및 일정 무결성 관리
- **범위**: 계약서, 회의록, 과업지시서 등 비정형 문서
- **권한**: 누락된 산출물 식별 및 경고 (Integrity Check)

### Continuity & Safety Pipeline

시스템의 **연속성**과 **안전성**을 보장하기 위한 전용 파이프라인이 구축되어 있습니다.

```mermaid
graph LR
    Dev[Development Loop] -->|Code Gen| Risk["AI Risk Check<br/>(8 Categories)"]
    Risk -->|Fail| Dev
    Risk -->|Pass| Deploy[Deployment]
    
    Sleep[Inactive State] -->|Resume| Context["Previous Work Analysis<br/>(Context Restore)"]
    Context --> Dev
    
    style Risk fill:#ffecb3,stroke:#ff6f00
    style Context fill:#e3f2fd,stroke:#1565c0
```

- **Previous Work Analysis**: 개발 중단 후 복귀 시 '인지 부하(Cognitive Load)'를 제로화하는 **컨텍스트 복원 엔진**.
- **AI Risk Check**: AI가 생성한 코드의 보안/로직/데이터 등 8가지 잠재 위험을 사전에 차단하는 **Safety Net**.

---

## 🏗️ 솔루션 도메인별 아키텍처

> [!NOTE] 섹션 개요
> 본 섹션은 4대 전문 영역(AI, 플랫폼, 센서, 산업안전/에너지)에서 구축된 다양한 솔루션들의 아키텍처를 설명합니다.
> 
> **관련 문서**:
> - [[02_Projects_Overview|프로젝트 개요]] - 프로젝트 상세 정보
> - [[Executive_Summary/01_Key_Achievements|핵심 성과]] - 주요 성과 요약
> - [[Testing_Context|테스트 컨텍스트]] - 실증 사례

### 1. AI & Analytics: AMS/CoCTK 엔진

**AMS (Analysis Management System)**는 데이터 수집부터 이상 탐지, FMEA 생성까지의 전체 파이프라인을 담당하는 핵심 분석 엔진입니다.
- **개발 기간**: 2020~2025 (최종: 2024.07~2025.03, 한국산업기술진흥원)
- **역할**: 총괄 PM
- **성과**: GS 1등급, 이상탐지율 93.7%, 특허 등록
- (상세 내용은 하단 'AMS 시스템 아키텍처' 섹션 참조)

**CoCTK (Consulting Tool Kit)**는 데이터 전처리, 상관관계 분석, 비용 최적화를 위한 통합 분석 도구입니다.
- **개발 기간**: 2022.03~2024 (중소기업기술정보진흥원)
- **역할**: 엔진 총괄 설계 및 화면설계 개발 PM
- **성과**: GS 1등급 취득
- **기술**: Python 분석 엔진 + C# WinForms UI
- **주요 모듈**: 02_CoCTK (4개 Python 파일) - 비용 분석, 최적화 알고리즘

**FBS (Fishbone Structure)**는 피쉬본 다이어그램 자동 생성 알고리즘의 초기 개발 프로젝트입니다.
- **개발 기간**: 2020.09~2021.10 (한국에너지기술평가원)
- **역할**: 핵심 알고리즘 개발
- **성과**: AMS의 핵심 모듈(03_FBS)로 발전
- **주요 모듈**: 03_FBS (6개 Python 파일) - 피쉬본 구조 생성, 원인 분석

### 2. Digital Transformation Platform: DPS (데이터수집시스템)
금속 공정 자동화를 위한 **모듈화 5층 아키텍처**입니다. 

```mermaid
graph TD
    Layer5[서비스 및 UI Layer: 특성요인도 시각화, 모니터링]
    Layer4[통합 및 본체론 Layer: Neo4j 그래프DB, 4M2E 관계 정의]
    Layer3[AI 엔진 Layer: 가상 센서, 이상 검출 알고리즘]
    Layer2[데이터 수집 Layer: 실시간 스트리밍, PLC/MES 인터페이스]
    Layer1[보안 및 관리 Layer: 인증/권한, 로그 감사, 시스템 관리]
    
    Layer2 --> Layer3
    Layer3 --> Layer4
    Layer4 --> Layer5
    Layer1 -.-> Layer2 & Layer3 & Layer4 & Layer5
```

- **기술 특징**: Docker 컨테이너 기반의 **마이크로서비스 아키텍처**, 서버-엣지 하이브리드 인프라 지원.

### 3. Energy Optimization: 산업용 에너지 관리 플랫폼
클린룸 및 공장 에너지 효율화를 위한 AI 최적화 엔진입니다.

- **프로세스**: 데이터 수집 → 전처리 → **AI 최적화 규칙 생성** → 실시간 제어 및 최적화 제안.
- **성과**: 에너지 소비 패턴 분석을 통한 효율 20% 향상.

### 4. Smart Sensors & IoT: 지능형 복합 센서
고가의 센서를 대체하는 **저비용-보급형 스마트센서** 및 **가상 센서(Virtual Sensor)** 구조입니다.

**3-Type Virtual Sensors (Pattern/Calculation/Prediction)**:
```mermaid
graph LR
    VS[Virtual Sensor]
    
    VS --> T1["Type 1: Pattern-based<br/>패턴 분석 결과 자체를 센서값으로 활용<br/>(예: 전력 패턴 → 가동 상태)"]
    VS --> T2["Type 2: Calculation-based<br/>이종 데이터 결합 계산<br/>(예: V*I = P)"]
    VS --> T3["Type 3: Prediction-based<br/>백그라운드 정보/시뮬레이션 기반 예측<br/>(예: 물리 센서 부재 시 AI 추론)"]
    
    style T1 fill:#e3f2fd
    style T2 fill:#f3e5f5
    style T3 fill:#e8f5e9
```

- **Edge Computing**: 센서 레벨에서 데이터 전처리 및 이상 검출을 수행하여 서버 부하 감소.
- **모듈화 디자인**: 온도, 습도, 진동, 전류 등 필요한 측정항목을 자유롭게 결합 가능.

---

## 🎯 AMS 프로젝트 핵심 성과

> [!NOTE] 섹션 개요
> 본 섹션은 AMS (Analysis Management System) 프로젝트의 핵심 성과를 상세히 설명합니다.
> 
> **관련 문서**:
> - [[02_Projects_Overview|프로젝트 개요]] - AMS 프로젝트 상세 정보
> - [[Executive_Summary/01_Key_Achievements|핵심 성과]] - 주요 성과 요약
> - [[Testing_Context|테스트 컨텍스트]] - 실증 사례 (세아특수강, 포미아)

### 프로젝트 개요

**개발 기간**: 2020~2025년 초 (최종 단계: 2024.07~2025.03)
**발주처**: 한국산업기술진흥원 (KIAT)
**프로젝트**: 한솔코에버 AMS (Analysis Management System)
**역할**: 총괄 PM (Project Manager)
**개발 총괄**: 권순룡 (한솔코에버 연구소 팀장)

**한솔코에버**:
- 한솔그룹 자회사
- EMS, MES, AI, 3D 프린팅, 스마트 팩토리 전문 기업
- 제조 및 에너지 IT 전문

### Python 엔진 100% 자체 개발

**총 49개 Python 파일로 구성**:

| 모듈 | 파일 수 | 주요 기능 | 담당 |
|------|---------|-----------|------|
| **01_MLS** (Machine Learning Service) | 15개 | 머신러닝 모델 학습, 데이터 전처리 | 권순룡 |
| **02_CoCTK** (Cost Control Toolkit) | 4개 | 비용 분석, 최적화 | 권순룡 |
| **03_FBS** (Fishbone Structure) | 6개 | 피쉬본 구조 생성, 원인 분석 | 권순룡 |
| **04_RMS** (Range Management System) | 4개 | 범위 관리, 클러스터링 | 권순룡 |
| **05_AMS_dev** (Analysis Management System) | 17 개 | 통합 이상 관리, FMEA 생성 | 권순룡 |
| **common** | 2개 | 공통 모듈 (DB 연결, 로깅) | 권순룡 |

**주요 파일**:
```
AI_docker_en/
├── 01_MLS/
│   ├── main_mls.py
│   ├── AI_preprocessing.py
│   ├── data_loader.py
│   ├── feature_progress.py
│   └── ...
├── 02_CoCTK/
│   ├── main_ctk.py
│   └── ctk_ver2.py
├── 03_FBS/
│   ├── main_fbs.py
│   ├── fish_born_making.py
│   └── AI_preprocessing.py
├── 04_RMS/
│   ├── main_rms.py
│   ├── cluster_auto_Binarization.py
│   └── AI_preprocessing.py
├── 05_AMS_dev/
│   ├── main_ams.py
│   ├── data_pipeline.py
│   ├── bayesian_network_analyzer.py
│   ├── generate_fmea.py
│   └── save_data_graphDB.py
└── common/
    ├── mssql_db_connection.py
    └── error_log.py
```

### 핵심 성과

- ✅ **GS 인증 1등급**: 소프트웨어 품질 인증 최고 등급 획득
- ✅ **특허 출원/등록**: 한솔코에버 명의로 특허 출원 및 등록
- ✅ **논문 발표**: 관련 연구 논문 게재 (2024, 2025)
- ✅ **이상 탐지율 93.7%**: 실증 검증된 높은 정확도
- ✅ **실 납품**: 세아특수강, 포미아(포항소재산업진흥원)
- ✅ **검증 완료**: 내부 개발 + 현장 테스트 + 컨설팅 POC

---

## 🏗️ AMS 시스템 아키텍처

> [!NOTE] 섹션 개요
> 본 섹션은 AMS 시스템의 전체 아키텍처, 기술 스택, 프론트엔드/백엔드 구조를 설명합니다.
> 
> **관련 문서**:
> - [[02_Projects_Overview|프로젝트 개요]] - AMS 프로젝트 상세 정보
> - [[Phase_1_Foundation/Step_02_Expertise_Targeting|전문성 타겟팅]] - AMS 개발 과정

### 전체 시스템 구조

```mermaid
graph TB
    subgraph "Frontend Layer"
        A1[C# WinForms<br/>DevExpress UI]
        A2[React 18.3.1<br/>Web Dashboard]
    end
    
    subgraph "Backend Layer - Python Engine"
        B1[MLS Service<br/>Machine Learning]
        B2[FBS Service<br/>Fishbone Analysis]
        B3[RMS Service<br/>Range Management]
        B4[AMS Service<br/>Integrated Analysis]
    end
    
    subgraph "Data Layer"
        C1[(MSSQL Server<br/>FactAI)]
        C2[(Neo4j<br/>Graph DB)]
    end
    
    A1 --> B4
    A2 --> B4
    B4 --> B1
    B4 --> B2
    B4 --> B3
    B1 --> C1
    B2 --> C1
    B3 --> C1
    B4 --> C1
    B4 --> C2
    
    style A1 fill:#e1f5ff
    style A2 fill:#e1f5ff
    style B4 fill:#fff4e1
    style C1 fill:#e8f5e9
    style C2 fill:#fce4ec
```

### 🧬 핵심 알고리즘 진화 (Core Algorithm Evolution)

AMS의 AI 엔진은 2020년 일본 O-WELL 프로젝트에서 시작되어, 4년간의 현장 검증을 통해 **계층적 클러스터링**과 **패턴 민주주의**라는 독자적인 알고리즘으로 진화했습니다.

#### AMS Origin & Evolution Steps

```mermaid
graph TD
    subgraph "Phase 1: Origin (2020-2022)"
        OWELL["🇯🇵 O-WELL Japan Project<br/>AMS Origin"] --> HC["계층적 클러스터링<br/>(Hierarchical Clustering)"]
        HC -->|하드코딩 한계 극복| PV["초기 패턴 분석"]
    end

    subgraph "Phase 2: Experiment (2022-2023)"
        SWC["SWC<br/>(Sliding Window Correlation)"] -.->|기능 중복/제외| PV
        PV -->|앙상블 고도화| Voting["패턴 민주주의<br/>(Pattern Voting)"]
    end

    subgraph "Phase 3: Completion (2024-2025)"
        Voting --> AMS["AMS 3.0 Engine<br/>(System Integration)"]
    end

    style OWELL fill:#fff3e0,stroke:#ff9800
    style SWC fill:#ffebee,stroke:#f44336,stroke-dasharray: 5 5
    style Voting fill:#e8f5e9,stroke:#4caf50
```

#### 패턴 민주주의 (Pattern Voting Mechanism)

다양한 알고리즘이 각각의 관점에서 이상을 탐지하고, 투표를 통해 최종 결정을 내리는 **앙상블(Ensemble)** 구조입니다.

| 단계 | 알고리즘 | 역할 |
|:---|:---|:---|
| 1 | **FBS (Fishbone)** | 인과관계 기반의 논리적 이상 탐지 |
| 2 | **RMS (Range)** | 통계적 범위 기반의 정량적 이상 탐지 |
| 3 | **PDS (Pattern)** | 시계열 패턴 유사도 기반의 정성적 이상 탐지 |
| **결정** | **Voting** | 3개 엔진의 가중치 합산 → 최종 안심/주의/경보 판정 |

### 기술 스택

#### Frontend

**C# WinForms** (주요 인터페이스):
- 언어: C# 7.0+ (.NET Framework 4.8)
- UI 라이브러리: DevExpress
- 내부 프레임워크: FactMES
- HTTP 클라이언트: System.Net.Http.HttpClient

**React** (웹 대시보드):
- React: 18.3.1
- TypeScript: 5.5.3
- Vite: 7.1.12
- Tailwind CSS: 3.4.11
- React Query: 5.56.2
- Recharts: 2.12.7

#### Backend (Python Engine)

**Python**: 3.9.18
**주요 라이브러리**:
- pandas >= 1.5.0
- numpy >= 1.23.0
- scikit-learn >= 1.2.0
- pgmpy >= 0.1.19 (베이지안 네트워크)
- pyodbc >= 4.0.39
- sqlalchemy >= 2.0.0
- neo4j >= 5.0.0
- networkx >= 2.8.0

#### Database

- **MSSQL Server**: 메인 관계형 데이터베이스 (FactAI)
- **Neo4j**: 그래프 데이터베이스 (관계 분석)

---

## 📊 데이터 파이프라인

> [!NOTE] 섹션 개요
> 본 섹션은 AMS의 데이터 파이프라인 구조와 각 단계별 처리 과정을 설명합니다.
> 
> **관련 문서**:
> - [[Phase_1_Foundation/Step_05_IO_Optimization|I/O 최적화]] - 파일 기반 파이프라인
> - [[02_Projects_Overview|프로젝트 개요]] - 파이프라인 관련 프로젝트

### AMS 전체 파이프라인

```mermaid
sequenceDiagram
    participant Factory as 공장 센서
    participant MLS as MLS Service
    participant FBS as FBS Service
    participant RMS as RMS Service
    participant AMS as AMS Service
    participant Neo4j as Neo4j DB
    participant FMEA as FMEA Generator
    
    Factory->>MLS: 원시 센서 데이터
    MLS->>MLS: 데이터 전처리<br/>feature_progress.py
    MLS->>MLS: 머신러닝 모델 학습<br/>main_mls.py
    
    MLS->>FBS: 전처리된 데이터
    FBS->>FBS: 피쉬본 구조 생성<br/>fish_born_making.py
    FBS->>FBS: 원인 분석
    
    MLS->>RMS: 전처리된 데이터
    RMS->>RMS: 자동 클러스터링<br/>cluster_auto_Binarization.py
    RMS->>RMS: 범위 관리
    
    FBS->>AMS: FBS 결과
    RMS->>AMS: RMS 결과
    AMS->>AMS: 베이지안 네트워크 분석<br/>bayesian_network_analyzer.py
    AMS->>AMS: 이상 탐지
    
    AMS->>Neo4j: 관계 분석 저장<br/>save_data_graphDB.py
    AMS->>FMEA: 이상 정보
    FMEA->>FMEA: FMEA 자동 생성<br/>generate_fmea.py
    FMEA->>Factory: FMEA 보고서
```

### 파이프라인 단계별 설명

#### 1단계: MLS (Machine Learning Service)

**주요 파일**:
- `main_mls.py`: MLS 메인 서비스
- `AI_preprocessing.py`: 데이터 전처리
- `feature_progress.py`: 특징 추출
- `data_loader.py`: 데이터 로드

**기능**:
- 센서 데이터 수집 및 전처리
- 머신러닝 모델 학습
- 이상 패턴 탐지

#### 2단계: FBS (Fishbone Structure)

**주요 파일**:
- `main_fbs.py`: FBS 메인 서비스
- `fish_born_making.py`: 피쉬본 구조 생성
- `make_fish_born.py`: 피쉬본 구조 최적화

**기능**:
- 피쉬본 다이어그램 자동 생성
- 이상 원인 추적
- 원인-결과 관계 분석

#### 3단계: RMS (Range Management System)

**주요 파일**:
- `main_rms.py`: RMS 메인 서비스
- `cluster_auto_Binarization.py`: 자동 클러스터링
- `make_cluster_ratio.py`: 클러스터 비율 계산

**기능**:
- 데이터 범위 자동 관리
- K-means 클러스터링
- 이진화 및 정상/비정상 범위 설정

#### 4단계: AMS (Analysis Management System)

**주요 파일**:
- `main_ams.py`: AMS 메인 서비스
- `data_pipeline.py`: 데이터 파이프라인
- `bayesian_network_analyzer.py`: 베이지안 네트워크 분석
- `generate_fmea.py`: FMEA 자동 생성
- `save_data_graphDB.py`: Neo4j 그래프 DB 저장

**기능**:
- MLS, FBS, RMS 결과 통합
- 베이지안 네트워크로 확률적 원인 분석
- Neo4j에 관계 데이터 저장
- FMEA 자동 생성

---

## 📋 데이터베이스 설계

> [!NOTE] 섹션 개요
> 본 섹션은 AMS 시스템의 데이터베이스 설계, 주요 테이블 구조, Neo4j 그래프 구조를 설명합니다.
> 
> **관련 문서**:
> - [[Phase_1_Foundation/Step_04_Modularization|모듈화 전략]] - 모듈화된 데이터베이스 구조
> - [[02_Projects_Overview|프로젝트 개요]] - 데이터베이스 관련 프로젝트

### 주요 테이블

#### AMS3000M - AMS 설정 테이블
```sql
CREATE TABLE AMS3000M (
    SNRO_ID INT PRIMARY KEY,          -- 시나리오 ID
    SNRO_NM VARCHAR(100),              -- 시나리오 이름
    FBS_ID INT,                        -- FBS 작업 ID (FK)
    RMS_ID INT,                        -- RMS 작업 ID (FK)
    STD_FBS_ID INT,                    -- 표준 FBS ID
    ANOM_RATE DECIMAL(5,2),            -- 이상율
    USE_YN CHAR(1),                    -- 사용 여부
    FOREIGN KEY (FBS_ID) REFERENCES FBS1100M(JOB_ID),
    FOREIGN KEY (RMS_ID) REFERENCES RMS1100M(JOB_ID)
);
```

#### AMS4000M - AMS 결과 테이블
```sql
CREATE TABLE AMS4000M (
    RSLT_ID INT PRIMARY KEY,           -- 결과 ID
    SNRO_ID INT,                       -- 시나리오 ID (FK)
    RSLT_DT DATETIME,                  -- 결과 일시
    ANOM_TYPE VARCHAR(50),             -- 이상 유형
    SEVERITY INT,                      -- 심각도
    FOREIGN KEY (SNRO_ID) REFERENCES AMS3000M(SNRO_ID)
);
```

### Neo4j 그래프 구조

```cypher
// 노드 타입
(:Sensor {id, name, type})
(:Anomaly {id, timestamp, type, severity})
(:Cause {id, description, probability})
(:Action {id, description, priority})

// 관계
(:Sensor)-[:DETECTED]->(:Anomaly)
(:Anomaly)-[:CAUSED_BY]->(:Cause)
(:Cause)-[:REQUIRES]->(:Action)
(:Cause)-[:RELATED_TO]->(:Cause)
```

---

## 🛠️ obsidian_design_origin 시스템

> [!NOTE] 섹션 개요
> 본 섹션은 설계 문서 기반 개발 시스템인 obsidian_design_origin의 구조와 주요 Architecture 문서를 설명합니다.
> 
> **관련 문서**:
> - [[Phase_1_Foundation/Step_01_Repetitive_Work|반복적 업무 식별]] - 문서 구조 중심 개발 시스템
> - [[Phase_1_Foundation/Step_04_Modularization|모듈화 전략]] - ID 시스템 및 프롬프트 라이브러리
> - [[Phase_1_Foundation/Step_05_IO_Optimization|I/O 최적화]] - 파일 기반 파이프라인

### 개요

**위치**: `AI_agent_test/Original_Development_Plan/docs/obsidian_design_origin/`

**목적**: 설계 문서 기반 개발 시스템 구축

### 구조

```
obsidian_design_origin/
├── architecture/              # 14개 설계 문서
│   ├── Blue_Print.md
│   ├── API_Design.md
│   ├── Database_Design.md
│   ├── Component_Interfaces_Design.md
│   ├── State_Management_Design.md
│   ├── Screen_Design.md
│   ├── Testing_Framework_Design.md
│   ├── Docker_Environment_Design.md
│   ├── Technology_Stack_Specification.md
│   └── ...
├── specs/
│   ├── 04_Prompts/           # 25개+ AI 프롬프트
│   └── 05_Templates/         # 11개+ 문서 템플릿
├── phases/                    # 7개 Phase 가이드
├── conventions/               # 작성 가이드
└── meta/                      # 전략 문서
```

### 주요 Architecture 문서 요약

#### 1. Blue_Print.md
- 프로젝트 전체 청사진
- 페이지/컴포넌트/서비스 명세
- 의존성 테이블

#### 2. Database_Design.md
- MSSQL Server 테이블 설계
- Neo4j 그래프 구조
- ID 기반 관계 추적

#### 3. API_Design.md
- RESTful API 엔드포인트
- 요청/응답 스키마
- 에러 핸들링

#### 4. Component_Interfaces_Design.md
- React/WinForms 컴포넌트 인터페이스
- Props 정의
- 이벤트 핸들러

#### 5. Testing_Framework_Design.md
- Unit Test 전략
- Integration Test 시나리오
- E2E 테스트 계획

---

## 🤖 AI Workflow & Automation: Claude Sub-Agent Systems

> [!NOTE] 섹션 개요
> 본 섹션은 Claude Sub-Agent 기반 AI 워크플로우 자동화 시스템(FMEA 자동화, 프롬프트 평가 엔진)을 설명합니다.
> 
> **관련 문서**:
> - [[Phase_1_Foundation/Step_02_Expertise_Targeting|전문성 타겟팅]] - FMEA 자동화 시스템 구축 과정
> - [[00_AI_Workflow_Guide|AI 워크플로우 가이드]] - AI 워크플로우 전략

### FMEA 자동화 생성 시스템 (Claude Sub-Agent)

> [!NOTE] 진화 스토리
> FMEA 자동화 에이전트는 테크웰/신성오토텍에서 FBS, 패턴 분석, 확률 네트워크가 너무 난해해서 공장 관리자가 이해하지 못하는 문제를 해결하기 위해 탄생했습니다. 상세한 스토리는 [[02_Projects_Overview#022-fmea-자동화-에이전트-진화-스토리-난해한-기술을-현장이-이해하는-언어로|0.2.2 FMEA 자동화 에이전트 진화 스토리]]를 참조하세요.

**핵심 구조**: 코딩 에이전트의 역설계 시스템 구조 적용
- 복잡한 FMEA 프로세스를 역으로 분석하여 Sub-Agent로 분해
- 각 Sub-Agent가 전문 영역(R&D, Mfg, QA)을 담당하는 구조
- 8개 독립 Sub-Agent의 협업 구조

**아키텍처**:
```mermaid
graph TB
    A[Claude Code Master Orchestrator] --> B[Phase 0: 초기 분석]
    A --> C[Phase 1: 구조 분석]
    A --> D[Phase 2: FMEA 생성]
    A --> E[Phase 3: 검증]
    A --> F[Phase 4: 통합]
    A --> G[Phase 5: 최종화]
    
    B --> H[R&D 전문 Sub-Agent]
    B --> I[Mfg 전문 Sub-Agent]
    B --> J[QA 전문 Sub-Agent]
    
    H --> D
    I --> D
    J --> D
    
    D --> E
    E --> F
    F --> G
    
    style A fill:#e1f5ff
    style D fill:#fff4e1
```

**기술적 의의**:
- Python 스크립트 없이 Claude Code 세션 자체가 Orchestrator
- 프롬프트 기반 완전 자동화
- AIAG & VDA FMEA 표준 기반 범용 리스크 분석 시스템

### 프롬프트 평가 엔진 (Claude Sub-Agent)

**핵심 구조**: 프롬프트 저지(Prompt Judging) 시스템
- **AI Gatekeeper**: 모든 AI 생성물의 '입구'를 통제하는 심사관
- **전체 프롬프트 전수 평가**: 시스템 내 모든 프롬프트를 평가하는 완전 자동화 시스템
- AI가 생성한 프롬프트를 다른 AI가 평가하는 이중 검증(Double-Check) 시스템
- 생성 AI와 평가 AI의 분리로 환각(Hallucination) 방지

**평가 프레임워크**:

**3가지 핵심 차원**:
1. **Quality**: Correctness, Faithfulness, Relevance, Helpfulness, Tone, Safety
2. **Consistency**: Reproducibility, Stability across versions/models
3. **Cost**: Token usage, Latency, Throughput

**MLOps Priority Matrix** (실패 영향 기반 가중치):
- **Structural Adherence (40%)**: 파이프라인 중단, JSON 파싱 오류 방지 (최우선)
- **Answer Correctness (30%)**: 환각, 법적 책임 방지
- **Contextual Relevancy (20%)**: 리소스 낭비, UX 저하 방지
- **Coherence/Tone/Safety (10%)**: 브랜드 일관성 유지

**17가지 역할별 동적 가중치 시스템**:
- Chain, Summary, Document, Developer, Analysis, Conversational, Transformation, Extraction, Classification, Validation, RAG, Creative, Educational, Review, Debugging, Translation 등
- 각 역할에 맞는 최적화된 가중치 자동 적용

**병렬 처리 구조**:
- 4개 메트릭 평가를 병렬로 수행 (Structural, Correctness, Relevancy, Coherence)
- 각 평가 후 즉시 요약하여 컨텍스트 압축
- 토큰 효율성 극대화

**5단계 평가 프로세스**:
1. **Phase 1: Role Inference** - 역할 추론 (폴더명, 파일명, 내용 기반 가중치 점수)
2. **Phase 2: Metrics Parallel** - 4개 메트릭 병렬 평가
3. **Phase 3: Consolidation** - 평가자 역할(점수 계산) + 개선방향 역할(권장사항)
4. **Phase 4: Report Generation** - 구조화된 JSON 리포트 생성
5. **Phase 5: Translation** - 한국어 번역 (모든 사용자 소통은 한국어)

**아키텍처**:
```mermaid
graph TB
    A[프롬프트 생성 AI] --> B[생성된 프롬프트]
    B --> C[프롬프트 평가 엔진<br/>AI Gatekeeper]
    
    C --> D[Phase 1: 역할 추론]
    D --> D1[요약: 역할 정보 압축]
    
    D1 --> E{Phase 2: 병렬 평가 4개}
    E --> E1[구조적 준수 평가]
    E --> E2[정답 정확성 평가]
    E --> E3[맥락 관련성 평가]
    E --> E4[일관성/어조/안전성 평가]
    
    E1 --> F1[요약: 구조 평가]
    E2 --> F2[요약: 정확성 평가]
    E3 --> F3[요약: 관련성 평가]
    E4 --> F4[요약: 일관성 평가]
    
    F1 --> G[컨텍스트 리셋]
    F2 --> G
    F3 --> G
    F4 --> G
    
    G --> H[Phase 3-1: 평가자 역할<br/>점수 계산 및 판정]
    G --> I[Phase 3-2: 개선방향 역할<br/>권장사항 제시]
    
    H --> J[Phase 4: 리포트 생성]
    I --> J
    J --> K[Phase 5: 한국어 번역]
    K --> L{통과?}
    
    L -->|Yes| M[승인된 프롬프트]
    L -->|No| N[재생성 요청]
    N --> A
    
    style C fill:#fff4e1
    style E fill:#fff3cd
    style G fill:#d1ecf1
    style H fill:#d4edda
    style I fill:#d4edda
    style L fill:#ffebee
    style M fill:#e8f5e9
```

**Human-in-the-Loop 프로세스** (8단계 필수 검증):
1. Asset Integrity Check - 필수 스펙 파일 확인
2. Input Scanning - 파일/폴더/목록 입력
3. Folder File Selection - 폴더 내 파일 선택
4. Task Selection - 평가/가이드 수정/결과 조회
5. Role Inference & Confirmation - 역할 추론 및 확인
6. API Selection - Target API 또는 Universal 평가
7. Save Path Confirmation - 저장 경로 확인
8. Final Evaluation Start - 최종 확인 후 실행

**기술적 의의**:
- **전체 프롬프트 전수 평가**: 시스템 내 모든 프롬프트를 평가하는 완전 자동화
- **역할 기반 동적 가중치 시스템**: 17가지 역할별 최적화된 평가
- **병렬 처리 최적화**: 4개 메트릭 동시 평가로 효율성 극대화
- **컨텍스트 압축 전략**: 평가 후 즉시 요약하여 토큰 효율성 확보
- **배치 처리 지원**: 여러 프롬프트 일괄 평가 및 종합 리포트 생성
- **25개+ 프롬프트 품질 보장**: 모든 AI 생성물의 입구를 통제하는 Gatekeeper 역할

### Multi-Agent Workflow 구조

**전체 워크플로우**:
```mermaid
sequenceDiagram
    participant User as 사용자
    participant Master as Master Orchestrator
    participant FMEA as FMEA Sub-Agents
    participant Eval as Evaluation Engine
    participant Output as 최종 결과
    
    User->>Master: FMEA 생성 요청
    Master->>FMEA: Phase 0~5 실행
    FMEA->>FMEA: 8개 Sub-Agent 협업
    FMEA->>Output: FMEA 문서 생성
    
    Output->>Eval: 프롬프트 평가 요청
    Eval->>Eval: 5단계 평가 프로세스
    Eval->>User: 평가 결과 및 개선 제안
    
    alt 평가 통과
        User->>Output: 최종 승인
    else 평가 실패
        User->>Master: 재생성 요청
        Master->>FMEA: 수정된 워크플로우 실행
    end
```

---

## 🚀 사무 자동화의 미래 비전: Obsidian Design Origin 기반 업그레이드

> [!NOTE] 섹션 개요
> 본 섹션은 Obsidian Design Origin 구조를 참조한 사무 자동화 업그레이드 계획과 미래 비전을 설명합니다.
> 
> **관련 문서**:
> - [[Phase_1_Foundation/Step_01_Repetitive_Work|반복적 업무 식별]] - 문서 구조 중심 개발 시스템
> - [[Phase_1_Foundation/Step_04_Modularization|모듈화 전략]] - ID 시스템 및 프롬프트 라이브러리
> - [[00_AI_Workflow_Guide|AI 워크플로우 가이드]] - AI 워크플로우 전략

### 현재 상태

- FMEA 자동화와 프롬프트 평가 엔진을 Claude Sub-Agent로 구현
- Task tool 기반 Multi-Agent Workflow 구축
- 코딩 에이전트 역설계 시스템 구조 적용

### 미래 비전: 체계적인 워크플로우 자동화 시스템

**Obsidian Design Origin의 구조를 참조한 사무 자동화 업그레이드 계획**

#### 핵심 구조 요소

1. **ID 기반 온톨로지 맵 문서 시스템** (입사부터 지속)
   - 입사(2020.09)부터 모든 프로젝트의 기반이 된 핵심 역량
   - 모든 요소에 고유 ID 부여 (`page.*`, `comp.*`, `api.*`, `db.*`)
   - 문서 간 관계 추적 및 의존성 관리
   - 온톨로지 기반 영향 관계 분석
   - 57개+ 프로젝트, 298개+ 설계 문서의 체계적 관리 토대

2. **Phase 기반 체계적인 워크플로우**
   - Phase 0-13까지의 단계별 프로세스 자동화
   - 각 Phase별 전문가 Sub-Agent 역할 분담
   - 의존성 기반 자동 실행 순서 관리

3. **State 기반 정보 전달 시스템 (LangGraph/CrewAI 스타일)**
   - 각 단계에서 핵심 정보만 추출하여 컨텍스트 길이 최적화
   - 전문가 요약 시스템으로 도메인 지식 기반 핵심 정보 추출
   - 세션 컨텍스트 관리로 휘발성 정보 효율적 관리

4. **변경 관리 프로세스**
   - 변경 영향 매트릭스 기반 자동 영향 분석
   - 변경 전파 규칙에 따른 자동 문서 업데이트
   - 설계 단계별 의존성 매트릭스 관리

5. **Human-in-the-Loop 통합**
   - 청사진 생성 전 방향 선택
   - 평가 후 최종 확인
   - 개발 완료 후 연속 개발 워크플로우

#### Phase 0-13 워크플로우 다이어그램

```mermaid
flowchart TD
    Start([프로젝트 시작]) --> Phase0[Phase 0: 역 엔지니어링]
    Phase0 --> Phase1[Phase 1: 초기 분석]
    Phase1 --> Phase2[Phase 2: 프로세스 개요]
    Phase2 --> Phase3[Phase 3: 프로젝트 구조]
    Phase3 --> Phase4[Phase 4: 데이터베이스 설계]
    Phase4 --> Phase5[Phase 5: 통합 체크리스트]
    Phase5 --> Phase6[Phase 6: 문서화 시스템]
    Phase6 --> Phase7[Phase 7: 일일 추적]
    Phase7 --> Phase8[Phase 8: 테스트 및 품질]
    Phase8 --> Phase9[Phase 9: 온톨로지 영향 관계 분석]
    Phase9 --> Phase10[Phase 10: 화면 설계서]
    Phase10 --> Phase11[Phase 11: 온톨로지 영향 분석 확장]
    Phase11 --> Phase12[Phase 12: 최종 확인]
    Phase12 --> Decision{사용자 승인}
    Decision -->|proceed| Phase13[Phase 13: 개발용 리팩토링]
    Decision -->|modify/rerun| Phase12
    Phase13 --> End([개발 준비 완료])
    
    style Start fill:#2a9d8f
    style End fill:#2a9d8f
    style Phase9 fill:#9b59b6
    style Phase10 fill:#9b59b6
    style Phase11 fill:#9b59b6
```

#### State 기반 정보 전달 시스템 구조

```mermaid
graph TB
    A[Phase N 실행] --> B[전문가 요약 시스템]
    B --> C[핵심 정보 추출]
    C --> D[State 병합]
    D --> E[Phase N+1 실행]
    
    F[세션 컨텍스트] --> D
    G[이전 Phase 결과] --> D
    
    E --> H[최종 문서 생성]
    
    style B fill:#fff4e1
    style D fill:#e1f5ff
    style H fill:#e8f5e9
```

#### 변경 관리 프로세스 흐름도

```mermaid
graph LR
    A[변경 요청] --> B[변경 영향 매트릭스 분석]
    B --> C[영향받는 문서 식별]
    C --> D[변경 전파 규칙 적용]
    D --> E[자동 문서 업데이트]
    E --> F[일관성 검증]
    F --> G{검증 통과?}
    G -->|Yes| H[변경 완료]
    G -->|No| I[수동 검토]
    I --> E
    
    style B fill:#fff4e1
    style D fill:#e1f5ff
    style H fill:#e8f5e9
```

#### 전문가 Sub-Agent 협업 구조

```mermaid
graph TB
    A[Master Orchestrator] --> B[설계 전문가 Sub-Agent]
    A --> C[개발 전문가 Sub-Agent]
    A --> D[테스트 전문가 Sub-Agent]
    A --> E[문서화 전문가 Sub-Agent]
    
    B --> F[Phase 2-4 실행]
    C --> G[Phase 7-8 실행]
    D --> H[Phase 8 실행]
    E --> I[Phase 6 실행]
    
    F --> J[통합 결과]
    G --> J
    H --> J
    I --> J
    
    J --> K[최종 산출물]
    
    style A fill:#e1f5ff
    style J fill:#fff4e1
    style K fill:#e8f5e9
```

#### 기술적 의의

- **이전**: 단순 프롬프트 체인으로 작업 수행
- **미래**: ID 기반 온톨로지 맵 + Phase 워크플로우 + State 기반 정보 전달의 통합 시스템
- **주요 특징**:
  - 설계부터 개발까지 전체 라이프사이클 자동화
  - 문서 간 관계 추적 및 일관성 유지
  - 변경 영향 분석 및 전파
  - 전문가별 Sub-Agent 협업

#### 적용 분야

- **프로젝트 설계 자동화**: 신규 프로젝트 설계 및 기존 프로젝트 역설계
- **문서 생성 자동화**: 설계 문서, API 문서, 데이터베이스 설계 자동 생성
- **품질 평가 자동화**: 문서 품질 평가, 일관성 확인, 개발 준비도 평가
- **개발 워크플로우 자동화**: 개발 방향 찾기, 단계별 설계 문서 생성, 체크리스트 자동 생성

---

## 🔄 버전 진화

### obsidian_design_origin 버전별 발전

| 버전 | 기간 | 주요 변경사항 |
|------|------|---------------|
| **v1.0** | 2020-2021 | 초기 설계 문서 시스템 구축 |
| **v2.0** | 2021-2022 | AI 프롬프트 라이브러리 추가 (10개) |
| **v3.0** | 2022-2023 | 프롬프트 체인 도입, 템플릿 확장 (15개) |
| **v4.0** | 2023-2025 | 전체 시스템 통합, 프롬프트 25개+ |

---

## 🔗 관련 문서

### 핵심 문서
- [[00_Portfolio_Index|포트폴리오 인덱스]] (`page.portfolio.index`) - 전체 포트폴리오 개요
- [[00_Personal_Profile|개인 프로필]] (`page.portfolio.personal_profile`) - 개인 정보 및 기술 철학
- [[02_Projects_Overview|프로젝트 개요]] (`page.portfolio.projects`) - 12개 섹션, 53개+ 프로젝트 상세
- [[04_Academic_Publications|학술 논문]] (`page.portfolio.academic`) - 기술의 학술적 근거
- [[Testing_Context|테스트 컨텍스트]] (`page.portfolio.testing`) - 테스트 및 시연 사례

### Phase 문서
- [[Phase_1_Foundation/Step_01_Repetitive_Work|Step 1: 반복적 업무 식별]] (`phase.foundation.step01`) - 문서 구조 중심 개발 시스템
- [[Phase_1_Foundation/Step_02_Expertise_Targeting|Step 2: 전문성 타겟팅]] (`phase.foundation.step02`) - 전문성 타겟팅 및 시스템 구축
- [[Phase_1_Foundation/Step_04_Modularization|Step 4: 모듈화 전략]] (`phase.foundation.step04`) - ID 시스템 및 프롬프트 라이브러리
- [[Phase_1_Foundation/Step_05_IO_Optimization|Step 5: I/O 최적화]] (`phase.foundation.step05`) - 파일 기반 파이프라인

### 가이드 문서
- [[00_ID_System_Guide|ID 시스템 가이드]] (`guide.id.system`) - ID 명명 규칙 및 사용 방법
- [[00_AI_Workflow_Guide|AI 워크플로우 가이드]] (`guide.ai.workflow`) - AI 워크플로우 및 문서 참조 전략
- [[00_Relationship_Map|관계 맵]] (`page.portfolio.relationship_map`) - 프로젝트 간 관계 시각화

---

## 🌐 Platform All: 통합 플랫폼 생태계 (`section.architecture.platform_all`)

> [!NOTE] 섹션 개요
> 본 섹션은 7개 통합 플랫폼 프로젝트(Original_Development_Plan, factory_ontology_manager, pipeline_system_complete, TAM_Hub, Evaluation_Framework, all_platform_center, FMEA_Automation_Generation_Technology)의 생태계 구성을 설명합니다.
> 
> **관련 문서**:
> - [[02_Projects_Overview|프로젝트 개요]] - Platform All 프로젝트 상세 정보
> - [[Phase_1_Foundation/Step_02_Expertise_Targeting|전문성 타겟팅]] - Platform All 구축 과정

### 7.1 Original_Development_Plan (Obsidian Design Origin)

**전체 에이전트 시스템 구조**:

- **코드 에이전트**: Development_Agent_Evaluation_Prompt로 실시간 코드 평가
- **에이전트 중간 문서 확인**: Phase별 문서 자동 검증
- **프롬프트 보완**: 전문가 요약 시스템
- **State 기반 정보 전달**: LangGraph/CrewAI 스타일

**Phase 0-13 워크플로우**:

- Phase 0: 역 엔지니어링
- Phase 1-8: 기본 설계 문서 생성
- Phase 9: 온톨로지 영향 관계 분석
- Phase 10: 화면 설계서
- Phase 11: 온톨로지 영향 분석 확장
- Phase 12: 최종 확인 (휴먼 루프)
- Phase 13: 개발용 리팩토링

**내부 구조의 촘촘함**:

- **Workflow_Orchestrator & Status Tracker**: 실행 순서 및 의존성 관리, 워크플로우 상태 추적
- **State_Management_System**: 정보 전달 최적화
- **Session_Context_Manager**: 휘발성 정보 관리
- **Adaptive Doc Generation Chain**: doc_generation tool (DG.1-DG.5 Chain Prompts)
  - DG.1: 문서 구조 분석 및 템플릿 선택
  - DG.2: 핵심 정보 추출 및 요약
  - DG.3: Human Loop를 통한 사용자 확인
  - DG.4: Schema 기반 문서 생성
  - DG.5: 최종 문서 검증 및 포맷팅
  - **Summarizers**: 문서 생성 프로세스의 핵심 정보 요약
  - **Human Loops**: 사용자 확인 및 피드백 수집
  - **Schemas**: 문서 구조 및 데이터 형식 정의
  - **Templates**: 표준화된 문서 템플릿 제공
- **21개 development 프롬프트**: 개발 단계의 정교한 관리
  - 개발 워크플로우: 사용자 요청을 개발 작업으로 변환, 코드 생성
  - 개발 완료 후 휴먼 루프: 연속 개발 지원 (진행/수정/browser 디버깅/트러블 관리)
  - 문서 업데이트 자동 체크: 큰 수정 시 자동으로 문서 업데이트 필요성 판단
  - 개발 방향 찾기: 변경 영향 매트릭스 기반 개발 방향 결정
  - 단계별 뒷받침 설계 문서 생성: 변경 전파 규칙 통합
  - 단계별 체크리스트 생성: 검증 항목 및 완료 기준 설정
  - 브라우저 디버깅: 브라우저 기반 디버깅 지원
  - 트러블 관리: 변경 전파 규칙 통합, LLM 트러블슈팅 Mock 테스트 시스템
  - 변경 리포트 생성: 자동 변경 리포트 생성

**LangGraph Chain 설계 방법론 (2026-01-10 업그레이드)**:

Original_Development_Plan은 LangGraph/CrewAI 기반 복합 AI Agent 시스템을 체계적으로 설계하기 위한 **4단계 심화 설계 프로세스**를 제공합니다.

**4단계 파이프라인**:

```mermaid
graph TD
    subgraph "Phase 1: Parsing"
        P1[RG_00 요구사항 파싱] --> P2[RG_01 코드베이스 분석]
        P2 --> P3[RG_02 UI/화면 파싱]
        P2 --> P4[RG_03 DB/컴포넌트 파싱]
        P3 & P4 --> P5[RG_04 통합 분석]
    end
    
    subgraph "Phase 2: Summarizing"
        P5 --> S1[Summarizer UI]
        P5 --> S2[Summarizer Logic]
        P5 --> S3[Summarizer DB]
        S1 & S2 & S3 --> HL1{Human Loop 1<br/>요약 검토}
    end
    
    subgraph "Phase 3: Designing"
        HL1 -->|승인| D1[RG_05 Blueprint]
        D1 --> D2[RG_06 State 설계]
        D1 --> D3[RG_07 Node Logic]
        D2 & D3 --> D4[RG_08 UI Integration]
        D4 --> HL2{Human Loop 2<br/>설계 검토}
    end
    
    subgraph "Phase 4: Planning"
        HL2 -->|승인| R1[RG_09 리팩토링 계획]
    end
    
    R1 --> IMPL[코드 구현 진행]
    
    style HL1 fill:#f39c12
    style HL2 fill:#f39c12
    style IMPL fill:#27ae60
```

**주요 특징**:
- **기존 자산 활용**: 화면, DB, 컴포넌트를 체계적으로 파싱하여 구조화
- **전문가 페르소나**: UI/DB/Logic 전문가 관점에서 핵심 정보 요약
- **Human-in-the-Loop**: 2회 승인 게이트로 품질 보장
- **체계적 설계**: Blueprint → State → Node Logic → UI Integration 순차 설계
- **실행 계획**: 리팩토링 계획 문서를 `04_planning/` 폴더에 생성하여 체계적 구현

**출력물 구조**:
- **파싱 단계**: `architecture/temp/rg_*.json` (중간 분석 결과)
- **요약 단계**: `architecture/temp/rg_*_summary.md` (전문가 요약)
- **설계 단계**: `architecture/RG_*.md` (Blueprint, State, Node Logic, UI Integration)
- **계획 단계**: `chain/langgraph_chain/04_planning/RG_Refactoring_Plan.md` (실행 계획)

**참고 문서 경로**: `platform_all/Original_Development_Plan/docs/obsidian_design_origin/specs/04_Prompts/development/chain/langgraph_chain/`

**LLM 트러블슈팅 시스템 (2026-01-10 추가)**:

LangChain/CrewAI 기반 시스템의 트러블슈팅을 위한 **Mock 테스트 시스템**이 구축되었습니다.

**트러블슈팅 프로세스**:

1. **문제 유형 분류**: Troubleshooting_Management_Prompt에서 "LLM 문제 (LangChain/CrewAI)"로 분류
2. **Mock 테스트 시스템 사용**: `docs/development/test_LLM/` 폴더로 이동
3. **체크리스트 생성**: 요구사항 기반으로 테스트 체크리스트 자동 생성
   ```bash
   python checklist_generator.py "요구사항 텍스트" -o checklist.json -f langchain
   ```
4. **Mock 테스트 실행**: 실제 LLM API 호출 없이 로직 검증
   ```bash
   python test_runner.py checklist.json
   ```
5. **결과 분석**: `outputs/` 폴더의 리포트 확인 및 문제 원인 파악
6. **해결 방법 도출**: Mock 테스트 결과를 바탕으로 실제 코드 수정 및 재검증

**Mock 테스트 시스템 구성**:
- **LangChain/LangGraph Mock**: Chain, Graph 실행 시뮬레이션
- **CrewAI Mock**: Agent, Task, Crew 실행 시뮬레이션
- **체크리스트 자동 생성**: 사용자 요구사항을 기반으로 테스트 케이스 자동 생성
- **입출력 파일 형식**: JSON 기반 테스트 결과 관리 및 리포트 생성

**참고 문서 경로**: 
- `platform_all/Original_Development_Plan/docs/obsidian_design_origin/docs/development/test_LLM/README.md`
- `platform_all/Original_Development_Plan/docs/obsidian_design_origin/specs/04_Prompts/development/Troubleshooting_Management_Prompt.md`

- **변경 관리 프로세스**: 문서 일관성 자동 유지
  - 변경 영향 매트릭스 기반 자동 영향 분석
  - 변경 전파 규칙에 따른 자동 문서 업데이트
  - 설계 단계별 의존성 매트릭스 관리

**개발 타임라인**:

- **2025년 10월~12월**: 핵심 개발 집중 (21개 development 프롬프트 구축)
- **2025년 5월~7월**: 컨소들 모여서 연구 사업계획서 작성 및 아이디어 구체화
- **2025년 8월~10월**: 배경 연구 및 테스트, 내용 보완
- **2026년 1월 10일**: LangGraph Chain 설계 방법론 및 LLM 트러블슈팅 Mock 테스트 시스템 추가

### 7.2 factory_ontology_manager

**시각적 팩토리 관리 시스템**:

- shapez.io 게임에서 영감을 받은 드래그 앤 드롭 인터페이스
- 계층적 구조 관리 (공장 > 작업장 > 생산라인 > 공정)
- 마스터 데이터 통합 (자재, 센서, PLC)
- **DB 이전 완료**: factory_ontology_manager의 DB를 AI_DB_center로 이전 완료 (Virtual_company_creation_agent 기반)
  - 이전 완료, 테스트 완료, 정상 작동 확인
  - AI_DB_center JSON 파일 기반 데이터 저장소 사용 (`.vacts/enriched_info_company_SYON_*.json`)
  - 데이터 저장 경로: `data.platform_ecosystem.platforms[].stored_data.factories[]`

### 7.3 pipeline_system_complete

**시계열 데이터 파이프라인**:

- 8단계 파이프라인 구조
- Supabase 기반 실시간 데이터 처리
- 체계적인 문서화 (219개 Markdown)

### 7.4 TAM_Hub

**기술 자산 관리 허브**:

- MCP 서버 통합 (32개 Python 파일)
- AMS 엔진, progressing_engine 통합
- Obsidian Design Origin 기반 문서화

### 7.5 Evaluation_Framework

**AI 에이전트 평가 프레임워크**:

- 6가지 관점 평가 시스템
- LangGraph 워크플로우 오케스트레이션
- Docker 기반 배포

### 7.6 all_platform_center

**통합 플랫폼 센터**:

- 모든 플랫폼의 중앙 관리
- 통합 대시보드
- 사용자 인증 및 권한 관리

### 7.7 FMEA_Automation_Generation_Technology (Claude Sub-Agent)

**코드 에이전트에서 영감을 받은 전체 공장/회사/사무 자동화의 백정보 핵심**:

- **Multi-Agent Architecture**: 8개 독립 Sub-Agent 협업 (R&D Team 3개, Manufacturing Team 3개, QA Team 2개)
- **역설계 시스템**: 코딩 에이전트의 역설계 시스템 구조를 FMEA 분석에 적용
- **범용 도메인 지원**: 제조업, 사무업무, 서비스업 모두 지원
- **Phase 0-5 워크플로우**: 컨텍스트 수집 → 범위 정의 → 심층 분석 → 리스크 평가 → 최적화 & 문서 생성 → 지속 개선
- **Living Document**: 지속적 개선 추적 시스템
- **AIAG & VDA FMEA 표준**: 국제 표준 기반 리스크 분석

**Platform All 통합 플랫폼 생태계 구성 다이어그램**:

```mermaid
graph TB
    subgraph "Platform All 통합 플랫폼 생태계"
        direction TB
        
        subgraph "1. Original_Development_Plan"
            ODP[Obsidian Design Origin<br/>전체 에이전트 시스템]
            ODP --> |Phase 0-13 워크플로우| PhaseWorkflow[설계부터 개발까지<br/>전체 라이프사이클]
            ODP --> |21개 development 프롬프트| DevPrompts[개발 단계 정교한 관리]
            ODP --> |코드 에이전트| CodeAgent[개발 에이전트<br/>실시간 평가]
            ODP --> |문서 확인| DocCheck[Phase별 문서<br/>자동 검증]
            ODP --> |프롬프트 보완| PromptEnhance[전문가 요약 시스템]
        end
        
        subgraph "2. Evaluation_Framework"
            Eval[AI 에이전트 평가 프레임워크]
            Eval --> |6가지 관점 평가| EvalPerspectives[업체 표준/AI 설계/<br/>제품/개발업체/팀/외부기관]
            Eval --> |LangGraph| WorkflowOrch[워크플로우 오케스트레이션]
        end
        
        subgraph "3. TAM_Hub"
            TAM[기술 자산 관리 허브]
            TAM --> |MCP 서버| MCPServers[32개 Python MCP 서버]
            TAM --> |AMS 엔진| AMSEngine[AMS 엔진 통합]
            TAM --> |progressing_engine| ProgressEngine[진행 엔진 통합]
        end
        
        subgraph "4. factory_ontology_manager"
            Factory[팩토리 온톨로지 관리]
            Factory --> |계층적 구조| Hierarchy[공장>작업장><br/>생산라인>공정]
            Factory --> |드래그 앤 드롭| VisualDesign[시각적 공정 설계]
        end
        
        subgraph "5. pipeline_system_complete"
            Pipeline[시계열 데이터 파이프라인]
            Pipeline --> |8단계 파이프라인| DataFlow[데이터 수집부터<br/>분석까지]
        end
        
        subgraph "6. all_platform_center"
            Center[통합 플랫폼 센터]
            Center --> |통합 대시보드| Dashboard[모든 플랫폼<br/>중앙 관리]
            Center --> |인증/권한| Auth[사용자 인증 및<br/>권한 관리]
        end
        
        subgraph "7. FMEA_Automation_Generation_Technology"
            FMEA[FMEA 자동화 생성 시스템<br/>코드 에이전트에서 영감]
            FMEA --> |8개 Sub-Agent| MultiAgent[R&D/Manufacturing/QA<br/>팀별 협업]
            FMEA --> |Phase 0-5 워크플로우| FMEAWorkflow[컨텍스트 수집부터<br/>지속 개선까지]
            FMEA --> |역설계 시스템| ReverseEng[코딩 에이전트<br/>역설계 구조]
            FMEA --> |범용 도메인| UniversalDomain[제조업/사무업무/<br/>서비스업 지원]
        end
        
        subgraph "8. Virtual_Company_Creation_Agent"
            VCCA[Virtual Company Creation Agent<br/>AI 에이전트로만 구성된 가상 기업]
            VCCA --> |HQONS 구조| HQONS[Hyper-Quantum Omni-Net<br/>13개 조직 유형]
            VCCA --> |하이퍼디멘션| HDC[초차원 공간 정보 전달<br/>양자 얽힘-like 통신]
            VCCA --> |6개 Phase| PhaseChain[Phase 1-6 Chain Workflow<br/>기업 설계 자동화]
            VCCA --> |12개 시스템| Systems[12개 시스템 110개 Sub<br/>완전 자동화 기업]
            VCCA --> |Chain Infrastructure| ChainInfra[Master Orchestrator<br/>Chain 00/01/02<br/>Human/AI Guides]
            VCCA --> |Element Layer| ElementLayer[Schemas, Personas<br/>Templates Type D/E/F]
            VCCA --> |Human Guides| HumanGuides[6개 가이드 생성 완료<br/>Deployment/Admin/Dev<br/>User/Setup/AI Operator]
            VCCA --> |AI Agent Guides| AIGuides[6개 에이전트 가이드<br/>DEPLOY/ADMIN/DEV<br/>QUERY/SETUP/TUNING]
        end
    end
    
    ODP -.->|설계 문서 생성| Eval
    ODP -.->|평가 기준 제공| Eval
    Eval -.->|평가 결과| TAM
    TAM -.->|기술 자산 관리| Factory
    Factory -.->|온톨로지 데이터| Pipeline
    Pipeline -.->|파이프라인 결과| Center
    Center -.->|통합 관리| ODP
    FMEA -.->|백정보 핵심| ODP
    FMEA -.->|리스크 분석 결과| Factory
    FMEA -.->|FMEA 데이터| Pipeline
    ODP -.->|코드 에이전트 구조| FMEA
    VCCA -.->|HQONS 아키텍처| ODP
    VCCA -.->|가상 기업 설계| Center
    Center -.->|통합 생태계| VCCA
    VCCA -.->|확장성 극대화| ODP
    
    style ODP fill:#e74c3c,color:#fff
    style Eval fill:#3498db,color:#fff
    style TAM fill:#9b59b6,color:#fff
    style Factory fill:#e67e22,color:#fff
    style Pipeline fill:#1abc9c,color:#fff
    style Center fill:#f39c12,color:#fff
    style FMEA fill:#16a085,color:#fff
    style VCCA fill:#8e44ad,color:#fff
```

**생태계 연동 목적**:

1. **Original_Development_Plan → Evaluation_Framework**: 설계 문서를 평가 프레임워크에 제공하여 AI 에이전트 평가 기준으로 활용
2. **Evaluation_Framework → TAM_Hub**: 평가 결과를 기술 자산으로 관리하여 지속적 개선 추적
3. **TAM_Hub → factory_ontology_manager**: 기술 자산을 팩토리 온톨로지에 통합하여 제조 공정 설계에 활용
4. **factory_ontology_manager → pipeline_system_complete**: 팩토리 온톨로지 데이터를 시계열 파이프라인으로 전달하여 실시간 분석
5. **pipeline_system_complete → all_platform_center**: 파이프라인 결과를 통합 플랫폼 센터로 집중하여 대시보드 표시
6. **all_platform_center → Original_Development_Plan**: 통합 관리 결과를 Original_Development_Plan에 피드백하여 지속적 개선
7. **Original_Development_Plan → FMEA_Automation_Generation_Technology**: 코드 에이전트 구조를 FMEA 시스템에 제공하여 역설계 시스템 구현
8. **FMEA_Automation_Generation_Technology → factory_ontology_manager**: FMEA 리스크 분석 결과를 팩토리 온톨로지에 통합하여 제조 공정 리스크 관리
9. **FMEA_Automation_Generation_Technology → pipeline_system_complete**: FMEA 데이터를 시계열 파이프라인으로 전달하여 리스크 추적 및 분석
10. **FMEA_Automation_Generation_Technology → Original_Development_Plan**: 전체 공장/회사/사무 자동화의 백정보 핵심으로 활용
11. **Virtual_Company_Creation_Agent → Platform All**: HQONS 기반 초차원 공간 정보 전달 시스템으로 Platform All 생태계의 확장성과 효율성 극대화, 양자 얽힘-like 통신으로 무한 확장성 달성
12. **Platform All → Virtual_Company_Creation_Agent**: 기존 플랫폼들의 경험과 구조를 가상 기업 생성에 활용하여 실증된 아키텍처 기반 기업 설계 자동화

> [!NOTE] 진화 스토리
> Virtual Company Creation Agent와 AI_DB_tester (VACTS)는 LLM 활용하다보니 온톨로지를 잘 못알아먹고 벡터도 부족하다는 것을 깨달고, 특화 중간 DB를 만들어서 LLM을 서포트하기 위해 탄생했습니다. "어차피 AI LLM은 앞뒤 주는 것만 잘하면 되니까" 특화 중간 DB(GFS)를 만들어서 LLM 비용을 87% 절감했습니다. 상세한 스토리는 [[02_Projects_Overview#024-virtual-company-creation-agent--ai_db_tester-vacts-진화-스토리-llm을-서포트하기-위한-특화-중간-db|0.2.4 Virtual Company Creation Agent & AI_DB_tester (VACTS) 진화 스토리]]를 참조하세요.

**Virtual Company Creation Agent 설계 문서** (2026.1.4 시작, 설계 단계 완료):
- 설계 문서 경로: `platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/`
- 주요 설계 문서 (20개 이상):
  - [Blue_Print.md](../../../platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/Blue_Print.md) - 전체 시스템 청사진 (15 Systems, 225 Sub-Agents, 7단계 Chain Workflow)
  - [Business_Summary.md](../../../platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/Business_Summary.md) - 비즈니스 요약 및 가치 제안
  - [Process_Overview.md](../../../platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/Process_Overview.md) - 7단계 Chain 워크플로우 프로세스
  - [Ontology_Overview.md](../../../platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/Ontology_Overview.md) - 14 Layer 좌표 체계 및 온톨로지 구조
  - [Grape_Cluster_Architecture.md](../../../platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/Grape_Cluster_Architecture.md) - Grape Cluster 저장 구조 (포도송이 구조 DB)
  - [API_Design.md](../../../platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/API_Design.md), [Database_Design.md](../../../platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/Database_Design.md), [State_Management_Design.md](../../../platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/State_Management_Design.md) 등

**Chain Infrastructure 완료** (2026.1 업데이트):
- **Master Orchestrator**: 문서 생성 전체 프로세스 조율 (`prompts/doc_chains/Doc_Master_Orchestrator.md`)
- **Chain 00 (Structure)**: 문서 구조 정의 및 Type 매핑 (`prompts/doc_chains/Chain_00_Structure.md`)
- **Chain 01 (Human Guide)**: 인간 독자를 위한 운영 가이드 생성 (`prompts/doc_chains/Chain_01_Human_Guide.md`)
- **Chain 02 (AI Agent Guide)**: AI 에이전트를 위한 가이드 생성 (`prompts/doc_chains/Chain_02_AI_Agent.md`)

**Element Layer** (Type D/E/F 완료):
- **Schemas**: Type별 필수 정보 구조 정의 (`prompts/doc_chains/schemas/`)
- **Personas**: Type별 사용자 페르소나 정의 (`prompts/doc_chains/personas/`)
- **Templates**: Type별 문서 템플릿 (`prompts/doc_chains/elements/Element_TypeD.md`, `Element_TypeE.md`, `Element_TypeF.md`)

**Human Guides 생성 완료** (6개):
- `docs/operation_guides/Deployment_Guide.md` (Type A)
- `docs/operation_guides/Admin_Operations_Manual.md` (Type B)
- `docs/operation_guides/Developer_Maintenance_Guide.md` (Type C)
- `docs/operation_guides/End_User_Guide.md` (Type D)
- `docs/operation_guides/Initial_Setup_Guide.md` (Type E)
- `docs/operation_guides/AI_Operator_Guide.md` (Type F)

**AI Agent Guides 생성 완료** (6개):
- `prompts/agents/DEPLOY_AGENT.md` (Type A')
- `prompts/agents/ADMIN_AGENT.md` (Type B')
- `prompts/agents/DEV_AGENT.md` (Type C')
- `prompts/agents/QUERY_AGENT.md` (Type D')
- `prompts/agents/SETUP_AGENT.md` (Type E')
- `prompts/agents/TUNING_AGENT.md` (Type F')

### 8.1 AI_DB_tester (VACTS - Virtual AI Company Test Suite)

**프로젝트 개요**:
- **개발 시작**: 2026년 1월 7일
- **상태**: 거의 완료 (설계 문서 23개, 구현 파일 24개 완료)
- **목적**: Virtual Company Creation Agent의 전체 파이프라인을 자동으로 테스트하고 검증하는 AI 기반 QA 시스템

**핵심 특징**:
- **Cursor-Native**: 별도 UI 없이 IDE의 Chat/Composer 기능을 런타임으로 활용
- **시뮬레이션 공장**: 실제처럼 보이는 시뮬레이션 실행
- **자동 검증**: GFS (Grape File System), 온톨로지, 스키마 자동 검증
- **자동 리포트**: 테스트 결과 자동 리포트 생성

**5가지 실행 모드**:
1. **Company Creation Full Test**: 회사 구축 전체 과정 테스트 (Chain 01~07)
2. **Full Simulation**: Chain 01~07 전체 시뮬레이션
3. **Single Chain**: 단일 Chain 시뮬레이션
4. **Single System**: 단일 시스템 시뮬레이션
5. **I/O Test**: 파일 시스템 I/O 테스트

**자연어 쿼리 기능 (LangGraph 기반)**:
- **QUERY_AGENT**: 사용자의 자연어 질문을 이해하고 테스트를 실행하는 AI Agent
- **LangGraph 기반 질문-답변 구조화 워크플로우**: 질문 분석 → 데이터 추출 → 프롬프트 최적화 → AI 쿼리 → 답변 구조화 → 포맷팅
- **자연어 인터페이스**: Cursor Chat에서 자연어로 테스트 요청 및 결과 조회
  - 테스트 실행: "@QUERY_AGENT.md Chain 01 테스트 실행해줘", "@QUERY_AGENT.md Company Creation Full Test 실행해줘"
  - 결과 조회: "@QUERY_AGENT.md 최신 리포트 보여줘", "@QUERY_AGENT.md Chain 04 결과 확인해줘"
  - 자연어 질문: "@QUERY_AGENT.md SYON의 주요 제품은 무엇인가요?", "@QUERY_AGENT.md SYON Alchemy에 대해 자세히 알려주세요"
- **의도 파악**: 사용자 질문을 분석하여 적절한 테스트 모드 선택 및 실행
- **구조화된 답변**: 일반적인 데이터 조회 대비 구조화된 답변 제공, DB 구조 기반 카테고리화 및 포맷팅
- **Instructor 통합**: Pydantic 모델을 사용한 구조화된 데이터 추출 및 검증, 타입 안전성 보장
- **개선점**: LangGraph 워크플로우를 통한 질문-답변 구조화로 더 정확하고 맥락에 맞는 답변 생성

**기술 스택**:
- **Python**: 테스트 자동화 스크립트
- **프롬프트 기반**: 모든 실행이 프롬프트 파일을 통해 이루어짐
- **Cursor IDE 통합**: Cursor의 Chat/Composer 기능을 인터페이스로 활용
- **시뮬레이션 엔진**: 실제 API 호출 없이 시뮬레이션 처리
- **검증 엔진**: GFS 무결성, 온톨로지, 스키마, 좌표 정합성 검증

**프로젝트 구조**:
- **설계 문서**: 23개 (Phase 0~12 완료)
- **프롬프트 파일**: 14개 (Master Workflow, Agent 프롬프트, 실행 모드, 검증 프롬프트)
- **스키마 파일**: 3개 (agent_identity_schema_v2.json, validation_schema.json, checkpoint_schema.json)
- **템플릿 파일**: 3개 (test_report_template.md, validation_report_template.md, gfs_health_template.md)

**비즈니스 가치**:
- **87.5% 시간 절감**: 수동 테스트 대비 대폭 시간 절감
- **329% ROI**: 초기 투자 대비 높은 수익
- **2.8개월 투자 회수**: 빠른 투자 회수

**설계 문서 경로**: `platform_all/AI_DB_tester/docs/obsidian_design_origin/architecture/`
- 주요 설계 문서: Initial_Situation_Report.md, Blue_Print.md, Process_Overview.md, API_Design.md, Database_Design.md, Business_Summary.md 등

**관계**:
- **AI_DB_tester → Virtual_Company_Creation_Agent**: Virtual Company Creation Agent의 전체 파이프라인 테스트 및 검증
- **AI_DB_tester → Platform All**: Platform All 생태계의 품질 보장 도구로 활용

**생태계의 핵심 가치**:

- **자동화된 워크플로우**: 설계부터 평가, 관리, 분석까지 전체 프로세스 자동화
- **데이터 연동**: 각 플랫폼 간 데이터 흐름을 통한 통합 분석
- **지속적 개선**: 평가 결과를 기술 자산으로 관리하고 설계에 반영하는 순환 구조

---

### 8.2 Factory Ontology Manager AI Agent

> [!NOTE] 진화 스토리
> Factory Ontology Manager AI Agent는 2020년 전무님의 비전(공정 라인 쉽게 수정)과 2025년 김이사님의 니즈(OEM ODM 대응)가 만나서 탄생했습니다. 세아특수강 프로젝트에서 Cursor(AI agent)를 활용하여 실제로 구현 가능하다는 것을 확인했습니다. 상세한 스토리는 [[02_Projects_Overview#023-factory-ontology-manager-ai-agent-진화-스토리-5년간의-비전과-현실의-만남|0.2.3 Factory Ontology Manager AI Agent 진화 스토리]]를 참조하세요.

**프로젝트 개요**:
- **개발 시작**: 2026년 1월 8일 (설계 완료)
- **개발 완료 예정**: 2026년 1월 9일
- **목적**: Factory Ontology Manager에 AI 에이전트 기능을 추가하여 자연어로 기술된 공정 문서를 파싱하고, 실제 공장 데이터(DB)와 매핑하여 공장 모니터링 캔버스 레이아웃을 자동 생성

**핵심 기능**:
1. **자연어 공정 문서 파싱**: 공정 엔지니어가 자연어로 작성한 공정 문서를 자동으로 파싱하여 구조화된 정보 추출
2. **DB Grounding**: 사용자의 추상적 요청을 실제 DB의 설비/센서 ID로 자동 매핑
   - 예시: "용접기 온도 보여줘" → DB에서 WELD_ROBOT_01 (ID: EQ_99) 및 TAG_TEMP_W01 찾기
3. **Ontology Mapping**: 설비 간 관계 및 데이터 흐름을 분석하여 시각화 구조 생성
4. **Spec-First Modification**: 수정 요청 시 바로 코드를 고치는 것이 아니라, '요구사항 명세서'를 먼저 작성 후 데이터 수정
5. **캔버스 레이아웃 자동 생성**: 자연어 공정 문서 → 캔버스 JSON (dic) 자동 변환

**자연어 쿼리 기능**:
- **ODM/OED 대응**: 자연어로 설비/조직 연결, 생성/조정
- **공정/조직 연결**: 자연어 요청을 통한 공정과 조직 간 자동 연결
- **생성/조정**: 자연어로 캔버스 레이아웃 생성 및 수정

**기술 스택**:
- **Frontend**: React 18.3.1 + TypeScript 5.5.3 + Vite 7.1.12
- **UI**: shadcn-ui (Radix UI) + Tailwind CSS 3.4.11
- **상태 관리**: Zustand 5.0.9 + React Query 5.56.2
- **Backend**: Flask (Python)
- **LLM 통합**: Instructor (Pydantic 기반 LLM 검증)
- **DB**: AI_DB_center JSON 파일 기반 (`.vacts/enriched_info_company_SYON_*.json`)

**아키텍처**:
- **Component-based Architecture**: React 컴포넌트 기반 구조
- **AI Agent Window**: 새 창(모달/사이드바)로 AI 인터페이스 제공
- **코드 모드 사이드바 통합**: 기존 Factory Ontology Manager 캔버스에 자연스럽게 통합
- **API Layer**: RESTful API (AI_DB_center JSON 파일 기반)
- **Instructor 통합**: LLM 응답을 Pydantic 스키마로 검증

**비즈니스 가치**:
- **레이아웃 생성 시간 80% 단축**: 기존 2-3시간 → 개선 20-30분
- **수정 요청 처리 시간 50% 단축**: Spec-First Modification으로 명확한 변경 계획
- **유지보수 시간 30% 단축**: 요구사항 명세서 자동 생성으로 변경 이력 추적 용이
- **학습 곡선 단축**: 기존 시스템 학습 시간 1-2주 → AI 에이전트 사용 즉시 사용 가능 (자연어)

**설계 문서 경로**: `platform_all/factory_ontology_manager/AI_manager/docs/obsidian_design_origin/architecture/`
- 주요 설계 문서: Initial_Situation_Report.md, Blue_Print.md, Business_Summary.md, API_Design.md, Database_Design.md, Component_Interfaces_Design.md 등

**관계**:
- **Factory Ontology Manager AI Agent → factory_ontology_manager**: 기존 Factory Ontology Manager에 AI 기능 통합
- **Factory Ontology Manager AI Agent → AI_DB_center**: AI_DB_center JSON 파일 기반 데이터 저장소 사용
- **Factory Ontology Manager AI Agent → Virtual_Company_Creation_Agent**: Virtual_company_creation_agent 기반 DB 구조 활용

---

## ID 참조

- **문서 ID**: `page.portfolio.architecture`
- **관련 Phase**: `phase.foundation.*`
- **관련 프로젝트**: `project.ams`, `project.dps`, `project.coctk`, `project.ai_db_tester`, `project.factory_ontology_manager_ai_agent` 등
- **관련 문서**: `page.portfolio.*`

---

> [!SUCCESS] 검증된 멀티 솔루션 역량
> 단순한 기술 개발을 넘어 4대 영역에서 **13개 이상의 프로젝트**를 성공적으로 완수했습니다.
> 
> **핵심 통합 성과**:
> - **GS 인증 2개** 소프트웨어 인증서 취득 (CoCTK, AMS(PDS))
> - **특허 출원 및 등록** (피쉬본 관리 시스템 등)
> - **핵심 엔진 100% 자체 개발** (MLS, CoCTK, DPS 등)
> - **글로벌 실증**: 국내 대기업(세아특수강 등) 및 일본 도료 전문기업 DX 수행
> - **정량적 가치**: 에너지 효율 20% 향상, 이상 탐지율 93.7%, 연간 수십억 원 규모 손실 방지
> 
> **연구 리더십**:
> - 한솔코에버 연구소 팀장으로서 연구 전략, 팀 관리, 기술 검증, 위험 관리 전 과정 주도.
