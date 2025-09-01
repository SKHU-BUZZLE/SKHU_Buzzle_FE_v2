import SidebarNavItem from '@layouts/SidebarNavItem';
import { Link, Outlet } from 'react-router-dom';

export default function DesignSystemLayout() {
  return (
    <div className='flex min-h-[100vh] bg-white'>
      <aside className='w-[17vw] border-r border-gray-200 bg-gray-50 p-24'>
        <Link to='/docs'>
          <h2 className='text-primary-500 mb-36 text-lg font-light'>BUZZLE Design System</h2>
        </Link>
        <nav>
          <ul className='m-0 list-none p-0'>
            <SidebarNavItem label='Test' to='/docs/Test' />
          </ul>
        </nav>
      </aside>

      <main className='min-w-0 flex-1 p-[2rem]'>
        <Outlet />
      </main>
    </div>
  );
}
