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
  ComponentContainer,
  CenteredH2,
} from '../styles/styles';

const AddDomain = props => {
  const [domain, setDomain] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [minimumReview, setMinimumReview] = useState(3);

  const { loading: userLoading, data: user } = useQuery(GET_CURRENT_USER);

  const [addUserSite] = useMutation(ADD_USERSITE_MUTATION, {
    variables: { input: { hostname: domain, apiKey, minimumReview } },
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
      case 'MIN_REVIEW':
        setMinimumReview(parseFloat(value));
        break;
    }
  };

  return (
    <PageSection>
      <ComponentContainer>
        <CenteredH2>Add A Domain</CenteredH2>
        <SignupForm
          id="addDomainForm"
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            try {
              const res = await addUserSite();
              setDomain('');
              setApiKey('');
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
      </ComponentContainer>
    </PageSection>
  );
};

export default AddDomain;
