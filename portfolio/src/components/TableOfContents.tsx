import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
  inline?: boolean; // 인라인 모드 (문서 상단에 표시)
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  content,
  className = '',
  inline = false
}) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      // ID 생성 시 한글과 영문 모두 지원
      const id = text
        .toLowerCase()
        .replace(/[^\w\s가-힣]/g, '') // 특수문자 제거, 한글 유지
        .replace(/\s+/g, '-') // 공백을 하이픈으로
        .replace(/(^-|-$)/g, ''); // 앞뒤 하이픈 제거
      
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

    // Set up intersection observer for active heading
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

    // Observe all headings with a delay to ensure DOM is ready
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
      // URL 업데이트
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  // 인라인 모드 (문서 상단에 표시)
  if (inline) {
    return (
      <Card className={`mb-6 ${className}`}>
        <CardContent className="p-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4" />
                  <span className="font-semibold">목차</span>
                </div>
                <ChevronRight 
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} 
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="space-y-1">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`block w-full text-left py-1 px-2 rounded text-sm hover:bg-accent transition-colors ${
                      activeId === item.id ? 'bg-accent font-medium text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    style={{
                      paddingLeft: `${(item.level - 1) * 16 + 8}px`
                    }}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    );
  }

  // 사이드바 모드 (오른쪽에 고정)
  return (
    <div className={`w-64 bg-background border-l border-border ${className}`}>
      <div className="sticky top-4 p-4">
        <div className="toc">
          <div className="toc-title flex items-center gap-2 mb-3">
            <List className="w-4 h-4" />
            <span>목차</span>
          </div>
          <ScrollArea className="max-h-[calc(100vh-200px)]">
            <div className="toc-list space-y-1">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`toc-item w-full text-left py-2 px-2 rounded text-sm transition-colors ${
                    activeId === item.id ? 'active bg-accent font-medium text-primary' : 'hover:bg-accent/50'
                  }`}
                  style={{
                    paddingLeft: `${(item.level - 1) * 12 + 8}px`
                  }}
                >
                  {item.text}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};