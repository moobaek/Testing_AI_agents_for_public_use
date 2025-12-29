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
```

---

## 🔗 프로젝트별 상세 관계

### 1️⃣ AMS (Anomaly Management System)

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

**관련 문서**: [[00_ID_System_Guide|ID 시스템 가이드]] (`guide.id.system`)

---

> [!TIP] 옵시디언 그래프 뷰 활용
> 이 문서를 중심으로 옵시디언의 그래프 뷰(Graph View)를 열면 전체 포트폴리오의 지식 네트워크를 시각적으로 탐색할 수 있습니다.
