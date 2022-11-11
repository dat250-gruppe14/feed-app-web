import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { Card } from 'src/components/Card';
import { useGetPolls, useGetPollWithMutate } from 'src/hooks/poll.hooks';
import { Input } from 'src/components/Input';
import { Alert } from 'src/components/Alert';
import { AlertCircle } from 'src/components/svg/AlertCircle';
import { baseRoutes } from 'src/routes/baseRoutes';
import { Spinner } from 'src/components/Spinner';
import { useGetAuth } from 'src/hooks/auth.hooks';
import { filterOwnedPolls } from 'src/utils/utils';
import { Button } from 'src/components/Button';
import { colors } from 'src/styles/colors';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'src/components/svg/Plus';
import { AccountRole } from 'src/types/types';
import { AdminPage } from './AdminPage';

export const Heading = styled.div`
  font-size: ${rem(24)};
  font-weight: 700;
`;

const CreatePollButton = styled(Button)`
  background: ${colors.blueish};
  height: ${rem(30)};
  font-size: ${rem(16)};
  padding: 0 ${rem(10)};
`;

const HeadingAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InputWrapper = styled.form`
  margin: ${rem(20)} 0;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: ${rem(8)};
  width: ${rem(12)};
`;

const Spacing = styled.div`
  height: ${rem(20)};
`;

export const PollsPage: FC = () => {
  const navigate = useNavigate();
  const polls = useGetPolls();
  const loggedInUser = useGetAuth();
  const [pincode, setPincode] = useState<string>('');
  const getPoll = useGetPollWithMutate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getPoll.mutate(pincode);
  };

  if (!polls.isSuccess) {
    return <Spinner />;
  }

  const [ownedPolls, otherPolls] = filterOwnedPolls(
    polls.data,
    loggedInUser?.data?.user.id,
  );

  if (loggedInUser && loggedInUser?.data?.user.role === AccountRole.Admin) {
    return <AdminPage />;
  }

  return (
    <>
      {!loggedInUser ? (
        <Alert
          description="Log in to create and join private polls!"
          icon={<AlertCircle />}
          href={baseRoutes.login}
        />
      ) : null}
      {loggedInUser ? (
        <>
          <Heading>Join poll by pincode</Heading>
          <InputWrapper onSubmit={handleSubmit}>
            <Input
              type="number"
              placeholder="Enter pincode..."
              onChange={e => setPincode(e.target.value)}
              required
            />
          </InputWrapper>
        </>
      ) : null}
      {loggedInUser && (
        <>
          <HeadingAndButtonWrapper>
            <Heading>My polls</Heading>
            <CreatePollButton onClick={() => navigate(baseRoutes.createPoll)}>
              New poll
              <IconWrapper>
                <Plus />
              </IconWrapper>
            </CreatePollButton>
          </HeadingAndButtonWrapper>
          {loggedInUser && ownedPolls.length === 0 && (
            <Alert description="You have no polls!" icon={<AlertCircle />} />
          )}
          {ownedPolls.map(poll => {
            return (
              <Card
                title={poll.question}
                pincode={poll.pincode}
                optionOne={poll.optionOne}
                optionTwo={poll.optionTwo}
                counts={poll.counts}
                owner={poll.owner.name}
                endTime={poll.endTime}
                userAnswerProp={poll.userAnswer}
                isOwner
                onClick={() => navigate(`poll/${poll.pincode}/edit`)}
              />
            );
          })}
        </>
      )}

      {otherPolls.length > 0 && <Heading>Ongoing polls</Heading>}
      {otherPolls.map(poll => {
        return (
          <Card
            title={poll.question}
            pincode={poll.pincode}
            optionOne={poll.optionOne}
            optionTwo={poll.optionTwo}
            counts={poll.counts}
            owner={poll.owner.name}
            userAnswerProp={poll.userAnswer}
            endTime={poll.endTime}
            onClick={() => navigate(`poll/${poll.pincode}`)}
          />
        );
      })}
      <Spacing />
    </>
  );
};
