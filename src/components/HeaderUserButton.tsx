import { colors } from 'src/styles/colors';
import styled from 'styled-components';
import { ArrowDown } from './svg/ArrowDown';
import { Person } from './svg/Person';

const UserButtonWrapper = styled.div`
  background-color: ${colors.backgroundSecondary};
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 60px;
  height: 30px;
  padding: 10px;
`;

export const HeaderUserButton = () => {
  return (
    <UserButtonWrapper>
      <Person />
      <ArrowDown />
    </UserButtonWrapper>
  );
};
