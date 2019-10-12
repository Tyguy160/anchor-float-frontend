// ! NOT WORKING YET

import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  SignupForm,
  SignupFormContainer,
  SignupInputContainer,
  SignupTextInput,
  ContinueButton,
  PageSection,
} from '../styles/styles';

const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION($input: UpdatePasswordInput!) {
    updateUserPassword(input: $input) {
      message
    }
  }
`;

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [changePassword] = useMutation(CHANGE_PASSWORD_MUTATION, {
    variables: { input: { currentPassword, newPassword } },
    refetchQueries: ['me'],
  });

  const handleChange = (e, hookType) => {
    const { value } = e.target;
    switch (hookType) {
      case 'CURRENT_PASSWORD':
        setCurrentPassword(value);
        break;
      case 'NEW_PASSWORD':
        setNewPassword(value);
        break;
      case 'CONFIRM_NEW_PASSWORD':
        setConfirmNewPassword(value);
        break;
    }
  };

  return (
    <PageSection>
      <h2>Change Your Password</h2>
      <SignupFormContainer>
        <SignupForm
          id="urlForm"
          onSubmit={async e => {
            e.preventDefault();
            if (newPassword === confirmNewPassword) {
              try {
                changePassword(currentPassword, newPassword);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
              } catch (err) {
                console.log(err);
              }
            } else {
              console.log("Your new passwords don't match 🤷‍");
            }
          }}>
          <SignupInputContainer>
            <label htmlFor="currentPassword">Current Password</label>
            <SignupTextInput
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder=""
              required
              value={currentPassword}
              onChange={e => handleChange(e, 'CURRENT_PASSWORD')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="newPassword">New Password</label>
            <SignupTextInput
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder=""
              required
              value={newPassword}
              onChange={e => handleChange(e, 'NEW_PASSWORD')}
            />
          </SignupInputContainer>
          <SignupInputContainer>
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <SignupTextInput
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              placeholder=""
              required
              value={confirmNewPassword}
              onChange={e => handleChange(e, 'CONFIRM_NEW_PASSWORD')}
            />
          </SignupInputContainer>
          <ContinueButton type="submit" value="Reset" form="urlForm">
            Reset
          </ContinueButton>
        </SignupForm>
      </SignupFormContainer>
    </PageSection>
  );
};

export default ChangePassword;
