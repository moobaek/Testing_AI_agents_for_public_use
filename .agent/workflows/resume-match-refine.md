---
description: 재귀적 매칭 - 스킬/프로젝트/논문/경험
---

# Resume Match Refine

스킬 → (프로젝트 ↔ 논문) 재귀 → 경험 순으로 매칭합니다.

## 입력

- `resume_generator/data/temp/intent.json`
- `00_Relationship_Map.md`

## 1. 스킬 매칭

`intent.json`의 `tech_stack`과 `requirements`에서:
- 보유 스킬 매칭 (Python, SQL, Neo4j, Kafka 등)
- 경험 연차 확인

→ `matched_skills.json` 저장

## 2. 프로젝트 ↔ 논문 재귀 루프

```
iteration = 0
do {
  // 프로젝트 매칭
  스킬 기반 관련 프로젝트 추출 (AMS, DPS, TAM_Hub 등)
  → matched_projects.json 저장
  
  // 논문 매칭
  프로젝트 검증 논문 추출
  → matched_papers.json 저장
  
  // 논문이 새 프로젝트 발견?
  논문에서 참조하는 추가 프로젝트 확인
  
  iteration++
} while (새로운 항목 있음 && iteration < 3)
```

**수렴 조건**: 프로젝트/논문 목록 변화 없음

## 3. 경험 매칭

프로젝트 + 논문으로 검증된 경험/성과:
- 납품 실적 (세아특수강, 포미아)
- GS 인증
- 성능 지표 (93.7% 정확도)

→ `matched_exp.json` 저장

## 4. State 저장

`state.json` 업데이트:
```json
{
  "iteration": 2,
  "converged": true,
  "skills_count": 10,
  "projects_count": 5,
  "papers_count": 3,
  "exp_count": 4
}
```

## 다음 단계

→ `resume-aggregate.md` 호출
