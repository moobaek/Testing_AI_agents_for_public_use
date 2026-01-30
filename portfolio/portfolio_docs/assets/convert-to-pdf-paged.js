const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

// HTML 후처리 함수: 페이지 브레이크 클래스 추가
function addPageBreakClasses(html) {
    // 목차 섹션 다음에 페이지 브레이크 추가
    // 목차는 <h2>목차</h2> 다음에 <ol> 또는 <ul>이 오고, 그 다음 <hr> 또는 <h1>이 옴
    // 목차 다음 첫 번째 h1에는 특별 마커 추가 (나중에 section-title 클래스 추가 시 제외)
    html = html.replace(
        /(<h2[^>]*>목차<\/h2>\s*<(ol|ul)>.*?<\/\2>)\s*(<hr\s*\/?>|<h1([^>]*>)(\d+\.))/gs,
        function(match, p1, p2, p3, p4, p5) {
            if (p3 && p3.startsWith('<h1')) {
                // h1인 경우: page-break 추가하고 첫 번째 섹션 마커 추가
                return p1 + '<div class="page-break"></div><h1 data-first-section="true"' + p4 + p5;
            } else {
                // hr인 경우: page-break 추가
                return p1 + '<div class="page-break"></div>' + p3;
            }
        }
    );
    
    // 각 주요 섹션 제목(# 1, # 2, # 3 등) 앞에 페이지 브레이크 추가
    // <hr> 다음에 오는 <h1> 제목 앞에 페이지 브레이크 추가
    html = html.replace(
        /(<hr\s*\/?>)\s*(<h1[^>]*>\d+\.)/g,
        '$1<div class="page-break"></div>$2'
    );
    
    // 각 섹션 h1 제목에 section-title 클래스 추가 (CSS에서 페이지 브레이크 적용)
    // 숫자로 시작하는 섹션 제목만 선택 (# 1, # 2 등)
    // 단, data-first-section="true"가 있는 경우는 제외 (목차 다음 첫 번째는 이미 page-break div로 처리됨)
    html = html.replace(
        /(<h1)([^>]*>)(\d+\.)/g,
        function(match, p1, p2, p3) {
            // data-first-section이 있으면 section-title 클래스 추가하지 않음
            if (p2.includes('data-first-section="true"')) {
                return match;
            }
            // 이미 class 속성이 있으면 추가하지 않음
            if (p2.includes('class=')) {
                return match;
            }
            return p1 + ' class="section-title"' + p2 + p3;
        }
    );
    
    // 소제목(h2, h3)이 Mermaid 바로 앞에 오는 경우 함께 묶기
    // h2 또는 h3 태그와 그 다음 Mermaid를 하나의 wrapper로 묶음
    // 먼저 이 패턴을 처리하여 중복 감싸기 방지
    html = html.replace(
        /(<(h2|h3)([^>]*>.*?<\/\2>))\s*(<div class="mermaid">[\s\S]*?<\/div>)/g,
        '<div class="subsection-with-mermaid">$1$4</div>'
    );
    
    // Mermaid 다이어그램 앞 요소에 keep-with-mermaid 클래스 추가
    // p 태그가 Mermaid 앞에 오는 경우 (h2, h3는 위에서 처리됨)
    html = html.replace(
        /(<p[^>]*>.*?<\/p>)\s*(<div class="mermaid">)/gs,
        '$1<span class="keep-with-mermaid"></span>$2'
    );
    
    // 아직 wrapper로 감싸지지 않은 Mermaid 다이어그램을 wrapper로 감싸기
    // subsection-with-mermaid 안에 있는 것은 제외
    html = html.replace(
        /(<div class="mermaid">[\s\S]*?<\/div>)/g,
        function(match, p1, offset, string) {
            // 앞뒤 200자 범위에서 subsection-with-mermaid 확인
            const start = Math.max(0, offset - 200);
            const end = Math.min(string.length, offset + match.length + 200);
            const context = string.substring(start, end);
            
            // 이미 subsection-with-mermaid 안에 있으면 그대로 반환
            if (context.includes('subsection-with-mermaid')) {
                return match;
            }
            // 이미 mermaid-wrapper로 감싸져 있으면 그대로 반환
            if (context.includes('mermaid-wrapper')) {
                return match;
            }
            return '<div class="mermaid-wrapper">' + match + '</div>';
        }
    );
    
    return html;
}

