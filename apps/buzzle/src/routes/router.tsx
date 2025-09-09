import RootFrame from '@layouts/RootFrame';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';

const basename = import.meta.env.BASE_URL;

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootFrame />,
      children: [
        { index: true, element: <App /> },
        // { path: 'single', element: <SingleGamePage /> },
        // { path: 'multi', element: <MultiGamePage /> },
        // { path: 'ranking', element: <RankingPage /> },
        // { path: 'notes', element: <NotesPage /> },
      ],
    },
  ],
  {
    basename,
  },
);

export default router;
