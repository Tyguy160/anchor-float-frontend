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

class Dashboard extends Component {
  state = {
    hostname: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, error, loading }) => (
          <>
            <Error error={error} />
            <h2>Dashboard</h2>
            <label htmlFor="domains">
              <select name="domain" id="domain">
                {loading ? (
                  <option>Loading...</option>
                ) : data.me.domains.length ? (
                  data.me.domains.map(domain => (
                    <option key={domain.id}>{domain.hostname}</option>
                  ))
                ) : (
                  <option>No domains</option>
                )
                //   data.me.domains ? (
                //     /*data.me.domains.map(domain => {
                //       <option>{domain.hostname}</option>;
                //     })*/ <option>
                //       test
                //     </option>
                //   )
                }
              </select>
            </label>
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
          </>
        )}
      </Query>
    );
  }
}

export default Dashboard;
