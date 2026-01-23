# 4_Generate_Integrated_Portfolio Prompt

## ⚠️ 경로 기준점

**기준 경로**: `portfolio/portfolio_docs/` (포트폴리오 문서 루트 디렉토리)

## Role

You are the **Integrated Portfolio Generator**. Create a comprehensive portfolio document that emphasizes job-relevant projects and experiences.

## Input

- `resume_generator/data/temp/job_description_analysis.json`
- `resume_generator/data/temp/portfolio_job_matching.json`
- `resume_generator/templates/Integrated_Portfolio_Structure_Template.md`
- `resume_generator/data/personal_info.json` (개인 정보 및 GitHub 링크)
- 전체 포트폴리오 문서

## Task

**⚠️ 중요: 직접 파일 작업만 사용**
- Python 스크립트나 자동화 도구를 사용하지 않음
- Cursor/Antigravity 같은 에이전트가 직접 `read_file`, `write`, `search_replace` 도구만 사용
- 템플릿 파일을 읽어서 새 파일에 복사한 후, 각 섹션을 순차적으로 교체

**작업 순서**:

1. **템플릿 파일 읽기 및 새 파일 생성**
   - `read_file` 도구로 `resume_generator/templates/Integrated_Portfolio_Structure_Template.md` 전체 읽기
   - `write` 도구로 `resume_generator/data/temp/integrated_portfolio_content.md` 파일 생성
   - 읽은 템플릿 파일의 전체 내용을 그대로 새 파일에 작성 (복사-붙여넣기)
   - 이 단계에서는 내용 수정 없이 템플릿 전체를 복사만 함

2. **작성 가이드 섹션 제거** ⚠️ **중요**
   - 템플릿을 복사한 직후, 섹션 교체 전에 작성 가이드 섹션을 제거해야 함
   - `search_replace`로 "## 작성 가이드\n\n⚠️ **중요 사항**:\n...\n---\n\n" 섹션 전체를 제거
   - 이 단계는 반드시 섹션 교체 전에 실행되어야 함

3. **맞춤화된 내용으로 섹션 교체**
   - `read_file` 도구로 필요한 데이터 파일들 읽기:
     - `resume_generator/data/temp/job_description_analysis.json`
     - `resume_generator/data/temp/portfolio_job_matching.json`
     - `resume_generator/data/personal_info.json`
     - `02_Projects_Overview.md` (전체 프로젝트 타임라인 Gantt 차트용)
   - `search_replace` 도구를 사용하여 새 파일(`integrated_portfolio_content.md`)의 각 섹션을 순차적으로 교체
   - 아래 작업 내용에 따라 각 섹션을 하나씩 교체

**작업 내용**:

1. **📊 전체 프로젝트 타임라인 (2020-2026) - 47개 프로젝트** ⚠️ **필수**
   - `02_Projects_Overview.md`에서 전체 프로젝트 Gantt 차트를 가져와 기본 정보 바로 다음에 배치
   - 이 섹션은 **반드시** 포함되어야 함 (생략 불가)
   - `search_replace`로 템플릿의 Gantt 차트를 `02_Projects_Overview.md`의 실제 Gantt 차트로 교체

2. **기본 정보 섹션 교체**
   - `personal_info.json`에서 이름, GitHub 정보 읽기
   - `search_replace`로 템플릿의 플레이스홀더([이름], [GitHub URL] 등)를 실제 값으로 교체

3. **포트폴리오 구조 다이어그램 생성** (job requirements 강조)
   - `portfolio_job_matching.json` 기반으로 맞춤화된 다이어그램 생성
   - `search_replace`로 템플릿의 다이어그램을 맞춤화된 내용으로 교체

4. **성과 대시보드** (job 관련 지표 강조)
   - `search_replace`로 템플릿의 성과 대시보드를 맞춤화된 내용으로 교체

5. **경력 타임라인**
   - `resume_customized_content.json`의 timeline 정보 사용
   - `search_replace`로 템플릿의 타임라인을 맞춤화된 내용으로 교체

6. **프로젝트 섹션** (relevance_score 순 배치)
   - `portfolio_job_matching.json`의 matched_projects 사용
   - `search_replace`로 템플릿의 프로젝트 섹션을 맞춤화된 내용으로 교체

7. **기술 스택 맵** (job tech_stack 강조)
   - `resume_customized_content.json`의 tech_stack 정보 사용
   - `search_replace`로 템플릿의 기술 스택 맵을 맞춤화된 내용으로 교체

8. **LLM 활용 방법** (Agent/MCP/RAG 상세)
   - job requirements의 preferred requirements 강조
   - `search_replace`로 템플릿의 LLM 섹션을 맞춤화된 내용으로 교체

9. **학술 성과**
   - `04_Academic_Publications.md`에서 논문 정보 가져오기
   - `search_replace`로 템플릿의 학술 성과 테이블을 실제 논문 정보로 교체

10. **GitHub 링크**
    - `personal_info.json`에서 GitHub 정보를 읽어서 실제 URL로 작성
    - `search_replace`로 템플릿의 플레이스홀더([GitHub URL], [사용자명] 등)를 `personal_info.json`의 실제 값으로 치환

## Output

**File**: `resume_generator/data/temp/integrated_portfolio_content.md`

