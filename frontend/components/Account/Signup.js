import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Error from '../Misc/ErrorMessage';
import Router from 'next/router';
import toasts from '../Misc/Toasts';
import { Formik, ErrorMessage } from 'formik';
import styled from 'styled-components';

import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
<<<<<<< HEAD
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address`')
    .required('Required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
=======
  email: Yup.string()
    .email('Your email address is invalid')
    .required('Required'),
>>>>>>> 6ab1372b6b5e70f80fe6dd175391a76edfacc5c1
});

import {
  SignupForm,
  CenteredHeading,
  SignupFormContainer,
  SignupInputContainer,
  SignupTextInput,
  ContinueButton,
  PageSection,
} from '../styles/styles';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($input: SignUpInput!) {
    signUp(input: $input) {
      id
      email
    }
  }
`;

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [signUp, { loading, error, data }] = useMutation(SIGNUP_MUTATION, {
    variables: { input: { email, password, firstName, lastName } },
    refetchQueries: ['me'],
  });

  const ErrorStyles = styled.div`
    padding: 2rem;
    background: white;
    margin: 2rem 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-left: 5px solid red;
    p {
      margin: 0;
      font-weight: 100;
    }
    strong {
      margin-right: 1rem;
    }
  `;

  const createAccount = async e => {
    // Prevent the form from submitting
    // e.preventDefault();

    if (password === confirmPassword) {
      // Call the mutation
      const res = await signUp();

      if (res) {
        toasts.successMessage('Account created');
        Router.push({
          pathname: '/plans',
        });
      } else {
        toasts.errorMessage('Something went wrong...');
      }
    } else {
      console.log("Didn't work 🤷‍");
      toasts.errorMessage(`Your passwords don't match.`);
    }
  };

  const handleChange = (e, hookType) => {
    const { value } = e.target;
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
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, e) => createAccount(values, e)}>
          {formik => (
            <SignupForm onSubmit={formik.handleSubmit}>
              <SignupInputContainer>
                <label htmlFor="firstName">First Name</label>
                <SignupTextInput
                  id="firstName"
                  type="text"
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div>{formik.errors.firstName}</div>
                ) : null}
              </SignupInputContainer>
              <SignupInputContainer>
                <label htmlFor="lastName">Last Name</label>
                <SignupTextInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div>{formik.errors.lastName}</div>
                ) : null}
              </SignupInputContainer>
              <SignupInputContainer>
                <label htmlFor="email">Email</label>
                <SignupTextInput
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </SignupInputContainer>
              <SignupInputContainer>
                <label htmlFor="password">Password</label>
                <SignupTextInput
                  id="password"
                  name="password"
                  type="password"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </SignupInputContainer>
              <SignupInputContainer>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <SignupTextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  {...formik.getFieldProps('confirmPassword')}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div>{formik.errors.confirmPassword}</div>
                ) : null}
              </SignupInputContainer>
              {formik.status && formik.status.msg && (
                <div>{formik.status.msg}</div>
              )}
              <ContinueButton type="submit" disabled={formik.isSubmitting}>
                Continue
              </ContinueButton>
              {/* {console.log(errors.keys)}
              {Object.keys(errors).length ? (
                <ErrorStyles>
                  <strong>Shoot!</strong>
                  {Object.keys(errors).map((error, i) => (
                    <p key={i}>{errors[error]}</p>
                  ))}
                </ErrorStyles>
              ) : null} */}
            </SignupForm>
          )}
        </Formik>
        {/* <SignupForm id="urlForm" onSubmit={e => createAccount(e)}>
          <SignupInputContainer>
            <label htmlFor="firstName">First Name</label>
            <SignupTextInput
              id="firstName"
              name="firstName"
              type="text"
              placeholder=""
              required
              value={firstName}
              disabled={loading}
              aria-busy={loading}
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
              disabled={loading}
              aria-busy={loading}
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
              disabled={loading}
              aria-busy={loading}
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
              disabled={loading}
              aria-busy={loading}
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
              disabled={loading}
              aria-busy={loading}
              onChange={e => handleChange(e, 'CONFIRM_PASSWORD')}
            />
          </SignupInputContainer>
          <ContinueButton type="submit" form="urlForm">
            Continue
          </ContinueButton>
        </SignupForm> */}
      </SignupFormContainer>
      {/* <Error error={error} /> */}
    </PageSection>
  );
};

export default Signup;
