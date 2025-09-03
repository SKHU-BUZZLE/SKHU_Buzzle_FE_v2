/* eslint-disable */
import { createBrowserRouter, Navigate } from 'react-router-dom';
import InputDoc from '@pages/components/InputDoc';

import ButtonDoc from '@/pages/components/ButtonDoc';
import ColorDoc from '@/pages/foundations/ColorDoc';

import Layout from '@/layouts/Layout';
import Introduction from '@/pages/Introduction';

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
      { index: true, element: <Introduction /> },
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
          { path: 'Input', element: <InputDoc /> },
        ],
      },
    ],
  },
]);

export default router;
