import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import toasts from '../Misc/Toasts';
import { Formik } from 'formik';
import TextInput from '../Misc/TextInput';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().max(15, 'Must be 15 characters or less'),
  lastName: Yup.string().max(20, 'Must be 20 characters or less'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

import {
  StyledForm,
  CenteredHeading,
  FormContainer,
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
  const [signUp, { loading, error, data }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: ['me'],
  });

  const createAccount = async (values, e) => {
    // Get the submitted information
    const { firstName, lastName, email, password, confirmPassword } = values;

    if (password === confirmPassword) {
      // Call the mutation
      const res = await signUp({
        variables: {
          input: { firstName, lastName, email, password },
        },
      });

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

  return (
    <PageSection>
      <CenteredHeading>Register</CenteredHeading>
      <FormContainer>
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
            <StyledForm onSubmit={formik.handleSubmit}>
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
              <ContinueButton
                type="submit"
                disabled={formik.isSubmitting || loading}>
                Continue
              </ContinueButton>
            </StyledForm>
          )}
        </Formik>
      </FormContainer>
    </PageSection>
  );
};

export default Signup;
