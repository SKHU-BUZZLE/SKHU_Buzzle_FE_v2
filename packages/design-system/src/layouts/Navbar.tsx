import ThemeToggle from '@layouts/ThemeToggle';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className='ds-theme-bg-base ds-theme-border-base flex h-[8vh] items-center justify-between border-b px-28'>
      <Link to='/docs'>
        <h2 className='text-primary-500'>BUZZLE</h2>
      </Link>
      <div className='flex items-center gap-24'>
        <Link
          className={`rounded px-2 py-1 hover:opacity-50 ${
            pathname.startsWith('/docs/foundation') ? 'text-primary-500' : ''
          }`}
          to='/docs/foundation'
        >
          Foundations
        </Link>
        <Link
          className={`rounded px-2 py-1 hover:opacity-50 ${
            pathname.startsWith('/docs/component') ? 'text-primary-500' : ''
          }`}
          to='/docs/component'
        >
          Components
        </Link>

        <ThemeToggle />
      </div>
    </nav>
  );
}
