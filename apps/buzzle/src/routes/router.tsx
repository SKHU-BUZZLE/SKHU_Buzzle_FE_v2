import RootFrame from '@layouts/RootFrame';
import HomePage from '@pages/home';
import LoginPage from '@pages/login';
import MultiPage from '@pages/multi';
import NotFoundPage from '@pages/not-found';
import NotePage from '@pages/note';
import RankingPage from '@pages/ranking';
import SinglePage from '@pages/single';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '../App';

const basename = import.meta.env.BASE_URL;

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootFrame />,
      children: [
        {
          element: <App />,
          children: [
            { index: true, element: <Navigate replace to='/home' /> },
            { path: 'home', element: <HomePage /> },
            { path: 'single', element: <SinglePage /> },
            { path: 'multi', element: <MultiPage /> },
            { path: 'ranking', element: <RankingPage /> },
            { path: 'note', element: <NotePage /> },
            { path: 'login', element: <LoginPage /> },
            { path: '*', element: <NotFoundPage /> },
          ],
        },
      ],
    },
  ],
  { basename },
);

export default router;
