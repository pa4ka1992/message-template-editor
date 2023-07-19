import { FC } from 'react';
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom';
import { Layout } from 'processes';
import { getLazyComponent, ROUTES } from 'shared';

const Home = getLazyComponent('pages', 'Home');
const Template = getLazyComponent('pages', 'Template');
const NotFound = getLazyComponent('pages', 'NotFound');

export const routes: RouteObject[] = [
  {
    path: ROUTES.home,
    element: <Home />
  },
  {
    path: ROUTES.template,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Template />
      }
    ]
  },
  {
    path: ROUTES.notFound,
    element: <NotFound />
  }
];

const router = createBrowserRouter(routes);

export const Router: FC = () => <RouterProvider router={router} />;
