import { Outlet } from 'react-router-dom';

export default function RootFrame() {
  return (
    <div className='bg-surface md:bg-white-600 min-h-dvh'>
      <div className='bg-surface text-body mx-auto min-h-dvh max-w-768'>
        <Outlet />
      </div>
    </div>
  );
}
