import { rem } from 'polished';
import { FC } from 'react';
import styled, { css } from 'styled-components';

import { colors } from 'src/styles/colors';
import { Link } from 'react-router-dom';

const AlertWrapper = styled.div`
  align-items: center;
  background: ${colors.backgroundSecondary} !important;
  border-radius: ${rem(20)};
  display: flex;
  flex-direction: row;
  margin: ${rem(20)} 0;
  height: max-content;
  padding: ${rem(10)} ${rem(18)};
  width: 100%;
`;

const AlertIcon = styled.div`
  align-items: center;
  display: flex;
  width: ${rem(20)};
  margin-right: ${rem(12)};
`;

const AlertDescription = styled(Link)<{ isActive: boolean }>`
  font-size: ${rem(14)};
  font-weight: 700;
  text-decoration: none;
  cursor: none;

  ${({ isActive }) =>
    isActive &&
    css`
      text-decoration: underline;
      cursor: pointer;
    `}
`;

interface AlertProps {
  description: string;
  icon: JSX.Element;
  href?: string;
}

export const Alert: FC<AlertProps> = props => {
  const { description, icon, href = '' } = props;
  const isActive = href !== '';

  return (
    <AlertWrapper>
      <AlertIcon>{icon}</AlertIcon>
      <AlertDescription to={href} isActive={isActive}>
        {description}
      </AlertDescription>
    </AlertWrapper>
  );
};
