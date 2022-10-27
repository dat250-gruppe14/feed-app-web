import React, { FC } from 'react';
import { SkeletonCard } from 'src/components/SkeletonCard';
import { useGetPolls } from 'src/utils/hooks/poll.hooks';

export const PollsPage: FC = () => {
  const polls = useGetPolls();

  const { isLoading, isError, isSuccess, data } = polls;

  if (isLoading) {
    return <SkeletonCard />
  }

  if (isSuccess) {
    return (
      <div>Polls</div>
    );
  }

  return null;
};
