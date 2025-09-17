import HomeFrame from '@layouts/HomeFrame';
import RootFrame from '@layouts/RootFrame';
import HomePage from '@pages/home';
import KakaoCallbackPage from '@pages/kakao-callback';
import LoginPage from '@pages/login';
import MultiPage from '@pages/multi';
import NotFoundPage from '@pages/not-found';
import RankingPage from '@pages/ranking';
import ReviewPage from '@pages/review';
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
            { path: 'single', element: <SinglePage /> },
            { path: 'multi', element: <MultiPage /> },
            { path: 'ranking', element: <RankingPage /> },
            { path: 'review', element: <ReviewPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'api/oauth2/callback/kakao', element: <KakaoCallbackPage /> },
            { path: '*', element: <NotFoundPage /> },
          ],
        },
        { element: <HomeFrame />, children: [{ path: 'home', element: <HomePage /> }] },
      ],
    },
  ],
  { basename },
);

export default router;
