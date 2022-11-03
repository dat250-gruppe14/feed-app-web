import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { createPoll, deletePoll, getPoll, getPolls, patchPoll, votePoll } from "src/services/poll.service"
import { Poll, PollCreateRequest, PollPatchOperation, Vote, VoteRequest } from "src/types/types"
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
      initialData: () => queryClient.getQueryData<Poll[]>(['polls'])?.find(p => p.pincode === id),
      initialDataUpdatedAt: () => queryClient.getQueryState(['polls'])?.dataUpdatedAt
    },
  );
}

export const useCreatePoll = () => {
  const queryClient = useQueryClient();

  return useMutation((request: PollCreateRequest) => createPoll(request), {
    onSuccess: (newPoll: Poll) => {
      queryClient.setQueryData(['polls', newPoll.id], newPoll);
    },
    onError: () => {
      console.log("useCreatePoll error");
    }
  })
}

export const usePatchPoll = () => {
  const queryClient = useQueryClient();

  return useMutation((request: PollPatchOperation[]) => patchPoll(request), {
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
    onSuccess: (oldPoll: Poll) => {
      queryClient.invalidateQueries(['polls']);
      queryClient.invalidateQueries(['polls', oldPoll.id]);
    },
    onError: () => {
      console.log("useDeletePoll error");
    }
  })
}

export const useVotePoll = () => {
  const queryClient = useQueryClient();

  return useMutation((request: VoteRequest) => votePoll(request.pollId, request), {
    onSuccess: (newVote: Vote) => {
      queryClient.invalidateQueries(['polls', newVote.pollId]);
    }
  })
}
