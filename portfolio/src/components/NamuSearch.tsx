// ID: comp.search.namu_search
// 참조: architecture/Component_Interfaces_Design.md#component-namusearch-comp-search-namu-search
// 참조: architecture/Screen_Design.md#flow-document-search
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, FileText, Clock, User, Tag, ChevronUp, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SearchResult {
  title: string;
  path: string;
  fileName: string;
  excerpt: string;
  type: 'file' | 'folder';
  category: string;
  lastModified: string;
}

interface NamuSearchProps {
  onNavigate?: (path: string) => void;
  initialQuery?: string;
}

// 검색 가능한 파일 목록 (전체 업로드된 파일들)
const searchableFiles = [
  {
    title: 'README',
    path: '/',
    fileName: 'README.md',
    content: 'Obsidian Design Origin ID 기반 온톨로지 맵 문서 시스템 프로젝트 설계부터 구현, 테스트, 문서화까지 전체 개발 워크플로우를 관리하는 통합 문서 시스템',
    type: 'file' as const,
    category: '시스템',
    lastModified: '2024-12-20'
  },
  {
    title: 'AI 업무 혁신: 9단계 실행 가이드',
    path: '/portfolio/index',
    fileName: '00_Portfolio_Index.md',
    content: 'AI 업무 혁신: 9단계 실행 가이드 핵심 철학 자신이 가장 잘 아는 도메인에서 작고 확실한 성공을 거두고 지식을 자산화하여 피드백을 통해 끝없이 확장',
    type: 'file' as const,
    category: '포트폴리오',
    lastModified: '2024-12-19'
  },
  {
    title: '관계 맵',
    path: '/portfolio/relationship-map',
    fileName: '00_Relationship_Map.md',
    content: '관계 맵 연결 관계 네트워크 상호작용 시스템 구조',
    type: 'file' as const,
    category: '포트폴리오',
    lastModified: '2024-12-18'
  },
  {
    title: '비기술자를 위한 개요',
    path: '/portfolio/overview-non-technical',
    fileName: '00_Overview_For_Non_Technical.md',
    content: '비기술자 개요 쉽게 이해하기 전체 그림 비즈니스 가치',
    type: 'file' as const,
    category: '포트폴리오',
    lastModified: '2024-12-18'
  },
  {
    title: '주요 성과',
    path: '/portfolio/key-achievements',
    fileName: '01_Key_Achievements.md',
    content: '주요 성과 및 성취 비즈니스 가치 창출 기술적 혁신 프로젝트 성공 사례',
    type: 'file' as const,
    category: '포트폴리오',
    lastModified: '2024-12-17'
  },
  {
    title: '비즈니스 가치',
    path: '/portfolio/business-value',
    fileName: '02_Business_Value.md',
    content: '비즈니스 가치 및 영향 ROI 측정 성과 지표 경제적 효과',
    type: 'file' as const,
    category: '포트폴리오',
    lastModified: '2024-12-17'
  },
  {
    title: '프로젝트 개요',
    path: '/portfolio/projects-overview',
    fileName: '02_Projects_Overview.md',
    content: '13개 주요 프로젝트 솔루션 요약 플랫폼 AI 센서 솔루션',
    type: 'file' as const,
    category: '포트폴리오',
    lastModified: '2024-12-16'
  },
  {
    title: '기술 간소화',
    path: '/portfolio/technology-simplified',
    fileName: '03_Technology_Simplified.md',
    content: '기술 간소화 쉽게 이해하기 기술 스택 아키텍처',
    type: 'file' as const,
    category: '포트폴리오',
    lastModified: '2024-12-16'
  },
  {
    title: '비주얼 포트폴리오',
    path: '/portfolio/visual-portfolio',
    fileName: '04_Visual_Portfolio.md',
    content: '비주얼 포트폴리오 시각적 자료 이미지 차트 그래프',
    type: 'file' as const,
    category: '포트폴리오',
    lastModified: '2024-12-15'
  },
  {
    title: '학술 발표',
    path: '/portfolio/academic-publications',
    fileName: '04_Academic_Publications.md',
    content: '학술 발표 논문 연구 결과 학회 발표 자료',
    type: 'file' as const,
    category: '포트폴리오',
    lastModified: '2024-12-15'
  },
  {
    title: '1단계: 반복 업무 식별',
    path: '/execution-guide/step-01-repetitive-work',
    fileName: 'Step_01_Repetitive_Work.md',
    content: '반복 업무 식별 자동화 효율성 개선 프로세스 최적화',
    type: 'file' as const,
    category: '실행 가이드',
    lastModified: '2024-12-14'
  },
  {
    title: '2단계: 전문성 타겟팅',
    path: '/execution-guide/step-02-expertise-targeting',
    fileName: 'Step_02_Expertise_Targeting.md',
    content: '도메인 타겟팅 전문성 활용 핵심 역량 집중',
    type: 'file' as const,
    category: '실행 가이드',
    lastModified: '2024-12-14'
  },
  {
    title: '3단계: 마이크로 시작',
    path: '/execution-guide/step-03-micro-starts',
    fileName: 'Step_03_Micro_Starts.md',
    content: '마이크로 시작 작은 성공 점진적 개선 단계별 접근',
    type: 'file' as const,
    category: '실행 가이드',
    lastModified: '2024-12-13'
  },
  {
    title: '4단계: 모듈화',
    path: '/execution-guide/step-04-modularization',
    fileName: 'Step_04_Modularization.md',
    content: '모듈화 재사용 가능한 컴포넌트 시스템 설계',
    type: 'file' as const,
    category: '실행 가이드',
    lastModified: '2024-12-13'
  },
  {
    title: '5단계: IO 최적화',
    path: '/execution-guide/step-05-io-optimization',
    fileName: 'Step_05_IO_Optimization.md',
    content: 'IO 최적화 입출력 효율성 데이터 처리 성능 개선',
    type: 'file' as const,
    category: '실행 가이드',
    lastModified: '2024-12-12'
  },
  {
    title: '6단계: 일일 로그',
    path: '/execution-guide/step-06-daily-log',
    fileName: 'Step_06_Daily_Log.md',
    content: '일일 로그 기록 관리 진행 상황 추적 성과 측정',
    type: 'file' as const,
    category: '실행 가이드',
    lastModified: '2024-12-12'
  },
  {
    title: '7단계: 비주얼',
    path: '/execution-guide/step-07-visuals',
    fileName: 'Step_07_Visuals.md',
    content: '비주얼 시각화 차트 그래프 대시보드 데이터 시각화',
    type: 'file' as const,
    category: '실행 가이드',
    lastModified: '2024-12-11'
  },
  {
    title: '8단계: 피드백 루프',
    path: '/execution-guide/step-08-feedback-loop',
    fileName: 'Step_08_Feedback_Loop.md',
    content: '피드백 루프 지속적 개선 사용자 피드백 성능 모니터링',
    type: 'file' as const,
    category: '실행 가이드',
    lastModified: '2024-12-11'
  },
  {
    title: '9단계: 지속적 업데이트',
    path: '/execution-guide/step-09-continuous-update',
    fileName: 'Step_09_Continuous_Update.md',
    content: '지속적 업데이트 유지보수 버전 관리 진화',
    type: 'file' as const,
    category: '실행 가이드',
    lastModified: '2024-12-10'
  },
  {
    title: '아키텍처 개요',
    path: '/architecture/overview',
    fileName: 'Architecture_Overview.md',
    content: '통합 시스템 아키텍처 설계 패턴 기술 스택',
    type: 'file' as const,
    category: '기술',
    lastModified: '2024-12-10'
  },
  {
    title: '테스트 컨텍스트',
    path: '/testing/context',
    fileName: 'Testing_Context.md',
    content: '테스트 컨텍스트 테스트 전략 품질 보증 자동화 테스트',
    type: 'file' as const,
    category: '기술',
    lastModified: '2024-12-09'
  },
  {
    title: '요구조건 기술내용',
    path: '/requirements/technical-content',
    fileName: '요구조건기술내용.md',
    content: '요구조건 기술 내용 시스템 요구사항 기능 명세 기술 사양',
    type: 'file' as const,
    category: '기술',
    lastModified: '2024-12-09'
  }
];

