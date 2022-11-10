import { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';
import { calculatePercentage } from 'src/utils/utils';

const ProgressBarWrapper = styled.div`
  background: ${colors.backgroundTertiary};
  border-radius: ${rem(20)};
  margin-top: ${rem(4)};
  width: 100%;
`;

const Bar = styled.div<{ percentage: number; background: string }>`
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
`;

interface ProgressBarProps {
  value: number;
  total: number;
  background: string;
}

export const Progress: FC<ProgressBarProps> = ({
  value,
  total,
  background,
}) => {
  const percentageValue = Math.round(calculatePercentage(value, total));

  return (
    <ProgressBarWrapper>
      <Bar percentage={percentageValue} background={background}>
        {`${percentageValue}%`}
      </Bar>
    </ProgressBarWrapper>
  );
};
