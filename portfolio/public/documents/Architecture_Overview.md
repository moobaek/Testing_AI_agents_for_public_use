# 아키텍처 개요 (Architecture Overview)

## 문서 개요

이 문서는 **시계열 데이터 파이프라인 시스템**의 전체 설계 구조를 종합적으로 설명합니다. AI/Python/엔진 개발자와 프로젝트 관리자가 시스템의 구조, 문서 체계, 개발 프로세스를 이해할 수 있도록 구성되었습니다.

**대상 독자:**
- AI/Python/엔진 개발자 (데이터 처리 로직, Airflow DAG 개발 담당)
- 프로젝트 관리자 (프로젝트 진행 상황 파악 및 팀 관리)

**작성일**: 2025-01-27  
**버전**: 1.0.0

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [문서 구조](#2-문서-구조)
3. [시스템 아키텍처](#3-시스템-아키텍처)
4. [개발 프로세스](#4-개발-프로세스)
5. [역할별 가이드](#5-역할별-가이드)

---

## 1. 프로젝트 개요

### 1.1 프로젝트 목적

**시계열 데이터 파이프라인 시스템**은 Factory Ontology Manager와 통합된 시스템으로, 다양한 데이터 소스(API, CSV, DB)로부터 데이터를 수집하고, **8단계 파이프라인**을 통해 처리한 후, 최종 결과를 생성 및 저장하는 시스템입니다.

### 1.2 핵심 기능

시스템은 다음 8단계 파이프라인을 통해 데이터를 처리합니다:

1. **데이터 수집 (Data Input)**: 다중 소스에서 데이터 수집
2. **데이터 병합 (Data Merge)**: 시간 동기화하여 데이터 통합
3. **데이터 타입 변환 (Data Types)**: 타입 분석 및 변환
4. **처리 결과 (Processing Results)**: 품질 검증 및 평가
5. **데이터 정리 (Data Cleaning)**: 결측값 및 이상값 처리
6. **데이터 리샘플링 (Resampling)**: 샘플링 간격 조정
7. **구간 정보값 변환 (Interval Conversion)**: 통계적 정보값 계산
8. **최종 결과 저장**: 처리된 데이터 저장 및 시각화

### 1.3 기술 스택

#### Frontend
- **React 18.3.1**: UI 라이브러리
  > 💡 **쉽게 이해하기**: React는 웹페이지를 만드는 레고 블록 같은 거예요. 버튼, 입력창, 차트 같은 작은 블록들을 조립해서 큰 웹사이트를 만듭니다.
- **TypeScript 5.5.3**: 타입 안정성
  > 💡 **쉽게 이해하기**: TypeScript는 실수를 미리 잡아주는 도구예요. 예를 들어, 숫자만 들어가야 하는 곳에 글자를 넣으려고 하면 미리 경고를 해줍니다.
- **Vite 7.1.12**: 빌드 도구 및 개발 서버
  > 💡 **쉽게 이해하기**: Vite는 개발할 때 웹사이트를 빠르게 보여주는 도구예요. 코드를 수정하면 바로바로 화면에 반영됩니다.
- **Tailwind CSS 3.4.11**: 유틸리티 기반 스타일링
  > 💡 **쉽게 이해하기**: Tailwind는 색깔, 크기, 간격 같은 스타일을 미리 만들어둔 도구예요. "빨간색, 큰 글씨" 같은 걸 바로 쓸 수 있습니다.
- **shadcn/ui**: 재사용 가능한 컴포넌트 라이브러리
  > 💡 **쉽게 이해하기**: shadcn/ui는 예쁜 버튼, 입력창 같은 것들을 미리 만들어둔 상자예요. 필요할 때 가져다 쓰면 됩니다.

#### State Management & Data Fetching
- **React Query (TanStack Query) 5.56.2**: 서버 상태 관리
  > 💡 **쉽게 이해하기**: React Query는 서버에서 가져온 데이터를 똑똑하게 관리하는 도구예요. 한 번 가져온 데이터는 기억해두고, 필요할 때만 다시 가져옵니다. 마치 책을 책장에 정리해두는 것처럼요.
- **React Hook Form 7.53.0**: 폼 상태 관리
  > 💡 **쉽게 이해하기**: React Hook Form은 입력창, 체크박스 같은 폼을 쉽게 다루는 도구예요. 사용자가 입력한 내용을 자동으로 기억하고 관리해줍니다.
- **Zod 3.23.8**: 스키마 검증
  > 💡 **쉽게 이해하기**: Zod는 입력값이 올바른지 확인하는 경비원 같은 거예요. 예를 들어, 이메일 주소가 맞는 형식인지, 비밀번호가 충분히 긴지 확인해줍니다.

#### Backend & Database
- **Supabase 2.55.0**: BaaS (Backend as a Service)
  > 💡 **쉽게 이해하기**: Supabase는 데이터를 저장하고 관리해주는 클라우드 서비스예요. 마치 구글 드라이브처럼 데이터를 안전하게 보관하고, 필요할 때 가져올 수 있게 해줍니다.
  - PostgreSQL 데이터베이스
    > 💡 **쉽게 이해하기**: 데이터베이스는 엑셀 표 같은 거예요. 데이터를 행과 열로 정리해서 저장하고, 필요할 때 찾아서 쓸 수 있습니다.
  - Row Level Security
    > 💡 **쉽게 이해하기**: 각 사용자가 볼 수 있는 데이터를 제한하는 보안 기능이에요. 내 일기장은 나만 볼 수 있는 것처럼요.
  - Real-time subscriptions
    > 💡 **쉽게 이해하기**: 데이터가 바뀌면 자동으로 알려주는 기능이에요. 카카오톡에서 메시지가 오면 바로 알림이 오는 것처럼요.
  - RESTful API 자동 생성
    > 💡 **쉽게 이해하기**: API는 다른 프로그램과 대화하는 방법이에요. "데이터 좀 줘", "데이터 저장해줘" 같은 요청을 보내고 받을 수 있게 해줍니다.

#### Workflow Orchestration
- **Apache Airflow**: 파이프라인 오케스트레이션
  > 💡 **쉽게 이해하기**: Airflow는 여러 작업을 순서대로 자동으로 실행해주는 관리자예요. 예를 들어, "1단계 끝나면 2단계 시작하고, 2단계 끝나면 3단계 시작해"라고 미리 정해두면 알아서 실행해줍니다.

#### 데이터 처리
- **Python**: Airflow DAG 실행용
  > 💡 **쉽게 이해하기**: Python은 데이터를 다루기 좋은 프로그래밍 언어예요. 마치 계산기처럼 숫자를 계산하고, 데이터를 정리하는 데 특화되어 있습니다.
- **pandas, numpy**: 데이터 처리
  > 💡 **쉽게 이해하기**: pandas는 엑셀처럼 데이터를 다루는 도구고, numpy는 숫자 계산을 빠르게 해주는 도구예요. 큰 데이터도 빠르게 처리할 수 있게 해줍니다.
- **MCP 방법 관리 라이브러리**: 통계 방법, 보간 방법, 결측값/이상값 처리 방법 관리
  > 💡 **쉽게 이해하기**: MCP 방법은 데이터를 처리하는 여러 가지 방법을 모아둔 도구상자예요. 예를 들어, 빈 칸을 채우는 방법, 이상한 값을 찾는 방법 등을 모아둡니다.

### 1.4 프로젝트 정보

- **프로젝트명**: 시계열 데이터 파이프라인 시스템
- **기간**: 설계 단계 약 17일, 개발 단계 약 30일 (예상)
- **팀 구성**: 프론트엔드 개발자 2명, 백엔드 개발자 1명, 데이터 엔지니어 1명, QA 엔지니어 1명, 디자이너 1명 (파트타임)

---

## 2. 문서 구조

### 2.1 문서 분류

프로젝트 문서는 다음 세 가지 카테고리로 분류됩니다:

#### A. 설계 문서 (Design Documents)
시스템의 구조와 동작 방식을 정의하는 문서들입니다.

**핵심 설계 문서:**
- `Blue_Print.md`: 프로젝트 개요 및 기술 스택
- `Database_Design.md`: 데이터베이스 스키마 설계
- `API_Design.md`: RESTful API 엔드포인트 설계
- `Component_Interfaces_Design.md`: React 컴포넌트 Props 인터페이스 정의
- `State_Management_Design.md`: 상태 관리 전략
- `Edge_Functions_Design.md`: Supabase Edge Functions 설계
- `Form_Validation_Design.md`: 폼 검증 스키마 정의
- `UI_Components_Spec.md`: HTML/CSS → React 변환 가이드
- `Project_Structure_Design.md`: 폴더 구조 및 컴포넌트 구조
- `MCP_Methods_Design.md`: MCP 방법 관리 시스템 설계
- `Realtime_Data_Source_Design.md`: 실시간 데이터 소스 설계

**보조 설계 문서:**
- `Initial_Situation_Report.md`: HTML/JS 파일 분석 결과
- `Process_Overview.md`: 프로세스 개요
- `Integration_Checklist.md`: 통합 체크리스트

#### B. 개발 가이드 문서 (Development Guide Documents)
개발 프로세스와 작업 방법을 안내하는 문서들입니다.

- `Development_Guide.md`: 순차적 개발 가이드 (Cursor AI 협업)
- `Troubleshooting_Guide.md`: 문제 해결 가이드
- `Feature_Modification_Guide.md`: 기능 수정 가이드
- `Completion_Process_Guide.md`: 개발 완료 및 테스트 후 커밋 가이드
- `Testing_Checklist.md`: 테스트 체크리스트
- `Development_Checklist.md`: 개발 체크리스트

#### C. 설계 문서 생성 가이드 (Design Document Generation Guide)
HTML/JS 파일을 입력으로 받아 설계 문서를 생성하는 가이드입니다.

- `Design_Document_Generation_Guide.md`: 설계 문서 생성 가이드

### 2.2 문서 간 의존성 관계

```
입력 파일 (index.html, style.css, app.js)
    ↓
[Phase 0] Initial_Situation_Report.md
    ↓ (HTML/JS 분석 결과)
[Phase 1] Blue_Print.md
    ├─→ [Phase 2] Project_Structure_Design.md
    │       ├─→ [Phase 3] UI_Components_Spec.md
    │       └─→ [Phase 4] Component_Interfaces_Design.md
    │               ├─→ [Phase 5] Database_Design.md
    │               │       ├─→ [Phase 6] API_Design.md
    │               │       │       ├─→ [Phase 7] State_Management_Design.md
    │               │       │       │       └─→ [Phase 8] Form_Validation_Design.md
    │               │       │       └─→ [Phase 9] Edge_Functions_Design.md
    │               │       └─→ [Phase 11] Realtime_Data_Source_Design.md
    │               └─→ [Phase 10] MCP_Methods_Design.md
```

**의존성 설명:**
- 각 Phase는 이전 Phase의 문서를 참조하여 생성됩니다.
- 예를 들어, `Database_Design.md`는 `Component_Interfaces_Design.md`의 타입 정의를 바탕으로 테이블 구조를 설계합니다.
- `API_Design.md`는 `Database_Design.md`의 테이블 구조를 바탕으로 API 엔드포인트를 설계합니다.

### 2.3 개발 가이드 문서 간 관계

```
개발 시작
    ↓
Development_Guide.md (순차적 개발)
    ├─→ 문제 발생 시 → Troubleshooting_Guide.md
    ├─→ 기능 수정 시 → Feature_Modification_Guide.md
    └─→ 개발 완료 시 → Completion_Process_Guide.md
                          └─→ Testing_Checklist.md
```

---

## 3. 시스템 아키텍처

### 3.1 전체 아키텍처 개요

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + TypeScript)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Dashboard  │  │ Data Input   │  │ Data Merge   │  ... │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Query (서버 상태) + Zustand (클라이언트 상태) │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ HTTP/REST API
                        │ Supabase Realtime
                        │
┌───────────────────────▼──────────────────────────────────────┐
│                    Supabase (BaaS)                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │ Edge Functions│  │   Realtime   │      │
│  │  Database    │  │               │  │  Subscriptions│     │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        │ API 호출
                        │
┌───────────────────────▼──────────────────────────────────────┐
│              Apache Airflow (워크플로우 오케스트레이션)      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  DAG 실행 (Python + pandas + numpy)                   │   │
│  │  - 데이터 수집                                        │   │
│  │  - 데이터 병합                                        │   │
│  │  - 데이터 타입 변환                                   │   │
│  │  - 데이터 정리                                        │   │
│  │  - 데이터 리샘플링                                    │   │
│  │  - 구간 정보값 변환                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
                        │
                        │ 데이터 연동
                        │
┌───────────────────────▼──────────────────────────────────────┐
│         Factory Ontology Manager (기존 시스템)                │
│  - 공정 정보 (processNodes, processConnections)              │
│  - 센서/PLC 정보                                             │
│  - 공정 시간 정보 (estimatedDuration, standardCycleTime)      │
└───────────────────────────────────────────────────────────────┘
```

### 3.2 프론트엔드 구조

> 💡 **쉽게 이해하기**: 프론트엔드는 사용자가 보는 화면 부분이에요. 웹사이트의 버튼, 입력창, 차트 같은 것들이 모두 프론트엔드입니다.

#### 컴포넌트 계층 구조

> 💡 **쉽게 이해하기**: 컴포넌트는 레고 블록 같은 거예요. 작은 블록(버튼, 입력창)을 모아서 큰 블록(페이지)을 만들고, 큰 블록들을 모아서 전체 웹사이트를 만듭니다.

```
App.tsx
├── Layout (공통 레이아웃)
│   ├── Header
│   ├── Sidebar
│   └── Main Content
│       ├── Dashboard Page
│       │   ├── PipelineProgress (파이프라인 진행 상황)
│       │   ├── DataSourceStatus (데이터 소스 현황)
│       │   ├── SystemMetrics (시스템 메트릭)
│       │   └── RealtimeChart (실시간 차트)
│       ├── DataInput Page
│       │   ├── FileUpload (파일 업로드)
│       │   ├── APIConnectionForm (API 연결 폼)
│       │   └── DataSourceList (데이터 소스 목록)
│       ├── DataMerge Page
│       │   ├── TimeOffsetSettings (시간 오프셋 설정)
│       │   ├── ColumnMapping (컬럼 매핑)
│       │   └── MergeRules (병합 규칙)
│       └── ... (기타 페이지)
└── UI Components (shadcn/ui)
    ├── Button
    ├── Card
    ├── Dialog
    ├── Input
    └── ...
```

#### 상태 관리 구조

> 💡 **쉽게 이해하기**: 상태 관리는 화면에 보이는 정보를 기억하고 관리하는 거예요. 예를 들어, "파이프라인 목록", "현재 선택한 필터" 같은 것들을 기억해두고 필요할 때 사용합니다.

```
React Query (서버 상태)
├── pipelines (파이프라인 목록, 상세 정보)
├── dataSources (데이터 소스 목록, 상태)
├── pipelineExecutions (실행 이력)
└── mcpMethods (MCP 방법 목록)
```
> 💡 **쉽게 이해하기**: React Query는 서버에서 가져온 데이터를 관리해요. 한 번 가져온 데이터는 기억해두고, 필요할 때만 다시 가져옵니다.

```
Zustand (클라이언트 상태)
├── UI 상태 (모달 열림/닫힘, 필터 상태)
└── 전역 설정
```
> 💡 **쉽게 이해하기**: Zustand는 화면의 상태를 관리해요. 예를 들어, 팝업창이 열려있는지, 어떤 필터를 선택했는지 같은 것들을 기억합니다.

```
React Hook Form (폼 상태)
├── 데이터 소스 생성 폼
├── 파이프라인 설정 폼
└── MCP 방법 관리 폼
```
> 💡 **쉽게 이해하기**: React Hook Form은 입력창의 내용을 관리해요. 사용자가 입력한 내용을 자동으로 기억하고, 제출할 때 한 번에 가져옵니다.

```
Supabase Realtime (실시간 상태)
├── 파이프라인 실행 상태 업데이트
└── 실시간 데이터 수집 상태
```
> 💡 **쉽게 이해하기**: Supabase Realtime은 데이터가 바뀌면 자동으로 화면을 업데이트해줘요. 마치 실시간 채팅처럼, 새로운 데이터가 오면 바로 화면에 나타납니다.

### 3.3 백엔드 구조

> 💡 **쉽게 이해하기**: 백엔드는 사용자가 보지 못하는 뒷부분이에요. 데이터를 저장하고, 처리하고, 다른 시스템과 대화하는 역할을 합니다. 마치 레스토랑의 주방처럼요.

#### Supabase 구조

```
Supabase
├── PostgreSQL Database
│   ├── pipelines (파이프라인 정보)
│   ├── pipeline_configs (파이프라인 설정)
│   ├── pipeline_executions (실행 이력)
│   ├── pipeline_results (실행 결과)
│   ├── data_sources (데이터 소스)
│   ├── data_source_configs (데이터 소스 설정)
│   ├── mcp_methods (MCP 방법)
│   ├── sensor_master (센서 마스터)
│   └── sensor_data (센서 데이터)
│
├── Edge Functions
│   ├── execute-pipeline (파이프라인 실행)
│   ├── realtime-collection (실시간 데이터 수집)
│   └── batch-processor (배치 처리)
│
└── Realtime Subscriptions
    ├── pipeline_executions (실행 상태 실시간 업데이트)
    └── data_sources (데이터 소스 상태 실시간 업데이트)
```

#### Edge Functions 역할

> 💡 **쉽게 이해하기**: Edge Functions는 서버에서 실행되는 작은 프로그램들이에요. 특정 작업을 자동으로 처리해주는 로봇 같은 거예요.

1. **execute-pipeline**: 파이프라인 실행 요청을 받아 Airflow DAG를 트리거하고 실행 상태를 관리
   > 💡 **쉽게 이해하기**: "파이프라인 실행해줘"라는 요청을 받으면, Airflow에게 작업을 시작하라고 알려주고, 진행 상황을 계속 확인하는 역할이에요.

2. **realtime-collection**: 실시간 데이터 수집 큐 워커로, 주기적으로 데이터를 수집하여 데이터베이스에 저장
   > 💡 **쉽게 이해하기**: 주기적으로(예: 1분마다) 데이터를 가져와서 데이터베이스에 저장하는 자동화된 작업이에요. 마치 자동으로 뉴스를 가져오는 봇처럼요.

3. **batch-processor**: 대용량 데이터 배치 처리 작업 수행
   > 💡 **쉽게 이해하기**: 한 번에 많은 데이터를 처리하는 작업이에요. 예를 들어, 10만 개의 데이터를 한 번에 계산하거나 변환하는 일을 합니다.

### 3.4 데이터베이스 구조

> 💡 **쉽게 이해하기**: 데이터베이스는 데이터를 저장하는 창고예요. 엑셀 표처럼 행과 열로 데이터를 정리해서 저장하고, 필요할 때 찾아서 쓸 수 있습니다.

#### 주요 테이블 관계

> 💡 **쉽게 이해하기**: 테이블은 엑셀의 시트 같은 거예요. 각 테이블은 서로 연결되어 있어서, 한 테이블의 정보를 사용해서 다른 테이블의 정보를 찾을 수 있습니다.

```
factories (Factory Ontology Manager)
    ↓ (1:N)
pipeline_hierarchy_mappings
    ↓
pipelines
    ├── (1:1) pipeline_configs
    ├── (1:N) pipeline_executions
    │           └── (1:N) pipeline_results
    └── (N:M) pipeline_process_mappings

data_sources
    ├── (1:1) data_source_configs
    └── (1:1) data_source_status

mcp_methods (MCP 방법 관리)
    └── category: statistical_method | interpolation_method | missing_value_method | outlier_method

sensor_master (기존 시스템)
    └── (1:N) sensor_data
```

#### 데이터 흐름

```
1. 데이터 수집
   data_sources → data_source_configs → data_source_status
   
2. 파이프라인 실행
   pipelines → pipeline_configs → pipeline_executions → pipeline_results
   
3. MCP 방법 사용
   mcp_methods → pipeline_configs (병합 규칙, 정리 규칙 등)
   
4. Factory Ontology Manager 연동
   factories → pipeline_hierarchy_mappings → pipelines
```

### 3.5 외부 시스템 연동

#### Apache Airflow 연동

> 💡 **쉽게 이해하기**: Airflow 연동은 여러 단계의 작업을 자동으로 순서대로 실행하는 과정이에요. 마치 요리 레시피를 따라 자동으로 요리를 만드는 것처럼요.

```
Frontend (React)
    ↓ HTTP POST (요청 보내기)
Supabase Edge Function (execute-pipeline)
    ↓ API 호출 (다른 시스템에 일 시키기)
Apache Airflow
    ↓ DAG 실행 (작업 순서대로 실행)
Python Scripts (pandas, numpy)
    ↓ 데이터 처리 (데이터 계산하고 변환하기)
PostgreSQL Database
    ↓ 결과 저장 (결과를 창고에 저장)
Frontend (React Query) - 실시간 업데이트 (화면에 결과 보여주기)
```

> 💡 **쉽게 이해하기**: 
> 1. 사용자가 "파이프라인 실행해줘" 버튼을 누름 (Frontend)
> 2. Edge Function이 "Airflow야, 작업 시작해줘"라고 요청 (API 호출)
> 3. Airflow가 미리 정해둔 순서대로 작업을 실행 (DAG 실행)
> 4. Python 스크립트가 데이터를 처리 (계산, 변환)
> 5. 결과를 데이터베이스에 저장
> 6. 화면에 결과가 자동으로 나타남 (실시간 업데이트)

**Airflow DAG 구조:**
- 각 파이프라인 단계는 별도의 Airflow Task로 구현
  > 💡 **쉽게 이해하기**: Task는 하나의 작업 단위예요. 예를 들어, "데이터 수집하기", "데이터 병합하기" 같은 각각의 작업이 Task입니다.
- Task 간 의존성은 DAG 구조로 정의
  > 💡 **쉽게 이해하기**: DAG는 작업들의 순서를 정해둔 그림이에요. "1번 작업 끝나면 2번 작업 시작하고, 2번과 3번이 끝나면 4번 시작해" 같은 순서를 정해둡니다.
- 실행 상태는 Supabase `pipeline_executions` 테이블에 저장
  > 💡 **쉽게 이해하기**: 작업이 시작됐는지, 진행 중인지, 끝났는지 같은 상태를 데이터베이스에 기록해요. 그래서 나중에 언제 시작했고 언제 끝났는지 확인할 수 있습니다.

#### Factory Ontology Manager 연동

```
Factory Ontology Manager
    ├── 공정 정보 (processNodes, processConnections)
    ├── 센서/PLC 정보
    └── 공정 시간 정보 (estimatedDuration, standardCycleTime)
            ↓
    pipeline_hierarchy_mappings 테이블
            ↓
    MCP 오프셋 추천 시스템
    MCP 리샘플링 간격 계산
```

**연동 목적:**
- 공정 정보를 기반으로 시간 오프셋 자동 추천
- 공정 시간 정보를 기반으로 리샘플링 간격 자동 계산

---

## 4. 개발 프로세스

### 4.1 설계 문서 생성 프로세스

HTML/JS 파일을 입력으로 받아 설계 문서를 순차적으로 생성하는 프로세스입니다.

**프로세스 흐름:**

```
1. 입력 파일 제공 (index.html, style.css, app.js)
   ↓
2. Phase 0: Initial_Situation_Report.md 생성
   (HTML/JS 파일 분석)
   ↓
3. 개발 이념 확인 및 질문
   (기존 프로젝트 통합 여부, 기술 스택 결정 등)
   ↓
4. Phase 1-11: 설계 문서 순차 생성
   (질문 → 답변 → 문서 생성)
   ↓
5. 모든 설계 문서 생성 완료
```

**핵심 원칙:**
- 하드코딩 금지: 모든 결정 사항은 Cursor와 개발자의 대화를 통해 결정
- 문서 간 의존성 준수: 문서 생성 순서는 의존성 관계에 따라 결정
- 개발 이념 준수: 기존 프로젝트와의 통합, UI 형상 유지 등 개발 이념 반영

**참조 문서:** `Design_Document_Generation_Guide.md`

### 4.2 개발 프로세스

Cursor AI와 협업하여 순차적으로 개발을 진행하는 프로세스입니다.

**프로세스 흐름:**

```
Phase 1: 프로젝트 초기화 및 환경 설정
   ↓
Phase 2: 공통 컴포넌트 개발
   ↓
Phase 3: 페이지별 기능 개발
   ├── Dashboard 페이지
   ├── Data Input 페이지
   ├── Data Merge 페이지
   └── ... (기타 페이지)
   ↓
Phase 4: Factory Ontology Manager 통합
   ↓
Phase 5: 상태 관리 및 데이터 페칭 구현
   ↓
Phase 6: 데이터베이스 마이그레이션
   ↓
Phase 7: Airflow 통합
```

**각 Phase의 작업 흐름:**

> 💡 **쉽게 이해하기**: 개발은 레고 블록을 조립하는 것과 같아요. 먼저 설명서(체크리스트)를 보고, 필요한 블록(참조 문서)을 찾고, 조립(Cursor 프롬프트)하고, 제대로 조립됐는지 확인(검증 체크)합니다.

1. **체크리스트 확인**: Development_Checklist.md의 해당 Phase 항목 확인
   > 💡 **쉽게 이해하기**: "오늘 뭘 해야 하지?"를 확인하는 거예요. 체크리스트에 "버튼 만들기", "입력창 만들기" 같은 할 일이 적혀있어요.
2. **참조 문서 읽기**: 각 항목에 명시된 참조 설계문서 확인
   > 💡 **쉽게 이해하기**: "버튼은 어떻게 만들어야 하지?"를 확인하는 거예요. 설계 문서에 버튼의 크기, 색깔, 동작 방법이 적혀있어요.
3. **Cursor 프롬프트 사용**: 제공된 프롬프트 예시를 참고하여 Cursor에게 작업 요청
   > 💡 **쉽게 이해하기**: Cursor AI에게 "빨간색 버튼 만들어줘"라고 요청하는 거예요. Cursor가 자동으로 코드를 만들어줍니다.
4. **검증 체크**: 작업 완료 후 검증 항목 확인
   > 💡 **쉽게 이해하기**: "제대로 만들어졌나?"를 확인하는 거예요. 버튼을 눌러보고, 색깔이 맞는지, 클릭했을 때 제대로 동작하는지 확인해요.

**참조 문서:** `Development_Guide.md`

### 4.3 문제 해결 프로세스

개발 중 문제가 발생했을 때 해결하는 프로세스입니다.

**프로세스 흐름:**

```
문제 발생
   ↓
문제 유형 파악
   ├── Type Errors (타입 에러)
   ├── API Errors (API 에러)
   ├── State Management Issues (상태 관리 문제)
   ├── Database Issues (데이터베이스 문제)
   └── UI/UX Issues (UI/UX 문제)
   ↓
Troubleshooting_Guide.md 참조
   ↓
진단 단계 수행
   ↓
해결 방법 적용
   ↓
검증 체크
```

**참조 문서:** `Troubleshooting_Guide.md`

### 4.4 기능 수정 프로세스

기존 기능을 수정하거나 개선하는 프로세스입니다.

**프로세스 흐름:**

```
기능 수정 요청
   ↓
수정 전 체크리스트 확인
   ├── 영향 범위 분석
   ├── 참조 설계문서 확인
   └── 수정 계획 수립
   ↓
수정 작업 수행
   ├── 설계문서 수정 (필요한 경우)
   ├── 코드 수정
   └── 테스트 수행
   ↓
문제 발생 시 → Troubleshooting_Guide.md 참조
   ↓
수정 후 체크리스트 확인
   ├── 영향 범위 재확인
   ├── 참조 가이드 문서 연쇄 업데이트
   └── 검증 체크
```

**참조 문서:** `Feature_Modification_Guide.md`

### 4.5 완료 프로세스

개발 작업 완료 후 테스트 및 Git 커밋을 수행하는 프로세스입니다.

**프로세스 흐름:**

```
개발 작업 완료
   ↓
완료 검증 체크리스트 확인
   ├── 기능 동작 확인
   ├── 타입 에러 확인
   └── 린터 에러 확인
   ↓
Testing_Checklist.md 참조하여 테스트 수행
   ↓
Git 커밋 및 푸시
   ├── 변경 사항 스테이징
   ├── 커밋 메시지 작성
   └── 원격 저장소에 푸시
```

**참조 문서:** `Completion_Process_Guide.md`, `Testing_Checklist.md`

---

## 5. 역할별 가이드

### 5.1 AI/Python 개발자를 위한 가이드

#### 5.1.1 담당 영역

AI/Python 개발자는 다음 영역을 담당합니다:

1. **Apache Airflow DAG 개발**
   - 8단계 파이프라인을 Airflow DAG로 구현
   - 각 단계별 Python 스크립트 작성
   - 데이터 처리 로직 구현 (pandas, numpy 사용)

2. **MCP 방법 관리 시스템**
   - 통계 방법, 보간 방법, 결측값/이상값 처리 방법 구현
   - 방법별 알고리즘 개발

3. **데이터 처리 로직**
   - 데이터 병합 로직
   - 데이터 타입 변환 로직
   - 데이터 정리 로직 (결측값/이상값 처리)
   - 데이터 리샘플링 로직
   - 구간 정보값 변환 로직

#### 5.1.2 참조 문서

**필수 읽기 문서:**
- `Blue_Print.md`: 프로젝트 개요 및 기술 스택
- `Edge_Functions_Design.md`: Edge Functions 구조 및 파이프라인 실행 로직
- `Database_Design.md`: 데이터베이스 스키마 (데이터 저장 구조 이해)
- `MCP_Methods_Design.md`: MCP 방법 관리 시스템 설계

**참고 문서:**
- `API_Design.md`: API 엔드포인트 (Edge Functions에서 호출하는 API)
- `Realtime_Data_Source_Design.md`: 실시간 데이터 수집 로직

#### 5.1.3 Airflow DAG 개발 가이드

**DAG 구조:**

> 💡 **쉽게 이해하기**: DAG는 작업들의 순서를 정해둔 레시피예요. "1단계: 데이터 수집 → 2단계: 데이터 병합 → 3단계: 데이터 변환" 같은 순서를 코드로 작성합니다.

```python
from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def data_input_task(**context):
    """데이터 수집 작업"""
    # 데이터 소스에서 데이터 수집
    # Supabase API 호출하여 데이터 소스 정보 조회
    # 데이터 수집 로직 실행
    pass
```
> 💡 **쉽게 이해하기**: `data_input_task`는 "데이터 수집하기"라는 작업이에요. 데이터 소스에서 데이터를 가져오는 일을 합니다.

```python
def data_merge_task(**context):
    """데이터 병합 작업"""
    # 시간 동기화하여 데이터 통합
    # MCP 방법 사용 (보간 방법)
    pass
```
> 💡 **쉽게 이해하기**: `data_merge_task`는 "데이터 병합하기"라는 작업이에요. 여러 곳에서 가져온 데이터를 시간에 맞춰서 합치는 일을 합니다.

```python
dag = DAG(
    'pipeline_execution',
    start_date=datetime(2025, 1, 1),
    schedule_interval=None,
    catchup=False
)
```
> 💡 **쉽게 이해하기**: `DAG`는 작업들의 순서를 정의하는 거예요. "언제 시작할지", "얼마나 자주 실행할지" 같은 설정을 합니다.

```python
task1 = PythonOperator(
    task_id='data_input',
    python_callable=data_input_task,
    dag=dag
)

task2 = PythonOperator(
    task_id='data_merge',
    python_callable=data_merge_task,
    dag=dag,
    upstream_task_ids=['data_input']  # task1이 끝나야 task2 시작
)
```
> 💡 **쉽게 이해하기**: `upstream_task_ids=['data_input']`은 "data_input 작업이 끝나야 이 작업을 시작해"라는 의미예요. 순서를 정해주는 거죠.

**주요 고려사항:**
- 각 Task는 Supabase `pipeline_executions` 테이블에 실행 상태를 업데이트해야 함
  > 💡 **쉽게 이해하기**: 작업이 시작됐는지, 진행 중인지, 끝났는지를 데이터베이스에 기록해요. 그래서 화면에서 진행 상황을 볼 수 있어요.
- Task 간 데이터 전달은 Supabase `pipeline_results` 테이블을 통해 수행
  > 💡 **쉽게 이해하기**: 1단계 작업의 결과를 2단계 작업에서 사용해야 해요. 데이터베이스에 결과를 저장해두면, 2단계 작업에서 그 결과를 가져다 쓸 수 있어요.
- 실패 시 재시도 로직 구현 필요
  > 💡 **쉽게 이해하기**: 작업이 실패했을 때 자동으로 다시 시도하는 기능이에요. 네트워크가 잠깐 끊겼을 때 자동으로 다시 시도해서 성공할 수 있게 해줍니다.

**참조 문서:** `Edge_Functions_Design.md` (파이프라인 실행 Edge Function 섹션)

#### 5.1.4 MCP 방법 관리 시스템 이해

**MCP 방법 카테고리:**
1. **통계 방법 (statistical_method)**: 구간 정보값 변환에 사용
   > 💡 **쉽게 이해하기**: 통계 방법은 데이터의 평균, 최대값, 최소값 같은 통계를 계산하는 방법이에요. 예를 들어, "1분 동안의 데이터의 평균값을 구해줘" 같은 일을 합니다.
2. **보간 방법 (interpolation_method)**: 데이터 병합 시 사용
   > 💡 **쉽게 이해하기**: 보간 방법은 빈 칸을 채우는 방법이에요. 예를 들어, 9시와 11시 데이터는 있는데 10시 데이터가 없으면, 9시와 11시 데이터를 보고 10시 데이터를 추정해서 채워넣는 거예요.
3. **결측값 처리 방법 (missing_value_method)**: 데이터 정리 시 사용
   > 💡 **쉽게 이해하기**: 결측값은 데이터가 없는 거예요. "이 값이 없으면 어떻게 할까?"를 처리하는 방법이에요. 예를 들어, 평균값으로 채우거나, 이전 값으로 채우거나 하는 방법이 있어요.
4. **이상값 처리 방법 (outlier_method)**: 데이터 정리 시 사용
   > 💡 **쉽게 이해하기**: 이상값은 너무 크거나 작아서 이상한 값이에요. 예를 들어, 온도가 보통 20도인데 갑자기 200도가 나오면 이상한 거죠. 이런 이상한 값을 찾아서 제거하거나 수정하는 방법이에요.

**데이터베이스 구조:**
- `mcp_methods` 테이블에 방법 정보 저장
  > 💡 **쉽게 이해하기**: `mcp_methods` 테이블은 방법들을 저장하는 엑셀 표예요. 각 방법의 이름, 설명, 사용 이유 같은 정보를 저장해둡니다.
- 각 방법은 `category`, `name`, `description`, `reason`, `confidence`, `method_value` 필드를 가짐
  > 💡 **쉽게 이해하기**: 
  > - `category`: 방법의 종류 (통계 방법인지, 보간 방법인지)
  > - `name`: 방법의 이름 (예: "평균값 보간")
  > - `description`: 방법의 설명 (어떻게 동작하는지)
  > - `reason`: 왜 이 방법을 추천하는지
  > - `confidence`: 이 방법이 얼마나 신뢰할 만한지 (0~100%)
  > - `method_value`: 방법에 필요한 설정값

**사용 흐름:**
1. 프론트엔드에서 MCP 방법 목록 조회 (React Query)
   > 💡 **쉽게 이해하기**: 화면에서 사용 가능한 방법 목록을 가져와요. 예를 들어, "평균값 보간", "선형 보간", "이전 값 사용" 같은 방법들이 목록에 나타나요.
2. 사용자가 방법 선택
   > 💡 **쉽게 이해하기**: 사용자가 "이 방법을 사용할래"라고 선택해요. 마치 음식 주문할 때 메뉴를 고르는 것처럼요.
3. 파이프라인 설정에 방법 정보 저장
   > 💡 **쉽게 이해하기**: 선택한 방법을 파이프라인 설정에 저장해요. 나중에 파이프라인을 실행할 때 이 방법을 사용하도록 설정해두는 거예요.
4. Airflow DAG 실행 시 방법 정보를 읽어 데이터 처리 로직에 적용
   > 💡 **쉽게 이해하기**: 파이프라인이 실행될 때, 저장해둔 방법 정보를 가져와서 데이터 처리에 사용해요. 예를 들어, "평균값 보간" 방법을 선택했다면, 빈 칸을 채울 때 평균값을 사용합니다.

**참조 문서:** `MCP_Methods_Design.md`

#### 5.1.5 Factory Ontology Manager 연동

**연동 목적:**
- 공정 정보를 기반으로 시간 오프셋 자동 추천
  > 💡 **쉽게 이해하기**: 시간 오프셋은 데이터의 시간을 맞추는 거예요. 예를 들어, 센서 A는 오전 9시에 측정했고, 센서 B는 오전 9시 5분에 측정했다면, 시간을 맞춰줘야 합니다. Factory Ontology Manager의 공정 정보를 보면 "이 공정은 보통 5분 걸린다"는 걸 알 수 있어서, 자동으로 시간을 맞춰줄 수 있어요.
- 공정 시간 정보를 기반으로 리샘플링 간격 자동 계산
  > 💡 **쉽게 이해하기**: 리샘플링은 데이터를 일정한 간격으로 다시 정리하는 거예요. 예를 들어, 1초마다 측정한 데이터를 1분마다로 바꾸는 거예요. Factory Ontology Manager에서 "이 공정은 보통 1분 걸린다"는 정보를 가져와서, 자동으로 적절한 간격을 계산해줍니다.

**데이터 구조:**
- `pipeline_hierarchy_mappings`: 파이프라인과 Factory Ontology Manager 계층 구조 매핑
  > 💡 **쉽게 이해하기**: 파이프라인과 공정을 연결해주는 표예요. "이 파이프라인은 이 공정과 연결되어 있어"라는 정보를 저장합니다.
- `process_times`: 공정 시간 정보 (estimatedDuration, standardCycleTime)
  > 💡 **쉽게 이해하기**: 각 공정이 얼마나 걸리는지 기록한 표예요. "이 공정은 보통 5분 걸리고, 표준 사이클은 30초야" 같은 정보가 있어요.

**사용 흐름:**
1. 파이프라인 생성 시 Factory Ontology Manager의 공정 정보 연동
   > 💡 **쉽게 이해하기**: 파이프라인을 만들 때, 어떤 공정과 연결할지 선택해요. 예를 들어, "온도 측정 공정"과 연결하면, 그 공정의 정보를 가져올 수 있어요.
2. 데이터 병합 단계에서 공정 시간 정보를 기반으로 오프셋 추천
   > 💡 **쉽게 이해하기**: 데이터를 합칠 때, 공정 시간 정보를 보고 "센서들 사이에 5분 차이가 있어야 해"라고 자동으로 알려줘요.
3. 데이터 리샘플링 단계에서 공정 시간 정보를 기반으로 간격 계산
   > 💡 **쉽게 이해하기**: 데이터를 다시 정리할 때, 공정 시간 정보를 보고 "1분 간격으로 정리하는 게 좋겠어"라고 자동으로 계산해줘요.

**참조 문서:** `Database_Design.md` (pipeline_hierarchy_mappings, process_times 테이블 섹션)

### 5.2 프로젝트 관리자를 위한 가이드

#### 5.2.1 프로젝트 진행 상황 파악 방법

**문서 기반 진행 상황 확인:**

1. **설계 단계 진행 상황**
   - `Design_Document_Generation_Guide.md`의 문서 생성 체크리스트 확인
   - 각 Phase별 문서 생성 완료 여부 확인

2. **개발 단계 진행 상황**
   - `Development_Checklist.md`의 Phase별 체크리스트 확인
   - 각 Phase의 예상 시간과 실제 소요 시간 비교

3. **문제 발생 상황**
   - `Troubleshooting_Guide.md` 참조하여 문제 유형 파악
   - 문제 해결 진행 상황 확인

**Git 기반 진행 상황 확인:**

```bash
# 최근 커밋 내역 확인
git log --oneline --graph

# 특정 파일의 변경 이력 확인
git log --follow -- <파일명>

# 브랜치별 진행 상황 확인
git branch -a
```

#### 5.2.2 문서 활용 방법

**프로젝트 시작 시:**
1. `Architecture_Overview.md` (이 문서) 읽기: 전체 구조 이해
2. `Blue_Print.md` 읽기: 프로젝트 개요 및 기술 스택 확인
3. `Process_Overview.md` 읽기: 프로세스 개요 확인

**개발 진행 중:**
1. `Development_Guide.md` 참조: 개발 프로세스 확인
2. `Development_Checklist.md` 참조: 개발 진행 상황 확인
3. `Troubleshooting_Guide.md` 참조: 문제 해결 방법 확인

**기능 수정 시:**
1. `Feature_Modification_Guide.md` 참조: 수정 프로세스 확인
2. 관련 설계 문서 확인: 수정 영향 범위 파악

**프로젝트 완료 시:**
1. `Completion_Process_Guide.md` 참조: 완료 프로세스 확인
2. `Testing_Checklist.md` 참조: 테스트 수행

#### 5.2.3 팀원 역할 분담 가이드

**프론트엔드 개발자 (2명):**
- 담당 문서: `Component_Interfaces_Design.md`, `UI_Components_Spec.md`, `State_Management_Design.md`
- 주요 작업: React 컴포넌트 개발, 상태 관리 구현, UI/UX 구현

**백엔드 개발자 (1명):**
- 담당 문서: `Database_Design.md`, `API_Design.md`, `Edge_Functions_Design.md`
- 주요 작업: 데이터베이스 스키마 설계, API 엔드포인트 구현, Edge Functions 개발

**데이터 엔지니어 (1명):**
- 담당 문서: `Edge_Functions_Design.md`, `MCP_Methods_Design.md`, `Realtime_Data_Source_Design.md`
- 주요 작업: Airflow DAG 개발, 데이터 처리 로직 구현, MCP 방법 관리 시스템 개발

**QA 엔지니어 (1명):**
- 담당 문서: `Testing_Checklist.md`, `Testing_Examples.md`
- 주요 작업: 테스트 케이스 작성, 테스트 수행, 버그 리포트 작성

**디자이너 (1명, 파트타임):**
- 담당 문서: `UI_Components_Spec.md`
- 주요 작업: UI 디자인, 사용자 경험 개선

#### 5.2.4 커뮤니케이션 가이드

**일일 스탠드업:**
- 각 팀원은 `Development_Checklist.md`의 진행 상황을 공유
- 문제 발생 시 `Troubleshooting_Guide.md` 참조하여 해결 방법 공유

**주간 리뷰:**
- 설계 문서 변경 사항 리뷰
- 개발 진행 상황 리뷰
- 다음 주 계획 수립

**문서 업데이트:**
- 설계 문서 변경 시 `Feature_Modification_Guide.md`의 "참조 가이드 문서 연쇄 업데이트" 섹션 참조
- 개발 가이드 문서도 함께 업데이트 필요

---

## 부록

### A. 주요 문서 요약

| 문서명 | 목적 | 주요 내용 |
|--------|------|----------|
| Blue_Print.md | 프로젝트 개요 | 기술 스택, 핵심 페이지 목록, 주요 기능 |
| Database_Design.md | 데이터베이스 설계 | 테이블 구조, ERD, 쿼리 예시 |
| API_Design.md | API 설계 | RESTful API 엔드포인트, 요청/응답 형식 |
| Component_Interfaces_Design.md | 컴포넌트 인터페이스 | React 컴포넌트 Props 인터페이스 정의 |
| State_Management_Design.md | 상태 관리 설계 | React Query, Zustand, Supabase Realtime 패턴 |
| Edge_Functions_Design.md | Edge Functions 설계 | 파이프라인 실행, 실시간 데이터 수집 로직 |
| Development_Guide.md | 개발 가이드 | 순차적 개발 프로세스, Cursor AI 협업 방법 |
| Troubleshooting_Guide.md | 문제 해결 가이드 | 문제 유형별 진단 및 해결 방법 |
| Feature_Modification_Guide.md | 기능 수정 가이드 | 기능 수정 프로세스, 영향 범위 분석 |
| Design_Document_Generation_Guide.md | 설계 문서 생성 가이드 | HTML/JS 입력을 받아 설계 문서 생성하는 방법 |

### B. 기술 스택 요약

**Frontend:**
- React 18.3.1 + TypeScript 5.5.3 + Vite 7.1.12
- Tailwind CSS 3.4.11 + shadcn/ui
- React Query 5.56.2 + Zustand + React Hook Form 7.53.0

**Backend:**
- Supabase 2.55.0 (PostgreSQL + Edge Functions + Realtime)
- Apache Airflow (워크플로우 오케스트레이션)

**데이터 처리:**
- Python + pandas + numpy
- MCP 방법 관리 라이브러리

### C. 주요 개념 정리

**8단계 파이프라인:**
1. 데이터 수집 → 2. 데이터 병합 → 3. 데이터 타입 변환 → 4. 처리 결과 → 5. 데이터 정리 → 6. 데이터 리샘플링 → 7. 구간 정보값 변환 → 8. 최종 결과 저장

**MCP 방법 관리 시스템:**
통계 방법, 보간 방법, 결측값 처리 방법, 이상값 처리 방법을 관리하는 시스템

**Factory Ontology Manager 통합:**
공정 정보, 센서/PLC 정보, 공정 시간 정보를 활용하여 파이프라인 설정 자동화

---

**작성일**: 2025-01-27  
**버전**: 1.0.0  
**작성자**: AI Assistant