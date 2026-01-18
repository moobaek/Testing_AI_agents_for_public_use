# 권순룡 경력기술서 - 현대카드 AI Engineer

> **"모델보다 데이터, 데이터보다 정보, 지식구조를 정리하는 현장친화적 연구원"**

---

## 기본 정보

**이름**: 권순룡  
**현 소속**: 한솔코에버 연구소 대리 (2020.09 ~ 재직중)  
**총 경력**: 5년 (2020~2025)  
**핵심 역량**: Agentic AI, ML/DL 모델링, 데이터 분석, Cloud platform, End-to-End 프로젝트  
**GitHub**: https://github.com/moobaek

---

## 경력 개요

### 한솔코에버 연구소 (2020.09 ~ 재직중)
**직급**: 대리  
**주요 업무**:
- AI 엔진 개발 및 총괄 PM
- 데이터 파이프라인 설계 및 구축
- Agentic AI 시스템 설계 및 개발

**성과**:
- GS 인증 1등급 2개 취득 (CoCTK, AMS-PDS)
- 세아특수강, 포미아 정식 납품
- 논문 9편 발표 (2020-2025)

### 경력 타임라인

```mermaid
timeline
    title 5년간의 AI 엔지니어링 여정
    2020 : FBS 엔진 초기 개발
         : CoCTK 엔진 개발 시작
    2021 : DPS 아키텍처 설계
         : 품질 예측 AI 엔진 개발
         : 고가센서 대체 가상센서
         : 클린룸 송풍기 제어
    2022 : CoCTK GS 인증 1등급
         : 일본 도료기업 DX 프로젝트
         : 진료기록 체질 관리 시스템
    2023 : AMS 프로젝트 시작
         : 에너지 최적화 솔루션
         : 공정 불량 예측
    2024 : AMS GS 인증 1등급
         : 세아특수강/포미아 납품
         : AI 종합 플랫폼 개발
    2025 : FMEA 자동화 시스템
         : Virtual Company Creation Agent
         : 프롬프트 평가 엔진
         : KSFM 학술대회 논문 발표
```

---

## 주요 수행 과제 및 기간

### 프로젝트 관계도

```mermaid
graph TB
    subgraph "Agentic AI 프로젝트"
        FMEA[FMEA 자동화<br/>Multi-Agent Workflow<br/>2025.6~진행중<br/>relevance: 98]
        VCC[Virtual Company<br/>Creation Agent<br/>2026.1~진행중<br/>relevance: 92]
        GATE[프롬프트 평가 엔진<br/>AI Gatekeeper<br/>2025.6~진행중]
    end
    
    subgraph "ML/DL 모델링 프로젝트"
        AMS[AMS<br/>베이지안 네트워크<br/>이상탐지 93.7%<br/>2024.07~2025.12<br/>relevance: 95]
        QUALITY[품질 예측 AI<br/>사출/도정/금형<br/>2021~2023]
        POWER[전력 데이터 예측<br/>2021.04~2021.11]
    end
    
    subgraph "데이터 파이프라인 프로젝트"
        COCTK[CoCTK<br/>데이터 전처리<br/>GS 인증 1등급<br/>2022.03~2024<br/>relevance: 85]
        DPS[DPS<br/>5층 아키텍처<br/>Neo4j 그래프DB<br/>2021~2024<br/>relevance: 82]
        PLATFORM[AI 종합 플랫폼<br/>2024.07~2025.03]
    end
    
    subgraph "가상 센서 및 제어"
        VSENSOR[고가센서 대체<br/>가상센서<br/>2021.05~2021.10]
        CLEAN[클린룸 송풍기 제어<br/>2021.04~2021.10]
    end
    
    FMEA -->|Agentic AI 기술| AMS
    AMS -->|데이터 파이프라인| DPS
    DPS -->|데이터 전처리| COCTK
    COCTK -->|상용화| PLATFORM
    QUALITY -->|ML/DL 모델링| AMS
    POWER -->|시계열 분석| AMS
    VCC -->|Dual-Tier AI| FMEA
    
    style FMEA fill:#3498db,color:#fff
    style AMS fill:#2ecc71,color:#fff
    style COCTK fill:#9b59b6,color:#fff
    style DPS fill:#e74c3c,color:#fff
    style VCC fill:#f39c12,color:#fff
```

### 과제 목록

