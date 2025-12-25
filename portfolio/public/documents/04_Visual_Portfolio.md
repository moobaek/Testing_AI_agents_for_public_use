# 시각적 포트폴리오 (Visual Portfolio)

> [!INFO] 한눈에 보는 5년간의 여정
> 타임라인, 인포그래픽, 프로젝트 맵으로 구성된 시각 중심 포트폴리오입니다.

---

## 📅 5년 타임라인 (2020-2025)

```mermaid
timeline
    title 권순룡의 5년 성장 여정
    
    2020 : 초기 연구 및 기술 개발
         : 설계 문서 시스템 구축
         : 첫 논문 발표 (피쉬본 자동화)
    
    2021 : 스마트센서 3종 개발
         : 데이터 바우처 과제 수행
         : AI 실증 프로젝트 시작
         : 논문 2편 추가 발표
    
    2022 : 공정 최적화 관리 시스템 연구과제 시작
         : DPS 플랫폼 아키텍처 설계
         : 에너지 최적화 시스템 개발
         : 논문 2편 추가 발표
    
    2023 : 일본 도료기업 전사 DX 구축
         : AI 복합 센서 개발
         : FMEA 자동화 시스템
         : GS 인증 1차 취득
         : 논문 2편 추가 발표
    
    2024 : 연구과제 완료 및 기술 고도화
         : 디지털 트윈 안전 시스템
         : 클린룸 에너지 최적화
         : GS 인증 2차, 3차 취득
         : 논문 2편 추가 발표
    
    2025 : 세아특수강 AMS 납품 시작
         : 포미아 DPS 5종 납품 시작
         : 13개 솔루션 포트폴리오 완성
         : 298개 설계 문서 체계화
```

---

## 🗺️ 13개 솔루션 프로젝트 맵

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'fontSize':'14px'}}}%%
mindmap
  root(("13개<br/>솔루션"))
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
%%{init: {'theme':'base'}}%%
graph TB
    subgraph "개발 성과"
        A1["📦 13개<br/>독립 솔루션"]
        A2["📄 298개<br/>설계 문서"]
        A3["🐍 49개<br/>Python 모듈"]
    end
    
    subgraph "학술 성과"
        B1["📚 9편<br/>논문 발표"]
        B2["🏆 GS 인증<br/>3개"]
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
%%{init: {'theme':'base'}}%%
quadrantChart
    title 기술 역량 포트폴리오
    x-axis "낮은 복잡도" --> "높은 복잡도"
    y-axis "낮은 임팩트" --> "높은 임팩트"
    
    quadrant-1 "전략적 핵심"
    quadrant-2 "차별화 영역"
    quadrant-3 "기본 역량"
    quadrant-4 "효율화 영역"
    
    "AMS (이상 탐지)": [0.8, 0.9]
    "DPS (플랫폼)": [0.85, 0.85]
    "에너지 최적화": [0.6, 0.8]
    "스마트센서": [0.5, 0.7]
    "CoCTK (분석)": [0.7, 0.75]
    "디지털 트윈": [0.75, 0.7]
    "FMEA 자동화": [0.65, 0.65]
```

---

## 🏆 고객사 & 납품 현황

```mermaid
%%{init: {'theme':'base'}}%%
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
%%{init: {'theme':'base'}}%%
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
%%{init: {'theme':'base'}}%%
sankey-beta
"R&D","AMS 개발",30
"R&D","DPS 개발",25
"R&D","센서 개발",20
"R&D","에너지 시스템",15
"R&D","기타 솔루션",10
"AMS 개발","이상 탐지 93.7%",30
"DPS 개발","에너지 20% 절감",25
"센서 개발","중소기업 보급",20
"에너지 시스템","GS 인증 3개",15
"기타 솔루션","특허 & 논문",10
"이상 탐지 93.7%","손실 방지",30
"에너지 20% 절감","비용 절감",25
"중소기업 보급","시장 확대",20
"GS 인증 3개","신뢰도 향상",15
"특허 & 논문","IP 자산",10
```

---

## 🚀 기술 스택 레이더 차트

```mermaid
%%{init: {'theme':'base'}}%%
---
config:
  themeVariables:
    xyChart:
      backgroundColor: "transparent"
---
xychart-beta
    title "기술 역량 분포 (1-10 척도)"
    x-axis [AI/ML, 플랫폼, IoT, 에너지, 데이터, 제조]
    y-axis "역량 수준" 0 --> 10
    bar [9, 8, 8, 7, 9, 8]
```

---

## 📈 5년간 성장 곡선

```mermaid
%%{init: {'theme':'base'}}%%
xychart-beta
    title "연도별 프로젝트 누적 수"
    x-axis [2020, 2021, 2022, 2023, 2024, 2025]
    y-axis "프로젝트 수" 0 --> 15
    line [3, 6, 9, 11, 13, 13]
```

---

## 🎓 GS 인증 & 특허 현황

```mermaid
graph TD
    subgraph "GS 인증 (3개)"
        G1["🏆 클린룸<br/>에너지 최적화"]
        G2["🏆 AMS<br/>이상 탐지"]
        G3["🏆 DPS<br/>AI 플랫폼"]
    end
    
    subgraph "특허"
        P1["⚖️ 피쉬본<br/>자동화 엔진"]
    end
    
    subgraph "의미"
        M["✅ 정부 공인 품질<br/>✅ 공공 납품 자격<br/>✅ 기술 신뢰도"]
    end
    
    G1 & G2 & G3 & P1 --> M
    
    style M fill:#fff4e1,stroke-width:2px
```

---

## 🌍 시장 확장 로드맵

```mermaid
%%{init: {'theme':'base'}}%%
journey
    title 시장 확장 여정
    section "현재 시장"
      "금속 제조": 5: "세아특수강"
      "소재 산업": 5: "포미아"
      "도료 제조": 5: "일본 기업"
    section "단기 확장 (1년)"
      "화학 공정": 3: "목표"
      "식품 제조": 3: "목표"
    section "중기 확장 (3년)"
      "반도체": 2: "목표"
      "전자 제조": 2: "목표"
    section "장기 비전 (5년)"
      "글로벌 시장": 1: "목표"
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
- [[02_Projects_Overview|13개 프로젝트 상세]]
- [[04_Academic_Publications|9편 논문 목록]]
- [[Architecture_Overview|기술 아키텍처]]
- [[Testing_Context|실증 사례]]

### 비전문가용
- [[Executive_Summary/00_Overview_For_Non_Technical|전체 개요]]
- [[Executive_Summary/01_Key_Achievements|핵심 성과]]
- [[Executive_Summary/02_Business_Value|비즈니스 가치]]
- [[Executive_Summary/03_Technology_Simplified|기술 쉽게 설명]]

---

> [!SUCCESS] 시각적 요약
> **"한눈에 보는 5년간의 성과"**
> - 📦 13개 솔루션
> - 📚 9편 논문
> - 🏆 GS 인증 3개
> - 💰 수십억 원 손실 방지
> - 🌏 대기업 3곳+ 납품