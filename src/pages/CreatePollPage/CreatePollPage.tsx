import { rem } from 'polished';
import React, { FC, useState } from 'react';
import { Button } from 'src/components/Button';
import { Input } from 'src/components/Input';
import { useCreatePoll } from 'src/hooks/poll.hooks';
import { colors } from 'src/styles/colors';
import { PollAccess } from 'src/types/types';
import styled from 'styled-components';
import {
  ButtonsWrapper,
  InputAndLabelWrapper,
  Label,
} from '../AuthenticatePages/authenticatePages.style';

const CheckboxAndLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${rem(20)};
`;

const Checkbox = styled.input`
  background: ${colors.backgroundPrimary};
  border-color: ${colors.backgroundSecondary};
  margin-left: ${rem(20)};
`;

export const CreatePollPage: FC = () => {
  const { mutate } = useCreatePoll();
  const now = new Date();

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
            defaultValue={startTime.toISOString().slice(0, -8)}
            onChange={e => setStartTime(new Date(e.target.value))}
            required
          />
        </InputAndLabelWrapper>
        <InputAndLabelWrapper>
          <Label htmlFor="endTime">End time:</Label>
          <Input
            id="endTime"
            type="datetime-local"
            defaultValue={endTime?.toISOString().slice(0, -8)}
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
          <Button type="submit">Save</Button>
        </ButtonsWrapper>
      </form>
    </>
  );
};
