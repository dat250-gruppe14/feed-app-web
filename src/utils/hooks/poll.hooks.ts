import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { createPoll, deletePoll, getPoll, getPolls, updatePoll } from "src/services/poll.service"
import { Poll, PollCreateRequest, PollUpdateRequest } from "src/types/types"
import { FETCH_DEFAULT_OPTIONS } from "./config"

export const useGetPolls = () => {
  return useQuery<Poll[], AxiosError>(
    ['polls'],
    () => getPolls(),
    FETCH_DEFAULT_OPTIONS,
  );
}

export const useGetPoll = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery<Poll, AxiosError>(
    ['polls', id],
    () => getPoll(id),
    {
      ...FETCH_DEFAULT_OPTIONS,
      initialData: () => queryClient.getQueryData<Poll[]>(['polls'])?.find(p => p.id === id),
      initialDataUpdatedAt: () => queryClient.getQueryState(['polls'])?.dataUpdatedAt
    },
  );
}

export const useCreatePoll = () => {
  const queryClient = useQueryClient();

  return useMutation((request: PollCreateRequest) => createPoll(request), {
    onSuccess: (newPoll) => {
      queryClient.setQueryData(['polls', newPoll.id], newPoll);
    },
    onError: () => {
      console.log("useCreatePoll error");
    }
  })
}

export const useUpdatePoll = () => {
  const queryClient = useQueryClient();

  return useMutation((request: PollUpdateRequest) => updatePoll(request), {
    onSuccess: (newPoll: Poll) => {
      queryClient.setQueryData(['polls', newPoll.id], newPoll);
    },
    onError: () => {
      console.log("useUpdatePoll error");
    }
  })
}

export const useDeletePoll = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deletePoll(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['polls']);
      queryClient.invalidateQueries(['polls']);
    },
    onError: () => {
      console.log("useDeletePoll error");
    }
  })
}
