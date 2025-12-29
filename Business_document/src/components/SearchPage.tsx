import React, { useState, useEffect, useMemo } from 'react';
import { Search, FileText, Folder } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SearchResult {
  title: string;
  path: string;
  fileName: string;
  excerpt: string;
  type: 'file' | 'folder';
}

interface SearchPageProps {
  onNavigate?: (path: string) => void;
}

// 검색 가능한 파일 목록 (실제로는 서버에서 가져와야 함)
const searchableFiles = [
  {
    title: 'README',
    path: '/README',
    fileName: 'README.md',
    content: 'Obsidian Design Origin ID 기반 온톨로지 맵 문서 시스템 프로젝트 설계부터 구현, 테스트, 문서화까지 전체 개발 워크플로우를 관리하는 통합 문서 시스템',
    type: 'file' as const
  },
  {
    title: 'Portfolio Index',
    path: '/portfolio/index',
    fileName: '00_Portfolio_Index.md',
    content: 'AI 업무 혁신: 9단계 실행 가이드 핵심 철학 자신이 가장 잘 아는 도메인에서 작고 확실한 성공을 거두고 지식을 자산화하여 피드백을 통해 끊임없이 확장',
    type: 'file' as const
  },
  {
    title: 'Key Achievements',
    path: '/portfolio/key-achievements',
    fileName: '01_Key_Achievements.md',
    content: '주요 성과 및 성취 비즈니스 가치 창출 기술적 혁신 프로젝트 성공 사례',
    type: 'file' as const
  },
  {
    title: 'Business Value',
    path: '/portfolio/business-value',
    fileName: '02_Business_Value.md',
    content: '비즈니스 가치 및 영향 ROI 측정 성과 지표 경제적 효과',
    type: 'file' as const
  },
  {
    title: 'Projects Overview',
    path: '/portfolio/projects-overview',
    fileName: '02_Projects_Overview.md',
    content: '13개 주요 프로젝트 솔루션 요약 플랫폼 AI 센서 솔루션',
    type: 'file' as const
  },
  {
    title: 'Technology Simplified',
    path: '/portfolio/technology-simplified',
    fileName: '03_Technology_Simplified.md',
    content: '기술 단순화 및 최적화 아키텍처 설계 시스템 통합',
    type: 'file' as const
  },
  {
    title: 'Visual Portfolio',
    path: '/portfolio/visual-portfolio',
    fileName: '04_Visual_Portfolio.md',
    content: '시각적 포트폴리오 다이어그램 차트 그래프 시각화',
    type: 'file' as const
  },
  {
    title: 'Academic Publications',
    path: '/portfolio/academic-publications',
    fileName: '04_Academic_Publications.md',
    content: '학술 연구 및 논문 성과 2020-2025 연구 결과 출판물',
    type: 'file' as const
  },
  {
    title: 'Step 01: Repetitive Work',
    path: '/execution-guide/step-01-repetitive-work',
    fileName: 'Step_01_Repetitive_Work.md',
    content: '반복 업무 식별 자동화 효율성 개선 프로세스 최적화',
    type: 'file' as const
  },
  {
    title: 'Step 02: Expertise Targeting',
    path: '/execution-guide/step-02-expertise-targeting',
    fileName: 'Step_02_Expertise_Targeting.md',
    content: '도메인 타겟팅 전문성 활용 핵심 역량 집중',
    type: 'file' as const
  },
  {
    title: 'Step 03: Micro Starts',
    path: '/execution-guide/step-03-micro-starts',
    fileName: 'Step_03_Micro_Starts.md',
    content: '초소형 단위 시작 작은 성공 점진적 확장',
    type: 'file' as const
  },
  {
    title: 'Step 04: Modularization',
    path: '/execution-guide/step-04-modularization',
    fileName: 'Step_04_Modularization.md',
    content: '모듈화 전략 컴포넌트 분리 재사용성 향상',
    type: 'file' as const
  },
  {
    title: 'Step 05: IO Optimization',
    path: '/execution-guide/step-05-io-optimization',
    fileName: 'Step_05_IO_Optimization.md',
    content: 'I/O 최적화 성능 향상 데이터 처리 효율성',
    type: 'file' as const
  },
  {
    title: 'Step 06: Daily Log',
    path: '/execution-guide/step-06-daily-log',
    fileName: 'Step_06_Daily_Log.md',
    content: '데일리 로그 기록 진행 상황 추적 지식 축적',
    type: 'file' as const
  },
  {
    title: 'Step 07: Visuals',
    path: '/execution-guide/step-07-visuals',
    fileName: 'Step_07_Visuals.md',
    content: '시각적 자산 생성 다이어그램 차트 인포그래픽',
    type: 'file' as const
  },
  {
    title: 'Step 08: Feedback Loop',
    path: '/execution-guide/step-08-feedback-loop',
    fileName: 'Step_08_Feedback_Loop.md',
    content: '피드백 루프 지속적 개선 사용자 의견 반영',
    type: 'file' as const
  },
  {
    title: 'Step 09: Continuous Update',
    path: '/execution-guide/step-09-continuous-update',
    fileName: 'Step_09_Continuous_Update.md',
    content: '지속적 업데이트 버전 관리 점진적 개선',
    type: 'file' as const
  },
  {
    title: 'Architecture Overview',
    path: '/architecture/overview',
    fileName: 'Architecture_Overview.md',
    content: '통합 시스템 아키텍처 설계 패턴 기술 스택',
    type: 'file' as const
  },
  {
    title: 'Testing Context',
    path: '/testing/context',
    fileName: 'Testing_Context.md',
    content: '실증 및 검증 사례 세아특수강 포미아 테스트 결과',
    type: 'file' as const
  },
  {
    title: '요구조건기술내용',
    path: '/requirements/technical-requirements',
    fileName: '요구조건기술내용.md',
    content: '기술 요구사항 시스템 사양 성능 기준',
    type: 'file' as const
  }
];

