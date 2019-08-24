import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';
import Link from 'next/link';

import {
  SigninFormContainer,
  SigninForm,
  SigninInputContainer,
  SigninTextInput,
  ContinueButton,
  PageSection,
  CenteredHeading,
} from './styles/styles';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
        id
        email
      }
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

const RESET_REQUEST_MUTATION = gql`
  mutation RESET_REQUEST_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const SignIn = props => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [signIn, { error, data }] = useMutation(SIGNIN_MUTATION, {
    variables: { input: { email, password } },
    refetchQueries: ['me'],
  });

  const [resetPassword, { error2, data2 }] = useMutation(
    RESET_REQUEST_MUTATION,
    {
      variables: { email },
    }
  );
  return (
    <PageSection>
      <CenteredHeading>Sign into your account</CenteredHeading>
      <SigninFormContainer>
        <SigninForm
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            try {
              const res = await signIn();
              Router.push({
                pathname: '/dashboard',
              });
            } catch (err) {
              console.log({ err });
            }
          }}>
          {/* <Error error={error} /> */}
          <SigninInputContainer>
            <label htmlFor="email">
              Email
              <SigninTextInput
                type="email"
                name="email"
                // placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </SigninInputContainer>
          <SigninInputContainer>
            <label htmlFor="password">
              Password
              <SigninTextInput
                type="password"
                name="password"
                // placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </SigninInputContainer>
          <ContinueButton type="submit" value="Sign In!" />
          <Link
            // onClick={e => {
            //   e.preventDefault();
            //   console.log(`Attempting reset for ${email}`);
            //   if (!email) {
            //     console.log('Sorry, you need to enter an email address above');
            //   }
            //   resetPassword(email);
            // }}
            href="/request-reset">
            <i style={{ textAlign: `center`, cursor: `pointer` }}>
              Forgot password?
            </i>
          </Link>
        </SigninForm>
      </SigninFormContainer>
      <Error error={error} />
    </PageSection>
  );
};

export default SignIn;
