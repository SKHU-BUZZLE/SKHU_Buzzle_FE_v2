import { createBrowserRouter, Navigate } from 'react-router-dom';

import Sidebar from '@/layouts/Sidebar';
import TestPage from '@/pages/TestPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to='/docs' />,
  },
  {
    path: '/docs',
    element: <Sidebar />,
    children: [
      {
        path: '',
        element: <TestPage />,
      },
      {
        path: 'Test',
        element: <TestPage />,
      },
    ],
  },
]);

export default router;
