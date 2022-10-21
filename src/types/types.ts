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

export enum Answer {
  NONE,
  ANSWER_A,
  ANSWER_B
}

export interface Poll {
  id: string;
  question: string;
  optionOne: string;
  optionTwo: string;
  owner: User;
  optionOneCount: number;
  optionTwoCount: number;
  startDate: Date;
  endDate: Date;
  access: PollAccess;
  isClosed: boolean;
  userAnswer: Answer;
}

export interface Vote {
  id: string;
  option: Answer;
  poll: Poll;
}

export interface DeviceVote {
  id: string;
  answerACount: number;
  answerBCount: number;
  poll: Poll;
}

export interface PollOption {
  description: string;
  count?: number;
}