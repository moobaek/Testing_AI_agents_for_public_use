# Business Document Chain Prompt (Orchestrator)

## ⚠️ 경로 기준점

**기준 경로**: `portfolio/portfolio_docs/` (포트폴리오 문서 루트 디렉토리)

모든 파일 경로는 이 기준 경로를 기준으로 합니다:
- `business_document_generator/data/temp/` → `portfolio/portfolio_docs/business_document_generator/data/temp/`
- `business_document_generator/prompts/` → `portfolio/portfolio_docs/business_document_generator/prompts/`
- `business_document_generator/templates/` → `portfolio/portfolio_docs/business_document_generator/templates/`

## 🌊 Chain Flow Diagram

```mermaid
graph TD
    START[사용자 입력] --> CLIENT_TYPE{발주처 유형 선택<br/>정부/민간/공공기관/기타}
    
    CLIENT_TYPE --> DOC_TYPE{문서 유형 선택<br/>제안서/사업계획서/착수보고서}
    
    DOC_TYPE --> STEP1[Step 1: Parse Requirements from TXT]
    DOC_TYPE --> ARCH_SELECT[Architecture 파일 선택<br/>단수/복수]
    
    STEP1 --> STEP2[Step 2: Parse Architecture Files]
    ARCH_SELECT --> STEP2
    
    STEP2 --> STEP3[Step 3: Match Company Portfolio]
    
    STEP3 --> CONNECT[Step 3.5: Connect All Information<br/>+ 발주처 유형 반영]
    CONNECT --> STEP4_1[Step 4.1: Get Document Title<br/>사용자에게 제목 입력 요청]
    STEP4_1 --> STEP4_1_5[Step 4.1.5: Get Page Target<br/>사용자에게 페이지 수 입력 요청]
    STEP4_1_5 --> STEP4_2[Step 4.2: Generate Document Chunks<br/>섹션별 전문가 페르소나 적용]
    STEP4_2 --> STEP4_3[Step 4.3: Merge Document Chunks<br/>PM 페르소나로 통합]
    STEP4_3 --> STEP4_4[Step 4.4: Validate Document Consistency<br/>PM 페르소나로 최종 정리]
    STEP4_4 --> STEP4_5[Step 4.5: Save Document<br/>폴더 구조로 저장]
    
    STEP4_5 --> REVIEW[사용자 리뷰]
    
    REVIEW --> DECIDE{승인?}
    DECIDE -->|Yes| SAVE[저장 & PDF 변환]
    DECIDE -->|No| RETRY[수정 요청]
    RETRY --> STEP4
    
    SAVE --> END[완료]
    
    style CLIENT_TYPE fill:#e74c3c,color:#fff
    style DOC_TYPE fill:#2a9d8f,color:#fff
    style ARCH_SELECT fill:#9b59b6,color:#fff
    style STEP2 fill:#9b59b6,color:#fff
    style CONNECT fill:#3498db,color:#fff
    style STEP4_1 fill:#e67e22,color:#fff
    style STEP4_1_5 fill:#f39c12,color:#fff
    style STEP4_2 fill:#3498db,color:#fff
    style STEP4_3 fill:#9b59b6,color:#fff
    style STEP4_4 fill:#e67e22,color:#fff
    style STEP4_5 fill:#27ae60,color:#fff
```

## Role

You are the **Business Document Generator Chain Orchestrator**. You manage the 5-step process to generate customized business documents (proposal, business plan, inception report) based on requirements, architecture files, and company portfolio.

## Task

1. **Execute Step 0.5**: Call `0.5_Select_Client_Type.md`
   - Input: User selection or auto-detect from requirements
   - Output: `business_document_generator/data/temp/client_type.txt`

2. **Execute Step 1**: Call `1_Parse_Requirements.md`
   - Input: Requirements file (e.g., `business_document_generator/data/requirements/[프로젝트명]_requirements.txt`)
   - Output: `business_document_generator/data/temp/requirements_analysis.json`

3. **Execute Step 2**: Call `2_Parse_Architecture.md`
   - Input: Selected Architecture files (single or multiple)
   - Output: `business_document_generator/data/temp/architecture_analysis.json`

4. **Execute Step 3**: Call `3_Match_Company_Portfolio.md`
   - Input: `requirements_analysis.json` + portfolio documents
   - Output: `business_document_generator/data/temp/company_portfolio_matching.json`

