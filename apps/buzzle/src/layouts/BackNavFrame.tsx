import { LifeCounter } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import BottomNavBar from '@components/bottomNavBar';
import { useLife } from '@hooks/useLife';
import { Outlet } from 'react-router-dom';

export default function BackNavFrame() {
  const { data: life = 0 } = useLife();

  return (
    <div className='ds-layout-padding min-h-inherit flex flex-1 flex-col'>
      <div className='flex-none'>
        <BackHeader rightSlot={<LifeCounter life={life} />} to='/home' />
      </div>

      <section className='ds-bottom-nav-padding flex min-h-0 flex-1 flex-col overflow-y-auto'>
        <Outlet />
      </section>

      <BottomNavBar />
    </div>
  );
}
