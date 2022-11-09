import { FC, useEffect, useState } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';
import { colors } from 'src/styles/colors';
import { notification, resetNotification } from '../store/notification';

const NotificationWrapper = styled.div`
  position: fixed;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${rem(10)} ${rem(20)};
  margin: ${rem(20)} ${rem(10)};

  border-radius: 22px;

  background-color: ${colors.backgroundSecondary};
  width: fit-content;
  min-width: 60px;
  height: fit-content;

  text-align: center;

  transition: transform 0.5s, min-width 0.3s;

  &.hide {
    transform: translateY(-60px);
    min-width: 0;
  }
`;

enum AlertStatuses {
  SHOW = 'show',
  HIDE = 'hide',
}

const NotificationStyle = styled.span`
  color: white;
`;

export const Notification: FC = () => {
  const message = notification.use();
  const [display, setDisplay] = useState(AlertStatuses.HIDE);

  useEffect(() => {
    if (message) {
      setDisplay(AlertStatuses.SHOW);
      setTimeout(() => {
        resetNotification();
      }, 4000);
    } else {
      setDisplay(AlertStatuses.HIDE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <NotificationWrapper className={display}>
      <NotificationStyle>{message}</NotificationStyle>
    </NotificationWrapper>
  );
};
