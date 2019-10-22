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
  const [hostname, setHostname] = useState('');
  const [associatesApiKey, setAssociatesApiKey] = useState('');
  const [minimumReview, setMinimumReview] = useState();

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
        hostname: props.selectedUserSite
          ? props.selectedUserSite.hostname
          : null,
        associatesApiKey,
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
        setAssociatesApiKey(value);
        break;
      case 'MIN_REVIEW':
        setMinimumReview(parseFloat(value));
        break;
    }
  };

  return (
    <ComponentContainer>
      <CenteredH2>Domain Settings</CenteredH2>
      <SignupForm
        id="domainSettingsForm"
        onSubmit={async e => {
          e.preventDefault();
          await updateUserSite();
          props.setSelectedUserSite();
        }}>
        {props.selectedUserSite ? (
          <>
            <SignupInputContainer>
              <label htmlFor="domain">Domain name</label>
              <SignupTextInput
                id="domainInput"
                name="domain"
                type="text"
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
                // placeholder={props.selectedUserSite.associatesApiKey}
                required
                value={associatesApiKey}
                placeholder={props.selectedUserSite.associatesApiKey}
                onChange={e => handleChange(e, 'API_KEY')}
              />
            </SignupInputContainer>
            <SignupInputContainer>
              <label htmlFor="minimumReview">Minimum Review:</label>

              <SignupTextInput
                id="minimumReviewInput"
                name="minimumReview"
                type="number"
                required
                placeholder={props.selectedUserSite.minimumReview}
                value={minimumReview}
                onChange={e => handleChange(e, 'MIN_REVIEW')}
              />
              <p style={{ fontSize: `0.8em` }}>
                <i>
                  Current minimum review:{' '}
                  <b>{props.selectedUserSite.minimumReview} </b>stars
                </i>
              </p>
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
                  props.setSelectedUserSite(null);
                } catch (err) {
                  console.log(err);
                }
              }}>
              Delete Site
            </DeleteButton>
          </>
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
      </SignupForm>
    </ComponentContainer>
  );
};
export default DomainSettings;
