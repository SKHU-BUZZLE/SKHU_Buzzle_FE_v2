import { LAYOUT_PADDING } from '@constants/layout';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <main className={LAYOUT_PADDING}>
      <Outlet />
    </main>
  );
}
