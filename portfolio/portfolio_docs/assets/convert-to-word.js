const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const puppeteer = require('puppeteer');
const { 
    Document, 
    Packer, 
    Paragraph, 
    TextRun, 
    HeadingLevel, 
    AlignmentType, 
    WidthType, 
    ImageRun,
    Table,
    TableRow,
    TableCell,
    PageBreak,
    PageOrientation,
    SectionType
} = require('docx');

const TableWidthType = WidthType;

/**
 * Markdown을 Word 문서로 변환하는 엔진
 * Mermaid 다이어그램은 이미지로 변환하여 포함
 */

// Mermaid 다이어그램을 이미지로 변환하는 함수
async function mermaidToImage(mermaidCode, page) {
    try {
        const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: white;
            font-family: 'Malgun Gothic', sans-serif;
        }
        .mermaid {
            text-align: center;
            background: white;
        }
    </style>
    <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        window.mermaidReady = false;
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            themeVariables: {
                fontSize: '14px',
                primaryColor: '#2563eb',
                primaryTextColor: '#fff',
                primaryBorderColor: '#1d4ed8',
                lineColor: '#64748b',
                secondaryColor: '#f8fafc',
                tertiaryColor: '#e2e8f0'
            }
        });
        mermaid.run().then(() => {
            window.mermaidReady = true;
        }).catch(() => {
            window.mermaidReady = true; // 오류가 나도 계속 진행
        });
    </script>
</head>
<body>
    <div class="mermaid">
${mermaidCode}
    </div>