async function convertMarkdownToPDFPaged(mdFile, outputFile) {
    // Read markdown file
    const markdown = fs.readFileSync(mdFile, 'utf8');

    // Custom renderer for mermaid code blocks
    const renderer = new marked.Renderer();
    const originalCodeRenderer = renderer.code.bind(renderer);

    renderer.code = function (code, language, escaped) {
        // Handle both old and new marked API
        const codeText = typeof code === 'object' ? code.text : code;
        const lang = typeof code === 'object' ? code.lang : language;

        if (lang === 'mermaid') {
            return `<div class="mermaid">${codeText}</div>`;
        }
        // For other code blocks, use default rendering
        if (typeof code === 'object') {
            return `<pre><code class="language-${lang || ''}">${codeText}</code></pre>`;
        }
        return `<pre><code class="language-${language || ''}">${code}</code></pre>`;
    };

    // Convert markdown to HTML with custom renderer
    let html = marked.parse(markdown, { renderer: renderer });
    
    // HTML 후처리: 페이지 브레이크 클래스 추가
    html = addPageBreakClasses(html);

    // Load external CSS template
    const cssPath = path.join(__dirname, 'pdf-engine', 'templates', 'base.css');
    let cssContent = '';
    if (fs.existsSync(cssPath)) {
        cssContent = fs.readFileSync(cssPath, 'utf8');
    }

    // Create full HTML with Mermaid support and premium design
    const fullHtml = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
${cssContent ? cssContent : `
        /* Fallback basic styles */
        @page {
            size: A4;
            margin: 0;
        }
        body {
            font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
            max-width: 100%;
            margin: 0;
            padding: 20px;
            line-height: 1.7;
            color: #1e293b;
        }
        h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
            break-after: avoid;
        }
        table, img, pre, .mermaid {
            page-break-inside: avoid;
            break-inside: avoid;
        }
        h1, h2, h3 { font-weight: 700; }
        h1 { font-size: 24pt; border-bottom: 3px solid #2563eb; text-align: center; }
        h2 { font-size: 16pt; color: #2563eb; border-bottom: 2px solid #e2e8f0; }
        h3 { font-size: 13pt; }
        table { width: 100%; border-collapse: collapse; margin: 1em 0; }
        thead { background: #2563eb; color: white; }
        th, td { padding: 0.5em 0.8em; text-align: left; }
        td { border-bottom: 1px solid #e2e8f0; }
        tbody tr:nth-child(even) { background: #f8fafc; }
        code { background: #f8fafc; padding: 0.15em 0.4em; border-radius: 4px; font-size: 9pt; }
        pre { background: #1e293b; color: #e2e8f0; padding: 1em; border-radius: 8px; }
        pre code { background: transparent; color: inherit; }
        blockquote { border-left: 4px solid #2563eb; background: #f8fafc; padding: 0.8em 1em; margin: 1em 0; }
        .mermaid { text-align: center; margin: 1.5em 0; padding: 1em; background: #f8fafc; border-radius: 8px; }
`}
    </style>
    <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            themeVariables: {
                fontSize: '12px',
                primaryColor: '#2563eb',
                primaryTextColor: '#fff',
                primaryBorderColor: '#1d4ed8',
                lineColor: '#64748b',
                secondaryColor: '#f8fafc',
                tertiaryColor: '#e2e8f0'
            }
        });
    </script>
</head>
<body>
${html}
</body>
</html>
    `;

    // Launch browser and create PDF (Windows: try system Chrome/Edge if bundled not found)
    let executablePath = undefined;
    if (process.platform === 'win32') {
        const candidates = [
            process.env.PUPPETEER_EXECUTABLE_PATH,
            process.env.CHROME_PATH,
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
            'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            process.env.LOCALAPPDATA + '\\Microsoft\\Edge\\Application\\msedge.exe'
        ].filter(Boolean);
        for (const p of candidates) {
            if (p && fs.existsSync(p)) {
                executablePath = p;
                break;
            }
        }
    }
    const browser = await puppeteer.launch({
        headless: 'new',
        executablePath,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    });

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    // Wait for Mermaid diagrams to render
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Mermaid 다이어그램 크기 측정 및 큰 다이어그램 감지
    await page.evaluate(() => {
        // mermaid-wrapper와 subsection-with-mermaid 모두 처리
        const mermaidWrappers = document.querySelectorAll('.mermaid-wrapper, .subsection-with-mermaid');
        // A4 페이지 높이: 297mm, 여백: 상하 20mm씩 = 40mm
        // 사용 가능한 높이: 257mm ≈ 971px (1mm ≈ 3.779px at 96dpi)
        const pageHeightPx = 971;
        const largeThreshold = pageHeightPx * 0.67; // 페이지 높이의 2/3 ≈ 650px

        mermaidWrappers.forEach(wrapper => {
            const mermaidDiv = wrapper.querySelector('.mermaid');
            if (mermaidDiv) {
                const svg = mermaidDiv.querySelector('svg');
                if (svg) {
                    // SVG의 실제 렌더링된 크기 측정
                    const rect = svg.getBoundingClientRect();
                    const height = rect.height || svg.height.baseVal.value || svg.viewBox.baseVal.height;
                    
                    // subsection-with-mermaid의 경우 h2/h3 높이도 고려해야 하지만,
                    // 큰 다이어그램 판단은 Mermaid만 기준으로 함
                    // 큰 다이어그램 감지 (페이지 높이의 2/3 이상)
                    if (height >= largeThreshold) {
                        wrapper.classList.add('large-mermaid');
                    }
                    
                    // 모든 Mermaid 다이어그램이 한 페이지에 맞도록 크기 조정
                    if (height > pageHeightPx) {
                        const scale = pageHeightPx / height;
                        svg.style.transform = `scale(${scale})`;
                        svg.style.transformOrigin = 'top center';
                        mermaidDiv.style.maxHeight = `${pageHeightPx}px`;
                        mermaidDiv.style.overflow = 'hidden';
                        mermaidDiv.style.display = 'flex';
                        mermaidDiv.style.flexDirection = 'column';
                        mermaidDiv.style.alignItems = 'center';
                    }
                }
            }
        });
    });

    // Create PDF with A4 format and CSS page breaks enabled
    await page.pdf({
        path: outputFile,
        format: 'A4',
        margin: {
            top: '20mm',
            right: '15mm',
            bottom: '20mm',
            left: '15mm'
        },
        printBackground: true,
        preferCSSPageSize: true  // CSS 페이지 브레이크 규칙 적용
    });

    await browser.close();
    console.log(`PDF created: ${outputFile}`);
}

// Export function for use as a module
module.exports = { convertMarkdownToPDFPaged };

// CLI 실행 부분 (직접 실행 시에만)
if (require.main === module) {
    // Get command line arguments
    const mdFile = process.argv[2];
    const outputFile = process.argv[3] || mdFile.replace('.md', '.pdf');

    if (!mdFile) {
        console.error('Usage: node convert-to-pdf-paged.js <input.md> [output.pdf]');
        process.exit(1);
    }

    convertMarkdownToPDFPaged(mdFile, outputFile).catch(console.error);
}