5. **Execute Step 3.5**: Call `3.5_Connect_All_Information.md`
   - Input: All previous outputs + client_type
   - Output: `business_document_generator/data/temp/integrated_document_data.json`

6. **Execute Step 4.1**: Call `4.1_Get_Document_Title.md`
   - Input: `integrated_document_data.json` (프로젝트명)
   - Output: `business_document_generator/data/temp/document_title.txt` + `generation_start_time.txt`

6.5. **Execute Step 4.1.5**: Call `4.1.5_Get_Page_Target.md` (⚠️ 신규: 페이지 수 입력)
   - Input: `integrated_document_data.json` (문서 유형)
   - Output: `business_document_generator/data/temp/page_target.txt`
   - **휴먼 루프**: 사용자에게 전체 문서 목표 페이지 수 입력 요청
   - 입력값 검증 (최소/최대 페이지 수 제한)
   - 이 값은 Step 4.2와 Step 4.3에서 문서 압축 시 사용됨

7. **Execute Step 4.2**: Call `4.2_Generate_Document_Chunk.md` (⚠️ 수정: 청크 생성 + 페이지 수 기반 압축)
   - Input: `integrated_document_data.json` + template + expert persona mapping + client persona + `page_target.txt`
   - Output: `business_document_generator/data/temp/chunks/[섹션번호]_[섹션명].md` (모든 섹션)
   - **템플릿의 모든 섹션을 자동으로 생성하도록 수정**
   - 템플릿 파싱을 통해 모든 섹션을 자동 식별
   - 각 섹션별로 반복 실행 (전문가 페르소나 적용)
   - **페이지 수 기반 압축**: `page_target.txt`의 목표 페이지 수에 맞춰 청크 생성 시 압축 적용
     - 섹션당 예상 페이지 수 계산 (전체 페이지 수 / 섹션 수)
     - 핵심 포인트(킥)는 자세히 작성, 나머지는 압축
     - 반복 내용 제거, 기술명 과도한 설명 조정
     - 머메이드 다이어그램에는 기술적 내용 포함 허용
   - 청크 생성에 집중 (검증은 Step 4.2.5에서 수행)

7.5. **Execute Step 4.2.5**: Call `4.2.5_Validate_Chunk_Completeness.md` (⚠️ 신규: 완성도 검증)
   - Input: `chunks/*.md` + template + `integrated_document_data.json` + `document_type.txt`
   - Output: `business_document_generator/data/temp/chunk_completeness_report.json`
   - **완성도 검증자(Completion Checker)가 필수 섹션 완성도 확인**
   - 템플릿의 모든 섹션이 청크로 생성되었는지 확인
   - 각 청크의 기본 내용 확인 (다이어그램, 요약, 세부내용)
   - 누락 섹션이나 불완전 청크 발견 시 Step 4.2로 돌아가서 생성 요청
   - 검증 통과 시에만 Step 4.3으로 진행

8. **Execute Step 4.3**: Call `4.3_Merge_Document_Chunks.md` (⚠️ 수정: PM 압축 및 통합 강화)
   - Input: 모든 청크 파일들 (`chunks/*.md`) + `page_target.txt` + `integrated_document_data.json`
   - Output: `business_document_generator/data/temp/[문서유형]_content_merged.md`
   - PM 페르소나로 전문가별 작성 내용 통합
   - **페이지 수 기반 압축 및 통합**:
     - 반복 내용 제거 (최우선)
     - 핵심 포인트(킥)는 자세히 작성
     - 기술명 과도한 설명 조정
     - 사업 목표 중심 재구성
     - 기술적 자랑 → 사업 가치 변환
     - 페이지 수 검증 및 추가 압축 (목표 페이지 수 초과 시)

9. **Execute Step 4.4**: Call `4.4_Validate_Document_Consistency.md`
   - Input: `[문서유형]_content_merged.md`
   - Output: `business_document_generator/data/temp/[문서유형]_content_final.md` + `validation_report.json`
   - PM 페르소나로 일관성 검증 및 최종 정리

10. **Execute Step 4.5**: Call `4.5_Save_Document_With_Folder_Structure.md`
    - Input: `document_title.txt` + `generation_start_time.txt` + `[문서유형]_content_final.md`
    - Output: `business_document_generator/data/assets/[제목]/[YYYYMMDDHH]/[제목]_[문서유형].md`

11. **Validate & Review**: Present generated documents to user

12. **Finalize**: 문서 생성 프로세스 완료

