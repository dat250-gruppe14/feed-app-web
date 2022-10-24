import React, { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { colors } from 'src/styles/colors';


interface props {
  onClick: () => void;
  children?: React.ReactNode;
}


const ButtonStyled = styled.button`
  font_size: ${rem(4)};
  border-radius: ${rem(10)};
  padding: ${rem(6)};
  background-color: ${colors.silver};
  color: ${colors.black};
  width: fit-content;
  
  text-align: center;
  vertical-align: middle;
  
`;

export const Button: FC<props> = ({
  onClick,
  children

}) => {
  return <ButtonStyled 
        onClick = {onClick}
        >
          {children}
          
          </ButtonStyled>;
};




