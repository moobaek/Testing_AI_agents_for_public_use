---
description: 피드백 파싱 및 수정 사항 정리
---

# Resume Parse Feedback

사용자 피드백을 파싱하여 수정 사항을 구조화합니다.

## 입력

- 사용자 피드백 (자연어)
- `resume_generator/data/temp/intent.json` (원래 의도)
- 현재 이력서/포트폴리오

## 처리

1. **피드백 구조화**
   - 수정 대상: 이력서 / 포트폴리오 / 둘 다
   - 수정 유형: 추가 / 삭제 / 변경 / 강조
   - 구체적 내용

2. **원래 의도 참조**
   - `intent.json`과 피드백 비교
   - 채용 공고 요구사항 재확인

3. **수정 사항 목록화**
```json
{
  "target": "resume",
  "modifications": [
    {
      "type": "add",
      "section": "프로젝트 경험",
      "content": "FMEA 프로젝트 추가 설명"
    },
    {
      "type": "change",
      "section": "지원 동기",
      "content": "Neo4j 경험 더 강조"
    }
  ]
}
```

4. **피드백 저장**
   → `resume_generator/data/temp/feedback.json`

## 다음 단계

→ `resume-aggregate.md` 재호출 (수정 사항 반영)
