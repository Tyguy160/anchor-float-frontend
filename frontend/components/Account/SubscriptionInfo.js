// ! NOT WORKING YET
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_CURRENT_USER } from '../resolvers/resolvers';
import { SignupFormContainer, PageSection, SignupForm } from '../styles/styles';

const SubscriptionInfo = props => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const sub = data.me.plan;

  return (
    <PageSection>
      <h2>Subscription Information</h2>
      <SignupFormContainer>
        <div>
          You have the <b>{sub.name}</b> subscription. You're able to track{' '}
          <b>{sub.siteLimit}</b> with this type of account.
        </div>
      </SignupFormContainer>
    </PageSection>
  );
};

export default SubscriptionInfo;
