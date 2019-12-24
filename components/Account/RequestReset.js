import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Formik } from "formik";
import toasts from "../Misc/Toasts";
import {
  FormContainer,
  ContinueButton,
  CenteredHeading,
  PageSection,
  StyledForm
} from "../styles/styles";
import TextInput from "../Misc/TextInput";
import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Your email address is invalid")
    .required("Required")
});

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($input: RequestResetInput!) {
    requestReset(input: $input) {
      message
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

const RequestReset = props => {
  const [requestReset, { error, data }] = useMutation(
    REQUEST_RESET_MUTATION,
    {}
  );

  const handleResetRequest = async (values, e) => {
    const { email } = values;
    try {
      const res = await requestReset({
        variables: {
          input: {
            email
          }
        }
      });
      if (res) {
        toasts.successMessage("An email with reset instructions has been sent");
      }
    } catch (err) {
      toasts.errorMessage("Something went wrong...");
      console.log(err);
    }
  };

  return (
    <PageSection>
      <CenteredHeading>Reset your password</CenteredHeading>
      <FormContainer>
        <Formik
          initialValues={{
            email: ""
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={(values, e) => handleResetRequest(values, e)}
        >
          {formik => (
            <StyledForm onSubmit={formik.handleSubmit}>
              <TextInput label="Email" name="email" type="email"></TextInput>
              <ContinueButton value="Reset" type="submit" disabled={data}>
                Reset
              </ContinueButton>
            </StyledForm>
          )}
        </Formik>
        {/* 
        <SigninForm
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            try {
              await requestReset();
            } catch (err) {
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
                disabled={data}
              />
            </label>
          </SigninInputContainer>
          <ContinueButton value="Reset" type="submit" disabled={data} />
        </SigninForm> */}
      </FormContainer>
      <div style={{ textAlign: `center`, padding: `15px` }}>
        {data ? <i>A reset link has been sent to your email.</i> : ""}
      </div>
    </PageSection>
  );
};

export default RequestReset;
