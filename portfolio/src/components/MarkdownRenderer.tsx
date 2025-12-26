// ID: comp.content.markdown_renderer
// 참조: architecture/Component_Interfaces_Design.md#component-markdownrenderer-comp-content-markdown-renderer
// 참조: architecture/Screen_Design.md#페이지별-화면-설계
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useFileContent } from '@/hooks/useFileContent';
import { NamuToc } from './NamuToc';
import { SearchHighlighter } from './SearchHighlighter';

interface MarkdownRendererProps {
  content?: string;
  originalFileName?: string | null;
  className?: string;
}

// 기본 홈페이지 컨텐츠
const defaultHomeContent = `# AI 업무 혁신: 9단계 실행 가이드

> **핵심 철학**
> "자신이 가장 잘 아는 도메인에서 작고 확실한 성공(Small Wins)을 거두고, 그 과정의 지식을 자산화(Assetize)하여, 피드백을 통해 끝없이 확장하라."

본 포트폴리오는 **9단계 실행 가이드**를 실제 프로젝트에 적용한 사례를 담고 있습니다.

## 주요 섹션

### 포트폴리오
- **Portfolio Index**: 전체 개요 및 9단계 실행 가이드
- **Key Achievements**: 주요 성과 및 성취
- **Business Value**: 비즈니스 가치 및 영향
- **Projects Overview**: 13개 주요 프로젝트 요약
- **Academic Publications**: 학술 연구 및 논문 성과

### 실행 가이드 (9단계)
1. **Repetitive Work**: 반복 업무 식별
2. **Expertise Targeting**: 도메인 타겜팅
3. **Micro Starts**: 초소형 단위 시작
4. **Modularization**: 모듈화 전략
5. **I/O Optimization**: I/O 최적화
6. **Daily Log**: 데일리 로그 기록
7. **Visuals**: 시각적 자산 생성
8. **Feedback Loop**: 피드백 루프
9. **Continuous Update**: 지속적 업데이트

### 기술 및 아키텍처
- **Architecture Overview**: 통합 시스템 아키텍처
- **Testing Context**: 실증 및 검증 사례
- **Technical Requirements**: 기술 요구사항

## 시스템 아키텍처

다음은 AI 업무 혁신 시스템의 전체 아키텍처입니다:

\`\`\`mermaid
graph TD
    A[사용자 요청] --> B[요구사항 분석]
    B --> C[도메인 전문성 평가]
    C --> D[마이크로 시작 전략]
    D --> E[모듈화 설계]
    E --> F[I/O 최적화]
    F --> G[시각적 자산 생성]
    G --> H[피드백 수집]
    H --> I[지속적 업데이트]
    I --> J[성과 출력]
    
    K[데일리 로그] --> L[지식 자산화]
    L --> M[포트폴리오 구축]
    
    style A fill:#e1f5fe
    style J fill:#c8e6c9
    style M fill:#fff3e0
\`\`\`

## 주요 프로세스 흐름

\`\`\`mermaid
flowchart LR
    subgraph "파운데이션 단계"
        A1[반복 업무 식별] --> A2[도메인 타겜팅]
        A2 --> A3[마이크로 시작]
        A3 --> A4[모듈화]
        A4 --> A5[I/O 최적화]
    end
    
    subgraph "자산화 단계"
        B1[데일리 로그] --> B2[시각적 자산]
    end
    
    subgraph "확장 단계"
        C1[피드백 루프] --> C2[지속적 업데이트]
    end
    
    A5 --> B1
    B2 --> C1
    C2 --> A1
\`\`\`

## 사용법

1. **파일 탐색**: 왼쪽 사이드바에서 원하는 문서를 선택하세요
2. **검색**: 사이드바의 '검색' 버튼을 클릭해 특정 내용을 찾으세요
3. **목차**: 문서 상단의 목차를 통해 섹션으로 빠르게 이동하세요
4. **파일 브라우저**: 모든 문서를 한눈에 보고 정렬하여 탐색하세요

> **참고**: 이 위키는 실제 Obsidian 볼트의 구조를 반영하여 익숙한 네비게이션 경험을 제공합니다.

## 기술 스택

- **Tailwind CSS**: 스타일링
- **Unified/Remark/Rehype**: 마크다운 처리
- **Mermaid**: 다이어그램 렌더링

## Mermaid 다이어그램 예시

\`\`\`mermaid
graph TD
    A[Obsidian Vault] --> B[Markdown Files]
    B --> C[Wiki Renderer]
    C --> D[HTML Output]
    D --> E[Wikipedia-style UI]
    
    F[File System] --> G[Navigation Tree]
    G --> H[Sidebar]
    
    I[Wiki Links] --> J[Link Parser]
    J --> K[Internal Navigation]
\`\`\`

## 시작하기

1. **파일 탐색**: 왼쪽 사이드바에서 원하는 파일을 클릭하세요
2. **검색**: 상단 검색창을 사용해 특정 내용을 찾으세요
3. **목차**: 오른쪽 목차를 통해 문서 내 섹션으로 빠르게 이동하세요

> **참고**: 이 위키는 Obsidian 볼트의 구조를 그대로 반영하여 익숙한 네비게이션 경험을 제공합니다.

## 추가 정보

더 자세한 정보는 다음 페이지들을 참고하세요:
- [[설치 가이드]]
- [[사용법]]
- [[커스터마이징]]

---

*이 위키는 지속적으로 업데이트됩니다. 새로운 기능이나 개선사항이 있으면 언제든 추가될 예정입니다.*`;