</body>
</html>`;

        // 타임아웃을 60초로 늘리고 domcontentloaded 사용 (더 빠름)
        await page.setContent(html, { 
            waitUntil: 'domcontentloaded',
            timeout: 60000 
        });

        // Mermaid 렌더링 완료 대기 (최대 30초)
        try {
            await page.waitForFunction(
                () => window.mermaidReady === true || document.querySelector('.mermaid svg') !== null,
                { timeout: 30000 }
            );
        } catch (e) {
            // 타임아웃이 나도 계속 진행 (이미 렌더링되었을 수 있음)
            console.warn('Mermaid 렌더링 대기 타임아웃, 계속 진행...');
        }

        // 추가 대기 시간 (렌더링 안정화)
        await new Promise(resolve => setTimeout(resolve, 3000));

        // SVG 요소 확인
        const svgElement = await page.$('.mermaid svg');
        if (!svgElement) {
            console.warn('Mermaid SVG 요소를 찾을 수 없습니다. 페이지 내용 확인 중...');
            const bodyContent = await page.evaluate(() => document.body.innerHTML);
            console.warn('페이지 내용 (처음 500자):', bodyContent.substring(0, 500));
            return null;
        }

        // SVG 크기 확인
        const svgInfo = await page.evaluate(() => {
            const svg = document.querySelector('.mermaid svg');
            if (svg) {
                return {
                    width: svg.width.baseVal.value || svg.getBoundingClientRect().width,
                    height: svg.height.baseVal.value || svg.getBoundingClientRect().height,
                    viewBox: svg.viewBox.baseVal ? `${svg.viewBox.baseVal.x} ${svg.viewBox.baseVal.y} ${svg.viewBox.baseVal.width} ${svg.viewBox.baseVal.height}` : 'none'
                };
            }
            return null;
        });
        
        if (svgInfo) {
            console.log(`Mermaid SVG 크기: ${svgInfo.width}x${svgInfo.height}, viewBox: ${svgInfo.viewBox}`);
        }

        // SVG를 이미지로 변환
        const screenshot = await svgElement.screenshot({ 
            type: 'png',
            timeout: 10000 
        });
        
        if (screenshot && screenshot.length > 0) {
            console.log(`Mermaid 이미지 변환 성공: ${screenshot.length} bytes`);
            return screenshot;
        } else {
            console.warn('Mermaid 이미지 변환 실패: 빈 버퍼');
            return null;
        }
    } catch (error) {
        console.error('Mermaid 이미지 변환 오류:', error.message);
        return null;
    }
}

// HTML을 Word 문서 요소로 변환하는 함수
function htmlToWordElements(html, mermaidImages = []) {
    const elements = [];
    let mermaidIndex = 0;
    let processedHtml = html;

    // Mermaid 다이어그램을 플레이스홀더로 교체 (나중에 이미지로 교체)
    const mermaidPlaceholders = [];
    processedHtml = processedHtml.replace(/<div class="mermaid">[\s\S]*?<\/div>/gi, () => {
        const placeholder = `__MERMAID_PLACEHOLDER_${mermaidIndex}__`;
        mermaidPlaceholders.push(mermaidIndex);
        mermaidIndex++;
        return placeholder;
    });
    
    console.log(`Mermaid 플레이스홀더 개수: ${mermaidPlaceholders.length}, 이미지 개수: ${mermaidImages.length}`);
    console.log(`처리된 HTML에 플레이스홀더 포함 여부:`, processedHtml.includes('__MERMAID_PLACEHOLDER_'));
    
    // 처리되지 않은 HTML 태그 제거 (디버깅용)
    const unprocessedTags = processedHtml.match(/<[^>]+>/g);
    if (unprocessedTags && unprocessedTags.length > 0) {
        console.log(`처리되지 않은 HTML 태그 샘플:`, unprocessedTags.slice(0, 10));
    }

    // HTML을 순차적으로 파싱
    let currentIndex = 0;
    const htmlLength = processedHtml.length;

    while (currentIndex < htmlLength) {
        const remainingHtml = processedHtml.substring(currentIndex);

        // Mermaid 플레이스홀더 처리 (가장 먼저 처리하여 텍스트로 변환되는 것 방지)
        const placeholderMatch = remainingHtml.match(/__MERMAID_PLACEHOLDER_(\d+)__/);
        if (placeholderMatch && placeholderMatch.index === 0) {
            const mermaidIdx = parseInt(placeholderMatch[1]);
            console.log(`Mermaid 플레이스홀더 ${mermaidIdx} 처리 중...`);
            if (mermaidIdx < mermaidImages.length && mermaidImages[mermaidIdx]) {
                const imageBuffer = mermaidImages[mermaidIdx];
                console.log(`Mermaid 이미지 ${mermaidIdx} 삽입 (크기: ${imageBuffer.length} bytes)`);
                try {
                    // docx 라이브러리에서 이미지 크기는 픽셀 단위로 지정
                    // Word 문서 너비에 맞게 조정 (약 15cm = 567px, 96 DPI 기준)
                    // 비율을 유지하면서 최대 너비 500px로 제한
                    const maxWidth = 500;
                    const maxHeight = 400;
                    
                    elements.push(new Paragraph({
                        children: [
                            new ImageRun({
                                data: imageBuffer,
                                transformation: {
                                    width: maxWidth,
                                    height: maxHeight,
                                },
                            }),
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 200, after: 200 }
                    }));
                    console.log(`Mermaid 이미지 ${mermaidIdx} 삽입 완료 (${maxWidth}x${maxHeight}px)`);
                } catch (error) {
                    console.error(`Mermaid 이미지 ${mermaidIdx} 삽입 오류:`, error.message);
                    console.error(error.stack);
                    // 오류가 발생해도 빈 단락이라도 추가하여 문서 구조 유지
                    elements.push(new Paragraph({
                        text: `[Mermaid 다이어그램 ${mermaidIdx + 1}]`,
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 200, after: 200 }
                    }));
                }
            } else {
                console.warn(`Mermaid 이미지 ${mermaidIdx}가 없습니다 (null 또는 범위 초과)`);
                // 이미지가 없어도 플레이스홀더는 제거
            }
            currentIndex += placeholderMatch[0].length;
            continue;
        }

        // h1 태그 처리
        const h1Match = remainingHtml.match(/^<h1[^>]*>(.*?)<\/h1>/is);
        if (h1Match) {
            const text = parseHtmlContent(h1Match[1]);
            elements.push(new Paragraph({
                children: text,
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            }));
            currentIndex += h1Match[0].length;
            continue;
        }

        // h2 태그 처리
        const h2Match = remainingHtml.match(/^<h2[^>]*>(.*?)<\/h2>/is);
        if (h2Match) {
            const text = parseHtmlContent(h2Match[1]);
            elements.push(new Paragraph({
                children: text,
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 150 }
            }));
            currentIndex += h2Match[0].length;
            continue;
        }

        // h3 태그 처리
        const h3Match = remainingHtml.match(/^<h3[^>]*>(.*?)<\/h3>/is);
        if (h3Match) {
            const text = parseHtmlContent(h3Match[1]);
            elements.push(new Paragraph({
                children: text,
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 200, after: 100 }
            }));
            currentIndex += h3Match[0].length;
            continue;
        }

        // ul/ol 리스트 처리
        const listMatch = remainingHtml.match(/^<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/i);
        if (listMatch) {
            const listItems = listMatch[2].match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
            listItems.forEach(item => {
                const contentMatch = item.match(/<li[^>]*>([\s\S]*?)<\/li>/i);
                if (contentMatch) {
                    const text = parseHtmlContent(contentMatch[1]);
                    elements.push(new Paragraph({
                        children: text,
                        spacing: { before: 100, after: 100 },
                        bullet: {
                            level: 0
                        }
                    }));
                }
            });
            currentIndex += listMatch[0].length;
            continue;
        }

        // 테이블 처리
        const tableMatch = remainingHtml.match(/^<table[^>]*>([\s\S]*?)<\/table>/i);
        if (tableMatch) {
            const tableContent = tableMatch[1];
            const rows = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
            
            if (rows.length === 0) {
                // 빈 테이블인 경우 건너뛰기
                currentIndex += tableMatch[0].length;
                continue;
            }
            
            const tableRows = rows.map(row => {
                const cells = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi) || [];
                const cellCount = cells.length || 1; // 최소 1개 셀 보장
                const tableCells = cells.map(cell => {
                    const cellContent = cell.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/i);
                    const text = cellContent ? parseHtmlContent(cellContent[1]) : [new TextRun('')];
                    // 각 셀의 너비를 인치 단위로 설정 (표 전체 너비 6.5인치 기준)
                    const cellWidthInches = 6.5 / cellCount;
                    return new TableCell({
                        children: [new Paragraph({ children: text })],
                        width: { 
                            size: cellWidthInches * 914400, // 1 inch = 914400 EMU
                            type: WidthType.DXA 
                        }
                    });
                });
                
                // 셀이 없는 경우 빈 셀 하나 추가
                if (tableCells.length === 0) {
                    tableCells.push(new TableCell({
                        children: [new Paragraph({ children: [new TextRun('')] })],
                        width: { 
                            size: 6.5 * 914400,
                            type: WidthType.DXA 
                        }
                    }));
                }
                
                return new TableRow({ children: tableCells });
            });
            
            // 첫 번째 행의 셀 개수 확인
            const firstRow = tableRows[0];
            const columnCount = firstRow && firstRow.children ? firstRow.children.length : 1;
            const columnWidths = Array(columnCount).fill(0).map(() => (6.5 / columnCount) * 914400);
            
            // 표 전체 너비를 6.5인치로 설정 (A4 용지 너비 8.27인치에서 여백 제외)
            elements.push(new Table({
                rows: tableRows,
                width: { 
                    size: 6.5 * 914400, // 6.5 인치 = 5943600 EMU
                    type: WidthType.DXA 
                },
                columnWidths: columnWidths
            }));
            currentIndex += tableMatch[0].length;
            continue;
        }

        // 코드 블록 처리
        const codeMatch = remainingHtml.match(/^<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/i);
        if (codeMatch) {
            const codeText = stripHtmlTags(codeMatch[1]);
            elements.push(new Paragraph({
                children: [new TextRun({
                    text: codeText,
                    font: 'Consolas',
                    size: 18 // 9pt
                })],
                spacing: { before: 100, after: 100 }
            }));
            currentIndex += codeMatch[0].length;
            continue;
        }

        // p 태그 처리 (멀티라인 매칭 강화)
        const pMatch = remainingHtml.match(/^<p[^>]*>([\s\S]*?)<\/p>/i);
        if (pMatch) {
            const pContent = pMatch[1];
            // p 태그 안에 플레이스홀더가 있는지 확인
            if (pContent.includes('__MERMAID_PLACEHOLDER_')) {
                // 플레이스홀더를 먼저 처리
                const placeholderMatch = pContent.match(/__MERMAID_PLACEHOLDER_(\d+)__/);
                if (placeholderMatch) {
                    const mermaidIdx = parseInt(placeholderMatch[1]);
                    if (mermaidIdx < mermaidImages.length && mermaidImages[mermaidIdx]) {
                        const imageBuffer = mermaidImages[mermaidIdx];
                        elements.push(new Paragraph({
                            children: [
                                new ImageRun({
                                    data: imageBuffer,
                                    transformation: {
                                        width: 500,
                                        height: 400,
                                    },
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 200, after: 200 }
                        }));
                    }
                    // 플레이스홀더를 제거한 나머지 텍스트 처리
                    const remainingText = pContent.replace(/__MERMAID_PLACEHOLDER_\d+__/g, '').trim();
                    if (remainingText) {
                        const text = parseHtmlContent(remainingText);
                        if (text.length > 0 && text.some(r => r.text && r.text.trim())) {
                            elements.push(new Paragraph({
                                children: text,
                                spacing: { before: 100, after: 100 }
                            }));
                        }
                    }
                } else {
                    // 일반 p 태그 처리
                    const text = parseHtmlContent(pContent);
                    const hasContent = text.length > 0 && text.some(r => r.text && r.text.trim());
                    if (hasContent) {
                        elements.push(new Paragraph({
                            children: text,
                            spacing: { before: 100, after: 100 }
                        }));
                    }
                }
            } else {
                // 일반 p 태그 처리
                const text = parseHtmlContent(pContent);
                const hasContent = text.length > 0 && text.some(r => r.text && r.text.trim());
                if (hasContent) {
                    elements.push(new Paragraph({
                        children: text,
                        spacing: { before: 100, after: 100 }
                    }));
                }
            }
            currentIndex += pMatch[0].length;
            continue;
        }
        
        // 처리되지 않은 텍스트 처리 (태그 없이 남은 텍스트)
        if (remainingHtml.trim() && !remainingHtml.startsWith('<')) {
            // 플레이스홀더가 있는지 먼저 확인
            const placeholderMatch = remainingHtml.match(/^__MERMAID_PLACEHOLDER_(\d+)__/);
            if (placeholderMatch) {
                const mermaidIdx = parseInt(placeholderMatch[1]);
                if (mermaidIdx < mermaidImages.length && mermaidImages[mermaidIdx]) {
                    const imageBuffer = mermaidImages[mermaidIdx];
                    elements.push(new Paragraph({
                        children: [
                            new ImageRun({
                                data: imageBuffer,
                                transformation: {
                                    width: 500,
                                    height: 400,
                                },
                            }),
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 200, after: 200 }
                    }));
                }
                currentIndex += placeholderMatch[0].length;
                continue;
            }
            
            // 다음 태그까지의 텍스트 추출
            const nextTagMatch = remainingHtml.match(/^([^<]+)(?=<)/);
            if (nextTagMatch) {
                const text = stripHtmlTags(nextTagMatch[1]);
                // 플레이스홀더가 텍스트에 포함되어 있는지 확인
                if (text.includes('__MERMAID_PLACEHOLDER_')) {
                    const placeholderMatch = text.match(/__MERMAID_PLACEHOLDER_(\d+)__/);
                    if (placeholderMatch) {
                        const mermaidIdx = parseInt(placeholderMatch[1]);
                        if (mermaidIdx < mermaidImages.length && mermaidImages[mermaidIdx]) {
                            const imageBuffer = mermaidImages[mermaidIdx];
                            elements.push(new Paragraph({
                                children: [
                                    new ImageRun({
                                        data: imageBuffer,
                                        transformation: {
                                            width: 500,
                                            height: 400,
                                        },
                                    }),
                                ],
                                alignment: AlignmentType.CENTER,
                                spacing: { before: 200, after: 200 }
                            }));
                        }
                        // 플레이스홀더를 제거한 나머지 텍스트 처리
                        const remainingText = text.replace(/__MERMAID_PLACEHOLDER_\d+__/g, '').trim();
                        if (remainingText) {
                            const runs = parseBoldPatterns(remainingText);
                            elements.push(new Paragraph({
                                children: runs,
                                spacing: { before: 100, after: 100 }
                            }));
                        }
                    }
                } else if (text.trim()) {
                    const runs = parseBoldPatterns(text);
                    elements.push(new Paragraph({
                        children: runs,
                        spacing: { before: 100, after: 100 }
                    }));
                }
                currentIndex += nextTagMatch[0].length;
                continue;
            }
        }

        // hr 태그 처리 (페이지 브레이크)
        if (remainingHtml.startsWith('<hr')) {
            const hrMatch = remainingHtml.match(/^<hr[^>]*\/?>/i);
            if (hrMatch) {
                // Word에서는 페이지 브레이크를 PageBreak 객체로 처리
                elements.push(new PageBreak());
                currentIndex += hrMatch[0].length;
                continue;
            }
        }

        // 처리할 수 없는 경우 한 문자씩 건너뛰기
        // 하지만 무한 루프 방지를 위해 최대 1000번만 시도
        if (currentIndex === htmlLength - 1) {
            // 마지막 문자까지 처리했는데도 남은 것이 있다면 텍스트로 처리
            const remainingText = processedHtml.substring(currentIndex).trim();
            if (remainingText && !remainingText.startsWith('<')) {
                const cleanText = stripHtmlTags(remainingText);
                if (cleanText && cleanText !== remainingText) {
                    // HTML 태그가 제거된 텍스트만 추가
                    const runs = parseBoldPatterns(cleanText);
                    if (runs.length > 0 && runs.some(r => r.text && r.text.trim())) {
                        elements.push(new Paragraph({
                            children: runs,
                            spacing: { before: 100, after: 100 }
                        }));
                    }
                }
            }
            break;
        }
        currentIndex++;
    }
    
    // 마지막으로 남은 플레이스홀더 처리 (혹시 놓친 경우)
    const finalHtml = processedHtml.substring(currentIndex);
    if (finalHtml.includes('__MERMAID_PLACEHOLDER_')) {
        const remainingPlaceholders = finalHtml.match(/__MERMAID_PLACEHOLDER_(\d+)__/g) || [];
        remainingPlaceholders.forEach(placeholder => {
            const match = placeholder.match(/__MERMAID_PLACEHOLDER_(\d+)__/);
            if (match) {
                const mermaidIdx = parseInt(match[1]);
                console.log(`남은 Mermaid 플레이스홀더 ${mermaidIdx} 처리 중...`);
                if (mermaidIdx < mermaidImages.length && mermaidImages[mermaidIdx]) {
                    const imageBuffer = mermaidImages[mermaidIdx];
                    elements.push(new Paragraph({
                        children: [
                            new ImageRun({
                                data: imageBuffer,
                                transformation: {
                                    width: 500,
                                    height: 400,
                                },
                            }),
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 200, after: 200 }
                    }));
                }
            }
        });
    }
    
    // 처리되지 않은 HTML 태그가 있는지 확인하고 제거
    const unprocessedHtml = processedHtml.substring(currentIndex);
    if (unprocessedHtml.trim()) {
        const cleanText = stripHtmlTags(unprocessedHtml);
        if (cleanText.trim() && !cleanText.includes('__MERMAID_PLACEHOLDER_')) {
            const runs = parseBoldPatterns(cleanText);
            if (runs.length > 0 && runs.some(r => r.text && r.text.trim())) {
                elements.push(new Paragraph({
                    children: runs,
                    spacing: { before: 100, after: 100 }
                }));
            }
        }
    }
    
    console.log(`최종 Word 요소 개수: ${elements.length}`);

    return elements;
}

// HTML 내용을 TextRun 배열로 파싱 (인라인 포맷팅 포함)
function parseHtmlContent(html) {
    const runs = [];
    
    // 먼저 HTML 엔티티 디코딩
    let decodedHtml = decodeHtmlEntities(html);
    
    // <strong> 또는 <b> 태그 처리 (볼드)
    const strongRegex = /<(strong|b)[^>]*>(.*?)<\/\1>/gi;
    let processedHtml = decodedHtml;
    let lastIndex = 0;
    let match;
    
    // <strong> 태그를 먼저 처리
    while ((match = strongRegex.exec(decodedHtml)) !== null) {
        // 태그 앞의 텍스트
        if (match.index > lastIndex) {
            const beforeText = decodedHtml.substring(lastIndex, match.index);
            if (beforeText.trim()) {
                // **bold** 패턴이 있을 수 있으므로 재귀적으로 처리
                runs.push(...parseBoldPatterns(beforeText));
            }
        }
        // 볼드 텍스트
        const boldText = stripHtmlTags(match[2]);
        runs.push(new TextRun({ text: boldText, bold: true }));
        lastIndex = match.index + match[0].length;
    }
    
    // 나머지 텍스트 처리
    if (lastIndex < decodedHtml.length) {
        const remainingText = decodedHtml.substring(lastIndex);
        const cleanText = stripHtmlTags(remainingText);
        if (cleanText.trim()) {
            runs.push(...parseBoldPatterns(cleanText));
        }
    }
    
    // <strong> 태그가 없는 경우 직접 처리
    if (runs.length === 0) {
        const cleanText = stripHtmlTags(decodedHtml);
        runs.push(...parseBoldPatterns(cleanText));
    }

    return runs.length > 0 ? runs : [new TextRun('')];
}

// **bold** 패턴을 파싱하는 헬퍼 함수
function parseBoldPatterns(text) {
    const runs = [];
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            const beforeText = text.substring(lastIndex, match.index);
            if (beforeText) {
                runs.push(new TextRun(beforeText));
            }
        }
        runs.push(new TextRun({ text: match[1], bold: true }));
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        const remainingText = text.substring(lastIndex);
        if (remainingText) {
            runs.push(new TextRun(remainingText));
        }
    }
    
    return runs.length > 0 ? runs : [new TextRun(text)];
}

// HTML 엔티티 디코딩
function decodeHtmlEntities(text) {
    const entities = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&apos;': "'",
        '&nbsp;': ' '
    };
    
    // 숫자 엔티티 디코딩 (&#39;, &#x27; 등)
    text = text.replace(/&#(\d+);/g, (match, dec) => {
        return String.fromCharCode(dec);
    });
    
    // 16진수 엔티티 디코딩 (&#x27; 등)
    text = text.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
    });
    
    // 일반 엔티티 디코딩
    for (const entity in entities) {
        text = text.replace(new RegExp(entity, 'g'), entities[entity]);
    }
    
    return text;
}

// HTML 태그 제거 및 엔티티 디코딩
function stripHtmlTags(html) {
    // HTML 태그 제거
    let text = html.replace(/<[^>]*>/g, '');
    // HTML 엔티티 디코딩
    text = decodeHtmlEntities(text);
    return text.trim();
}


async function convertMarkdownToWord(mdFile, outputFile) {
    // Markdown 파일 읽기
    const markdown = fs.readFileSync(mdFile, 'utf8');

    // Custom renderer for mermaid code blocks
    const renderer = new marked.Renderer();
    const originalCodeRenderer = renderer.code.bind(renderer);
    const mermaidCodes = [];

    renderer.code = function (code, language, escaped) {
        const codeText = typeof code === 'object' ? code.text : code;
        const lang = typeof code === 'object' ? code.lang : language;

        if (lang === 'mermaid') {
            mermaidCodes.push(codeText);
            return `<div class="mermaid">${codeText}</div>`;
        }
        // 일반 코드 블록은 그대로 반환
        if (typeof code === 'object') {
            return `<pre><code class="language-${lang || ''}">${codeText}</code></pre>`;
        }
        return `<pre><code class="language-${language || ''}">${code}</code></pre>`;
    };

    // Markdown을 HTML로 변환
    let html = marked.parse(markdown, { renderer: renderer });
    
    // 디버깅: HTML 일부 출력
    console.log('생성된 HTML (처음 500자):', html.substring(0, 500));

    // Puppeteer로 Mermaid 다이어그램을 이미지로 변환
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
    // 페이지 타임아웃 설정 (60초)
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);
    const mermaidImages = [];

    // 각 Mermaid 다이어그램을 이미지로 변환
    console.log(`총 ${mermaidCodes.length}개의 Mermaid 다이어그램을 변환합니다...`);
    if (mermaidCodes.length === 0) {
        console.warn('경고: Mermaid 코드가 없습니다!');
    }
    for (let i = 0; i < mermaidCodes.length; i++) {
        console.log(`Mermaid 다이어그램 ${i + 1}/${mermaidCodes.length} 변환 중...`);
        console.log(`Mermaid 코드 (처음 100자):`, mermaidCodes[i].substring(0, 100));
        const imageBuffer = await mermaidToImage(mermaidCodes[i], page);
        if (imageBuffer && imageBuffer.length > 0) {
            mermaidImages.push(imageBuffer);
            console.log(`Mermaid 다이어그램 ${i + 1}/${mermaidCodes.length} 변환 완료 (${imageBuffer.length} bytes)`);
        } else {
            mermaidImages.push(null);
            console.warn(`Mermaid 다이어그램 ${i + 1}/${mermaidCodes.length} 변환 실패 (null 또는 빈 버퍼)`);
        }
    }
    
    console.log(`변환된 이미지 개수: ${mermaidImages.filter(img => img !== null).length}/${mermaidCodes.length}`);

    await browser.close();

    // HTML을 Word 문서 요소로 변환
    console.log('HTML을 Word 요소로 변환 시작...');
    const elements = htmlToWordElements(html, mermaidImages);
    console.log(`생성된 Word 요소 개수: ${elements.length}`);

    // Word 문서 생성
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    size: {
                        orientation: PageOrientation.PORTRAIT,
                        width: 11906, // A4 너비: 8.27인치 = 11906 DXA (1/20 포인트)
                        height: 16838 // A4 높이: 11.69인치 = 16838 DXA
                    },
                    margin: {
                        top: 1440,    // 1인치 = 1440 DXA
                        right: 1440,
                        bottom: 1440,
                        left: 1440
                    }
                }
            },
            children: elements
        }],
    });

    // 파일로 저장
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputFile, buffer);
    console.log(`Word 문서 생성 완료: ${outputFile}`);
}

// Export function for use as a module
module.exports = { convertMarkdownToWord };

// CLI 실행 부분 (직접 실행 시에만)
if (require.main === module) {
    const mdFile = process.argv[2];
    const outputFile = process.argv[3] || mdFile.replace('.md', '.docx');

    if (!mdFile) {
        console.error('Usage: node convert-to-word.js <input.md> [output.docx]');
        process.exit(1);
    }

    convertMarkdownToWord(mdFile, outputFile).catch(console.error);
}
