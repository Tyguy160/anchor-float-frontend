import React, { useState } from 'react';
import Error from '../Misc/ErrorMessage';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  GET_CURRENT_USER,
  USERSITES_QUERY,
  ADD_USERSITE_MUTATION,
} from '../resolvers/resolvers';

import {
  SignupForm,
  SignupFormContainer,
  SignupInputContainer,
  SignupTextInput,
  ContinueButton,
  PageSection,
} from '../styles/styles';

const AddDomain = props => {
  const [domain, setDomain] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [scanFreq, setScanFreq] = useState('7');
  const [minimumReview, setMinimumReview] = useState('3');
  const { loading: domainsLoading, data: userSites } = useQuery(
    USERSITES_QUERY
  );

  const { loading: userLoading, data: user } = useQuery(GET_CURRENT_USER);

  const [addUserSite] = useMutation(ADD_USERSITE_MUTATION, {
    variables: { input: { hostname: domain, apiKey, scanFreq, minimumReview } },
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

  const getSubscription = sub => {
    switch (sub) {
      case '0':
        return { type: 'free', sites: 1 };
        break;
      case '1':
        return { type: 'Basic', sites: 3 };
        break;
      case '2':
        return { type: 'Standard', sites: 5 };
        break;
      case '3':
        return { type: 'Advanced', sites: 10 };
        break;
    }
  };

  const sub = user.me && getSubscription(user.me.subscriptionLevel);

  return (
    <PageSection>
      <h2>Add A Domain</h2>
      {/* {userSites.userSites ? (
        <p>
          Your <b>{user.me.plan.name}</b> subscription lets you add{' '}
          <b>
            {user.me.plan.siteLimit}{' '}
            {user.me.plan.siteLimit > 1 ? ' domains ' : 'domain '}
          </b>
          . You have{' '}
          <b>
            {user.me.plan.siteLimit - userSites.userSites.length}{' '}
            {user.me.plan.siteLimit - userSites.userSites.length === 1
              ? ' domain '
              : 'domains '}
          </b>{' '}
          remaining.
        </p>
      ) : (
        ''
      )} */}
      <SignupFormContainer>
        <SignupForm
          id="addDomainForm"
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            try {
              const res = await addUserSite();
              setDomain('');
              setApiKey('');
              setScanFreq('7');
            } catch (err) {
              console.log(err);
            }
          }}>
          <SignupInputContainer>
            <label htmlFor="domain">Domain</label>
            <SignupTextInput
              id="domainInput"
              name="domain"
              type="text"
              placeholder=""
              required
              value={domain}
              onChange={e => handleChange(e, 'DOMAIN')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="apiKey">Amazon API Key</label>
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
          <ContinueButton type="submit" value="Add domain" form="addDomainForm">
            Add domain
          </ContinueButton>
        </SignupForm>
      </SignupFormContainer>
    </PageSection>
  );
};

export default AddDomain;
