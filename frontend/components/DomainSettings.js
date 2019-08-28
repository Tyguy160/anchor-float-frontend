import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  USERSITES_QUERY,
  UPDATE_USERSITE_MUTATION,
  DELETE_USERSITE_MUTATION,
} from './resolvers/resolvers';
import {
  PageSection,
  SignupFormContainer,
  SignupForm,
  SignupInputContainer,
  SignupTextInput,
  ContinueButton,
} from './styles/styles';

const DomainSettings = props => {
  const [domain, setDomain] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [scanFreq, setScanFreq] = useState('7');
  const [minimumReview, setMinimumReview] = useState('3');
  const { data: userSites } = useQuery(USERSITES_QUERY);

  const [deleteUserSite] = useMutation(DELETE_USERSITE_MUTATION, {
    variables: { input: { hostname: domain } },
    refetchQueries: ['userSites'],
  });

  const [updateUserSite] = useMutation(UPDATE_USERSITE_MUTATION, {
    variables: {
      input: {
        hostname: domain,
        associatesApiKey: apiKey,
        scanFreq,
        minimumReview,
      },
    },
    refetchQueries: ['userSites'],
  });

  const handleChange = (e, hookType) => {
    const { name, value, type } = e.target;
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
      case 'SCAN_FREQ':
        setScanFreq(value);
        break;
      case 'MIN_REVIEW':
        setMinimumReview(value);
        break;
    }
  };

  return (
    <PageSection>
      <h2>Domain Settings</h2>
      <SignupFormContainer>
        <SignupForm
          id="domainSettingsForm"
          onSubmit={async e => {
            e.preventDefault();
            updateUserSite(domain, apiKey, scanFreq, minimumReview);
          }}>
          <SignupInputContainer>
            <select
              defaultValue=""
              onChange={e => {
                const selectedSite = userSites.userSites.find(
                  userSite => userSite.hostname === e.target.value
                );
                setDomain(selectedSite.hostname);
                setApiKey(selectedSite.associatesApiKey);
                setScanFreq(selectedSite.scanFreq);
                setMinimumReview(selectedSite.minimumReview);
              }}>
              {userSites.userSites &&
                userSites.userSites.map(site => (
                  <option key={site.hostname}>{site.hostname}</option>
                ))}
              <option disabled value="">
                Select a domain
              </option>
            </select>
            {/* Delete domain */}
            <div>
              Site{' '}
              <button
                onClick={async e => {
                  e.preventDefault();
                  try {
                    const res = await deleteUserSite();
                    console.log('deleted a site');
                  } catch (err) {
                    console.log({ err });
                  }
                }}>
                delete
              </button>
            </div>
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="domain">Domain name</label>
            <SignupTextInput
              id="domainInput"
              name="domain"
              type="text"
              placeholder=""
              required
              value={domain}
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
              value={apiKey}
              onChange={e => handleChange(e, 'API_KEY')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="scanFreq">
              Scan Frequency: every <b>{scanFreq}</b> days
            </label>
            <SignupTextInput
              id="scanFreqInput"
              name="scanFreq"
              type="range"
              min="1"
              max="14"
              required
              value={scanFreq}
              onChange={e => handleChange(e, 'SCAN_FREQ')}
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
          {/* <SignupInputContainer>
            <label htmlFor="">Default domain on dashboard?</label>
            <SignupTextInput
              id="scanFreqInput"
              name="scanFreq"
              type="checkbox"
              required
              value={0}
              onChange={e => handleChange(e, 'SCAN_FREQ')}
            />
          </SignupInputContainer> */}
          <ContinueButton
            type="submit"
            value="Save"
            form="domainSettingsForm"
          />
        </SignupForm>
      </SignupFormContainer>
      {/* Update domain, scan freq, API key, minimum review, mark-as-default domain on dashboard */}
    </PageSection>
  );
};
export default DomainSettings;
