import { FC } from 'react';
import styled from 'styled-components';

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
    <ContentWrapper>{children}</ContentWrapper>
  </EntireViewWrapper>
);
