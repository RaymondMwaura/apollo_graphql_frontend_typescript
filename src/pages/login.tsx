/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import ApolloClient from 'apollo-client';
import { LoginForm, Loading } from '../components';
import * as LoginTypes from './__generated__/login';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Login() {
  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(
    LOGIN_USER,
    {

      // eslint-disable-next-line no-shadow
      onCompleted({ login }) {
        localStorage.setItem('token', login as string);
        client.writeData({ data: { isLoggedIn: true } });
      },
    },
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
