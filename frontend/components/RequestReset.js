import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Router from 'next/router';
import styled from 'styled-components';

import {
  Container,
  SigninFormContainer,
  SigninForm,
  SigninInputContainer,
  SigninTextInput,
  ContinueButton,
  CenteredHeading,
  PageSection,
} from './styles/styles';

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
    <PageSection>
      <CenteredHeading>Reset your password</CenteredHeading>
      <SigninFormContainer>
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
          <ContinueButton value="Reset" type="submit" disabled={data} />
        </SigninForm>
      </SigninFormContainer>
      <div style={{ textAlign: `center`, padding: `15px` }}>
        {data ? <i>A reset link has been sent to your email.</i> : ''}
      </div>
    </PageSection>
  );
};

export default RequestReset;
