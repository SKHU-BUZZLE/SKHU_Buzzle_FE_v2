import ThemeToggleButton from '@components/ThemeToggleButton';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <main className='layout-padding'>
      <ThemeToggleButton />
      <Outlet />
    </main>
  );
}
