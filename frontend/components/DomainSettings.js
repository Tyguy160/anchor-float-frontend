import React, { useState } from 'react';
import styled from 'styled-components';
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

const DomainSettings = props => {
  const { loading, error: userSitesError, data: userSites } = useQuery(
    USERSITES_QUERY
  );

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
      <h2>Domain Settings</h2>
      <select>
        {userSites.userSites ? (
          userSites.userSites.map(site => <option>{site.hostname}</option>)
        ) : (
          <option />
        )}
        <option selected disabled value="">
          Select a domain
        </option>
      </select>
      <div>Scan frequency</div>
    </div>
  );
};
export default DomainSettings;
