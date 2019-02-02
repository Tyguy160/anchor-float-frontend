import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DOMAIN_PAGES_QUERY = gql`
  query DOMAIN_PAGES_QUERY($hostname: String!) {
    pages(hostname: $hostname) {
      id
      url
      pageTitle
    }
  }
`;

const DASHBOARD_INITIAL_LOAD = gql`
  query DASHBOARD_INITIAL_LOAD {
    me {
      id
      email
      name
      domains(first: 1) {
        id
        hostname
        pages(first: 20) {
          id
          url
          wordCount
        }
      }
    }
    domains {
      id
      hostname
    }
  }
`;

const DomainDataDisplay = props => {
  return (
    <div>
      <h3>Domain Data</h3>
      {props.data.me.domains.length ? (
        <Query
          query={DOMAIN_PAGES_QUERY}
          variables={{
            hostname: props.domain.length
              ? props.domain
              : props.data.me.domains[0].hostname,
          }}>
          {payload =>
            payload.data.pages.length ? (
              payload.data.pages.map(page => (
                <div key={page.id}>
                  <span>
                    <a href={page.url}>
                      Page {payload.data.pages.indexOf(page) + 1}
                    </a>
                    <div>Good: </div>
                    <div>3rd Party: </div>
                    <div>Unavailable: </div>
                  </span>
                </div>
              ))
            ) : (
              <div>
                No pages exist for this domain.
                <div>
                  Add one <button>here</button>
                </div>
              </div>
            )
          }
        </Query>
      ) : (
        'No data'
      )}
    </div>
  );
};

export default DomainDataDisplay;
