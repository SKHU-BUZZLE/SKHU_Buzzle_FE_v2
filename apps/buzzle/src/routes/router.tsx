import AppLayout from '@layouts/AppLayout';
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
import { createBrowserRouter } from 'react-router-dom';

import { GuestOnly, IndexRedirect, RequireAuth } from './guards';

const basename = import.meta.env.BASE_URL;

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootFrame />,
      children: [
        { index: true, element: <IndexRedirect /> },

        {
          element: <GuestOnly />,
          children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'api/oauth2/callback/kakao', element: <KakaoCallbackPage /> },
          ],
        },
        {
          element: <RequireAuth />,
          children: [
            // (A) 홈 전용 프레임: 바텀바/특화 레이아웃이 필요한 홈만 HomeFrame으로 감쌈
            {
              element: <HomeFrame />,
              children: [{ path: 'home', element: <HomePage /> }],
            },

            // (B) 그 외 인증 페이지들: 공통 레이아웃(AppLayout)로 감쌈
            {
              element: <AppLayout />,
              children: [
                { path: 'single', element: <SinglePage /> },
                { path: 'multi', element: <MultiPage /> },
                { path: 'ranking', element: <RankingPage /> },
                { path: 'review', element: <ReviewPage /> },
                { path: '*', element: <NotFoundPage /> }, // 404도 인증 구간에서 처리
              ],
            },
          ],
        },
      ],
    },
  ],
  { basename },
);
