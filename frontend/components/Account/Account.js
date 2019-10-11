import React from 'react';
import ChangePassword from './ChangePassword';
import SubscriptionInfo from './SubscriptionInfo';
import AddDomain from './AddDomain';
import DomainSettings from './DomainSettings';

const Account = () => {
  return (
    <div>
      <SubscriptionInfo />
      <ChangePassword />
      <AddDomain />
      <DomainSettings />
    </div>
  );
};

export default Account;
