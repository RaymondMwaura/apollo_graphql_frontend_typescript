import React from 'react';
import styled from 'react-emotion';
import { useApolloClient } from '@apollo/react-hooks';

import { menuItemClassName } from '../components/menu-item';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function LogoutButton() {
  const client = useApolloClient();
  return (
    <StyledButton
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      onClick={() => {
        client.writeData({ data: { isLoggedIn: false } });
        localStorage.clear();
      }}
    >
      <ExitIcon />
      Logout
    </StyledButton>
  );
}

const StyledButton = styled('button')(menuItemClassName, {
  background: 'none',
  border: 'none',
  padding: 0,
});
