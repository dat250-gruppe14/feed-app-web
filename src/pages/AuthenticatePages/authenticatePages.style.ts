import { rem } from 'polished';
import { Button } from 'src/components/Button';
import { CenteredContent } from 'src/components/CenteredContent';
import { colors } from 'src/styles/colors';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: ${rem(70)};
  margin-bottom: ${rem(10)};
`;

export const Header = styled.div`
  font-size: ${rem(36)};
  font-weight: bold;
`;

export const InputAndLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${rem(20)};
`;

export const Label = styled.label`
  font-size: ${rem(20)};
  font-weight: bold;
  margin-bottom: ${rem(5)};
`;

export const ButtonsWrapper = styled(CenteredContent)`
  margin-top: ${rem(40)};
`;

export const AuthSubmitButton = styled(Button)`
  width: ${rem(160)};
  margin-bottom: ${rem(30)};
`;

export const AuthSecondaryButton = styled(Button)`
  width: ${rem(120)};
  height: ${rem(25)};
  background-color: ${colors.white};
  color: ${colors.black};
  font-size: ${rem(14)};
`;

export const PollsButton = styled(Button)`
  bottom: ${rem(50)};
  position: absolute;

  font-size: ${rem(14)};
  background-color: ${colors.backgroundSecondary};
`;
