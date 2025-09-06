import { createBrowserRouter } from 'react-router-dom';

import App from '../App';

const basename = import.meta.env.BASE_URL;

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      // children: [...]
    },
  ],
  {
    basename: basename,
  },
);
