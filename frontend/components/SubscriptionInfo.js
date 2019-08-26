// ! NOT WORKING YET
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { GET_CURRENT_USER } from './resolvers/resolvers';
import { SignupFormContainer, PageSection, SignupForm } from './styles/styles';

const getSubscription = sub => {
  switch (sub) {
    case '0':
      return { type: 'free', sites: '1 site' };
      break;
    case '1':
      return { type: 'Basic', sites: '3 sites' };
      break;
    case '2':
      return { type: 'Standard', sites: '5 sites' };
      break;
    case '3':
      return { type: 'Advanced', sites: '10 sites' };
      break;
  }
};

const SubscriptionInfo = props => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const sub = data.me.plan;

  return (
    <PageSection>
      <h2>Subscription Information</h2>
      {/* <SignupFormContainer>
        <div>
          You have the <b>{sub.name}</b> subscription. You're able to track{' '}
          <b>{sub.siteLimit}</b> with this type of account.
        </div>
      </SignupFormContainer> */}
    </PageSection>
  );
};

export default SubscriptionInfo;
