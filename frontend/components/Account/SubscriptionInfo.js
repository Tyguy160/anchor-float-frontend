// ! NOT WORKING YET
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../resolvers/resolvers';
import { SignupFormContainer, PageSection } from '../styles/styles';

const SubscriptionInfo = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const { plan } = data && data.me;

  return (
    <PageSection>
      <h2>Subscription Information</h2>
      <SignupFormContainer>
        {plan && !loading && (
          <div>
            You have the <b>{plan.name}</b> subscription. You'll receive{' '}
            <b>{plan.creditsPerMonth}</b> with this plan.
          </div>
        )}
      </SignupFormContainer>
    </PageSection>
  );
};

export default SubscriptionInfo;
