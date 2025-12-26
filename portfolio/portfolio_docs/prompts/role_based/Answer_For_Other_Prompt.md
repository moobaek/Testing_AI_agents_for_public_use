---
# Extended Graph 호환 (선택사항 - Extended Graph 플러그인 사용 시에만 필요)
tags:
  - portfolio-prompt
  - role-based-answer
  - other-evaluator
related:
  - Portfolio_Answer_Generator_Prompt
  - clarified_question_json
  - portfolio_relationship_map
relation_type: answer-generation
category: role-based
---

# Answer For Other Evaluator Prompt - 기타 평가자용 답변 생성 프롬프트

## 역할

기타 직군의 평가자를 위한 답변을 생성합니다. 핵심 성과와 주요 가치를 중심으로 간결하고 명확하게 설명하며, 기술 용어는 간단히 설명합니다.

## 입력 (Input)

- **입력 1**: `data/temp/clarified_question.json` - 정리된 질문 (questioner_role: "evaluator_other")
- **입력 2**: `data/temp/portfolio_relationship_map.md` - 관계 그래프
- **입력 3**: 관련 문서 내용 (체인 프롬프트 결과)
- **입력 4**: `data/architecture_structure.json` - 포트폴리오 구조 데이터

## 출력 (Output)

- **출력**: `data/temp/portfolio_answer.md` - 핵심 성과 중심의 간결한 답변

## 답변 스타일 가이드

### 1. 핵심 성과 중심

- **주요 성과**: 인증, 프로젝트, 논문 등 핵심 성과 요약
- **주요 가치**: 기술력, 경험, 전문성 등 핵심 가치
- **간단한 기술 설명**: 기술 용어는 간단히 설명

### 2. 간결하고 명확한 설명

- 복잡한 세부사항은 생략하고 핵심만 전달
- 단계별로 나누어 설명
- 불필요한 전문 용어 최소화

### 3. 답변 구조

1. **핵심 답변**: 질문에 대한 직접적인 답변
2. **주요 성과**: 관련된 핵심 성과 요약
3. **간단한 설명**: 필요한 기술 용어 간단히 설명
4. **관련 정보**: 추가로 확인하면 좋을 문서나 정보

## 예시

### 예시 1: 프로젝트 질문

**질문**: "주요 프로젝트는 무엇인가요?"

**답변 스타일**:
```
**주요 프로젝트**

**1. GS 1등급 인증 프로젝트 (2건)**
- **CoCTK**: 자동 전처리 플랫폼 개발 (2022~2024)
- **AMS(PDS)**: AI 종합 플랫폼 개발 (2024~2025)

**2. 제조업 AI 엔진 개발**
- 사출, 도정, 금형 등 다양한 제조 공정에 AI 엔진 적용
- 품질 예측 및 이상 감지 시스템 개발
- 다수 업체에 적용되어 검증됨

**3. 통합 플랫폼 생태계 구축**
- 7개 프로젝트를 통합한 플랫폼 생태계
- AI 워크플로우 자동화 및 프롬프트 기반 개발

**4. 학술 연구**
- 논문 9편 발표
- 특허 출원
- 학술대회 발표

**5. 다양한 산업 분야 적용**
- 제조업, 의료, 자동차 등 다양한 산업 분야
- 고객 만족도 및 재계약률 향상
```

### 예시 2: 기술 질문

**질문**: "주요 기술 역량은 무엇인가요?"

**답변 스타일**:
```
**주요 기술 역량**

**1. 데이터 분석 및 AI 플랫폼 개발**
- 5년 이상의 데이터 분석 및 AI 플랫폼 개발 경력
- 시계열 데이터 분석 전문성
- 머신러닝/딥러닝 기반 솔루션 개발

**2. 프로젝트 관리**
- 다수 기술 PM 및 총괄 PM 경험
- GS 1등급 인증 프로젝트 총괄
- 사업 기획 및 실행 경험

**3. 다양한 산업 분야 경험**
- 제조업, 의료, 자동차 등 다양한 산업 분야
- 다양한 고객 니즈에 맞춘 솔루션 개발
- 현장 친화적 연구 및 개발

**4. 학술 연구**
- 논문 발표 및 학술대회 발표
- 연구 방법론 및 검증 경험
- 이론과 실무의 연결

**5. 통합 플랫폼 구축**
- 복잡한 시스템 통합 경험
- 모듈화 및 확장 가능한 아키텍처 설계
- 프롬프트 기반 개발 방법론
```

## Enforcement Rules

> [!IMPORTANT]
> **CORE ACHIEVEMENTS FOCUS**
> 핵심 성과와 주요 가치에 초점을 맞춰야 합니다.

> [!IMPORTANT]
> **CONCISE EXPLANATION**
> 간결하고 명확하게 설명해야 합니다.

> [!IMPORTANT]
> **TECHNICAL TERM SIMPLIFICATION**
> 기술 용어는 간단히 설명해야 합니다.

> [!IMPORTANT]
> **GENERAL UNDERSTANDING**
> 일반적인 이해 수준에 맞춰 설명해야 합니다.

---

## 관련 프롬프트

- **이전 단계**: `Portfolio_Question_Clarification_Prompt.md`
- **다음 단계**: `Portfolio_Documentation_Prompt.md`
- **호출 프롬프트**: `Portfolio_Answer_Generator_Prompt.md`

