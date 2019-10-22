// ! NOT WORKING YET
import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../resolvers/resolvers';
import {
  ComponentContainer,
  CenteredH2,
  StyledButton,
  DeleteButton,
} from '../styles/styles';

import PlanComponent from './PlanComponent';

const SubscriptionInfoContainer = styled.div`
  max-width: 1200px;
  width: auto;
  justify-self: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SubscriptionDetailsContainer = styled(ComponentContainer)`
  flex: 1 auto;
`;

const SubscriptionButtonContainer = styled(ComponentContainer)`
  flex: 1 20%;
  display: flex;
  flex-wrap: wrap;
  /* padding: 20px; */
  justify-content: center;
`;

const SubscriptionInfo = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const plan = data && data.me && data.me.plan;
  const creditsRemaining = data && data.me && data.me.creditsRemaining;

  if (loading) {
    return (
      <ComponentContainer>
        <h2>Subscription Information</h2>
        <>
          <div>Loading...🕥</div>
        </>
      </ComponentContainer>
    );
  }

  if (!plan || typeof creditsRemaining !== 'number') {
    return null;
  }

  return (
    <ComponentContainer>
      <CenteredH2>Subscription Information</CenteredH2>
      {!loading && (
        <SubscriptionInfoContainer>
          <ComponentContainer style={{ border: `none` }}>
            <PlanComponent style={{ flex: `1 100%` }}></PlanComponent>
          </ComponentContainer>
          <SubscriptionDetailsContainer>
            <p>
              You have the <b>{plan.name}</b> subscription.
            </p>
            <p>
              You'll receive <b>{plan.creditsPerMonth} credits</b> per month
              with this plan.
            </p>
            <p>
              You have <b>{creditsRemaining} credits</b> remaining.
            </p>
          </SubscriptionDetailsContainer>
          <SubscriptionButtonContainer>
            <StyledButton>Change Plan</StyledButton>
            <DeleteButton>Cancel Subscription</DeleteButton>
          </SubscriptionButtonContainer>
        </SubscriptionInfoContainer>
      )}
    </ComponentContainer>
  );
};

export default SubscriptionInfo;
