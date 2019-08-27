import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  USERSITES_QUERY,
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
  const { data: userSites } = useQuery(USERSITES_QUERY);

  const [deleteUserSite] = useMutation(DELETE_USERSITE_MUTATION, {
    variables: { input: { hostname: domain } },
    refetchQueries: ['userSites'],
  });
  return (
    <PageSection>
      <h2>Domain Settings</h2>
      <SignupFormContainer>
        <SignupForm
          id="urlForm"
          onSubmit={async e => {
            e.preventDefault();
            if (newPassword === confirmNewPassword) {
              try {
                changePassword(currentPassword, newPassword);
                console.log('Password changed');
              } catch (err) {
                console.log({ err });
              }
            } else {
              console.log("Your new passwords don't match 🤷‍");
            }
          }}>
          <SignupInputContainer>
            <select
              defaultValue=""
              onClick={e => {
                setDomain(e.target.value);
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
            <label htmlFor="">API Key</label>
            <SignupTextInput
              id=""
              name=""
              type=""
              placeholder=""
              required
              value={'rewtr33'}
              // onChange={e => handleChange(e, 'CURRENT_PASSWORD')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="">Domain name</label>
            <SignupTextInput
              id=""
              name=""
              type=""
              placeholder=""
              required
              value={'triplebarcoffee.com'}
              // onChange={e => handleChange(e, 'CURRENT_PASSWORD')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="">Minimum review</label>
            <SignupTextInput
              id="scanFreqInput"
              name="scanFreq"
              type="range"
              min="1"
              max="5"
              step="0.5"
              required
              value={3.5}
              onChange={e => handleChange(e, 'SCAN_FREQ')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="">Scan frequency</label>
            <SignupTextInput
              id="scanFreqInput"
              name="scanFreq"
              type="range"
              min="1"
              max="14"
              required
              value={0}
              onChange={e => handleChange(e, 'SCAN_FREQ')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="">Default domain on dashboard?</label>
            <SignupTextInput
              id="scanFreqInput"
              name="scanFreq"
              type="checkbox"
              required
              value={0}
              onChange={e => handleChange(e, 'SCAN_FREQ')}
            />
          </SignupInputContainer>
          <ContinueButton type="submit" value="Save" form="urlForm" />
        </SignupForm>
      </SignupFormContainer>
      {/* Update domain, scan freq, API key, minimum review, mark-as-default domain on dashboard */}
    </PageSection>
  );
};
export default DomainSettings;
