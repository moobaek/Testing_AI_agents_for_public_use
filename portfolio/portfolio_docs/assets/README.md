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

## 설치 (최초 1회)

```bash
cd portfolio/portfolio_docs/assets
npm install
```

## 기술 스택

- **puppeteer**: Chrome Headless 브라우저
- **marked**: Markdown → HTML 변환
- **mermaid**: 다이어그램 렌더링 (CDN)
