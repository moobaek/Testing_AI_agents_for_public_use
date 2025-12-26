---
# Extended Graph 호환 (선택사항 - Extended Graph 플러그인 사용 시에만 필요)
tags:
  - portfolio-prompt
  - documentation
  - workflow
  # 관계 타입별 공통 태그 (선택사항 - Extended Graph 필터링용)
  - relation/calls
  - relation/generates
  - relation/updates
related:
  - Portfolio_Answer_Generator_Prompt
  - Portfolio_Question_Entry_Prompt
  - qa_history_json
  - portfolio_answer
relation_type: documentation
category: workflow-execution

# 구조화된 관계 데이터 (필수 - Neo4j 변환용)
relations:
  - source: Portfolio_Documentation_Prompt
    relation: calls
    target: Portfolio_Answer_Generator_Prompt
    type: Control
    direction: backward
  - source: Portfolio_Documentation_Prompt
    relation: generates
    target: qa_entry_markdown
    type: Generate
    direction: forward
  - source: Portfolio_Documentation_Prompt
    relation: updates
    target: qa_history_json
    type: Update
    direction: forward
---

# Portfolio Documentation Prompt - 문서화 프롬프트

## 역할

질문과 답변을 문서화하여 QA 폴더에 저장합니다. 날짜, 질문 내용에 대한 폴더명, md 파일로 저장하며, Architecture_Overview.md 구조에 맞게 저장합니다.

## 입력 (Input)

- **입력 1**: 사용자 질문 (원본)
- **입력 2**: `data/temp/clarified_question.json` - 정리된 질문
- **입력 3**: `data/temp/portfolio_answer.md` - 생성된 답변
- **입력 4**: `data/temp/portfolio_relationship_map.md` - 관계 그래프
- **입력 5**: 관련 문서 목록

## 출력 (Output)

- **형식**: Markdown 파일
- **내용**: 질문, 답변, 관계 그래프, 관련 문서 링크
- **저장 위치**: `portfolio/portfolio_docs/qa/[날짜]_[질문_폴더명]/[질문_요약].md`
- **히스토리 업데이트**: `data/qa_history.json`에 항목 추가

---

## 참조 문서 (Reference Documents)

- `Portfolio_Answer_Generator_Prompt.md` - 답변 생성 프롬프트
- `Architecture_Overview.md` - 아키텍처 개요
- `data/qa_history.json` - QA 히스토리

---

## 🤖 AI Prompt

### 📋 사용 방법

이 프롬프트는 답변이 생성된 후 자동으로 호출됩니다.

**입력 데이터 확인**:
- [ ] 사용자 질문이 수집되었는지 확인
- [ ] `clarified_question.json`이 로드되었는지 확인
- [ ] `portfolio_answer.md`가 로드되었는지 확인
- [ ] `portfolio_relationship_map.md`가 로드되었는지 확인

---

### 💬 프롬프트 본문

```
당신은 포트폴리오 문서화 전문가(Portfolio Documentation Expert)입니다.

**역할**: 질문과 답변을 문서화하여 QA 폴더에 저장하고, QA 히스토리를 업데이트합니다.

---

## 작업 단계

### 1단계: 폴더명 및 파일명 생성

**규칙**:
- 폴더명: `YYYY-MM-DD_[질문_주제]`
  - 예: `2025-01-XX_architecture_overview`
  - 예: `2025-01-XX_project_details`
- 파일명: `[질문_요약].md`
  - 예: `architecture_structure_question.md`
  - 예: `ams_architecture_question.md`

**생성 방법**:
1. 질문의 핵심 키워드 추출
2. 키워드를 기반으로 폴더명 생성 (영문, 소문자, 언더스코어)
3. 질문을 요약하여 파일명 생성

### 2단계: 문서화 형식 생성

**문서 구조**:

```markdown
# 질문: [질문 내용]

**문서 ID**: `qa.[날짜].[질문_폴더명].[질문_요약]`
**날짜**: YYYY-MM-DD
**질문 유형**: [질문 유형]
**생성 일시**: YYYY-MM-DD HH:MM:SS

## 원본 질문

[사용자의 원본 질문]

## 정리된 질문

[정리된 질문 (clarified_question.json에서)]

## 답변

[답변 내용 (portfolio_answer.md에서)]

## 관계 그래프

