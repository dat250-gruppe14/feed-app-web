import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { notify } from 'src/components/store/notification';
import { baseRoutes } from 'src/routes/baseRoutes';

import {
  createPoll,
  deletePoll,
  getPoll,
  getPolls,
  patchPoll,
  votePoll,
} from 'src/services/poll.service';
import {
  Poll,
  PollCreateRequest,
  PollPatchOperation,
  Vote,
  VoteRequest,
} from 'src/types/types';
import { FETCH_DEFAULT_OPTIONS } from './config';

export const useGetPolls = () => {
  return useQuery<Poll[], AxiosError>(
    ['polls'],
    () => getPolls(),
    FETCH_DEFAULT_OPTIONS,
  );
};

export const useGetPoll = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<Poll, AxiosError>(['polls', id], () => getPoll(id), {
    ...FETCH_DEFAULT_OPTIONS,
    initialData: () =>
      queryClient.getQueryData<Poll[]>(['polls'])?.find(p => p.pincode === id),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(['polls'])?.dataUpdatedAt,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const useCreatePoll = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation((request: PollCreateRequest) => createPoll(request), {
    onSuccess: (newPoll: Poll) => {
      queryClient.setQueryData(['polls', newPoll.id], newPoll);
      navigate(baseRoutes.index);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const usePatchPoll = () => {
  const queryClient = useQueryClient();

  return useMutation((request: PollPatchOperation[]) => patchPoll(request), {
    onSuccess: (newPoll: Poll) => {
      queryClient.setQueryData(['polls', newPoll.id], newPoll);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const useDeletePoll = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation((id: string) => deletePoll(id), {
    onSuccess: (oldPoll: Poll) => {
      queryClient.invalidateQueries(['polls']);
      queryClient.invalidateQueries(['polls', oldPoll.id]);
      navigate(baseRoutes.index);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const useVotePoll = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (request: VoteRequest) => votePoll(request.pollId, request),
    {
      onSuccess: (newVote: Vote) => {
        queryClient.invalidateQueries(['polls', newVote.pollId]);
      },
    },
  );
};
