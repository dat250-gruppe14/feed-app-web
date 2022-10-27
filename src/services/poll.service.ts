import { apiClient } from "src/api/base";
import { Poll, PollCreateRequest, PollUpdateRequest, Vote, VoteRequest } from "src/types/types";

const BASE_URL = "api/poll";

export const getPolls = async (): Promise<Poll[]> => {
  return (await apiClient.get<Poll[]>(BASE_URL)).data;
}

export const getPoll = async (id: string): Promise<Poll> => {
  return (await apiClient.get<Poll>(`${BASE_URL}/${id}`)).data;
}

export const createPoll = async (
  request: PollCreateRequest
): Promise<Poll> => {
  return (await apiClient.post<Poll>(BASE_URL, request)).data;
}

export const updatePoll = async (
  request: PollUpdateRequest
): Promise<Poll> => {
  return (await apiClient.put<Poll>(BASE_URL, request)).data;
}

export const deletePoll = async (id: string): Promise<Poll> => {
  return (await apiClient.delete(`${BASE_URL}/${id}`)).data;
}

export const votePoll = async (
  id: string, request: VoteRequest
): Promise<Vote> => {
  return (await apiClient.post(`${BASE_URL}/${id}/vote`, request)).data;
}