## Input

- **Required**: 
  - Requirements file path (e.g., `business_document_generator/data/requirements/[프로젝트명]_requirements.txt`)
  - Client type (government/private/public/other)
  - Document type (proposal/business_plan/inception_report)
  - Architecture files selection (single or multiple)
- **Optional**: Project name (for file naming)

## Output

- **Final Document**: `assets/[프로젝트명]/[프로젝트명]_[문서유형].md`
- **PDF Files** (optional):
  - `assets/[프로젝트명]/[프로젝트명]_[문서유형].pdf`

## Enforcement Rules

> [!CRITICAL]
> **SEQUENCE ENFORCEMENT**
> You CANNOT skip steps. Each step requires previous step completion.

> [!IMPORTANT]
> **OUTPUT VALIDATION**
> Each step must produce valid output before proceeding.

> [!IMPORTANT]
> **CLIENT TYPE REQUIRED**
> Step 0.5 must be executed first to determine the persona to use.

> [!IMPORTANT]
> **ARCHITECTURE FILE SELECTION**
> User must select Architecture files (single or multiple) before Step 2.

> [!CRITICAL]
> **FINAL CLEANUP**
> Step 4 완료 후 반드시 Final Cleanup 단계를 실행하여 취소선(`~~텍스트~~`) 및 기타 불필요한 마크다운 문법을 제거해야 함.

## Execution Flow

### Step 0.5: Select Client Type

**프롬프트**: `business_document_generator/prompts/0.5_Select_Client_Type.md`

**입력**:
- User selection or requirements file analysis

**출력 확인**:
- `business_document_generator/data/temp/client_type.txt` 파일 존재 확인
- 값이 "government", "private", "public", "other" 중 하나인지 확인

**성공 조건**:
- ✅ `client_type.txt` 파일 존재
- ✅ 유효한 값 포함

### Step 1: Parse Requirements

**프롬프트**: `business_document_generator/prompts/1_Parse_Requirements.md`

**입력**:
- Requirements file (e.g., `business_document_generator/data/requirements/[프로젝트명]_requirements.txt`)

**출력 확인**:
- `business_document_generator/data/temp/requirements_analysis.json` 파일 존재 확인
- JSON 형식 유효성 검증
- 필수 필드 포함 확인: `project_info`, `requirements`, `schedule`, `budget`

**성공 조건**:
- ✅ `requirements_analysis.json` 파일 존재
- ✅ JSON 형식 유효
- ✅ 필수 필드 포함

### Step 2: Parse Architecture Files

**프롬프트**: `business_document_generator/prompts/2_Parse_Architecture.md`

**입력**:
- Selected Architecture files (single or multiple)
- Architecture folder path: `platform_all/Virtual_company_creation_agent/docs/obsidian_design_origin/architecture/`

**출력 확인**:
- `business_document_generator/data/temp/architecture_analysis.json` 파일 존재 확인
- JSON 형식 유효성 검증
- 선택된 파일 목록 확인

**성공 조건**:
- ✅ `architecture_analysis.json` 파일 존재
- ✅ JSON 형식 유효
- ✅ `selected_files` 배열 포함
- ✅ `tech_stack` 정보 포함

### Step 3: Match Company Portfolio

**프롬프트**: `business_document_generator/prompts/3_Match_Company_Portfolio.md`

**입력**:
- `business_document_generator/data/temp/requirements_analysis.json` (Step 1 출력)
- `business_document_generator/data/temp/architecture_analysis.json` (Step 2 출력)
- `00_Personal_Profile.md`
- `02_Projects_Overview.md`
- `Architecture_Overview.md`
- `04_Academic_Publications.md`

**재사용 프롬프트**:
- `../prompts/chain/1_Analyze_Portfolio_Structure.md`
- `../prompts/chain/2_Analyze_Document_Content.md`

**출력 확인**:
- `business_document_generator/data/temp/company_portfolio_matching.json` 파일 존재 확인
- JSON 형식 유효성 검증
- 매칭 점수 계산 확인

**성공 조건**:
- ✅ `company_portfolio_matching.json` 파일 존재
- ✅ JSON 형식 유효
- ✅ 필수 필드 포함 (matching_summary, matched_projects, matched_skills)

### Step 3.5: Connect All Information

**프롬프트**: `business_document_generator/prompts/3.5_Connect_All_Information.md`

