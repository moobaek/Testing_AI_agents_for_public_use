# 권순룡 경력기술서 - SK하이닉스 제조AI Data팀 온톨로지전문가 Data Engineer

> **핵심 철학**: "모델보다 데이터, 데이터보다 정보, 지식구조를 정리하는 현장친화적 연구원"

입사(2020.09)부터 온톨로지 기반 구조화/정보화 접근법을 모든 프로젝트에 적용해왔습니다. 피쉬본(FBS) 구조에서 시작하여 5층 아키텍처, 베이지안 네트워크, 지식그래프까지 모두 이 접근법의 연장선에 있습니다.

---

## 프로젝트 1: OntoFlow - 온톨로지 기반 지식그래프 플랫폼

**① 프로젝트명**: OntoFlow (Ontology-based Knowledge Flow Platform)  
**② 고객사/Domain**: 한솔코에버 / 제조 데이터 통합  
**③ 수행 기간**: 2026.01 ~ 현재 (진행중)  
**④ 업무 내용**:
- Obsidian 기반 문서에서 자동으로 온톨로지를 추출하여 지식그래프로 시각화하는 플랫폼 개발
- 엔티티 추출(파일, 태그, 링크), 관계 추출(wiki link, markdown link, tag relation) 자동화
- Neo4j 스타일 그래프 데이터 모델 설계 및 IndexedDB 기반 레이아웃 영속화
- LangChain/LangGraph 기반 AI 서비스 연동 준비
- Python FastAPI 백엔드 + React 프론트엔드 연동, RESTful API 설계 및 구현

**⑤ 담당 역할**: PM 및 핵심 아키텍처 설계
- 온톨로지 모델링: 문서-태그-링크 간 관계 스키마 설계, 298개+ 설계 문서에서 자동으로 온톨로지 추출
- 지식그래프 구축: vis-network 기반 인터랙티브 그래프 시각화, IndexedDB 기반 레이아웃 영속화
- 데이터 파이프라인: Python FastAPI 백엔드 + React 프론트엔드 연동
- API 기반 데이터 서비스: RESTful API 설계 및 구현

**⑥ 보유/활용 Skill**: Python, FastAPI, Neo4j, React, TypeScript, vis-network, IndexedDB, Docker, LangChain, LangGraph

**성과**:
- 298개+ 설계 문서 온톨로지 자동 추출 시스템 구축
- 문서 간 관계 시각화로 지식 자산 효율적 관리

---

## 프로젝트 2: DPS (Digital Production System) - 5층 아키텍처 지식기반 플랫폼

**① 프로젝트명**: DPS (데이터수집시스템)  
**② 고객사/Domain**: 세아특수강, 포미아(포항소재산업진흥원) / 금속산업 제조  
**③ 수행 기간**: 2021 ~ 2024 (정식 납품 완료)  
**④ 업무 내용**:
- 금속산업 5대 공정(용해, 정련, 연주, 압연, 열처리)의 이질적인 데이터 소스를 통합하는 지식기반 데이터 플랫폼 개발
- 1.센서수집 → 2.중앙저장관리 → 3.POP/MES → 4.AMS+확률네트워크 → 5.LLM FMEA 생성 5층 아키텍처 설계
- Neo4j 그래프 DB 기반 지식그래프 플랫폼 구축, 4M2E(Man, Machine, Material, Method, Environment, Energy) 관계 온톨로지 정의
- Kafka 기반 실시간 데이터 파이프라인 구축, 스트리밍 처리
- Docker/Kubernetes 기반 마이크로서비스 아키텍처 구현, 서버-엣지 하이브리드 인프라

**⑤ 담당 역할**: PM 및 핵심 아키텍처 설계
- 온톨로지 레이어 설계: 제조 공정 데이터의 의미적 관계 정의, 공정-설비-품질-재료 간의 의미적 관계 정의
- 지식그래프 저장: Neo4j 기반 공정-설비-품질 데이터 통합, 확률 네트워크 저장 구조 설계
- 데이터 파이프라인: Kafka 기반 실시간 데이터 수집 및 오케스트레이션, 데이터 메쉬 아키텍처 구현
- API 기반 서비스: FastAPI RESTful API 개발

