import { FC, useEffect, useState } from 'react';
import { rem } from 'polished';
import styled from 'styled-components';
import { useGetNotification, useSetNotification } from 'src/hooks/auth.hooks';

const NotificationWrapper = styled.div`
  position: fixed;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 ${rem(20)};
  margin-top: ${rem(20)};

  border-radius: 22px;

  background-color: black;
  width: fit-content;
  min-width: 60px;
  height: ${rem(40)};

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
  const message = useGetNotification();
  const setNofication = useSetNotification();
  const [display, setDisplay] = useState(AlertStatuses.HIDE);

  useEffect(() => {
    if (message) {
      setDisplay(AlertStatuses.SHOW);
      setTimeout(() => {
        setNofication(undefined);
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
