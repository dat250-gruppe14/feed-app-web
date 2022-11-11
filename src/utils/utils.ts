import { pathToRegexp } from 'path-to-regexp';
import { baseRoutes } from 'src/routes/baseRoutes';
import jwtDecode from 'jwt-decode';
import { LocalVote, Poll, User } from 'src/types/types';

export const LOGIN_HEADER = 'FEEDAPP';
export const mapRouteToHeaderTitle = (path: string) => {
  if (path.match(pathToRegexp(baseRoutes.index))) return 'Polls';
  if (path.match(pathToRegexp(baseRoutes.createPoll))) return 'New poll';
  if (path.match(pathToRegexp(baseRoutes.editPoll))) return 'Edit poll';
  if (path.match(pathToRegexp(baseRoutes.pollById))) return 'Vote';
  if (path.match(pathToRegexp(baseRoutes.profile))) return 'Profile';
  if (path.match(pathToRegexp(baseRoutes.login))) return LOGIN_HEADER;
  if (path.match(pathToRegexp(baseRoutes.register))) return LOGIN_HEADER;
  if (path.match(pathToRegexp(baseRoutes.users))) return 'Users';
  return '';
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export const getRemainingPollDays = (
  endDate: Date | undefined,
): number | undefined => {
  const msPerDay = 24 * 60 * 60 * 1000;

  const now = new Date();

  const difference = endDate
    ? Math.round(Math.abs(Number(endDate) - Number(now)) / msPerDay)
    : undefined;

  return difference;
};

const msInDay = 24 * 60 * 60 * 1000;
const msInHour = 60 * 60 * 1000;
const msInMinut = 60 * 60 * 1000;

const getRemainingTimeWithUnit = (timeDiff: number): string => {
  if (timeDiff < msInHour) {
    const diffInMinutes = Math.round(timeDiff / msInMinut);
    return diffInMinutes === 1
      ? `${diffInMinutes} minut`
      : `${diffInMinutes} minutes`;
  }
  if (timeDiff < msInDay) {
    const diffInHours = Math.round(timeDiff / msInHour);
    return diffInHours === 1 ? `${diffInHours} hour` : `${diffInHours} hours`;
  }

  const diffInDays = Math.round(timeDiff / msInDay);
  return diffInDays === 1 ? `${diffInDays} day` : `${diffInDays} days`;
};

export const getRemainingTime = (endDate: Date | undefined): string => {
  if (endDate === undefined || endDate === null) {
    return '';
  }
  const timeDiff = Number(endDate) - Number(new Date());

  const diffWithTimeUnit = getRemainingTimeWithUnit(Math.abs(timeDiff));

  return timeDiff >= 0
    ? `${diffWithTimeUnit} left`
    : `Expired ${diffWithTimeUnit} ago`;
};

export const jwtTokenHasExpired = (
  token: string | undefined | null,
): boolean => {
  if (!token) return true;

  const decodedToken: { exp: number } = jwtDecode(token);
  if (!decodedToken) return true;

  return decodedToken.exp * 1000 < new Date().getTime();
};

export const setToken = (token: string) => {
  localStorage.setItem('jwtToken', token);
};

export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

export const deleteTokens = () => {
  localStorage.removeItem('jwtToken');
  document.cookie = '';
};

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return undefined;
  }
  return date.toISOString().slice(0, -8);
};

export const filterOwnedPolls = (
  polls: Poll[],
  userId: string | undefined,
): [Poll[], Poll[]] => {
  const ownedPolls: Poll[] = [];
  const otherPolls: Poll[] = [];

  polls.forEach(poll => {
    (poll.owner.id === userId ? ownedPolls : otherPolls).push(poll);
  });

  return [ownedPolls, otherPolls];
};

export const getLocalVotes = (): LocalVote[] => {
  const localVotesStr = localStorage.getItem('localVotes');
  if (!localVotesStr) return [];
  return JSON.parse(localVotesStr);
};

export const setLocalVotes = (votes: LocalVote[]) => {
  localStorage.setItem('localVotes', JSON.stringify(votes));
};

export const addLocalVote = (vote: LocalVote) => {
  const votes = getLocalVotes();
  votes.push(vote);
  setLocalVotes(votes);
};

export const getLocalPollVote = (pincode: string): LocalVote | undefined => {
  return getLocalVotes().find(p => p.pincode === pincode);
};

export const usersNameSorter = (a: User, b: User): number => {
  if (a.name > b.name) {
    return 1;
  }
  return -1;
};
