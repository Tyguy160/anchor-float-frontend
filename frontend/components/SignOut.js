import React from 'react';
import gql from 'graphql-tag';
import { StyledLink } from './Nav';
import Router from 'next/router';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;

const SignOut = props => {
  const [signOut] = useMutation(SIGNOUT_MUTATION);
  const client = useApolloClient();

  const handleSignOutClick = async e => {
    e.preventDefault();
    await Promise.all([signOut(), client.resetStore()]);
    Router.push({
      pathname: '/',
    }); 
  }

  return (
    <StyledLink
      onClick={handleSignOutClick}>
      Sign Out
    </StyledLink>
  );
};

export default SignOut;
