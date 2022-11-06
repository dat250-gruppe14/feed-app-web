import { FC } from 'react';
import styled from 'styled-components';

const CenteredContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface CenteredContentProps {
  className?: string;
}

export const CenteredContent: FC<CenteredContentProps> = ({
  className,
  children,
}) => (
  <CenteredContentStyle className={className}>{children}</CenteredContentStyle>
);
