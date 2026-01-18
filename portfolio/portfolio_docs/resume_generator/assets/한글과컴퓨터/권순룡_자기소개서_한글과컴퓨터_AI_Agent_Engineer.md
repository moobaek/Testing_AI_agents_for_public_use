# 권순룡 자기소개서 - 한글과컴퓨터 AI Agent Engineer

---

## 지원동기

5년간 AI Agent 시스템을 설계하고 개발하며 "Prompt를 단순 텍스트가 아닌 Agent 동작 로직의 일부로 다루는" 전문성을 쌓아왔습니다. 특히 FMEA 자동화 생성 시스템에서 Claude Sub-Agent 기반 Multi-Agent Workflow를 구축하여 8개 독립 Sub-Agent가 협업하는 시스템을 설계하고, Agent 실행 구조(Workflow/Tool/Prompt 흐름)를 개발·고도화한 경험은 한글과컴퓨터 AI Agent 핵심 기반 기술 연구·개발 팀의 "Agent 엔진, 런타임, 저작도구, 모델 연동 등 제품 기능의 기반이 되는 서버 기술을 설계·구현"하는 목표와 정확히 일치합니다.

한글과컴퓨터가 추구하는 "AI Hub Agent 엔진·SDK 설계/개선 및 유지관리", "Agent 실행 구조(Workflow/Tool/Prompt 흐름) 개발 및 고도화", "Prompt 구조 설계 및 운영 기준 정립(반복·종료·예외 제어 포함)", "Agent 품질 이슈 분석 및 안정화(오동작/루프/환각 등 대응)", "MCP 기반 도구 연동 구조 이해 및 확장"은 제가 프롬프트 평가 엔진에서 Prompt를 Agent 동작 로직의 일부로 설계하고, FMEA 자동화에서 Agent 실행 흐름을 구조화하여 반복·종료·예외 제어를 포함한 시스템을 구현한 경험과 직접적으로 연결됩니다. 또한 PM Agent에서 MCP 기반 도구 연동 구조를 개발하고, Virtual Company Creation Agent에서 Workflow/Graph 기반 실행 구조를 설계한 경험은 한글과컴퓨터의 "MCP 기반 기능을 지원하기 위한 안정적이고 확장 가능한 AI Agent 실행 환경을 구축"하는 목표를 충족합니다.

한글과컴퓨터의 "AI 혁신으로 함께하는 더 큰 성장"이라는 비전에 공감하며, 제가 쌓아온 AI Agent 시스템 개발 경험과 Prompt Engineering 전문성을 바탕으로 한글과컴퓨터의 B2C 서비스 확장과 다양한 MCP 기반 기능을 지원하는 안정적이고 확장 가능한 AI Agent 실행 환경 구축에 기여하고 싶습니다.

---

## 상세경력기술서 (직무 관련 경험/성과 등)

**AI Agent 또는 LLM 기반 Agent 시스템 개발 경험**

5년간 AI Agent 시스템을 설계하고 개발하며 한글과컴퓨터가 요구하는 핵심 역량을 쌓아왔습니다. FMEA 자동화 생성 시스템에서는 Claude Sub-Agent 기반 Multi-Agent Workflow를 구축하여 8개 독립 Sub-Agent가 협업하는 시스템을 설계했습니다. Master Orchestrator를 통해 Phase 0~5 자동화 워크플로우를 완전 구현했으며, 각 Sub-Agent는 R&D, Mfg, QA 등 전문 영역을 담당합니다. Claude Code Task tool을 활용하여 복잡한 FMEA 프로세스를 Sub-Agent로 분해하고, 코딩 에이전트의 역설계 시스템 구조를 적용하여 범용 리스크 분석 시스템을 구축했습니다. 이 프로젝트를 통해 AI Agent 시스템의 설계부터 구현까지 전 과정을 주도했으며, 2025.12 KSFM 학술대회에서 논문을 발표하여 학술적 검증을 완료했습니다.

Virtual Company Creation Agent에서는 225개 서브시스템을 AI 에이전트로만 구성한 가상 기업 생성 시스템을 설계했습니다. 7단계 Chain Workflow (Chain 01~07)와 14 Layer 온톨로지 좌표 체계를 통해 복잡한 비즈니스 프로세스를 구조화했으며, Decoupled Intelligence Architecture (지능과 상태의 분리)를 통해 공용 엔진 형태의 코드를 설계했습니다. Modular Execution Engine을 통해 Full/Partial/Single/Resume 모드를 지원하여 유연한 워크플로우 실행을 가능하게 했으며, Dual-Tier AI 아키텍처를 통해 최대 87% 비용 절감을 달성했습니다. 이 프로젝트를 통해 대규모 AI Agent 시스템의 설계 및 구현 능력을 확보했습니다.

