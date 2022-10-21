import { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';
import { PollOption } from 'src/types/types';

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

const OptionValue = styled.div`
  background-color: ${colors.backgroundTertiary};
  border-radius: ${rem(20)};
  margin-top: ${rem(4)};
`;

interface CardProps {
  title?: string;
  options?: PollOption[];
  endDate?: Date;
}

export const Card: FC<CardProps> = ({ title, options, endDate }) => {
  return (
    <CardWrapper>
      {title && <CardTitle>{title}</CardTitle>}
      {/* TODO: Implement progress bar to render option count ("progress") */}
      {/* {options &&
        options.map(option => {
          return (
            <OptionWrapper>
              <OptionDescription>{option.description}</OptionDescription>
              <OptionValue>{option.count}</OptionValue>
            </OptionWrapper>
          );
        })} */}
    </CardWrapper>
  );
};
