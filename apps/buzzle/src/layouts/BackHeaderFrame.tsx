import { LifeCounter } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import { useLife } from '@hooks/useLife';
import { Outlet } from 'react-router-dom';

export default function BackHeaderFrame({ to }: { to: string }) {
  const { data: life = 0 } = useLife();

  return (
    <div className='ds-layout-padding min-h-inherit flex w-full flex-1 flex-col'>
      <BackHeader rightSlot={<LifeCounter life={life} />} to={to} />
      {/* Outlet 영역이 화면을 다 채우기 위해서 flex-1을 사용 / 여백을 위한 py 설정 */}
      <section className='flex min-h-0 flex-1 flex-col overflow-y-auto py-16'>
        <Outlet />
      </section>
    </div>
  );
}
