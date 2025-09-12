import BottomNavBar from '@components/bottomNavBar';
import HomeHeader from '@components/HomeHeader';
import { Outlet } from 'react-router-dom';

export default function HomeFrame() {
  return (
    <div className='bg-white-200 dark:bg-dm-black-800 layout-padding h-full w-full'>
      <HomeHeader />
      <Outlet />
      <BottomNavBar />
    </div>
  );
}
