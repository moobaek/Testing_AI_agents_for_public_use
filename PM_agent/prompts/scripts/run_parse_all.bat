@echo off
chcp 65001 > nul
echo ========================================
echo PM 문서 파싱 도구 - 일괄 실행
echo ========================================

:: 경로 설정
set BACKGROUND_PATH=..\..\..\background
set OUTPUT_PATH=..\temp

:: 의존성 확인
python -c "import docx, pandas, openpyxl" 2>nul
if errorlevel 1 (
    echo [!] 의존성 설치 중...
    pip install python-docx pandas openpyxl xlrd
)

echo.
echo [1/3] 전체 문서 파싱 중...
python parse_documents.py --input "%BACKGROUND_PATH%" --output "%OUTPUT_PATH%"

echo.
echo [2/3] 회의록 상세 파싱 중...
for %%f in ("%BACKGROUND_PATH%\회의록 정리\*.docx") do (
    if not "%%~nf"==* (
        echo   - %%~nf
        python parse_meeting.py --file "%%f" --output "%OUTPUT_PATH%\meeting_%%~nf.json"
    )
)

echo.
echo [3/3] 주간보고 상세 파싱 중...
for %%f in ("%BACKGROUND_PATH%\주간보고\*.xlsx") do (
    echo   - %%~nf
    python parse_excel.py --file "%%f" --type weekly --output "%OUTPUT_PATH%\weekly_%%~nf.json"
)

echo.
echo ========================================
echo 완료! 결과: %OUTPUT_PATH%
echo ========================================
pause
