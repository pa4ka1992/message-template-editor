import { FC } from 'react';
import { RouterProvider, createBrowserRouter, RouteObject } from 'react-router-dom';
import { Layout } from 'processes';
import { getLazyComponent, ROUTE } from 'shared';

const Home = getLazyComponent('pages', 'Home');
const Template = getLazyComponent('pages', 'Template');
const NotFound = getLazyComponent('pages', 'NotFound');

export const route: RouteObject[] = [
  {
    path: ROUTE.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: ROUTE.template,
        element: <Template />
      }
    ]
  },
  {
    path: ROUTE.notFound,
    element: <NotFound />
  }
];

const router = createBrowserRouter(route);

export const Router: FC = () => <RouterProvider router={router} />;
