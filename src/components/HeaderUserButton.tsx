import { rem } from 'polished';
import { useRef, useState } from 'react';
import { useClickedOutsideCallback } from 'src/hooks/useClickedOutsideCallback';
import { colors } from 'src/styles/colors';
import styled, { css } from 'styled-components';
import { ArrowDown } from './svg/ArrowDown';
import { Person } from './svg/Person';
import { SignOut } from './svg/SignOut';

const UserButtonAndPopoverWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

interface PopoverProps {
  show?: boolean;
}

const Popover = styled.div<PopoverProps>`
  opacity: 1;
  visibility: visible;

  position: absolute;
  background-color: ${colors.backgroundSecondary};
  top: 45px;

  padding: ${rem(15)} ${rem(20)};
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  transform: translateY(0px);
  transition: opacity 0.3s, transform 0.3s, visibility 0.3s;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3));

  &::before {
    content: '';
    position: absolute;
    top: 0px;
    margin-top: -20px;
    left: 76%;
    border: solid 10px transparent;
    border-right-color: ${colors.backgroundSecondary};
    z-index: 1;
    transform: rotate(90deg);
  }

  ${props =>
    !props.show &&
    css`
      opacity: 0;
      visibility: hidden;
      transform: translateY(-20px);
    `}
`;

interface RotatableArrowWrapperProps {
  rotate?: boolean;
}

const RotatableArrowWrapper = styled.div<RotatableArrowWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.3s;

  ${props =>
    props.rotate &&
    css`
      transform: rotate(180deg);
    `}
`;

const UserButtonWrapper = styled.div`
  background-color: ${colors.backgroundSecondary};
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 60px;
  height: 30px;
  padding: 10px;

  cursor: pointer;
`;

const PopoverItem = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: ${rem(5)};
  }
`;

const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${rem(8)};
`;

const ItemText = styled.div`
  font-size: ${rem(18)};
  font-weight: 600;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const HeaderUserButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const ref = useRef(null);
  useClickedOutsideCallback(ref, () => setMenuOpen(false));

  return (
    <UserButtonAndPopoverWrapper ref={ref}>
      <UserButtonWrapper onClick={() => setMenuOpen(!menuOpen)}>
        <Person />
        <RotatableArrowWrapper rotate={menuOpen}>
          <ArrowDown />
        </RotatableArrowWrapper>
      </UserButtonWrapper>
      <Popover show={menuOpen}>
        <PopoverItem>
          <ItemIcon>
            <Person />
          </ItemIcon>
          <ItemText>Your profile</ItemText>
        </PopoverItem>
        <PopoverItem>
          <ItemIcon>
            <SignOut />
          </ItemIcon>
          <ItemText>Sign out</ItemText>
        </PopoverItem>
      </Popover>
    </UserButtonAndPopoverWrapper>
  );
};
