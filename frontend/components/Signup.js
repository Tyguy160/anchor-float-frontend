import React, { useState } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Error from './ErrorMessage';
import Router from 'next/router';

import {
  SignupForm,
  CenteredHeading,
  SignupFormContainer,
  SignupInputContainer,
  SignupTextInput,
  ContinueButton,
  PageSection,
} from './styles/styles';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($input: SignUpInput!) {
    signUp(input: $input) {
      id
      email
    }
  }
`;

const Signup = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [signUp, { error, data }] = useMutation(SIGNUP_MUTATION, {
    variables: { input: { email, password, firstName, lastName } },
    refetchQueries: ['me'],
  });

  const createAccount = async e => {
    // Prevent the form from submitting
    e.preventDefault();

    if (password === confirmPassword) {
      // Call the mutation
      const res = await signUp();

      if (res) {
        console.log('Created account');
        Router.push({
          pathname: '/dashboard',
        });
      }
    } else {
      console.log("Didn't work 🤷‍");
    }
  };

  const handleChange = (e, hookType) => {
    const { name, value, type } = e.target;
    switch (hookType) {
      case 'FIRST_NAME':
        setFirstName(value);
        break;
      case 'LAST_NAME':
        setLastName(value);
        break;
      case 'EMAIL':
        setEmail(value);
        break;
      case 'PASSWORD':
        setPassword(value);
        break;
      case 'CONFIRM_PASSWORD':
        setConfirmPassword(value);
        break;
    }
  };

  return (
    <PageSection handleChange={handleChange}>
      <CenteredHeading>Register</CenteredHeading>
      <SignupFormContainer>
        {/* <ErrorMessage error={props.error} /> */}
        <SignupForm id="urlForm" onSubmit={e => createAccount(e)}>
          <SignupInputContainer>
            <label htmlFor="firstName">First Name</label>
            <SignupTextInput
              id="firstName"
              name="firstName"
              type="text"
              placeholder=""
              required
              value={firstName}
              onChange={e => handleChange(e, 'FIRST_NAME')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="lastName">Last Name</label>
            <SignupTextInput
              id="lastName"
              name="lastName"
              type="text"
              placeholder=""
              required
              value={lastName}
              onChange={e => handleChange(e, 'LAST_NAME')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="email">Email Address</label>
            <SignupTextInput
              id="email"
              name="email"
              type="text"
              placeholder=""
              required
              value={email}
              onChange={e => handleChange(e, 'EMAIL')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="password">Password</label>
            <SignupTextInput
              id="password"
              name="password"
              type="password"
              placeholder=""
              required
              value={password}
              onChange={e => handleChange(e, 'PASSWORD')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <SignupTextInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder=""
              required
              value={confirmPassword}
              onChange={e => handleChange(e, 'CONFIRM_PASSWORD')}
            />
          </SignupInputContainer>
          <ContinueButton type="submit" value="Continue" form="urlForm" />
        </SignupForm>
      </SignupFormContainer>
      <Error error={error} />
    </PageSection>
  );
};

export default Signup;
