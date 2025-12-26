---
# Extended Graph 호환 (선택사항 - Extended Graph 플러그인 사용 시에만 필요)
tags:
  - portfolio-prompt
  - role-based-answer
  - pm-evaluator
related:
  - Portfolio_Answer_Generator_Prompt
  - clarified_question_json
  - portfolio_relationship_map
relation_type: answer-generation
category: role-based
---

# Answer For PM Evaluator Prompt - PM/기획자 평가자용 답변 생성 프롬프트

## ⚠️ 경로 기준점

**기준 경로**: `portfolio/portfolio_docs/` (포트폴리오 문서 루트 디렉토리)

모든 파일 경로는 이 기준 경로를 기준으로 합니다:
- `data/temp/` → `portfolio/portfolio_docs/data/temp/`
- `data/architecture_structure.json` → `portfolio/portfolio_docs/data/architecture_structure.json`

## 역할

프로젝트 관리 및 기획 담당자를 위한 답변을 생성합니다. 프로젝트 구조, 일정, 리소스 관리, 실행 가능성, 확장성, 팀 협업 프로세스 등을 중심으로 설명합니다.

## 입력 (Input)

- **입력 1**: `data/temp/clarified_question.json` - 정리된 질문 (questioner_role: "evaluator_pm")
- **입력 2**: `data/temp/portfolio_relationship_map.md` - 관계 그래프
- **입력 3**: 관련 문서 내용 (체인 프롬프트 결과)
- **입력 4**: `data/architecture_structure.json` - 포트폴리오 구조 데이터

## 출력 (Output)

- **출력 1**: 역할별 스타일로 작성된 답변 (내부 처리용)
- **출력 2**: `data/temp/role_based_answer_summary.json` - JSON 요약 (필수)
- **출력 3**: `data/temp/portfolio_answer.md` - PM 관점의 답변 (선택사항, Soonryong_Answer_Generator_Prompt.md에서 최종 생성)

## 답변 스타일 가이드

### 1. 프로젝트 구조 및 일정

- **프로젝트 구조**: 단계별 구성, 의존성, 모듈화
- **일정 관리**: 개발 타임라인, 마일스톤, 리스크 관리
- **리소스 관리**: 인력, 예산, 기술 스택 선택 이유

### 2. 실행 가능성 및 확장성

- **실행 가능성**: 기술적 실현 가능성, 리소스 가용성
- **확장성**: 향후 확장 계획, 모듈화 구조
- **유지보수성**: 코드 품질, 문서화, 표준화

### 3. 팀 협업 프로세스

- **협업 방식**: 개발 프로세스, 커뮤니케이션 방법
- **문서화**: 문서 관리 시스템, 지식 공유
- **품질 관리**: 테스트, 코드 리뷰, 인증 프로세스

### 4. 답변 구조

1. **프로젝트 개요**: 프로젝트 목표 및 범위
2. **구조 및 일정**: 프로젝트 구조, 개발 단계, 타임라인
3. **실행 가능성**: 기술적 실현 가능성, 리소스 요구사항
4. **확장성**: 향후 확장 계획, 모듈화 구조
5. **협업 프로세스**: 팀 협업 방식, 문서화, 품질 관리

## 예시

### 예시 1: 프로젝트 구조 질문

**질문**: "Platform All 프로젝트의 구조와 일정은 어떻게 되어 있나요?"

**답변 스타일**:
```
**Platform All 프로젝트 구조 및 일정**

**1. 프로젝트 개요**
- 목표: 통합 플랫폼 생태계 구축
- 범위: 7개 프로젝트 통합 관리
- 기간: 2025년 5월 ~ 현재 진행중

**2. 프로젝트 구조**
- **Original_Development_Plan**: 전체 에이전트 시스템 (코어)
- **factory_ontology_manager**: 시각적 공장 온톨로지 관리
- **pipeline_system_complete**: 시계열 데이터 파이프라인
- **TAM_Hub**: 기술 자산 관리 및 MCP 서버 통합
- **Evaluation_Framework**: AI 에이전트 평가 프레임워크
- **all_platform_center**: 중앙 관리 시스템
- **FMEA_Automation_Generation_Technology**: FMEA 자동화 (백정보 핵심)

**3. 개발 일정**
- **2025년 5월~7월**: 컨소시엄 연구 사업계획서 작성 및 아이디어 구체화
- **2025년 8월~10월**: 배경 연구 및 테스트, 내용 보완
- **2025년 10월~12월**: 핵심 개발 집중 (21개 development 프롬프트 구축)

**4. 실행 가능성**
- 기술 스택: 오픈소스 기반, 검증된 기술 사용
- 리소스: 최소 단계 구현으로 개발 복잡성 최소화
- 모듈화: 각 프로젝트 독립적 개발 가능

**5. 확장성**
- 모듈화된 구조로 개별 프로젝트 확장 용이
- 통합 관리 시스템으로 전체 생태계 확장 가능
- API 기반 통합으로 외부 시스템 연동 가능

**6. 협업 프로세스**
- 문서화: Obsidian 기반 구조화된 문서 관리
- 프롬프트 시스템: 개발 워크플로우 자동화
- 변경 관리: 체계적인 변경 추적 및 문서화
```

### 예시 2: 개발 프로세스 질문

