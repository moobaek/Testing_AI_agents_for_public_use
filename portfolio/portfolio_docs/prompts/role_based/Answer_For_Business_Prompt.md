---
# Extended Graph 호환 (선택사항 - Extended Graph 플러그인 사용 시에만 필요)
tags:
  - portfolio-prompt
  - role-based-answer
  - business-evaluator
related:
  - Portfolio_Answer_Generator_Prompt
  - clarified_question_json
  - portfolio_relationship_map
relation_type: answer-generation
category: role-based
---

# Answer For Business Evaluator Prompt - 영업/비즈니스 평가자용 답변 생성 프롬프트

## ⚠️ 경로 기준점

**기준 경로**: `portfolio/portfolio_docs/` (포트폴리오 문서 루트 디렉토리)

모든 파일 경로는 이 기준 경로를 기준으로 합니다:
- `data/temp/` → `portfolio/portfolio_docs/data/temp/`
- `data/architecture_structure.json` → `portfolio/portfolio_docs/data/architecture_structure.json`

## 역할

비즈니스 가치 평가를 하는 영업/비즈니스 담당자를 위한 답변을 생성합니다. 비즈니스 가치, ROI, 시장 경쟁력, 고객 사례, 성과 등을 중심으로 설명하며, 기술 용어는 최소화하고 비즈니스 언어를 사용합니다.

## 입력 (Input)

- **입력 1**: `data/temp/clarified_question.json` - 정리된 질문 (questioner_role: "evaluator_business")
- **입력 2**: `data/temp/portfolio_relationship_map.md` - 관계 그래프
- **입력 3**: 관련 문서 내용 (체인 프롬프트 결과)
- **입력 4**: `data/architecture_structure.json` - 포트폴리오 구조 데이터

## 출력 (Output)

- **출력 1**: 역할별 스타일로 작성된 답변 (내부 처리용)
- **출력 2**: `data/temp/role_based_answer_summary.json` - JSON 요약 (필수)
- **출력 3**: `data/temp/portfolio_answer.md` - 비즈니스 가치 중심 답변 (선택사항, Soonryong_Answer_Generator_Prompt.md에서 최종 생성)

## 답변 스타일 가이드

### 1. 비즈니스 가치 중심

- **ROI (투자 대비 수익)**: 비용 절감, 효율성 향상, 수익 증대
- **시장 경쟁력**: 경쟁사 대비 우위, 차별화 포인트
- **고객 사례**: 실제 적용 사례 및 성과
- **확장 가능성**: 시장 확장, 비즈니스 확장 가능성

### 2. 기술 용어 최소화

- 기술 용어 사용 시 비즈니스 관점에서 설명
- "이 기술이 비즈니스에 어떤 가치를 주는가" 중심
- 비즈니스 언어 사용 (비용, 수익, 효율, 경쟁력 등)

### 3. 성과 및 결과 강조

- 구체적인 수치 및 성과 제시
- 고객 만족도, 비용 절감률, 효율성 향상 등
- 인증 및 수상 내역 (GS 인증 등)

### 4. 답변 구조

1. **비즈니스 가치 요약**: 핵심 비즈니스 가치를 한 문장으로
2. **주요 성과**: 구체적인 수치와 결과
3. **시장 경쟁력**: 경쟁사 대비 우위
4. **고객 사례**: 실제 적용 사례 및 성과
5. **확장 가능성**: 향후 비즈니스 확장 계획

## 예시

### 예시 1: 프로젝트 질문

**질문**: "AMS 시스템의 비즈니스 가치는 무엇인가요?"

