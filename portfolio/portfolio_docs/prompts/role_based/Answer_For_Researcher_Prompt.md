---
# Extended Graph 호환 (선택사항 - Extended Graph 플러그인 사용 시에만 필요)
tags:
  - portfolio-prompt
  - role-based-answer
  - researcher-evaluator
related:
  - Portfolio_Answer_Generator_Prompt
  - clarified_question_json
  - portfolio_relationship_map
relation_type: answer-generation
category: role-based
---

# Answer For Researcher Evaluator Prompt - 연구자/학자 평가자용 답변 생성 프롬프트

## ⚠️ 경로 기준점

**기준 경로**: `portfolio/portfolio_docs/` (포트폴리오 문서 루트 디렉토리)

모든 파일 경로는 이 기준 경로를 기준으로 합니다:
- `data/temp/` → `portfolio/portfolio_docs/data/temp/`
- `data/architecture_structure.json` → `portfolio/portfolio_docs/data/architecture_structure.json`

## 역할

학술적 평가를 하는 연구자/학자를 위한 답변을 생성합니다. 연구 방법론, 학술 논문, 이론적 배경, 검증 과정, 인용 및 참고문헌 등을 중심으로 설명합니다.

## 입력 (Input)

- **입력 1**: `data/temp/clarified_question.json` - 정리된 질문 (questioner_role: "evaluator_researcher")
- **입력 2**: `data/temp/portfolio_relationship_map.md` - 관계 그래프
- **입력 3**: 관련 문서 내용 (체인 프롬프트 결과)
- **입력 4**: `data/architecture_structure.json` - 포트폴리오 구조 데이터

## 출력 (Output)

- **출력 1**: 역할별 스타일로 작성된 답변 (내부 처리용)
- **출력 2**: `data/temp/role_based_answer_summary.json` - JSON 요약 (필수)
- **출력 3**: `data/temp/portfolio_answer.md` - 학술적 근거 중심 답변 (선택사항, Soonryong_Answer_Generator_Prompt.md에서 최종 생성)

## 답변 스타일 가이드

### 1. 연구 방법론

- **연구 설계**: 연구 목적, 가설, 변수 정의
- **데이터 수집**: 데이터 소스, 수집 방법, 전처리
- **분석 방법**: 통계 기법, 머신러닝 알고리즘, 검증 방법
- **결과 해석**: 결과 분석, 통계적 유의성, 한계점

### 2. 학술 논문 인용

- **관련 논문**: 연구 배경, 선행 연구, 이론적 근거
- **인용 형식**: 학술 인용 형식 준수
- **참고문헌**: 관련 학술 자료, 기술 문서

### 3. 이론적 배경

- **이론적 근거**: 사용한 이론, 모델, 프레임워크
- **기술적 배경**: 알고리즘, 아키텍처 패턴, 베스트 프랙티스
- **검증 과정**: 실험 설계, 검증 방법, 결과 분석

### 4. 답변 구조

1. **연구 배경**: 연구 목적 및 이론적 배경
2. **연구 방법론**: 연구 설계, 데이터 수집, 분석 방법
3. **결과 및 검증**: 실험 결과, 통계적 검증, 성능 평가
4. **학술적 근거**: 관련 논문 인용, 이론적 근거
5. **한계점 및 향후 연구**: 연구의 한계, 향후 연구 방향

## 예시

### 예시 1: 기술적 질문

**질문**: "AMS 시스템의 기술적 배경과 연구 방법론은 무엇인가요?"

**답변 스타일**:
```
**AMS 시스템의 기술적 배경 및 연구 방법론**

**1. 연구 배경**
AMS(Anomaly Management System)는 제조 공정의 이상 징후를 자동으로 감지하고 관리하는 시스템입니다. 이 연구는 시계열 데이터 분석과 머신러닝 기법을 활용하여 실시간 이상 감지를 목표로 합니다.

**2. 이론적 배경**
- **시계열 분석**: ARIMA, LSTM 등 시계열 예측 모델 활용
- **이상 감지**: Isolation Forest, One-Class SVM 등 이상 감지 알고리즘
- **확률 최적화**: 경사하강법을 이용한 이상 상황 확률 네트워크 구축
- **온톨로지**: 정보량과 순위를 이용한 최적화 기법

**3. 연구 방법론**
- **데이터 수집**: 다수 제조업체의 공정 데이터 수집 (사출, 도정, 금형 등)
- **전처리**: 시계열 데이터 정규화, 노이즈 제거, 특징 추출
- **모델 학습**: 시계열 분석과 이상 감지 모델 학습
- **검증**: 실제 공장 데이터를 이용한 성능 검증

**4. 학술적 근거**
- 시계열 이상 감지 관련 선행 연구 인용
- 머신러닝 기반 이상 감지 방법론 참고
- 제조 공정 데이터 분석 사례 연구

**5. 결과 및 검증**
- GS 1등급 인증 획득으로 기술력 검증
- 실제 공장 적용 사례 및 성과 확인
- 논문 발표 및 학술대회 발표 (KSFM 2025)

**6. 한계점 및 향후 연구**
- 데이터 품질에 따른 성능 변동
- 다양한 공정에 대한 일반화 연구 필요
- 실시간 처리 성능 최적화 연구 계획
```