export const SearchPage: React.FC<SearchPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // 검색 결과 필터링
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return searchableFiles
      .filter(file => 
        file.title.toLowerCase().includes(query) ||
        file.content.toLowerCase().includes(query) ||
        file.fileName.toLowerCase().includes(query)
      )
      .map(file => ({
        title: file.title,
        path: file.path,
        fileName: file.fileName,
        excerpt: getExcerpt(file.content, query),
        type: file.type
      }))
      .slice(0, 20); // 최대 20개 결과
  }, [searchQuery]);

  // 검색어 주변 텍스트 추출
  const getExcerpt = (content: string, query: string): string => {
    const index = content.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return content.substring(0, 150) + '...';
    
    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + query.length + 50);
    const excerpt = content.substring(start, end);
    
    return (start > 0 ? '...' : '') + excerpt + (end < content.length ? '...' : '');
  };

  // 검색어 하이라이트
  const highlightQuery = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleResultClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* 검색 헤더 */}
      <div className="border-b border-border bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-normal border-b border-border pb-2 mb-6">
            검색
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="문서 내용, 제목, 파일명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 text-base h-12"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* 검색 결과 */}
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto p-6">
          {searchQuery.trim() && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                "{searchQuery}"에 대한 검색 결과 {filteredResults.length}개
              </p>
            </div>
          )}

          {searchQuery.trim() && filteredResults.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground">
                다른 키워드로 검색해보세요.
              </p>
            </div>
          )}

          {!searchQuery.trim() && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">문서 검색</h3>
              <p className="text-muted-foreground mb-6">
                위키 내의 모든 문서를 검색할 수 있습니다.
              </p>
              <div className="text-left max-w-md mx-auto space-y-2 text-sm text-muted-foreground">
                <p><strong>검색 팁:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>문서 제목, 내용, 파일명으로 검색 가능</li>
                  <li>한글과 영문 모두 지원</li>
                  <li>부분 검색 지원 (예: "AI", "업무", "가이드")</li>
                </ul>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {filteredResults.map((result, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleResultClick(result.path)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {result.type === 'file' ? (
                        <FileText className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Folder className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-blue-600 hover:underline mb-1">
                        {highlightQuery(result.title, searchQuery)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {result.path}
                      </p>
                      <p className="text-sm leading-relaxed">
                        {highlightQuery(result.excerpt, searchQuery)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};