**⑥ 보유/활용 Skill**: Python, FastAPI, Neo4j, PostgreSQL, Redis, Docker, Kubernetes, Kafka, Microservices

**성과**:
- 세아특수강, 포미아 정식 납품 완료
- 2024년 학술 논문 발표
- 데이터 분석 시간 3일 → 10분 단축

---

## 프로젝트 3: Factory Ontology Manager - 제조 공정 온톨로지 관리 시스템

**① 프로젝트명**: Factory Ontology Manager  
**② 고객사/Domain**: 한솔코에버 / 제조 공정 관리  
**③ 수행 기간**: 2025.01 ~ 현재 (진행중)  
**④ 업무 내용**:
- 제조 공장의 공정 흐름을 온톨로지로 모델링하는 시스템 개발
- Factory → Workshop → Line → Process 계층 구조를 온톨로지로 모델링
- 자연어 기반 공정 문서를 파싱하여 공정 노드와 연결을 자동으로 생성
- DB Grounding과 Ontology Mapping을 통해 실제 DB의 설비/센서 ID로 자동 매핑
- 공정 노드(ProcessNode)와 연결(ProcessConnection) 기반 지식그래프 구축
- 재료-공정-설비 간 관계 정의 및 시각화, 레이아웃 영속화 및 연결 검증 시스템 구현

**⑤ 담당 역할**: 온톨로지 모델링 및 시스템 설계
- 온톨로지 모델링: Factory → Workshop → Line → Process 계층 구조 설계, 재료-공정-설비 간 관계 정의
- 엔티티/관계 추출: 자연어 기반 공정 문서 파싱, DB Grounding 및 Ontology Mapping
- 지식그래프 저장: IndexedDB 기반 레이아웃 캐시
- 데이터 통합: 공정 노드와 연결의 무결성 검증

**⑥ 보유/활용 Skill**: React, TypeScript, Flask, LangGraph, Instructor, AI_DB_center, IndexedDB, vis-network

**성과**:
- 레이아웃 생성 시간 80% 단축
- 데이터 일관성 향상
- 공장 사람들이 직접 수정 가능하게 함 (2020년 전무님의 비전 실현)

---

## 프로젝트 4: AMS (Analysis Management System) - 베이지안 네트워크 기반 이상탐지

**① 프로젝트명**: AMS - AI 종합 플랫폼  
**② 고객사/Domain**: 세아특수강, 포미아 / 제조 품질관리  
**③ 수행 기간**: 2024.07 ~ 2025.12 (GS 인증 1등급 취득)  
**④ 업무 내용**:
- 베이지안 네트워크 기반 이상탐지 시스템 개발
- 시계열 분석 데이터를 정보 온톨로지로 변환하는 알고리즘 개발
- 피쉬본 다이어그램 자동생성 및 FMEA 자동화
- 확률 최적화(경사하강법)를 통한 이상상황 확률 네트워크 구축
- Neo4j 그래프 DB에 확률 네트워크 저장, 4M2E 관계 온톨로지 정의

**⑤ 담당 역할**: PM 및 AI 플랫폼 개발 총괄
- 엔티티 추출: 공정 변수, 설비 상태, 품질 지표 자동 추출
- 관계 추출: 인과관계 네트워크 자동 구축 (베이지안 네트워크)
- 데이터 통합: 다중 소스 데이터 통합 및 정규화
- 추론 엔진: 확률적 추론을 통한 이상 원인 분석, 확률 네트워크 최적 경로 도출

**⑥ 보유/활용 Skill**: Python, 베이지안 네트워크, Neo4j, PostgreSQL, FastAPI, Docker, Kubernetes, Grafana, Prometheus, 확률 최적화

**성과**:
- GS 인증 1등급 취득 (PDS 명칭)
- 이상탐지율 93.7% 달성
- 특허 출원/등록 5건 (온톨로지 구조화/정보화 관련)
- 2024년, 2025년 학술 논문 발표

