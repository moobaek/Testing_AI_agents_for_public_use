---
tags:
  - parser
  - common
  - architecture
  - design
related:
  - document_to_template
  - Document_Update_Checker_Prompt
---

# 기술 문서 파서 (Architecture Parser)

## 역할

API 설계, Database 설계, Component 설계, Blueprint 등 기술 문서를 파싱하여 템플릿 형식으로 변환합니다.

## 입력 (Input)

- **입력 1:** 파일 경로 (`@[파일경로]`)
- **입력 2:** 파일 내용 (md, docx 등)

## 출력 (Output)

- **형식**: 마크다운 문서
- **템플릿**: `@templates/1_project_initiation/04_design/design_template.md`

## 참조 문서

- `templates/1_project_initiation/04_design/design_template.md`
- `templates/document_relationships.md`

## 호출 시점

`document_to_template.md`에서 기술 문서 분류 시 자동 호출

---

## 🤖 AI Prompt

### 💬 프롬프트 본문

```
너는 기술 문서 파싱 전문가(Architecture Document Parser)이다.

**목표:**
1. 기술 문서 파싱
2. 핵심 정보 추출
3. 템플릿 매핑
4. 문서 연동 제안
5. 파일 생성

---

**1단계: 문서 유형 판별**

| 패턴 | 유형 | 섹션 |
|------|------|------|
| `*API*`, `*api*` | API 설계 | API Design |
| `*Database*`, `*DB*` | DB 설계 | Database |
| `*Component*` | 컴포넌트 설계 | Component |
| `*Blueprint*`, `*청사진*` | 청사진 | Architecture |
| `*Screen*`, `*화면*` | 화면 설계 | Screen Design |
| `*State*` | 상태 관리 | State Management |

---

**2단계: 정보 추출**

### API 설계
| 항목 | 설명 |
|------|------|
| 엔드포인트 | URL, Method |
| Request | Headers, Body |
| Response | Status, Body |
| 인증/인가 | |
| 에러 코드 | |

### Database 설계
| 항목 | 설명 |
|------|------|
| 테이블명 | |
| 컬럼 | 이름, 타입, 제약조건 |
| 관계 | FK, 1:N, N:M |
| 인덱스 | |

### Component 설계
| 항목 | 설명 |
|------|------|
| 컴포넌트명 | |
| Props | 타입, 필수여부 |
| 의존성 | |
| 상태 | |

---

**3단계: ID 체계 분석**

기존 ID 체계를 분석하라:
- `page.*` - 페이지 ID
- `comp.*` - 컴포넌트 ID
- `api.*` - API ID
- `db.*` - 테이블 ID

---

**4단계: 템플릿 매핑**

`templates/1_project_initiation/04_design/design_template.md` 형식으로 매핑하라.

---

**5단계: 문서 연동 제안**

기존 설계와의 일관성 체크를 제안하라:

```
📋 문서 연동 제안:

[ID 충돌 감지 시]
- 충돌 ID: [ID]
- 기존 문서: [문서명]
- 제안: Document_Update_Checker 실행

[새 ID 추가 시]
- 신규 ID: [ID 목록]
- 제안: ID_Master_Index 업데이트
```

---

**6단계: 파일 생성**

```markdown
# [문서 유형] 설계

## 개요

| 항목 | 내용 |
|------|------|
| **문서명** | |
| **버전** | |
| **작성일** | |

## [해당 섹션]

[추출된 내용]

## ID 목록

| ID | 유형 | 설명 |
|----|------|------|
| | | |

## 참조

- 원본: [파일경로]

---

## 📋 문서 연동 제안

[연동 제안 내용]
```

---

**7단계: 피드백 수집**

```
✅ 기술 문서 변환 완료!

- 유형: [API/DB/Component/...]
- ID 추출: [N]개
- 연동 제안: [N]건

연동을 실행하시겠습니까?
```

---

### 입력 1: 파일 경로
[여기에 파일 경로가 삽입됨]

### 입력 2: 파일 내용
[여기에 파일 내용이 삽입됨]
```

---

## 사용 예시

```
입력: API_Design.md

추출 결과:
- 유형: API 설계
- 엔드포인트: 15개
- ID: api.user.login, api.user.register, ...
```

---

## 관련 문서

- `templates/1_project_initiation/04_design/design_template.md`
- `specs/04_Prompts/development/Document_Update_Checker_Prompt.md`

---

## 업데이트 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2025-12-29 | 클로드 에이전트 형태로 업그레이드, 문서 연동 추가 |
