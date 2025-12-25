import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
interface SearchHighlighterProps {
  contentRef: React.RefObject<HTMLElement>;
  className?: string;
}
interface SearchMatch {
  element: HTMLElement;
  index: number;
  position: number; // 페이지 내 상대적 위치 (0-1)
}
export const SearchHighlighter: React.FC<SearchHighlighterProps> = ({
  contentRef,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  // 전역 검색 이벤트 수신
  useEffect(() => {
    const handleDocumentSearch = (e: CustomEvent) => {
      const query = e.detail?.query;
      if (query) {
        setSearchQuery(query);
        setIsVisible(true);
      }
    };
    window.addEventListener('documentSearch', handleDocumentSearch as EventListener);
    return () => window.removeEventListener('documentSearch', handleDocumentSearch as EventListener);
  }, []);

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
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
      acceptNode: node => {
        // 이미 하이라이트된 요소나 스크립트 태그 제외
        const parent = node.parentElement;
        if (parent?.classList.contains('search-highlight') || parent?.tagName === 'SCRIPT' || parent?.tagName === 'STYLE' || parent?.classList.contains('mermaid')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
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
            position: Math.max(0, Math.min(1, position))
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
    if (!searchQuery.trim()) {
      setIsVisible(false);
      clearHighlights();
      setMatches([]);
    }
  };
  const handleClose = () => {
    setIsVisible(false);
    setSearchQuery('');
    clearHighlights();
    setMatches([]);
    setCurrentMatchIndex(-1);
  };

  // Ctrl+F 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setIsVisible(true);
      }
      if (e.key === 'Escape') {
        handleClose();
      }
      if (e.key === 'Enter' && isVisible) {
        e.preventDefault();
        if (e.shiftKey) {
          goToPrevMatch();
        } else {
          goToNextMatch();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, currentMatchIndex, matches]);
  return <>
      {/* 검색 트리거 버튼 */}
      {!isVisible}

      {/* 검색 인터페이스 */}
      {isVisible && <div className="fixed top-20 right-4 z-50 bg-white border border-blue-300 rounded-lg shadow-lg p-3 w-80">
          <form onSubmit={handleSearch} className="flex gap-2 mb-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input type="text" placeholder="문서 내 검색..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 h-8 text-sm border-blue-300 focus:border-blue-500" autoFocus />
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0 hover:bg-red-100">
              <X className="w-4 h-4" />
            </Button>
          </form>

          {/* 검색 결과 정보 */}
          {searchQuery.trim() && <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
              <span>
                {matches.length > 0 ? <>
                    {currentMatchIndex + 1} / {matches.length} 결과
                  </> : '결과 없음'}
              </span>
              {matches.length > 0 && <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={goToPrevMatch} className="h-6 w-6 p-0">
                    <ChevronUp className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={goToNextMatch} className="h-6 w-6 p-0">
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </div>}
            </div>}

          {/* 키보드 단축키 안내 */}
          <div className="text-xs text-gray-500 border-t pt-2">
            <div>Enter: 다음 결과</div>
            <div>Shift+Enter: 이전 결과</div>
            <div>Esc: 검색 종료</div>
          </div>
        </div>}

      {/* 스크롤바 마커 - 나무위키 스타일 */}
      {isVisible && matches.length > 0 && <div ref={scrollbarRef} className="fixed right-0 top-32 bottom-4 w-5 z-40 pointer-events-none">
          {/* 스크롤바 배경 */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
          
          <div className="relative h-full">
            {matches.map((match, index) => {
          const isActive = index === currentMatchIndex;
          return <div key={match.index} className={`absolute right-0 w-4 h-3 rounded-l cursor-pointer pointer-events-auto transition-all duration-200 scrollbar-marker ${isActive ? 'bg-red-600 shadow-lg scale-110 z-10' : 'bg-red-400 hover:bg-red-500 hover:scale-105'}`} style={{
            top: `${match.position * 100}%`,
            transform: 'translateY(-50%)'
          }} onClick={() => handleMarkerClick(match)} onMouseEnter={e => {
            const tooltip = document.createElement('div');
            tooltip.className = 'fixed bg-black text-white text-xs px-2 py-1 rounded z-50 pointer-events-none';
            tooltip.textContent = `검색 결과 ${index + 1}/${matches.length}`;
            tooltip.style.right = '2rem';
            tooltip.style.top = e.currentTarget.getBoundingClientRect().top + 'px';
            tooltip.id = 'search-tooltip';
            document.body.appendChild(tooltip);
          }} onMouseLeave={() => {
            const tooltip = document.getElementById('search-tooltip');
            if (tooltip) tooltip.remove();
          }}>
                  {/* 활성 마커 표시 */}
                  {isActive && <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-red-600 rounded-full animate-pulse" />}
                </div>;
        })}
          </div>
        </div>}
    </>;
};