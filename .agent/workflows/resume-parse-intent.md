---
description: 채용 공고 의도 파악 및 요구사항 추출
---

# Resume Parse Intent

채용 공고에서 핵심 의도와 요구사항을 추출합니다.

## 입력

**파일인 경우**: `view_file`로 읽기
**URL인 경우**: `read_url_content`로 읽기 (HTML → Markdown 자동 변환)

지원 사이트 예시:
- careers.toss.im
- wanted.co.kr
- programmers.co.kr
- linkedin.com/jobs

## 처리

1. `view_file`로 채용 공고 읽기

2. 다음 항목 추출:
   - **metadata**: 회사명, 포지션, 팀, 날짜
   - **requirements.essential**: 필수 요구사항
   - **requirements.preferred**: 우대사항
   - **tech_stack**: 언어, DB, 도구
   - **responsibilities**: 주요 업무

3. JSON 구조화:
```json
{
  "metadata": {
    "company": "",
    "position": "",
    "team": "",
    "timestamp": ""
  },
  "requirements": {
    "essential": [],
    "preferred": []
  },
  "tech_stack": {
    "languages": [],
    "databases": [],
    "tools": []
  },
  "responsibilities": []
}
```

## 출력

`resume_generator/data/temp/intent.json` 저장

## 다음 단계

→ `resume-match-refine.md` 호출
