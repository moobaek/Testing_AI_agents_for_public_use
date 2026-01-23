# 포트폴리오 관계 맵 (Portfolio Relationship Map)

**문서 ID**: `page.portfolio.relationship_map`

> [!INFO] 이 문서의 목적
> 13개 프로젝트, 9편 논문, 9단계 실행 가이드, 그리고 실증 사례 간의 관계를 시각화하여 전체 포트폴리오의 구조를 한눈에 파악할 수 있도록 합니다.

---

## 🗺️ 전체 온톨로지 구조

```mermaid
graph TB
    subgraph "Governance & Quality Assurance Layer"
        EVAL["Evaluation Framework<br/>(System-wide Validator)"]
        PROMPT["Prompt Eval Engine<br/>(AI Gatekeeper)"]
        PM["PM Agent<br/>(Execution Manager)"]
        SAFE["Continuity & Safety<br/>(Risk Check + Context Restore)"]
    end

    subgraph "9단계 실행 가이드"
        S1 --> S2 --> S3 --> S4 --> S5
        S5 --> S6 --> S7 --> S8 --> S9
    end
    
    subgraph "핵심 프로젝트 (Implementation)"
        AMS["AMS: 이상 탐지"]
        DPS["DPS: AI 플랫폼"]
        CoCTK["CoCTK: 데이터 분석"]
        SENSOR["스마트센서 3종"]
        ENERGY["에너지 최적화"]
    end
    
    subgraph "학술 검증"
        P1["피쉬본 자동화 논문"]
        P2["에너지 효율 논문"]
        P3["데이터 분석 논문"]
    end
    
    subgraph "실증 사례 (2025년)"
        T1["세아특수강<br/>2025년"]
        T2["포미아<br/>2025년"]
        T3["일본 글로벌 기업"]
    end
    
    %% Governance Relations - The Overseers
    EVAL == "Validates All" ==> AMS & DPS & CoCTK & SENSOR & ENERGY
    PROMPT == "Optimizes Inputs" ==> S1 & S4
    PM == "Manages Lifecycle" ==> S1 & S6 & S8
    SAFE == "Ensures Safety" ==> AMS & DPS & CoCTK
    
    %% Standard Project Relations
    S1 -. "implements" .-> AMS
    S1 -. "implements" .-> DPS
    S3 -. "implements" .-> SENSOR
    S4 -. "implements" .-> CoCTK
    S5 -. "implements" .-> ENERGY
    
    AMS -. "validates" .-> P1
    ENERGY -. "validates" .-> P2
    CoCTK -. "validates" .-> P3
    
    AMS -. "proves" .-> T1
    DPS -. "proves" .-> T2
    SENSOR -. "proves" .-> T3
    
    style EVAL fill:#ffcdd2,stroke:#d32f2f,stroke-width:3px
    style PROMPT fill:#e1bee7,stroke:#7b1fa2,stroke-width:3px
    style PM fill:#bbdefb,stroke:#1976d2,stroke-width:3px
    style SAFE fill:#c8e6c9,stroke:#388e3c,stroke-width:3px
```

---

## 🔗 프로젝트별 상세 관계

### 🧬 AMS 기술 진화 계보 (Technology Lineage)

> [!NOTE] **인터뷰 기반 기술 진화 스토리**
> 2020년 O-WELL(일본) 프로젝트에서 시작된 알고리즘이 4년간 진화하여 AMS의 핵심 엔진이 되었고, 동시에 각 프로젝트의 경험이 LLM 에이전트 설계의 토대가 되었습니다.

