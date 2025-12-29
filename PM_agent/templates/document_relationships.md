# PM 템플릿 문서 관계도

프로젝트 단계별 문서 간 관계 및 흐름을 시각화합니다.

---

## 📊 전체 문서 흐름도

```mermaid
flowchart TB
    subgraph Phase0["📁 0. 영업/제안"]
        RFP["📄 제안요청서 응답"]
        PROPOSAL["📄 제안서"]
    end

    subgraph Phase1["📁 1. 프로젝트 착수"]
        SOW["📄 과업지시서"]
        CHARTER["📄 프로젝트 헌장"]
        FP["📄 FP 산정표"]
        COST["📄 사업비 산출내역서"]
        QUOTE["📄 견적서"]
        CONTRACT["📄 계약서"]
        PMP["📄 프로젝트 관리 계획서"]
        WBS["📄 WBS"]
        BRD["📄 BRD"]
        FRD["📄 FRD"]
        RTM["📄 RTM"]
        DESIGN["📄 설계서"]
    end

    subgraph Phase2["📁 2. 프로젝트 수행"]
        WEEKLY["📄 주간 보고서"]
        MONTHLY["📄 월간 보고서"]
        RAID["📄 RAID 로그"]
        ISSUE["📄 이슈 리스트"]
        CR["📄 변경요청서"]
        MEETING["📄 회의록"]
        COMM["📄 커뮤니케이션 로그"]
        STAKE["📄 이해관계자 매트릭스"]
        ADD_REQ["📄 추가 요구사항"]
        IMPACT["📄 영향 분석서"]
        SCOPE["📄 범위 변경 합의서"]
        HISTORY["📄 변경 이력"]
    end

    subgraph Phase3["📁 3. 프로젝트 종료"]
        UAT["📄 UAT 결과"]
        HANDOVER["📄 운영 인수인계"]
        SLA["📄 SLA"]
        MAINT["📄 유지보수 계약"]
        TRAIN["📄 교육 자료"]
        NPS["📄 고객 만족도"]
        ACCEPT["📄 최종 인수증"]
        CLOSURE["📄 종료 보고서"]
    end

    %% Phase 0 → Phase 1
    RFP --> PROPOSAL
    PROPOSAL --> SOW
    PROPOSAL --> QUOTE

    %% Phase 1 내부 관계
    SOW --> CHARTER
    SOW --> QUOTE
    FP --> COST
    COST --> QUOTE
    QUOTE --> CONTRACT
    CONTRACT --> PMP
    CHARTER --> PMP
    PMP --> WBS
    SOW --> BRD
    BRD --> FRD
    FRD --> RTM
    FRD --> DESIGN

    %% Phase 1 → Phase 2
    WBS --> WEEKLY
    RTM -.-> CR

    %% Phase 2 내부 관계
    WEEKLY --> MONTHLY
    RAID --> ISSUE
    MEETING --> RAID
    CR --> RTM
    COMM --> STAKE
    CR --> ADD_REQ
    ADD_REQ --> IMPACT
    IMPACT --> SCOPE
    SCOPE --> HISTORY
    ADD_REQ --> HISTORY
    HISTORY --> RTM

    %% Phase 2 → Phase 3
    RTM --> UAT
    DESIGN --> HANDOVER

    %% Phase 3 내부 관계
    UAT --> ACCEPT
    CONTRACT -.-> SLA
    SLA --> MAINT
    TRAIN --> HANDOVER
    ACCEPT --> CLOSURE
    NPS --> CLOSURE
```

---

## 🔄 요구사항 변경 관리 흐름

