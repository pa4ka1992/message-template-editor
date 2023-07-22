import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ROUTE } from 'shared';

export const Home: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button value="Message Editor" handler={() => navigate(ROUTE.template)} />
    </div>
  );
};
