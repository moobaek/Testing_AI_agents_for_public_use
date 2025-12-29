// ID: comp.browser.file_browser
// 참조: architecture/Component_Interfaces_Design.md#component-filebrowser-comp-browser-file-browser
// 참조: architecture/Screen_Design.md#flow-document-browse
import React, { useState, useMemo } from 'react';
import { FileText, Folder, FolderOpen, Calendar, FileIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { createFileTreeFromUploads } from '@/utils/fileMapping';

interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
  children?: FileItem[];
  originalName?: string;
}

interface FileBrowserProps {
  onNavigate?: (path: string) => void;
}

// 파일 정보 확장 (실제로는 서버에서 가져와야 함)
const getFileInfo = (originalName: string) => {
  const fileSizes: Record<string, string> = {
    'README.md': '12.5 KB',
    '00_Portfolio_Index.md': '8.3 KB',
    '00_Relationship_Map.md': '5.2 KB',
    '00_Overview_For_Non_Technical.md': '6.8 KB',
    '01_Key_Achievements.md': '7.1 KB',
    '02_Business_Value.md': '5.9 KB',
    '02_Projects_Overview.md': '9.4 KB',
    '03_Technology_Simplified.md': '6.2 KB',
    '04_Visual_Portfolio.md': '4.8 KB',
    '04_Academic_Publications.md': '7.6 KB',
    'Step_01_Repetitive_Work.md': '5.3 KB',
    'Step_02_Expertise_Targeting.md': '4.9 KB',
    'Step_03_Micro_Starts.md': '5.1 KB',
    'Step_04_Modularization.md': '6.0 KB',
    'Step_05_IO_Optimization.md': '5.7 KB',
    'Step_06_Daily_Log.md': '4.5 KB',
    'Step_07_Visuals.md': '5.8 KB',
    'Step_08_Feedback_Loop.md': '5.2 KB',
    'Step_09_Continuous_Update.md': '4.7 KB',
    'Architecture_Overview.md': '8.9 KB',
    'Testing_Context.md': '6.4 KB',
    '요구조건기술내용.md': '7.2 KB'
  };

  const modifiedDates: Record<string, string> = {
    'README.md': '2024-12-20',
    '00_Portfolio_Index.md': '2024-12-19',
    '00_Relationship_Map.md': '2024-12-18',
    '00_Overview_For_Non_Technical.md': '2024-12-18',
    '01_Key_Achievements.md': '2024-12-17',
    '02_Business_Value.md': '2024-12-17',
    '02_Projects_Overview.md': '2024-12-16',
    '03_Technology_Simplified.md': '2024-12-16',
    '04_Visual_Portfolio.md': '2024-12-15',
    '04_Academic_Publications.md': '2024-12-15',
    'Step_01_Repetitive_Work.md': '2024-12-14',
    'Step_02_Expertise_Targeting.md': '2024-12-14',
    'Step_03_Micro_Starts.md': '2024-12-13',
    'Step_04_Modularization.md': '2024-12-13',
    'Step_05_IO_Optimization.md': '2024-12-12',
    'Step_06_Daily_Log.md': '2024-12-12',
    'Step_07_Visuals.md': '2024-12-11',
    'Step_08_Feedback_Loop.md': '2024-12-11',
    'Step_09_Continuous_Update.md': '2024-12-10',
    'Architecture_Overview.md': '2024-12-10',
    'Testing_Context.md': '2024-12-09',
    '요구조건기술내용.md': '2024-12-09'
  };

  return {
    size: fileSizes[originalName] || '0 KB',
    modified: modifiedDates[originalName] || '2024-12-01'
  };
};

// 파일 트리를 플랫 리스트로 변환
const flattenFileTree = (nodes: any[], parentPath = ''): FileItem[] => {
  const result: FileItem[] = [];
  
  nodes.forEach(node => {
    const fullPath = parentPath + '/' + node.name;
    const fileInfo = node.originalName ? getFileInfo(node.originalName) : { size: '-', modified: '-' };
    
    const item: FileItem = {
      name: node.name,
      path: node.path,
      type: node.type,
      originalName: node.originalName,
      ...fileInfo
    };
    
    result.push(item);
    
    if (node.children) {
      result.push(...flattenFileTree(node.children, fullPath));
    }
  });
  
  return result;
};

