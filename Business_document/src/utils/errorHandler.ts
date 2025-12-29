// ID: util.error.handler
// 참조: architecture/Blue_Print.md#utility-functions
// 통일된 에러 처리 유틸리티

export interface ErrorContext {
  component?: string;
  action?: string;
  details?: Record<string, unknown>;
}

/**
 * 통일된 에러 처리 함수
 * @param error - 에러 객체 또는 에러 메시지
 * @param context - 에러 발생 컨텍스트 정보
 */
export const handleError = (error: unknown, context?: ErrorContext): void => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const component = context?.component || 'Unknown';
  const action = context?.action || 'Unknown';
  
  // 콘솔에 에러 로깅
  console.error(`[${component}] ${action}:`, {
    message: errorMessage,
    context: context?.details,
    error: error instanceof Error ? {
      name: error.name,
      stack: error.stack
    } : undefined
  });
  
  // 향후 확장: 에러 리포팅 서비스로 전송 (예: Sentry)
  // if (process.env.NODE_ENV === 'production') {
  //   errorReportingService.captureException(error, { extra: context });
  // }
};

/**
 * 에러 메시지를 사용자 친화적인 형태로 변환
 * @param error - 에러 객체 또는 에러 메시지
 * @returns 사용자 친화적인 에러 메시지
 */
export const getUserFriendlyErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    // 특정 에러 타입에 대한 사용자 친화적인 메시지
    if (error.message.includes('404') || error.message.includes('찾을 수 없습니다')) {
      return '요청한 리소스를 찾을 수 없습니다.';
    }
    if (error.message.includes('네트워크') || error.message.includes('fetch')) {
      return '네트워크 연결을 확인해주세요.';
    }
    if (error.message.includes('권한') || error.message.includes('인증')) {
      return '접근 권한이 없습니다.';
    }
    return error.message;
  }
  return String(error);
};

