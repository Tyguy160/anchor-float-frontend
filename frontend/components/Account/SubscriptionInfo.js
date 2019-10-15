// ! NOT WORKING YET
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../resolvers/resolvers';
import { PlanInfoContainer, PageSection } from '../styles/styles';

const SubscriptionInfo = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const plan = data && data.me && data.me.plan;
  const creditsRemaining = data && data.me && data.me.creditsRemaining;

  if (loading) {
    return (
      <PageSection>
        <h2>Subscription Information</h2>
        <PlanInfoContainer>
          <div>Loading...🕥</div>
        </PlanInfoContainer>
      </PageSection>
    );
  }

  if (!plan || typeof creditsRemaining !== 'number') {
    return null;
  }

  return (
    <PageSection>
      <h2>Subscription Information</h2>
      <PlanInfoContainer>
        {!loading && (
          <div>
            You have the <b>{plan.name}</b> subscription. You'll receive{' '}
            <b>{plan.creditsPerMonth} credits</b> per month with this plan. You
            have <b>{creditsRemaining} credits</b> remaining.
          </div>
        )}
      </PlanInfoContainer>
    </PageSection>
  );
};

export default SubscriptionInfo;
