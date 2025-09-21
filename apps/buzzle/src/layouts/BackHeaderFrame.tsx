import { LifeCounter } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import { useLife } from '@hooks/useLife';
import { Outlet } from 'react-router-dom';

export default function BackHeaderFrame() {
  const { data: life = 0 } = useLife();

  return (
    <div className='ds-layout-padding min-h-inherit flex w-full flex-1 flex-col'>
      <BackHeader rightSlot={<LifeCounter life={life} />} to='/home' />
      {/* Outlet 영역이 화면을 다 채우기 위해서 flex-1을 사용 / 여백을 위한 py 설정 */}
      <section className='min-h-0 flex-1 overflow-y-auto'>
        <Outlet />
      </section>
    </div>
  );
}
