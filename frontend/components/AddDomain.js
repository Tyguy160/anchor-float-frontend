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

class AddDomain extends Component {
  state = {
    hostname: '', //New hostname for domain creation
    // domain: '', //Domain that you are selecting and querying
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      /* Create a new domain using this mutation and input box */
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
    );
  }
}

export default AddDomain;
