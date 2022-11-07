import { rem } from 'polished';
import React, { FC, useEffect, useState } from 'react';
import { BackButton } from 'src/components/BackButton';
import { WideButton } from 'src/components/Button';
import { CenteredContent } from 'src/components/CenteredContent';
import { Input } from 'src/components/Input';
import { useGetAuth } from 'src/hooks/auth.hooks';
import { useUpdateUser } from 'src/hooks/user.hooks';
import styled from 'styled-components';
import {
  InputAndLabelWrapper,
  Label,
} from '../AuthenticatePages/authenticatePages.style';

const Spacing = styled.div`
  height: ${rem(10)};
`;

export const ProfilePage: FC = () => {
  const updateProfile = useUpdateUser();
  const user = useGetAuth();

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    setEmail(user?.data?.user.email);
    setName(user?.data?.user.name);
  }, [user?.data]);

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && name) {
      updateProfile.mutate({
        email,
        name,
      });
    }
  };

  return (
    <>
      <BackButton />
      <form onSubmit={handleUpdateProfile}>
        <InputAndLabelWrapper>
          <Label>Email:</Label>
          <Input
            type="email"
            placeholder="Enter email..."
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputAndLabelWrapper>
        <InputAndLabelWrapper>
          <Label>Name:</Label>
          <Input
            type="text"
            placeholder="Enter name..."
            required
            minLength={3}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </InputAndLabelWrapper>

        <Spacing />

        <CenteredContent>
          <WideButton type="submit">Update Profile</WideButton>
        </CenteredContent>
      </form>
    </>
  );
};
