import { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';
import { getLocalPollVote, getRemainingTime } from 'src/utils/utils';
import { PollOption, PollCounts } from 'src/types/types';
import { useVotePoll, useDeletePoll } from 'src/hooks/poll.hooks';
import { useGetAuth } from 'src/hooks/auth.hooks';
import { Progress } from './Progress';
import { Button } from './Button';
import { ArrowRight } from './svg/ArrowRight';

export const CardWrapper = styled.div`
  background: ${colors.backgroundSecondary} !important;
  border-radius: ${rem(20)};
  display: flex;
  flex-direction: column;
  margin: ${rem(20)} 0;
  height: max-content;
  padding: ${rem(16)};
  width: 100%;
`;

export const CardTitle = styled.div`
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
  justify-content: space-between;
  padding-top: ${rem(14)};
  width: 100%;
`;

const LabelsWrapper = styled.div`
  display: flex;
`;

const PollMeta = styled.div`
  background: rgba(0, 0, 0, 0.26);
  border-radius: ${rem(20)};
  padding: ${rem(4)} ${rem(14)};

  &:not(last-of-type) {
    margin-right: ${rem(8)};
  }
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
  min-width: ${rem(75)};

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
  userAnswerProp?: PollOption;
  isOwner?: boolean;
  onClick?: () => void;
  showVoteButton?: boolean;
  adminCard?: boolean;
}

export const Card: FC<CardProps> = ({
  title,
  pincode,
  optionOne,
  optionTwo,
  counts,
  endTime,
  owner,
  userAnswerProp,
  isOwner,
  onClick,
  showVoteButton = false,
  adminCard = false,
}) => {
  const [userAnswer, setUserAnswer] = useState<PollOption | undefined | null>(
    userAnswerProp,
  );

  const now = new Date();
  const user = useGetAuth();
  const deletePoll = useDeletePoll();
  const vote = useVotePoll();

  const votesCount = counts.optionOneCount + counts?.optionTwoCount;
  const timeLeft = getRemainingTime(endTime);

  const isLoggedIn = user?.data !== undefined;
  const hasVoted = userAnswer !== null && userAnswer !== undefined;
  const isPollActive = !endTime || new Date(endTime) > now;
  const canVote =
    (userAnswer === undefined || userAnswer === null) &&
    showVoteButton &&
    isPollActive;

  const showNavigationButton = onClick !== undefined;
  const showPollResult = isOwner || hasVoted || !isPollActive;

  useEffect(() => {
    if (!isLoggedIn) {
      setUserAnswer(getLocalPollVote(pincode)?.optionSelected);
    } else {
      setUserAnswer(userAnswerProp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counts, userAnswerProp]);

  return (
    <CardWrapper>
      {title && <CardTitle>{title}</CardTitle>}
      <>
        <OptionWrapper>
          <OptionDescription>{optionOne}</OptionDescription>
          <ProgressWrapper>
            <Progress
              background={colors.green}
              value={counts.optionOneCount.toString()}
              total={votesCount}
              barNr={1}
              showResult={showPollResult}
              isLoading={vote.isLoading}
            />
            {canVote && (
              <VoteButton
                onClick={() =>
                  vote.mutate({
                    optionSelected: PollOption.One,
                    pollPincode: pincode,
                  })
                }
                hidden={vote.isLoading}
              >
                Vote
              </VoteButton>
            )}
            {showVoteButton && userAnswer !== null && userAnswer !== undefined && (
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
              value={counts.optionTwoCount.toString()}
              total={votesCount}
              showResult={showPollResult}
              barNr={2}
              isLoading={vote.isLoading}
            />
            {canVote && (
              <VoteButton
                onClick={() =>
                  vote.mutate({
                    optionSelected: PollOption.Two,
                    pollPincode: pincode,
                  })
                }
                hidden={vote.isLoading}
              >
                Vote
              </VoteButton>
            )}
            {showVoteButton && userAnswer !== null && userAnswer !== undefined && (
              <VoteButton hidden={userAnswer === PollOption.One} disabled>
                Voted
              </VoteButton>
            )}
          </ProgressWrapper>
        </OptionWrapper>
      </>

      {adminCard ? (
        <CardFooter>
          <NavigationButton
            style={{
              backgroundColor: colors.red,
            }}
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-alert
              const ok = window.confirm(
                `Are you sure you want to delete the poll '${title}'?`,
              );
              if (ok) {
                deletePoll.mutate(pincode);
              }
            }}
          >
            Delete poll
          </NavigationButton>
        </CardFooter>
      ) : (
        <CardFooter>
          <LabelsWrapper>
            {timeLeft && <PollMeta>{timeLeft}</PollMeta>}
            {owner && showVoteButton && (
              <PollMeta>{`Asked by ${owner}`}</PollMeta>
            )}
          </LabelsWrapper>
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
      )}
    </CardWrapper>
  );
};
