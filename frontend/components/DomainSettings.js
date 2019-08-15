import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const USERSITES_QUERY = gql`
  query userSites {
    userSites {
      hostname
    }
  }
`;

const DomainSettings = props => {
  const { data: userSites } = useQuery(
    USERSITES_QUERY
  );

  return (
    <div>
      <h2>Domain Settings</h2>
      <select defaultValue="">
        {
          userSites.userSites &&
            userSites.userSites.map(site => <option key={site.hostname}>{site.hostname}</option>)
        }
        <option disabled value="">
          Select a domain
        </option>
      </select>
      <div>Scan frequency</div>
    </div>
  );
};
export default DomainSettings;
