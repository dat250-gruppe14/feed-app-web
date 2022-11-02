import { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';
import { getRemainingTime } from 'src/utils/utils';
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
const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: row;
	width: 100%;

	div:first-child {
		margin-right: 20px;
	}
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
  showPollMeta?: boolean;
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
  showPollMeta = false,
}) => {
  const votesCount = optionOneCount + optionTwoCount;
  const timeLeft = getRemainingTime(endDate);
  const canVote = userAnswer === Answer.NONE;

  return (
    <CardWrapper>
      {title && <CardTitle>{title}</CardTitle>}
      <>
        <OptionWrapper>
          <OptionDescription>{optionOne}</OptionDescription>
					<ProgressWrapper>
						<Progress
							background={colors.green}
							value={optionOneCount}
							total={votesCount}
						/>
						{canVote && <VoteButton>Vote</VoteButton>}
					</ProgressWrapper>
        </OptionWrapper>
        <OptionWrapper>
          <OptionDescription>{optionTwo}</OptionDescription>
					<ProgressWrapper>
						<Progress
							background={colors.red}
							value={optionTwoCount}
							total={votesCount}
						/>
						{canVote && <VoteButton>Vote</VoteButton>}
					</ProgressWrapper>
        </OptionWrapper>
      </>
      <CardFooter>
        {timeLeft && (
          <PollMeta>
            {timeLeft}
          </PollMeta>
        )}
        {owner && showPollMeta && <PollMeta>{`Asked by ${owner}`}</PollMeta>}
        {/* ADD "GO TO POLL" / "EDIT POLL" button */}
      </CardFooter>
    </CardWrapper>
  );
};
