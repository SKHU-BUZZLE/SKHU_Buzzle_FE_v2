// 임시 바텀바 입니다.
import { BOTTOM_NAV_HEIGHT, LAYOUT_MAX_WIDTH } from '@constants/layout';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const linkClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'text-black-600' : 'text-black-200');

  return (
    <nav
      aria-label='하단 네비게이션'
      className={`border-white-400 fixed bottom-0 left-1/2 z-50 w-full -translate-x-1/2 border-t bg-white text-sm ${LAYOUT_MAX_WIDTH} ${BOTTOM_NAV_HEIGHT}`}
    >
      <div className='flex h-full items-center justify-around'>
        <NavLink className={linkClass} to='/home'>
          홈
        </NavLink>
        <NavLink className={linkClass} to='/single'>
          싱글 퀴즈
        </NavLink>
        <NavLink className={linkClass} to='/multi'>
          멀티 퀴즈
        </NavLink>
        <NavLink className={linkClass} to='/ranking'>
          랭킹
        </NavLink>
        <NavLink className={linkClass} to='/note'>
          오답 노트
        </NavLink>
      </div>
    </nav>
  );
}
