import { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';
import { getRemainingPollDays } from 'src/utils/utils';
import { Progress } from './Progress';

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

const Expiration = styled.div`
  background: rgba(0, 0, 0, 0.26);
  border-radius: ${rem(20)};
  padding: ${rem(4)} ${rem(14)};
`;

interface CardProps {
  title?: string;
  optionOne: string;
  optionOneCount: number;
  optionTwo: string;
  optionTwoCount: number;
  endDate?: Date;
}

export const Card: FC<CardProps> = ({
  title,
  optionOne,
  optionOneCount,
  optionTwo,
  optionTwoCount,
  endDate,
}) => {
  const votesCount = optionOneCount + optionTwoCount;
  const daysLeft = getRemainingPollDays(endDate);

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
        </OptionWrapper>
        <OptionWrapper>
          <OptionDescription>{optionTwo}</OptionDescription>
          <Progress
            background={colors.red}
            value={optionTwoCount}
            total={votesCount}
          />
        </OptionWrapper>
      </>
      <CardFooter>
        {daysLeft && (
          <Expiration>{daysLeft === 1 
            ? `${daysLeft} day left`
            : `${daysLeft} days left`
          }</Expiration>
        )}
        {/* ADD "GO TO POLL" button */}
      </CardFooter>
    </CardWrapper>
  );
};
