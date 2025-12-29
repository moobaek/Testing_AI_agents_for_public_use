import React, { useState, useMemo } from 'react';
import { FileText, Folder, Calendar, FileIcon, Grid, List, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createFileTreeFromUploads } from '@/utils/fileMapping';

interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
  children?: FileItem[];
  originalName?: string;
  category?: string;
}

interface NamuFileBrowserProps {
  onNavigate?: (path: string) => void;
}

// 파일 정보 확장
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

  const categories: Record<string, string> = {
    'README.md': '시스템',
    '00_Portfolio_Index.md': '포트폴리오',
    '00_Relationship_Map.md': '포트폴리오',
    '00_Overview_For_Non_Technical.md': '포트폴리오',
    '01_Key_Achievements.md': '포트폴리오',
    '02_Business_Value.md': '포트폴리오',
    '02_Projects_Overview.md': '포트폴리오',
    '03_Technology_Simplified.md': '포트폴리오',
    '04_Visual_Portfolio.md': '포트폴리오',
    '04_Academic_Publications.md': '포트폴리오',
    'Step_01_Repetitive_Work.md': '실행 가이드',
    'Step_02_Expertise_Targeting.md': '실행 가이드',
    'Step_03_Micro_Starts.md': '실행 가이드',
    'Step_04_Modularization.md': '실행 가이드',
    'Step_05_IO_Optimization.md': '실행 가이드',
    'Step_06_Daily_Log.md': '실행 가이드',
    'Step_07_Visuals.md': '실행 가이드',
    'Step_08_Feedback_Loop.md': '실행 가이드',
    'Step_09_Continuous_Update.md': '실행 가이드',
    'Architecture_Overview.md': '기술',
    'Testing_Context.md': '기술',
    '요구조건기술내용.md': '기술'
  };

  return {
    size: fileSizes[originalName] || '0 KB',
    modified: modifiedDates[originalName] || '2024-12-01',
    category: categories[originalName] || '기타'
  };
};

// 파일 트리를 플랫 리스트로 변환
const flattenFileTree = (nodes: any[], parentPath = ''): FileItem[] => {
  const result: FileItem[] = [];
  
  nodes.forEach(node => {
    const fullPath = parentPath + '/' + node.name;
    const fileInfo = node.originalName ? getFileInfo(node.originalName) : { 
      size: '-', 
      modified: '-', 
      category: '폴더' 
    };
    
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

export const NamuFileBrowser: React.FC<NamuFileBrowserProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'size' | 'category'>('category');
  const [filterQuery, setFilterQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const fileTree = createFileTreeFromUploads();
  const allFiles = useMemo(() => flattenFileTree(fileTree), []);

  // 카테고리 목록
  const categories = useMemo(() => {
    const cats = new Set(allFiles.map(f => f.category || '기타'));
    return Array.from(cats).sort();
  }, [allFiles]);

  // 필터링 및 정렬
  const filteredAndSortedFiles = useMemo(() => {
    let filtered = allFiles;

    // 필터링
    if (filterQuery.trim()) {
      const query = filterQuery.toLowerCase();
      filtered = filtered.filter(file => 
        file.name.toLowerCase().includes(query) ||
        (file.originalName && file.originalName.toLowerCase().includes(query)) ||
        (file.category && file.category.toLowerCase().includes(query))
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(file => file.category === categoryFilter);
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
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [allFiles, filterQuery, categoryFilter, sortBy]);

  // 카테고리별 통계
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    allFiles.forEach(file => {
      const cat = file.category || '기타';
      stats[cat] = (stats[cat] || 0) + 1;
    });
    return stats;
  }, [allFiles]);

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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '포트폴리오': 'bg-blue-100 text-blue-800',
      '실행 가이드': 'bg-green-100 text-green-800',
      '기술': 'bg-purple-100 text-purple-800',
      '시스템': 'bg-orange-100 text-orange-800',
      '폴더': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* 나무위키 스타일 헤더 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h1 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
          <FileIcon className="w-5 h-5" />
          파일 목록
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {categories.map(category => (
            <div key={category} className="bg-white rounded p-3 border border-blue-200">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-700">
                  {categoryStats[category] || 0}
                </div>
                <div className="text-sm text-gray-600">{category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 필터 및 정렬 컨트롤 */}
      <Card className="mb-6 border-blue-200">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-1">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="파일명으로 필터링..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className="w-64 border-blue-300 focus:border-blue-500"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48 border-blue-300">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 카테고리</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category} ({categoryStats[category]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">정렬:</span>
              </div>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-32 border-blue-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">카테고리</SelectItem>
                  <SelectItem value="name">이름</SelectItem>
                  <SelectItem value="modified">수정일</SelectItem>
                  <SelectItem value="size">크기</SelectItem>
                </SelectContent>
              </Select>
              
              <Separator orientation="vertical" className="h-6" />
              
              <div className="flex gap-1">
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="w-8 h-8 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="w-8 h-8 p-0"
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 결과 통계 */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          총 <span className="font-semibold text-blue-600">{filteredAndSortedFiles.length}</span>개 항목
          {categoryFilter !== 'all' && (
            <span className="ml-2">
              (<span className="font-medium">{categoryFilter}</span> 카테고리)
            </span>
          )}
        </p>
      </div>

      {/* 파일 목록 */}
      {viewMode === 'list' ? (
        <div className="space-y-2">
          {filteredAndSortedFiles.map((file, index) => (
            <Card 
              key={index}
              className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${
                file.type === 'folder' 
                  ? 'border-l-blue-500 bg-blue-50/30' 
                  : 'border-l-gray-300'
              }`}
              onClick={() => handleFileClick(file)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {getFileIcon(file)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate text-blue-700 hover:underline">
                          {file.name}
                        </h3>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getCategoryColor(file.category || '기타')}`}
                        >
                          {file.category}
                        </Badge>
                      </div>
                      {file.originalName && (
                        <p className="text-sm text-gray-500 truncate">
                          {file.originalName}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    {file.type === 'file' && (
                      <div className="text-right">
                        <div>{file.size}</div>
                      </div>
                    )}
                    <div className="text-right flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(file.modified || '').toLocaleDateString('ko-KR')}</span>
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
                <h3 className="font-medium text-sm truncate mb-2 text-blue-700">
                  {file.name}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`text-xs mb-2 ${getCategoryColor(file.category || '기타')}`}
                >
                  {file.category}
                </Badge>
                {file.type === 'file' && (
                  <p className="text-xs text-gray-500">
                    {file.size}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredAndSortedFiles.length === 0 && (
        <div className="text-center py-12">
          <FileIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">파일이 없습니다</h3>
          <p className="text-gray-500">
            필터 조건을 변경해보세요.
          </p>
        </div>
      )}
    </div>
  );
};