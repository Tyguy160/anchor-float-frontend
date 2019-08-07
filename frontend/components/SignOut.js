import React from 'react';
import { CURRENT_USER_QUERY } from './User';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { StyledLink } from './Nav';
import Router from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut {
      message
    }
  }
`;

const GET_CURRENT_USER = gql`
  query me {
    me {
      id
    }
  }
`;

const SignOut = props => {
  const [signOut, { error, data }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: ['me'],
  });

  const {
    client,
    loading,
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER);

  return (
    <StyledLink
      onClick={async () => {
        try {
          // ! Not a good way to do the cache reset...
          const res = await signOut().then(() => client.resetStore());

          console.log({ res });
          // client.resetStore();
          Router.push({
            pathname: '/',
          });
        } catch (err) {
          console.log(err);
        }
      }}>
      Sign Out
    </StyledLink>
  );
};

export default SignOut;
