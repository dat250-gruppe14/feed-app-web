import { rem } from 'polished';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { colors } from 'src/styles/colors';
import { useCreateDevice } from 'src/hooks/poll.hooks';
import { Input } from './Input';
import { ButtonMedium } from './Button';

const AlertWrapper = styled.div`
  align-items: center;
  background: ${colors.backgroundSecondary} !important;
  border-radius: ${rem(20)};
  display: flex;
  flex-direction: row;
  margin: ${rem(20)} 0;
  height: max-content;
  padding: ${rem(10)} ${rem(18)};
  width: 100%;
`;

const AlertIcon = styled.div`
  align-items: center;
  display: flex;
  width: ${rem(20)};
  margin-right: ${rem(12)};
`;

const FormWrapper = styled.form`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

interface AddDeviceProps {
  icon: JSX.Element;
  pincode: string;
}

export const AddDevice: FC<AddDeviceProps> = props => {
  const { icon, pincode } = props;
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState('');
  const { mutate } = useCreateDevice();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      name,
      pollPincode: pincode,
    });
    setIsActive(false);
  };

  return (
    <AlertWrapper onClick={() => setIsActive(true)}>
      <AlertIcon>{icon}</AlertIcon>
      {isActive ? (
        <FormWrapper onSubmit={handleSubmit}>
          <Input
            placeholder="Device name"
            onChange={e => setName(e.target.value)}
            required
          />
          <ButtonMedium style={{ width: '180px' }}>Add device</ButtonMedium>
        </FormWrapper>
      ) : (
        'Add device'
      )}
    </AlertWrapper>
  );
};
