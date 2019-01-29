import React from 'react';
import { CURRENT_USER_QUERY } from './User';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { StyledLink } from './Nav';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;

const SignOut = props => {
  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {signOut => <StyledLink onClick={signOut}>Sign Out</StyledLink>}
    </Mutation>
  );
};

export default SignOut;
