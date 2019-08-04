import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';
const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const Container = styled.div``;
const PageHeading = styled.h2`
  text-align: center;
`;

const SigninFormContainer = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: grid;
  grid-template-rows: 1fr auto;
`;

const SigninForm = styled.form`
  display: grid;
  padding: 20px 0px 20px 0px;
  grid-gap: 15px;
  justify-content: center;
`;

const SigninInputContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  flex-wrap: wrap;
  label {
    align-self: center;
  }
`;

const SigninTextInput = styled.input`
  border-radius: 4px;
  border: 1px solid #dedede;
  height: 2em;
  font-family: 'Assistant', sans-serif;
  font-size: 1em;
  outline: none;
  margin-left: 10px;
  margin-right: 10px;
`;

const ContinueButton = styled.button`
  height: 45px;
  border-radius: 4px;
  background-color: #ccc;
  border: none;
  justify-self: center;
  width: 100px;
  font-size: 1em;
  margin-bottom: 20px;
  outline: none;
  :active {
    background-color: #bbb;
  }
`;

class SignIn extends Component {
  state = {
    name: '',
    password: '',
    email: '',
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        ignoreResults>
        {(signIn, { error, loading }) => (
          <Container>
            <PageHeading>Sign into your account</PageHeading>
            <SigninFormContainer>
              <SigninForm
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  try {
                    const res = await signIn();
                    console.log({ res });
                    Router.push({
                      pathname: '/dashboard',
                    });
                  } catch (err) {
                    console.log({ err });
                  }

                  this.setState({ name: '', email: '', password: '' });
                }}>
                <Error error={error} />
                <SigninInputContainer>
                  <label htmlFor="email">
                    Email
                    <SigninTextInput
                      type="email"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.saveToState}
                    />
                  </label>
                </SigninInputContainer>
                <SigninInputContainer>
                  <label htmlFor="password">
                    Password
                    <SigninTextInput
                      type="password"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.saveToState}
                    />
                  </label>
                </SigninInputContainer>
                <ContinueButton type="submit">Sign In!</ContinueButton>
              </SigninForm>
            </SigninFormContainer>
          </Container>
        )}
      </Mutation>
    );
  }
}

export default SignIn;