// Simple markdown to HTML converter (실제로는 unified/remark/rehype 사용)
const parseMarkdown = (content: string): string => {
  let html = content;

  // Headers with proper ID generation
  html = html.replace(/^### (.*$)/gim, (match, title) => {
    const id = title.trim().toLowerCase().replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').replace(/(^-|-$)/g, '');
    return `<h3 id="${id}">${title}</h3>`;
  });
  html = html.replace(/^## (.*$)/gim, (match, title) => {
    const id = title.trim().toLowerCase().replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').replace(/(^-|-$)/g, '');
    return `<h2 id="${id}">${title}</h2>`;
  });
  html = html.replace(/^# (.*$)/gim, (match, title) => {
    const id = title.trim().toLowerCase().replace(/[^\w\s가-힣]/g, '').replace(/\s+/g, '-').replace(/(^-|-$)/g, '');
    return `<h1 id="${id}">${title}</h1>`;
  });

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Mermaid diagrams
  html = html.replace(/```mermaid\n([\s\S]*?)```/g, '<div class="mermaid">$1</div>');
  
  // Code blocks (after mermaid to avoid conflicts)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Wiki links
  html = html.replace(/\[\[([^\]]+)\]\]/g, '<a href="#/wiki/$1" class="wiki-link">$1</a>');

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Clean up
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-6])/g, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<pre>)/g, '$1');
  html = html.replace(/(<\/pre>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

  return html;
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  originalFileName,
  className = ''
}) => {
  const [htmlContent, setHtmlContent] = useState('');
  const { content: fileContent, loading, error } = useFileContent(originalFileName);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 우선순위: 직접 전달된 content > 파일에서 로드된 content > 기본 컨텐츠
    const contentToRender = content || fileContent || defaultHomeContent;
    const html = parseMarkdown(contentToRender);
    setHtmlContent(html);
  }, [content, fileContent]);

  useEffect(() => {
    // Initialize Mermaid diagrams
    const initMermaid = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          themeVariables: {
            primaryColor: '#3b82f6',
            primaryTextColor: '#1f2937',
            primaryBorderColor: '#e5e7eb',
            lineColor: '#6b7280',
            secondaryColor: '#f3f4f6',
            tertiaryColor: '#ffffff'
          }
        });
        
        // 다이어그램 렌더링
        const mermaidElements = document.querySelectorAll('.mermaid');
        mermaidElements.forEach(async (element, index) => {
          const graphDefinition = element.textContent || '';
          if (graphDefinition.trim()) {
            try {
              const { svg } = await mermaid.render(`mermaid-${Date.now()}-${index}`, graphDefinition);
              element.innerHTML = svg;
            } catch (error) {
              console.error('Mermaid rendering error:', error);
              element.innerHTML = `<pre class="text-red-500 bg-red-50 p-4 rounded border">다이어그램 렌더링 오류: ${error}</pre>`;
            }
          }
        });
      } catch (error) {
        console.log('Mermaid not available:', error);
      }
    };

    if (htmlContent) {
      // DOM이 업데이트된 후 약간의 지연을 두고 Mermaid 초기화
      setTimeout(initMermaid, 100);
    }
  }, [htmlContent]);

  if (loading) {
    return (
      <ScrollArea className={`flex-1 ${className}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">로딩 중...</div>
          </div>
        </div>
      </ScrollArea>
    );
  }

  if (error) {
    return (
      <ScrollArea className={`flex-1 ${className}`}>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center text-red-500">
            <p>오류: {error}</p>
          </div>
        </div>
      </ScrollArea>
    );
  }

  const rawContent = content || fileContent || defaultHomeContent;

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/ce74763c-2088-422f-b4f8-666a2ecc75d0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MarkdownRenderer.tsx:294',message:'MarkdownRenderer render start',data:{hasContent:!!content,hasFileContent:!!fileContent,hasError:!!error,loading},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion

  return (
    <div className="relative flex-1">
      <ScrollArea className={`flex-1 ${className}`}>
        <div ref={contentRef} className="max-w-4xl mx-auto p-6 relative">
          {/* 나무위키 스타일 목차 - 오른쪽 Absolute 배치 (화면 설계서 반영) */}
          <div className="absolute right-6 top-6 w-60 z-10">
            <NamuToc content={rawContent} />
          </div>
          
          <article 
            className="wiki-content prose prose-slate max-w-none pr-64"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </ScrollArea>
      
      {/* 문서 내 검색 기능 */}
      <SearchHighlighter contentRef={contentRef} />
    </div>
  );
};