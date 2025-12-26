# 시각적 포트폴리오 (Visual Portfolio)

> [!INFO] 한눈에 보는 5년간의 여정
> 타임라인, 인포그래픽, 프로젝트 맵으로 구성된 시각 중심 포트폴리오입니다.

---

## 📅 5년 타임라인 (2020-2025)

```mermaid
gantt
    title 권순룡의 5년 성장 여정 (2020-2025)
    dateFormat YYYY-MM
    section 2020
    FBS 엔진 프로젝트 시작 :2020-09, 2020-10
    일본 오웰社 DX 프로젝트 :2020-01, 2024-12
    설계 문서 시스템 구축 :2020-01, 2021-12
    첫 논문 발표 :2020-12, 2020-12
    section 2021
    고가센서 대체 가상센서 :2021-05, 2021-10
    클린룸 에너지 최적화 :2021-04, 2021-10
    전력 데이터 예측 :2021-04, 2021-11
    품질 예측 AI 엔진 개발 :2021-01, 2023-12
    스마트센서 3종 개발 :2021-01, 2021-12
    section 2022
    CoCTK 프로젝트 시작 :2022-03, 2024-12
    진료기록 체질 분석 :2022-06, 2022-10
    DPS 플랫폼 아키텍처 설계 :2022-01, 2022-12
    section 2023
    공정 불량 예측 완료 :2023-04, 2023-10
    생산공정 에너지 패턴 분석 :2023-01, 2023-12
    품질 예측 AI 엔진 고도화 :2023-01, 2023-12
    AI 복합 센서 개발 :2023-01, 2023-12
    section 2024
    CoCTK 완료 (GS 1등급) :2024-12, 2024-12
    일본 오웰社 DX 완료 :2024-12, 2024-12
    AMS 프로젝트 시작 :2024-07, 2025-03
    디지털 트윈 안전 시스템 :2024-01, 2024-12
    논문 추가 발표 :2024-01, 2024-12
    section 2025
    AMS 완료 (GS 1등급) :2025-03, 2025-03
    세아특수강/포미아 납품 :2025-01, 2025-12
    포트폴리오 완성 :2025-01, 2025-12
```

---

## 🗺️ 20개 이상 솔루션 프로젝트 맵

```mermaid
mindmap
  root(("20개 이상<br/>솔루션"))
    "AI & Analytics"
      "AMS"
        "이상 탐지 93.7%"
        "세아특수강 납품"
        "특허 출원"
      "CoCTK"
        "데이터 분석"
        "상관성 엔진"
      "일본 DX"
        "전사 디지털화"
        "글로벌 경험"
    "Digital Platforms"
      "DPS"
        "5층 아키텍처"
        "마이크로서비스"
        "Neo4j 그래프 DB"
      "생산정보 통합"
        "YP-25-3061"
        "실시간 연계"
      "DX 실증센터"
        "포미아 납품"
        "실증 플랫폼"
    "Smart Sensors"
      "저비용 센서 3종"
        "중소기업 보급"
        "Edge AI"
      "AI 복합 센서"
        "다중 센서 통합"
      "전력품질 분석"
        "실시간 모니터링"
    "Energy & Safety"
      "클린룸 최적화"
        "GS 인증"
        "20% 절감"
      "디지털 트윈"
        "EV/ESS 안전"
      "FMEA 자동화"
        "리스크 관리"
```

---

## 📊 성과 대시보드

### 핵심 지표 한눈에 보기

```mermaid
graph TB
    subgraph "개발 성과"
        A1["📦 20개 이상<br/>독립 솔루션"]
        A2["📄 298개<br/>설계 문서"]
        A3["🐍 49개<br/>Python 모듈"]
    end

    subgraph "학술 성과"
        B1["📚 9편<br/>논문 발표"]
        B2["🏆 GS 인증<br/>2개 (1등급)"]
        B3["⚖️ 특허<br/>출원/등록"]
    end
    
    subgraph "비즈니스 성과"
        C1["🏭 대기업<br/>3곳+ 납품"]
        C2["🎯 이상 탐지<br/>93.7%"]
        C3["⚡ 에너지<br/>20% 절감"]
    end
    
    subgraph "최종 임팩트"
        D["💰 연간 수십억 원<br/>손실 방지"]
    end
    
    A1 & A2 & A3 --> D
    B1 & B2 & B3 --> D
    C1 & C2 & C3 --> D
    
    style D fill:#fce4ec,stroke:#d32f2f,stroke-width:4px
    style A1 fill:#e1f5ff
    style B1 fill:#e8f5e9
    style C1 fill:#fff4e1
```

---

## 🎯 4대 핵심 영역

