import React, { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { colors } from 'src/styles/colors';

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  textColor?: string;
  backgroundColor?: string;
  className?: string;
}

const ButtonStyled = styled.button<props>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: ${rem(20)};
  font-weight: bold;

  border: none;
  border-radius: ${rem(20)};

  padding: ${rem(6)} ${rem(30)};
  width: fit-content;
  height: ${rem(40)};

  ${props =>
    css`
      color: ${props.textColor};
      background-color: ${props.backgroundColor};
    `}

  box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.25);

  &:active {
    filter: brightness(85%);
  }
`;

export const Button: FC<props> = ({
  children,
  textColor = colors.white,
  backgroundColor = colors.blueish,
  className,
  ...rest
}) => {
  return (
    <ButtonStyled
      textColor={textColor}
      backgroundColor={backgroundColor}
      className={className}
      {...rest}
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
