# Autonomous Development Lifecycle (ADLC) 가이드

**문서 ID**: `guide.ai.workflow`

> [!TIP] 개발의 미래 (The Future of Dev)
> 코드는 '작성'하는 것이 아니라 '생성'되고 '관리'되는 것입니다.
> 당사는 **자율 에이전트(Autonomous Agents)** 를 통해 요구사항 정의부터 테스트, 배포까지의 전 과정을 자동화하는 독자적인 개발 방법론인 **ADLC(Autonomous Development Lifecycle)** 를 보유하고 있습니다.

---

## 1. ADLC 3단계 프로세스

### Phase 1: 아키텍처 자동 설계 (Architectural Autonomy)
*   **Input**: "공장 에너지 데이터를 분석해서 월간 리포트를 만들어줘." (자연어 요구사항)
*   **AI Action**:
    1.  **Requirement Analysis**: 요구사항을 분석하여 필요한 데이터 스키마와 API 명세를 도출합니다.
    2.  **Tech Stack Selection**: 데이터 규모와 실시간성을 고려하여 최적의 DB(Time-series vs Relational)와 언어를 선정합니다.
    3.  **BluePrint Generation**: 전체 시스템의 설계도(Blueprint)와 파일 구조를 생성합니다.

### Phase 2: 코드 자율 생성 (Code Generation)
*   **Input**: 생성된 설계도 (Blueprint)
*   **AI Action**:
    1.  **Boilerplate Coding**: 프로젝트 스캐폴딩, DB 연결, 기본 CRUD API를 10초 만에 작성합니다.
    2.  **Logic Implementation**: 비즈니스 로직을 구현하고, 복잡한 알고리즘(예: FFT 분석)을 라이브러리 기반으로 최적화합니다.
    3.  **Self-Correction**: 코드를 실행해보고 에러가 발생하면, 스스로 로그를 분석하여 수정(Fix)하고 재실행합니다.

### Phase 3: 무중단 검증 및 문서화 (Verification & Documentation)
*   **Input**: 구현된 코드
*   **AI Action**:
    1.  **Test Case Generation**: 가능한 모든 예외 상황(Null 값, 네트워크 단절 등)에 대한 테스트 케이스 100개를 생성합니다.
    2.  **Documentation Sync**: 코드가 변경될 때마다 API 문서(Swagger)와 시스템 아키텍처 다이어그램(Mermaid)을 자동으로 동기화합니다.

---

## 2. 핵심 AI 에이전트 (Core AI Agents)

당사의 ADLC는 다음의 전문화된 에이전트들이 협업하여 수행합니다.

| 에이전트 | 역할 | 주요 기능 |
| :--- | :--- | :--- |
| **Blueprint Agent** | **설계자** | 요구사항을 구조화된 마크다운 설계 문서로 변환 |
| **Coder Agent** | **구현자** | 설계 문서를 바탕으로 실제 작동하는 Python/JS 코드 생성 |
| **Reviewer Agent** | **감사자** | 코드 스타일, 보안 취약점, 아키텍처 위배 사항 검수 |
| **DocUpdater Agent** | **서기** | 코드 변경 사항을 모든 문서에 실시간 반영 |

---

## 3. 프롬프트 엔지니어링 전략 (Prompt Engineering Strategy)

단순한 질문이 아닌, **구조화된 지시(Structured Prompting)** 를 통해 AI의 성능을 극대화합니다.

### 3-Layer Prompting
1.  **Context Layer**: "너는 20년 경력의 시니어 백엔드 엔지니어이다." (페르소나 부여)
2.  **Constraint Layer**: "모든 변수명은 Snake_case를 사용하고, 타입 힌트를 반드시 명시하라." (제약 조건)
3.  **Instruction Layer**: "주어진 SQL 쿼리를 실행 계획을 분석하여 인덱싱 최적화 방안을 3가지 제시하라." (구체적 지시)

---

## 4. 관련 문서

*   **[[Architecture_Overview|시스템 아키텍처]]**: ADLC를 통해 구축된 실제 플랫폼 구조.
*   **[[00_Team_Roles_Guide|인간-AI 협업]]**: 이 시스템을 운용하는 하이브리드 팀의 역할.