```mermaid
graph TB
    subgraph "전략적 핵심 (높은 복잡도, 높은 임팩트)"
        A1["AMS<br/>이상 탐지"]
        A2["DPS<br/>플랫폼"]
    end
    
    subgraph "차별화 영역 (높은 복잡도, 낮은 임팩트)"
        B1["디지털 트윈"]
    end
    
    subgraph "효율화 영역 (낮은 복잡도, 높은 임팩트)"
        C1["에너지 최적화"]
        C2["CoCTK<br/>분석"]
    end
    
    subgraph "기본 역량 (낮은 복잡도, 낮은 임팩트)"
        D1["스마트센서"]
        D2["FMEA 자동화"]
    end
    
    style A1 fill:#e8f5e9,stroke-width:3px
    style A2 fill:#e8f5e9,stroke-width:3px
    style C1 fill:#fff4e1
    style C2 fill:#fff4e1
```

---

## 🏆 고객사 & 납품 현황

```mermaid
graph LR
    subgraph "고객사"
        C1["🏭 세아특수강<br/>(금속 제조)"]
        C2["🏢 포미아<br/>(산업진흥원)"]
        C3["🌏 일본 기업<br/>(도료 제조)"]
    end
    
    subgraph "납품 솔루션"
        S1["AMS<br/>이상 탐지"]
        S2["DPS<br/>AI 플랫폼"]
        S3["전사 DX<br/>시스템"]
    end
    
    subgraph "검증 결과"
        R1["✅ 93.7%<br/>정확도"]
        R2["✅ 20%<br/>에너지 절감"]
        R3["✅ 전사<br/>디지털화"]
    end
    
    C1 ==>|납품| S1 ==>|성과| R1
    C2 ==>|구축| S2 ==>|성과| R2
    C3 ==>|구축| S3 ==>|성과| R3
    
    style C1 fill:#e1f5ff
    style C2 fill:#e1f5ff
    style C3 fill:#e1f5ff
    style R1 fill:#e8f5e9,stroke-width:2px
    style R2 fill:#e8f5e9,stroke-width:2px
    style R3 fill:#e8f5e9,stroke-width:2px
```

---

## 📚 학술 성과 분포

```mermaid
pie title 9편 논문 분야별 분포
    "AI & 이상 탐지" : 3
    "에너지 효율" : 2
    "데이터 분석" : 2
    "센서 & IoT" : 1
    "디지털 트윈" : 1
```

---

## 💰 비즈니스 임팩트 플로우

```mermaid
graph LR
    subgraph "R&D 투자"
        R1["R&D"]
    end
    
    subgraph "개발 영역"
        D1["AMS 개발<br/>30%"]
        D2["DPS 개발<br/>25%"]
        D3["센서 개발<br/>20%"]
        D4["에너지 시스템<br/>15%"]
        D5["기타 솔루션<br/>10%"]
    end
    
    subgraph "성과"
        S1["이상 탐지 93.7%"]
        S2["에너지 20% 절감"]
        S3["중소기업 보급"]
        S4["에너지 절감"]
        S5["특허 & 논문"]
    end
    
    subgraph "최종 가치"
        V1["손실 방지"]
        V2["비용 절감"]
        V3["시장 확대"]
        V4["신뢰도 향상"]
        V5["IP 자산"]
    end
    
    R1 --> D1 & D2 & D3 & D4 & D5
    D1 --> S1
    D2 --> S2
    D3 --> S3
    D4 --> S4
    D5 --> S5
    S1 --> V1
    S2 --> V2
    S3 --> V3
    S4 --> V4
    S5 --> V5
    
    style R1 fill:#e1f5ff
    style V1 fill:#e8f5e9,stroke-width:2px
    style V2 fill:#e8f5e9,stroke-width:2px
    style V3 fill:#e8f5e9,stroke-width:2px
    style V4 fill:#e8f5e9,stroke-width:2px
    style V5 fill:#e8f5e9,stroke-width:2px
```

---

## 🚀 기술 스택 레이더 차트

```mermaid
graph TB
    subgraph "기술 역량 분포 (1-10 척도)"
        A1["AI/ML<br/>9점"]
        A2["플랫폼<br/>8점"]
        A3["IoT<br/>8점"]
        A4["에너지<br/>7점"]
        A5["데이터<br/>9점"]
        A6["제조<br/>8점"]
    end
    
    style A1 fill:#e8f5e9,stroke-width:2px
    style A5 fill:#e8f5e9,stroke-width:2px
    style A2 fill:#fff4e1
    style A3 fill:#fff4e1
    style A6 fill:#fff4e1
    style A4 fill:#e1f5ff
```

---

## 📈 5년간 성장 곡선

