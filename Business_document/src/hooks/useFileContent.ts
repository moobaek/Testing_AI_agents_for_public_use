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
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/ce74763c-2088-422f-b4f8-666a2ecc75d0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useFileContent.ts:15',message:'loadFileContent start',data:{originalFileName},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      setLoading(true);
      setError(null);
      
      try {
        const filePath = `/uploaded_files/documents/${originalFileName}`;
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/ce74763c-2088-422f-b4f8-666a2ecc75d0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useFileContent.ts:20',message:'before fetch',data:{filePath},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        const response = await fetch(filePath);
        
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/ce74763c-2088-422f-b4f8-666a2ecc75d0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useFileContent.ts:24',message:'after fetch',data:{ok:response.ok,status:response.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        
        if (!response.ok) {
          throw new Error(`파일을 찾을 수 없습니다: ${originalFileName}`);
        }
        
        const text = await response.text();
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/ce74763c-2088-422f-b4f8-666a2ecc75d0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useFileContent.ts:30',message:'content loaded',data:{textLength:text.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        setContent(text);
      } catch (err) {
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/ce74763c-2088-422f-b4f8-666a2ecc75d0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useFileContent.ts:33',message:'error caught',data:{errorMessage:err instanceof Error?err.message:String(err)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        handleError(err, {
          component: 'useFileContent',
          action: 'loadFileContent',
          details: { originalFileName }
        });
        setError(getUserFriendlyErrorMessage(err));
        setContent('');
      } finally {
        setLoading(false);
        // #region agent log
        fetch('http://127.0.0.1:7244/ingest/ce74763c-2088-422f-b4f8-666a2ecc75d0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useFileContent.ts:42',message:'loadFileContent end',data:{loading:false},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
      }
    };

    loadFileContent();
  }, [originalFileName]);

  return { content, loading, error };
};