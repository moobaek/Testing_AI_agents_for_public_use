// ID: page.main.index
// 참조: architecture/Blue_Print.md#1-홈-page-main-index
// 참조: architecture/Screen_Design.md#페이지별-화면-설계
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WikiLayout } from '@/components/WikiLayout';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { NamuSearch } from '@/components/NamuSearch';
import { FileBrowser } from '@/components/FileBrowser';
import { getOriginalFileName } from '@/utils/fileMapping';
import { useFileContent } from '@/hooks/useFileContent';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState('/');
  const [originalFileName, setOriginalFileName] = useState<string | null>(null);


  useEffect(() => {
    const path = location.pathname;
    setCurrentPath(path);
    
    // 경로에 따른 원본 파일명 매핑
    const fileName = getOriginalFileName(path);
    setOriginalFileName(fileName);
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // 목차용 컨텐츠 가져오기
  const { content: tocContent } = useFileContent(originalFileName);

  // 페이지 내용 렌더링
  const renderPageContent = () => {
    if (currentPath === '/search') {
      return (
        <>
          <NamuSearch onNavigate={handleNavigate} />
        </>
      );
    }
    
    if (currentPath === '/browse') {
      return (
        <>
          <FileBrowser onNavigate={handleNavigate} />
        </>
      );
    }
    
    // 기본 마크다운 렌더링 (인라인 목차 포함)
    return (
      <>
        <MarkdownRenderer originalFileName={originalFileName} />
      </>
    );
  };

  return (
    <WikiLayout currentPath={currentPath} onNavigate={handleNavigate}>
      {renderPageContent()}
    </WikiLayout>
  );
};

export default Index;