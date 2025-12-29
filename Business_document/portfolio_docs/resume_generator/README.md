# Resume Generator System - 사용 가이드

채용 공고를 입력받아 자동으로 맞춤형 이력서와 통합 포트폴리오를 생성하는 시스템입니다.

---

## 🎯 주요 기능

1. **채용 공고 자동 파싱**: 요구사항, 기술 스택, 책임 사항 추출
2. **포트폴리오 스마트 매칭**: AI가 관련 프로젝트와 경험 자동 선별
3. **맞춤형 이력서 생성**: 채용 공고에 최적화된 이력서 자동 작성
4. **통합 포트폴리오 생성**: 전체 포트폴리오를 채용 공고 맥락으로 재구성
5. **PDF 자동 변환**: Mermaid 다이어그램 포함 PDF 자동 생성

---

## 📋 사전 준비

### 1. 채용 공고 파일 준비

**위치**: `portfolio/docs/이력서 기본사항.txt`

**형식**: TXT 또는 MD 파일

**내용**:
- 회사명 및 팀 소개
- 직무 설명
- 필수 요구사항
- 우대사항
- 기술 스택
- 주요 업무

### 2. 포트폴리오 문서 확인

다음 문서들이 최신 상태인지 확인:
- `00_Team_Vision.md`
- `02_Solution_Suite.md`
- `Architecture_Overview.md`
- `04_Academic_Publications.md`

---

## 🚀 사용 방법

### 기본 사용법

**1단계: Claude Code에 요청**

```
"portfolio/docs/이력서 기본사항.txt 기반으로 이력서와 포트폴리오 만들어줘"
```

**2단계: 자동 실행**

시스템이 자동으로 다음을 수행합니다:
- ✅ Step 1: 채용 공고 파싱
- ✅ Step 2: 포트폴리오 매칭
- ✅ Step 3 & 4: 이력서 및 포트폴리오 생성 (병렬)

**3단계: 결과 확인**

생성된 파일 확인:
- `resume_generator/data/temp/resume_content.md`
- `resume_generator/data/temp/integrated_portfolio_content.md`

**4단계: 승인 후 저장**

승인하면 자동으로:
- `assets/[회사명]_이력서_[직무].md` 저장
- `assets/[회사명]_포트폴리오_통합문서.md` 저장
- PDF 파일 생성 (선택사항)

---

## 🔧 고급 사용법

### 회사명 지정

```
"토스증권 Data Engineer 이력서 만들어줘"
```

자동으로 회사명과 직무를 파싱하여 파일명에 반영합니다.

### PDF 생성

```
"이력서 PDF로도 만들어줘"
```

Mermaid 다이어그램이 포함된 PDF 파일을 자동 생성합니다.

### 특정 프로젝트 강조

```
"AMS와 FMEA 프로젝트를 중심으로 이력서 만들어줘"
```

특정 프로젝트를 우선적으로 강조하여 작성합니다.

---

## 📁 폴더 구조

```
resume_generator/
├── README.md                   # 이 파일
├── PLAN.md                     # 구현 계획서
├── prompts/
│   ├── Resume_Generator_Chain_Prompt.md       # 오케스트레이터
│   ├── 1_Parse_Job_Description.md            # Step 1
│   ├── 2_Match_Portfolio_To_Job.md           # Step 2
│   ├── 3_Generate_Resume.md                  # Step 3
│   └── 4_Generate_Integrated_Portfolio.md    # Step 4
├── templates/
│   ├── Resume_Structure_Template.md          # 이력서 템플릿
│   └── Integrated_Portfolio_Structure_Template.md  # 포트폴리오 템플릿
└── data/
    └── temp/                                  # 임시 데이터
        ├── job_description_analysis.json     # Step 1 출력
        ├── portfolio_job_matching.json       # Step 2 출력
        ├── resume_content.md                 # Step 3 출력
        └── integrated_portfolio_content.md   # Step 4 출력
```

---

## 🔄 워크플로우 상세

### Step 1: Parse Job Description

**입력**: `portfolio/docs/이력서 기본사항.txt`

**출력**: `data/temp/job_description_analysis.json`

**내용**:
- 회사/팀 정보
- 필수/우대 요구사항
- 기술 스택
- 주요 업무
- 키워드 및 강조점

### Step 2: Match Portfolio To Job

**입력**:
- `job_description_analysis.json`
- 포트폴리오 문서들

**출력**: `data/temp/portfolio_job_matching.json`

**내용**:
- 프로젝트별 relevance_score (0-100)
- 기술 스택 매칭 점수
- 필수/우대 요구사항 매칭
- Gap analysis
- 강조할 경험

