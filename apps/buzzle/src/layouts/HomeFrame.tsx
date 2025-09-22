import BottomNavBar from '@components/bottomNavBar';
import HomeHeader from '@components/HomeHeader';
import { Outlet } from 'react-router-dom';

export default function HomeFrame() {
  return (
    <div className='bg-white-200 dark:bg-dm-black-800 ds-layout-padding min-h-inherit flex flex-1 flex-col'>
      <div className='flex-none'>
        <HomeHeader />
      </div>

      <section className='ds-bottom-nav-padding min-h-0 flex-1 overflow-y-auto'>
        <Outlet />
      </section>

      <BottomNavBar />
    </div>
  );
}
