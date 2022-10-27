import { rem } from 'polished';
import { colors } from 'src/styles/colors';
import styled, { css, keyframes } from 'styled-components';

const pulse = keyframes`
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
`;

const SkeletonPulse = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  background: ${colors.backgroundTertiary};
  animation: ${pulse} 1s infinite alternate;
`;

interface SkeletonProps {
  width?: number;
}

export const Skeleton = styled(SkeletonPulse)<SkeletonProps>`
  width: 100%;
  border-radius: ${rem(20)};

  ${(props) => css`
    width: ${props.width ? props.width : 100}%;
  `}
  
  &::before {
    content: "\\00a0";
  }
  overflow: hidden;
`;

