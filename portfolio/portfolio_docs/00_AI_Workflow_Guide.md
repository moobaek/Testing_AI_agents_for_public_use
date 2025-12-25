# AI 워크플로우 가이드

> [!NOTE] 문서 목적
> AI가 포트폴리오 문서를 참조하여 작업을 수행할 때 사용하는 워크플로우와 전략을 정의합니다. ID 시스템을 활용한 문서 참조, 설계 문서 기반 코드 생성, Cross-Reference 전략 등을 포함합니다.

---

## 개요

이 가이드는 AI가 포트폴리오 문서를 효율적으로 활용하여 다음 작업을 수행할 수 있도록 돕습니다:

1. **문서 생성**: 포트폴리오 문서 구조에 맞는 새 문서 생성
2. **문서 참조**: 기존 문서를 ID 기반으로 정확히 참조
3. **관계 추론**: 문서 간 관계를 자동으로 파악
4. **일관성 유지**: ID 시스템과 명명 규칙 준수

---

## ID 기반 문서 참조 전략

### 1. 문서 검색 전략

#### Quick Search Strategy

AI가 문서를 찾을 때 다음 순서로 검색:

1. **ID 직접 검색**: `page.portfolio.index` → `00_Portfolio_Index.md`
2. **타입 기반 검색**: `page.*` → 모든 페이지 문서
3. **모듈 기반 검색**: `*.portfolio.*` → 포트폴리오 관련 모든 문서
4. **키워드 검색**: 문서 내용에서 키워드 검색

**예시**:
```
사용자 요청: "포트폴리오 인덱스 문서 찾기"
AI 동작:
1. ID 검색: page.portfolio.index
2. 파일 매핑: 00_Portfolio_Index.md
3. 문서 로드 및 반환
```

### 2. 문서 간 참조 전략

#### Explicit Reference 규칙

문서 간 참조는 항상 **명시적 ID**를 사용합니다.

**올바른 참조**:
```markdown
## 관련 문서

- [[00_Portfolio_Index|포트폴리오 인덱스]] (`page.portfolio.index`)
- [[Phase_1_Foundation/Step_04_Modularization|모듈화 전략]] (`phase.foundation.step04`)
```

**잘못된 참조**:
```markdown
## 관련 문서

- 포트폴리오 인덱스 (ID 없음)
- 모듈화 전략 (ID 없음)
```

### 3. Cross-Reference Map

#### 문서 간 관계 매핑

```yaml
# 문서 간 의존 관계
page.portfolio.index:
  references:
    - page.portfolio.projects
    - page.portfolio.academic
    - page.portfolio.architecture
  referenced_by:
    - guide.id.system
    - guide.ai.workflow

phase.foundation.step04:
  references:
    - page.portfolio.architecture
  generates:
    - project.ams
    - project.dps
```

---

## 설계 문서 → 코드 생성 프로세스

### 1. 문서 기반 코드 생성 워크플로우

```mermaid
graph LR
    A[설계 문서 읽기] --> B[ID 추출]
    B --> C[의존성 분석]
    C --> D[코드 구조 생성]
    D --> E[ID 주석 추가]
    E --> F[코드 생성]
    
    style A fill:#e1f5ff
    style F fill:#e8f5e9
```

#### 단계별 프로세스

**Step 1: 설계 문서 읽기**
- `Architecture_Overview.md` 읽기
- `Phase_1_Foundation/Step_04_Modularization.md` 읽기
- 관련 설계 문서 모두 로드

**Step 2: ID 추출**
- 문서에서 모든 ID 추출
- ID 타입별 분류 (`api.*`, `service.*`, `db.*` 등)

**Step 3: 의존성 분석**
- ID 간 의존 관계 파악
- 생성 순서 결정

**Step 4: 코드 구조 생성**
- ID 기반 파일 경로 결정
- 모듈 구조 설계

**Step 5: ID 주석 추가**
- 생성된 코드에 ID 주석 추가
- 설계 문서와의 연결 명시

**Step 6: 코드 생성**
- 실제 코드 생성
- ID 기반 참조 유지

### 2. 예시: AMS 프로젝트 코드 생성

```python
# service/ams/pipeline.py
# ID: service.ams.pipeline
# 참조: Architecture_Overview.md, Phase_1_Foundation/Step_04_Modularization.md

from typing import List
from db.ams3000m import AMS3000M  # ID: db.AMS3000M
from service.ams.bayesian import BayesianAnalyzer  # ID: service.ams.bayesian

class AMSPipeline:
    """
    AMS 파이프라인 서비스
    ID: service.ams.pipeline
    의존성:
      - service.ams.bayesian
      - service.ams.fmea
      - db.AMS3000M
    """
    def __init__(self):
        self.bayesian = BayesianAnalyzer()  # ID: service.ams.bayesian
        # ...
```

---

## AI를 위한 문서 참조 가이드

### 1. 작업 유형별 참조 문서

| 작업 유형 | 주 문서 | 보조 문서 | 결과물 |
|----------|--------|----------|--------|
| 프로젝트 개요 작성 | `page.portfolio.index` | `02_Projects_Overview.md` | 프로젝트 요약 |
| Phase 문서 생성 | `Phase_1_Foundation/Step_01_Repetitive_Work.md` | `00_ID_System_Guide.md` | Phase 문서 |
| 아키텍처 설명 | `Architecture_Overview.md` | `Phase_1_Foundation/Step_04_Modularization.md` | 아키텍처 문서 |
| 평가 리포트 생성 | `templates/Evaluation_Prompt_Template.md` | 평가 프레임워크 문서 | 평가 리포트 |
| 템플릿 생성 | `templates/Project_Summary_Template.md` | `00_ID_System_Guide.md` | 새 템플릿 |

