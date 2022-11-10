import React, { FC, InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: ${colors.backgroundSecondary} !important;
  border-radius: ${rem(20)};
`;

const StyledInput = styled.input`
  background: inherit;
  border-radius: inherit;
  border: none;
  flex: 1;
  height: ${rem(50)};
  padding: ${rem(12)};
  width: 100%;
  font-size: ${rem(18)};
`;

const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-right: ${rem(12)};
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
}

export const Input: FC<InputProps> = ({ type, placeholder, icon, ...rest }) => {
  return (
    <InputWrapper>
      <StyledInput
        type={type || 'text'}
        placeholder={placeholder || 'Enter...'}
        {...rest}
      />
      {icon && <IconWrapper>{icon}</IconWrapper>}
    </InputWrapper>
  );
};
