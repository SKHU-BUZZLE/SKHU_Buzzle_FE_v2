import { Outlet } from 'react-router-dom';

export default function RootFrame() {
  return (
    <div className='ds-theme-bg-backdrop min-h-dvh'>
      <main className='ds-theme-bg-base ds-text-normal ds-theme-border-base ds-layout-max-width mx-auto min-h-dvh border-x'>
        <Outlet />
      </main>
    </div>
  );
}