### Step 3: Generate Resume (병렬)

**입력**:
- `job_description_analysis.json`
- `portfolio_job_matching.json`
- `Resume_Structure_Template.md`

**출력**: `data/temp/resume_content.md`

**특징**:
- Mermaid 다이어그램 4개 이상
- Soonryong 스타일 지원 동기
- relevance_score 순 프로젝트 배치
- 채용 공고 키워드 강조

### Step 4: Generate Integrated Portfolio (병렬)

**입력**:
- `job_description_analysis.json`
- `portfolio_job_matching.json`
- `Integrated_Portfolio_Structure_Template.md`

**출력**: `data/temp/integrated_portfolio_content.md`

**특징**:
- Mermaid 다이어그램 5개 이상
- 채용 공고 관련 프로젝트 우선 배치
- LLM 활용 방법 상세 설명
- GitHub 링크 포함

---

## ✅ 체크리스트

### 실행 전

- [ ] 채용 공고 파일 준비 완료
- [ ] 포트폴리오 문서 최신 상태 확인
- [ ] `assets/` 폴더 존재 확인

### 실행 중

- [ ] Step 1 완료 (JSON 파일 생성 확인)
- [ ] Step 2 완료 (매칭 점수 70 이상 확인)
- [ ] Step 3 & 4 완료 (Markdown 파일 생성 확인)

### 실행 후

- [ ] 생성된 이력서 내용 검토
- [ ] 생성된 포트폴리오 내용 검토
- [ ] Mermaid 다이어그램 렌더링 확인
- [ ] 승인 후 `assets/` 폴더에 저장 확인
- [ ] PDF 생성 (선택사항)

---

## 🛠️ 문제 해결

### 채용 공고 파일을 찾을 수 없습니다

**해결 방법**:
1. 파일 경로 확인: `portfolio/docs/이력서 기본사항.txt`
2. 파일 존재 여부 확인
3. 절대 경로로 직접 지정:
   ```
   "c:/Users/.../portfolio/docs/이력서 기본사항.txt 기반으로 이력서 만들어줘"
   ```

### 매칭 점수가 너무 낮습니다 (< 70)

**해결 방법**:
1. `data/temp/portfolio_job_matching.json` 확인
2. Gap Analysis 섹션 검토
3. 포트폴리오 문서 업데이트
4. 다시 실행

### Mermaid 다이어그램이 보이지 않습니다

**해결 방법**:
1. PDF 변환 도구 사용:
   ```
   node assets/convert-to-pdf.js "파일명.md" "파일명.pdf"
   ```
2. Obsidian 또는 VS Code에서 확인

### Soonryong 스타일이 적용되지 않았습니다

**해결 방법**:
1. `prompts/role_based/Soonryong_Answer_Generator_Prompt.md` 확인
2. 수동으로 평존대 스타일 (~이에요, ~거든요)로 수정
3. 다시 실행

---

## 📊 출력 예시

### 이력서 파일명

```
assets/토스증권_이력서_Data_Engineer_AI.md
assets/토스증권_이력서_Data_Engineer_AI_mermaid.pdf
```

### 포트폴리오 파일명

```
assets/토스증권_포트폴리오_통합문서.md
assets/토스증권_포트폴리오_통합문서_mermaid.pdf
```

---

## 🔗 관련 문서

- `PLAN.md` - 시스템 구현 계획서
- `prompts/Resume_Generator_Chain_Prompt.md` - 오케스트레이터 프롬프트
- `../prompts/role_based/Soonryong_Answer_Generator_Prompt.md` - Soonryong 스타일
- `../prompts/chain/` - 재사용 프롬프트 (포트폴리오 분석 체인)

---

## 💡 팁

1. **채용 공고 상세하게 작성**: 요구사항이 상세할수록 정확한 매칭
2. **포트폴리오 최신 유지**: 프로젝트 정보 항상 최신 상태로
3. **PM 역할 명시**: 프로젝트에서 PM 역할 수행 시 반드시 명시
4. **정량적 성과 포함**: 93.7%, GS 인증 등 구체적 수치 포함
5. **병렬 실행 활용**: Step 3 & 4는 자동으로 병렬 실행되어 빠름

---

## 📝 업데이트 이력

| 날짜 | 버전 | 변경 내용 |
|------|------|----------|
| 2025-12-27 | v1.0 | Resume Generator System 최초 생성 |

---

## 📞 지원

문제가 발생하면:
1. `data/temp/` 폴더의 JSON/MD 파일 확인
2. 에러 메시지 확인
3. 체크리스트 재확인

---

**생성 일시**: 2025-12-27
**작성자**: Claude Code (Sonnet 4.5)
