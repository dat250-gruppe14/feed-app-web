import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

interface props {
  onClick: () => void;
  textColor?: string;
  backgroundColor?: string;
}

const ButtonStyled = styled.button<props>`
  font_size: ${rem(4)};
  border-radius: ${rem(20)};
  padding: ${rem(6)};
  ${props =>
    css`
      color: ${props.textColor};
      background-color: ${props.backgroundColor};
    `}

  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.25);
  width: fit-content;

  text-align: center;
  vertical-align: middle;
`;

export const Button: FC<props> = ({
  onClick,
  children,
  textColor,
  backgroundColor,
}) => {
  return (
    <ButtonStyled
      textColor={textColor}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  );
};

/**
 * <Button onClick = {() => console.log('Button clicked')} 
            children = 'Click&#8594;' 
            textColor={colors.white}
            backgroundColor = {colors.pink}/>
 */
