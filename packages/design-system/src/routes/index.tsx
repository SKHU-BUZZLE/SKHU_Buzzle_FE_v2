import { createBrowserRouter, Navigate } from 'react-router-dom';

import MultiQuizRankingItemDoc from '@pages/components/MultiQuizRankingItemDoc';
import QuizIntroDoc from '@pages/components/QuizIntroDoc';
import FormFieldDoc from '@pages/components/FormFieldDoc';
import CounterDoc from '@pages/components/CounterDoc';
import UserStatusBadgeDoc from '@pages/components/UserStatusBadgeDoc';
import AvatarDoc from '@pages/components/AvatarDoc';
import QuizOptionDoc from '@pages/components/QuizOptionDoc';
import ProfileImageDoc from '@pages/components/ProfileImageDoc';
import LifeCounterDoc from '@pages/components/LifeCounterDoc';
import IconsDoc from '@pages/components/IconsDoc';

import Layout from '@layouts/Layout';
import ButtonDoc from '@pages/components/ButtonDoc';
import InputDoc from '@pages/components/InputDoc';
import ColorDoc from '@pages/foundations/ColorDoc';
import Introduction from '@pages/Introduction';

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
          { path: 'Icons', element: <IconsDoc /> },
          { path: 'LifeCounter', element: <LifeCounterDoc /> },
          { path: 'QuizOption', element: <QuizOptionDoc /> },
          { path: 'ProfileImage', element: <ProfileImageDoc /> },
          { path: 'Avatar', element: <AvatarDoc /> },
          { path: 'FormField', element: <FormFieldDoc /> },
          { path: 'Counter', element: <CounterDoc /> },
          { path: 'UserStatusBadge', element: <UserStatusBadgeDoc /> },
          { path: 'MultiQuizRankingItem', element: <MultiQuizRankingItemDoc /> },
          { path: 'QuizIntro', element: <QuizIntroDoc /> },
        ],
      },
    ],
  },
]);

export default router;
