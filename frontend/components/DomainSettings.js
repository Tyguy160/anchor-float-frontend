import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { USERSITES_QUERY } from './resolvers/resolvers';

const DomainSettings = props => {
  const { data: userSites } = useQuery(USERSITES_QUERY);

  return (
    <div>
      <h2>Domain Settings</h2>
      <select defaultValue="">
        {userSites.userSites &&
          userSites.userSites.map(site => (
            <option key={site.hostname}>{site.hostname}</option>
          ))}
        <option disabled value="">
          Select a domain
        </option>
      </select>
      <h3>Scan frequency</h3>
    </div>
  );
};
export default DomainSettings;