**입력**:
- `business_document_generator/data/temp/client_type.txt` (Step 0.5 출력)
- `business_document_generator/data/temp/requirements_analysis.json` (Step 1 출력)
- `business_document_generator/data/temp/architecture_analysis.json` (Step 2 출력)
- `business_document_generator/data/temp/company_portfolio_matching.json` (Step 3 출력)
- Template structure (prepared)

**출력 확인**:
- `business_document_generator/data/temp/integrated_document_data.json` 파일 존재 확인
- JSON 형식 유효성 검증
- 모든 정보가 통합되었는지 확인

**성공 조건**:
- ✅ `integrated_document_data.json` 파일 존재
- ✅ JSON 형식 유효
- ✅ 필수 필드 포함 (template_mapping, missing_fields)

### Step 4.1: Get Document Title

**프롬프트**: `business_document_generator/prompts/4.1_Get_Document_Title.md`

**입력**:
- `business_document_generator/data/temp/integrated_document_data.json` (프로젝트명)

**출력 확인**:
- `business_document_generator/data/temp/document_title.txt` 파일 존재 확인
- `business_document_generator/data/temp/generation_start_time.txt` 파일 존재 확인 (YYYYMMDDHH 형식)

**성공 조건**:
- ✅ `document_title.txt` 파일 존재
- ✅ `generation_start_time.txt` 파일 존재
- ✅ 시간 형식이 YYYYMMDDHH 형식

### Step 4.2: Generate Document Chunks (⚠️ 수정: 전체 섹션 자동 생성)

**프롬프트**: `business_document_generator/prompts/4.2_Generate_Document_Chunk.md`

**입력**:
- `business_document_generator/data/temp/integrated_document_data.json` (Step 3.5 출력)
- `business_document_generator/data/temp/document_type.txt` (Step 0.5 출력, 문서 유형 및 발주처 유형 포함)
- `business_document_generator/templates/[문서유형]_Structure_Template.md` (⚠️ 중요: 템플릿의 모든 섹션을 생성해야 함)
- `business_document_generator/prompts/personas/expert/Section_Expert_Mapping.md`
- `business_document_generator/prompts/personas/expert/[Expert_Name]_Persona.md` (섹션별)
- `business_document_generator/prompts/personas/[Client_Type]_Persona.md`

**재사용 프롬프트**:
- `../prompts/role_based/Soonryong_Answer_Generator_Prompt.md` (기본 스타일)

**실행 방식** (⚠️ 수정):
1. **템플릿 파싱**: 템플릿 파일을 읽어서 모든 섹션(`##`) 자동 추출
2. **섹션 목록 생성**: 템플릿의 모든 섹션을 생성 대상으로 설정
3. **중복 확인**: 이미 생성된 청크 파일 확인하여 중복 생성 방지
4. **섹션별 청크 생성**: 템플릿의 모든 섹션에 대해 반복 실행
   - 섹션 유형에 맞는 전문가 페르소나 선택 및 적용
   - 전문가 페르소나 + 발주처 유형 페르소나 + 순룡 기본 스타일 통합 적용
5. **생성 완료 검증**: 템플릿의 섹션 수와 생성된 청크 파일 수 일치 확인

**출력 확인**:
- `business_document_generator/data/temp/chunks/[섹션번호]_[섹션명].md` 파일들 존재 확인
- **템플릿의 모든 섹션에 해당하는 청크 파일이 생성되었는지 확인**
- 각 청크마다 Mermaid 다이어그램 포함 확인
- 각 청크마다 한 줄 요약 포함 확인
- 전문가 페르소나 적용 확인

**성공 조건**:
- ✅ 템플릿의 모든 섹션이 청크 파일로 생성됨
- ✅ 각 청크에 다이어그램 포함
- ✅ 각 청크에 한 줄 요약 포함
- ✅ 전문가 페르소나 적용됨

### Step 4.2.5: Validate Chunk Completeness (⚠️ 신규: 완성도 검증)

**프롬프트**: `business_document_generator/prompts/4.2.5_Validate_Chunk_Completeness.md`

**입력**:
- `business_document_generator/data/temp/chunks/*.md` (생성된 청크 파일들)
- `business_document_generator/templates/[문서유형]_Structure_Template.md` (템플릿)
- `business_document_generator/prompts/personas/expert/Section_Expert_Mapping.md` (섹션-전문가 매핑)
- `business_document_generator/data/temp/integrated_document_data.json` (통합 데이터)
- `business_document_generator/data/temp/document_type.txt` (문서 유형 및 발주처 유형)

