export enum PollAccess {
  Public,
  Private,
}

export enum AccountRole {
  User,
  Admin,
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: AccountRole;
}

export interface Device {
  id: string;
  name: string;
  pincode: number;
}

export enum PollOption {
  One,
  Two,
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
  pincode?: string;
  startTime: Date;
  endTime?: Date;
}

interface PatchOperation {
  op: string;
  path: string;
  value: string;
}

export enum PollPatchOption {
  Access = '/access',
  EndTime = '/endTime',
}

export interface PollPatchOperation extends PatchOperation {
  path: PollPatchOption;
}

export interface PollPatchRequest {
  id: string;
  operations: PollPatchOperation[];
}

export interface VoteRequest {
  optionSelected: PollOption;
  pollPincode: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface UserWithToken {
  user: User;
  token: string;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  role?: AccountRole;
}

export interface LocalVote {
  pincode: string;
  optionSelected: PollOption;
}