export const NamuSearch: React.FC<NamuSearchProps> = ({ 
  onNavigate, 
  initialQuery = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('all');
  const [currentResultIndex, setCurrentResultIndex] = useState(-1);
  const [highlightedResults, setHighlightedResults] = useState<Element[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // 검색 결과 필터링
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    let results = searchableFiles
      .filter(file => 
        file.title.toLowerCase().includes(query) ||
        file.content.toLowerCase().includes(query) ||
        file.fileName.toLowerCase().includes(query) ||
        file.category.toLowerCase().includes(query)
      )
      .map(file => ({
        title: file.title,
        path: file.path,
        fileName: file.fileName,
        excerpt: getExcerpt(file.content, query),
        type: file.type,
        category: file.category,
        lastModified: file.lastModified
      }));

    // 탭별 필터링
    if (activeTab !== 'all') {
      results = results.filter(result => 
        result.category.toLowerCase() === activeTab
      );
    }

    return results.slice(0, 50); // 최대 50개 결과
  }, [searchQuery, activeTab]);

  // 카테고리별 결과 수
  const categoryStats = useMemo(() => {
    if (!searchQuery.trim()) return {};
    
    const stats: Record<string, number> = {};
    searchableFiles.forEach(file => {
      const query = searchQuery.toLowerCase();
      if (file.title.toLowerCase().includes(query) ||
          file.content.toLowerCase().includes(query) ||
          file.fileName.toLowerCase().includes(query)) {
        stats[file.category] = (stats[file.category] || 0) + 1;
      }
    });
    return stats;
  }, [searchQuery]);

  // 검색어 주변 텍스트 추출
  const getExcerpt = (content: string, query: string): string => {
    const index = content.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return content.substring(0, 200) + '...';
    
    const start = Math.max(0, index - 80);
    const end = Math.min(content.length, index + query.length + 80);
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
        <mark key={index} className="bg-yellow-200 px-1 rounded font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // 검색 결과 하이라이트 및 스크롤바 마커 업데이트
  useEffect(() => {
    if (!searchContainerRef.current || !searchQuery.trim()) {
      setHighlightedResults([]);
      setCurrentResultIndex(-1);
      return;
    }

    // 검색 결과 요소들 찾기
    const resultElements = searchContainerRef.current.querySelectorAll('[data-search-result]');
    setHighlightedResults(Array.from(resultElements));
    
    if (resultElements.length > 0) {
      setCurrentResultIndex(0);
    }
  }, [filteredResults, searchQuery]);

  // 현재 결과 강조
  useEffect(() => {
    highlightedResults.forEach((element, index) => {
      if (index === currentResultIndex) {
        element.classList.add('ring-2', 'ring-red-500', 'bg-red-50');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        element.classList.remove('ring-2', 'ring-red-500', 'bg-red-50');
      }
    });
  }, [currentResultIndex, highlightedResults]);

  // 키보드 네비게이션 (검색 입력창에서는 제외)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 검색 입력창에서는 동작하지 않도록
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (!searchQuery.trim() || highlightedResults.length === 0) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          // Shift+Enter: 이전 결과
          setCurrentResultIndex(prev => 
            prev <= 0 ? highlightedResults.length - 1 : prev - 1
          );
        } else {
          // Enter: 다음 결과
          setCurrentResultIndex(prev => 
            prev >= highlightedResults.length - 1 ? 0 : prev + 1
          );
        }
      }

      if (e.key === 'Escape') {
        setCurrentResultIndex(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery, highlightedResults]);

  const handleResultClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 실행 (이미 실시간으로 되고 있음)
  };

  // 수동 네비게이션 버튼
  const goToNextResult = () => {
    if (highlightedResults.length === 0) return;
    setCurrentResultIndex(prev => 
      prev >= highlightedResults.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevResult = () => {
    if (highlightedResults.length === 0) return;
    setCurrentResultIndex(prev => 
      prev <= 0 ? highlightedResults.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative max-w-6xl mx-auto p-6" ref={searchContainerRef}>
      {/* 나무위키 스타일 검색 헤더 */}
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h1 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
            <Search className="w-5 h-5" />
            문서 검색
          </h1>
          
          <form onSubmit={handleSearch}>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-10 border-blue-300 focus:border-blue-500"
                autoFocus
              />
              {/* 네비게이션 버튼 */}
              {searchQuery.trim() && highlightedResults.length > 0 && (
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={goToPrevResult}
                    className="h-10 px-3"
                    title="이전 결과 (Shift+Enter)"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={goToNextResult}
                    className="h-10 px-3"
                    title="다음 결과 (Enter)"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center px-3 text-sm text-gray-600 bg-gray-100 rounded border">
                    {currentResultIndex + 1} / {highlightedResults.length}
                  </div>
                </div>
              )}
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 px-6"
              >
                검색
              </Button>
            </div>
          </form>
        </div>

        {/* 검색 결과 통계 및 키보드 단축키 안내 */}
        {searchQuery.trim() && (
          <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <strong>"{searchQuery}"</strong>에 대한 검색 결과: 
                <span className="font-semibold text-blue-600 ml-1">
                  총 {filteredResults.length}개 문서
                </span>
              </div>
              {highlightedResults.length > 0 && (
                <div className="text-xs text-gray-500 flex items-center gap-4">
                  <span>Enter: 다음 결과</span>
                  <span>Shift+Enter: 이전 결과</span>
                  <span>Esc: 선택 해제</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 검색 결과가 있을 때만 탭 표시 */}
      {searchQuery.trim() && Object.keys(categoryStats).length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5 bg-blue-50 border border-blue-200">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              전체 ({filteredResults.length})
            </TabsTrigger>
            <TabsTrigger 
              value="포트폴리오"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              포트폴리오 ({categoryStats['포트폴리오'] || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="실행 가이드"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              실행 가이드 ({categoryStats['실행 가이드'] || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="기술"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              기술 ({categoryStats['기술'] || 0})
            </TabsTrigger>
            <TabsTrigger 
              value="시스템"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              시스템 ({categoryStats['시스템'] || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {/* 검색 결과 목록 */}
            <div className="space-y-4">
              {filteredResults.map((result, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500"
                  onClick={() => handleResultClick(result.path)}
                  data-search-result
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <h3 className="font-semibold text-blue-700 hover:underline text-lg">
                          {highlightQuery(result.title, searchQuery)}
                        </h3>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                        {result.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {highlightQuery(result.excerpt, searchQuery)}
                    </p>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {result.fileName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(result.lastModified).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                      <span className="text-blue-600 hover:underline">
                        {result.path}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* 검색 결과가 없을 때 */}
      {searchQuery.trim() && filteredResults.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            검색 결과가 없습니다
          </h3>
          <p className="text-gray-500 mb-4">
            "<strong>{searchQuery}</strong>"와 일치하는 문서를 찾을 수 없습니다.
          </p>
          <div className="text-sm text-gray-400">
            <p>검색 팁:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>다른 키워드로 검색해보세요</li>
              <li>더 간단한 검색어를 사용해보세요</li>
              <li>카테고리별로 탭을 확인해보세요</li>
            </ul>
          </div>
        </div>
      )}

      {/* 스크롤바 마커 - 나무위키 스타일 */}
      {searchQuery.trim() && highlightedResults.length > 0 && (
        <div className="fixed right-0 top-32 bottom-4 w-5 z-40 pointer-events-none">
          {/* 스크롤바 배경 */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
          
          <div className="relative h-full">
            {highlightedResults.map((_, index) => {
              const isActive = index === currentResultIndex;
              const position = (index / Math.max(highlightedResults.length - 1, 1)) * 100;
              
              return (
                <div
                  key={index}
                  className={`absolute right-0 w-4 h-3 rounded-l cursor-pointer pointer-events-auto transition-all duration-200 ${
                    isActive
                      ? 'bg-red-600 shadow-lg scale-110 z-10' 
                      : 'bg-red-400 hover:bg-red-500 hover:scale-105'
                  }`}
                  style={{
                    top: `${position}%`,
                    transform: 'translateY(-50%)'
                  }}
                  onClick={() => setCurrentResultIndex(index)}
                  title={`검색 결과 ${index + 1}/${highlightedResults.length}`}
                >
                  {/* 활성 마커 표시 */}
                  {isActive && (
                    <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 검색어가 없을 때 */}
      {!searchQuery.trim() && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-blue-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            문서 검색
          </h3>
          <p className="text-gray-500 mb-6">
            위키 내의 모든 문서를 검색할 수 있습니다.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {['포트폴리오', '실행 가이드', '기술', '시스템'].map((category) => (
              <Card key={category} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center">
                  <Tag className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900">{category}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {searchableFiles.filter(f => f.category === category).length}개 문서
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};