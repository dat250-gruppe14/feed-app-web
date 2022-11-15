import { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';
import { calculatePercentage } from 'src/utils/utils';
import { MiniSpinner } from './Spinner';

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
  isLoading?: boolean;
  showResults?: boolean;
};

const BarAnimating = styled.div<BarProps>`
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
  transition: max-width 0.2s;
  animation: none;

  ${props =>
    !props.showResults &&
    css`
      animation: moveRightAndLeft 2s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: ease-in-out;
    `}

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
`;

const BarResult = styled.div<BarProps>`
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
  transition: max-width 0.5s;
`;

interface ProgressBarProps {
  value: string;
  total: number;
  background: string;
  barNr: number;
  showResult: boolean;
  isLoading?: boolean;
}

export const Progress: FC<ProgressBarProps> = ({
  value,
  total,
  background,
  barNr,
  showResult,
  isLoading,
}) => {
  const percentageValue = Math.round(calculatePercentage(Number(value), total));

  const [percentage, setPercentage] = useState(50);
  const [valueText, setValueText] = useState('?');

  useEffect(() => {
    if (showResult) {
      setTimeout(() => {
        setPercentage(percentageValue);
      }, 10);
      setTimeout(() => {
        setValueText(value);
      }, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentageValue, showResult]);

  return (
    <ProgressBarWrapper>
      {!isLoading && !showResult ? (
        <BarAnimating
          percentage={percentageValue}
          background={background}
          barNr={barNr}
          isLoading={isLoading}
          showResults={showResult}
        >
          {`${showResult ? value : '?'}`}
        </BarAnimating>
      ) : (
        <BarResult
          percentage={percentage}
          background={background}
          barNr={barNr}
          isLoading={isLoading}
          showResults={showResult}
        >
          {!isLoading ? valueText : <MiniSpinner />}
        </BarResult>
      )}
    </ProgressBarWrapper>
  );
};
