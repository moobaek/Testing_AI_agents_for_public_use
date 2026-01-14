# 🚀 Kwon Sun-ryong's AI Engineering Portfolio

> **"AI 에이전트, 문서 중심 개발, 그리고 제조 DX의 미래"**
> 
> 이 저장소는 2020년부터 2025년까지 제가 걸어온 5년간의 엔지니어링 여정과 13개 이상의 프로젝트, 그리고 이를 관통하는 **AI 에이전트 철학**을 담고 있습니다.

---

## 🚨 AI 에이전트 필수 진입 프로토콜 (MANDATORY FOR AI AGENTS)

**⚠️ AI 에이전트가 이 포트폴리오에 진입하거나 포트폴리오 관련 작업을 수행할 때는 반드시 다음을 먼저 읽어야 합니다:**

### 무조건 무조건 먼저 읽어야 할 문서:
**`portfolio/portfolio_docs/prompts/Portfolio_Question_Entry_Prompt.md`**

**진입 조건:**
- 포트폴리오를 언급하거나 질문할 때
- `@portfolio`, `@portfolio/portfolio_docs` 등 포트폴리오 관련 언급 시
- 포트폴리오 문서 수정/작성 요청 시
- 이력서/자소서/사업계획서/제안서 작성 요청 시
- 포트폴리오 관련 질문 답변 요청 시

**⚠️ 절대 건너뛰지 마세요!**
- Entry Prompt를 읽지 않고 포트폴리오 작업을 시작하면 안 됩니다
- Entry Prompt의 필수 휴먼 루프를 반드시 실행해야 합니다
- 이 프로토콜을 따르지 않으면 올바른 워크플로우로 라우팅되지 않습니다

**Entry Prompt 경로**: `portfolio/portfolio_docs/prompts/Portfolio_Question_Entry_Prompt.md`

---

## 🌟 하이라이트

- **20+ Independent Solutions**: AI, Platform, IoT, Energy, Healthcare 등 5대 영역 솔루션
- **Document-Driven Development**: 298개의 설계 문서를 중심으로 한 자동화된 개발 체계
- **Proven Results**: 10편의 학술 논문, 2개의 GS 인증(1등급), 대기업 납품 성과
- **AI Agent Orchestration**: Claude, GPT 등을 활용한 Multi-Agent 협업 시스템 구축

---

## 🧭 탐험하기 (Navigation)

이 포트폴리오는 두 가지 방식으로 경험할 수 있습니다.

### 1. 📚 지식 저장소 (추천)
모든 설계 문서, 프로젝트 상세 내역, 기술 철학은 **`portfolio_docs`** 폴더에 정리되어 있습니다.
마크다운 뷰어만 있다면 어디서든 읽을 수 있는 Core Contents입니다.

👉 **[📂 문서 저장소 입장하기 (Knowledge Base)](portfolio_docs/README.md)**
- **[🗺️ 포트폴리오 인덱스 (Main Map)](portfolio_docs/00_Portfolio_Index.md)**
- **[📄 비전문가용 요약](portfolio_docs/Executive_Summary/00_Overview_For_Non_Technical.md)**
- **[🧩 프로젝트 개요](portfolio_docs/02_Projects_Overview.md)**

### 2. 💻 웹 포트폴리오 (Interactive)
이 저장소 자체는 React 기반의 웹 애플리케이션으로 구성되어 있습니다. 
로컬에서 실행하면 인터랙티브한 UI로 포트폴리오를 경험할 수 있습니다.

---

## 🛠️ Project Build Guide (For Web App)

### Tech Stack
- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Deployment**: Vercel (Ready)

### Prerequisites
Make sure your system has Node.js and npm installed.
We recommend using nvm to install Node.js: [nvm Installation Guide](https://github.com/nvm-sh/nvm#installing-and-updating)

### Quick Start

1. **Install Dependencies**
   ```sh
   npm install
   ```

2. **Start Development Server**
   ```sh
   npm run dev
   ```

3. **Build for Production**
   ```sh
   npm run build
   ```

### Project Structure
```
portfolio/
├── portfolio_docs/    # 📚 Core Knowledge Base (Markdown files)
├── src/               # 💻 Web Application Source
│   ├── components/    # UI Components
│   ├── pages/         # Page Components
│   └── ...
├── public/            # Static Assets
└── README.md          # Entry Point
```