---

## 프로젝트 5: PM Agent - 32개 MCP 서버 기반 사업 관리 시스템

**① 프로젝트명**: PM Agent (Business Management Sub-Agent)  
**② 고객사/Domain**: 한솔코에버 / 프로젝트 관리 자동화  
**③ 수행 기간**: 2026.01 ~ 현재 (진행중)  
**④ 업무 내용**:
- MCP (Model Context Protocol) 기반 비정형 문서 자동 분석 시스템 개발
- 32개 Python MCP 서버 개발 및 데이터 파이프라인 구축
- HWP, DOCX, XLSX 등 비정형 문서 자동 파싱 시스템 구현
- LangChain, LangGraph 기반 AI 서비스 연동
- LangGraph 기반 자연어 인터페이스 개발, 테스트 실행 및 결과 조회 자동화

**⑤ 담당 역할**: MCP 서버 설계 및 개발
- 데이터 파이프라인: 문서 수집 → 파싱 → 분석 → 서비스 자동화
- 오케스트레이션: 32개 MCP 서버 간 워크플로우 관리, 데이터 파이프라인 오케스트레이션
- API 기반 서비스: Docker 기반 파서 서버 및 RESTful API

**⑥ 보유/활용 Skill**: Python, MCP Protocol, Docker, FastAPI, LangChain, LangGraph, Claude Agent

**성과**:
- 데이터 파이프라인 관리 시간 80% 이상 절감
- 사업 관리 자동화로 일정 및 리스크 관리 효율성 향상

---

## 프로젝트 6: FMEA 자동화 생성 시스템 - Multi-Agent Workflow

**① 프로젝트명**: FMEA 자동화 생성 시스템  
**② 고객사/Domain**: 한솔코에버 / 제조 품질관리  
**③ 수행 기간**: 2025.6 ~ 현재 (진행중)  
**④ 업무 내용**:
- Claude Sub-Agent 기반 Multi-Agent Workflow 구축
- 8개 독립 Sub-Agent 협업 구조 설계 (R&D, Mfg, QA 등 각 영역별 전문 Sub-Agent)
- LangGraph 기반 Phase 0~5 자동화 워크플로우 구현
- AIAG & VDA FMEA 표준 기반 범용 리스크 분석 시스템 구축
- 도메인별 용어 자동 조정 기능 구현

**⑤ 담당 역할**: Multi-Agent 시스템 설계
- Multi-Agent Workflow: 8개 독립 Sub-Agent 협업 구조 설계, Master Orchestrator 설계
- LangGraph 기반: Phase 0~5 자동화 워크플로우 구현, 코딩 에이전트 역설계 시스템 구조 적용
- AI 서비스: Claude Sub-Agent 기반 AI 서비스 개발

**⑥ 보유/활용 Skill**: Python, Claude Agent, LangGraph, Multi-Agent

**성과**:
- FMEA 문서 생성 시간 70% 이상 절감
- 공장 관리자 이해도 90% 이상 향상
- 기술 설명 시간 70% 이상 절감

---

## 기술 역량 요약

### 핵심기술 매칭

| SK하이닉스 요구사항 | 보유 역량 | 관련 프로젝트 |
|:---|:---|:---|
| 온톨로지 모델링 및 관리 | 문서-공정-설비 온톨로지 설계 경험, Factory → Workshop → Line → Process 계층 설계 | OntoFlow, Factory Ontology Manager, DPS |
| 지식 그래프 구축 및 저장 | Neo4j, IndexedDB 기반 지식그래프, vis-network 인터랙티브 그래프 | DPS, AMS, OntoFlow, Factory Ontology Manager |
| 엔티티 추출, 관계 추출 | 자동 엔티티/관계 추출 알고리즘, 자연어 기반 공정 문서 파싱, DB Grounding 및 Ontology Mapping | OntoFlow, Factory Ontology Manager, AMS |
| 데이터 통합 및 추론 | 베이지안 네트워크 기반 추론, 확률 네트워크 최적 경로 도출, 이상탐지율 93.7% | AMS, DPS |
| 데이터 파이프라인 및 오케스트레이션 | Kafka, MCP 기반 파이프라인, 32개 MCP 서버 오케스트레이션, 5층 아키텍처 | DPS, PM Agent |
| LangChain, LangGraph & AI 서비스 | MCP 서버, Multi-Agent Workflow, LangGraph 자연어 인터페이스 | PM Agent, OntoFlow, FMEA 자동화 |
| API 기반 데이터 서비스 | FastAPI RESTful API, SSE 엔드포인트 | 전체 프로젝트 |
| 데이터 메쉬(Data Mesh) 아키텍처 | 5층 아키텍처, Microservices 기반 | DPS |
| 클라우드 데이터 플랫폼 | Docker, Kubernetes 기반, 서버-엣지 하이브리드 인프라 | DPS, PM Agent |

