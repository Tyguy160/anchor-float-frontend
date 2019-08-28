import React from 'react';
import gql from 'graphql-tag';
import { StyledLink } from '../styles/styles';
import Router from 'next/router';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut {
      message
    }
  }
`;

const SignOut = props => {
  const client = useApolloClient();
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    onCompleted: async () => {
      sessionStorage.clear(); // or localStorage
      await client.clearStore();
      await client.resetStore();
    },
    refetchQueries: ['me'],
  });

  const handleSignOutClick = async e => {
    e.preventDefault();
    await signOut();
    Router.push('/signin'); // redirect user to login page
  };

  return <StyledLink onClick={handleSignOutClick}>Sign Out</StyledLink>;
};

export default SignOut;
