import { Outlet } from 'react-router-dom';

export default function RootFrame() {
  return (
    <div className='bg-backdrop min-h-dvh'>
      <div className='ds-theme-bg-base ds-text-normal ds-theme-border-base layout-max-width mx-auto min-h-dvh border-x'>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
