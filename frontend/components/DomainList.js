import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  SignupForm,
  SignupFormContainer,
  SignupInputContainer,
  SignupTextInput,
  ContinueButton,
} from './styles/styles';

const USERSITES_QUERY = gql`
  query userSites {
    userSites {
      hostname
    }
  }
`;

const ADD_USERSITE_MUTATION = gql`
  mutation ADD_USERSITE_MUTATION($input: AddUserSiteInput!) {
    addUserSite(input: $input) {
      UserSite {
        hostname
      }
    }
  }
`;

const DomainList = props => {
  const [addDomain, setAddDomain] = useState('');
  const { loading: domainsLoading, data: userSites } = useQuery(
    USERSITES_QUERY
  );

  const [addUserSite] = useMutation(ADD_USERSITE_MUTATION, {
    variables: { input: { hostname: addDomain } },
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
      case 'ADD_DOMAIN':
        setAddDomain(value);
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
              <li key={site.hostname}>{site.hostname}</li>
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
              const res = await addUserSite(addDomain);
              setAddDomain('');
            } catch (err) {
              console.log({ err });
            }
          }}>
          <SignupInputContainer>
            <label htmlFor="addDomain">Domain</label>
            <SignupTextInput
              id="addDomainInput"
              name="addDomain"
              type="text"
              placeholder=""
              required
              value={addDomain}
              onChange={e => handleChange(e, 'ADD_DOMAIN')}
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
