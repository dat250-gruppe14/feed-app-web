import { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';
import { Skeleton } from './Skeleton';

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

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SkeletonCard: FC = () => {
  return (
    <CardWrapper>
      <CardTitle>
        <Skeleton width={50} />
      </CardTitle>
      <>
        <OptionWrapper>
          <OptionDescription>
            <Skeleton width={20} />
          </OptionDescription>
          <ProgressWrapper>
            <Skeleton />
          </ProgressWrapper>
        </OptionWrapper>
        <OptionWrapper>
          <OptionDescription>
            <Skeleton width={18}/>
          </OptionDescription>
          <ProgressWrapper>
            <Skeleton />
          </ProgressWrapper>
        </OptionWrapper>
      </>
    </CardWrapper>
  );
};
