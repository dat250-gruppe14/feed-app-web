import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: ${colors.backgroundSecondary} !important;
  border-radius: ${rem(10)};
  margin: ${rem(20)} 0;
`;

const StyledInput = styled.input`
  background: inherit;
  border-radius: inherit;
  border: none;
  flex: 1;
  height: max-content;
  padding: ${rem(12)};
  width: 100%;
`;

const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-right: ${rem(12)};
`;

interface InputProps {
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
}

export const Input: FC<InputProps> = ({
  type,
  placeholder,
  icon
}) => {
  const [input, setInput] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value)
  }

  return (
    <InputWrapper>
      <StyledInput
        type={type || "text"}
        placeholder={placeholder || "Enter..."}
        onChange={handleChange}
        value={input}
      />
      {icon && <IconWrapper>{icon}</IconWrapper>}
    </InputWrapper>
  );
}
