import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'src/components/Alert';
import { Card } from 'src/components/Card';
import { Person } from 'src/components/svg/Person';
import { useGetPolls } from 'src/hooks/poll.hooks';
import { baseRoutes } from 'src/routes/baseRoutes';
import { Heading } from './PollsPage';

export const AdminPage: FC = () => {
  const polls = useGetPolls();
  const navigate = useNavigate();

  return (
    <>
      <Alert
        description="Manage users"
        icon={<Person />}
        href={baseRoutes.users}
      />
      <Heading>All polls</Heading>
      {polls.data?.map(poll => {
        return (
          <Card
            title={poll.question}
            pincode={poll.pincode}
            optionOne={poll.optionOne}
            optionTwo={poll.optionTwo}
            counts={poll.counts}
            isOwner
            onClick={() => navigate(`poll/${poll.pincode}/edit`)}
            adminCard
          />
        );
      })}
    </>
  );
};