```mermaid
graph TD
    subgraph "🇯🇵 기원 (2020-2024)"
        OWELL["O-WELL Japan<br/>AMS Origin<br/>4년간 총괄 PM"]
    end
    
    subgraph "🔬 기술 진화 (2020-2023)"
        HC["계층적 클러스터링<br/>Hierarchical Clustering<br/>하드코딩 한계 극복"]
        PV["패턴 민주주의<br/>Pattern Voting<br/>앙상블 기법"]
        SWC["SWC<br/>Sliding Window Correlation<br/>❌ 패턴 분석과 중복으로 제외"]
    end
    
    subgraph "📦 솔루션 결실 (2024-2025)"
        AMS["AMS<br/>이상탐지 시스템<br/>GS 1등급"]
        COCTK["CoCTK<br/>컨설팅 툴킷<br/>GS 1등급"]
    end
    
    OWELL --> HC
    HC --> PV
    SWC -.->|"기능 중복"| PV
    PV --> AMS
    OWELL --> COCTK
    
    style OWELL fill:#fff3e0,stroke:#ff9800,stroke-width:3px
    style AMS fill:#e8f5e9,stroke:#4caf50,stroke-width:3px
    style COCTK fill:#e3f2fd,stroke:#2196f3,stroke-width:3px
    style SWC fill:#ffebee,stroke:#f44336,stroke-dasharray: 5 5
```

**핵심 인사이트:**
- **O-WELL Japan (2020-2024)**: 초기 백엔드 개발 → 풀스택 개발 및 총괄 PM으로 확장
- **계층적 클러스터링**: 데이터 심도에 따른 가지치기로 하드코딩 한계 극복
- **패턴 민주주의(Pattern Voting)**: 패턴별 피쉬본 생성 후 투표로 종합하는 앙상블 기법
- **SWC 제외**: 초기 도입했으나 패턴 분석과 기능 중복으로 최적화 과정에서 제거

---

### 🤖 LLM 에이전트 설계 토대 관계

> [!NOTE] **프로젝트 경험 → LLM 에이전트 설계**
> 각 프로젝트에서 쌓은 경험이 LLM 에이전트 설계의 토대가 되었습니다.

```mermaid
graph TD
    subgraph "프로젝트 경험"
        CoaAITI["코아아이티<br/>Python+Qt 풀스택<br/>BERT 실험<br/>한약재 검색 시스템"]
        Techwell["테크웰/신성오토텍<br/>FMEA 문서화<br/>고객 인터뷰<br/>전력/사출 데이터 분석"]
        PM_Exp["다수 PM 경험<br/>제안서~완료<br/>외주 관리<br/>포미아 DX 등"]
        Doc_Exp["문서 작성 경험<br/>사업계획서<br/>착수보고서<br/>감리 문서"]
        Seah_Data["세아특수강<br/>데이터 통합<br/>POP/SPC<br/>RS232C-LAN 변환"]
        Ripaco_Exp["리파코<br/>시간 구간 분석<br/>룰 기반 탐지<br/>박스 이송 로봇"]
        CoCTK_AMS["CoCTK/AMS<br/>모듈화 체계화<br/>평가 시스템<br/>GS 인증 경험"]
        Dev_Plan["Original Development Plan<br/>PM 활동<br/>문서/개발 관리<br/>298개+ 설계 문서"]
    end
    
    subgraph "LLM 에이전트"
        Agent_Design["AI Agent<br/>설계 기초<br/>풀스택 개발 경험"]
        FMEA_Agent["FMEA 자동화<br/>에이전트<br/>8개 Sub-Agent 협업"]
        PM_Agent["PM Agent<br/>사업 관리<br/>Risk/Schedule/Integrity"]
        Doc_Generator["Business Document<br/>Generator<br/>사업계획서 자동 생성"]
        Factory_Ontology["Factory Ontology<br/>Manager<br/>공정 문서 파싱"]
        Pattern_Agent["패턴 분석<br/>에이전트<br/>시간 구간 클러스터링"]
        Eval_Agent["Evaluation Framework<br/>프롬프트 평가<br/>49개 모듈 전수 검사"]
        System_Design["전체 에이전트<br/>시스템 설계<br/>워크플로우 오케스트레이션"]
    end
    
    CoaAITI --> Agent_Design
    Techwell --> FMEA_Agent
    PM_Exp --> PM_Agent
    Doc_Exp --> Doc_Generator
    Seah_Data --> Factory_Ontology
    Ripaco_Exp --> Pattern_Agent
    CoCTK_AMS --> Eval_Agent
    Dev_Plan --> System_Design
    
    style CoaAITI fill:#fff3e0,stroke:#ff9800
    style Techwell fill:#e3f2fd,stroke:#2196f3
    style PM_Exp fill:#e8f5e9,stroke:#4caf50
    style Agent_Design fill:#fce4ec,stroke:#e91e63,stroke-width:2px
    style FMEA_Agent fill:#fce4ec,stroke:#e91e63,stroke-width:2px
    style PM_Agent fill:#fce4ec,stroke:#e91e63,stroke-width:2px
```

