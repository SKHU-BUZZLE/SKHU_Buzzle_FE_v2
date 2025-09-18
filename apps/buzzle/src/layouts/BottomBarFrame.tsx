import BottomNavBar from '@components/bottomNavBar';
import { Outlet } from 'react-router-dom';

export default function BottomBarFrame() {
  return (
    <div className='ds-layout-padding ds-bottom-nav-padding h-full w-full'>
      <Outlet />
      <BottomNavBar />
    </div>
  );
}
