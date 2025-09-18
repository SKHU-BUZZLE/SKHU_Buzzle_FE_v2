import { LifeCounter } from '@buzzle/design';
import BackHeader from '@components/BackHeader';
import { Outlet } from 'react-router-dom';

export default function BackHeaderFrame() {
  return (
    <div className='ds-layout-padding h-full w-full'>
      {/* 지우님이 해당 부분 동적 할당? 으로 수정해주시면 됩니다..!! */}
      <BackHeader rightSlot={<LifeCounter life={50} />} to='/home' />
      <Outlet />
    </div>
  );
}
