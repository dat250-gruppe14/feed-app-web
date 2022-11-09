import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from 'src/components/Spinner';
import { useGetAuth } from 'src/hooks/auth.hooks';
import { userStatus } from 'src/store/userStatus';
import { baseRoutes } from '../baseRoutes';

export const PrivateRoute: FC = () => {
  const user = useGetAuth();
  const userDataLoading = userStatus.use();

  if (userDataLoading === 'loading') {
    return <Spinner />;
  }

  if (!user?.data && userDataLoading === 'error') {
    return <Navigate to={baseRoutes.login} />;
  }

  return <Outlet />;
};
