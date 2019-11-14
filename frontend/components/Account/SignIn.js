import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Error from '../Misc/ErrorMessage';
import Router from 'next/router';
import Link from 'next/link';
import toasts from '../Misc/Toasts';
import {
  SigninFormContainer,
  SigninForm,
  SigninInputContainer,
  SigninTextInput,
  ContinueButton,
  PageSection,
  CenteredHeading,
} from '../styles/styles';

import { Formik, ErrorMessage } from 'formik';

import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Your email address is invalid')
    .required('Required'),
});

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
      firstName
    }
  }
`;

const SignIn = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [signIn, { error }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: ['me'],
    variables: { input: { email, password } },
  });

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
              toasts.successMessage(`Welcome back!`);
              Router.push({
                pathname: '/dashboard',
              });
            } catch (err) {
              toasts.errorMessage('Something went wrong...');
              console.log(err);
            }
          }}>
          <SigninInputContainer>
            <label htmlFor="email">
              Email
              <SigninTextInput
                type="email"
                name="email"
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
          <ContinueButton type="submit" value="Sign In!">
            Sign In!
          </ContinueButton>
          <Link href="/request-reset">
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
