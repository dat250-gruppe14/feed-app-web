import { FC } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { useLocation, useNavigate } from 'react-router-dom';

import { colors } from 'src/styles/colors';
import { LOGIN_HEADER, mapRouteToHeaderTitle } from 'src/utils/utils';
import { Logo } from './svg/Logo';
import { HeaderUserButton } from './HeaderUserButton';
import { baseRoutes } from 'src/routes/baseRoutes';

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
  cursor: pointer;
`;

const TitleAndLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Header: FC = () => {
  const location = useLocation();
  const title = mapRouteToHeaderTitle(location.pathname);
  const navigate = useNavigate();

  return (
    <>
      <HeaderWrapper>
        <TitleAndLogoWrapper>
          <LogoWrapper onClick={() => navigate(baseRoutes.index)}>
            <Logo />
          </LogoWrapper>
          <HeaderTitle title={title}>{title}</HeaderTitle>
        </TitleAndLogoWrapper>
        {title !== LOGIN_HEADER && <HeaderUserButton />}
      </HeaderWrapper>
    </>
  );
};