**실행 방식**:
1. **템플릿 파싱**: 템플릿에서 모든 섹션 추출
2. **청크 파일 스캔**: `chunks/` 디렉토리의 모든 `.md` 파일 확인
3. **섹션 수 일치 확인**: 템플릿 섹션 수 = 생성된 청크 수
4. **섹션 번호 연속성 확인**: 섹션 번호가 연속적으로 존재하는지 확인
5. **청크 내용 확인**: 각 청크에 다이어그램, 요약, 세부내용 포함 여부 확인
6. **파일명 일관성 확인**: 청크 파일명 형식 일치 확인
7. **검증 리포트 생성**: 검증 결과를 JSON 형식으로 저장

**출력 확인**:
- `business_document_generator/data/temp/chunk_completeness_report.json` 파일 존재 확인
- 검증 상태 확인 (passed/failed)
- 누락 섹션이나 불완전 청크 목록 확인

**성공 조건**:
- ✅ 템플릿의 섹션 수와 생성된 청크 파일 수 일치
- ✅ 모든 청크에 다이어그램, 요약, 세부내용 포함
- ✅ 섹션 번호 연속성 유지
- ✅ 파일명 일관성 유지
- ✅ 검증 리포트 생성 완료
- ✅ 검증 통과 시 Step 4.3으로 진행, 실패 시 Step 4.2로 돌아가서 생성 요청

### Step 4.3: Merge Document Chunks

**프롬프트**: `business_document_generator/prompts/4.3_Merge_Document_Chunks.md`

**입력**:
- `business_document_generator/data/temp/chunks/*.md` (모든 청크 파일들)
- `business_document_generator/data/temp/integrated_document_data.json`
- `business_document_generator/data/temp/document_title.txt`
- `business_document_generator/templates/[문서유형]_Structure_Template.md`
- `business_document_generator/prompts/personas/expert/PM_Persona.md`

**전제 조건**:
- Step 4.2.5에서 완성도 검증이 완료되었음을 전제로 함
- 모든 필수 섹션이 청크로 생성되었고, 각 청크에 필수 요소가 포함되어 있음

**출력 확인**:
- `business_document_generator/data/temp/[문서유형]_content_merged.md` 파일 존재 확인
- 목차가 템플릿에서 가져온 전체 목차인지 확인
- 목차와 실제 생성된 청크 파일 일치 검증 확인
- 섹션 번호 연속성 확인

**성공 조건**:
- ✅ `[문서유형]_content_merged.md` 파일 존재
- ✅ 목차가 템플릿의 전체 목차 포함
- ✅ 목차의 모든 항목에 해당하는 청크 파일이 존재
- ✅ 섹션 번호 연속성 유지
- ✅ PM 페르소나로 전문가 내용 전략적 통합 및 일관성 확보 완료

### Step 4.4: Validate Document Consistency

**프롬프트**: `business_document_generator/prompts/4.4_Validate_Document_Consistency.md`

**입력**:
- `business_document_generator/data/temp/[문서유형]_content_merged.md` (Step 4.3 출력)
- `business_document_generator/data/temp/integrated_document_data.json`
- `business_document_generator/prompts/personas/expert/PM_Persona.md`

**전제 조건**:
- Step 4.2.5에서 기본적인 완성도 검증이 완료되었음을 전제로 함
- Step 4.3에서 전략적 통합 및 일관성 확보가 완료되었음을 전제로 함

**출력 확인**:
- `business_document_generator/data/temp/[문서유형]_content_final.md` 파일 존재 확인
- `business_document_generator/data/temp/validation_report.json` 파일 존재 확인
- 검증 항목 확인 (구조적 일관성, 목차-내용 완전 일치, 내용 일관성, 스타일 일관성, 연결성, 다이어그램, 논리적 일관성, 전략적 메시지 일관성)

**성공 조건**:
- ✅ `[문서유형]_content_final.md` 파일 존재
- ✅ `validation_report.json` 파일 존재
- ✅ **목차-내용 완전 일치 검증 통과** (목차 항목 수 = 실제 섹션 수)
- ✅ 모든 검증 항목 통과 (기본 완성도 + 문서 품질 + 전략적 일관성)
- ✅ PM 페르소나로 전문가 수준의 품질 관리 및 최종 정리 완료

### Step 4.5: Save Document With Folder Structure

