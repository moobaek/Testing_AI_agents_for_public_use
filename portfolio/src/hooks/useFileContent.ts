// ID: hook.content.use_file_content
// 참조: architecture/State_Management_Design.md#hook-content-use-file-content
// 참조: architecture/API_Design.md#api-static-get-file
import { useState, useEffect } from 'react';
import { handleError, getUserFriendlyErrorMessage } from '@/utils/errorHandler';

// 실제 업로드된 파일 내용을 로드하는 훅
export const useFileContent = (originalFileName: string | null) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!originalFileName) {
      setContent('');
      return;
    }

    const loadFileContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const filePath = `/uploaded_files/documents/${originalFileName}`;
        const response = await fetch(filePath);
        
        if (!response.ok) {
          throw new Error(`파일을 찾을 수 없습니다: ${originalFileName}`);
        }
        
        const text = await response.text();
        setContent(text);
      } catch (err) {
        handleError(err, {
          component: 'useFileContent',
          action: 'loadFileContent',
          details: { originalFileName }
        });
        setError(getUserFriendlyErrorMessage(err));
        setContent('');
      } finally {
        setLoading(false);
      }
    };

    loadFileContent();
  }, [originalFileName]);

  return { content, loading, error };
};