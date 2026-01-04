# PDF 변환 도구 (Mermaid 다이어그램 지원)

Markdown 파일을 Mermaid 다이어그램이 렌더링된 PDF로 변환합니다.

## 사용 방법

### 딸깍 실행 (npm 스크립트)

```bash
# assets 폴더에서 실행

# 포트폴리오 PDF 생성
npm run pdf:portfolio

# 이력서 PDF 생성
npm run pdf:resume

# 둘 다 생성
npm run pdf:all

# 카카오 포트폴리오 PDF 생성
npm run pdf:kakao:portfolio

# 카카오 이력서 PDF 생성
npm run pdf:kakao:resume

# 카카오 자기소개서 PDF 생성
npm run pdf:kakao:selfintro

# 카카오 프로젝트 수행이력 PDF 생성
npm run pdf:kakao:projects

# 카카오 관련 모든 PDF 생성
npm run pdf:kakao:all
```

### 직접 실행

```bash
node convert-to-pdf.js <입력파일.md> <출력파일.pdf>
```

## 생성되는 파일

| 명령어 | 입력 | 출력 |
|--------|------|------|
| `npm run pdf:portfolio` | 권순룡_포트폴리오_통합문서.md | 권순룡_포트폴리오_통합문서_mermaid.pdf |
| `npm run pdf:resume` | 권순룡_이력서_토스증권_Data_Engineer_AI.md | 권순룡_이력서_토스증권_Data_Engineer_AI_mermaid.pdf |
| `npm run pdf:kakao:portfolio` | 권순룡_포트폴리오_카카오_Agentic_AI_Platform.md | 권순룡_포트폴리오_카카오_Agentic_AI_Platform.pdf |
| `npm run pdf:kakao:resume` | 권순룡_이력서_카카오_Agentic_AI_Platform.md | 권순룡_이력서_카카오_Agentic_AI_Platform.pdf |
| `npm run pdf:kakao:selfintro` | 권순룡_자기소개서_카카오_Agentic_AI_Platform.md | 권순룡_자기소개서_카카오_Agentic_AI_Platform.pdf |
| `npm run pdf:kakao:projects` | 카카오_프로젝트_수행이력.md | 카카오_프로젝트_수행이력.pdf |
| `npm run pdf:kakao:all` | 위 4개 파일 모두 | 위 4개 PDF 모두 |

## 설치 (최초 1회)

```bash
cd portfolio/portfolio_docs/assets
npm install
```

## 기술 스택

- **puppeteer**: Chrome Headless 브라우저
- **marked**: Markdown → HTML 변환
- **mermaid**: 다이어그램 렌더링 (CDN)
