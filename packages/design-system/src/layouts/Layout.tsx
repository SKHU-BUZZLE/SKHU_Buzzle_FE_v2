import Navbar from '@layouts/Navbar';
import Sidebar from '@layouts/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <header className='sticky top-0'>
        <Navbar />
      </header>

      <div className='flex flex-1'>
        <aside className='ds-theme-border-base w-[15vw] border-r'>
          <Sidebar />
        </aside>

        <main className='min-w-0 flex-1 p-28'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
