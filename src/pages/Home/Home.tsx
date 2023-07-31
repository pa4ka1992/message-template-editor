import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ROUTE } from 'shared';

export const Home: FC = () => {
  const navigate = useNavigate();
  return <Button handler={() => navigate(ROUTE.template)}>Message Editor</Button>;
};
