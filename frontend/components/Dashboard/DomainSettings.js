import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import {
  USERSITES_QUERY,
  UPDATE_USERSITE_MUTATION,
  DELETE_USERSITE_MUTATION,
} from '../resolvers/resolvers';
import {
  PageSection,
  SignupFormContainer,
  SignupForm,
  SignupInputContainer,
  SignupTextInput,
  ContinueButton,
  DeleteButton,
  ComponentContainer,
  CenteredH2,
} from '../styles/styles';

const DomainSettings = props => {
  const [apiKey, setApiKey] = useState();
  const [minimumReview, setMinimumReview] = useState(
    props.selectedUserSite ? props.selectedUserSite.minimumReview : ''
  );

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

  const [updateUserSite] = useMutation(UPDATE_USERSITE_MUTATION, {
    variables: {
      input: {
        hostname: props.selectedDomain ? props.selectedDomain.value : null,
        associatesApiKey: apiKey,
        minimumReview,
      },
    },
    refetchQueries: ['userSites'],
  });

  const handleChange = (e, hookType) => {
    const { value } = e.target;
    switch (hookType) {
      case 'NEW_PASSWORD':
        setPassword(value);
        break;
      case 'CONFIRM_NEW_PASSWORD':
        setConfirmPassword(value);
        break;
      case 'DOMAIN':
        setDomain(value);
        break;
      case 'API_KEY':
        setApiKey(value);
        break;
      case 'MIN_REVIEW':
        setMinimumReview(parseFloat(value));
        break;
    }
  };

  return (
    <PageSection>
      <ComponentContainer>
        <CenteredH2>Domain Settings</CenteredH2>
        <SignupForm
          id="domainSettingsForm"
          onSubmit={async e => {
            e.preventDefault();
            updateUserSite(
              props.selectedUserSite.hostname,
              props.selectedUserSite.associatesApiKey,
              minimumReview
            );
          }}>
          {props.selectedUserSite ? (
            <>
              <SignupInputContainer>
                <label htmlFor="domain">Domain name</label>
                <SignupTextInput
                  id="domainInput"
                  name="domain"
                  type="text"
                  placeholder=""
                  required
                  value={props.selectedUserSite.hostname}
                  disabled
                />
              </SignupInputContainer>
              <SignupInputContainer>
                <label htmlFor="apiKey">API Key</label>
                <SignupTextInput
                  id="apiKeyInput"
                  name="apiKey"
                  type="text"
                  placeholder=""
                  required
                  defaultValue={
                    props.selectedUserSite
                      ? props.selectedUserSite.associatesApiKey
                      : ''
                  }
                  onChange={e => handleChange(e, 'API_KEY')}
                />
              </SignupInputContainer>
              <SignupInputContainer>
                <label htmlFor="minimumReview">
                  Minimum Review: <b>{minimumReview}</b> stars
                </label>
                <SignupTextInput
                  id="minimumReviewInput"
                  name="minimumReview"
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  required
                  value={minimumReview}
                  onChange={e => handleChange(e, 'MIN_REVIEW')}
                />
              </SignupInputContainer>
              <ContinueButton
                type="submit"
                value="Save"
                form="domainSettingsForm">
                Update Site
              </ContinueButton>
              <DeleteButton
                onClick={async e => {
                  e.preventDefault();
                  try {
                    const res = await deleteUserSite();
                    props.setSelectedDomain(null);
                  } catch (err) {
                    console.log(err);
                  }
                }}>
                Delete Site
              </DeleteButton>
            </>
          ) : (
            <p>Please select a domain to see the settings</p>
          )}
        </SignupForm>
        {/* </SignupFormContainer> */}
      </ComponentContainer>
    </PageSection>
  );
};
export default DomainSettings;
