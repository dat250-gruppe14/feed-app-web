import { entity } from 'simpler-state';

export type UserStatus = 'loading' | 'success' | 'error';

export const userStatus = entity<UserStatus>('success');

export const setUserStatus = (status: UserStatus) => {
  userStatus.set(status);
};