**Prompt를 단순 텍스트가 아닌 Agent 동작 로직의 일부로 다루는 전문성**

프롬프트 평가 엔진(AI Gatekeeper)에서는 Prompt를 단순 텍스트가 아닌 Agent 동작 로직의 일부로 설계했습니다. 25개+ 프롬프트를 전수 평가하는 시스템으로, 모든 AI 생성물의 '입구'를 통제하는 심사관 역할을 수행합니다. 3가지 핵심 차원(Quality, Consistency, Cost) 평가 체계와 MLOps Priority Matrix 기반 가중치 시스템을 구축했으며, 특히 17가지 역할별 동적 가중치를 적용하여 다양한 사용자 시나리오에 맞는 Prompt 구조를 설계했습니다. AI가 생성한 프롬프트를 다른 AI가 평가하는 이중 검증(Double-Check) 시스템으로 오동작/루프/환각 방지 메커니즘을 구현했으며, 병렬 처리 구조(4개 메트릭 동시 평가)로 효율성을 향상시켰습니다.

FMEA 자동화 생성 시스템에서는 Prompt 구조 설계 및 운영 기준을 정립했습니다. AIAG & VDA FMEA 표준 기반 범용 리스크 분석 시스템에서 Prompt를 통해 복잡한 워크플로우를 구조화하고, 각 Sub-Agent의 역할과 책임을 명확히 정의했습니다. Prompt 구조는 역할 정의, 입력 데이터 형식, 출력 데이터 형식, 예외 처리 방법, 종료 조건 등을 포함하여 구조화되어 있으며, 반복·종료·예외 제어를 포함한 구조화된 Prompt 시스템을 구현했습니다. 각 Sub-Agent는 자신의 전문 영역에 맞는 Prompt를 받아 작업을 수행하며, Master Orchestrator는 전체 워크플로우를 조율하는 Prompt를 사용합니다.

**Agent 실행 흐름 구조화 및 Workflow/Graph 기반 실행 구조**

FMEA 자동화 생성 시스템에서 Agent 실행 흐름을 구조화하여 설계·구현했습니다. Phase 0~5까지의 체계적인 워크플로우 자동화를 통해 복잡한 FMEA 프로세스를 구조화했으며, 각 Sub-Agent의 역할과 책임을 명확히 정의했습니다. Phase 0에서는 초기 데이터 수집 및 분석, Phase 1에서는 위험 요소 식별, Phase 2에서는 위험도 평가, Phase 3에서는 대응 방안 수립, Phase 4에서는 검증 및 최적화, Phase 5에서는 최종 문서 생성까지 전 과정을 자동화했습니다. 반복·종료·예외 제어를 포함한 구조화된 실행 흐름을 구현하여 시스템의 안정성을 보장했습니다.

Virtual Company Creation Agent에서는 7단계 Chain Workflow (Chain 01~07: Foundation → Organization → Agents → System Orchestrator → Protocol → Assembly → Crystallization)를 통해 복잡한 비즈니스 프로세스를 구조화했습니다. 14 Layer 온톨로지 좌표 체계 (Strategic/Structural/Functional/Operational/Protocol)를 통해 225개 서브시스템을 효율적으로 관리하며, Modular Execution Engine을 통해 Full/Partial/Single/Resume 모드를 지원하여 유연한 워크플로우 실행을 가능하게 했습니다. Original_Development_Plan에서는 LangGraph/CrewAI 방식 워크플로우 오케스트레이션을 구현하고, 상태 기반 진행 모니터링 및 완료 조건 판단 시스템을 구축했습니다.

**MCP 기반 도구 연동 구조 개발 및 확장**

