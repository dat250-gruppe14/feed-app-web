import { rem } from 'polished';
import { Link } from 'react-router-dom';
import { baseRoutes } from 'src/routes/baseRoutes';
import styled from 'styled-components';
import { ArrowLeft } from './svg/ArrowLeft';

const BackButtonStyled = styled(Link)`
  display: flex;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: ${rem(20)};
`;

const ArrowWrapper = styled.div`
  margin-right: ${rem(8)};
  width: ${rem(22)};
`;

export const BackButton = () => (
  <BackButtonStyled to={baseRoutes.index}>
    <ArrowWrapper>
      <ArrowLeft />
    </ArrowWrapper>
    Back to polls
  </BackButtonStyled>
);
