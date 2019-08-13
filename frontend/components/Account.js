import React, { useState } from 'react';
import styled from 'styled-components';

const SignupFormContainer = styled.div`
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: grid;
  grid-template-rows: 1fr auto;
`;

const SignupForm = styled.form`
  display: grid;
  padding: 20px 0px 20px 0px;
  grid-gap: 15px;
  justify-content: center;
`;

const ContinueButton = styled.input`
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

const SignupInputContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  flex-wrap: wrap;
  label {
    align-self: center;
  }
`;

const SignupTextInput = styled.input`
  border-radius: 4px;
  border: 1px solid #dedede;
  height: 2em;
  font-family: 'Assistant', sans-serif;
  font-size: 1em;
  outline: none;
  margin-left: 10px;
  margin-right: 10px;
`;

const Account = props => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChange = (e, hookType) => {
    const { name, value, type } = e.target;
    switch (hookType) {
      case 'NEW_PASSWORD':
        setPassword(value);
        break;
      case 'CONFIRM_NEW_PASSWORD':
        setConfirmPassword(value);
        break;
    }
  };

  return (
    <div>
      <h2>Subscription Information</h2>
      <div>Subscription details to go here</div>
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
      <h2>Domains</h2>
      <div>List domains here</div>
      <h4>Add a domain</h4>
      <h2>Domain Settings</h2>
      <select>
        <option>https://www.triplebarcoffee.com</option>
        <option>https://www.anchorfloat.com</option>
      </select>
      <div>Scan frequency</div>
      <h2>Other settings</h2>
      <div>Change email address</div>
      <div>Time zone</div>
      <div>Color scheme</div>
    </div>
  );
};

export default Account;