PM Agent에서 MCP (Model Context Protocol) 기반 기술 자산 관리 시스템을 구축했습니다. 32개 Python MCP 서버를 개발하여 비정형 문서(HWP, DOCX, XLSX)를 자동 파싱하는 Docker 기반 파서 서버를 구축했습니다. MCP Protocol을 통해 계약서/과업지시서 분석, 회의록 분석을 통한 타임라인 자동 현행화, 누락된 문서나 데이터 파편화 방지 등 사업 관리의 전체 라이프사이클을 관장합니다. Risk Management (계약서/과업지시서 내 독소 조항 자동 추출), Schedule Tracking (회의록 분석), Integrity Check (누락된 문서나 데이터 파편화 방지) 등 비즈니스 문제 중심 솔루션을 구현했습니다. 에이전트 간 통신을 통해 유기적 네트워크를 구축하여 내·외부 에이전트 연동이 가능한 구조를 설계했습니다.

**Agent 품질 이슈 분석 및 안정화**

프롬프트 평가 엔진에서 Agent 품질 이슈를 분석하고 안정화하는 시스템을 구축했습니다. AI가 생성한 프롬프트를 다른 AI가 평가하는 이중 검증(Double-Check) 시스템으로 오동작/루프/환각 방지 메커니즘을 구현했습니다. 3가지 핵심 차원(Quality, Consistency, Cost) 평가 체계를 통해 Prompt 변경에 따른 Agent 동작 및 품질 변화를 분석·개선하며, 운영 환경에서 이슈를 분석하고 개선으로 연결할 수 있는 문제 해결 역량을 보유하고 있습니다. Quality 차원에서는 Structural Completeness (40%), Correctness (30%), Relevancy (20%), Tone (10%)의 가중치를 적용하여 프롬프트의 구조적 완성도, 정확성, 관련성, 톤을 평가합니다.

**공용 엔진·SDK·프레임워크 형태의 코드 설계 및 유지관리**

FMEA 자동화 생성 시스템에서 공용 엔진 형태의 Master Orchestrator를 설계하고, 각 Sub-Agent가 재사용 가능한 구조로 개발했습니다. Virtual Company Creation Agent에서는 Decoupled Intelligence Architecture (지능과 상태의 분리)를 통해 공용 엔진 형태의 코드를 설계했으며, Modular Execution Engine을 통해 다양한 실행 모드를 지원하는 프레임워크를 구축했습니다. Agent 기능 확장 시 구조적 영향을 검토하고 설계 방향을 제시하는 경험을 쌓았으며, 20개 이상 설계 문서를 완료하여 구조적 영향 검토 시스템을 구축했습니다.

---

## 지원하신 직무를 잘 수행할 수 있다고 생각하는 이유를, 보유한 전문지식 및 스킬과 관련하여 기술하시오.

한글과컴퓨터 AI Agent Engineer 포지션을 잘 수행할 수 있다고 생각하는 이유는 제가 5년간 쌓아온 AI Agent 시스템 개발 경험과 Prompt Engineering 전문성이 한글과컴퓨터의 요구사항과 정확히 일치하기 때문입니다. 특히 한글과컴퓨터가 추구하는 "AI Hub Agent 엔진·SDK 설계/개선 및 유지관리", "Agent 실행 구조(Workflow/Tool/Prompt 흐름) 개발 및 고도화", "Prompt 구조 설계 및 운영 기준 정립(반복·종료·예외 제어 포함)", "Agent 품질 이슈 분석 및 안정화(오동작/루프/환각 등 대응)", "MCP 기반 도구 연동 구조 이해 및 확장"은 제가 실제로 구현한 경험과 직접적으로 연결됩니다.

**AI Agent 또는 LLM 기반 Agent 시스템 개발 전문성**

제가 보유한 AI Agent 또는 LLM 기반 Agent 시스템 개발 전문성은 한글과컴퓨터의 필수 요구사항을 충족합니다. FMEA 자동화 생성 시스템에서 Claude Sub-Agent 기반 Multi-Agent Workflow를 구축하여 8개 독립 Sub-Agent가 협업하는 시스템을 설계한 경험, Virtual Company Creation Agent에서 225개 서브시스템을 AI 에이전트로만 구성한 가상 기업 생성 시스템을 설계한 경험을 통해 AI Agent 시스템의 설계부터 구현까지 전 과정을 주도했습니다. 특히 Master Orchestrator를 설계하여 Phase 0~5 자동화 워크플로우를 완전 구현한 경험은 한글과컴퓨터의 "Agent 엔진, 런타임, 저작도구, 모델 연동 등 제품 기능의 기반이 되는 서버 기술을 설계·구현"하는 목표에 직접적으로 기여할 수 있습니다.

