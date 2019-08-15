// ! NOT WORKING YET

import React, { useState } from 'react';
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

  return (
    <div>
      <h2>Change Your Password</h2>
      <SignupFormContainer>
        {/* <ErrorMessage error={props.error} /> */}
        <SignupForm id="urlForm" onSubmit={e => createAccount(e)}>
          <SignupInputContainer>
            <label htmlFor="newPassword">Current Password</label>
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