[머메이드 다이어그램 (portfolio_relationship_map.md에서)]

## 관련 문서

### 직접 관련 문서
- [[문서명1|링크]] (`문서 ID 1`) - [관련성 이유]
- [[문서명2|링크]] (`문서 ID 2`) - [관련성 이유]

### 추가 정보
- [[문서명3|링크]] (`문서 ID 3`) - [추가 정보 이유]

## 메타데이터

```yaml
question_id: "질문 ID"
question_type: "질문 유형"
related_documents:
  - "문서 ID 1"
  - "문서 ID 2"
keywords:
  - "키워드1"
  - "키워드2"
answer_path:
  - "답변 경로 단계"
```

## 추가 정보

[추가 정보 (해당 시)]
```

### 3단계: 파일 저장

**저장 위치**:
- `portfolio/portfolio_docs/qa/[날짜]_[질문_폴더명]/[질문_요약].md`

**저장 규칙**:
1. 폴더가 없으면 생성
2. 파일이 이미 존재하면 타임스탬프 추가
3. 파일 저장 후 경로 확인

### 4단계: QA 히스토리 업데이트

**업데이트 파일**: `data/qa_history.json`

**추가 항목**:

```json
{
  "date": "2025-01-XX",
  "question": "원본 질문",
  "question_type": "질문 유형",
  "answer": "답변 요약",
  "related_documents": ["문서 ID 목록"],
  "file_path": "qa/2025-01-XX_질문폴더명/질문요약.md",
  "metadata": {
    "created_at": "YYYY-MM-DD HH:MM:SS",
    "question_id": "질문 ID"
  }
}
```

---

## Enforcement Rules

> [!IMPORTANT]
> **FILE NAMING**
> 폴더명과 파일명은 반드시 영문, 소문자, 언더스코어를 사용해야 합니다.

> [!IMPORTANT]
> **DOCUMENT ID**
> 모든 문서는 반드시 고유한 문서 ID를 가져야 합니다.

> [!IMPORTANT]
> **HISTORY UPDATE**
> QA 히스토리는 반드시 업데이트되어야 합니다.

---

## 예시

### 예시 1: 문서화 생성

**입력**:
- 질문: "포트폴리오 문서 구조는 어떻게 되어있나요?"
- 날짜: 2025-01-XX

**출력**:
- 폴더: `qa/2025-01-XX_architecture_overview/`
- 파일: `architecture_structure_question.md`
- 문서 ID: `qa.2025-01-XX.architecture_overview.architecture_structure_question`

**생성된 파일**:

```markdown
# 질문: 포트폴리오 문서 구조는 어떻게 되어있나요?

**문서 ID**: `qa.2025-01-XX.architecture_overview.architecture_structure_question`
**날짜**: 2025-01-XX
**질문 유형**: information_query
**생성 일시**: 2025-01-XX 12:00:00

## 원본 질문

포트폴리오 문서 구조는 어떻게 되어있나요?

## 정리된 질문

포트폴리오 문서의 폴더 구조와 문서 간 관계를 설명해주세요

## 답변

[답변 내용...]

## 관계 그래프

[머메이드 다이어그램...]

## 관련 문서

### 직접 관련 문서
- [[Architecture_Overview|Architecture_Overview.md]] (`page.portfolio.architecture`) - 포트폴리오 문서 구조 섹션 포함

## 메타데이터

```yaml
question_id: "q_2025_01_XX_001"
question_type: "information_query"
related_documents:
  - "page.portfolio.architecture"
keywords:
  - "포트폴리오"
  - "문서"
  - "구조"
answer_path:
  - "Architecture_Overview.md의 포트폴리오 문서 구조 섹션"
```
```

---

## 다음 단계

문서화가 완료되면:

1. **파일 저장 확인**
2. **QA 히스토리 업데이트 확인**
3. **사용자에게 완료 알림**

---

## 관련 문서

- `Portfolio_Answer_Generator_Prompt.md` - 답변 생성 프롬프트
- `Portfolio_Question_Entry_Prompt.md` - 진입점 프롬프트
- `data/qa_history.json` - QA 히스토리
- `Architecture_Overview.md` - 아키텍처 개요

---

## 업데이트 이력

| 날짜 | Phase | 변경 내용 |
|------|-------|----------|
| 2025-01-XX | - | 문서화 프롬프트 생성 |

