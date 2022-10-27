import React, { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { Card } from 'src/components/Card';
import { useGetPoll, useGetPolls } from 'src/hooks/poll.hooks';
import { Input } from 'src/components/Input';

const Heading = styled.div`
  font-size: ${rem(24)};
  font-weight: 700;
`;

export const PollsPage: FC = () => {
  const now = new Date();
  const polls = useGetPolls();

  let ownedPolls;
  let ongoingPolls;

  if (polls.data !== undefined) {
    ownedPolls = polls.data.filter(poll => poll.owner.name !== '');
    ongoingPolls = polls.data.filter(
      poll => (poll.endTime && poll.endTime > now) || !poll.endTime,
    );
  }

  return (
    <>
      <Heading>Join poll by pincode</Heading>
      <Input type="number" placeholder="Enter pincode..." />
      <Heading>Owned polls</Heading>
      {polls.data?.map(poll => {
        return (
          <Card
            title={poll.question}
            optionOne={poll.optionOne}
            optionTwo={poll.optionTwo}
            counts={poll.counts}
          />
        );
      })}
      <Heading>Ongoing polls</Heading>
      {polls.data?.map(poll => {
        return (
          <Card
            title={poll.question}
            optionOne={poll.optionOne}
            optionTwo={poll.optionTwo}
            counts={poll.counts}
          />
        );
      })}
    </>
  );
};
