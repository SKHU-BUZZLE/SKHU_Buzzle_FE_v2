import BottomNav from '@components/BottomNav';
import { BOTTOM_NAV_PADDING, LAYOUT_MAX_WIDTH } from '@constants/layout';
import { Outlet } from 'react-router-dom';

export default function RootFrame() {
  return (
    <div className='bg-surface md:bg-white-600 min-h-dvh'>
      <div className={`bg-surface text-body mx-auto min-h-dvh ${LAYOUT_MAX_WIDTH} ${BOTTOM_NAV_PADDING}`}>
        <Outlet />
        <BottomNav />
      </div>
    </div>
  );
}
