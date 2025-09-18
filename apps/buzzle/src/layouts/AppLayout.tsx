import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className='ds-layout-padding'>
      <Outlet />
    </div>
  );
}
