import AppLayout from '@layouts/AppLayout';
import BackHeaderFrame from '@layouts/BackHeaderFrame';
import BackNavFrame from '@layouts/BackNavFrame';
import BottomBarFrame from '@layouts/BottomBarFrame';
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
            // 홈 전용 프레임: HomeHeader, BottomNavBar 포함된 레이아웃
            {
              element: <HomeFrame />,
              children: [{ path: 'home', element: <HomePage /> }],
            },

            // 뒤로가기 헤더 프레임: BackHeader 포함된 레이아웃
            {
              element: <BackHeaderFrame />,
              children: [
                // 뒤로가기 헤더가 포함된 페이지들
                { path: 'ranking', element: <RankingPage /> },
                // 대부분 퀴즈 진행중인 페이지들
              ],
            },

            // 바텀 네비게이션 바가 포함된 페이지들
            {
              element: <BottomBarFrame />,
              children: [
                // 바텀 네비게이션 바가 포함된 페이지들
                // 생각보다 이 부분이 많지 않네요..? 최종때 사용 안하면 지우겠습니다.
              ],
            },

            // 뒤로가기 헤더 & 바텀 네비게이션 바가 포함된 페이지들
            {
              element: <BackNavFrame />,
              children: [
                { path: 'single', element: <SinglePage /> },
                { path: 'multi', element: <MultiPage /> },
                { path: 'review', element: <ReviewPage /> },
                // 퀴즈 결과 창페이지도 추가될 것 같습니다.
              ],
            },

            // 헤더 및 바텀네비게이션 바가 없는 앱 기본 레이아웃 적용된 페이지들
            {
              element: <AppLayout />,
              children: [
                // 기본 레이아웃만 적용되어야하는 페이지들
                { path: '*', element: <NotFoundPage /> },
              ],
            },
          ],
        },
      ],
    },
  ],
  { basename },
);
