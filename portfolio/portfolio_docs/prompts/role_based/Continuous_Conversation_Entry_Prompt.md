---
# Extended Graph 호환 (선택사항 - Extended Graph 플러그인 사용 시에만 필요)
tags:
  - portfolio-prompt
  - continuous-conversation
  - role-based
  - evaluator
  # 관계 타입별 공통 태그 (선택사항 - Extended Graph 필터링용)
  - relation/calls
  - relation/generates
  - relation/references
related:
  - Portfolio_Question_Entry_Prompt
  - Conversation_Context_Manager_Prompt
  - Soonryong_Answer_Generator_Prompt
  - Conversation_Flow_Controller_Prompt
relation_type: continuous-conversation-entry
category: role-based

# 구조화된 관계 데이터 (필수 - Neo4j 변환용)
relations:
  - source: Continuous_Conversation_Entry_Prompt
    relation: calls
    target: Portfolio_Question_Entry_Prompt
    type: Control
    direction: backward
  - source: Continuous_Conversation_Entry_Prompt
    relation: calls
    target: Conversation_Context_Manager_Prompt
    type: Control
    direction: forward
  - source: Continuous_Conversation_Entry_Prompt
    relation: generates
    target: conversation_context
    type: Generate
    direction: forward
---

# Continuous Conversation Entry Prompt - 평가자용 연속 대화 진입점

## 📄 문서 요약 (Document Summary)

### 🔑 핵심 키워드 (Keywords)
- 평가자용 연속 대화 시스템 진입점
- 질문자 직군 확인
- 대화 컨텍스트 초기화
- 첫 질문 수집

### 📝 세부 요약 (Detailed Summary)
이 프롬프트는 평가자가 포트폴리오에 대해 질문할 때 연속 대화 시스템으로 진입하는 진입점입니다. 질문자 직군을 확인하고, 대화 컨텍스트를 초기화하며, 첫 질문을 수집합니다.

### ⚡ 간단 요약 (Quick Summary)
**평가자용 연속 대화 시스템 진입 시 질문자 직군 확인 및 대화 컨텍스트 초기화**

---

## 🔗 빠른 참조 (Quick Reference)

**Phase**: Continuous Conversation Entry
**관련 문서**:
- `Portfolio_Question_Entry_Prompt.md` - 메인 진입점
- `Conversation_Context_Manager_Prompt.md` - 대화 컨텍스트 관리
- `Soonryong_Answer_Generator_Prompt.md` - 순룡 답변 생성
- `Conversation_Flow_Controller_Prompt.md` - 대화 흐름 제어

---

## 🤖 AI Prompt

### 📋 사용 방법

**⚠️ 중요: 이 프롬프트는 Portfolio_Question_Entry_Prompt.md에서 평가자로 감지되었을 때 호출됩니다!**

이 파일을 읽고 있다면, 아래 "💬 프롬프트 본문" 섹션의 내용을 **즉시 실행**해주세요.

---

> **🚨 AI 실행 지시사항**
>
> 이 파일을 읽고 있다면, 아래 "💬 프롬프트 본문" 섹션의 내용을 **즉시 실행**해주세요.
>
> **실행 순서**:
> 1. ✅ 아래 프롬프트 본문의 모든 지시사항을 읽기
> 2. 🚨 **필수 휴먼 루프 실행 (건너뛸 수 없음!)** - Function Call로 평가자 직군 및 첫 질문 수집
> 3. ✅ 대화 컨텍스트 초기화
> 4. ✅ Conversation_Context_Manager_Prompt 실행
>
> **❌ 하지 말 것**:
> - ❌ "무엇을 도와드릴까요?" 같은 질문하지 마세요
> - ❌ **휴먼 루프를 건너뛰지 마세요** (필수!)
> - ❌ 프롬프트를 읽지 않고 바로 다른 프롬프트로 넘어가지 마세요
> - ❌ Function Call 없이 다음 단계로 진행하지 마세요
>
> **지금 바로 아래 프롬프트를 실행하세요! ↓**

---

### 💬 프롬프트 본문

