# 🧠 AMS (Anomaly Management System) Solution Architecture

**문서 ID**: `page.portfolio.ai_solution_detail`  
**작성자**: 권순룡 (Senior Software Architect)  
**생성일**: 2026-01-23

---

## 1. 사용 프레임워크 및 기술 스택 (Usage Framework)

본 솔루션은 **MSA (Microservices Architecture)** 기반으로 설계되어, 독립적인 Python 분석 엔진들과 C# WinForms 기반의 현장 친화적 UI가 결합된 구조입니다.

### 🛠️ Technology Stack Architecture

```mermaid
graph TB
    subgraph Frontend_Layer["💻 Frontend Layer"]
        direction TB
        subgraph Desktop["Desktop Application Core"]
            WinForms["C# WinForms .NET 4.8"]
            DevEx["DevExpress UI"]
            FactMES["FactMES Frame"]
        end
        subgraph Web["Web Application Dashboard"]
            React["React 18.3.1"]
            Vite["Vite"]
            RQuery["React Query"]
        end
    end

    subgraph Backend_Layer["⚙️ Backend Layer"]
        direction TB
        Python["Python 3.9.18<br/>AI Core Engine"]
        FastAPI["FastAPI / Flask<br/>Internal API"]
        JobQueue["Job Queue<br/>Process Management"]
    end

    subgraph AI_Engine["🧠 AI Core Modules"]
        direction TB
        MLS["01_MLS Machine Learning<br/>Scikit-Learn"]
        CoCTK["02_CoCTK Cost Opt<br/>Optimization"]
        FBS["03_FBS Fishbone<br/>Causal Analysis"]
        RMS["04_RMS Range<br/>Statistical"]
        AMS["05_AMS Integration<br/>PGMPY - NetworkX"]
    end

    subgraph Data_Layer["💾 Data Layer"]
        direction TB
        MSSQL[("MSSQL Server<br/>FactAI - Relational")]
        Neo4j[("Neo4j<br/>Knowledge Graph")]
    end

    Frontend_Layer --> Backend_Layer
    Backend_Layer --> AI_Engine
    AI_Engine --> Data_Layer

    style Frontend_Layer fill:#e1f5fe,stroke:#0277bd
    style Backend_Layer fill:#fff3e0,stroke:#ef6c00
    style AI_Engine fill:#f3e5f5,stroke:#7b1fa2
    style Data_Layer fill:#e8f5e9,stroke:#2e7d32
```

### 📋 상세 스펙

| Layer | Technology | Details |
|:---:|:---:|:---|
| **Frontend (Desk)** | **C# WinForms** | 제조 현장 Operator용 메인 UI. DevExpress 사용하여 고성능 데이터 시각화. |
| **Frontend (Web)** | **React** | 관리자용 대시보드. 데이터 모니터링 및 리포트 조회. |
| **Backend** | **Python 3.9** | 5개 핵심 모듈(MLS, CoCTK, FBS, RMS, AMS)로 구성된 AI 엔진. |
| **Database** | **Polyglot** | **MSSQL** (정형 데이터/설정), **Neo4j** (설비 관계/원인 분석). |

---

## 2. 사용 아키텍처 (Usage Architecture)

AMS는 **5-Layer Architecture**를 기반으로 데이터 수집부터 의사결정 지원까지 체계적인 흐름을 가집니다.

### 🏗️ 5-Layer System Architecture

```mermaid
graph TD
    subgraph Service["L5: Service & Visualization Layer"]
        UI_Web["React Dashboard"]
        UI_App["C# Operations App"]
        Report["FMEA Reports"]
    end

    subgraph Integration["L4: Integration & Knowledge Layer"]
        Neo4j[("Neo4j Graph DB")]
        Relations["Component Relations"]
        Causal["Causal Graph"]
    end

    subgraph AI["L3: AI Analysis Engine Layer"]
        AMS_Core["AMS Core Integration"]
        FBS_Engine["FBS Fishbone Analysis"]
        RMS_Engine["RMS Range Analysis"]
        MLS_Engine["MLS Machine Learning"]
    end

    subgraph Data["L2: Data Processing Layer"]
        Pipeline["Data Pipeline"]
        Preprocessing["Preprocessing Noise - Missing"]
        MSSQL[("MSSQL FactAI")]
    end

    subgraph Infra["L1: Physical Layer"]
        IoT["IoT Sensors"]
        PLC["PLC Data"]
        Log["System Logs"]
    end

    Infra --> Data
    Data --> AI
    AI --> Integration
    Integration --> Service
    
    style AI fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style Integration fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
```

