import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  FormContainer,
  SigninForm,
  SigninInputContainer,
  SigninTextInput,
  ContinueButton,
  CenteredHeading,
  PageSection,
} from '../styles/styles';

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
      <FormContainer>
        <SigninForm
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            try {
              await requestReset();
            } catch (err) {
              console.log(err);
            }
          }}>
          <SigninInputContainer>
            <label htmlFor="email">
              Email
              <SigninTextInput
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={data}
              />
            </label>
          </SigninInputContainer>
          <ContinueButton value="Reset" type="submit" disabled={data} />
        </SigninForm>
      </FormContainer>
      <div style={{ textAlign: `center`, padding: `15px` }}>
        {data ? <i>A reset link has been sent to your email.</i> : ''}
      </div>
    </PageSection>
  );
};

export default RequestReset;
