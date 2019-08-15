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