### 우대사항 매칭

| SK하이닉스 우대사항 | 보유 역량 | 관련 프로젝트 |
|:---|:---|:---|
| Apache Project 오픈소스 실시간 데이터 서비스 | Kafka 기반 실시간 파이프라인, SSE 기반 실시간 서비스 개발 경험 | DPS, Data Hub |
| 데이터 카탈로그 및 메타데이터 관리 | OntoFlow 메타데이터 자동 추출 및 관리, 문서-태그-링크 관계 스키마 | OntoFlow |

---

## 학술 성과 (온톨로지/데이터 관련)

1. **분석 상관/확률 네트워크 최적 경로 정보 및 공정 관리 문서 기반 FMEA 생성 연구** (2025.12) - FMEA 자동화 프로젝트 기반
2. **AI를 활용한 구조와 룰을 활용한 구조-확률 종합 네트워크 및 최적 관리 방안 도출** (2025.06) - AMS 프로젝트 기반
3. **공장 운영 핵심 요소의 식별 및 최적화를 위한 클러스터링 기법 적용** (2024.12) - DPS 프로젝트 기반
4. **설비 이상상태 기반 최적 공정 데이터 추론 및 위험/안전 관리 최적 자동화** (2024.12) - AMS 프로젝트 기반
5. **전력 데이터를 통한 설비 상태 추론 및 이상 상황 설정 예측** (2024.07) - 에너지 패턴 분석 프로젝트 기반

**총 논문 발표**: 10편 (2020-2025)

---

## 특허 출원/등록 현황

1. **인공지능을 활용한 공정 최적화 관리를 위한 공정 관리 방법 및 그 시스템** (2025.08.13) - 출원완료, 심사청구완료
2. **공정 최적화를 위한 공정 관리 방법 및 그 시스템** (2025.03.28) - 등록결정(2025.12.09)
3. **생산공정 에너지 및 설비상태 데이터 처리를 위한 전력 사용 패턴 분석 및 상태 분석 방법** (2023.12.26) - 공개, 심사청구완료
4. **주기 데이터 분석 기반의 전력 추이 상황적 불량 이상 검증 방법** (2023.12.26) - 공개, 심사청구완료
5. **설비 제어 특성 로그 데이터와 에너지 소비패턴 모델을 활용한 인공지능 기반의 이상 탐지 방법 및 장치** (2021.12.07) - 등록결정(2025.10.28)

**총 특허 출원/등록**: 5건 (2건 등록결정 완료, 3건 심사 진행 중, 총 청구항 39개)

---

## 인증 및 자격

- **GS 인증 1등급** (CoCTK, 2024) - 정부 공인 우수 소프트웨어
- **GS 인증 1등급** (AMS-PDS, 2025) - 정부 공인 우수 소프트웨어

---

## 연락처

- **이름**: 권순룡
- **이메일**: m920831@naver.com
- **전화번호**: 010-5671-6200
- **소속**: (주)한솔코에버 연구소 대리 (2020.09 ~ 재직중)
- **GitHub**: https://github.com/moobaek

---

© 2026 권순룡. All Rights Reserved.

*본 경력기술서는 SK하이닉스 제조AI Data팀 온톨로지전문가 Data Engineer 직무에 특화되어 작성되었습니다.*
