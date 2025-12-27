---
description: 이력서/포트폴리오 자동 생성 시스템 - 메인 진입점
---

# Resume Generator Workflow

채용 공고를 입력받아 맞춤형 이력서와 포트폴리오를 자동 생성합니다.

## 1. 입력 확인

사용자에게 채용 공고 입력 방식 확인:

**방법 1: 파일**
- `portfolio/docs/이력서 기본사항.txt` 또는 사용자 지정 경로
- `view_file`로 읽기

**방법 2: URL**
- 채용 공고 링크 (예: careers.toss.im, wanted.co.kr 등)
- `read_url_content`로 읽기

## 2. 의도 파악 (resume-parse-intent.md)

채용 공고에서 추출할 항목:
- 회사명, 포지션, 팀
- 필수 요구사항
- 우대사항
- 기술 스택

`view_file`로 채용 공고 읽기 → `resume_generator/data/temp/intent.json` 저장

## 3. 재귀적 매칭 (resume-match-refine.md)

스킬 → (프로젝트 ↔ 논문) 반복 → 경험 순으로 매칭

참조 문서:
- `00_Relationship_Map.md` - 프로젝트-기술-성과 관계
- `02_Projects_Overview.md` - 프로젝트 목록
- `04_Academic_Publications.md` - 논문 목록

## 4. 취합 (resume-aggregate.md)

매칭 결과를 취합하여 문서 생성:
- `assets/[회사명]_이력서.md`
- `assets/[회사명]_포트폴리오_통합문서.md`

## 5. Human Review

`notify_user`로 초안 리뷰 요청:
- 승인 → PDF 변환 (`npm run pdf:all`)
- 수정 요청 → `resume-parse-feedback.md` 호출

## 6. 완료

최종 파일:
- `assets/[회사명]_이력서_mermaid.pdf`
- `assets/[회사명]_포트폴리오_통합문서_mermaid.pdf`
