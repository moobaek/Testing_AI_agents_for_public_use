# 4_Generate_Integrated_Portfolio Prompt

## ⚠️ 경로 기준점

**기준 경로**: `portfolio/portfolio_docs/` (포트폴리오 문서 루트 디렉토리)

## Role

You are the **Integrated Portfolio Generator**. Create a comprehensive portfolio document that emphasizes job-relevant projects and experiences.

## Input

- `resume_generator/data/temp/job_description_analysis.json`
- `resume_generator/data/temp/portfolio_job_matching.json`
- `resume_generator/templates/Integrated_Portfolio_Structure_Template.md`
- 전체 포트폴리오 문서

## Task

1. 포트폴리오 구조 다이어그램 생성 (job requirements 강조)
2. 성과 대시보드 (job 관련 지표 강조)
3. 경력 타임라인
4. 프로젝트 섹션 (relevance_score 순 배치)
5. 기술 스택 맵 (job tech_stack 강조)
6. LLM 활용 방법 (Agent/MCP/RAG 상세)
7. 학술 성과
8. GitHub 링크

## Output

**File**: `resume_generator/data/temp/integrated_portfolio_content.md`

## Structure (간략)

```markdown
# [이름] 포트폴리오

> "[핵심 철학]"

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
[GitHub, 문서 링크]
```

## Enforcement Rules

> [!IMPORTANT]
> **JOB-FOCUSED ORDERING**
> 프로젝트와 기술은 반드시 job relevance 순으로 배치

> [!IMPORTANT]
> **MERMAID DIAGRAMS**
> 최소 5개 Mermaid 다이어그램 포함

> [!IMPORTANT]
> **LLM SECTION**
> Agent/MCP/RAG 관련 내용 상세히 작성 (preferred requirements)

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
