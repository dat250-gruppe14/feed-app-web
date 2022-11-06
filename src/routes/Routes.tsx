import { Suspense, useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes as RoutesReactRouterDom,
} from 'react-router-dom';
import { LoginPage } from 'src/pages/AuthenticatePages/LoginPage';
import { RegisterPage } from 'src/pages/AuthenticatePages/RegisterPage';
import { CreatePollPage } from 'src/pages/CreatePollPage/CreatePollPage';
import { EditPollPage } from 'src/pages/EditPollPage/EditPollPage';
import { PollsPage } from 'src/pages/PollsPage/PollsPage';
import { ProfilePage } from 'src/pages/ProfilePage/ProfilePage';
import { VotePage } from 'src/pages/VotePage/VotePage';
import { useGetAuth, useCheckTokens } from 'src/hooks/auth.hooks';
import { Spinner } from 'components/Spinner';
import { GenericNotFound } from './paths';
import { baseRoutes } from './baseRoutes';

export const Routes = () => {
  const user = useGetAuth();
  const checkTokens = useCheckTokens();

  useEffect(() => {
    if (!user?.data) {
      checkTokens.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <RoutesReactRouterDom>
        <Route path={baseRoutes.index} element={<PollsPage />} />
        <Route path={baseRoutes.createPoll} element={<CreatePollPage />} />
        <Route path={baseRoutes.editPoll} element={<EditPollPage />} />
        <Route path={baseRoutes.pollById} element={<VotePage />} />
        <Route path={baseRoutes.profile} element={<ProfilePage />} />
        <Route path={baseRoutes.login} element={<LoginPage />} />
        <Route path={baseRoutes.register} element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/404" element={<GenericNotFound />} />
      </RoutesReactRouterDom>
    </Suspense>
  );
};