### 2. 문서 참조 체크리스트

새 문서 생성 시:

- [ ] 관련 기존 문서 확인 (`page.portfolio.*`)
- [ ] ID 시스템 가이드 참조 (`guide.id.system`)
- [ ] 관계 맵 업데이트 (`page.portfolio.relationship_map`)
- [ ] 템플릿 사용 여부 확인 (`template.*`)

기존 문서 수정 시:

- [ ] 문서 ID 확인 및 유지
- [ ] 참조하는 문서들의 ID 일관성 확인
- [ ] 관계 맵 업데이트 필요 여부 확인
- [ ] 영향받는 문서 확인

---

## AI 프롬프트 예시

### 포트폴리오 문서 생성 프롬프트

```
포트폴리오 문서를 생성해주세요.

**요구사항**:
1. ID 시스템 준수: `type.module.name` 형식 사용
2. 문서 구조: 기존 포트폴리오 문서 구조 참조
3. 관계 명시: 관련 문서와의 관계 ID 명시

**참조 문서**:
- `00_ID_System_Guide.md` (ID 시스템 규칙)
- `00_Portfolio_Index.md` (문서 구조)
- `00_Relationship_Map.md` (관계 맵)

**출력 형식**:
- 문서 헤더에 ID 메타데이터 포함
- 관련 문서 섹션에 ID 명시
- 관계 맵에 추가할 관계 정의
```

### 문서 참조 프롬프트

```
다음 ID를 가진 문서를 참조하여 작업을 수행해주세요.

**참조 문서 ID**:
- `page.portfolio.projects`
- `project.ams`
- `phase.foundation.step04`

**작업 내용**:
[작업 내용 설명]

**요구사항**:
- 참조 문서의 ID를 명시적으로 사용
- 생성된 문서에도 ID 부여
- 문서 간 관계 명시
```

---

## 문서 동기화 전략

### 1. ID 일관성 검증

AI가 문서를 생성/수정할 때:

1. **ID 형식 검증**: `type.module.name` 형식 준수 확인
2. **중복 ID 검증**: 동일 ID가 이미 존재하는지 확인
3. **의존성 검증**: 참조하는 ID가 실제로 존재하는지 확인

### 2. 관계 맵 자동 업데이트

문서 생성/수정 시:

1. 문서의 ID 추출
2. 참조하는 문서 ID 추출
3. 관계 맵에 자동 반영

**예시**:
```yaml
# 새 문서 생성 시
new_doc_id: page.portfolio.new_feature
references: [page.portfolio.index, project.ams]

# 관계 맵 자동 업데이트
page.portfolio.index:
  references:
    - page.portfolio.new_feature  # 자동 추가
```

---

## 실제 사용 시나리오

### 시나리오 1: 새 프로젝트 문서 생성

**사용자 요청**: "새 프로젝트 'XYZ' 문서 생성"

**AI 워크플로우**:
1. `02_Projects_Overview.md` 참조 (구조 파악)
2. `template.project.summary` 참조 (템플릿 사용)
3. ID 생성: `project.xyz`
4. 문서 생성 및 ID 부여
5. `02_Projects_Overview.md`에 새 프로젝트 추가
6. 관계 맵 업데이트

### 시나리오 2: Phase 문서 수정

**사용자 요청**: "Step 04 문서에 AI 프롬프트 섹션 추가"

**AI 워크플로우**:
1. `phase.foundation.step04` 문서 로드
2. `00_ID_System_Guide.md` 참조 (ID 규칙 확인)
3. 기존 문서 구조 분석
4. AI 프롬프트 섹션 추가 (ID 유지)
5. 관련 문서 링크 업데이트

---

## 체크리스트

### AI 문서 생성 시

- [ ] ID 시스템 가이드 참조 (`guide.id.system`)
- [ ] 적절한 ID 부여 (`type.module.name`)
- [ ] 관련 문서와의 관계 명시
- [ ] 관계 맵 업데이트
- [ ] 템플릿 사용 (해당 시)

### AI 문서 수정 시

- [ ] 기존 ID 유지
- [ ] 참조 문서의 ID 일관성 확인
- [ ] 영향받는 문서 확인
- [ ] 관계 맵 업데이트

---

## 관련 문서

- [[00_ID_System_Guide|ID 시스템 가이드]] - ID 명명 규칙 및 사용 방법
- [[Phase_1_Foundation/Step_04_Modularization|모듈화 전략]] - 실제 프로젝트 적용 사례
- [[00_Relationship_Map|관계 맵]] - 문서 간 관계 시각화
- [[templates/Evaluation_Prompt_Template|평가 프롬프트 템플릿]] - AI 평가 프롬프트 예시

---

> [!TIP] 빠른 참조
> - **ID 기반 검색**: `page.portfolio.*` → 모든 포트폴리오 페이지
> - **문서 참조**: 항상 ID 명시 (`page.portfolio.index`)
> - **관계 맵**: 문서 생성/수정 시 자동 업데이트

