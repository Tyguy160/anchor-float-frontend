import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../components/ErrorMessage';
import signup from '../pages/signup';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      id
    }
  }
`;

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  createAccount = async (e, signup) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Call the mutation
    const res = await signup();

    console.log(res.data);
    console.log('Created account');
  };

  handleChange = e => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { loading, error }) => (
          <form onSubmit={e => this.createAccount(e, signup)}>
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full name"
                  required
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Sign Up</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };
