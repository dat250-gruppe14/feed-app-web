import { FC } from 'react';
import styled, { css } from 'styled-components';
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
  font-size: ${rem(22)};
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
  font-size: ${rem(18)};
  font-weight: 700;
`;

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-top: ${rem(14)};
  width: 100%;
`;

const PollMeta = styled.div`
  background: rgba(0, 0, 0, 0.26);
  border-radius: ${rem(20)};
  padding: ${rem(4)} ${rem(14)};
`;

type VoteButtonProps = {
  disabled?: boolean;
  hidden?: boolean;
};

const VoteButton = styled(Button)<VoteButtonProps>`
  align-self: flex-end;
  background: ${colors.blueish};
  justify-self: flex-end;
  margin-left: ${rem(14)};
  height: ${rem(30)};
  font-size: ${rem(16)};
  padding: ${rem(14)};

  ${props =>
    props.disabled &&
    css`
      background: ${colors.green};
      pointer-events: none;
    `}

  ${props =>
    props.hidden &&
    css`
      visibility: hidden;
    `}
`;

const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-left: ${rem(5)};
  justify-content: center;
  width: ${rem(12)};
`;

const NavigationButton = styled(Button)`
  height: ${rem(30)};
  font-size: ${rem(16)};
  padding: 0 ${rem(10)};
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
  showVoteButton?: boolean;
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
  showVoteButton = false,
}) => {
  const timeLeft = getRemainingTime(endTime);
  const canVote =
    (userAnswer === undefined || userAnswer === null) && showVoteButton;
  const vote = useVotePoll();
  const votesCount = counts.optionOneCount + counts?.optionTwoCount;
  const showNavigationButton = onClick !== undefined;

  return (
    <CardWrapper>
      {title && <CardTitle>{title}</CardTitle>}
      <>
        <OptionWrapper>
          <OptionDescription>{optionOne}</OptionDescription>
          <ProgressWrapper>
            <Progress
              background={colors.green}
              value={counts.optionOneCount}
              total={votesCount}
            />
            {canVote && (
              <VoteButton
                onClick={() =>
                  vote.mutate({
                    optionSelected: PollOption.One,
                    pollPincode: pincode,
                  })
                }
              >
                Vote
              </VoteButton>
            )}
            {showVoteButton && userAnswer !== null && (
              <VoteButton hidden={userAnswer === PollOption.Two} disabled>
                Voted
              </VoteButton>
            )}
          </ProgressWrapper>
        </OptionWrapper>
        <OptionWrapper>
          <OptionDescription>{optionTwo}</OptionDescription>
          <ProgressWrapper>
            <Progress
              background={colors.red}
              value={counts.optionTwoCount}
              total={votesCount}
            />
            {canVote && (
              <VoteButton
                onClick={() =>
                  vote.mutate({
                    optionSelected: PollOption.Two,
                    pollPincode: pincode,
                  })
                }
              >
                Vote
              </VoteButton>
            )}
            {showVoteButton && userAnswer !== null && (
              <VoteButton hidden={userAnswer === PollOption.One} disabled>
                Voted
              </VoteButton>
            )}
          </ProgressWrapper>
        </OptionWrapper>
      </>
      <CardFooter>
        {timeLeft && <PollMeta>{timeLeft}</PollMeta>}
        {owner && <PollMeta>{`Asked by ${owner}`}</PollMeta>}
        {showNavigationButton && (
          <NavigationButton
            backgroundColor={isOwner ? colors.pink : colors.blueish}
            onClick={onClick}
          >
            {isOwner ? 'Edit' : 'Vote'}
            <IconWrapper>
              <ArrowRight />
            </IconWrapper>
          </NavigationButton>
        )}
      </CardFooter>
    </CardWrapper>
  );
};