**Prompt를 Agent 동작 로직의 일부로 다루는 전문성**

제가 보유한 Prompt Engineering 전문성은 한글과컴퓨터의 필수 요구사항인 "Prompt를 단순 텍스트가 아닌 Agent 동작 로직의 일부로 다뤄본 경험"을 충족합니다. 프롬프트 평가 엔진에서 Prompt를 단순 텍스트가 아닌 Agent 동작 로직의 일부로 설계하고, 17가지 역할별 동적 가중치를 적용하여 다양한 사용자 시나리오에 맞는 Prompt 구조를 설계한 경험, FMEA 자동화에서 Prompt 구조 설계 및 운영 기준을 정립하고, 반복·종료·예외 제어를 포함한 구조화된 Prompt 시스템을 구현한 경험을 통해 Prompt Engineering의 실무 적용 능력을 확보했습니다. 특히 Prompt 구조는 역할 정의, 입력 데이터 형식, 출력 데이터 형식, 예외 처리 방법, 종료 조건 등을 포함하여 구조화되어 있으며, 이는 한글과컴퓨터의 "Prompt 구조 설계 및 운영 기준 정립(반복·종료·예외 제어 포함)" 요구사항과 일치합니다.

**Agent 실행 흐름 구조화 및 Workflow/Graph 기반 실행 구조 전문성**

제가 보유한 Agent 실행 흐름 구조화 및 Workflow/Graph 기반 실행 구조 전문성은 한글과컴퓨터의 필수 요구사항과 우대사항을 충족합니다. FMEA 자동화에서 Agent 실행 흐름을 구조화하여 Phase 0~5 자동화 워크플로우를 완전 구현한 경험, Virtual Company Creation Agent에서 7단계 Chain Workflow와 14 Layer 온톨로지 좌표 체계를 통해 복잡한 비즈니스 프로세스를 구조화한 경험, Original_Development_Plan에서 LangGraph/CrewAI 방식 워크플로우 오케스트레이션을 구현한 경험을 통해 Workflow/Graph 기반 실행 구조의 설계 및 구현 능력을 확보했습니다. 특히 반복·종료·예외 제어를 포함한 구조화된 실행 흐름을 구현하여 시스템의 안정성을 보장한 경험은 한글과컴퓨터의 "Agent 실행 흐름을 구조화하여 설계·구현할 수 있는 역량(반복·종료·예외 제어 포함)" 요구사항과 일치합니다.

**MCP 기반 도구 연동 구조 개발 및 확장 전문성**

제가 보유한 MCP 기반 도구 연동 구조 개발 및 확장 전문성은 한글과컴퓨터의 우대사항인 "MCP(Model Context Protocol) 기반 시스템에 대한 이해 또는 개발·연동 경험"을 충족합니다. PM Agent에서 MCP 기반 기술 자산 관리 시스템을 구축하고, 32개 Python MCP 서버를 개발하여 비정형 문서(HWP, DOCX, XLSX)를 자동 파싱하는 Docker 기반 파서 서버를 구축한 경험, MCP Protocol을 통해 계약서/과업지시서 분석, 회의록 분석을 통한 타임라인 자동 현행화 등 도구 호출 기반 실행 파이프라인을 구현한 경험을 통해 MCP 기반 시스템의 개발 및 연동 능력을 확보했습니다. 특히 에이전트 간 통신을 통해 유기적 네트워크를 구축하여 내·외부 에이전트 연동이 가능한 구조를 설계한 경험은 한글과컴퓨터의 "MCP 기반 도구 연동 구조 이해 및 확장" 요구사항에 직접적으로 기여할 수 있습니다.

**Agent 품질 이슈 분석 및 안정화 전문성**

제가 보유한 Agent 품질 이슈 분석 및 안정화 전문성은 한글과컴퓨터의 필수 요구사항인 "Agent 품질 이슈 분석 및 안정화(오동작/루프/환각 등 대응)"를 충족합니다. 프롬프트 평가 엔진에서 AI가 생성한 프롬프트를 다른 AI가 평가하는 이중 검증(Double-Check) 시스템으로 오동작/루프/환각 방지 메커니즘을 구현한 경험, 3가지 핵심 차원(Quality, Consistency, Cost) 평가 체계를 통해 Prompt 변경에 따른 Agent 동작 및 품질 변화를 분석·개선한 경험, 운영 환경에서 이슈를 분석하고 개선으로 연결할 수 있는 문제 해결 역량을 보유하고 있습니다. 특히 한글과컴퓨터의 우대사항인 "Prompt 변경에 따른 Agent 동작 및 품질 변화를 분석·개선한 경험"을 충족하며, 이는 실제로 프롬프트 평가 엔진에서 25개+ 프롬프트를 전수 평가하여 Prompt 변경에 따른 Agent 동작 및 품질 변화를 분석·개선한 경험으로 뒷받침됩니다.

