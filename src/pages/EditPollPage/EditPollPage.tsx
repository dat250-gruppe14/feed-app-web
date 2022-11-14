import { rem } from 'polished';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddDevice } from 'src/components/AddDevice';
import { BackButton } from 'src/components/BackButton';
import { Button, WideButton } from 'src/components/Button';
import { CopyToClipboardButton } from 'src/components/CopyButton';
import { DeviceDisplay } from 'src/components/DeviceDisplay';
import { Input } from 'src/components/Input';
import { Spinner } from 'src/components/Spinner';
import { Plus } from 'src/components/svg/Plus';
import { useGetDevices } from 'src/hooks/device.hooks';
import { useDeletePoll, useGetPoll, usePatchPoll } from 'src/hooks/poll.hooks';
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
  const patchPoll = usePatchPoll();
  const deletePoll = useDeletePoll();
  const devices = useGetDevices();
  const pollDevices = devices.data?.filter(
    d => d.connectedPoll?.pincode === params.id,
  );
  const notPollDevices =
    devices.data?.filter(d => d.connectedPoll?.pincode !== params.id) ?? [];

  const pollWithStatus = useGetPoll(params.id ?? '');

  const [isPrivate, setIsPrivate] = useState<boolean | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (pollWithStatus.data) {
      setIsPrivate(pollWithStatus?.data?.access === PollAccess.Private);
      setEndTime(
        pollWithStatus.data?.endTime
          ? new Date(pollWithStatus.data?.endTime)
          : undefined,
      );
    }
  }, [pollWithStatus.data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const operations = [];
    const formattedEndTime = formatDate(endTime);

    if (!params.id) {
      // TODO: Error notification?
      return;
    }

    if (isPrivate !== undefined) {
      operations.push({
        op: 'replace',
        value: isPrivate ? PollAccess.Private : PollAccess.Public,
        path: PollPatchOption.Access,
      });
    }

    if (endTime && formattedEndTime) {
      operations.push({
        op: 'replace',
        value: formattedEndTime,
        path: PollPatchOption.EndTime,
      });
    }

    patchPoll.mutate({
      id: params.id,
      operations,
    });
  };

  const handleDelete = () => {
    if (params.id) {
      deletePoll.mutate(params.id);
    }
  };

  if (patchPoll.isLoading || deletePoll.isLoading || pollWithStatus.isLoading) {
    return <Spinner />;
  }

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
            value={endTime ? endTime.toISOString().slice(0, -8) : undefined}
            onChange={e => setEndTime(new Date(e.target.value))}
          />
        </InputAndLabelWrapper>
        <CheckboxAndLabelWrapper>
          <Label htmlFor="private">Private:</Label>
          <Checkbox
            id="private"
            type="checkbox"
            onChange={() => setIsPrivate(!isPrivate)}
            checked={!isPrivate}
          />
        </CheckboxAndLabelWrapper>
        <ButtonsWrapper>
          <WideButton type="submit">Save</WideButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </ButtonsWrapper>
      </form>
      <h2 style={{ marginTop: '20px' }}>Devices</h2>
      {pollDevices?.map(d => (
        <DeviceDisplay device={d} pollPincode={params.id!} />
      ))}
      <AddDevice icon={<Plus />} pincode={params.id!} />
      {notPollDevices.length > 0 && (
        <>
          <h3>Devices connected to other polls</h3>
          {notPollDevices.map(d => (
            <DeviceDisplay device={d} pollPincode={params.id!} />
          ))}
        </>
      )}
    </>
  );
};
