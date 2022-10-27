import { FC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Link } from 'react-router-dom';

import { Card } from 'src/components/Card';
import { ArrowLeft } from 'src/components/svg/ArrowLeft';
import { AccountRole, Answer, Poll, PollAccess } from 'src/types/types';
import { baseRoutes } from 'src/routes/baseRoutes';
import { colors } from 'src/styles/colors';
import { Copy } from 'src/components/svg/Copy';

const BackButton = styled(Link)`
	display: flex;
	text-decoration: none;
`;

const ArrowWrapper = styled.div`
	margin-right: ${rem(5)};
	width: ${rem(22)};
`;

const CopyWrapper = styled.div`
	margin-right: ${rem(5)};
	width: ${rem(10)};
`;

const PincodeBoxWrapper = styled.div`
	display: flex;
	cursor: pointer;
	justify-content: center;
	width: 100%;
`;
const PincodeBox = styled.div`
	align-self: center;
	background: ${colors.backgroundSecondary};
	border-radius: 20px;
	display: inline-flex;
	padding: 10px 23px;
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
    startDate: '2022-10-27',
    endDate: '2022-10-27',
    access: PollAccess.Public,
    isClosed: false,
    userAnswer: Answer.NONE,
}

export const VotePage: FC = () => {
	const poll = PollMock;

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
		    showPollMeta
		  />
			<PincodeBoxWrapper onClick={() => navigator.clipboard.writeText(poll.id)}>
				<PincodeBox>
					<CopyWrapper>
						<Copy />
					</CopyWrapper>
					Pincode: {poll.id}
				</PincodeBox>
			</PincodeBoxWrapper>
	  </>
	);
};
