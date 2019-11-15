import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Error from '../Misc/ErrorMessage';
import Router from 'next/router';
import toasts from '../Misc/Toasts';
import { Formik, ErrorMessage, useField } from 'formik';
import styled from 'styled-components';

import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address`')
    .required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
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
    color: red;
    align-self: center;
    font-size: 0.75em;
  `;

  const TextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <SignupInputContainer>
        <label htmlFor={props.id || props.name}>{label}</label>
        <SignupTextInput className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <ErrorStyles className="error">{meta.error}</ErrorStyles>
        ) : null}
      </SignupInputContainer>
    );
  };

  const createAccount = async e => {
    // Prevent the form from submitting
    // e.preventDefault();
    console.log(e);
    return;

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
              <TextInput label="First Name" name="firstName" type="text" />
              <TextInput label="Last Name" name="lastName" type="text" />
              <TextInput label="Email" name="email" type="email" />
              <TextInput label="Password" name="password" type="password" />
              <TextInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />

              {formik.status && formik.status.msg && (
                <div>{formik.status.msg}</div>
              )}
              <ContinueButton type="submit" disabled={formik.isSubmitting}>
                Continue
              </ContinueButton>
            </SignupForm>
          )}
        </Formik>
      </SignupFormContainer>
    </PageSection>
  );
};

export default Signup;
