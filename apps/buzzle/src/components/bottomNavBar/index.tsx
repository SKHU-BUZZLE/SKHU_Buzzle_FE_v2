// 임시 바텀바 입니다.
import { HomeIcon, MultiUserIcon, NoteIcon, RankingIcon, UserIcon } from '@buzzle/design';

import BottomNavItem from './BottomNavItem';

const navItems = [
  { to: '/home', Icon: HomeIcon, label: '홈' },
  { to: '/single', Icon: UserIcon, label: '싱글 퀴즈' },
  { to: '/multi', Icon: MultiUserIcon, label: '멀티 퀴즈' },
  { to: '/ranking', Icon: RankingIcon, label: '랭킹' },
  { to: '/note', Icon: NoteIcon, label: '오답 노트' },
];

export default function BottomNavBar() {
  return (
    <nav
      aria-label='하단 네비게이션'
      className='ds-theme-bg-base ds-theme-border-base ds-layout-max-width ds-bottom-nav-height fixed bottom-0 left-1/2 z-50 w-full -translate-x-1/2 border'
    >
      <div className='flex h-full items-center justify-around'>
        {navItems.map((item) => (
          <BottomNavItem key={item.to} Icon={item.Icon} label={item.label} to={item.to} />
        ))}
      </div>
    </nav>
  );
}
