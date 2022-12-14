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
  Device,
  DeviceCreateRequest,
  DeviceUpdateRequest,
  Poll,
  PollCreateRequest,
  PollPatchRequest,
  VoteRequest,
} from 'src/types/types';
import { addLocalVote } from 'src/utils/utils';
import {
  createDevice,
  deleteDevice,
  updateDevice,
} from 'src/services/device.service';
import { FETCH_DEFAULT_OPTIONS } from './config';
import { useGetAuth } from './auth.hooks';

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
  const navigate = useNavigate();

  return useQuery<Poll, AxiosError>(['polls', id], () => getPoll(id), {
    ...FETCH_DEFAULT_OPTIONS,
    initialData: () =>
      queryClient.getQueryData<Poll[]>(['polls'])?.find(p => p.pincode === id),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(['polls'])?.dataUpdatedAt,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
      navigate(baseRoutes.index);
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

  return useMutation(
    (request: PollPatchRequest) => patchPoll(request.id, request.operations),
    {
      onSuccess: (newPoll: Poll) => {
        const prevPolls: Poll[] | undefined = queryClient.getQueryData([
          'polls',
        ]);

        queryClient.setQueryData(
          ['polls'],
          [
            ...(prevPolls?.filter(poll => poll.id !== newPoll.id) ?? []),
            newPoll,
          ],
        );
        notify('✅ Poll was updated!');
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        notify(`❌ ${err.response.data.message}`);
      },
    },
  );
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
  const user = useGetAuth();

  return useMutation(
    (request: VoteRequest) => votePoll(request.pollPincode, request),
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSuccess: (updatedPoll: Poll, request) => {
        queryClient.invalidateQueries(['polls']);

        // const prevPolls: Poll[] | undefined = queryClient.getQueryData([
        //   'polls',
        // ]);
        // queryClient.setQueryData(['polls', updatedPoll.id], updatedPoll);
        // queryClient.setQueryData(
        //   ['polls'],
        //   [
        //     ...(prevPolls?.filter(poll => poll.id !== updatedPoll.id) ?? []),
        //     updatedPoll,
        //   ],
        // );
        if (!user?.data) {
          addLocalVote({
            pincode: updatedPoll.pincode,
            optionSelected: request.optionSelected,
          });
        }
        notify('✅ Your vote is saved!');
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        notify(`❌ ${err.response.data.message}`);
      },
    },
  );
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation((request: DeviceCreateRequest) => createDevice(request), {
    onSuccess: (newPoll: Device) => {
      const prevPolls: Device[] | undefined = queryClient.getQueryData([
        'devices',
      ]);

      queryClient.setQueryData(['devices'], [...(prevPolls ?? []), newPoll]);
      notify('✅ Device created!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const useUpdateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation((request: DeviceUpdateRequest) => updateDevice(request), {
    onSuccess: (oldPoll: Device) => {
      const prevPolls: Device[] | undefined = queryClient.getQueryData([
        'devices',
      ]);

      queryClient.setQueryData(
        ['devices'],
        [...(prevPolls?.filter(poll => poll.id !== oldPoll.id) ?? [])],
      );
      notify('✅ Device updated!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation((id: string) => deleteDevice(id), {
    onSuccess: (oldPoll: Device) => {
      const prevPolls: Device[] | undefined = queryClient.getQueryData([
        'devices',
      ]);

      queryClient.setQueryData(
        ['devices'],
        [...(prevPolls?.filter(poll => poll.id !== oldPoll.id) ?? [])],
      );
      navigate(baseRoutes.index);
      notify('✅ Device deleted!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      notify(`❌ ${err.response.data.message}`);
    },
  });
};
