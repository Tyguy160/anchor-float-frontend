import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  USERSITES_QUERY,
  DELETE_USERSITE_MUTATION,
} from './resolvers/resolvers';
import { PageSection, SignupFormContainer } from './styles/styles';

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
      </SignupFormContainer>
      {/* Update domain, scan freq, API key, minimum review */}
    </PageSection>
  );
};
export default DomainSettings;
