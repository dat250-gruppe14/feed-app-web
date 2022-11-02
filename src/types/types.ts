export enum PollAccess {
  Public = "Public",
  Private = "Private",
}

export enum AccountRole {
  User = "User",
  Admin = "Admin",
}

export interface User {
  id: string;
  name: string;
  role: AccountRole;
}

export interface Device {
  id: string;
  name: string;
  pincode: number;
}

export enum PollOption {
  One,
  Two
}

export interface PollCounts {
  optionOneCount: number;
  optionTwoCount: number;
}

export interface Poll {
  id: string;
  pincode: string;
  question: string;
  optionOne: string;
  optionTwo: string;
  counts: PollCounts;
  owner: User;
  access: PollAccess;
  startTime: Date;
  endTime?: Date;
  createdTime: Date;
  userAnswer?: PollOption;
}

export interface Vote {
  id: string;
  option: PollOption;
  pollId: string;
}

export interface DeviceVote {
  id: string;
  answerACount: number;
  answerBCount: number;
  poll: Poll;
}
export interface PollCreateRequest {
  question: string;
  optionOne: string;
  optionTwo: string;
  access: PollAccess;
  startTime: string;
  endTime?: string;
}

export interface PollUpdateRequest {
  question?: string;
  optionOne?: string;
  optionTwo?: string;
  access?: PollAccess;
  endTime?: string;
}

export interface VoteRequest {
  option: PollOption;
  pollId: string;
}