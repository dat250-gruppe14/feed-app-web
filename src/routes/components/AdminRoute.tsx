import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from 'src/components/Spinner';
import { useGetAuth } from 'src/hooks/auth.hooks';
import { userStatus } from 'src/store/userStatus';
import { AccountRole } from 'src/types/types';
import { baseRoutes } from '../baseRoutes';

export const AdminRoute: FC = () => {
  const user = useGetAuth();
  const userDataLoading = userStatus.use();

  if (userDataLoading === 'loading') {
    return <Spinner />;
  }

  if (user?.data?.user.role !== AccountRole.Admin) {
    return <Navigate to={baseRoutes.index} />;
  }

  return <Outlet />;
};
