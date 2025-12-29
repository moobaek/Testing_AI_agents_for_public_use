// ID: comp.navigation.navbar
// 참조: architecture/Component_Interfaces_Design.md#component-navbar-comp-navigation-navbar
// 참조: architecture/Screen_Design.md#페이지별-화면-설계
import React, { useState, useEffect } from 'react';
import { Search, Menu, Home, FileText, FolderOpen, History, Star, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// 다크모드 토글 컴포넌트
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 로컬 스토리지에서 테마 설정 불러오기
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    
    // HTML 요소에 클래스 적용
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // HTML 요소에 클래스 적용/제거
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  // 마운트되기 전에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-white hover:bg-blue-600"
        disabled
      >
        <Moon className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="text-white hover:bg-blue-600"
      onClick={toggleTheme}
      title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  );
};
interface NavbarProps {
  onNavigate?: (path: string) => void;
  onSearch?: (query: string) => void;
  currentPath?: string;
}
export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onSearch,
  currentPath = '/'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 문서 내 검색 이벤트 발생
      const event = new CustomEvent('documentSearch', {
        detail: {
          query: searchQuery
        }
      });
      window.dispatchEvent(event);
      onSearch?.(searchQuery);
    }
  };
  const navItems = [{
    label: '대문',
    path: '/',
    icon: Home,
    active: currentPath === '/'
  }, {
    label: '최근 변경',
    path: '/recent',
    icon: History,
    active: currentPath === '/recent'
  }, {
    label: '파일 목록',
    path: '/browse',
    icon: FolderOpen,
    active: currentPath === '/browse'
  }, {
    label: '검색',
    path: '/search',
    icon: Search,
    active: currentPath === '/search'
  }];
  return <div className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
      {/* 상단 네비게이션 바 */}
      <div className="bg-[#2d5aa0] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-bold">AI 연구 개발 포트폴리오 위키</h1>
              
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* 네비게이션 메뉴 */}
            <div className="flex items-center space-x-1">
              {navItems.map(item => {
              const Icon = item.icon;
              return;
            })}
            </div>

            {/* 검색 바 */}
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="text" placeholder="문서 검색..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 w-64 h-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <Button type="submit" size="sm" className="ml-2 bg-blue-600 hover:bg-blue-700">검색</Button>
            </form>
          </div>
        </div>
      </div>

      {/* 브레드크럼 */}
      
    </div>;
};

// 현재 페이지 제목 가져오기
const getCurrentPageTitle = (path: string): string => {
  const titleMap: Record<string, string> = {
    '/search': '검색',
    '/browse': '파일 목록',
    '/recent': '최근 변경',
    '/portfolio/index': '포트폴리오 인덱스',
    '/portfolio/key-achievements': '주요 성과',
    '/portfolio/business-value': '비즈니스 가치',
    '/portfolio/projects-overview': '프로젝트 개요',
    '/portfolio/academic-publications': '학술 출판물',
    '/execution-guide/step-01-repetitive-work': '1단계: 반복 업무',
    '/execution-guide/step-02-expertise-targeting': '2단계: 전문성 타겟팅',
    '/execution-guide/step-03-micro-starts': '3단계: 마이크로 시작',
    '/execution-guide/step-04-modularization': '4단계: 모듈화',
    '/execution-guide/step-05-io-optimization': '5단계: I/O 최적화',
    '/execution-guide/step-06-daily-log': '6단계: 데일리 로그',
    '/execution-guide/step-07-visuals': '7단계: 시각적 자산',
    '/execution-guide/step-08-feedback-loop': '8단계: 피드백 루프',
    '/execution-guide/step-09-continuous-update': '9단계: 지속적 업데이트',
    '/architecture/overview': '아키텍처 개요',
    '/testing/context': '테스팅 컨텍스트',
    '/requirements/technical-requirements': '기술 요구사항'
  };
  return titleMap[path] || '문서';
};