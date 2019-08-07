import React from 'react';
import gql from 'graphql-tag';
import { StyledLink } from './Nav';
import Router from 'next/router';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { timeout } from 'q';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut {
      message
    }
  }
`;

const SignOut = props => {
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    onCompleted: () => {
      sessionStorage.clear(); // or localStorage
      client.clearStore().then(() => {
        client.resetStore().then(
          () => Router.push('/signin') // redirect user to login page
        );
      });
    },
  });
  const client = useApolloClient();

  const handleSignOutClick = async e => {
    e.preventDefault();
    const res = await signOut();
  };

  return <StyledLink onClick={handleSignOutClick}>Sign Out</StyledLink>;
};

export default SignOut;