| 과제명 (프로젝트) | 수행 기간 | 지원/주관 기관 |
|:---|:---|:---|
| 고가센서 대체 가상센서 | 2021.05. ~ 2021.10. | 한국에너지기술평가원 |
| 클린룸 송풍기 제어 | 2021.04. ~ 2021.10. | 한국에너지기술평가원 |
| 전력 데이터 예측 | 2021.04. ~ 2021.11. | 정보통신산업진흥원 |
| 품질 이상 예측 | 2021.04. ~ 2021.11. | 정보통신산업진흥원 |
| 공정 불량 예측 | 2023.04. ~ 2023.10. | 정보통신산업진흥원 |
| FBS | 2020.09. ~ 2021.10. | 한국에너지기술평가원 |
| 한솔 코에버 내부 프로그램 개발 | 2022.03. ~ 2023.09. | 중소기업기술정보진흥원 |
| 진료기록을 통한 체질 관리 시스템 | 2022.06. ~ 2022.10. | 한국데이터산업진흥원 |
| AI 종합 플랫폼 개발 | 2024.07. ~ 2025.03. | 한국산업기술진흥원 |

---

## 주요 역량 및 경험

### 핵심 역량 맵

```mermaid
mindmap
  root((권순룡<br/>AI Engineer<br/>5년 경력))
    Agentic AI
      Multi-Agent Workflow
        8개 Sub-Agent 협업
        Master Orchestrator
        Phase 0~5 자동화
      Claude Sub-Agent
        FMEA 자동화 시스템
        Virtual Company Creation
      Dual-Tier AI
        비용 절감 87%
        RAG 시스템
    ML/DL 모델링
      베이지안 네트워크
        이상탐지율 93.7%
        확률 최적화
      품질 예측
        사출/도정/금형
        불량률 감소
      시계열 분석
        전력 데이터 예측
        8단계 파이프라인
    데이터 분석
      Data Wrangling
        정형/비정형 통합
      Pre-processing
        EDA
        상관관계 분석
      인과관계 분석
        피쉬본 다이어그램
        Knowledge Framework
    Cloud Platform
      Microservices
        5층 아키텍처
        Neo4j 그래프DB
      End-to-End
        설계→개발→검증→납품
        GS 인증 1등급
      상용화
        세아특수강/포미아 납품
        컨설팅 수행
```

---

### 1. Agentic AI 전문성

Claude Sub-Agent 기반 Multi-Agent Workflow를 구축하여 FMEA 자동화 시스템을 개발하였습니다. 8개 독립 Sub-Agent 협업 구조를 설계하고 Master Orchestrator를 구현하여 Phase 0~5 자동화 워크플로우를 완전 구현하였습니다. 각 Sub-Agent는 전문 영역(R&D, Mfg, QA)을 담당하는 구조로, 코딩 에이전트의 역설계 시스템 구조를 적용하여 복잡한 FMEA 프로세스를 체계적으로 자동화하였습니다. 또한 AI 에이전트로만 구성된 가상 기업 생성 시스템을 설계하여 Dual-Tier AI 아키텍처를 통해 최대 87% 비용 절감을 달성하였습니다. 2025.12 KSFM 학술대회에서 "분석 상관/확률 네트워크 최적 경로 정보 및 공정 관리 문서 기반 FMEA 생성 연구" 논문을 발표하여 Agentic AI/LLM 관련 학술 연구 성과를 인정받았습니다.

**주요 프로젝트**:
- **FMEA 자동화 생성 시스템** (2025.6 ~ 진행중): Claude Sub-Agent 기반 Multi-Agent Workflow 구축, 8개 독립 Sub-Agent 협업 구조 설계 및 구현, Master Orchestrator 설계
- **Virtual Company Creation Agent** (2026.1.4 ~ 진행중): AI 에이전트로만 구성된 가상 기업 생성 시스템, Claude Agent 기반 Dual-Tier AI 아키텍처, Vector DB 기반 RAG 시스템 구축
- **프롬프트 평가 엔진 (AI Gatekeeper)** (2025.6 ~ 진행중): 25개+ 프롬프트 전수 평가 시스템, 이중 검증(Double-Check) 시스템으로 환각 방지

**FMEA 자동화 시스템 아키텍처**:

