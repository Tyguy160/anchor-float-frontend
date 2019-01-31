import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const ADD_DOMAIN_MUTATION = gql`
  mutation ADD_DOMAIN_MUTATION($hostname: String!) {
    addDomain(hostname: $hostname) {
      id
    }
  }
`;

const DOMAIN_PAGES_QUERY = gql`
  query DOMAIN_PAGES_QUERY($hostname: String!) {
    pages(hostname: $hostname) {
      id
      url
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
                <option />
              </select>
            </label>
            {/* Create a new domain using this mutation and input box */}
            <Mutation
              mutation={ADD_DOMAIN_MUTATION}
              variables={this.state}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
              {(addDomain, { error, loading }) => (
                <form
                  method="post"
                  onSubmit={async e => {
                    e.preventDefault();
                    try {
                      const res = await addDomain();
                      console.log({ res });
                    } catch (err) {
                      console.log({ err });
                    }
                    this.setState({ hostname: '' });
                  }}>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <h3>Enter a domain</h3>
                    <Error error={error} />
                    <label htmlFor="addDomain">
                      Https://
                      <input
                        type="text"
                        name="hostname"
                        placeholder="mydomainname.com"
                        value={this.state.hostname}
                        onChange={this.saveToState}
                      />
                    </label>
                    <button type="submit">Add domain</button>
                  </fieldset>
                </form>
              )}
            </Mutation>
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
                    <div key={page.id}>{page.url}</div>
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
