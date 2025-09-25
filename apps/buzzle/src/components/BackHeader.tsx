import { ChevronIcon, Modal } from '@buzzle/design';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { useBlocker, useLocation, useNavigate } from 'react-router-dom';

interface BackHeaderProps {
  to: string;
  preventBackNavigation?: boolean;
  rightSlot: ReactNode;
  onBeforeNavigate?: () => void | Promise<void>;
  /** 이 경로들에선 가드를 생략 */
  bypassPaths?: (string | RegExp)[];
}

/** beforeunload 가드: 새로고침/탭닫기/주소창 이동 방지 (기본 확인창만 가능) */
const useBeforeUnloadGuard = (preventBackNavigation: boolean) => {
  useEffect(() => {
    if (!preventBackNavigation) return;

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; // 크롬 등에서 필수
      return '';
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [preventBackNavigation]);
};

/**
 * BackHeader
 * @description 뒤로가기 버튼과 우측 슬롯을 제공하는 헤더 컴포넌트입니다.
 * - 기본적으로 뒤로가기 버튼 클릭 시 `to` 경로로 이동합니다.
 * - `preventBackNavigation`이 true일 경우, 라우터 전환을 가로채고 사용자가 확인해야만 이동할 수 있도록 모달을 띄웁니다.
 * - `bypassPaths`에 지정된 경로(문자열 포함 매칭 또는 정규식 매칭)에서는 가드를 생략하고 자유롭게 이동할 수 있습니다.
 *
 * @param {string} props.to - 뒤로가기 버튼 클릭 시 이동할 경로
 * @param {boolean} [props.preventBackNavigation=false] - 라우터 전환 시 이동을 차단하고 확인 모달을 띄울지 여부
 * @param {ReactNode} props.rightSlot - 헤더 우측에 렌더링할 요소 (예: 상태 표시, 버튼 등)
 * @param {() => void | Promise<void>} [props.onBeforeNavigate] - 이동 직전에 실행할 정리 작업 (예: 소켓 종료, 상태 초기화 등)
 * @param {(string | RegExp)[]} [props.bypassPaths=[]] - 이 경로들에서는 가드를 생략합니다. 부분 문자열 매칭 또는 정규식 매칭이 가능합니다.
 *
 * @example
 * 단순 뒤로가기 헤더
 * <BackHeader
 *   to="/home"
 *   rightSlot={<LifeCounter life={3} />}
 * />
 *
 * @example
 * 삭제 페이지: 뒤로가기 시 확인 모달 + 정리 작업 실행
 * <BackHeader
 *   to="/review"
 *   preventBackNavigation
 *   rightSlot={<DeleteIcon />}
 *   onBeforeNavigate={() => console.log('정리 작업')}
 * />
 *
 * @example
 * 특정 경로(result, success)에서는 가드 없이 이동 허용 (정규식 가능)
 * <BackHeader
 *   to="/multi"
 *   preventBackNavigation
 *   rightSlot={<LifeCounter life={life} />}
 *   onBeforeNavigate={handleLeave}
 *   bypassPaths={['/result', /\/success$/]}
 * />
 */
export default function BackHeader({
  to,
  preventBackNavigation = false,
  rightSlot,
  onBeforeNavigate,
  bypassPaths = [],
}: BackHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 bypassPaths에 포함되면 가드 비활성화
  const shouldBypass = bypassPaths.some((pattern) =>
    pattern instanceof RegExp ? pattern.test(location.pathname) : location.pathname.includes(pattern),
  );
  const guardEnabled = preventBackNavigation && !shouldBypass;

  const [isOpen, setIsOpen] = useState(false);

  // 현재 라우터에서 다른 모든 라우터로 이동을 차단
  const blocker = useBlocker(guardEnabled);
  // confirm 재진입/중복 실행 방지
  const promptingRef = useRef(false);
  // 재프롬프트 방지
  const onBeforeNavigateRef = useRef(onBeforeNavigate);

  useEffect(() => {
    onBeforeNavigateRef.current = onBeforeNavigate;
  }, [onBeforeNavigate]);

  useEffect(() => {
    if (blocker.state !== 'blocked') {
      setIsOpen(false);
      promptingRef.current = false;
      return;
    }

    // 우회 플래그가 달린 네비게이션이면 즉시 통과
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bypass = (blocker.location as any)?.state?.__bypassGuard;
    if (bypass) {
      blocker.proceed?.();
      promptingRef.current = false;
      return;
    }

    // 일반 케이스: 모달 띄우기
    if (!promptingRef.current) {
      promptingRef.current = true;
      setIsOpen(true);
    }
  }, [blocker.state, blocker.location, blocker]);

  useBeforeUnloadGuard(preventBackNavigation);
  const isBlocked = blocker.state === 'blocked';

  // 취소(머무르기)
  const handleCancel = () => {
    setIsOpen(false);
    if (isBlocked) {
      blocker.reset?.();
    }
    promptingRef.current = false;
  };

  // 확인(나가기)
  const handleConfirm = async () => {
    try {
      await onBeforeNavigateRef.current?.(); // 소켓 종료/상태 초기화 등
    } finally {
      setIsOpen(false);
      if (isBlocked) {
        // blocked일 때만 proceed
        blocker.proceed?.();
      } else {
        // 혹시 blocked가 아니면 직접 네비게이트
        navigate(to);
      }
      promptingRef.current = false;
    }
  };

  return (
    <>
      <nav aria-label='뒤로가기 헤더' className='flex items-center justify-between gap-12 py-12'>
        <button aria-label='뒤로가기' className='cursor-pointer' type='button' onClick={() => navigate(to)}>
          <ChevronIcon className='text-black-300 dark:text-black-100 size-28' />
        </button>
        {rightSlot}
      </nav>

      <Modal.Root open={isOpen} onClose={handleCancel} onConfirm={handleConfirm}>
        <Modal.Content className='max-w-360'>
          <Modal.Title>정말 페이지를 나가시겠어요?</Modal.Title>
          <Modal.Description>지금까지의 내용이 사라질 수 있어요</Modal.Description>

          <Modal.Footer>
            <Modal.CloseButton>취소</Modal.CloseButton>
            <Modal.ActionButton>나가기</Modal.ActionButton>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
