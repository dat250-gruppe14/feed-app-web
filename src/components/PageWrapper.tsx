import { FC } from 'react';
import styled from 'styled-components';
import { Notification } from './Notification';

const EntireViewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 85%;
  max-width: 700px;
`;

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => (
  <EntireViewWrapper>
    <Notification />
    <ContentWrapper>{children}</ContentWrapper>
  </EntireViewWrapper>
);
