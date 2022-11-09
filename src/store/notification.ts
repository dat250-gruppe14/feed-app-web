import { entity } from 'simpler-state';

export const notification = entity<string>('');

export const resetNotification = () => {
  notification.set('');
};

export const notify = (message: string) => {
  notification.set(message);
};
