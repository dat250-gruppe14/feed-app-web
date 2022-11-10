import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from 'src/components/Card';
import { CopyToClipboardButton } from 'src/components/CopyButton';
import { useGetPoll } from 'src/hooks/poll.hooks';
import { Alert } from 'src/components/Alert';
import { AlertTriangle } from 'src/components/svg/AlertTriangle';
import { BackButton } from 'src/components/BackButton';

export const VotePage: FC = () => {
  const params = useParams();
  const pollWithStatus = useGetPoll(params.id ?? '');
  const now = new Date();

  if (!pollWithStatus.isSuccess) {
    return <>loading...</>;
  }

  const poll = pollWithStatus.data;
  const hasPollStarted = new Date(poll.startTime) < now;
  const isPollActive = !poll.endTime || new Date(poll.endTime) > now;

  const showPollAlert = !hasPollStarted || !isPollActive;

  return (
    <>
      <BackButton />
      {showPollAlert ? (
        <Alert
          icon={<AlertTriangle />}
          description={`This poll has ${
            !hasPollStarted ? 'not started' : 'expired'
          }!`}
        />
      ) : null}
      <Card
        title={poll.question}
        counts={poll.counts}
        optionOne={poll.optionOne}
        optionTwo={poll.optionTwo}
        owner={poll.owner.name}
        userAnswer={poll.userAnswer}
        endTime={poll.endTime}
        pincode={poll.pincode}
        showVoteButton
      />
      <CopyToClipboardButton label="Pincode" value={poll.pincode} />
    </>
  );
};
