// 임시 바텀바 입니다.
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const linkClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'text-black-600' : 'text-black-200');

  return (
    <nav
      aria-label='하단 네비게이션'
      className='bg-surface border-surface layout-max-width bottom-nav-height fixed bottom-0 left-1/2 z-50 w-full -translate-x-1/2 border text-sm'
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
