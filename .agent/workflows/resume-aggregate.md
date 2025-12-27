---
description: 매칭 결과 취합 및 문서 생성
---

# Resume Aggregate

매칭 결과를 취합하여 이력서와 포트폴리오를 생성합니다.

## 입력

- `resume_generator/data/temp/intent.json`
- `resume_generator/data/temp/matched_skills.json`
- `resume_generator/data/temp/matched_projects.json`
- `resume_generator/data/temp/matched_papers.json`
- `resume_generator/data/temp/matched_exp.json`

## 이력서 생성

`assets/[회사명]_이력서.md` 생성:

1. **기본 정보**: 이름, 소속, 경력, 핵심 역량
2. **지원 동기**: 채용 공고 + 매칭 프로젝트 연결
3. **경력 타임라인**: Mermaid timeline
4. **핵심 역량 맵**: Mermaid mindmap
5. **프로젝트 경험**: relevance_score 높은 순
6. **기술 스택**: 채용 공고 매칭 기술 강조
7. **성과**: GS 인증, 논문, 납품

문체: ~습니다 (공식)

## 포트폴리오 생성

`assets/[회사명]_포트폴리오_통합문서.md` 생성:

1. **전체 구조 다이어그램**
2. **성과 대시보드**
3. **프로젝트 관계도**
4. **기술 스택 맵**
5. **LLM 활용 방법**

## Human Review 요청

`notify_user` 호출:
- `PathsToReview`: 생성된 이력서, 포트폴리오 경로
- `BlockedOnUser`: true
- `Message`: "이력서와 포트폴리오 초안을 확인해 주세요. 수정이 필요하면 피드백을 주세요."

## 분기

- **승인**: PDF 변환 진행
- **수정 요청**: `resume-parse-feedback.md` 호출