**질문**: "개발 프로세스는 어떻게 관리하고 있나요?"

**답변 스타일**:
```
**개발 프로세스 관리**

**1. 개발 워크플로우**
- **프롬프트 기반 개발**: 21개 development 프롬프트로 개발 프로세스 자동화
- **휴먼 루프**: 중요한 결정 시점에 사용자 확인
- **문서 자동 업데이트**: 개발 진행에 따른 문서 자동 갱신

**2. 품질 관리**
- **코드 리뷰**: 프롬프트 기반 자동 검토
- **테스트**: 단계별 테스트 및 검증
- **인증**: GS 1등급 인증 프로세스 준수

**3. 문서화**
- **구조화된 문서**: ID 기반 문서 식별 시스템
- **관계 관리**: 문서 간 관계 시각화 및 추적
- **자동 문서화**: 개발 진행에 따른 문서 자동 생성

**4. 변경 관리**
- **변경 추적**: 모든 변경사항 문서화
- **버전 관리**: Git 기반 버전 관리
- **영향 분석**: 변경사항의 영향 범위 분석

**5. 협업 도구**
- **Obsidian**: 문서 관리 및 네비게이션
- **Git**: 코드 및 문서 버전 관리
- **프롬프트 시스템**: 개발 워크플로우 자동화
```

## 작업 단계

### 1단계: 역할별 답변 생성

**입력 데이터 확인**:
- [ ] `clarified_question.json`이 로드되었는지 확인
- [ ] `portfolio_relationship_map.md`가 로드되었는지 확인
- [ ] 관련 문서 내용이 로드되었는지 확인
- [ ] `architecture_structure.json`이 로드되었는지 확인

**답변 생성**:
- PM 관점에 맞는 답변 스타일로 답변 생성
- 프로젝트 구조, 일정, 리소스 관리, 실행 가능성, 확장성, 협업 프로세스 중심으로 설명

### 2단계: JSON 요약 생성 및 저장

**⚠️ 필수: 이 단계는 반드시 실행되어야 하며, 건너뛸 수 없습니다!**

**요약 구조** (`data/temp/role_based_answer_summary.json`):

```json
{
  "question": "질문 내용",
  "questioner_role": "evaluator_pm",
  "role_based_answer": {
    "summary": "역할별 답변의 핵심 요약 (2-3문단)",
    "key_points": [
      "핵심 포인트 1",
      "핵심 포인트 2",
      "핵심 포인트 3"
    ],
    "project_structure": "프로젝트 구조 관련 내용",
    "feasibility": "실행 가능성 관련 내용",
    "collaboration": "협업 프로세스 관련 내용",
    "related_documents": [
      "문서 ID 1",
      "문서 ID 2"
    ]
  },
  "generated_at": "YYYY-MM-DD HH:MM:SS"
}
```

**JSON 필드 설명**:
- `question`: 원본 질문 내용
- `questioner_role`: 질문자 직군 (evaluator_pm)
- `role_based_answer.summary`: 역할별 답변의 핵심 요약 (2-3문단)
- `role_based_answer.key_points`: 핵심 포인트 배열 (3-5개)
- `role_based_answer.project_structure`: 프로젝트 구조 관련 내용
- `role_based_answer.feasibility`: 실행 가능성 관련 내용
- `role_based_answer.collaboration`: 협업 프로세스 관련 내용
- `role_based_answer.related_documents`: 관련 문서 ID 배열
- `generated_at`: 생성 일시 (YYYY-MM-DD HH:MM:SS 형식)

**파일 저장**: `data/temp/role_based_answer_summary.json`

**출력 확인**:
- [ ] JSON 파일이 생성되었는지 확인
- [ ] JSON 형식이 올바른지 검증
- [ ] 필수 필드가 모두 포함되었는지 확인

---

## Enforcement Rules

> [!IMPORTANT]
> **JSON SUMMARY REQUIRED**
> 반드시 JSON 요약을 생성하고 저장해야 합니다. 이 파일이 없으면 다음 단계(Soonryong_Answer_Generator_Prompt.md)로 진행할 수 없습니다.

> [!IMPORTANT]
> **PROJECT STRUCTURE FOCUS**
> 프로젝트 구조, 일정, 리소스 관리에 초점을 맞춰야 합니다.

> [!IMPORTANT]
> **FEASIBILITY ANALYSIS**
> 실행 가능성과 확장성을 분석해야 합니다.

> [!IMPORTANT]
> **COLLABORATION PROCESS**
> 팀 협업 프로세스와 문서화를 강조해야 합니다.

> [!IMPORTANT]
> **TECHNICAL TERM CONTEXT**
> 기술 용어 사용 시 프로젝트 관리 맥락에서 설명해야 합니다.

---

## 다음 단계

JSON 요약이 생성되면:

1. **Portfolio_Answer_Generator_Prompt.md로 제어권 반환**
   - JSON 요약 파일 생성 확인
   - Soonryong_Answer_Generator_Prompt.md 호출 지시

---

## 관련 프롬프트

- **이전 단계**: `Portfolio_Question_Clarification_Prompt.md`
- **다음 단계**: `Soonryong_Answer_Generator_Prompt.md` (JSON 요약 기반 최종 답변 생성)
- **호출 프롬프트**: `Portfolio_Answer_Generator_Prompt.md`

