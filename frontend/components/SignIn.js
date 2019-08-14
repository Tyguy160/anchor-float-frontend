import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';
import Link from 'next/link';

const Container = styled.div``;
const PageHeading = styled.h2`
  text-align: center;
`;

const SigninFormContainer = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: grid;
  grid-template-rows: 1fr auto;
`;

const SigninForm = styled.form`
  display: grid;
  padding: 20px 0px 20px 0px;
  grid-gap: 15px;
  justify-content: center;
`;

const SigninInputContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  flex-wrap: wrap;
  label {
    align-self: center;
  }
`;

const SigninTextInput = styled.input`
  border-radius: 4px;
  border: 1px solid #dedede;
  height: 2em;
  font-family: 'Assistant', sans-serif;
  font-size: 1em;
  outline: none;
  margin-left: 10px;
  margin-right: 10px;
`;

const ContinueButton = styled.button`
  height: 45px;
  border-radius: 4px;
  background-color: #ccc;
  border: none;
  justify-self: center;
  width: 100px;
  font-size: 1em;
  margin-bottom: 20px;
  outline: none;
  :active {
    background-color: #bbb;
  }
`;

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
    <Container>
      <PageHeading>Sign into your account</PageHeading>
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
          <ContinueButton type="submit">Sign In!</ContinueButton>
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
            <i>Forgot password?</i>
          </Link>
        </SigninForm>
      </SigninFormContainer>
    </Container>
  );
};

export default SignIn;
