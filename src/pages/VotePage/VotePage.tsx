import { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Link } from 'react-router-dom';

import { Card } from 'src/components/Card';
import { ArrowLeft } from 'src/components/svg/ArrowLeft';
import { AccountRole, Answer, Poll, PollAccess } from 'src/types/types';
import { baseRoutes } from 'src/routes/baseRoutes';
import { CopyToClipboardButton } from 'src/components/CopyButton';
import { usePolls } from 'src/utils/hooks/poll.hooks';

const BackButton = styled(Link)`
	display: flex;
	text-decoration: none;
`;

const ArrowWrapper = styled.div`
	margin-right: ${rem(5)};
	width: ${rem(22)};
`;


const PollMock: Poll = {
    id: '123456',
    question: 'Ananas pao pizza',
    optionOne: 'Nei',
    optionTwo: 'Ja',
    owner: {
			id: '123',
			name: 'Testbert',
			role: AccountRole.User,
    },
    optionOneCount: 100,
    optionTwoCount: 200,
    startDate: new Date('2022-10-27'),
    endDate: new Date('2022-11-27'),
    access: PollAccess.Public,
    isClosed: false,
    userAnswer: Answer.NONE,
}

export const VotePage: FC = () => {
	const poll = PollMock;
	const polls = usePolls();

	if (!polls.isSuccess){
		return <>loading...</>;
	}

	return (
	 <>
	 	<BackButton to={baseRoutes.index}>
			<ArrowWrapper>
				<ArrowLeft />
			</ArrowWrapper>
			Back to polls
		</BackButton>
		  <Card 
		    title={poll.question}
		    optionOne={poll.optionOne}
		    optionOneCount={poll.optionOneCount}
		    optionTwo={poll.optionTwo}
		    optionTwoCount={poll.optionTwoCount}
		    owner={poll.owner.name}
		    userAnswer={poll.userAnswer}
				endDate={poll.endDate}
		    showPollMeta
		  />
			<CopyToClipboardButton label="Pincode" value={poll.id} />
	  </>
	);
};