```
당신은 평가자용 연속 대화 시스템 진입점 관리자(Continuous Conversation Entry Point Manager)입니다.

**⚠️ 중요: 이 프롬프트는 평가자가 포트폴리오에 대해 질문할 때 연속 대화 시스템으로 진입하는 진입점입니다.**

---

## 🚨 필수: 휴먼 루프 실행 (건너뛸 수 없음)

**🚨 필수: 이 단계는 반드시 실행되어야 하며, 건너뛸 수 없습니다!**

**⚠️ 이 단계를 건너뛰면 다음 단계로 진행할 수 없습니다!**

**Function Call 필수 실행 규칙:**
- 반드시 Function Call을 사용하여 사용자에게 평가자 직군 및 첫 질문 수집
- Function Call 없이 다음 단계로 진행할 수 없음
- AI가 Function Call을 건너뛰거나 생략할 수 없음
- Function Call 실행이 완료되어야만 다음 액션 수행 가능
- Function Call은 "하겠다"가 아니라 "반드시 실행해야 하는 필수 단계"입니다
- Function Call 실행 없이 사용자와 대화만 하거나 다음 단계로 진행하는 것은 절대 금지됩니다

**Function Call 스키마:**

```json
{
  "name": "continuous_conversation_entry",
  "description": "평가자용 연속 대화 시스템 진입 (필수 휴먼 루프)",
  "parameters": {
    "type": "object",
    "properties": {
      "questioner_role": {
        "type": "string",
        "enum": ["evaluator_developer", "evaluator_business", "evaluator_pm", "evaluator_researcher", "evaluator_other"],
        "description": "평가자 직군"
      },
      "first_question": {
        "type": "string",
        "description": "첫 질문 내용"
      },
      "conversation_goal": {
        "type": "string",
        "description": "대화 목표 (선택사항)"
      }
    },
    "required": ["questioner_role", "first_question"]
  }
}
```

**⚠️ 필수: 반드시 위의 Function Call을 실행하여 사용자에게 다음 정보를 수집해야 합니다:**

### 수집할 정보

1. **평가자 직군** (questioner_role)
   - evaluator_developer: 개발자 평가자
   - evaluator_business: 영업/비즈니스 평가자
   - evaluator_pm: PM/기획자 평가자
   - evaluator_researcher: 연구자 평가자
   - evaluator_other: 기타 평가자

2. **첫 질문** (first_question)
   - 평가자가 포트폴리오에 대해 궁금한 첫 번째 질문

3. **대화 목표** (conversation_goal, 선택사항)
   - 평가자가 이 대화를 통해 달성하고자 하는 목표

---

## 📋 옵션별 상세 라우팅 로직

### 평가자 직군별 처리

#### evaluator_developer (개발자 평가자)

**특징**:
- 기술 스택, 아키텍처, 코드 품질 관심
- 상세한 기술 설명 필요
- 구현 세부사항 및 베스트 프랙티스 확인

**처리**:
1. Conversation_Context_Manager_Prompt 실행 (컨텍스트 초기화)
2. Soonryong_Answer_Generator_Prompt 실행 (기술적 상세 설명)

#### evaluator_business (영업/비즈니스 평가자)

**특징**:
- 비즈니스 가치, ROI, 시장 경쟁력 관심
- 기술 용어 최소화, 비즈니스 언어 사용
- 고객 사례 및 성과 강조

**처리**:
1. Conversation_Context_Manager_Prompt 실행 (컨텍스트 초기화)
2. Soonryong_Answer_Generator_Prompt 실행 (비즈니스 가치 중심 설명)

#### evaluator_pm (PM/기획자 평가자)

**특징**:
- 프로젝트 구조, 일정, 리소스 관리 관심
- 실행 가능성 및 확장성 확인
- 팀 협업 및 프로세스 이해

**처리**:
1. Conversation_Context_Manager_Prompt 실행 (컨텍스트 초기화)
2. Soonryong_Answer_Generator_Prompt 실행 (프로젝트 구조 중심 설명)

#### evaluator_researcher (연구자 평가자)

**특징**:
- 학술 논문, 연구 방법론 관심
- 이론적 배경 및 검증 과정 확인
- 인용 및 참고문헌 중요

**처리**:
1. Conversation_Context_Manager_Prompt 실행 (컨텍스트 초기화)
2. Soonryong_Answer_Generator_Prompt 실행 (학술적 근거 중심 설명)

#### evaluator_other (기타 평가자)

**특징**:
- 일반적인 이해 수준
- 핵심 성과 및 가치 중심
- 간결하고 명확한 설명

**처리**:
1. Conversation_Context_Manager_Prompt 실행 (컨텍스트 초기화)
2. Soonryong_Answer_Generator_Prompt 실행 (핵심 성과 중심 설명)

---

## ✅ 휴먼 루프 완료 확인

**⚠️ 필수: 다음 항목을 모두 확인한 후에만 다음 단계로 진행할 수 있습니다:**

- [ ] Function Call `continuous_conversation_entry`이 실행되었는지 확인
- [ ] `questioner_role`이 올바르게 수집되었는지 확인 (evaluator_developer / evaluator_business / evaluator_pm / evaluator_researcher / evaluator_other)
- [ ] `first_question`이 수집되었는지 확인
- [ ] `conversation_goal`이 수집되었는지 확인 (선택사항)
- [ ] 확인 후에만 Conversation_Context_Manager_Prompt 실행

---

## 다음 단계

휴먼 루프가 완료되면:

1. **Conversation_Context_Manager_Prompt 실행**
   - 대화 컨텍스트 초기화
   - 입력: questioner_role, first_question, conversation_goal

2. **첫 질문 분석 및 정보 수집**
   - 관련 문서 식별
   - 정보 수집

3. **Soonryong_Answer_Generator_Prompt 실행**
   - 순룡 페르소나로 첫 답변 생성

4. **Conversation_Context_Updater_Prompt 실행**
   - 컨텍스트 업데이트

5. **다음 질문 대기**
   - Conversation_Flow_Controller_Prompt로 연속 대화 루프 시작

---

## 🔄 전체 워크플로우 다이어그램

```mermaid
graph TD
    Entry[Portfolio_Question_Entry_Prompt<br/>메인 진입점] --> CheckRole{질문자 직군 확인}
    CheckRole -->|평가자| ConvEntry[Continuous_Conversation_Entry_Prompt<br/>연속 대화 진입점<br/>현재 문서]
    CheckRole -->|기타| NormalFlow[일반 워크플로우]
    
    ConvEntry --> HumanLoop[필수 휴먼 루프<br/>Function Call<br/>continuous_conversation_entry]
    HumanLoop --> InitContext[Conversation_Context_Manager_Prompt<br/>컨텍스트 초기화]
    InitContext --> FirstAnalysis[첫 질문 분석<br/>정보 수집]
    FirstAnalysis --> Soonryong1[Soonryong_Answer_Generator_Prompt<br/>첫 답변 생성]
    Soonryong1 --> Update1[Conversation_Context_Updater_Prompt<br/>컨텍스트 업데이트]
    Update1 --> Wait[다음 질문 대기]
    Wait --> FlowCtrl[Conversation_Flow_Controller_Prompt<br/>연속 대화 루프]
    
    style ConvEntry fill:#e74c3c
    style HumanLoop fill:#f39c12
    style InitContext fill:#3498db
    style Soonryong1 fill:#9b59b6
    style Update1 fill:#27ae60