```mermaid
graph TB
    subgraph "Master Orchestrator"
        MO[Master Orchestrator<br/>Phase 0~5 관리]
    end
    
    subgraph "Sub-Agent 팀 (8개)"
        RND[R&D Agent<br/>연구개발 분석]
        MFG[Mfg Agent<br/>제조 공정 분석]
        QA[QA Agent<br/>품질 검증]
        DOC[Document Agent<br/>문서 생성]
        VAL[Validation Agent<br/>논리 검증]
        OPT[Optimization Agent<br/>최적화]
        VIZ[Visualization Agent<br/>시각화]
        INT[Integration Agent<br/>통합 관리]
    end
    
    MO -->|Phase 0: 초기화| RND
    MO -->|Phase 1: 분석| MFG
    MO -->|Phase 2: 검증| QA
    MO -->|Phase 3: 문서화| DOC
    MO -->|Phase 4: 최적화| OPT
    MO -->|Phase 5: 통합| INT
    
    RND --> VAL
    MFG --> VAL
    QA --> VAL
    VAL --> DOC
    DOC --> VIZ
    OPT --> INT
    VIZ --> INT
    
    INT -->|최종 FMEA 문서| OUTPUT[FMEA 자동 생성 문서]
    
    style MO fill:#3498db,color:#fff
    style OUTPUT fill:#27ae60,color:#fff
```

---

### 2. ML/DL 모델링 역량

베이지안 네트워크 기반 이상 탐지 모델을 개발하여 이상탐지율 93.7%를 달성하였습니다. 확률 최적화(경사하강법) 기반 모델 학습을 수행하고, Tabular Data 기반 ML/DL 예측 모델링을 통해 다수 업체(사출, 도정, 금형 등)의 품질 예측 AI 엔진을 개발 및 고도화하여 불량률 감소 성과를 달성하였습니다. 정형/비정형 데이터 통계적 분석 기반으로 insight를 도출하고, 비즈니스 모델을 설계하는 경험이 있습니다.

**주요 프로젝트**:
- **AMS (Analysis Management System)** (2024.07~2025.12): 베이지안 네트워크 기반 이상 탐지 모델 개발, 이상탐지율 93.7% 달성, GS 인증 1등급 취득, 세아특수강과 포미아에 정식 납품
- **품질 예측 AI 엔진** (2021~2023): 다수 업체(사출, 도정, 금형 등) 품질 예측 AI 엔진 개발 및 고도화, 불량률 감소 성과 달성
- **전력 데이터 예측** (2021.04~2021.11): 사출 업체 전력 데이터 예측 AI 엔진 개발, PLC 변화 기반 패턴 분석

**AMS 베이지안 네트워크 구조**:

```mermaid
graph LR
    subgraph "입력 데이터"
        D1[공정 변수 1]
        D2[공정 변수 2]
        D3[공정 변수 3]
        D4[공정 변수 N]
    end
    
    subgraph "베이지안 네트워크"
        BN[베이지안 네트워크<br/>확률 최적화<br/>경사하강법]
    end
    
    subgraph "출력"
        ANOMALY[이상 탐지<br/>93.7% 정확도]
        DIAGRAM[인과관계 다이어그램<br/>피쉬본 구조]
        INSIGHT[인사이트 도출<br/>Customer Knowledge Framework]
    end
    
    D1 --> BN
    D2 --> BN
    D3 --> BN
    D4 --> BN
    
    BN --> ANOMALY
    BN --> DIAGRAM
    BN --> INSIGHT
    
    style BN fill:#9b59b6,color:#fff
    style ANOMALY fill:#e74c3c,color:#fff
    style DIAGRAM fill:#f39c12,color:#fff
    style INSIGHT fill:#27ae60,color:#fff
```

---

### 3. 데이터 분석 및 플랫폼 개발

8단계 시계열 데이터 파이프라인을 설계 및 구축하여 데이터 전처리부터 모델 학습, 예측, 결과 시각화까지 전 과정을 자동화하였습니다. 5층 아키텍처, Microservices 기반 데이터 파이프라인을 구축하고, Neo4j 그래프DB를 활용한 데이터 통합 시스템을 설계하였습니다. 총괄 PM으로 설계부터 개발, 검증, 납품까지 전 과정을 관리하여 GS 인증 1등급을 취득하고 세아특수강과 포미아에 정식 납품하였습니다.