**공용 엔진·SDK·프레임워크 형태의 코드 설계 및 유지관리 전문성**

제가 보유한 공용 엔진·SDK·프레임워크 형태의 코드 설계 및 유지관리 전문성은 한글과컴퓨터의 우대사항인 "공용 엔진·SDK·프레임워크 형태의 코드 설계 및 유지관리 경험"을 충족합니다. FMEA 자동화에서 공용 엔진 형태의 Master Orchestrator를 설계하고, 각 Sub-Agent가 재사용 가능한 구조로 개발한 경험, Virtual Company Creation Agent에서 Decoupled Intelligence Architecture (지능과 상태의 분리)를 통해 공용 엔진 형태의 코드를 설계하고, Modular Execution Engine을 통해 다양한 실행 모드를 지원하는 프레임워크를 구축한 경험을 통해 공용 엔진·SDK·프레임워크 형태의 코드 설계 및 유지관리 능력을 확보했습니다. 특히 Agent 기능 확장 시 구조적 영향을 검토하고 설계 방향을 제시하는 경험은 한글과컴퓨터의 "Agent 기능 확장 시 구조적 영향 검토 및 설계 방향 제시" 요구사항과 일치합니다.

**학술 연구 및 기술적 신뢰도**

10편의 학술 논문을 발표하여 기술적 전문성을 학술적으로 뒷받침했습니다. 특히 2025.12 KSFM 학술대회에서 "분석 상관/확률 네트워크 최적 경로 정보 및 공정 관리 문서 기반 FMEA 생성 연구"를 발표하여 FMEA 자동화 시스템의 학술적 검증을 완료했습니다. 이 논문에서는 상관/확률 네트워크 최적 경로 분석 기반 FMEA 자동 생성 기술을 검증하고, AMS 결과 표시 LLM agent (GPT OSS) 개발 및 포미아 납품 적용 사례를 제시했습니다. 이러한 학술 연구를 통해 단순히 솔루션을 구축하는 것에 그치지 않고, 그 기저의 알고리즘과 방법론을 학술적으로 검증받았습니다.

**결론**

제가 보유한 AI Agent 또는 LLM 기반 Agent 시스템 개발 전문성, Prompt를 Agent 동작 로직의 일부로 다루는 전문성, Agent 실행 흐름 구조화 및 Workflow/Graph 기반 실행 구조 전문성, MCP 기반 도구 연동 구조 개발 및 확장 전문성, Agent 품질 이슈 분석 및 안정화 전문성, 공용 엔진·SDK·프레임워크 형태의 코드 설계 및 유지관리 전문성은 한글과컴퓨터 AI Agent Engineer 포지션을 수행하기에 충분한 전문지식 및 스킬을 보유하고 있다고 자신합니다. 특히 한글과컴퓨터가 추구하는 "AI Hub Agent 엔진·SDK 설계/개선 및 유지관리", "Agent 실행 구조(Workflow/Tool/Prompt 흐름) 개발 및 고도화", "Prompt 구조 설계 및 운영 기준 정립(반복·종료·예외 제어 포함)", "Agent 품질 이슈 분석 및 안정화(오동작/루프/환각 등 대응)", "MCP 기반 도구 연동 구조 이해 및 확장"은 제가 실제로 구현한 경험과 직접적으로 연결됩니다.

한글과컴퓨터의 "AI 혁신으로 함께하는 더 큰 성장"이라는 비전에 공감하며, 제가 쌓아온 AI Agent 시스템 개발 경험과 Prompt Engineering 전문성을 바탕으로 한글과컴퓨터의 B2C 서비스 확장과 다양한 MCP 기반 기능을 지원하는 안정적이고 확장 가능한 AI Agent 실행 환경 구축에 기여하고 싶습니다.

---

© 2026 권순룡. All Rights Reserved.
