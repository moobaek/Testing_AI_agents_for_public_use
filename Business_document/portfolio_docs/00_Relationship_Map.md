# 솔루션 아키텍처 맵 (Solution Architecture Map)

**문서 ID**: `doc.solution.map`

> [!INFO] 목적 (Purpose)
> 본 맵은 당사의 **거버넌스 에이전트**, **산업별 솔루션**, 그리고 **구현 방법론**이 어떻게 유기적으로 결합하여 기업 가치를 창출하는지 시각화합니다.

---

## 🗺️ 전사적 시스템 아키텍처

```mermaid
graph TB
    subgraph "Governance Layer (운영 시스템)"
        EVAL["평가 에이전트<br/>(품질 보증)"]
        PROMPT["프롬프트 평가자<br/>(로직 게이트키퍼)"]
        PM["PM 에이전트<br/>(리스크 관리)"]
    end
    
    subgraph "Methodology (프로세스)"
        P1["Phase 1: 진단 및 파일럿"] --> P2["Phase 2: 시스템화"] --> P3["Phase 3: 확장"]
    end
    
    subgraph "Vertical Solutions (결과물)"
        MFG["스마트 제조<br/>(AMS, CoCTK)"]
        ENG["에너지 & 안전<br/>(센서, 트윈)"]
        HLT["디지털 헬스케어<br/>(의료 분석)"]
    end
    
    %% Governance Impact
    EVAL == "검증 (Validates)" ==> MFG & ENG & HLT
    PROMPT == "최적화 (Optimizes)" ==> P1 & P2
    PM == "관리 (Manages)" ==> P1 & P3
    
    %% Methodology Impact (Implements)
    P3 -. "배포 (Deploys)" .-> MFG
    P3 -. "배포 (Deploys)" .-> ENG
    P3 -. "배포 (Deploys)" .-> HLT
    
    style EVAL fill:#ffcdd2,stroke:#d32f2f,stroke-width:3px
    style PROMPT fill:#e1bee7,stroke:#7b1fa2,stroke-width:3px
    style PM fill:#bbdefb,stroke:#1976d2,stroke-width:3px
```

---

## 🔗 핵심 문서 관계도

```mermaid
graph LR
    EXEC["경영진 요약<br/>(Executive Summary)"]
    SOL["솔루션 스위트<br/>(Solution Suite)"]
    TEAM["팀 비전<br/>(Team Vision)"]
    ARCH["기술 아키텍처<br/>(Architecture Overview)"]
    
    EXEC --> SOL
    EXEC --> TEAM
    EXEC --> ARCH
    
    SOL -. "상세 기술" .-> ARCH
    TEAM -. "수행 결과" .-> SOL
    
    style EXEC fill:#e1f5ff,stroke-width:4px
```

## 📂 문서 네비게이션 허브
| 문서명 | 역할 | ID |
| :--- | :--- | :--- |
| **[[00_Executive_Summary]]** | **시작점 (Entry Point)** | `doc.executive.summary` |
| **[[02_Solution_Suite]]** | **성공 사례 (Case Studies)** | `doc.solution.suite` |
| **[[00_Team_Vision]]** | **팀 & 비전 (Team & Vision)** | `doc.team.vision` |
| **[[Architecture_Overview]]** | **기술 상세 (Deep Tech)** | `page.portfolio.architecture` |

---

## 🔗 심층 탐구 (Deep Dives)
*   **[[00_Executive_Summary]]**: 비즈니스 관점의 핵심 요약.
*   **[[02_Solution_Suite]]**: 검증된 가치와 ROI 증명.
*   **[[00_Team_Vision]]**: 코드를 만드는 사람들의 철학.