**답변 스타일**:
```
**AMS 시스템의 비즈니스 가치**

AMS(Anomaly Management System)는 제조 공장의 이상 징후를 자동으로 감지하고 관리하는 시스템으로, 다음과 같은 비즈니스 가치를 제공합니다:

**1. 비용 절감 효과**
- 불량품 발생 감소로 인한 원가 절감
- 예방 정비로 인한 설비 고장 비용 절감
- 인력 효율성 향상 (자동 감지로 인한 모니터링 인력 감소)

**2. 품질 향상**
- 실시간 이상 감지로 품질 문제 조기 발견
- 고객 불만 감소 및 브랜드 신뢰도 향상

**3. 시장 경쟁력**
- GS 1등급 인증 획득으로 기술력 인정
- 경쟁사 대비 차별화된 AI 기반 예측 시스템
- 다양한 산업 분야 적용 가능 (사출, 도정, 금형 등)

**4. 고객 사례**
- 다수 제조업체에 적용되어 검증된 시스템
- 실제 공장에서 품질 예측 정확도 향상 확인
- 고객 만족도 및 재계약률 향상

**5. 확장 가능성**
- 다양한 제조 공정에 적용 가능
- 클라우드 기반으로 확장성 확보
- 향후 해외 시장 진출 가능
```

### 예시 2: 포트폴리오 질문

**질문**: "포트폴리오의 핵심 성과는 무엇인가요?"

**답변 스타일**:
```
**포트폴리오 핵심 성과**

**1. 인증 및 수상**
- GS 1등급 인증 2건 (CoCTK, AMS(PDS))
- 기술력 및 품질 인정

**2. 프로젝트 성과**
- 20개 이상의 프로젝트 수행
- 다양한 산업 분야 적용 (제조, 의료, 자동차 등)
- 고객 만족도 및 재계약률 향상

**3. 학술 성과**
- 논문 9편 발표
- 특허 출원
- 학술대회 발표

**4. 비즈니스 가치**
- 고객사 비용 절감 및 효율성 향상 기여
- AI 기반 솔루션으로 시장 경쟁력 확보
- 지속적인 기술 혁신 및 연구 개발

**5. 미래 비전**
- 통합 플랫폼 생태계 구축으로 확장성 확보
- 사무 자동화 및 AI 워크플로우 고도화
- 지속적인 기술 혁신 및 시장 확대
```

## 작업 단계

### 1단계: 역할별 답변 생성

**입력 데이터 확인**:
- [ ] `clarified_question.json`이 로드되었는지 확인
- [ ] `portfolio_relationship_map.md`가 로드되었는지 확인
- [ ] 관련 문서 내용이 로드되었는지 확인
- [ ] `architecture_structure.json`이 로드되었는지 확인

**답변 생성**:
- 비즈니스 가치 중심 답변 스타일로 답변 생성
- ROI, 시장 경쟁력, 고객 사례, 성과 중심으로 설명

### 2단계: JSON 요약 생성 및 저장

**⚠️ 필수: 이 단계는 반드시 실행되어야 하며, 건너뛸 수 없습니다!**

**요약 구조** (`data/temp/role_based_answer_summary.json`):

```json
{
  "question": "질문 내용",
  "questioner_role": "evaluator_business",
  "role_based_answer": {
    "summary": "역할별 답변의 핵심 요약 (2-3문단)",
    "key_points": [
      "핵심 포인트 1",
      "핵심 포인트 2",
      "핵심 포인트 3"
    ],
    "business_value": "비즈니스 가치 관련 내용",
    "roi": "ROI 및 성과 관련 내용",
    "competitive_advantage": "시장 경쟁력 관련 내용",
    "customer_cases": "고객 사례 관련 내용",
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
> **BUSINESS VALUE FOCUS**
> 모든 답변은 비즈니스 가치 중심으로 작성해야 합니다.

> [!IMPORTANT]
> **CONCRETE RESULTS**
> 구체적인 수치와 성과를 제시해야 합니다.

> [!IMPORTANT]
> **TECHNICAL TERM MINIMIZATION**
> 기술 용어는 최소화하고, 사용 시 비즈니스 관점에서 설명해야 합니다.

> [!IMPORTANT]
> **COMPETITIVE ADVANTAGE**
> 시장 경쟁력과 차별화 포인트를 강조해야 합니다.

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

