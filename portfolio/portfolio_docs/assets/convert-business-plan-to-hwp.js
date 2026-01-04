const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function convertMarkdownToHWP(mdFile, outputFile) {
    const pythonScript = path.join(__dirname, 'convert-markdown-to-docx.py');
    const docxFile = outputFile.replace('.hwp', '.docx').replace('.docx', '.docx');
    
    // 절대 경로로 변환
    const mdFileAbs = path.isAbsolute(mdFile) ? mdFile : path.resolve(process.cwd(), mdFile);
    const docxFileAbs = path.isAbsolute(docxFile) ? docxFile : path.resolve(process.cwd(), docxFile);
    const pythonScriptAbs = path.resolve(__dirname, 'convert-markdown-to-docx.py');
    
    // Python 스크립트 실행
    try {
        console.log('Markdown을 DOCX로 변환 중...');
        const { stdout, stderr } = await execAsync(
            `python "${pythonScriptAbs}" "${mdFileAbs}" "${docxFileAbs}"`
        );
        
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        
        console.log(`\n변환 완료: ${docxFileAbs}`);
        console.log('\n다음 단계:');
        console.log('1. 한글과컴퓨터 한글 프로그램 실행');
        console.log(`2. "${docxFileAbs}" 파일 열기`);
        console.log('3. 파일 > 다른 이름으로 저장 > HWP 형식 선택');
        console.log(`4. "${docxFileAbs.replace('.docx', '.hwp')}"로 저장`);
        
    } catch (error) {
        console.error('변환 중 오류 발생:', error.message);
        if (error.message.includes('python')) {
            console.error('\nPython이 설치되어 있지 않거나 PATH에 없습니다.');
            console.error('Python 3.x를 설치하고 PATH에 추가하세요.');
        }
        if (error.message.includes('python-docx') || error.message.includes('markdown')) {
            console.error('\n필요한 Python 라이브러리를 설치하세요:');
            console.error('pip install python-docx markdown');
        }
        process.exit(1);
    }
}

// 명령줄 인수 처리
const mdFile = process.argv[2];
const outputFile = process.argv[3] || mdFile.replace('.md', '.docx');

if (!mdFile) {
    console.error('사용법: node convert-business-plan-to-hwp.js <input.md> [output.docx]');
    console.error('\n참고: 이 스크립트는 DOCX 파일을 생성합니다.');
    console.error('한글과컴퓨터에서 DOCX를 열어 HWP로 저장하세요.');
    process.exit(1);
}

if (!fs.existsSync(mdFile)) {
    console.error(`파일을 찾을 수 없습니다: ${mdFile}`);
    process.exit(1);
}

convertMarkdownToHWP(mdFile, outputFile).catch(console.error);

