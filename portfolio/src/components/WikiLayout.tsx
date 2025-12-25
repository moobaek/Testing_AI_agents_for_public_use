// ID: comp.layout.wiki
// 참조: architecture/Component_Interfaces_Design.md#component-wikilayout-comp-layout-wiki
// 참조: architecture/Screen_Design.md#페이지별-화면-설계
import React, { useState } from 'react';
import { Menu, Search, FileText, Folder, ChevronRight, ChevronDown, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { createFileTreeFromUploads } from '@/utils/fileMapping';
import { Navbar } from './Navbar';
interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}
interface WikiLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

// 실제 업로드된 파일들을 기반으로 한 파일 트리
const fileTree = createFileTreeFromUploads();
const FileTreeItem: React.FC<{
  node: FileNode;
  level: number;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}> = ({
  node,
  level,
  currentPath,
  onNavigate
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const isActive = currentPath === node.path;
  const handleClick = () => {
    if (node.type === 'file' && onNavigate) {
      onNavigate(node.path);
    } else if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    }
  };
  return <div>
      <div className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-sidebar-accent transition-colors ${isActive ? 'bg-sidebar-accent font-medium' : ''}`} style={{
      paddingLeft: `${level * 16 + 8}px`
    }} onClick={handleClick}>
        {node.type === 'folder' ? <>
            {isExpanded ? <ChevronDown className="w-4 h-4 text-sidebar-foreground" /> : <ChevronRight className="w-4 h-4 text-sidebar-foreground" />}
            <Folder className="w-4 h-4 text-sidebar-foreground" />
          </> : <>
            <div className="w-4" />
            <FileText className="w-4 h-4 text-sidebar-foreground" />
          </>}
        <span className="text-sm text-sidebar-foreground truncate">{node.name}</span>
      </div>
      {node.type === 'folder' && isExpanded && node.children && <div>
          {node.children.map(child => <FileTreeItem key={child.path} node={child} level={level + 1} currentPath={currentPath} onNavigate={onNavigate} />)}
        </div>}
    </div>;
};
const Sidebar: React.FC<{
  currentPath?: string;
  onNavigate?: (path: string) => void;
}> = ({
  currentPath,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  return <div className="w-64 bg-sidebar-background border-r border-sidebar-border h-full flex flex-col">
      {/* Header - 상단에 바짝 붙이고 회색 부분 제거 */}
      <div className="px-4 py-3 border-b border-sidebar-border bg-white">
        <h1 className="text-lg font-semibold text-sidebar-foreground mb-3">
          AI 연구 개발 포트폴리오 위키
        </h1>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2 h-8" onClick={() => onNavigate && onNavigate('/search')}>
            <Search className="w-4 h-4" />
            <span className="text-sm">검색</span>
          </Button>
        </div>
      </div>

      {/* File Tree */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {fileTree.map(node => <FileTreeItem key={node.path} node={node} level={0} currentPath={currentPath} onNavigate={onNavigate} />)}
        </div>
      </ScrollArea>
    </div>;
};
export const WikiLayout: React.FC<WikiLayoutProps> = ({
  children,
  currentPath,
  onNavigate
}) => {
  const handleSearch = (query: string) => {
    // 검색 처리 로직
    console.log('Search:', query);
  };
  return <div className="min-h-screen bg-gray-50">
      {/* 나무위키 스타일 네비게이션 바 - 고정 */}
      <Navbar currentPath={currentPath} onNavigate={onNavigate} onSearch={handleSearch} />
      
      {/* 고정된 Navbar를 고려한 상단 여백 */}
      <div className="pt-[104px]">
        <div className="flex">
          {/* Desktop Sidebar - 고정 사이드바 */}
          {/* 반응형 디자인: 태블릿(768px) 200px, 데스크톱(1024px) 240px */}
          <div className="hidden md:block md:w-[200px] lg:w-[240px] bg-white border-r border-gray-200 fixed left-0 top-[104px] bottom-0 overflow-y-auto z-30">
            <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
          </div>

        {/* Mobile Sidebar - 모바일에서 오버레이로 표시 */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="fixed top-20 left-4 z-50 bg-white shadow-md">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
            </SheetContent>
          </Sheet>
        </div>

          {/* Main Content - 사이드바 너비를 고려한 마진 (반응형) */}
          <div className="flex-1 bg-white min-h-[calc(100vh-104px)] md:ml-[200px] lg:ml-[240px]">
            {children}
          </div>
        </div>
      </div>
    </div>;
};