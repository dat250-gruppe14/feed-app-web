import { rem } from 'polished';
import React, { FC, useState } from 'react';
import { BackButton } from 'src/components/BackButton';
import { WideButton } from 'src/components/Button';
import { Input } from 'src/components/Input';
import { useCreatePoll } from 'src/hooks/poll.hooks';
import { colors } from 'src/styles/colors';
import { PollAccess } from 'src/types/types';
import { formatDate } from 'src/utils/utils';
import styled from 'styled-components';
import {
  ButtonsWrapper,
  InputAndLabelWrapper,
  Label,
} from '../AuthenticatePages/authenticatePages.style';

export const CheckboxAndLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${rem(20)};
`;

export const Checkbox = styled.input`
  background: ${colors.backgroundPrimary};
  border-color: ${colors.backgroundSecondary};
  margin-left: ${rem(20)};
`;

export const CreatePollPage: FC = () => {
  const now = new Date();
  const { mutate } = useCreatePoll();

  const [question, setQuestion] = useState('');
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [startTime, setStartTime] = useState<Date>(now);
  const [endTime, setEndTime] = useState<Date>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      question,
      optionOne,
      optionTwo,
      access: isPrivate ? PollAccess.Private : PollAccess.Public,
      startTime,
      endTime,
    });
  };

  return (
    <>
      <BackButton />
      <form onSubmit={handleSubmit}>
        <InputAndLabelWrapper>
          <Label htmlFor="question">Question:</Label>
          <Input
            id="question"
            type="text"
            placeholder="Enter question..."
            onChange={e => setQuestion(e.target.value)}
            required
          />
        </InputAndLabelWrapper>
        <InputAndLabelWrapper>
          <Label htmlFor="optionOne">Answer 1:</Label>
          <Input
            id="optionOne"
            type="text"
            placeholder="Enter answer..."
            onChange={e => setOptionOne(e.target.value)}
            required
          />
        </InputAndLabelWrapper>
        <InputAndLabelWrapper>
          <Label htmlFor="optionTwo">Answer 2:</Label>
          <Input
            id="optionTwo"
            type="text"
            placeholder="Enter answer..."
            onChange={e => setOptionTwo(e.target.value)}
            required
          />
        </InputAndLabelWrapper>
        <InputAndLabelWrapper>
          <Label htmlFor="startTime">Start time:</Label>
          <Input
            id="startTime"
            type="datetime-local"
            defaultValue={formatDate(startTime)}
            onChange={e => setStartTime(new Date(e.target.value))}
            required
          />
        </InputAndLabelWrapper>
        <InputAndLabelWrapper>
          <Label htmlFor="endTime">End time:</Label>
          <Input
            id="endTime"
            type="datetime-local"
            defaultValue={formatDate(endTime)}
            onChange={e => setEndTime(new Date(e.target.value))}
          />
        </InputAndLabelWrapper>
        <CheckboxAndLabelWrapper>
          <Label htmlFor="private">Private: </Label>
          <Checkbox
            id="private"
            type="checkbox"
            onChange={() => setIsPrivate(!isPrivate)}
          />
        </CheckboxAndLabelWrapper>
        <ButtonsWrapper>
          <WideButton type="submit">Save</WideButton>
        </ButtonsWrapper>
      </form>
    </>
  );
};
