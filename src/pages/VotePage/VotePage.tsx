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

  if (!polls.isSuccess) {
    return <>loading...</>;
  }

  return (
    <>
      <BackButton to={baseRoutes.index}>
        <ArrowWrapper>
          <ArrowLeft />
        </ArrowWrapper>
        Back to polls
      </BackButton>
      <Card
        title={poll.question}
        counts={poll.counts}
        optionOne={poll.optionOne}
        optionTwo={poll.optionTwo}
        owner={poll.owner.name}
        userAnswer={poll.userAnswer}
        endTime={poll.endTime}
        showPollMeta
        pincode={poll.pincode}
      />
      <CopyToClipboardButton label="Pincode" value={poll.pincode} />
    </>
  );
};
