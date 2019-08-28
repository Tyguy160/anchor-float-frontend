import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import SubscriptionInfo from './SubscriptionInfo';
import AddDomain from './AddDomain';
import DomainSettings from './DomainSettings';
import { PageSection } from '../styles/styles';

const Account = props => {
  return (
    <div>
      <SubscriptionInfo />

      {/* // TODO: Uncomment this when complete */}
      <ChangePassword />

      {/* A list of the current domains and a tool to add a new domain */}
      <AddDomain />

      {/* Settings for each domain, selected by a dropdown */}
      <DomainSettings />

      {/* <h2>Other settings</h2>
      <div>Change email address</div>
      <div>Time zone</div>
      <div>Color scheme</div> */}
    </div>
  );
};

export default Account;
