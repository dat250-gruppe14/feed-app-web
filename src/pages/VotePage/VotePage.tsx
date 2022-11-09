import { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Link } from 'react-router-dom';

import { Card } from 'src/components/Card';
import { ArrowLeft } from 'src/components/svg/ArrowLeft';
import { AccountRole, Poll, PollAccess } from 'src/types/types';
import { baseRoutes } from 'src/routes/baseRoutes';
import { CopyToClipboardButton } from 'src/components/CopyButton';
import { useGetPolls } from 'src/hooks/poll.hooks';
import { Alert } from 'src/components/Alert';
import { AlertTriangle } from 'src/components/svg/AlertTriangle';

const BackButton = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const ArrowWrapper = styled.div`
  margin-right: ${rem(5)};
  width: ${rem(22)};
`;

const PollMock: Poll = {
  id: '123456',
  question: 'Ananas pao pizza',
  optionOne: 'Nei',
  optionTwo: 'Ja',
  owner: {
    id: '123',
    name: 'Testbert',
    email: 'email@email.com',
    role: AccountRole.User,
  },
  counts: {
    optionOneCount: 100,
    optionTwoCount: 200,
  },
  startTime: new Date('2022-10-27'),
  endTime: new Date('2022-11-27'),
  access: PollAccess.Public,
  userAnswer: undefined,
  pincode: '1234',
  createdTime: new Date('2022-10-27'),
};

export const VotePage: FC = () => {
  const poll = PollMock;
  const polls = useGetPolls();
  const now = new Date();

  if (!polls.isSuccess) {
    return <>loading...</>;
  }

  const hasPollStarted = poll.startTime > now;
  const hasPollExpired = poll.endTime && poll.endTime < now;

  const showPollAlert = !hasPollStarted || hasPollExpired;

  return (
    <>
      <BackButton to={baseRoutes.index}>
        <ArrowWrapper>
          <ArrowLeft />
        </ArrowWrapper>
        Back to polls
      </BackButton>
      {showPollAlert ? (
        <Alert 
          icon={<AlertTriangle />}
          description={`This poll has ${hasPollExpired ? 'expired' : 'not started'}!`}
        />
      ) : null}
      <Card
        title={poll.question}
        counts={poll.counts}
        optionOne={poll.optionOne}
        optionTwo={poll.optionTwo}
        owner={poll.owner.name}
        userAnswer={poll.userAnswer}
        endTime={poll.endTime}
        pincode={poll.pincode}
      />
      <CopyToClipboardButton label="Pincode" value={poll.pincode} />
    </>
  );
};
