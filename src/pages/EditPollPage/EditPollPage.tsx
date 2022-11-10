import { rem } from 'polished';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from 'src/components/BackButton';
import { Button, WideButton } from 'src/components/Button';
import { CopyToClipboardButton } from 'src/components/CopyButton';
import { Input } from 'src/components/Input';
import { useDeletePoll, usePatchPoll } from 'src/hooks/poll.hooks';
import { colors } from 'src/styles/colors';
import { PollAccess, PollPatchOption } from 'src/types/types';
import { formatDate } from 'src/utils/utils';
import styled from 'styled-components';
import {
  ButtonsWrapper,
  InputAndLabelWrapper,
  Label,
} from '../AuthenticatePages/authenticatePages.style';
import {
  Checkbox,
  CheckboxAndLabelWrapper,
} from '../CreatePollPage/CreatePollPage';

const DeleteButton = styled(Button)`
  background-color: ${colors.red};
  margin-top: ${rem(20)};
  height: ${rem(30)};
  font-size: ${rem(16)};
`;

export const EditPollPage: FC = () => {
  const params = useParams();
  const { mutate: patchPoll } = usePatchPoll();
  const { mutate: deletePoll } = useDeletePoll();

  const [isPrivate, setIsPrivate] = useState<boolean>();
  const [endTime, setEndTime] = useState<Date>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = [];
    const formattedEndTime = formatDate(endTime);

    if (isPrivate !== undefined) {
      request.push({
        op: 'replace',
        value: isPrivate ? PollAccess.Private : PollAccess.Public,
        path: PollPatchOption.Access,
      });
    }

    if (endTime && formattedEndTime) {
      request.push({
        op: 'replace',
        value: formattedEndTime,
        path: PollPatchOption.EndDate,
      });
    }

    patchPoll(request);
  };

  const handleDelete = () => {
    if (params.id) {
      deletePoll(params.id);
    }
  };

  return (
    <>
      <BackButton />
      <CopyToClipboardButton label="Pincode" value={params.id ?? ''} />
      <form onSubmit={handleSubmit}>
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
          <Label htmlFor="private">Private:</Label>
          <Checkbox
            id="private"
            type="checkbox"
            onChange={() => setIsPrivate(!isPrivate)}
          />
        </CheckboxAndLabelWrapper>
        <ButtonsWrapper>
          <WideButton type="submit">Save</WideButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </ButtonsWrapper>
      </form>
    </>
  );
};
