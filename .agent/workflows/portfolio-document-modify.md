---
description: 포트폴리오 문서 수정 워크플로우
---

# 포트폴리오 문서 수정 워크플로우

포트폴리오 문서를 수정할 때 이 워크플로우를 따릅니다.

## 1. 수정 대상 확인

사용자에게 수정 대상을 확인:

**수정 유형**:
- `add_folder` - 새 폴더/섹션 추가
- `modify_content` - 기존 내용 수정
- `add_section` - 새 섹션 추가

**주요 수정 대상**:
| 문서 | 설명 |
|------|------|
| `Architecture_Overview.md` | 아키텍처 상세 (가장 빈번) |
| `02_Projects_Overview.md` | 프로젝트 개요 |
| `00_Personal_Profile.md` | 개인 프로필 |
| `권순룡_포트폴리오_통합문서.md` | 통합 문서 |

## 2. 수정 전 검토

// turbo
1. `view_file`로 대상 문서 현재 상태 확인
2. 수정 영향 범위 파악
3. 사용자에게 수정 계획 제시

## 3. 수정 수행

수정 방법 선택:
- 단일 영역 수정: `replace_file_content`
- 여러 영역 수정: `multi_replace_file_content`
- 전체 재작성: `write_to_file` (Overwrite: true)

## 4. 변경 리포트 생성

수정 완료 후:
1. 변경 내용 요약
2. 영향받는 관련 문서 식별
3. 추가 수정 필요 여부 확인

## 5. 관련 문서 업데이트 (필요시)

ID 시스템 기반으로 관련 문서 확인:
- `page.portfolio.*` 문서들의 참조 관계
- `project.*` 프로젝트 관련 문서
- `guide.*` 가이드 문서

---

## 주의사항

1. **메타데이터 유지**: YAML frontmatter 보존
2. **Mermaid 문법**: 따옴표로 특수문자 감싸기
3. **ID 시스템**: 문서 ID 일관성 유지
4. **업데이트 이력**: 변경 날짜/내용 기록
