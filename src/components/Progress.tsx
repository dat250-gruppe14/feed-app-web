import { FC } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';
import { calculatePercentage } from 'src/utils/utils';

const ProgressBarWrapper = styled.div`
  background: ${colors.backgroundTertiary};
  border-radius: ${rem(20)};
  margin-top: ${rem(4)};
  width: 100%;
`;

type BarProps = {
  percentage: number;
  background: string;
  barNr: number;
  hideAnswers?: boolean;
};

const Bar = styled.div<BarProps>`
  display: flex;
  background: ${({ background }) => background};
  border-radius: inherit;
  box-shadow: ${rem(4)} ${rem(0)} ${rem(10)} rgba(0, 0, 0, 0.25);
  color: ${colors.backgroundSecondary};
  font-size: ${rem(16)};
  font-weight: 700;
  justify-content: flex-end;
  align-items: center;
  max-width: ${({ percentage }) => percentage}%;
  min-width: fit-content;
  padding: 0 ${rem(12)} 0 ${rem(12)};
  height: ${rem(30)};

  animation: moveRightAndLeft 2s;
  animation-iteration-count: ${props => (props.hideAnswers ? 'infinite' : 0)};
  animation-direction: alternate;
  animation-timing-function: ease-in-out;

  ${props =>
    props.barNr === 2 &&
    css`
      animation-direction: alternate-reverse;
    `}

  @keyframes moveRightAndLeft {
    from {
      max-width: 48%;
    }
    to {
      max-width: 52%;
    }
  }

  transition: max-width 0.2s;
`;

interface ProgressBarProps {
  value: string;
  total: number;
  background: string;
  barNr: number;
  hasVoted: boolean;
}

export const Progress: FC<ProgressBarProps> = ({
  value,
  total,
  background,
  barNr,
  hasVoted,
}) => {
  const percentageValue = Math.round(calculatePercentage(Number(value), total));

  return (
    <ProgressBarWrapper>
      <Bar
        percentage={percentageValue}
        background={background}
        hideAnswers={!hasVoted}
        barNr={barNr}
      >
        {`${value}`}
      </Bar>
    </ProgressBarWrapper>
  );
};
