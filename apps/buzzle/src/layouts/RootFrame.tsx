import { Outlet } from 'react-router-dom';

export default function RootFrame() {
  return (
    <div className='bg-backdrop min-h-dvh'>
      <div className='bg-surface text-body border-surface layout-max-width bottom-nav-padding mx-auto min-h-dvh border-x'>
        <main className=''>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