```mermaid
graph LR
    Y2020["2020<br/>3개"] --> Y2021["2021<br/>9개"]
    Y2021 --> Y2022["2022<br/>13개"]
    Y2022 --> Y2023["2023<br/>17개"]
    Y2023 --> Y2024["2024<br/>19개"]
    Y2024 --> Y2025["2025<br/>20개+"]
    
    style Y2020 fill:#e1f5ff
    style Y2021 fill:#e1f5ff
    style Y2022 fill:#fff4e1
    style Y2023 fill:#fff4e1
    style Y2024 fill:#e8f5e9
    style Y2025 fill:#e8f5e9,stroke-width:3px
```

---

## 🎓 GS 인증 & 특허 현황

```mermaid
graph TD
    subgraph "GS 인증 (2개, 1등급)"
        G1["🏆 CoCTK<br/>분석 툴킷"]
        G2["🏆 AMS(PDS)<br/>이상 탐지"]
    end
    
    subgraph "특허"
        P1["⚖️ 피쉬본<br/>자동화 엔진"]
    end
    
    subgraph "의미"
        M["✅ 정부 공인 품질<br/>✅ 공공 납품 자격<br/>✅ 기술 신뢰도"]
    end
    
    G1 & G2 & P1 --> M
    
    style M fill:#fff4e1,stroke-width:2px
```

---

## 🌍 시장 확장 로드맵

```mermaid
graph TD
    subgraph "현재 시장"
        C1["금속 제조<br/>세아특수강"]
        C2["소재 산업<br/>포미아"]
        C3["도료 제조<br/>일본 기업"]
    end
    
    subgraph "단기 확장 (1년)"
        S1["화학 공정<br/>목표"]
        S2["식품 제조<br/>목표"]
    end
    
    subgraph "중기 확장 (3년)"
        M1["반도체<br/>목표"]
        M2["전자 제조<br/>목표"]
    end
    
    subgraph "장기 비전 (5년)"
        L1["글로벌 시장<br/>목표"]
    end
    
    C1 --> S1
    C2 --> S2
    C3 --> S1
    S1 --> M1
    S2 --> M2
    M1 --> L1
    M2 --> L1
    
    style C1 fill:#e8f5e9,stroke-width:2px
    style C2 fill:#e8f5e9,stroke-width:2px
    style C3 fill:#e8f5e9,stroke-width:2px
    style L1 fill:#fff4e1,stroke-width:3px
```

---

## 💡 핵심 가치 제안

```mermaid
graph TB
    subgraph "고객 문제"
        P1["❌ 갑작스러운<br/>기계 고장"]
        P2["❌ 높은<br/>에너지 비용"]
        P3["❌ 비싼<br/>센서 가격"]
    end
    
    subgraph "우리 솔루션"
        S1["✅ AI 사전 예측<br/>(93.7% 정확도)"]
        S2["✅ 최적화 시스템<br/>(20% 절감)"]
        S3["✅ 저비용 센서<br/>(90% 저렴)"]
    end
    
    subgraph "고객 가치"
        V1["💰 수십억 원<br/>손실 방지"]
        V2["💰 연간 2억 원<br/>비용 절감"]
        V3["💰 중소기업<br/>DX 가능"]
    end
    
    P1 --> S1 --> V1
    P2 --> S2 --> V2
    P3 --> S3 --> V3
    
    style S1 fill:#fff4e1
    style S2 fill:#fff4e1
    style S3 fill:#fff4e1
    style V1 fill:#e8f5e9,stroke-width:2px
    style V2 fill:#e8f5e9,stroke-width:2px
    style V3 fill:#e8f5e9,stroke-width:2px
```

---

## 🔗 관련 문서

### 상세 정보
- [[02_Projects_Overview|20개 이상 프로젝트 상세]]
- [[04_Academic_Publications|9편 논문 목록]]
- [[Architecture_Overview|기술 아키텍처 (AMS, CoCTK, FBS, DPS)]]
- [[Testing_Context|실증 사례 (세아특수강, 포미아, 일본 오웰社)]]

### 비전문가용
- [[Executive_Summary/00_Overview_For_Non_Technical|전체 개요]]
- [[Executive_Summary/01_Key_Achievements|핵심 성과]]
- [[Executive_Summary/02_Business_Value|비즈니스 가치]]
- [[Executive_Summary/03_Technology_Simplified|기술 쉽게 설명]]

---

> [!SUCCESS] 시각적 요약
> **"한눈에 보는 5년간의 성과"**
> - 📦 20개 이상 솔루션 (5대 영역)
> - 📚 9편 논문 (2020-2025)
> - 🏆 GS 인증 2개 (1등급)
> - 💰 수십억 원 손실 방지
> - 🌏 대기업 3곳+ 납품 (세아특수강, 포미아, 일본 오웰社)
> - 👨‍💼 총괄 PM 경험 (AMS, CoCTK)
