import { apiClient } from 'src/api/base';
import {
  Poll,
  PollCreateRequest,
  PollPatchOperation,
  VoteRequest,
} from 'src/types/types';

const BASE_URL = 'api/poll';

export const getPolls = async (): Promise<Poll[]> => {
  return (await apiClient.get<Poll[]>(BASE_URL)).data;
};

export const getPoll = async (id: string): Promise<Poll> => {
  return (await apiClient.get<Poll>(`${BASE_URL}/${id}`)).data;
};

export const createPoll = async (request: PollCreateRequest): Promise<Poll> => {
  return (await apiClient.post<Poll>(BASE_URL, request)).data;
};

export const patchPoll = async (
  // JsonPatch expects an array of operations in the document
  id: string,
  request: PollPatchOperation[],
): Promise<Poll> => {
  return (await apiClient.patch<Poll>(`${BASE_URL}/${id}`, request)).data;
};

export const deletePoll = async (id: string): Promise<Poll> => {
  return (await apiClient.delete(`${BASE_URL}/${id}`)).data;
};

export const votePoll = async (
  id: string,
  request: VoteRequest,
): Promise<Poll> => {
  return (await apiClient.post(`${BASE_URL}/${id}/vote`, request)).data;
};
