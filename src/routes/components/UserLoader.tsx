import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from 'src/components/Spinner';
import { useGetAuth, useCheckTokens } from 'src/hooks/auth.hooks';

export const UserLoader: FC = () => {
  const user = useGetAuth();
  const checkTokens = useCheckTokens();

  useEffect(() => {
    if (!user?.data) {
      checkTokens.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checkTokens.isLoading) {
    return <Spinner />;
  }

  return <Outlet />;
};