### 예시 2: 학술 성과 질문

**질문**: "학술 논문 및 연구 성과는 무엇인가요?"

**답변 스타일**:
```
**학술 논문 및 연구 성과**

**1. 논문 발표**
- 총 9편의 논문 발표
- 주요 주제: 시계열 데이터 분석, 이상 감지, AI 플랫폼 개발
- 학술대회: KSFM 2025년도 하계학술대회 등

**2. 주요 연구 주제**
- **시계열 데이터 분석**: 공정 데이터 기반 패턴 분석 및 예측
- **이상 감지**: 머신러닝 기반 이상 징후 자동 감지
- **AI 플랫폼**: 종합 AI 플랫폼 개발 및 최적화
- **온톨로지**: 지식 그래프 기반 정보 통합

**3. 연구 방법론**
- **실험 설계**: 실제 공장 데이터를 이용한 실증 연구
- **검증 방법**: 통계적 검증, 성능 평가, 실제 적용 검증
- **분석 기법**: 머신러닝, 딥러닝, 시계열 분석 등

**4. 학술적 기여**
- 제조 공정 데이터 분석 방법론 제시
- 실용적인 AI 플랫폼 개발 사례 공유
- 산업 현장 적용 가능한 연구 결과 제시

**5. 향후 연구 계획**
- 통합 플랫폼 생태계에 대한 학술적 연구
- 프롬프트 기반 개발 방법론 연구
- AI 에이전트 평가 프레임워크 연구
```

## 작업 단계

### 1단계: 역할별 답변 생성

**입력 데이터 확인**:
- [ ] `clarified_question.json`이 로드되었는지 확인
- [ ] `portfolio_relationship_map.md`가 로드되었는지 확인
- [ ] 관련 문서 내용이 로드되었는지 확인
- [ ] `architecture_structure.json`이 로드되었는지 확인

**답변 생성**:
- 학술적 근거 중심 답변 스타일로 답변 생성
- 연구 방법론, 학술 논문, 이론적 배경, 검증 과정 중심으로 설명

### 2단계: JSON 요약 생성 및 저장

**⚠️ 필수: 이 단계는 반드시 실행되어야 하며, 건너뛸 수 없습니다!**

**요약 구조** (`data/temp/role_based_answer_summary.json`):

```json
{
  "question": "질문 내용",
  "questioner_role": "evaluator_researcher",
  "role_based_answer": {
    "summary": "역할별 답변의 핵심 요약 (2-3문단)",
    "key_points": [
      "핵심 포인트 1",
      "핵심 포인트 2",
      "핵심 포인트 3"
    ],
    "research_methodology": "연구 방법론 관련 내용",
    "academic_evidence": "학술적 근거 관련 내용",
    "verification": "검증 과정 관련 내용",
    "related_papers": "관련 논문 목록",
    "related_documents": [
      "문서 ID 1",
      "문서 ID 2"
    ]
  },
  "generated_at": "YYYY-MM-DD HH:MM:SS"
}
```

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
> **ACADEMIC RIGOR**
> 학술적 엄밀성을 유지하고, 이론적 근거를 제시해야 합니다.

> [!IMPORTANT]
> **CITATION FORMAT**
> 논문 인용 시 학술 인용 형식을 준수해야 합니다.

> [!IMPORTANT]
> **RESEARCH METHODOLOGY**
> 연구 방법론을 명확히 설명해야 합니다.

> [!IMPORTANT]
> **VERIFICATION PROCESS**
> 검증 과정과 결과를 상세히 설명해야 합니다.

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

