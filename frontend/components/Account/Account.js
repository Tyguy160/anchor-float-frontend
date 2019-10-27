import React from 'react';
import ChangePassword from './ChangePassword';
import SubscriptionInfo from './SubscriptionInfo';
import { PageSection } from '../styles/styles';

import styled from 'styled-components';

const AccountContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 20px;
`;

const SubscriptionInfoContainer = styled.div`
  flex: 1 100%;
`;

const Account = () => {
  return (
    <AccountContainer>
      <SubscriptionInfoContainer>
        <SubscriptionInfo />
      </SubscriptionInfoContainer>
    </AccountContainer>
  );
};

export default Account;
