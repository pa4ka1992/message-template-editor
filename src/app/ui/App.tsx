import { FC } from 'react';
import { Router } from '../router';
import './styles/reset.scss';
import './styles/variables.scss';

export const App: FC = () => {
  return (
    <div className="App">
      <Router />
    </div>
  );
};
