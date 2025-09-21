import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className='ds-layout-padding min-h-inherit flex flex-1 flex-col'>
      <Outlet />
    </div>
  );
}
