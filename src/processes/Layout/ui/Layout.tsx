import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'shared';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback="Loading...">
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
