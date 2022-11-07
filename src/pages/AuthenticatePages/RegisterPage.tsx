import React, { FC, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CenteredContent } from 'src/components/CenteredContent';
import { Input } from 'src/components/Input';
import { useGetAuth, useRegister } from 'src/hooks/auth.hooks';
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

export const RegisterPage: FC = () => {
  const register = useRegister();
  const navigate = useNavigate();
  const loggedInUser = useGetAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register.mutate({
      email,
      name,
      password,
    });
    setPassword('');
  };

  if (loggedInUser?.data) {
    return <Navigate to={baseRoutes.index} />;
  }

  if (!loggedInUser?.data)
    return (
      <>
        <HeaderWrapper>
          <Header>Register</Header>
        </HeaderWrapper>
        <form onSubmit={handleRegister}>
          <InputAndLabelWrapper>
            <Label htmlFor="name">Name:</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter name..."
              onChange={e => setName(e.target.value)}
              required
              value={name}
              minLength={3}
            />
          </InputAndLabelWrapper>
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
              minLength={8}
            />
          </InputAndLabelWrapper>

          <ButtonsWrapper>
            <AuthSubmitButton type="submit">Register</AuthSubmitButton>
            <AuthSecondaryButton
              type="button"
              onClick={() => navigate(baseRoutes.login)}
            >
              Sign in?
            </AuthSecondaryButton>
          </ButtonsWrapper>
        </form>
        <CenteredContent>
          <PollsButton onClick={() => navigate(baseRoutes.index)}>
            Continue without registering
          </PollsButton>
        </CenteredContent>
      </>
    );

  return null;
};
