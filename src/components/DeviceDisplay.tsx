import { rem } from 'polished';
import { FC, useState } from 'react';
import styled from 'styled-components';

import { colors } from 'src/styles/colors';
import { useDeleteDevice, useUpdateDevice } from 'src/hooks/poll.hooks';
import { Device } from 'src/types/types';
import { ButtonMedium } from './Button';

const AlertWrapper = styled.div`
  background: ${colors.backgroundSecondary} !important;
  border-radius: ${rem(20)};
  display: flex;
  flex-direction: column;
  margin: ${rem(20)} 0;
  height: max-content;
  padding: ${rem(10)} ${rem(18)};
  width: 100%;
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const DeleteButton = styled(ButtonMedium)`
  padding-bottom: 0;
  padding-top: 0;
`;

const FormStyled = styled.form`
  display: flex;
  gap: ${rem(10)};
  margin: ${rem(10)} 0;
`;

interface AddDeviceProps {
  device: Device;
  pollPincode: string;
}

export const DeviceDisplay: FC<AddDeviceProps> = props => {
  const { device, pollPincode } = props;
  const [showDetails, setShowDetails] = useState(!!device.connectionToken);
  const { mutate: deleteDevice } = useDeleteDevice();
  const { mutate: updateDevice } = useUpdateDevice();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      JSON.stringify({
        id: device.id,
        token: device.connectionToken,
        url: process.env.FEED_APP_API_URL,
      }),
    );
  };

  return (
    <AlertWrapper onClick={() => setShowDetails(true)}>
      <div>{device.name}</div>
      {showDetails && (
        <>
          <div>ID: {device.id}</div>
          {device.connectionToken && <div>Token: {device.connectionToken}</div>}
          <DeleteButtonWrapper>
            <FormStyled>
              {device.connectionToken && (
                <ButtonMedium type="button" onClick={copyToClipboard}>
                  Copy connection config
                </ButtonMedium>
              )}
              {device.connectedPoll?.pincode !== pollPincode && (
                <ButtonMedium
                  onClick={() => {
                    updateDevice({
                      id: device.id,
                      name: device.name,
                      pollPincode,
                    });
                  }}
                >
                  Use device here
                </ButtonMedium>
              )}
              <DeleteButton
                onClick={() => {
                  // eslint-disable-next-line no-alert
                  const ok = window.confirm(
                    `Are you sure you want to delete the poll '${device.name}'?`,
                  );
                  if (ok) {
                    deleteDevice(device.id);
                  }
                }}
                backgroundColor={colors.red}
              >
                Delete
              </DeleteButton>
            </FormStyled>
          </DeleteButtonWrapper>
        </>
      )}
    </AlertWrapper>
  );
};