**주요 프로젝트**:
- **CoCTK (Consulting Tool Kit)** (2022.03~2024): 데이터 전처리, 상관관계 분석, 비용 최적화 엔진 개발, GS 인증 1등급 취득 (2024)
- **DPS (데이터수집시스템)** (2021~2024): 5층 아키텍처, Microservices 기반 데이터 파이프라인 구축, Neo4j 그래프DB를 활용한 데이터 통합 시스템 설계, 세아특수강과 포미아에 정식 납품
- **오웰(일본)社 자동차 도정 공정** (2023.12~2025.03): 자동차 도정 공정 데이터 기반 인과 관계 다이어그램 AI 엔진 개발, 패턴 최적 선택(정보량)과 계층 클러스터링 종합한 관계구조 생성

**5층 데이터 파이프라인 아키텍처**:

```mermaid
graph TB
    subgraph "Layer 1: 데이터 수집"
        L1[데이터 수집 계층<br/>PLC, 센서, DB]
    end
    
    subgraph "Layer 2: 데이터 전처리"
        L2[Data Wrangling<br/>Pre-processing<br/>EDA]
    end
    
    subgraph "Layer 3: 데이터 저장"
        L3[Neo4j 그래프DB<br/>PostgreSQL<br/>Vector DB]
    end
    
    subgraph "Layer 4: 분석 및 모델링"
        L4[베이지안 네트워크<br/>ML/DL 모델<br/>8단계 파이프라인]
    end
    
    subgraph "Layer 5: 시각화 및 서비스"
        L5[결과 시각화<br/>API 서비스<br/>대시보드]
    end
    
    L1 -->|원시 데이터| L2
    L2 -->|정제된 데이터| L3
    L3 -->|저장된 데이터| L4
    L4 -->|분석 결과| L5
    
    style L1 fill:#3498db,color:#fff
    style L2 fill:#2ecc71,color:#fff
    style L3 fill:#9b59b6,color:#fff
    style L4 fill:#e74c3c,color:#fff
    style L5 fill:#f39c12,color:#fff
```

---

### 4. 가상 센서 및 제어 최적화

압축 사출 업체 고가센서 대체 가상센서를 설계 및 구축하고, 클린룸 송풍기 최적 제어 프로젝트에서 AI 엔진 개발 PM을 수행하며 논문을 발표하였습니다.

**주요 프로젝트**:
- **고가센서 대체 가상센서** (2021.05~2021.10): 압축 사출 업체 고가센서 대체 가상센서 설계 및 구축, 인증 완료, 비용 절감
- **클린룸 송풍기 제어** (2021.04~2021.10): 송풍기 최적 제어, 에너지 소비 패턴 분석, 효율 20% 향상, 논문 발표 (2023)

---

### 5. Cloud Platform & End-to-End 프로젝트

Cloud platform 환경에서 모델 설계부터 운영까지 End-to-End 프로젝트 참여 경험을 보유하고 있습니다. Microservices 기반 데이터 파이프라인을 구축하고, Dual-Tier AI 아키텍처를 통해 최대 87% 비용 절감을 달성하였습니다.

**주요 프로젝트**:
- **AMS (Analysis Management System)**: 총괄 PM으로 설계부터 개발, 검증, 납품까지 전 과정 관리
- **DPS (데이터수집시스템)**: 5층 아키텍처, Microservices 기반 데이터 파이프라인 구축
- **Virtual Company Creation Agent**: Dual-Tier AI 아키텍처를 통해 최대 87% 비용 절감 달성

---

### 6. 상용화 경험

GS 인증 1등급 2개를 취득하였으며(CoCTK, AMS-PDS), 세아특수강과 포미아에 정식 납품하고 테크웰/신성오토텍 AMS 컨설팅을 수행하여 모델을 대고객 서비스로 상용화한 경험과 상용화된 모델 개선 경험을 보유하고 있습니다.

**주요 성과**:
- **GS 인증 1등급 2개**: CoCTK (2024), AMS-PDS (2025)
- **정식 납품 3곳**: 세아특수강, 포미아, 일본 글로벌 기업
- **컨설팅 수행**: 테크웰/신성오토텍 AMS 컨설팅

---

## 기술 스택

### 기술 스택 맵

