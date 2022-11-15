import { rem } from 'polished';
import React, { FC } from 'react';
import { colors } from 'src/styles/colors';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: ${rem(100)};
`;

export const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: 0px 0 0 0px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: ${colors.blueish};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const Spinner: FC = () => (
  <SpinnerWrapper>
    <StyledSpinner viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    </StyledSpinner>
  </SpinnerWrapper>
);

const MiniSpinnerStyled = styled(StyledSpinner)`
  width: 25px;
  height: 25px;

  & .path {
    stroke: ${colors.white};
  }
`;

export const MiniSpinner: FC = () => (
  <MiniSpinnerStyled viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </MiniSpinnerStyled>
);