---

## 3. AI 솔루션 세부 설명 (AI Solution Details)

### A. AMS 패턴 민주주의 (Pattern Democracy)

AMS는 단일 알고리즘의 편향을 방지하기 위해 3가지 서로 다른 관점의 알고리즘이 투표를 통해 최종 이상 여부를 판단하는 **앙상블 시스템**을 구현했습니다.

```mermaid
graph LR
    Input(["Sensor Data"]) --> Pre["Preprocessing"]
    
    subgraph Voters["The Voters AI Engine"]
        direction TB
        FBS["High-Voter: FBS<br/>Logical - Causal"]
        RMS["Mid-Voter: RMS<br/>Statistical - Range"]
        PDS["Low-Voter: MLS - PDS<br/>Visual - Pattern"]
    end
    
    Pre --> FBS
    Pre --> RMS
    Pre --> PDS
    
    FBS -->|Vote W1| Voting
    RMS -->|Vote W2| Voting
    PDS -->|Vote W3| Voting
    
    subgraph Decision["Decision Making"]
        Voting(("Pattern<br/>Voting"))
        Result{"Final Status"}
    end
    
    Voting --> Result
    Result -->|Normal| Green["Safe"]
    Result -->|Warning| Yellow["Check"]
    Result -->|Critical| Red["Alarm"]
    
    style Voting fill:#fff9c4,stroke:#fbc02d,stroke-width:4px
    style Green fill:#c8e6c9
    style Yellow fill:#fff9c4
    style Red fill:#ffcdd2
```

1.  **FBS (Fishbone Structure)**: 설비의 부품 간 인과관계를 기반으로 논리적인 이상을 탐지합니다.
2.  **RMS (Range Management)**: 데이터의 통계적 분포(평균, 표준편차 등)를 기반으로 수치적 이상을 탐지합니다.
3.  **MLS/PDS (Pattern)**: 머신러닝 및 시계열 패턴 매칭을 통해 과거 고장 패턴과의 유사성을 분석합니다.

### B. 핵심 AI 모듈 (Core Modules)

소스 코드(`AMS/AI_docker_en`)에 구현된 5대 핵심 모듈은 다음과 같습니다:

1.  **01_MLS (Machine Learning Service)**
    *   데이터 전처리, 특징 추출(Feature Extraction), 머신러닝 학습 담당.
2.  **02_CoCTK (Cost Control Toolkit)**
    *   비용 최적화 및 운영 효율성 분석 알고리즘.
3.  **03_FBS (Fishbone Structure)**
    *   피쉬본 다이어그램 구조 생성 및 원인-결과 경로 추적.
4.  **04_RMS (Range Management System)**
    *   데이터 클러스터링 및 동적 정상 범위(Dynamic Baselines) 설정.
    *   `cluster_auto_Binarization.py`를 통한 자동 임계치 설정.
5.  **05_AMS_dev (Analysis Management System)**
    *   전체 분석 파이프라인 통합 관리.
    *   베이지안 네트워크(`bayesian_network_analyzer.py`)를 활용한 확률적 원인 추론.
    *   FMEA 자동 생성(`generate_fmea.py`) 및 결과 DB 저장.

---

## 4. 진화의 역사 (Evolution History)

AMS는 2020년부터 시작된 R&D와 다양한 실증 프로젝트를 통해 완성되었습니다.

```mermaid
graph TD
    T2020("2020: O-WELL Japan Project<br/>Fishbone Concept Origins")
    T2021("2021: Virtual Sensors - EEMS<br/>Pattern Analysis Foundations")
    T2022("2022: CoCTK Development<br/>Module Standardization")
    T2023("2023: Pattern Democracy<br/>3-Algo Ensemble Arch.")
    T2024("2024: AMS Integration<br/>GS 1st Grade Certification")
    
    T2020 --> T2021
    T2021 --> T2022
    T2022 --> T2023
    T2023 --> T2024
    
    style T2024 fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
```