```mermaid
mindmap
  root((기술 스택<br/>5년 경력))
    Programming
      Python
        5년 경력
        AI 엔진 개발
        데이터 분석
        ML/DL
        백엔드 개발
        MCP 서버
      SQL
        5년 경력
        데이터베이스 쿼리
        Neo4j Cypher
    AI/ML
      Agentic AI
        Claude Sub-Agent
        Multi-Agent Workflow
        Master Orchestrator
        8개 Sub-Agent
      LLM
        Claude Agent
        LLM API
        Vector DB RAG
      ML/DL
        베이지안 네트워크
        이상 탐지
        품질 예측
        시계열 분석
        확률 최적화
    Data Engineering
      파이프라인
        5층 아키텍처
        8단계 시계열
        Microservices
      데이터베이스
        Neo4j 그래프DB
        PostgreSQL
        Vector DB
      데이터 분석
        Data Wrangling
        Pre-processing
        EDA
        상관관계 분석
    Cloud & Infrastructure
      Cloud Platform
        Microservices
        데이터 파이프라인
        Dual-Tier AI
      End-to-End
        설계→개발→검증→납품
        GS 인증
        상용화
```

### Programming Languages
- **Python**: 5년 (AI 엔진 개발, 데이터 분석, ML/DL, 백엔드 개발, MCP 서버 개발)
- **SQL**: 5년 (데이터베이스 쿼리, 데이터 분석, Neo4j Cypher)

### AI/ML Technologies
- **Agentic AI**: Claude Sub-Agent, Multi-Agent Workflow, Master Orchestrator, 8개 Sub-Agent 협업 구조
- **LLM**: Claude Agent, LLM API 활용, Vector DB 기반 RAG 시스템
- **ML/DL**: 베이지안 네트워크, 이상 탐지, 품질 예측, 시계열 분석, 확률 최적화(경사하강법)

### Data Engineering
- **데이터 파이프라인**: 5층 아키텍처, 8단계 시계열 데이터 파이프라인, Microservices
- **데이터베이스**: Neo4j (그래프DB), PostgreSQL, Vector DB
- **데이터 분석**: Data Wrangling, Pre-processing, EDA, 상관관계 분석

### Cloud & Infrastructure
- **Cloud Platform**: Microservices 기반 데이터 파이프라인, Dual-Tier AI 아키텍처
- **End-to-End**: 설계부터 운영까지 전 과정 관리 경험

---

## 핵심 성과

### 성과 대시보드

```mermaid
graph LR
    subgraph "인증 및 납품"
        GS[GS 인증 1등급<br/>2개<br/>CoCTK, AMS-PDS]
        DELIVERY[정식 납품<br/>3곳<br/>세아특수강, 포미아, 일본]
    end
    
    subgraph "학술 성과"
        PAPER[논문 발표<br/>9편<br/>2020-2025]
    end
    
    subgraph "기술 성과"
        ACCURACY[이상탐지율<br/>93.7%<br/>실질 정확도 60-70%]
        COST[비용 절감<br/>87%<br/>Dual-Tier AI]
        AGENT[Multi-Agent<br/>8개 Sub-Agent<br/>협업 구조]
    end
    
    style GS fill:#3498db,color:#fff
    style DELIVERY fill:#2ecc71,color:#fff
    style PAPER fill:#9b59b6,color:#fff
    style ACCURACY fill:#e74c3c,color:#fff
    style COST fill:#f39c12,color:#fff
    style AGENT fill:#1abc9c,color:#fff
```

### 상세 성과
- **GS 인증 1등급 2개**: CoCTK (2024), AMS-PDS (2025)
- **정식 납품 3곳**: 세아특수강, 포미아, 일본 글로벌 기업
- **논문 9편**: 2020-2025년 발표
- **이상탐지율 93.7%**: 실질적 정확도 60~70% (데이터 한계 고려)
- **비용 절감 87%**: Dual-Tier AI 아키텍처
- **Multi-Agent 8개**: Sub-Agent 협업 구조

---

## 학술 성과

