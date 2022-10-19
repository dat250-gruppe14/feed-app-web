import { FC } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { useLocation } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';

import { colors } from 'src/styles/colors';
import { Logo } from './svg/Logo';
import { HeaderUserButton } from './HeaderUserButton';

const LOGIN_HEADER = 'FEEDAPP';

const HeaderWrapper = styled.div`
  margin: ${rem(40)} 0 ${rem(20)} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${rem(40)};
`;

interface HeaderTitleProps {
  title?: string;
}

const HeaderTitle = styled.div<HeaderTitleProps>`
  color: ${colors.white};
  font-size: ${rem(42)};
  font-weight: 700;

  ${props =>
    props.title === LOGIN_HEADER &&
    css`
      color: ${colors.purpleText};
      font-size: ${rem(24)};
    `}
`;

const LogoWrapper = styled.div`
  margin-right: ${rem(8)};
  display: flex;
  align-items: center;
`;

const TitleAndLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Header: FC = () => {
  const location = useLocation();

  // TODO: Move to utils
  // TODO: Change routes to constants
  const mapRouteToTitle = (path: string) => {
    if (path.match(pathToRegexp('/'))) return 'Polls';
    if (path.match(pathToRegexp('/poll/create'))) return 'New poll';
    if (path.match(pathToRegexp('/poll/edit'))) return 'Edit poll';
    if (path.match(pathToRegexp('/poll/:id'))) return 'Vote';
    if (path.match(pathToRegexp('/profile'))) return 'Profile';
    if (path.match(pathToRegexp('/login'))) return LOGIN_HEADER;
    if (path.match(pathToRegexp('/register'))) return LOGIN_HEADER;
    return '';
  };

  const title = mapRouteToTitle(location.pathname);

  return (
    <HeaderWrapper>
      <TitleAndLogoWrapper>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <HeaderTitle title={title}>{title}</HeaderTitle>
      </TitleAndLogoWrapper>
      {title !== LOGIN_HEADER && <HeaderUserButton />}
    </HeaderWrapper>
  );
};
