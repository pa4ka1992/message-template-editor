import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'shared';
import { Footer } from 'widgets';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