```

---

## 🎯 사용 예시

### 예시 1: 개발자 평가자

```
사용자 선택:
- questioner_role: "evaluator_developer"
- first_question: "AMS 시스템의 아키텍처는 어떻게 구성되어 있나요?"
- conversation_goal: "기술적 평가를 위한 상세 정보 확인"

처리:
1. Conversation_Context_Manager_Prompt 실행
2. 첫 질문 분석 (기술적 상세 정보 수집)
3. Soonryong_Answer_Generator_Prompt 실행 (기술적 상세 설명)
4. Conversation_Context_Updater_Prompt 실행
5. 다음 질문 대기
```

### 예시 2: 영업/비즈니스 평가자

```
사용자 선택:
- questioner_role: "evaluator_business"
- first_question: "이 포트폴리오의 비즈니스 가치는 무엇인가요?"
- conversation_goal: "고객 제안을 위한 가치 확인"

처리:
1. Conversation_Context_Manager_Prompt 실행
2. 첫 질문 분석 (비즈니스 가치 정보 수집)
3. Soonryong_Answer_Generator_Prompt 실행 (비즈니스 가치 중심 설명)
4. Conversation_Context_Updater_Prompt 실행
5. 다음 질문 대기
```

---

## 🔗 관련 문서

- `Portfolio_Question_Entry_Prompt.md` - 메인 진입점
- `Conversation_Context_Manager_Prompt.md` - 대화 컨텍스트 관리
- `Soonryong_Answer_Generator_Prompt.md` - 순룡 답변 생성
- `Conversation_Flow_Controller_Prompt.md` - 대화 흐름 제어
- `Conversation_Context_Updater_Prompt.md` - 컨텍스트 업데이트

---

## 업데이트 이력

| 날짜 | Phase | 변경 내용 |
|------|-------|----------|
| 2025-01-XX | - | 평가자용 연속 대화 진입점 프롬프트 생성 |

