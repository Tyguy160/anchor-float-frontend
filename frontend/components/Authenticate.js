import React from 'react';

import SignIn from './SignIn';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
const GET_CURRENT_USER = gql`
  query me {
    me {
      id
    }
  }
`;

const Authenticate = props => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  if (loading) return <p>Loading...</p>;
  if (data) {
    return props.children;
  }
  if (!data) {
    return (
      <div>
        <p>Please sign in before continuing 🔑</p>
        <SignIn />
      </div>
    );
  }
};

export default Authenticate;
