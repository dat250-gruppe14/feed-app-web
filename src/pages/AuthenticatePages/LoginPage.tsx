import React, { FC, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CenteredContent } from 'src/components/CenteredContent';
import { Input } from 'src/components/Input';
import { useGetAuth, useLogin } from 'src/hooks/auth.hooks';
import { baseRoutes } from 'src/routes/baseRoutes';
import {
  AuthSecondaryButton,
  AuthSubmitButton,
  ButtonsWrapper,
  Header,
  HeaderWrapper,
  InputAndLabelWrapper,
  Label,
  PollsButton,
} from './authenticatePages.style';

export const LoginPage: FC = () => {
  const login = useLogin();
  const navigate = useNavigate();
  const loggedInUser = useGetAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate({
      email,
      password,
    });
    setPassword('');
  };

  if (loggedInUser && loggedInUser?.status !== 'success') {
    return <p>Spinner</p>;
  }

  if (loggedInUser?.data) {
    return <Navigate to={baseRoutes.index} />;
  }

  if (!loggedInUser?.data)
    return (
      <>
        <HeaderWrapper>
          <Header>Sign in</Header>
        </HeaderWrapper>
        <form onSubmit={handleLogin}>
          <InputAndLabelWrapper>
            <Label htmlFor="email">Email:</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email..."
              onChange={e => setEmail(e.target.value)}
              required
              value={email}
            />
          </InputAndLabelWrapper>
          <InputAndLabelWrapper>
            <Label htmlFor="password">Password:</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password..."
              onChange={e => setPassword(e.target.value)}
              required
              value={password}
            />
          </InputAndLabelWrapper>

          <ButtonsWrapper>
            <AuthSubmitButton type="submit">Sign in</AuthSubmitButton>
            <AuthSecondaryButton
              type="button"
              onClick={() => navigate(baseRoutes.register)}
            >
              Register?
            </AuthSecondaryButton>
          </ButtonsWrapper>
        </form>
        <CenteredContent>
          <PollsButton onClick={() => navigate(baseRoutes.index)}>
            Continue without signing in
          </PollsButton>
        </CenteredContent>
      </>
    );

  return null;
};
