import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useGetAuth } from 'src/hooks/auth.hooks';
import { baseRoutes } from '../baseRoutes';

export const PrivateRoute: FC = () => {
  const user = useGetAuth();

  if (!user?.data) {
    return <Navigate to={baseRoutes.login} />;
  }

  return <Outlet />;
};
