import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { Card } from 'src/components/Card';
import { useGetPoll, useGetPolls } from 'src/hooks/poll.hooks';
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

const Heading = styled.div`
  font-size: ${rem(24)};
  font-weight: 700;
`;

const CreatePollButton = styled(Button)`
  background: ${colors.blueish};
`;

const HeadingAndButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InputWrapper = styled.form`
  margin: ${rem(20)} 0;
`;

const IconWrapper = styled.div`
  margin-left: ${rem(8)};
  width: ${rem(12)};
`;

export const PollsPage: FC = () => {
  const navigate = useNavigate();
  const polls = useGetPolls();
  const [pincode, setPincode] = useState<string>('');
  const loggedInUser = useGetAuth();
  const poll = useGetPoll(pincode);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (poll.data) {
      navigate(`poll/${pincode}`);
    }
  };

  if (!polls.isSuccess) {
    return <Spinner />;
  }

  const [ownedPolls, otherPolls] = filterOwnedPolls(
    polls.data,
    loggedInUser?.data?.user.id,
  );

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
      <HeadingAndButtonWrapper>
        <Heading>My polls</Heading>
        <CreatePollButton onClick={() => navigate(baseRoutes.createPoll)}>
          New poll
          <IconWrapper>
            <Plus />
          </IconWrapper>
        </CreatePollButton>
      </HeadingAndButtonWrapper>
      {ownedPolls.map(poll => {
        return (
          <Card
            title={poll.question}
            pincode={poll.pincode}
            optionOne={poll.optionOne}
            optionTwo={poll.optionTwo}
            counts={poll.counts}
            isOwner
            onClick={() => navigate(`poll/${poll.pincode}/edit`)}
          />
        );
      })}

      {otherPolls.length > 0 && <Heading>Ongoing polls</Heading>}
      {otherPolls.map(poll => {
        return (
          <Card
            title={poll.question}
            pincode={poll.pincode}
            optionOne={poll.optionOne}
            optionTwo={poll.optionTwo}
            counts={poll.counts}
            onClick={() => navigate(`poll/${poll.pincode}`)}
          />
        );
      })}
    </>
  );
};