**핵심 인사이트:**
- **코아아이티**: Python+Qt 풀스택 개발 및 BERT 실험 경험을 쌓아 AI Agent 설계 및 개발의 기초가 됨
- **테크웰/신성오토텍**: FMEA 문서화 및 고객 인터뷰 경험을 쌓아 FMEA 자동화 에이전트 설계의 토대 마련 → [[02_Projects_Overview#022-fmea-자동화-에이전트-진화-스토리-난해한-기술을-현장이-이해하는-언어로|FMEA 자동화 에이전트 진화 스토리]]
- **다수 PM 경험**: 제안서 작성, 외주 관리, 완료서 작성 등 PM 경험을 통해 PM Agent 설계의 토대 마련
- **문서 작성 경험**: 사업계획서, 제안서, 착수보고서, 감리 문서 작성 경험을 통해 Business Document Generator 설계의 토대 마련 → [[02_Projects_Overview#025-business-document-generator-진화-스토리-사업계획서를-하도-만들다-보니-만든-자동화-시스템|Business Document Generator 진화 스토리]]
- **세아특수강**: 데이터 통합, POP/SPC 개발 경험을 쌓아 Factory Ontology Manager AI Agent 설계의 토대 마련 → [[02_Projects_Overview#023-factory-ontology-manager-ai-agent-진화-스토리-5년간의-비전과-현실의-만남|Factory Ontology Manager 진화 스토리]]
- **리파코**: 시간 구간 분석 및 룰 기반 탐지 경험을 쌓아 패턴 분석 에이전트 설계의 토대 마련
- **CoCTK/AMS**: 모듈화 및 체계화 경험, GS 인증 프로세스 경험을 쌓아 Evaluation Framework와 프롬프트 평가 엔진 설계의 토대 마련
- **Original Development Plan**: 다수 PM 경험(제안서~완료, 외주 관리)을 통해 전체 에이전트 시스템 설계의 토대 마련 → [[02_Projects_Overview#021-코딩-에이전트-진화-스토리-외주-개발자-관리의-한계를-넘어서|코딩 에이전트 진화 스토리]]

---

### 🤖 AI Agent 진화 스토리 흐름

> [!NOTE] 스토리텔링 접근
> 각 프로젝트에서 겪은 실제 문제와 해결 과정이 AI Agent 개발로 이어지는 자연스러운 진화 흐름을 보여줍니다. 상세한 스토리는 [[02_Projects_Overview#02-llm-에이전트-설계-토대-관계|02_Projects_Overview.md의 LLM 에이전트 설계 토대 관계 섹션]]을 참조하세요.

```mermaid
graph LR
    subgraph "프로젝트 경험"
        Dev_Plan_Exp["Original Development Plan<br/>외주 개발자 관리<br/>산출물 관리 부재<br/>프론트엔드 한계"]
        Techwell_Exp["테크웰/신성오토텍<br/>FBS 난해함<br/>패턴 추천 복잡<br/>확률 네트워크 추상"]
        Seah_Exp["세아특수강<br/>2020년 비전<br/>2025년 니즈<br/>OEM/ODM 대응"]
        DPS_Exp["DPS<br/>LLM 온톨로지 이해 부족<br/>벡터 부족<br/>리소스 소모"]
        Doc_Exp_Detail["문서 작성 경험<br/>2023년부터<br/>AI 쪽 사업계획 전담<br/>끝없는 문서 작성"]
    end
    
    subgraph "문제 발견"
        Problem1["외주 개발자<br/>산출물 관리 부재"]
        Problem2["기술과 현장<br/>언어 불일치"]
        Problem3["5년간의 비전<br/>+ 현실적 니즈"]
        Problem4["LLM의 한계<br/>온톨로지/벡터 부족"]
        Problem5["끝없는<br/>문서 작성"]
    end
    
    subgraph "해결 시도"
        Solution1["코딩 에이전트<br/>ID 기반 온톨로지<br/>Phase 0-13 워크플로우"]
        Solution2["FMEA 형식<br/>도메인별 용어<br/>8개 Sub-Agent"]
        Solution3["자연어 파싱<br/>DB Grounding<br/>Ontology Mapping"]
        Solution4["GFS 특화 중간 DB<br/>Dual-Tier AI<br/>기업 풀 정보"]
        Solution5["자동 생성 시스템<br/>포트폴리오 매칭<br/>페르소나 적용"]
    end
    
    subgraph "AI Agent 진화"
        Coding_Agent["코딩 에이전트<br/>Original Development Plan"]
        FMEA_Agent_Story["FMEA 자동화<br/>에이전트"]
        Factory_Ontology_Story["Factory Ontology<br/>Manager"]
        Virtual_Company_Story["Virtual Company<br/>Creation Agent<br/>& AI_DB_tester"]
        Doc_Generator_Story["Business Document<br/>Generator"]
    end
    
    Dev_Plan_Exp --> Problem1
    Techwell_Exp --> Problem2
    Seah_Exp --> Problem3
    DPS_Exp --> Problem4
    Doc_Exp_Detail --> Problem5
    
    Problem1 --> Solution1
    Problem2 --> Solution2
    Problem3 --> Solution3
    Problem4 --> Solution4
    Problem5 --> Solution5
    
    Solution1 --> Coding_Agent
    Solution2 --> FMEA_Agent_Story
    Solution3 --> Factory_Ontology_Story
    Solution4 --> Virtual_Company_Story
    Solution5 --> Doc_Generator_Story
    
    style Problem1 fill:#ffebee,stroke:#f44336
    style Problem2 fill:#ffebee,stroke:#f44336
    style Problem3 fill:#ffebee,stroke:#f44336
    style Problem4 fill:#ffebee,stroke:#f44336
    style Problem5 fill:#ffebee,stroke:#f44336
    style Solution1 fill:#fff3e0,stroke:#ff9800
    style Solution2 fill:#fff3e0,stroke:#ff9800
    style Solution3 fill:#fff3e0,stroke:#ff9800
    style Solution4 fill:#fff3e0,stroke:#ff9800
    style Solution5 fill:#fff3e0,stroke:#ff9800
    style Coding_Agent fill:#e1f5ff,stroke:#2196f3,stroke-width:2px
    style FMEA_Agent_Story fill:#e1f5ff,stroke:#2196f3,stroke-width:2px
    style Factory_Ontology_Story fill:#e1f5ff,stroke:#2196f3,stroke-width:2px
    style Virtual_Company_Story fill:#e1f5ff,stroke:#2196f3,stroke-width:2px
    style Doc_Generator_Story fill:#e1f5ff,stroke:#2196f3,stroke-width:2px
```

**스토리텔링 섹션 링크:**
- [[02_Projects_Overview#021-코딩-에이전트-진화-스토리-외주-개발자-관리의-한계를-넘어서|0.2.1 코딩 에이전트 진화 스토리]]: 외주 개발자 관리의 한계를 넘어서
- [[02_Projects_Overview#022-fmea-자동화-에이전트-진화-스토리-난해한-기술을-현장이-이해하는-언어로|0.2.2 FMEA 자동화 에이전트 진화 스토리]]: 난해한 기술을 현장이 이해하는 언어로
- [[02_Projects_Overview#023-factory-ontology-manager-ai-agent-진화-스토리-5년간의-비전과-현실의-만남|0.2.3 Factory Ontology Manager AI Agent 진화 스토리]]: 5년간의 비전과 현실의 만남
- [[02_Projects_Overview#024-virtual-company-creation-agent--ai_db_tester-vacts-진화-스토리-llm을-서포트하기-위한-특화-중간-db|0.2.4 Virtual Company Creation Agent & AI_DB_tester (VACTS) 진화 스토리]]: LLM을 서포트하기 위한 특화 중간 DB
- [[02_Projects_Overview#025-business-document-generator-진화-스토리-사업계획서를-하도-만들다-보니-만든-자동화-시스템|0.2.5 Business Document Generator 진화 스토리]]: 사업계획서를 하도 만들다 보니 만든 자동화 시스템

---

### 📊 주요 기술 기여도 매트릭스

| 프로젝트 | AMS 모듈 기여 | LLM 에이전트 토대 |
|:---|:---|:---|
| **O-WELL Japan** | FBS 모듈 (피쉬본 개념, 중요도 앙상블) | - |
| **FBS** | FBS 모듈 (계층 구조, 중요도 소팅) | - |
| **에너지 패턴 분석** | Pattern 모듈 (계층적 클러스터링, 패턴 민주주의) | - |
| **EEMS** | RMS 모듈 (룰 생성 기법) | - |
| **클린룸 에너지 최적화** | RMS 모듈 (AI RMS 뿌리) | - |
| **리파코** | Pattern 모듈 (시간 구간 클러스터링) | 리파코에서 시간 구간 분석 및 룰 기반 탐지 경험을 쌓아 패턴 분석 에이전트 설계의 토대 마련 |
| **CoCTK** | AMS Core (모듈화/체계화) | CoCTK에서 모듈화·체계화 경험을 쌓아 Evaluation Framework 설계의 토대 마련 |
| **코아아이티** | - | 코아아이티에서 Python+Qt 풀스택 개발 및 BERT 실험 경험을 쌓아 AI Agent 설계 및 개발의 기초가 됨 |
| **테크웰/신성오토텍** | FMEA 모듈 (문서화 경험) | 테크웰/신성오토텍에서 FMEA 문서화 및 고객 인터뷰 경험을 쌓아 FMEA 자동화 에이전트 설계의 토대 마련 |
| **포미아 DX/세아특수강** | - | 포미아 DX에서 PM 경험, 세아특수강에서 데이터 통합 및 POP/SPC 개발 경험을 쌓아 Factory Ontology Manager와 PM Agent 설계의 토대 마련 |
| **다수 PM 경험** | - | 다수 PM 경험(제안서 작성, 외주 관리, 완료서 작성 등)을 통해 PM Agent 설계의 토대 마련 |
| **문서 작성 경험** | - | 다수 문서 작성 경험(사업계획서, 제안서, 착수보고서, 감리 문서 등)을 통해 Business Document Generator 설계의 토대 마련 |
| **Original Development Plan** | - | 다수 PM 경험(제안서~완료, 외주 관리)을 통해 전체 에이전트 시스템 설계의 토대 마련 |

---

### 1️⃣ AMS (Analysis Management System)

```mermaid
graph LR
    AMS["AMS 프로젝트"]
    
    subgraph "실행 단계"
        S1["Step 1: 설계 문서 시스템"]
        S4["Step 4: 25개 프롬프트 모듈화"]
        S5["Step 5: 파일 기반 I/O"]
    end
    
    subgraph "핵심 기술"
        T1["Python ML"]
        T2["Neo4j 그래프 DB"]
        T3["피쉬본 알고리즘"]
    end
    
    subgraph "학술 성과"
        P1["피쉬본 자동화 논문"]
        P2["이상 탐지 정확도 논문"]
    end
    
    subgraph "실증"
        C1["세아특수강 납품"]
        C2["이상 탐지율 93.7%"]
    end
    
    S1 --> AMS
    S4 --> AMS
    S5 --> AMS
    
    AMS --> T1
    AMS --> T2
    AMS --> T3
    
    AMS --> P1
    AMS --> P2
    
    AMS --> C1
    AMS --> C2
```

**관련 문서**:
- [[Phase_1_Foundation/Step_01_Repetitive_Work|Step 1: 반복 업무 식별]]
- [[Phase_1_Foundation/Step_04_Modularization|Step 4: 모듈화 전략]]
- [[02_Projects_Overview#AMS|AMS 프로젝트 개요]]
- [[04_Academic_Publications#피쉬본|피쉬본 다이어그램 자동화 논문]]
- [[Testing_Context#세아특수강|세아특수강 실증 사례]]

---

### 2️⃣ DPS (데이터수집시스템)

```mermaid
graph TB
    DPS[DPS 플랫폼]
    
    subgraph "아키텍처"
        L1[Layer 1: 데이터 수집]
        L2[Layer 2: 전처리]
        L3[Layer 3: AI 분석]
        L4[Layer 4: 지식 베이스]
        L5[Layer 5: 리포팅]
    end
    
    subgraph "실행 단계"
        S3[Step 3: 초소형 시작]
        S6[Step 6: 데일리 로그]
    end
    
    subgraph "실증"
        C1[포미아 납품]
        C2[5층 아키텍처 검증]
    end
    
    DPS --> L1 --> L2 --> L3 --> L4 --> L5
    
    S3 -. "implements" .-> DPS
    S6 -. "documents" .-> DPS
    
    DPS -. "proves" .-> C1
    DPS -. "proves" .-> C2
```

**관련 문서**:
- [[Architecture_Overview#DPS|DPS 5층 아키텍처]]
- [[Phase_1_Foundation/Step_03_Micro_Starts|Step 3: 초소형 단위 시작]]
- [[Testing_Context#포미아|포미아 실증 사례]]

---

### 3️⃣ 스마트센서 & IoT 생태계

```mermaid
graph LR
    subgraph "센서 제품군"
        S1[저비용 스마트센서 3종]
        S2[AI 복합 센서]
        S3[실시간 전력품질 분석]
    end
    
    subgraph "핵심 기술"
        T1[Edge AI]
        T2[Modbus 통신]
        T3[RS232C-LAN 변환]
    end
    
    subgraph "실행 단계"
        ST3[Step 3: 초소형 시작]
        ST5[Step 5: I/O 최적화]
    end
    
    subgraph "실증"
        C1[일본 도료기업 DX]
        C2[소규모 기업 보급]
    end
    
    S1 --> T1
    S2 --> T2
    S3 --> T3
    
    ST3 -.implements.-> S1
    ST5 -.implements.-> S2
    
    S1 -.proves.-> C1
    S2 -.proves.-> C2
```

**관련 문서**:
- [[02_Projects_Overview#센서|스마트센서 프로젝트]]
- [[Phase_1_Foundation/Step_03_Micro_Starts|Step 3: 초소형 단위 시작]]

---

## 📚 학술 논문 → 프로젝트 매핑

```mermaid
graph TD
    subgraph "2020-2025 학술 성과"
        P1[피쉬본 다이어그램 자동화]
        P2[에너지 효율 20% 향상]
        P3[상관성 분석 엔진]
        P4[디지털 트윈 안전]
        P5[클린룸 최적화]
    end
    
    subgraph "프로젝트 적용"
        AMS[AMS]
        ENERGY[에너지 최적화]
        CoCTK[CoCTK]
        DT[디지털 트윈]
        CR[클린룸 시스템]
    end
    
    P1 -.validates.-> AMS
    P2 -.validates.-> ENERGY
    P3 -.validates.-> CoCTK
    P4 -.validates.-> DT
    P5 -.validates.-> CR
    
    style P1 fill:#e8f5e9
    style AMS fill:#fff4e1
```

**관련 문서**:
- [[04_Academic_Publications|학술 논문 전체 목록]]

---

## 🏭 실증 사례 네트워크

```mermaid
graph TB
    subgraph "고객사"
        C1[세아특수강]
        C2[포미아]
        C3[일본 글로벌 기업]
    end
    
    subgraph "납품 솔루션"
        AMS[AMS]
        DPS[DPS]
        SENSOR[스마트센서]
    end
    
    subgraph "검증 성과"
        R1[이상 탐지 93.7%]
        R2[에너지 20% 절감]
        R3[전사 DX 구축]
    end
    
    C1 --> AMS --> R1
    C2 --> DPS --> R2
    C3 --> SENSOR --> R3
    
    style C1 fill:#fce4ec
    style AMS fill:#fff4e1
    style R1 fill:#e8f5e9
```

**관련 문서**:
- [[Testing_Context|실증 및 검증 사례 전체]]

---

## 🏭 스마트공장 및 컨설팅 프로젝트 상세 (2020-2026) - 29개

### 연도별 프로젝트 현황

| 연도 | 구축/컨설팅 수 | 주요 발주처 | 핵심 솔루션 |
|:---|:---:|:---|:---|
| **2020** | 3 | O-WELL(일본), 에스에이치, 에이치피엔씨 | **AMS Origin**, FBS |
| **2021** | 7 | 한중엔시에스, 알티스트, 대성금형 등 | AI 백엔드, FBS |
| **2022** | 6 | 롯데알루미늄, 송월타올, 이튼 등 | SWC, 전력 패턴 분석 |
| **2023** | 6 | 해태가루비, 코스모폴, 리파코, 코아아이티 등 | CoCTK, NLP, 로봇 분석 |
| **2024** | 6 | 에스에이치(풀 플랫폼), 테크웰, 신성오토텍 등 | **AMS 플랫폼**, FMEA |
| **2025-26** | 1 | 테이패스 새만금 | **CoCTK 시험 적용** |

### 솔루션 적용 현황

```mermaid
graph LR
    subgraph "핵심 솔루션"
        AMS["🔍 AMS<br/>이상탐지 93.7%"]
        FBS["📊 FBS<br/>품질 중요도"]
        CoCTK["🛠️ CoCTK<br/>데이터 분석"]
        ARIMA["📈 ARIMA+AI<br/>시계열 예측"]
    end
    
    AMS --- |"4개 업체"| A1["자동차 부품"]
    FBS --- |"8개 업체"| A2["금형/섬유/금속"]
    CoCTK --- |"5개 업체"| A3["식품/건축자재"]
    ARIMA --- |"3개 업체"| A4["철강/인쇄"]
    
    style AMS fill:#fff4e1,stroke:#f39c12,stroke-width:3px
    style FBS fill:#e8f5e9,stroke:#27ae60,stroke-width:3px
    style CoCTK fill:#e1f5ff,stroke:#3498db,stroke-width:3px
    style ARIMA fill:#fce4ec,stroke:#e91e63,stroke-width:3px
```

### 주요 성과
- **AMS 납품**: 에스에이치아이엔티 (2024)
- **CoCTK 납품**: 테이패스 새만금 (2025-2026)
- **GS 1등급 취득**: AMS/PDS, CoCTK

**관련 문서**:
- [[02_Projects_Overview#스마트공장|스마트공장 구축 프로젝트 상세]]

---

## 🎯 9단계 실행 가이드 흐름

```mermaid
graph LR
    subgraph "Phase 1: Foundation"
        S1[Step 1<br/>반복 업무]
        S2[Step 2<br/>전문성]
        S3[Step 3<br/>초소형]
        S4[Step 4<br/>모듈화]
        S5[Step 5<br/>I/O]
    end
    
    subgraph "Phase 2: Assets"
        S6[Step 6<br/>로그]
        S7[Step 7<br/>시각화]
    end
    
    subgraph "Phase 3: Expansion"
        S8[Step 8<br/>피드백]
        S9[Step 9<br/>업데이트]
    end
    
    S1 --> S2 --> S3 --> S4 --> S5
    S5 --> S6 --> S7
    S7 --> S8 --> S9
    S9 -. "순환" .-> S1
    
    style S1 fill:#e1f5ff
    style S6 fill:#e8f5e9
    style S8 fill:#fff4e1
```

**관련 문서**:
- [[00_Portfolio_Index|포트폴리오 메인 인덱스]]

---

## 🔍 핵심 허브(Hub) 문서

### 진입점(Entry Points)
1. **[[00_Portfolio_Index|포트폴리오 인덱스]]** (`page.portfolio.index`) - 전체 시작점
2. **[[02_Projects_Overview|프로젝트 개요]]** (`page.portfolio.projects`) - 13개 솔루션 허브
3. **[[Architecture_Overview|아키텍처 개요]]** (`page.portfolio.architecture`) - 기술 허브
4. **[[04_Academic_Publications|학술 논문]]** (`page.portfolio.academic`) - 연구 허브

### 가이드 문서
5. **[[00_ID_System_Guide|ID 시스템 가이드]]** (`guide.id.system`) - ID 명명 규칙
6. **[[00_AI_Workflow_Guide|AI 워크플로우 가이드]]** (`guide.ai.workflow`) - AI 문서 참조 전략
7. **[[00_Team_Roles_Guide|팀 역할 가이드]]** (`guide.team.roles`) - 팀 역할 정의
8. **[[00_PM_Roles_Guide|PM 역할 가이드]]** (`guide.pm.roles`) - PM 역할 구분

### 연결도(Degree) 순위
```yaml
최다_연결_문서:
  1. 00_Portfolio_Index.md (20개+ 링크)
  2. 00_Relationship_Map.md (현재 문서)
  3. 02_Projects_Overview.md (13개 링크)
  4. Architecture_Overview.md (10개 링크)
  5. Step_01_Repetitive_Work.md (8개 링크)
```

### 가이드 문서 네트워크
```mermaid
graph TB
    INDEX[00_Portfolio_Index<br/>page.portfolio.index]
    
    subgraph "가이드 문서"
        ID[00_ID_System_Guide<br/>guide.id.system]
        AI[00_AI_Workflow_Guide<br/>guide.ai.workflow]
        TEAM[00_Team_Roles_Guide<br/>guide.team.roles]
        PM[00_PM_Roles_Guide<br/>guide.pm.roles]
    end
    
    subgraph "템플릿"
        TEMP[templates/<br/>template.*]
    end
    
    INDEX --> ID
    INDEX --> AI
    INDEX --> TEAM
    INDEX --> PM
    INDEX --> TEMP
    
    ID -. "참조" .-> AI
    AI -. "사용" .-> TEMP
    TEAM -. "참조" .-> PM
    
    style INDEX fill:#e1f5ff
    style ID fill:#fff4e1
    style AI fill:#e8f5e9
```

---

## 📊 관계 유형 정의

```yaml
관계_타입:
  implements: "Step → Project (구현 관계)"
  validates: "Project → Paper (학술 검증)"
  proves: "Project → Testing (실증 관계)"
  uses: "Project → Technology (기술 사용)"
  extends: "Step → Next Step (확장 관계)"
  references: "Document ↔ Document (참조)"
  guides: "Guide → Document (가이드 관계)"
  templates: "Template → Document (템플릿 관계)"
```

## 🔗 ID 기반 문서 관계

### ID 시스템 적용

모든 문서는 `type.module.name` 형식의 ID를 가지며, 관계 맵에서 ID를 통해 명확히 추적할 수 있습니다.

**주요 ID 예시**:
- `page.portfolio.index` - 포트폴리오 인덱스
- `guide.id.system` - ID 시스템 가이드
- `guide.ai.workflow` - AI 워크플로우 가이드
- `guide.team.roles` - 팀 역할 가이드
- `guide.pm.roles` - PM 역할 가이드
- `template.project.summary` - 프로젝트 요약 템플릿
- `phase.foundation.step01` - Step 1 문서
- `project.ams` - AMS 프로젝트
- `project.pm_agent` - PM Agent (사업 관리)
- `project.ai_db_tester` - AI_DB_tester (VACTS) - Virtual Company Creation Agent 테스트 자동화 시스템 (LangGraph 기반 자연어 쿼리 포함)
- `project.factory_ontology_manager_ai_agent` - Factory Ontology Manager AI Agent - 자연어 기반 공정 문서 파싱 및 캔버스 레이아웃 자동 생성

**관련 문서**: [[00_ID_System_Guide|ID 시스템 가이드]] (`guide.id.system`)

---

> [!TIP] 옵시디언 그래프 뷰 활용
> 이 문서를 중심으로 옵시디언의 그래프 뷰(Graph View)를 열면 전체 포트폴리오의 지식 네트워크를 시각적으로 탐색할 수 있습니다.