export const FileBrowser: React.FC<FileBrowserProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'size'>('name');
  const [filterQuery, setFilterQuery] = useState('');
  const [showFoldersOnly, setShowFoldersOnly] = useState(false);

  const fileTree = createFileTreeFromUploads();
  const allFiles = useMemo(() => flattenFileTree(fileTree), []);

  // 필터링 및 정렬
  const filteredAndSortedFiles = useMemo(() => {
    let filtered = allFiles;

    // 필터링
    if (filterQuery.trim()) {
      const query = filterQuery.toLowerCase();
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(query) ||
        (file.originalName && file.originalName.toLowerCase().includes(query))
      );
    }

    if (showFoldersOnly) {
      filtered = filtered.filter(file => file.type === 'folder');
    }

    // 정렬
    filtered.sort((a, b) => {
      // 폴더를 먼저 표시
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }

      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'modified':
          return (b.modified || '').localeCompare(a.modified || '');
        case 'size':
          const aSize = parseFloat(a.size?.replace(/[^0-9.]/g, '') || '0');
          const bSize = parseFloat(b.size?.replace(/[^0-9.]/g, '') || '0');
          return bSize - aSize;
        default:
          return 0;
      }
    });

    return filtered;
  }, [allFiles, filterQuery, showFoldersOnly, sortBy]);

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'file' && onNavigate) {
      onNavigate(file.path);
    }
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return <Folder className="w-5 h-5 text-blue-600" />;
    }
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* 헤더 */}
      <div className="border-b border-border bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-normal border-b border-border pb-2 mb-6">
            파일 브라우저
          </h1>
          
          {/* 필터 및 정렬 컨트롤 */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <Input
                placeholder="파일명으로 필터링..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-64"
              />
              
              <div className="flex gap-2">
                <Button
                  variant={showFoldersOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFoldersOnly(!showFoldersOnly)}
                >
                  {showFoldersOnly ? "모든 파일" : "폴더만"}
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground">정렬:</span>
              <Button
                variant={sortBy === 'name' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('name')}
              >
                이름
              </Button>
              <Button
                variant={sortBy === 'modified' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('modified')}
              >
                수정일
              </Button>
              <Button
                variant={sortBy === 'size' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('size')}
              >
                크기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 파일 목록 */}
      <ScrollArea className="flex-1">
        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              총 {filteredAndSortedFiles.length}개 항목
            </p>
          </div>

          {viewMode === 'list' ? (
            <div className="space-y-2">
              {filteredAndSortedFiles.map((file, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer hover:shadow-sm transition-shadow ${
                    file.type === 'folder' ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => handleFileClick(file)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {getFileIcon(file)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium truncate">
                            {file.name}
                          </h3>
                          {file.type === 'folder' && (
                            <Badge variant="secondary" className="text-xs">
                              폴더
                            </Badge>
                          )}
                        </div>
                        {file.originalName && (
                          <p className="text-sm text-muted-foreground truncate">
                            {file.originalName}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex-shrink-0 text-right">
                        <div className="text-sm text-muted-foreground">
                          {file.type === 'file' && formatFileSize(file.size || '')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(file.modified || '')}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredAndSortedFiles.map((file, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleFileClick(file)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3">
                      {getFileIcon(file)}
                    </div>
                    <h3 className="font-medium text-sm truncate mb-1">
                      {file.name}
                    </h3>
                    {file.type === 'file' && (
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size || '')}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredAndSortedFiles.length === 0 && (
            <div className="text-center py-12">
              <FileIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">파일이 없습니다</h3>
              <p className="text-muted-foreground">
                필터 조건을 변경해보세요.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};