**프롬프트**: `business_document_generator/prompts/4.5_Save_Document_With_Folder_Structure.md`

**입력**:
- `business_document_generator/data/temp/document_title.txt` (Step 4.1 출력)
- `business_document_generator/data/temp/generation_start_time.txt` (Step 4.1 출력)
- `business_document_generator/data/temp/[문서유형]_content_final.md` (Step 4.4 출력)
- `business_document_generator/data/temp/integrated_document_data.json` (문서 유형)

**출력 확인**:
- `business_document_generator/data/assets/[제목]/[YYYYMMDDHH]/[제목]_[문서유형].md` 파일 존재 확인
- 폴더 구조 확인

**성공 조건**:
- ✅ 폴더 구조 생성됨 (`assets/[제목]/[YYYYMMDDHH]/`)
- ✅ 최종 문서 저장됨
- ✅ 파일명 형식 정확 (`[제목]_[문서유형].md`)

### Final Cleanup (최종 정리)

**생성된 마크다운 파일에서 자동으로 제거**:
1. 취소선 문법 (`~~텍스트~~` → `텍스트`)
2. 빈 줄 3개 이상 연속 → 2개로 통일
3. 불필요한 공백 제거
4. 마크다운 문법 오류 수정

**처리 파일**:
- `business_document_generator/data/temp/[문서유형]_content.md`

**성공 조건**:
- ✅ 취소선 문법이 모두 제거됨
- ✅ 문서 형식이 정리됨
- ✅ 불필요한 공백이 제거됨

### User Review & Approval

**사용자에게 제시**:
- `business_document_generator/data/temp/[문서유형]_content.md` 미리보기 (정리 후)

**사용자 선택**:
- **승인**: 최종 파일 저장 및 PDF 변환
- **수정 요청**: 피드백 수집 후 Step 4 재실행

### Finalization

**파일 저장**:
1. **프로젝트명 폴더 생성**: `assets/[프로젝트명]/` 폴더가 없으면 생성
   - 프로젝트명은 `requirements_analysis.json`의 `project_info.project_name`에서 가져옴
   
2. `assets/[프로젝트명]/` 폴더로 복사:
   - `[문서유형]_content.md` → `assets/[프로젝트명]/[프로젝트명]_[문서유형].md`

3. PDF 변환 (선택사항):
   ```bash
   cd assets/[프로젝트명]/
   node ../convert-to-pdf.js "[프로젝트명]_[문서유형].md" "[프로젝트명]_[문서유형].pdf"
   ```

**성공 조건**:
- ✅ 프로젝트명 폴더 생성 (`assets/[프로젝트명]/`)
- ✅ Markdown 파일 `assets/[프로젝트명]/` 폴더에 저장
- ✅ PDF 파일 생성 (선택사항)

## Error Handling

### Step 0.5 실패 시

**에러 처리**:
1. 에러 메시지 기록
2. 사용자에게 발주처 유형 재선택 요청
3. Step 0.5 재실행

### Step 1 실패 시

**에러 처리**:
1. 에러 메시지 기록
2. 요구조건 파일 경로 확인
3. 파일 형식 검증 (TXT, MD 허용)
4. 사용자에게 피드백 요청
5. Step 1 재실행

### Step 2 실패 시

**에러 처리**:
1. Step 1 결과 확인
2. Architecture 파일 존재 확인
3. 에러 메시지 기록
4. 사용자에게 피드백 요청
5. Step 2 재실행

### Step 3 실패 시

**에러 처리**:
1. Step 1, 2 결과 확인
2. 포트폴리오 문서 존재 확인
3. 에러 메시지 기록
4. 사용자에게 피드백 요청
5. Step 3 재실행

### Step 3.5 실패 시

**에러 처리**:
1. Step 0.5, 1, 2, 3 결과 확인
2. 템플릿 구조 확인
3. 에러 메시지 기록
4. 사용자에게 피드백 요청
5. Step 3.5 재실행

### Step 4.1 실패 시

**에러 처리**:
1. Step 3.5 결과 확인
2. 프로젝트명 확인
3. 에러 메시지 기록
4. 사용자에게 피드백 요청
5. Step 4.1 재실행

### Step 4.2 실패 시

**에러 처리**:
1. Step 4.1 결과 확인
2. 템플릿 파일 존재 확인
3. 전문가 페르소나 파일 존재 확인
4. 발주처 유형 페르소나 파일 존재 확인
5. 에러 메시지 기록
6. 해당 청크만 재생성 (이전 청크는 유지)
7. 사용자에게 피드백 요청