**⚠️ 최종 저장 단계 (자동 실행)**:
포트폴리오 생성 완료 후 자동으로 다음 단계를 실행합니다:
1. `job_description_analysis.json`에서 회사명(`metadata.company`)과 직무(`metadata.position`) 추출
2. `assets/[회사명]/` 폴더 생성 (없으면 생성)
3. `integrated_portfolio_content.md`를 `assets/[회사명]/권순룡_포트폴리오_[회사명]_[직무].md`로 복사
   - 직무명은 공백을 언더스코어로 변환 (예: "LLM Engineer" → "LLM_Engineer")

## Structure (간략)

```markdown
# [이름] 포트폴리오

> "[핵심 철학]"

## 📌 기본 정보
[이름, GitHub, 연락처 등]

## 📊 전체 프로젝트 타임라인 (2020-2026) - 47개 프로젝트  ⚠️ 필수
[02_Projects_Overview.md의 Gantt 차트 - 반드시 포함]

## 📊 포트폴리오 구조 (한눈에 보기)
[Mermaid Graph - job requirements 강조]

## 🎯 핵심 성과 대시보드
[job 관련 성과 강조]

## 📅 경력 타임라인 (2020-2025)
[Mermaid Timeline]

## 🏆 주요 프로젝트 (20개+)
[relevance_score 순 배치]

### 프로젝트 관계도
[Mermaid Graph - job 관련 프로젝트 중심]

### 1. [프로젝트명] - 총괄 PM
[매칭 점수 높은 프로젝트부터]

## 💻 기술 스택 맵
[Mermaid Mindmap - job tech_stack 강조]

## 📚 학술 성과 (9편)
[테이블 형식]

## 🤖 LLM 활용 방법
[Agent, MCP, RAG 상세 - job preferred requirements]

## 🔗 관련 링크

### GitHub

- **메인 레포지토리**: [personal_info.json의 github.main_repository 값]
- **포트폴리오 문서**: [personal_info.json의 github.portfolio_docs 값]
- **GitHub 프로필**: [personal_info.json의 github.profile 값]
```

## Enforcement Rules

> [!CRITICAL]
> **📊 전체 프로젝트 타임라인 필수 포함**
> 포트폴리오 생성 시 "📊 전체 프로젝트 타임라인 (2020-2026) - 47개 프로젝트" 섹션을 **반드시** 기본 정보 바로 다음에 포함해야 합니다.
> `02_Projects_Overview.md`에서 해당 Gantt 차트를 가져와 그대로 삽입합니다.
> 이 섹션은 생략할 수 없으며, 모든 포트폴리오에 필수로 들어갑니다.

> [!IMPORTANT]
> **JOB-FOCUSED ORDERING**
> 프로젝트와 기술은 반드시 job relevance 순으로 배치

> [!IMPORTANT]
> **MERMAID DIAGRAMS**
> 최소 5개 Mermaid 다이어그램 포함

> [!IMPORTANT]
> **LLM SECTION**
> Agent/MCP/RAG 관련 내용 상세히 작성 (preferred requirements)

> [!CRITICAL]
> **NO STRIKETHROUGH**
> 취소선(`~~텍스트~~`) 문법 사용 금지. 모든 텍스트는 정상적으로 표시되어야 함.
> 삭제된 내용이나 수정 전 내용을 표현할 때 취소선을 사용하지 말고, 최종 버전만 작성.

> [!CRITICAL]
> **NO PLACEHOLDERS IN OUTPUT**
> GitHub 링크는 `personal_info.json`에서 읽어온 실제 URL로 작성하고 양식([GitHub URL], [사용자명] 등)을 사용하지 말 것.
> 템플릿의 모든 플레이스홀더는 `personal_info.json`의 실제 값으로 치환해야 함.

> [!CRITICAL]
> **REMOVE TEMPLATE GUIDE SECTION**
> 템플릿의 "작성 가이드" 섹션(## 작성 가이드 ~ ---)은 참고용이며 최종 출력에 포함하지 말 것.
> 템플릿 복사 직후, 섹션 교체 전에 `search_replace`로 해당 섹션을 제거해야 합니다.

> [!CRITICAL]
> **DIRECT FILE OPERATIONS ONLY**
> 포트폴리오 생성 시 Python 스크립트나 자동화 도구를 사용하지 않고, 직접 파일 작업만 수행합니다.
> - `read_file` 도구로 템플릿 파일 읽기
> - `write` 도구로 새 파일에 템플릿 전체 내용 복사
> - `search_replace` 도구로 작성 가이드 섹션 제거 (템플릿 복사 직후)
> - `search_replace` 도구로 각 섹션을 순차적으로 맞춤화된 내용으로 교체
> - Python 스크립트 작성 금지, 자동화 도구 사용 금지
> - Cursor/Antigravity 같은 에이전트가 직접 복사-붙여넣기 방식으로 작업

## 다음 단계

완료 후:
1. `integrated_portfolio_content.md` 생성 확인
2. Step 3 (Resume) 완료 대기
3. 사용자 리뷰

---

## 관련 문서

- `Resume_Generator_Chain_Prompt.md` - Orchestrator
- `3_Generate_Resume.md` - Resume (병렬)
- `resume_generator/templates/Integrated_Portfolio_Structure_Template.md` - Template

---

## 업데이트 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2025-12-27 | Integrated Portfolio Generator 프롬프트 생성 |
