/* eslint-disable max-len */
import { rem } from 'polished';
import { FC } from 'react';
import { BackButton } from 'src/components/BackButton';
import { CardTitle, CardWrapper } from 'src/components/Card';
import { useGetUsers, useUpdateUsersRole } from 'src/hooks/user.hooks';
import { colors } from 'src/styles/colors';
import { AccountRole } from 'src/types/types';
import { usersNameSorter } from 'src/utils/utils';
import styled from 'styled-components';

const CardWrapperStyled = styled(CardWrapper)`
  margin-top: ${rem(20)};
`;

const InfoWrapper = styled.div`
  font-size: ${rem(16)};
  font-weight: bold;
  margin-bottom: ${rem(5)};
`;

const SelectStyled = styled.select`
  background-color: ${colors.backgroundPrimary};
  border: none;
  border-radius: 20px;
  padding: ${rem(5)} ${rem(16)};
  font-weight: bold;
  margin-top: ${rem(10)};
  width: 100%;
  height: ${rem(40)};

  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat, repeat;
  background-position: right 1em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  -webkit-appearance: none;
`;

export const UsersPage: FC = () => {
  const users = useGetUsers();
  const updateUserRole = useUpdateUsersRole();

  return (
    <>
      <BackButton />
      {users.data?.sort(usersNameSorter).map(user => (
        <CardWrapperStyled>
          <CardTitle>{user.name}</CardTitle>
          <InfoWrapper>{user.email}</InfoWrapper>
          <InfoWrapper>
            <SelectStyled
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                updateUserRole.mutate({
                  ...user,
                  role: e.target.value as unknown as AccountRole,
                });
              }}
              defaultValue={user.role}
            >
              <option value={AccountRole.User}>Standard user</option>
              <option value={AccountRole.Admin}>Admin user</option>
            </SelectStyled>
          </InfoWrapper>
        </CardWrapperStyled>
      ))}
    </>
  );
};
