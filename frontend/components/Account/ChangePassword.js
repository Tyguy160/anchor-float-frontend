// ! NOT WORKING YET

import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "../Misc/ErrorMessage";
import toasts from "../Misc/Toasts";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  FormContainer,
  CenteredH2,
  StyledForm,
  ContinueButton,
  PageSection
} from "../styles/styles";
import TextInput from "../Misc/TextInput";

const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string().required("Required"),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  )
});

const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION($input: UpdatePasswordInput!) {
    updateUserPassword(input: $input) {
      message
    }
  }
`;

const ChangePassword = () => {
  const [changePassword, { loading, error }] = useMutation(
    CHANGE_PASSWORD_MUTATION,
    {
      // variables: { input: { currentPassword, newPassword } },
      refetchQueries: ["me"]
    }
  );

  const handleChangePassword = async (values, e) => {
    console.log(`Changing password`);

    const { currentPassword, newPassword, confirmNewPassword } = values;
    try {
      if (newPassword === confirmNewPassword) {
        const res = await changePassword({
          variables: {
            input: {
              currentPassword,
              newPassword
            }
          }
        });

        if (res) {
          toasts.successMessage("Changed password successfully.");
        } else {
          toasts.errorMessage("Something went wrong...");
        }
      }
    } catch (err) {
      toasts.errorMessage(
        "Something went wrong...is your password correct? 😉"
      );
      console.log(err);
    }
  };

  return (
    <PageSection>
      <CenteredH2>Change Your Password</CenteredH2>
      <FormContainer style={{ border: `none` }}>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={(values, e) => {
            handleChangePassword(values, e);
          }}
        >
          {formik => (
            <StyledForm onSubmit={formik.handleSubmit}>
              <TextInput
                label="Current Password"
                name="currentPassword"
                type="password"
              />
              <TextInput
                label="New Password"
                name="newPassword"
                type="password"
              />
              <TextInput
                label="Confirm Password"
                name="confirmNewPassword"
                type="password"
              />
              {formik.status && formik.status.msg && (
                <div>{formik.status.msg}</div>
              )}
              <ContinueButton
                type="submit"
                disabled={formik.isSubmitting || loading}
              >
                Reset
              </ContinueButton>
            </StyledForm>
          )}
        </Formik>
      </FormContainer>
    </PageSection>
  );
};

export default ChangePassword;
