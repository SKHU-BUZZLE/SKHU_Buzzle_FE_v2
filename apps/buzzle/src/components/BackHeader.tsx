import { ChevronIcon } from '@buzzle/design';
import { type ReactNode, useEffect } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';

interface BackHeaderProps {
  to: string;
  preventBackNavigation?: boolean;
  rightSlot: ReactNode;
}

/** beforeunload 가드: 새로고침/탭닫기/주소창 이동 방지 (기본 확인창만 가능) */
function useBeforeUnloadGuard(preventBackNavigation: boolean) {
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
}

/** BackHeader
 * @description 뒤로가기를 할 수 있는 BackHeader 컴포넌트입니다.
 * @description 오른쪽에 들어올 아이템은 `rightSlot` prop을 통해 커스텀할 수 있습니다.
 *
 * @param {boolean} [props.preventBackNavigation=false] 라우터 전환 시 confirm으로 뒤로가기 차단 여부 (선택)
 * @param {string} [props.to="/"] 뒤로가기 아이콘 클릭 시 이동할 경로 (필수)
 * @param {ReactNode} [props.rightSlot] 헤더 우측에 렌더링할 요소 (필수)
 *
 * @example 1) 남은 하트 카운터 표시
 * <BackHeader
 *   to="/home"
 *   rightSlot={<LifeCounter life={3} />}
 * />
 *
 * @example 2) 삭제 버튼 표시
 * <BackHeader
 *   to="/note"
 *   preventBackNavigation
 *   rightSlot={
 *     <DeleteIcon
 *       className="text-black-300 dark:text-black-100 size-24 cursor-pointer"
 *       onClick={() => console.log('삭제')}
 *     />
 *   }
 * />
 *
 */
export default function BackHeader({ to = '/', preventBackNavigation = false, rightSlot }: BackHeaderProps) {
  const navigate = useNavigate();

  // 현재 라우터에서 다른 모든 라우터로 이동을 차단
  const blocker = useBlocker(preventBackNavigation);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const proceed = window.confirm('페이지를 이동하시겠습니까?'); // todo: 모달로 대체할 예정
      if (proceed) {
        blocker.proceed(); // 이동 허용
      } else {
        blocker.reset(); // 이동 취소
      }
    }
  }, [blocker]);

  useBeforeUnloadGuard(preventBackNavigation);

  return (
    <nav aria-label='뒤로가기 헤더' className='flex items-center justify-between gap-12 py-12'>
      <button
        aria-label='뒤로가기'
        className='cursor-pointer'
        type='button'
        onClick={() => {
          navigate(to);
        }}
      >
        <ChevronIcon className='text-black-300 dark:text-black-100 size-28' />
      </button>
      {rightSlot}
    </nav>
  );
}
