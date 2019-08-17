import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { USERSITES_QUERY, ADD_USERSITE_MUTATION } from './resolvers/resolvers';

import {
  SignupForm,
  SignupFormContainer,
  SignupInputContainer,
  SignupTextInput,
  ContinueButton,
} from './styles/styles';

const DomainList = props => {
  const [domain, setDomain] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [scanFreq, setScanFreq] = useState('7');
  const { loading: domainsLoading, data: userSites } = useQuery(
    USERSITES_QUERY
  );

  const [addUserSite] = useMutation(ADD_USERSITE_MUTATION, {
    variables: { input: { hostname: domain, apiKey, scanFreq } },
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
    }
  };

  return (
    <div>
      <h2>Domains</h2>
      {domainsLoading ? <div>Loading...</div> : <div />}
      {console.log(userSites)}
      {userSites.userSites && (
        <div>
          <ul>
            {userSites.userSites.map(site => (
              <li key={site.hostname}>
                {site.hostname} - Every {site.scanFreq} days
              </li>
            ))}
          </ul>
        </div>
      )}
      <SignupFormContainer>
        <SignupForm
          id="addDomainForm"
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            try {
              const res = await addUserSite(domain);
              setDomain('');
              setApiKey('');
              setScanFreq(7);
            } catch (err) {
              console.log({ err });
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
          <ContinueButton
            type="submit"
            value="Add domain"
            form="addDomainForm"
          />
        </SignupForm>
      </SignupFormContainer>
    </div>
  );
};

export default DomainList;
