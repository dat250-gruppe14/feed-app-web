import { apiClient } from "src/api/base";
import { Poll, PollCreateRequest, PollUpdateRequest } from "src/types/types";

export const getPolls = async () => {
  return (await apiClient.get<Poll[]>("api/poll")).data;
}

export const getPoll = async (id: string) => {
  return (await apiClient.get<Poll>(`api/poll/${id}`)).data;
}

export const createPoll = async (request: PollCreateRequest) => {
  return (await apiClient.post<Poll>(`api/poll`, request)).data;
}

export const updatePoll = async (request: PollUpdateRequest) => {
  return (await apiClient.put<Poll>(`api/poll`, request)).data;
}

export const deletePoll = async (id: string) => {
  return (await apiClient.delete(`api/poll/${id}`)).data;
}