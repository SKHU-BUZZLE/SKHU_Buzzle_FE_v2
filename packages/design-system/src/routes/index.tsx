import { createBrowserRouter, Navigate } from 'react-router-dom';

import Layout from '@/layouts/Layout';
import ButtonPlayground from '@/pages/ButtonPlayground';
import ButtonDoc from '@/pages/components/ButtonDoc';
import ColorDoc from '@/pages/foundations/ColorDoc';
import ModalPlayground from '@/pages/ModalPlayground';
import PlaygroundGuide from '@/pages/PlaygroundGuide';
import TestPage from '@/pages/TestPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to='/docs' />,
  },
  {
    path: '/docs',
    element: <Layout />,
    children: [
      // /docs
      { index: true, element: <PlaygroundGuide /> },
      // /docs/foundation/*
      {
        path: 'foundation',
        children: [
          { index: true, element: <ColorDoc /> },
          { path: 'Color', element: <ColorDoc /> },
        ],
      },
      // /docs/component/*
      {
        path: 'component',
        children: [
          { index: true, element: <ButtonDoc /> },
          { path: 'Button', element: <ButtonDoc /> },
        ],
      },
      {
        index: true,
        element: <PlaygroundGuide />,
      },
      {
        path: 'Test',
        element: <TestPage />,
      },
      {
        path: 'Button',
        element: <ButtonPlayground />,
      },
      {
        path: 'Modal',
        element: <ModalPlayground />,
      },
    ],
  },
]);

export default router;
