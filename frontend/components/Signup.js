import React, { useState } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import ErrorMessage from './ErrorMessage';
import Router from 'next/router';

const Container = styled.div``;

const PageHeading = styled.h2`
  text-align: center;
`;

const SignupFormContainer = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: grid;
  grid-template-rows: 1fr auto;
`;

const SignupForm = styled.form`
  display: grid;
  padding: 20px 0px 20px 0px;
  grid-gap: 15px;
  justify-content: center;
`;

const ContinueButton = styled.input`
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

const SignupInputContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  flex-wrap: wrap;
  label {
    align-self: center;
  }
`;

const SignupTextInput = styled.input`
  border-radius: 4px;
  border: 1px solid #dedede;
  height: 2em;
  font-family: 'Assistant', sans-serif;
  font-size: 1em;
  outline: none;
  margin-left: 10px;
  margin-right: 10px;
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($input: SignUpInput!) {
    signUp(input: $input) {
      id
      email
    }
  }
`;

const Signup = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [signUp, { error, data }] = useMutation(SIGNUP_MUTATION, {
    variables: { input: { email, password } },
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
      case 'NAME':
        setName(value);
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
    <Container handleChange={handleChange}>
      <PageHeading>Register</PageHeading>
      <SignupFormContainer>
        <ErrorMessage error={props.error} />
        <SignupForm id="urlForm" onSubmit={e => createAccount(e)}>
          <SignupInputContainer>
            <label htmlFor="name">Name</label>
            <SignupTextInput
              id="name"
              name="name"
              type="text"
              placeholder=""
              required
              value={name}
              onChange={e => handleChange(e, 'NAME')}
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
        </SignupForm>
        <ContinueButton type="submit" value="Continue" form="urlForm" />
      </SignupFormContainer>
    </Container>
  );
};

export default Signup;
export { Container, PageHeading, SignupFormContainer, ContinueButton };
