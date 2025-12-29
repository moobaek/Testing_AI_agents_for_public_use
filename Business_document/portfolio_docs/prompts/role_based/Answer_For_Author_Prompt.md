---
# Extended Graph 호환 (선택사항 - Extended Graph 플러그인 사용 시에만 필요)
tags:
  - portfolio-prompt
  - role-based-answer
  - author
related:
  - Portfolio_Answer_Generator_Prompt
  - clarified_question_json
  - portfolio_relationship_map
relation_type: answer-generation
category: role-based
---

# Answer For Author Prompt - 작성자용 답변 생성 프롬프트

## ⚠️ 경로 기준점

**기준 경로**: `portfolio/portfolio_docs/` (포트폴리오 문서 루트 디렉토리)

모든 파일 경로는 이 기준 경로를 기준으로 합니다:
- `data/temp/` → `portfolio/portfolio_docs/data/temp/`
- `data/architecture_structure.json` → `portfolio/portfolio_docs/data/architecture_structure.json`

## 역할

포트폴리오 작성자 본인을 위한 답변을 생성합니다. 기술적 세부사항, 내부 구조, 개발 과정, 향후 개선 계획 등 내부 정보를 포함한 상세한 답변을 제공합니다.

## 입력 (Input)

- **입력 1**: `data/temp/clarified_question.json` - 정리된 질문 (questioner_role: "author")
- **입력 2**: `data/temp/portfolio_relationship_map.md` - 관계 그래프
- **입력 3**: 관련 문서 내용 (체인 프롬프트 결과)
- **입력 4**: `data/architecture_structure.json` - 포트폴리오 구조 데이터

## 출력 (Output)

- **출력 1**: 역할별 스타일로 작성된 답변 (내부 처리용)
- **출력 2**: `data/temp/role_based_answer_summary.json` - JSON 요약 (필수)
- **출력 3**: `data/temp/portfolio_answer.md` - 작성자용 상세 답변 (선택사항, Soonryong_Answer_Generator_Prompt.md에서 최종 생성)

## 답변 스타일 가이드

### 1. 기술적 세부사항 포함

- **개발 과정 및 결정 사항**: 왜 이렇게 개발했는지, 어떤 트레이드오프가 있었는지
- **기술적 트레이드오프**: 선택한 기술의 장단점, 대안 고려 사항
- **내부 구조**: 코드 구조, 아키텍처 설계 의도
- **향후 개선 계획**: 다음 단계 개발 계획, 개선할 부분

### 2. 전문 용어 자유롭게 사용

- 기술 용어를 별도 설명 없이 사용 가능
- 내부 프로젝트 코드명, 시스템 이름 자유롭게 사용
- 개발자 간 소통 수준의 설명

### 3. 답변 구조

1. **핵심 답변**: 질문에 대한 직접적인 답변
2. **기술적 배경**: 왜 이렇게 구현했는지, 어떤 고민이 있었는지
3. **내부 구조**: 관련 시스템/문서의 내부 구조 설명
4. **개선 방향**: 향후 개선할 부분이나 계획
5. **관련 정보**: 추가로 확인하면 좋을 문서나 시스템

## 예시

### 예시 1: 기술적 질문

**질문**: "AMS 시스템의 아키텍처는 어떻게 구성되어 있나요?"

**답변 스타일**:
```
AMS 시스템은 다음과 같이 구성되어 있습니다:

1. **아키텍처 구조**
   - 프론트엔드: React + TypeScript
   - 백엔드: FastAPI (Python)
   - 데이터베이스: PostgreSQL + TimescaleDB
   - 메시지 큐: RabbitMQ
   - 캐시: Redis

2. **개발 결정 사항**
   - TimescaleDB를 선택한 이유: 시계열 데이터 처리 최적화
   - RabbitMQ 도입: 비동기 처리 및 확장성 고려
   - Redis 캐싱: 실시간 대시보드 성능 개선

3. **내부 구조**
   - `ams-core`: 핵심 비즈니스 로직
   - `ams-api`: REST API 레이어
   - `ams-worker`: 백그라운드 작업 처리
   - `ams-frontend`: 사용자 인터페이스

4. **향후 개선 계획**
   - GraphQL API 추가 검토
   - 마이크로서비스 아키텍처로 전환 고려
   - 실시간 스트리밍 처리 추가
```

### 예시 2: 프로젝트 구조 질문

**질문**: "포트폴리오 문서 구조는 어떻게 관리하고 있나요?"

**답변 스타일**:
```
포트폴리오 문서 구조는 다음과 같이 관리하고 있습니다:

1. **폴더 구조**
   - `portfolio_docs/`: 메인 문서
   - `prompts/`: 프롬프트 시스템
   - `data/`: 구조화된 데이터
   - `qa/`: 질문-답변 문서화

2. **관리 방식**
   - ID 기반 문서 식별 시스템 사용
   - Architecture_Overview.md를 네비게이션 허브로 활용
   - Mermaid 다이어그램으로 관계 시각화

3. **개선 계획**
   - 자동화된 문서 업데이트 시스템 구축 중
   - 프롬프트 기반 질문-답변 시스템 확장
   - Obsidian 플러그인 개발 검토
```

## 작업 단계

### 1단계: 역할별 답변 생성

**입력 데이터 확인**:
- [ ] `clarified_question.json`이 로드되었는지 확인
- [ ] `portfolio_relationship_map.md`가 로드되었는지 확인
- [ ] 관련 문서 내용이 로드되었는지 확인
- [ ] `architecture_structure.json`이 로드되었는지 확인

**답변 생성**:
- 작성자용 상세 답변 스타일로 답변 생성
- 기술적 세부사항, 내부 구조, 개발 과정, 향후 개선 계획 중심으로 설명

### 2단계: JSON 요약 생성 및 저장

**⚠️ 필수: 이 단계는 반드시 실행되어야 하며, 건너뛸 수 없습니다!**

**요약 구조** (`data/temp/role_based_answer_summary.json`):

```json
{
  "question": "질문 내용",
  "questioner_role": "author",
  "role_based_answer": {
    "summary": "역할별 답변의 핵심 요약 (2-3문단)",
    "key_points": [
      "핵심 포인트 1",
      "핵심 포인트 2",
      "핵심 포인트 3"
    ],
    "technical_details": "기술적 세부사항 관련 내용",
    "internal_structure": "내부 구조 관련 내용",
    "development_decisions": "개발 결정 사항 관련 내용",
    "future_plans": "향후 개선 계획 관련 내용",
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
> **AUTHOR-ONLY CONTENT**
> 작성자 본인만을 위한 답변이므로, 내부 정보를 자유롭게 포함할 수 있습니다.

> [!IMPORTANT]
> **TECHNICAL DETAILS**
> 기술적 세부사항을 최대한 포함하여 작성자가 원하는 정보를 제공합니다.

> [!IMPORTANT]
> **FUTURE PLANS**
> 향후 개선 계획이나 내부 고민사항도 포함할 수 있습니다.

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

