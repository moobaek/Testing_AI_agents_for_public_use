import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface DocumentSearchProps {
  contentRef: React.RefObject<HTMLElement>;
  className?: string;
}

interface SearchMatch {
  element: HTMLElement;
  index: number;
  position: number; // 페이지 내 상대적 위치 (0-1)
}

export const DocumentSearch: React.FC<DocumentSearchProps> = ({
  contentRef,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(true); // 항상 표시
  const scrollbarRef = useRef<HTMLDivElement>(null);

  // 검색어 하이라이트 및 매치 찾기
  useEffect(() => {
    if (!contentRef.current || !searchQuery.trim()) {
      clearHighlights();
      setMatches([]);
      setCurrentMatchIndex(-1);
      return;
    }

    // 디바운스로 성능 최적화
    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, contentRef]);

  const performSearch = () => {
    if (!contentRef.current || !searchQuery.trim()) return;

    const content = contentRef.current;
    const query = searchQuery.trim();
    
    // 기존 하이라이트 제거
    clearHighlights();
    
    // 텍스트 노드에서 검색어 찾기
    const walker = document.createTreeWalker(
      content,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // 이미 하이라이트된 요소나 스크립트 태그 제외
          const parent = node.parentElement;
          if (parent?.classList.contains('search-highlight') || 
              parent?.tagName === 'SCRIPT' || 
              parent?.tagName === 'STYLE' ||
              parent?.classList.contains('mermaid')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes: Text[] = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }

    const newMatches: SearchMatch[] = [];
    let matchIndex = 0;

    textNodes.forEach(textNode => {
      const text = textNode.textContent || '';
      const regex = new RegExp(query, 'gi');
      let match;
      const matches_in_node = [];

      while ((match = regex.exec(text)) !== null) {
        matches_in_node.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0]
        });
      }

      if (matches_in_node.length > 0) {
        // 텍스트 노드를 분할하여 하이라이트 적용
        const parent = textNode.parentNode!;
        let currentOffset = 0;
        
        matches_in_node.forEach(match => {
          // 매치 이전 텍스트
          if (match.start > currentOffset) {
            const beforeText = text.substring(currentOffset, match.start);
            parent.insertBefore(document.createTextNode(beforeText), textNode);
          }
          
          // 하이라이트된 매치
          const highlightSpan = document.createElement('span');
          highlightSpan.className = 'search-highlight bg-yellow-300 px-1 rounded font-medium';
          highlightSpan.setAttribute('data-match-index', matchIndex.toString());
          highlightSpan.textContent = match.text;
          parent.insertBefore(highlightSpan, textNode);
          
          // 스크롤바 위치 계산 (더 정확하게)
          setTimeout(() => {
            const rect = highlightSpan.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();
            const scrollTop = content.scrollTop || window.pageYOffset;
            const scrollHeight = content.scrollHeight || document.documentElement.scrollHeight;
            const position = (rect.top - contentRect.top + scrollTop) / scrollHeight;
            
            // 매치 업데이트
            const matchIndex = newMatches.findIndex(m => m.index === parseInt(highlightSpan.getAttribute('data-match-index') || '0'));
            if (matchIndex !== -1) {
              newMatches[matchIndex].position = Math.max(0, Math.min(1, position));
            }
          }, 100);
          
          newMatches.push({
            element: highlightSpan,
            index: matchIndex,
            position: Math.max(0, Math.min(1, 0.5)) // 임시값
          });
          
          matchIndex++;
          currentOffset = match.end;
        });
        
        // 매치 이후 텍스트
        if (currentOffset < text.length) {
          const afterText = text.substring(currentOffset);
          parent.insertBefore(document.createTextNode(afterText), textNode);
        }
        
        // 원본 텍스트 노드 제거
        parent.removeChild(textNode);
      }
    });

    setMatches(newMatches);
    if (newMatches.length > 0) {
      setCurrentMatchIndex(0);
      setTimeout(() => scrollToMatch(0, newMatches), 200);
    }
  };

  // 하이라이트 제거
  const clearHighlights = () => {
    if (!contentRef.current) return;
    
    const highlights = contentRef.current.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode!;
      parent.insertBefore(document.createTextNode(highlight.textContent || ''), highlight);
      parent.removeChild(highlight);
    });
    
    // 인접한 텍스트 노드 병합
    if (contentRef.current) {
      contentRef.current.normalize();
    }
  };

  // 특정 매치로 스크롤
  const scrollToMatch = (index: number, matchList = matches) => {
    if (index < 0 || index >= matchList.length) return;
    
    const match = matchList[index];
    match.element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    
    // 현재 매치 강조
    matchList.forEach((m, i) => {
      if (i === index) {
        m.element.classList.add('bg-red-400', 'text-white');
        m.element.classList.remove('bg-yellow-300');
      } else {
        m.element.classList.add('bg-yellow-300');
        m.element.classList.remove('bg-red-400', 'text-white');
      }
    });
  };

  // 다음/이전 매치로 이동
  const goToNextMatch = () => {
    if (matches.length === 0) return;
    const nextIndex = (currentMatchIndex + 1) % matches.length;
    setCurrentMatchIndex(nextIndex);
    scrollToMatch(nextIndex);
  };

  const goToPrevMatch = () => {
    if (matches.length === 0) return;
    const prevIndex = currentMatchIndex <= 0 ? matches.length - 1 : currentMatchIndex - 1;
    setCurrentMatchIndex(prevIndex);
    scrollToMatch(prevIndex);
  };

  // 스크롤바 마커 클릭
  const handleMarkerClick = (match: SearchMatch) => {
    const index = matches.findIndex(m => m.index === match.index);
    if (index !== -1) {
      setCurrentMatchIndex(index);
      scrollToMatch(index);
    }
  };

  // 검색 시작/종료
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleClose = () => {
    setSearchQuery('');
    clearHighlights();
    setMatches([]);
    setCurrentMatchIndex(-1);
  };

  // 키보드 네비게이션 (검색 입력창에서는 제외)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 검색 입력창에서는 동작하지 않도록
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (!searchQuery.trim() || matches.length === 0) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          // Shift+Enter: 이전 결과
          goToPrevMatch();
        } else {
          // Enter: 다음 결과
          goToNextMatch();
        }
      }

      if (e.key === 'Escape') {
        setCurrentMatchIndex(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery, matches, currentMatchIndex]);

  return (
    <>
      {/* 검색 인터페이스 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h1 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
          <Search className="w-5 h-5" />
          문서 내 검색
        </h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="문서 내 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-sm border-blue-300 focus:border-blue-500"
              autoFocus
            />
          </div>
          
          {/* 네비게이션 버튼 */}
          {searchQuery.trim() && matches.length > 0 && (
            <div className="flex gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={goToPrevMatch}
                className="h-10 px-3"
                title="이전 결과 (Shift+Enter)"
              >
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={goToNextMatch}
                className="h-10 px-3"
                title="다음 결과 (Enter)"
              >
                <ChevronDown className="w-4 h-4" />
              </Button>
              <div className="flex items-center px-3 text-sm text-gray-600 bg-gray-100 rounded border h-10">
                {currentMatchIndex + 1} / {matches.length}
              </div>
            </div>
          )}
          
          {searchQuery.trim() && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-10 w-10 p-0 hover:bg-red-100"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </form>

        {/* 검색 결과 통계 및 키보드 단축키 안내 */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {matches.length > 0 ? (
                <>
                  <strong>"{searchQuery}"</strong> 검색 결과: {matches.length}개 발견
                </>
              ) : (
                <>
                  <strong>"{searchQuery}"</strong> 검색 결과가 없습니다
                </>
              )}
            </span>
            {matches.length > 0 && (
              <div className="flex items-center gap-4 text-xs">
                <span>Enter: 다음 결과</span>
                <span>Shift+Enter: 이전 결과</span>
                <span>Esc: 선택 해제</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 스크롤바 마커 - 나무위키 스타일 */}
      {searchQuery.trim() && matches.length > 0 && (
        <div className="fixed right-0 top-32 bottom-4 w-5 z-40 pointer-events-none">
          {/* 스크롤바 배경 */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
          
          <div className="relative h-full">
            {matches.map((match, index) => {
              const isActive = index === currentMatchIndex;
              return (
                <div
                  key={match.index}
                  className={`absolute right-0 w-4 h-3 rounded-l cursor-pointer pointer-events-auto transition-all duration-200 scrollbar-marker ${
                    isActive
                      ? 'bg-red-600 shadow-lg scale-110 z-10' 
                      : 'bg-red-400 hover:bg-red-500 hover:scale-105'
                  }`}
                  style={{
                    top: `${match.position * 100}%`,
                    transform: 'translateY(-50%)'
                  }}
                  onClick={() => handleMarkerClick(match)}
                  onMouseEnter={(e) => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'fixed bg-black text-white text-xs px-2 py-1 rounded z-50 pointer-events-none';
                    tooltip.textContent = `검색 결과 ${index + 1}/${matches.length}`;
                    tooltip.style.right = '2rem';
                    tooltip.style.top = e.currentTarget.getBoundingClientRect().top + 'px';
                    tooltip.id = 'search-tooltip';
                    document.body.appendChild(tooltip);
                  }}
                  onMouseLeave={() => {
                    const tooltip = document.getElementById('search-tooltip');
                    if (tooltip) tooltip.remove();
                  }}
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
    </>
  );
};