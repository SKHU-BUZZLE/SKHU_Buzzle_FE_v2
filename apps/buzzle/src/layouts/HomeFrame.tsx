import BottomNavBar from '@components/bottomNavBar';
import HomeHeader from '@components/HomeHeader';
import { Outlet } from 'react-router-dom';

export default function HomeFrame() {
  return (
    <div className='bg-white-200 dark:bg-dm-black-800 ds-layout-padding flex min-h-dvh flex-col'>
      <div className='flex-none'>
        <HomeHeader />
      </div>

      <section className='mb-60 flex flex-1 flex-col py-16'>
        <Outlet />
      </section>

      <BottomNavBar />
    </div>
  );
}