| 발행일 | 논문 제목 | 학술지/학회 |
|:---|:---|:---|
| 2025.12 | 분석 상관/확률 네트워크 최적 경로 정보 및 공정 관리 문서 기반 FMEA 생성 연구 | KSFM 2025년도 동계학술대회 |
| 2025.06 | AI를 활용한 구조와 룰을 활용한 구조-확률 종합 네트워크 및 최적 관리 방안 도출 | 한국유체기계학회 |
| 2024.12 | 공장 운영 핵심 요소의 식별 및 최적화를 위한 클러스터링 기법 적용 | 한국생산제조학회 |
| 2024.12 | 설비 이상상태 기반 최적 공정 데이터 추론 및 위험/안전 관리 최적 자동화 | 한국유체기계학회 |
| 2024.07 | 전력 데이터를 통한 설비 상태 추론 및 이상 상황 설정 예측 | 한국유체기계학회 |
| 2023.12 | 송풍 설비 변동부하 대응 전력품질 분석 및 에너지 절감 연구 | 한국유체기계학회 |
| 2023.12 | 압축기 공정에서 데이터 밸런스 문제 해결 및 품질 결과 사전 예측을 위한 AI 시스템 | 한국유체기계학회 |
| 2023.07 | 생산공정 에너지 및 설비 상태 진단을 위한 AI기반의 전력 사용 패턴 및 SOH분석 | 한국유체기계학회 |
| 2022.12 | 자동차 부품 생산 산업을 위한 머신러닝 기반의 품질예측 알고리즘 | 한국생산제조학회 |
| 2022.06 | ICT 융복합 기술을 활용한 스마트 공장 및 에너지 절감 솔루션 적용 사례 | 한국유체기계학회 |

---

## 현대카드 지원 동기 및 기여 방안

### 경험과 역량의 연결

```mermaid
graph TB
    subgraph "제조 현장 경험"
        EXP1[FMEA 자동화<br/>Multi-Agent Workflow]
        EXP2[AMS<br/>베이지안 네트워크<br/>Knowledge Framework]
        EXP3[데이터 파이프라인<br/>5층 아키텍처<br/>End-to-End]
    end
    
    subgraph "현대카드 기여 방안"
        CONT1[초개인화 서비스<br/>Agentic AI 기반<br/>Multi-Agent 시스템]
        CONT2[Customer Knowledge<br/>Framework<br/>인과관계 분석]
        CONT3[실시간 인사이트<br/>데이터 파이프라인<br/>MLOps]
    end
    
    EXP1 -->|Multi-Agent 경험| CONT1
    EXP2 -->|Knowledge Framework| CONT2
    EXP3 -->|파이프라인 구축| CONT3
    
    style EXP1 fill:#3498db,color:#fff
    style EXP2 fill:#2ecc71,color:#fff
    style EXP3 fill:#9b59b6,color:#fff
    style CONT1 fill:#e74c3c,color:#fff
    style CONT2 fill:#f39c12,color:#fff
    style CONT3 fill:#1abc9c,color:#fff
```

5년간 제조 데이터 파이프라인을 구축하며 "데이터를 정보로, 정보를 지식으로" 전환하는 과정에서 Agentic AI와 ML/DL 모델링의 핵심 역량을 체득하였습니다. 특히 FMEA 자동화 시스템에서 Claude Sub-Agent 기반 Multi-Agent Workflow를 구축하고, AMS 프로젝트에서 베이지안 네트워크 기반 이상 탐지 모델을 개발하여 GS 인증 1등급을 취득하고 세아특수강과 포미아에 정식 납품한 경험이 있습니다.

현대카드 Data Science 팀에서 고객 Knowledge Framework를 개발하고 Agentic AI 기반 초개인화 서비스를 구축하는 업무에 제가 경험한 Multi-Agent 시스템 설계, ML/DL 예측 모델링, 데이터 파이프라인 구축 역량이 직접 기여할 수 있다고 생각합니다. 특히 고객 소비 데이터를 기반으로 한 Knowledge Framework 개발과 실시간 인사이트 제공 서비스는 제가 AMS에서 구축한 베이지안 네트워크 기반 확률 분석 및 피쉬본 다이어그램 자동 생성 기술과 직접적으로 연결되며, Agentic AI 기반 초개인화 서비스는 제가 FMEA 자동화와 Virtual Company Creation Agent에서 구축한 Multi-Agent Workflow 경험을 활용할 수 있습니다.

---

## 핵심 철학

> **"모델보다 데이터, 데이터보다 정보, 지식구조를 정리하는 현장친화적 연구원"**

5년간의 현장 경험을 통해 데이터를 정보로 전환하고, 정보를 지식 구조로 체계화하는 전문성을 갖춘 연구원입니다. 단순한 모델 개발을 넘어, 현장의 실제 문제를 해결하고 지식 기반 시스템을 구축하는 데 집중합니다.

---

© 2026 권순룡. All Rights Reserved.
