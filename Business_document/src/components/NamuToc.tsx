import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, List, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface NamuTocProps {
  content: string;
  className?: string;
}

export const NamuToc: React.FC<NamuTocProps> = ({
  content,
  className = ''
}) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s가-힣]/g, '')
        .replace(/\s+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      items.push({
        id,
        text,
        level
      });
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.5
      }
    );

    setTimeout(() => {
      tocItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 500);

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  if (tocItems.length === 0 || !isVisible) {
    return null;
  }

  return (
    <div className={className}>
      <Card className="border-2 border-blue-200 bg-blue-50/30 shadow-lg">
        <CardContent className="p-0">
          {/* 목차 헤더 */}
          <div className="bg-blue-100 border-b border-blue-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-blue-700" />
                <span className="font-semibold text-blue-900 text-sm">목차</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-6 w-6 p-0 text-blue-700 hover:bg-blue-200"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="h-6 w-6 p-0 text-blue-700 hover:bg-blue-200"
                >
                  <EyeOff className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* 목차 내용 */}
          {isExpanded && (
            <div className="p-4">
              <div className="space-y-1">
                {tocItems.map((item, index) => {
                  const isActive = activeId === item.id;
                  const levelIndent = (item.level - 1) * 16;
                  
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => scrollToHeading(item.id)}
                        className={`block w-full text-left py-1 px-2 rounded text-sm transition-colors ${
                          isActive 
                            ? 'bg-blue-200 text-blue-900 font-medium' 
                            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                        }`}
                        style={{ paddingLeft: `${levelIndent + 8}px` }}
                      >
                        <span className="text-blue-600 mr-2">
                          {index + 1}.
                        </span>
                        {item.text}
                      </button>
                    </div>
                  );
                })}
              </div>
              
              <Separator className="my-3" />
              
              {/* 나무위키 스타일 하단 정보 */}
              <div className="text-xs text-gray-500 text-center">
                총 {tocItems.length}개 문단
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 목차 숨김 상태일 때 다시 보기 버튼 */}
      {!isVisible && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsVisible(true)}
          className="mb-4 border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <Eye className="w-4 h-4 mr-2" />
          목차 보기
        </Button>
      )}
    </div>
  );
};