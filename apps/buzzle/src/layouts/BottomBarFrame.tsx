import BottomNavBar from '@components/bottomNavBar';
import { Outlet } from 'react-router-dom';

export default function BottomBarFrame() {
  return (
    <div className='ds-layout-padding min-h-inherit flex flex-1 flex-col'>
      <section className='ds-bottom-nav-padding flex min-h-0 flex-1 flex-col'>
        <Outlet />
      </section>
      <BottomNavBar />
    </div>
  );
}