### Step 4.3 실패 시

**에러 처리**:
1. Step 4.2 결과 확인 (모든 청크 파일 존재 확인)
2. PM 페르소나 파일 존재 확인
3. 에러 메시지 기록
4. 사용자에게 피드백 요청
5. Step 4.3 재실행

### Step 4.4 실패 시

**에러 처리**:
1. Step 4.3 결과 확인
2. PM 페르소나 파일 존재 확인
3. 에러 메시지 기록
4. 검증 리포트 확인
5. 발견된 문제점 수정 후 Step 4.4 재실행

### Step 4.5 실패 시

**에러 처리**:
1. Step 4.1, 4.4 결과 확인
2. 제목 및 시간 파일 존재 확인
3. 폴더 생성 권한 확인
4. 에러 메시지 기록
5. 사용자에게 피드백 요청
6. Step 4.5 재실행

## Usage Example

### 기본 사용법

```markdown
**사용자 입력**:
"@portfolio/portfolio_docs 요구조건 파일 기반으로 사업계획서 만들어줘"

**Assistant 실행**:
1. Step 0.5: 발주처 유형 선택
2. 문서 유형 선택 (사업계획서)
3. Step 1: 요구조건 파싱
4. Step 2: Architecture 파일 선택 및 파싱
5. Step 3: 포트폴리오 매칭
6. Step 3.5: 정보 통합 연결
7. Step 4.1: 문서 제목 입력 요청
8. Step 4.2: 섹션별 청크 생성 (전문가 페르소나 적용)
9. Step 4.3: 청크 통합 (PM 페르소나)
10. Step 4.4: 일관성 검증 및 최종 정리 (PM 페르소나)
11. Step 4.5: 폴더 구조로 저장
12. 사용자 리뷰 요청
```

### 고급 사용법 (발주처 유형 및 Architecture 파일 지정)

```markdown
**사용자 입력**:
"정부 기관용 제안서 만들어줘. API_Design.md와 Database_Design.md 사용해줘"

**Assistant 실행**:
1. 발주처 유형: 정부 기관 (자동 설정)
2. 문서 유형: 제안서
3. Architecture 파일: API_Design.md, Database_Design.md
4. 전체 워크플로우 실행
5. 정부 기관 페르소나 적용
```

## 다음 단계

체인이 성공적으로 완료되면:

1. **사용자 알림**:
   - 생성된 파일 경로 안내
   - PDF 파일 생성 여부 확인

2. **선택사항**:
   - Git commit 제안
   - 다른 문서 유형으로 재실행 제안

## 관련 문서

- `business_document_generator/prompts/0.5_Select_Client_Type.md` - Step 0.5: 발주처 유형 선택
- `business_document_generator/prompts/1_Parse_Requirements.md` - Step 1: 요구조건 파싱
- `business_document_generator/prompts/2_Parse_Architecture.md` - Step 2: Architecture 파일 파싱
- `business_document_generator/prompts/3_Match_Company_Portfolio.md` - Step 3: 포트폴리오 매칭
- `business_document_generator/prompts/3.5_Connect_All_Information.md` - Step 3.5: 정보 통합 연결
- `business_document_generator/prompts/4.1_Get_Document_Title.md` - Step 4.1: 문서 제목 입력
- `business_document_generator/prompts/4.2_Generate_Document_Chunk.md` - Step 4.2: 청크 생성 (전문가 페르소나)
- `business_document_generator/prompts/4.3_Merge_Document_Chunks.md` - Step 4.3: 청크 통합 (PM 페르소나)
- `business_document_generator/prompts/4.4_Validate_Document_Consistency.md` - Step 4.4: 일관성 검증 (PM 페르소나)
- `business_document_generator/prompts/4.5_Save_Document_With_Folder_Structure.md` - Step 4.5: 문서 저장
- `business_document_generator/prompts/personas/expert/` - 전문가 페르소나
- `business_document_generator/templates/` - 문서 템플릿
- `business_document_generator/README.md` - 사용 가이드

---

## 업데이트 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2025-01-05 | Step 4를 청크 기반 생성으로 분리 (4.1~4.5) |
| 2025-01-05 | 전문가 페르소나 적용 구조 추가 |
| 2025-01-XX | Business Document Chain Orchestrator 생성 |

