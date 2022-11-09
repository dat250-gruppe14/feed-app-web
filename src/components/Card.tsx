import { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';
import { getRemainingTime } from 'src/utils/utils';
import { PollOption, PollCounts } from 'src/types/types';
import { useVotePoll } from 'src/hooks/poll.hooks';
import { Progress } from './Progress';
import { Button } from './Button';
import { ArrowRight } from './svg/ArrowRight';

const CardWrapper = styled.div`
  background: ${colors.backgroundSecondary} !important;
  border-radius: ${rem(20)};
  display: flex;
  flex-direction: column;
  margin: ${rem(20)} 0;
  height: max-content;
  padding: ${rem(16)};
  width: 100%;
`;

const CardTitle = styled.div`
  font-style: normal;
  font-size: ${rem(20)};
  font-weight: 700;
  line-height: ${rem(32)};
  margin-bottom: ${rem(16)};
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${rem(12)};
`;

const OptionDescription = styled.p`
  font-size: ${rem(14)};
  font-weight: 700;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${rem(20)};
`;

const PollMeta = styled.div`
  background: rgba(0, 0, 0, 0.26);
  border-radius: ${rem(20)};
  padding: ${rem(4)} ${rem(14)};
`;

const VoteButton = styled(Button)`
  align-self: flex-end;
  background: ${colors.blueish};
  justify-self: flex-end;
`;

interface CardProps {
  title?: string;
  pincode: string;
  optionOne: string;
  optionTwo: string;
  counts: PollCounts;
  endTime?: Date;
  owner?: string;
  userAnswer?: PollOption;
  isOwner?: boolean;
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({
  title,
  pincode,
  optionOne,
  optionTwo,
  counts,
  endTime,
  owner,
  userAnswer,
  isOwner,
  onClick,
}) => {
  const timeLeft = getRemainingTime(endTime);
  const canVote = userAnswer === undefined;
  const { mutate } = useVotePoll();
  const votesCount = counts.optionOneCount + counts?.optionTwoCount;
  const showNavigationButton = isOwner && onClick;

  return (
    <CardWrapper>
      {title && <CardTitle>{title}</CardTitle>}
      <>
        <OptionWrapper>
          <OptionDescription>{optionOne}</OptionDescription>
          <Progress
            background={colors.green}
            value={counts.optionOneCount}
            total={votesCount}
          />
          {canVote && (
            <VoteButton
              onClick={() =>
                mutate({
                  option: PollOption.One,
                  pollId: pincode,
                })
              }
            >
              Vote
            </VoteButton>
          )}
        </OptionWrapper>
        <OptionWrapper>
          <OptionDescription>{optionTwo}</OptionDescription>
          <Progress
            background={colors.red}
            value={counts.optionTwoCount}
            total={votesCount}
          />
          {canVote && (
            <VoteButton
              onClick={() =>
                mutate({
                  option: PollOption.Two,
                  pollId: pincode,
                })
              }
            >
              Vote
            </VoteButton>
          )}
        </OptionWrapper>
      </>
      <CardFooter>
        {timeLeft && <PollMeta>{timeLeft}</PollMeta>}
        {owner && <PollMeta>{`Asked by ${owner}`}</PollMeta>}
        {showNavigationButton && (
          <Button
            onClick={onClick}
          >
            {isOwner ? 'Edit' : 'Vote'}
            <ArrowRight />
          </Button>
        )}
      </CardFooter>
    </CardWrapper>
  );
};
