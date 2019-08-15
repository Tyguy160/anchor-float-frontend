// ! NOT WORKING YET

import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  SignupForm,
  SignupFormContainer,
  SignupInputContainer,
  SignupTextInput,
  ContinueButton,
} from './styles/styles';

const ChangePassword = props => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChange = (e, hookType) => {
    const { name, value, type } = e.target;
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
    <div>
      <h2>Change Your Password</h2>
      <SignupFormContainer>
        {/* <ErrorMessage error={props.error} /> */}
        <SignupForm
          id="urlForm"
          onSubmit={async e => {
            e.preventDefault();
            if (newPassword === confirmNewPassword) {
              try {
                console.log('password changed');
                //   const res = await addUserSite(addDomain);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
              } catch (err) {
                console.log({ err });
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
        </SignupForm>
        <ContinueButton type="submit" value="Reset" form="urlForm" />
      </SignupFormContainer>
    </div>
  );
};

export default ChangePassword;