```mermaid
flowchart LR
    subgraph Trigger["변경 발생"]
        CR["변경요청서"]
        REQ["신규 요구"]
    end

    subgraph Analysis["분석"]
        ADD_REQ["추가 요구사항\n명세서"]
        IMPACT["수정 영향\n분석서"]
    end

    subgraph Agreement["합의"]
        SCOPE["범위 변경\n합의서"]
    end

    subgraph Tracking["추적"]
        HISTORY["요구사항\n변경 이력"]
        RTM["RTM"]
    end

    CR --> ADD_REQ
    REQ --> ADD_REQ
    ADD_REQ --> IMPACT
    IMPACT --> SCOPE
    SCOPE --> HISTORY
    ADD_REQ --> HISTORY
    HISTORY --> RTM
```

---

## 📐 영업/제안 → 착수 흐름

```mermaid
flowchart LR
    subgraph PreSales["영업/제안"]
        RFP["제안요청서\n응답"]
        PROPOSAL["제안서"]
    end

    subgraph Estimation["비용 산정"]
        FP["FP 산정표"]
        COST["사업비\n산출내역서"]
        QUOTE["견적서"]
    end

    subgraph Agreement["계약"]
        CONTRACT["계약서"]
    end

    subgraph Kickoff["착수"]
        SOW["과업지시서"]
        CHARTER["프로젝트\n헌장"]
    end

    RFP --> PROPOSAL
    PROPOSAL --> SOW
    SOW --> FP
    FP --> COST
    COST --> QUOTE
    QUOTE --> CONTRACT
    PROPOSAL --> QUOTE
    CONTRACT --> CHARTER
    SOW --> CHARTER
```

---

## 📈 수행 단계 상세 관계

```mermaid
flowchart TB
    subgraph Tracking["진행 관리"]
        WBS["WBS"]
        WEEKLY["주간 보고"]
        MONTHLY["월간 보고"]
    end

    subgraph Issues["이슈/리스크"]
        MEETING["회의록"]
        RAID["RAID 로그"]
        ISSUE["이슈 리스트"]
    end

    subgraph Changes["변경 관리"]
        CR["변경요청서"]
        ADD_REQ["추가 요구사항"]
        IMPACT["영향 분석서"]
        SCOPE["범위 변경 합의서"]
        HISTORY["변경 이력"]
        RTM["RTM"]
    end

    subgraph Communication["커뮤니케이션"]
        STAKE["이해관계자 매트릭스"]
        COMM["커뮤니케이션 로그"]
    end

    WBS --> WEEKLY
    WEEKLY --> MONTHLY

    MEETING --> RAID
    RAID --> ISSUE

    CR --> ADD_REQ
    ADD_REQ --> IMPACT
    IMPACT --> SCOPE
    SCOPE --> HISTORY
    HISTORY --> RTM
    
    STAKE --> COMM
    RAID --> CR
```

---

## 🏁 종료 단계 상세 관계

```mermaid
flowchart LR
    subgraph Validation["검증"]
        RTM["RTM"]
        UAT["UAT 결과"]
    end

    subgraph Handover["인수인계"]
        HANDOVER["운영 인수인계 패키지"]
        TRAIN["교육 자료"]
    end

    subgraph Contract["계약"]
        SLA["SLA"]
        MAINT["유지보수 계약"]
    end

    subgraph Closure["종료"]
        NPS["고객 만족도"]
        ACCEPT["최종 인수증"]
        CLOSURE["종료 보고서"]
    end

    RTM --> UAT
    UAT --> ACCEPT
    TRAIN --> HANDOVER
    HANDOVER --> ACCEPT
    SLA --> MAINT
    NPS --> CLOSURE
    ACCEPT --> CLOSURE
```

---

## 📁 참조

- **문서 관계 JSON**: [document_relationships.json](./document_relationships.json)

---

## 🔗 관계 유형

| 유형 | 설명 | 표시 |
|------|------|------|
| `input` | A가 B의 입력 | A → B |
| `precedes` | A가 B보다 선행 | A → B |
| `contains` | A가 B를 포함 | A → B |
| `triggers` | A가 B를 촉발 | A → B |
| `tracks` | A를 B에서 추적 | A → B |
| `updates` | A가 B를 수정 | A -.-> B |
