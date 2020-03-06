/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { GET_LAUNCH_DETAILS } from '../pages/launch';
import Button from '../components/button';
import * as LaunchDetailTypes from '../pages/__generated__/LaunchDetails';

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`;

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/camelcase
type ActionButtonProps = Partial<LaunchDetailTypes.LaunchDetails_launch>

const ActionButton: React.FC<ActionButtonProps> = ({ isBooked, id, isInCart }) => {
  const [mutate, { loading, error }] = useMutation(
    isBooked ? CANCEL_TRIP : TOGGLE_CART,
    {
      variables: { launchId: id },
      refetchQueries: [
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: id },
        },
      ],
    },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <div>
      <Button
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onClick={() => mutate()}
        data-testid="action-button"
      >
        {isBooked
          ? 'Cancel This Trip'
          : isInCart
            ? 'Remove from Cart'
            : 'Add to Cart'}
      </Button>
    </div>
  );
};

export default ActionButton;
