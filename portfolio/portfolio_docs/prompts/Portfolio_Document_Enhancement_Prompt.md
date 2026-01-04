---
# Extended Graph 호환 (선택사항 - Extended Graph 플러그인 사용 시에만 필요)
tags:
  - portfolio-prompt
  - document-enhancement
  - workflow
  # 관계 타입별 공통 태그 (선택사항 - Extended Graph 필터링용)
  - relation/calls
  - relation/generates
  - relation/enhances
related:
  - Portfolio_Question_Entry_Prompt
  - Portfolio_Document_Modification_Prompt
  - Portfolio_Documentation_Prompt
  - Architecture_Overview
relation_type: document-enhancement
category: workflow-execution

# 구조화된 관계 데이터 (필수 - Neo4j 변환용)
relations:
  - source: Portfolio_Document_Enhancement_Prompt
    relation: calls
    target: Portfolio_Question_Entry_Prompt
    type: Control
    direction: backward
  - source: Portfolio_Document_Enhancement_Prompt
    relation: enhances
    target: Architecture_Overview
    type: Enhance
    direction: forward
  - source: Portfolio_Document_Enhancement_Prompt
    relation: generates
    target: enhancement_report
    type: Generate
    direction: forward
---

# Portfolio Document Enhancement Prompt - 문서 보강 프롬프트

## ⚠️ 경로 기준점

**기준 경로**: `portfolio/portfolio_docs/` (포트폴리오 문서 루트 디렉토리)

모든 파일 경로는 이 기준 경로를 기준으로 합니다:
- 문서 파일들 → `portfolio/portfolio_docs/` 하위의 문서들
- `Architecture_Overview.md` → `portfolio/portfolio_docs/Architecture_Overview.md`

## 역할

포트폴리오 문서의 내용을 더 풍부하게 만드는 작업을 수행합니다. 기존 문서 수정과 구분되며, 문서의 가치를 높이는 보강 작업에 집중합니다.

**문서 수정 vs 문서 보강**:
- **문서 수정**: 오류 수정, 내용 변경, 구조 변경 등
- **문서 보강**: 내용 추가, 시각화 요소 추가, 링크 추가 등으로 문서의 가치를 높이는 작업

## 작업 유형

### 1. 내용 추가 (content_addition)

- 프로젝트 설명에 더 자세한 기술 스택 추가
- 섹션에 예시나 사례 추가
- 배경 정보나 컨텍스트 추가
- 성과나 결과에 대한 구체적인 수치나 데이터 추가

### 2. 시각화 추가 (visualization)

- Mermaid 다이어그램 추가
- 플로우차트나 프로세스 다이어그램 추가
- 아키텍처 다이어그램 추가
- 타임라인 시각화 추가

### 3. 링크 추가 (link_addition)

- 관련 문서 링크 추가
- 외부 리소스 링크 추가
- 프로젝트 간 관계 링크 추가
- ID 시스템 기반 참조 링크 추가

### 4. 다이어그램 추가 (diagram_addition)

- 시스템 아키텍처 다이어그램
- 데이터 플로우 다이어그램
- 프로세스 워크플로우 다이어그램
- 관계 맵 다이어그램

## 입력

- **target_document**: 보강할 문서 경로 (필수)
- **enhancement_type**: 보강 유형 (필수)
  - `content_addition`: 내용 추가
  - `visualization`: 시각화 추가
  - `link_addition`: 링크 추가
  - `diagram_addition`: 다이어그램 추가
- **target_section**: 보강할 섹션 (선택사항)
- **enhancement_description**: 보강 내용에 대한 설명 (선택사항)

## 출력

- 보강된 문서 파일
- 보강 리포트 (선택사항)
- 변경 사항 요약

## 작업 절차

1. **문서 읽기 및 분석**
   - 대상 문서 읽기
   - 현재 내용 분석
   - 보강이 필요한 부분 식별

2. **보강 작업 수행**
   - 보강 유형에 따라 적절한 작업 수행
   - 순룡 페르소나 스타일 유지
   - ID 시스템 준수
   - 문서 구조 및 형식 유지

3. **품질 검증**
   - 보강된 내용의 정확성 확인
   - 문서 일관성 확인
   - 링크 및 참조 유효성 확인

4. **변경 사항 문서화**
   - 보강 내용 요약
   - 변경 사항 리포트 생성 (선택사항)

## 규칙

1. **ID 시스템 준수**
   - 모든 ID 참조는 기존 ID 시스템 규칙을 따라야 함
   - 새로운 ID는 생성하지 않고 기존 ID만 참조

2. **순룡 페르소나 유지**
   - 공식적이지만 따뜻한 톤
   - 직접적이고 경험 중심의 표현
   - 비즈니스/기술 비유 사용

3. **문서 구조 유지**
   - 기존 문서의 구조와 형식을 유지
   - 섹션 순서 변경 지양
   - 기존 스타일 가이드 준수

4. **내용 일관성**
   - 기존 내용과 충돌하지 않도록 주의
   - 다른 문서와의 일관성 유지
   - 사실 확인 및 검증

## 예시

### 예시 1: 내용 추가

**요청**: "AMS 프로젝트 섹션에 기술 스택을 더 자세히 추가해주세요"

**처리**:
1. `02_Projects_Overview.md`의 AMS 프로젝트 섹션 확인
2. 기술 스택에 대한 상세 정보 추가
3. 각 기술의 사용 목적과 역할 설명 추가

### 예시 2: 시각화 추가

**요청**: "프로젝트 간 관계를 보여주는 다이어그램을 추가해주세요"

**처리**:
1. 프로젝트 간 관계 분석
2. Mermaid 다이어그램 생성
3. 적절한 위치에 다이어그램 삽입

### 예시 3: 링크 추가

**요청**: "각 프로젝트에 관련 문서 링크를 추가해주세요"

**처리**:
1. 각 프로젝트의 관련 문서 식별
2. ID 시스템 기반 링크 생성
3. 프로젝트 설명에 링크 추가

---

## 관련 문서

- `prompts/Portfolio_Question_Entry_Prompt.md` - 진입점 프롬프트
- `prompts/Portfolio_Document_Modification_Prompt.md` - 문서 수정 프롬프트
- `prompts/Portfolio_Documentation_Prompt.md` - 문서화 프롬프트
- `Architecture_Overview.md` - 아키텍처 개요
- `00_ID_System_Guide.md` - ID 시스템 가이드

---

## 업데이트 이력

| 날짜 | Phase | 변경 내용 |
|------|-------|----------|
| 2025-01-XX | - | 문서 보강 프롬프트 생성 |

