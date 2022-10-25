import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { rem } from 'polished';
import { pathToRegexp } from 'path-to-regexp';

import { colors } from 'src/styles/colors';
import { getRemainingPollDays } from 'src/utils/utils';
import { Answer } from 'src/types/types';
import { Progress } from './Progress';
import { Button } from './Button';

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
  margin-top: ${rem(20)};
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
  optionOne: string;
  optionOneCount: number;
  optionTwo: string;
  optionTwoCount: number;
  endDate?: Date;
  owner?: string;
  userAnswer?: Answer;
}

export const Card: FC<CardProps> = ({
  title,
  optionOne,
  optionOneCount,
  optionTwo,
  optionTwoCount,
  endDate,
  owner,
  userAnswer,
}) => {
  const location = useLocation();
  const votesCount = optionOneCount + optionTwoCount;
  const daysLeft = getRemainingPollDays(endDate);
  const isVotePage = location.pathname.match(pathToRegexp('/vote'));
  const canVote = userAnswer !== undefined;

  return (
    <CardWrapper>
      {title && <CardTitle>{title}</CardTitle>}
      <>
        <OptionWrapper>
          <OptionDescription>{optionOne}</OptionDescription>
          <Progress
            background={colors.green}
            value={optionOneCount}
            total={votesCount}
          />
          {canVote && <VoteButton />}
        </OptionWrapper>
        <OptionWrapper>
          <OptionDescription>{optionTwo}</OptionDescription>
          <Progress
            background={colors.red}
            value={optionTwoCount}
            total={votesCount}
          />
          {canVote && <VoteButton />}
        </OptionWrapper>
      </>
      <CardFooter>
        {daysLeft && (
          <PollMeta>
            {daysLeft === 1 ? `${daysLeft} day left` : `${daysLeft} days left`}
          </PollMeta>
        )}
        {owner && isVotePage && <PollMeta>{`Asked by ${owner}`}</PollMeta>}
        {/* ADD "GO TO POLL" / "EDIT POLL" button */}
      </CardFooter>
    </CardWrapper>
  );
};
