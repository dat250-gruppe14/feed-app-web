import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { notify } from 'src/store/notification';
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
  PollPatchRequest,
  VoteRequest,
} from 'src/types/types';
import { addLocalVote } from 'src/utils/utils';
import { FETCH_DEFAULT_OPTIONS } from './config';

export const useGetPolls = () => {
  return useQuery<Poll[], AxiosError>(
    ['polls'],
    () => getPolls(),
    FETCH_DEFAULT_OPTIONS,
  );
};

export const useGetPollWithMutate = () => {
  const navigate = useNavigate();

  return useMutation((id: string) => getPoll(id), {
    onSuccess: (poll: Poll) => {
      navigate(`poll/${poll.pincode}`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
    },
  });
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
      const prevPolls: Poll[] | undefined = queryClient.getQueryData(['polls']);

      queryClient.setQueryData(['polls'], [...(prevPolls ?? []), newPoll]);
      navigate(baseRoutes.index);
      notify('✅ Poll created!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const usePatchPoll = () => {
  const queryClient = useQueryClient();

  return useMutation((request: PollPatchRequest) => patchPoll(request.id, request.operations), {
    onSuccess: (newPoll: Poll) => {
      const prevPolls: Poll[] | undefined = queryClient.getQueryData(['polls']);

      queryClient.setQueryData(
        ['polls'],
        [...(prevPolls?.filter(poll => poll.id !== newPoll.id) ?? []), newPoll],
      );
      notify('✅ Poll was updated!');
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
      const prevPolls: Poll[] | undefined = queryClient.getQueryData(['polls']);

      queryClient.setQueryData(
        ['polls'],
        [...(prevPolls?.filter(poll => poll.id !== oldPoll.id) ?? [])],
      );
      navigate(baseRoutes.index);
      notify('✅ Poll deleted!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const useVotePoll = () => {
  const queryClient = useQueryClient();
  const mutatePoll = useGetPollWithMutate();

  return useMutation(
    (request: VoteRequest) => votePoll(request.pollPincode, request),
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSuccess: (updatedPoll: Poll, request) => {
        // queryClient.invalidateQueries(['polls', { id: updatedPoll.id }]);
        queryClient.invalidateQueries(['polls']);
        // Litt igjen her
        addLocalVote({
          pincode: updatedPoll.pincode,
          optionSelected: request.optionSelected,
        });
        notify('✅ Your vote is saved!');
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        notify(`❌ ${err.response.data.message}`);
      },
    },
  );
};
