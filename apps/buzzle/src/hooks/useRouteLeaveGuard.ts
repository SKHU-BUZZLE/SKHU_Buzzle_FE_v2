import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

/**
 * useRouteLeaveGuard
 * @description
 * 사용자가 현재 페이지에서 벗어나려 할 때(뒤로가기, 다른 경로 이동, 새로고침, 탭 닫기, 주소창 이동)
 * 경고창을 띄우고 확인 여부에 따라 이동을 차단하는 훅입니다.
 *
 * - **라우터 전환 차단**: `react-router-dom`의 `useBlocker`를 사용해
 *   내부 라우터 이동(뒤로가기, 다른 경로로 이동 등)을 가로채고,
 *   `window.confirm`으로 사용자 확인을 받습니다.
 * - **브라우저 이탈 차단**: `beforeunload` 이벤트를 등록하여
 *   새로고침, 탭 닫기, 주소창 이동 시 브라우저 기본 확인창을 표시합니다.
 *   (⚠️ 이 경우 커스텀 메시지는 표시되지 않고, 브라우저 기본 문구만 노출됩니다.)
 *
 * @param enabled - true일 경우 차단 동작을 활성화합니다. false면 아무 동작도 하지 않습니다.
 *
 * @example
 * ```tsx
 * // 퀴즈 로딩 페이지에서 사용 예시
 * useRouteLeaveGuard(true);
 *
 * // 조건부 활성화
 * useRouteLeaveGuard(isQuizInProgress);
 * ```
 */
export function useRouteLeaveGuard(enabled: boolean) {
  // 1) 라우터 전환 차단
  const blocker = useBlocker(enabled);
  useEffect(() => {
    if (blocker.state === 'blocked') {
      const ok = window.confirm('페이지를 이동하시겠습니까?'); // TODO: 모달로 교체 예정
      if (ok) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);

  // 2) 새로고침/탭닫기/주소창 이동 차단
  useEffect(() => {
    if (!enabled) return;

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // 브라우저에서 confirm을 띄우려면 returnValue 설정이 필요합니다.
      // TS에서는 deprecated로 표시되지만 실제 동작상 필요합니다.
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [enabled]);
}
