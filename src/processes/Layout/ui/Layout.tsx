import { FC, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, ROUTE } from 'shared';

export const Layout: FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === ROUTE.template ? <Header /> : null}
      <main>
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
