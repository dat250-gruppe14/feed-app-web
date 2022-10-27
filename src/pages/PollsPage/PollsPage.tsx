import React, { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { Card } from 'src/components/Card';
import { useGetPolls } from 'src/hooks/poll.hooks';
import { Input } from 'src/components/Input';
import { AccountRole, Poll, PollAccess } from 'src/types/types';

const Heading = styled.div`
  font-size: ${rem(24)};
  font-weight: 700;
`;

export const PollsPage: FC = () => {
  const now = new Date();
  const { isLoading, isError, data } = useGetPolls();

  // if (isLoading) {
  //   return null;
  // }

  // if (isError) {
  //   return null;
  // }

  // const ownedPolls = data.filter(poll => poll.owner.name === '');
  // const ongoingPolls = data.filter(poll => !poll.endTime || poll.endTime > now);

  const mockOwned: Poll[] = [
    {
      id: '1',
      pincode: '123321',
      question: 'Ananas på pizza?',
      optionOne: 'Ja',
      optionTwo: 'Nei',
      counts: {
        optionOneCount: 10,
        optionTwoCount: 20,
      },
      owner: {
        id: '1',
        name: 'Lars',
        role: AccountRole.User,
      },
      startTime: now,
      endTime: new Date(now.setDate(now.getDate() + 2)),
      createdTime: new Date(now.setDate(now.getDate() - 2)),
      access: PollAccess.Public,
    },
  ];

  const mockOngoing: Poll[] = [
    {
      id: '1',
      pincode: '123456',
      question: 'Tomaito eller tomato?',
      optionOne: 'Tomaito',
      optionTwo: 'Tomato',
      counts: {
        optionOneCount: 23,
        optionTwoCount: 19,
      },
      owner: {
        id: '2',
        name: 'Tim',
        role: AccountRole.User,
      },
      startTime: now,
      createdTime: new Date(now.setDate(now.getDate() - 2)),
      access: PollAccess.Public,
    },
    {
      id: '3',
      pincode: '123123',
      question: 'Sommer eller vinter?',
      optionOne: 'Sommer :)',
      optionTwo: 'Vinter! *brr*',
      counts: {
        optionOneCount: 16,
        optionTwoCount: 16,
      },
      owner: {
        id: '',
        name: '',
        role: AccountRole.User,
      },
      startTime: now,
      createdTime: new Date(now.setDate(now.getDate() - 2)),
      access: PollAccess.Public,
    },
  ];

  return (
    <>
      <Heading>Join poll by pincode</Heading>
      <Input type="number" placeholder="Enter pincode..." />
      <Heading>Owned polls</Heading>
      {mockOwned.map(poll => {
        return (
          <Card
            title={poll.question}
            pincode={poll.pincode}
            optionOne={poll.optionOne}
            optionTwo={poll.optionTwo}
            counts={poll.counts}
          />
        );
      })}
      <Heading>Ongoing polls</Heading>
      {mockOngoing.map(poll => {
        return (
          <Card
            title={poll.question}
            pincode={poll.pincode}
            optionOne={poll.optionOne}
            optionTwo={poll.optionTwo}
            counts={poll.counts}
          />
        );
      })}
    </>
  );
};
