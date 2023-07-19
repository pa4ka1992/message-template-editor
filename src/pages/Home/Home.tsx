import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ROUTES } from 'shared';

export const Home: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button value="Message Editor" handler={() => navigate(ROUTES.template)} />
    </div>
  );
};
