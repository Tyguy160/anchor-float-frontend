import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "../Misc/ErrorMessage";
import Router from "next/router";
import Link from "next/link";
import toasts from "../Misc/Toasts";

import TextInput from "../Misc/TextInput";

import {
  FormContainer,
  StyledForm,
  ContinueButton,
  PageSection,
  CenteredHeading
} from "../styles/styles";

import { Formik } from "formik";

import * as Yup from "yup";

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Your email address is invalid")
    .required("Required"),
  password: Yup.string().required("Required")
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
  const [signIn, { error }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: ["me"]
  });

  const signInToAccount = async (values, e) => {
    const { email, password } = values;
    try {
      const res = await signIn({
        variables: {
          input: { email, password }
        }
      });
      if (res) {
        toasts.successMessage(`Welcome back!`);
        Router.push({
          pathname: "/dashboard"
        });
      }
    } catch (err) {
      toasts.errorMessage("Something went wrong...");
      console.log(err);
    }
  };

  return (
    <PageSection>
      <CenteredHeading>Sign into your account</CenteredHeading>
      <FormContainer>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={SigninSchema}
          onSubmit={(values, e) => signInToAccount(values, e)}
        >
          {formik => (
            <StyledForm onSubmit={formik.handleSubmit}>
              <TextInput label="Email" name="email" type="email"></TextInput>
              <TextInput label="Password" name="password" type="password" />
              <ContinueButton type="submit" value="Sign In!">
                Sign In!
              </ContinueButton>
              <Link href="/request-reset">
                <i style={{ textAlign: `center`, cursor: `pointer` }}>
                  Forgot password?
                </i>
              </Link>
            </StyledForm>
          )}
        </Formik>
      </FormContainer>
    </PageSection>
  );
};

export default SignIn;
