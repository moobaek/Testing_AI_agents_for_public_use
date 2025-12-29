const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');

async function convertMarkdownToPDF(mdFile, outputFile) {
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
    const html = marked.parse(markdown, { renderer: renderer });

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
        body {
            font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
            max-width: 100%;
            margin: 0;
            padding: 20px;
            line-height: 1.7;
            color: #1e293b;
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

    // Launch browser and create PDF
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    // Wait for Mermaid diagrams to render
    await new Promise(resolve => setTimeout(resolve, 5000));

    await page.pdf({
        path: outputFile,
        format: 'A4',
        margin: {
            top: '20mm',
            right: '15mm',
            bottom: '20mm',
            left: '15mm'
        },
        printBackground: true
    });

    await browser.close();
    console.log(`PDF created: ${outputFile}`);
}

// Get command line arguments
const mdFile = process.argv[2];
const outputFile = process.argv[3] || mdFile.replace('.md', '.pdf');

if (!mdFile) {
    console.error('Usage: node convert-to-pdf.js <input.md> [output.pdf]');
    process.exit(1);
}

convertMarkdownToPDF(mdFile, outputFile).catch(console.error);
