import { LifeCounter } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import { Outlet } from 'react-router-dom';

export default function BackHeaderFrame() {
  return (
    <div className='ds-layout-padding min-h-inherit flex w-full flex-1 flex-col'>
      {/* 지우님이 해당 부분 동적 할당? 으로 수정해주시면 됩니다..!! */}
      <BackHeader rightSlot={<LifeCounter life={50} />} to='/home' />
      {/* Outlet 영역이 화면을 다 채우기 위해서 flex-1을 사용 / 여백을 위한 py 설정 */}
      <section className='min-h-0 flex-1 overflow-y-auto'>
        <Outlet />
      </section>
    </div>
  );
}
