import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';
import styled from 'styled-components';

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

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($input: RequestResetInput!) {
    requestReset(input: $input) {
      message
    }
  }
`;

const GET_CURRENT_USER = gql`
  query me {
    me {
      id
    }
  }
`;

const RequestReset = props => {
  const [email, setEmail] = useState('');

  const [requestReset, { error, data }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: { input: { email } },
  });
  return (
    <Container>
      <PageHeading>Reset your password</PageHeading>
      <SigninFormContainer>
        <div style={{ textAlign: `center`, paddingTop: `15px` }}>
          {data ? <i>A reset link has been sent to your email.</i> : <i />}
        </div>
        <SigninForm
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            try {
              const res = await requestReset();
            } catch (err) {
              console.log({ err });
            }
          }}>
          {/* <Error error={error} /> */}
          <SigninInputContainer>
            <label htmlFor="email">
              Email
              <SigninTextInput
                type="email"
                name="email"
                // placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={data}
              />
            </label>
          </SigninInputContainer>
          <ContinueButton type="submit" disabled={data}>
            Reset
          </ContinueButton>
        </SigninForm>
      </SigninFormContainer>
    </Container>
  );
};

export default RequestReset;
