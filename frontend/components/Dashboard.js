import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import AddDomain from './AddDomain';

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

class Dashboard extends Component {
  state = {
    hostname: '', //New hostname for domain creation
    domain: '', //Domain that you are selecting and querying
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Query
        query={CURRENT_USER_QUERY}
        onCompleted={() => console.log('Completed the query')}>
        {({ data, error, loading }) => (
          <>
            <Error error={error} />
            <h2>Dashboard</h2>
            <label htmlFor="domains" onChange={this.saveToState}>
              <select name="domain" id="domain">
                {loading ? (
                  <option>Loading...</option>
                ) : data.me.domains.length ? (
                  data.me.domains.map(domain => (
                    <option key={domain.id}>{domain.hostname}</option>
                  ))
                ) : (
                  <option name="">No domains</option>
                )}
              </select>
            </label>
            <AddDomain
              hostname={this.state.hostname}
              onChange={this.saveToState}
            />
            <h3>Domain Data</h3>
            {data.me.domains.length ? (
              <Query
                query={DOMAIN_PAGES_QUERY}
                variables={{
                  hostname: this.state.domain.length
                    ? this.state.domain
                    : data.me.domains[0].hostname,
                }}>
                {payload =>
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
                }
              </Query>
            ) : (
              'No data'
            )}
          </>
        )}
      </Query>
    );
  }
}

export default Dashboard;
