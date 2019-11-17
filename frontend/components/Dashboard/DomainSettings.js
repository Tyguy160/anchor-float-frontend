import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import toasts from '../Misc/Toasts';
import { Formik } from 'formik';
import {
  USERSITES_QUERY,
  UPDATE_USERSITE_MUTATION,
  DELETE_USERSITE_MUTATION,
} from '../resolvers/resolvers';
import {
  FormContainer,
  StyledForm,
  FormInput,
  ContinueButton,
  DeleteButton,
  ComponentContainer,
  CenteredH2,
  FormInputContainer,
} from '../styles/styles';
import TextInput from '../Misc/TextInput';

const DomainSettings = props => {
  const [deleteUserSite] = useMutation(DELETE_USERSITE_MUTATION, {
    variables: {
      input: {
        hostname: props.selectedUserSite
          ? props.selectedUserSite.hostname
          : null,
      },
    },
    refetchQueries: ['userSites'],
  });

  const [updateUserSite, { loading }] = useMutation(UPDATE_USERSITE_MUTATION, {
    refetchQueries: ['userSites'],
  });

  const updateDomain = async (values, e) => {
    const { domain, apiKey, minimumReview } = values;
    console.log(values);
    try {
      await updateUserSite({
        variables: {
          input: {
            hostname: domain,
            associatesApiKey: apiKey,
            minimumReview,
            runningReport: false,
          },
        },
      });

      toasts.successMessage('Domain has been updated.');

      // TODO: Reset the selected userSite
      props.setSelectedUserSite(null);
    } catch (err) {
      console.log(err);
      toasts.errorMessage('There was an error updating this domain.');
    }
  };

  return (
    <ComponentContainer>
      <CenteredH2>Domain Settings</CenteredH2>
      {props.selectedUserSite ? (
        <FormContainer style={{ border: `none` }}>
          {console.log(props.selectedUserSite)}
          <Formik
            initialValues={{
              domain: props.selectedUserSite
                ? props.selectedUserSite.hostname
                : '',
              apiKey: props.selectedUserSite
                ? props.selectedUserSite.associatesApiKey
                : '',
              minimumReview: props.selectedUserSite
                ? props.selectedUserSite.minimumReview
                : '',
            }}
            // TODO: Add a validation schema
            // validationSchema={SignupSchema}
            enableReinitialize={true}
            onSubmit={(values, e) => updateDomain(values, e)}>
            {formik => (
              <StyledForm onSubmit={formik.handleSubmit}>
                <TextInput
                  disabled
                  label="Domain"
                  name="domain"
                  type="text"></TextInput>
                <TextInput
                  label="API Key"
                  name="apiKey"
                  type="text"></TextInput>
                <TextInput
                  label="Min. Review"
                  name="minimumReview"
                  type="number"></TextInput>
                {formik.status && formik.status.msg && (
                  <div>{formik.status.msg}</div>
                )}
                <FormInput
                  style={{
                    display: `grid`,
                    gridTemplateColumns: `1fr 1fr`,
                    justifySelf: `center`,
                    paddingTop: `10px`,
                  }}>
                  <ContinueButton
                    type="submit"
                    disabled={formik.isSubmitting || loading}>
                    Save
                  </ContinueButton>
                  <DeleteButton
                    onClick={async e => {
                      e.preventDefault();
                      try {
                        const res = await deleteUserSite();
                        props.setSelectedUserSite(null);
                        toasts.successMessage('Domain has been deleted.');
                      } catch (err) {
                        console.log(err);
                      }
                    }}>
                    Delete Site
                  </DeleteButton>
                </FormInput>
              </StyledForm>
            )}
          </Formik>
        </FormContainer>
      ) : (
        <p
          style={{
            justifySelf: `center`,
            alignSelf: `center`,
            paddingBottom: `40px`,
            paddingLeft: `10px`,
            paddingRight: `10px`,
            textAlign: `center`,
          }}>
          Please select a domain to see the settings
        </p>
      )}
    </ComponentContainer>
  );
};
export default DomainSettings;
