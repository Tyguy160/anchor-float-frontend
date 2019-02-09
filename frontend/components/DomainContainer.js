import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from './ErrorMessage';

const USER_DOMAINS_QUERY = gql`
  query USER_DOMAINS_QUERY($first: Int) {
    domains(first: $first) {
      hostname
      id
      preferences {
        sitemapUrl
        contentSelector
        domain
      }
    }
  }
`;

const DomainContainer = props => {
  return (
    <Query query={USER_DOMAINS_QUERY} variables={{ first: 10 }}>
      {({ loading, data, error }) => {
        if (loading) {
          return <div>"Loading..."</div>;
        }
        if (error) {
          return <Error />;
        }
        console.log(data.domains);
        return (
          <div>
            <h2>Domains</h2>
            {data.domains.map(domain => (
              <div key={domain.id}>
                {domain.hostname}
                <p>{domain.preferences.sitemapUrl}</p>
              </div>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default DomainContainer;
