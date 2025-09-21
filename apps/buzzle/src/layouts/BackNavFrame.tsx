import { LifeCounter } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import BottomNavBar from '@components/bottomNavBar';
import { Outlet } from 'react-router-dom';

export default function BackNavFrame() {
  return (
    <div className='ds-layout-padding min-h-inherit flex flex-1 flex-col'>
      {/* 지우님이 해당 부분 동적 할당? 으로 수정해주시면 됩니다..!! */}
      <div className='flex-none'>
        <BackHeader rightSlot={<LifeCounter life={50} />} to='/home' />
      </div>

      <section className='ds-bottom-nav-padding min-h-0 flex-1 overflow-y-auto'>
        <Outlet />
      </section>

      <BottomNavBar />
    </div>
  );
}
