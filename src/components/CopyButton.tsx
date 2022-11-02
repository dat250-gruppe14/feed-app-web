import { FC, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import { colors } from 'src/styles/colors';
import { Copy } from 'src/components/svg/Copy';

type CopyButtonProps = {
	label: string;
	value: string;
}

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


export const CopyToClipboardButton: FC<CopyButtonProps> = ({label, value}) => {
	const [isCopied, setIsCopied] = useState(false);

	const labelText = isCopied ? 'Copied' : label;

	const copyFunction = () => {
		navigator.clipboard.writeText(value);
		setIsCopied(true);

		setTimeout(() => setIsCopied(false), 1000);
	}

	return (
			<PincodeBoxWrapper onClick={copyFunction}>
				<PincodeBox>
					<CopyWrapper>
						<Copy />
					</CopyWrapper>
					{`${labelText}: ${value}`}
				</PincodeBox>
			</PincodeBoxWrapper>
	)
}
