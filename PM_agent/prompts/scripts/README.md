# PM 문서 파싱 도구

## 📁 구조

```
scripts/
├── parse_documents.py   # 통합 파서 (전체 폴더 처리)
├── parse_meeting.py     # 회의록 전용 파서
├── parse_excel.py       # 엑셀 전용 파서 (주간보고/견적서/이슈)
├── run_parse_all.bat    # Windows 일괄 실행
└── README.md            # 이 파일
```

---

## 🚀 사용법

### 1. 의존성 설치

```bash
pip install python-docx pandas openpyxl xlrd
```

### 2. 전체 폴더 파싱

```bash
python parse_documents.py --input ../../../background --output ../temp
```

### 3. 개별 파일 파싱

```bash
# 회의록
python parse_meeting.py --file "회의록.docx" --output parsed.json

# 주간보고
python parse_excel.py --file "주간보고.xlsx" --type weekly

# 견적서
python parse_excel.py --file "견적서.xls" --type quotation

# 이슈리스트
python parse_excel.py --file "이슈리스트.xlsx" --type issue
```

---

## 📊 지원 형식

| 형식 | 도구 | 대상 문서 |
|------|------|----------|
| DOCX | python-docx | 회의록, 과업지시서, 계약서 |
| XLSX | pandas+openpyxl | 주간보고, 견적서, 이슈리스트 |
| XLS | pandas+xlrd | 레거시 견적서 |
| MD | 내장 | 마크다운 문서 |

---

## 🔗 연동 기능

파싱 결과에 자동 연동 제안 포함:

| 감지 | 연동 프롬프트 |
|------|--------------|
| 요구사항 변경 | Document_Update_Checker |
| 일정 변경 | Progress_Tracker |
| 이슈 발생 | Troubleshooting_Management |

---

## 📤 출력 예시

```json
{
  "filename": "주간보고_251222.xlsx",
  "type": "weekly_report",
  "extracted": {
    "progress_rate": 75.0,
    "issues": ["API 지연", "인증 오류"]
  },
  "sync_suggestions": [
    {"type": "Progress_Tracker", "reason": "진행률 업데이트"}
  ]
}
```
