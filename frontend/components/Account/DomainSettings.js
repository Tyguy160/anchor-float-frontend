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
} from '../styles/styles';

const DomainSettings = () => {
  const [domain, setDomain] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [scanFreq, setScanFreq] = useState('7');
  const [minimumReview, setMinimumReview] = useState('3');
  const [selectedDomain, setSelectedDomain] = useState('select');
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
              value={selectedDomain}
              onChange={e => {
                const selectedSite = userSites.userSites.find(
                  userSite => userSite.hostname === e.target.value
                );
                setDomain(selectedSite.hostname);
                setSelectedDomain(selectedSite.hostname);
                setApiKey(selectedSite.associatesApiKey);
                setScanFreq(selectedSite.scanFreq);
                setMinimumReview(selectedSite.minimumReview);
              }}>
              {userSites.userSites &&
                userSites.userSites.map(site => (
                  <option key={site.hostname}>{site.hostname}</option>
                ))}
              <option disabled default value="select">
                Select a domain
              </option>
            </select>
            <div>
              <button
                onClick={async e => {
                  e.preventDefault();
                  try {
                    const res = await deleteUserSite();
                    setSelectedDomain('select');
                  } catch (err) {
                    console.log(err);
                  }
                }}>
                delete
              </button>
            </div>
          </SignupInputContainer>
          {selectedDomain != 'select' ? (
            <>
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
              <ContinueButton
                type="submit"
                value="Save"
                form="domainSettingsForm"
              />
            </>
          ) : (
            <p>Please select a domain to see the settings</p>
          )}
        </SignupForm>
      </SignupFormContainer>
    </PageSection>
  );
};
export default DomainSettings;
