import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  PricingContainer,
  StyledTierButton,
  EnterpriseStyledTierContainer,
  StyledTierHeading,
  StyledPrice,
  StyledTierDetails,
  StyledPricingCTAButton,
  StyledPricingCTAButtonContainer,
  CTAButton,
  CTAButtonContainer,
  StyledHeading,
  PageSection,
  CenteredHeading,
  ContinueButton,
} from '../styles/styles';

const CREATE_STRIPE_SESSION_MUTATION = gql`
  mutation CREATE_STRIPE_SESSION_MUTATION($input: CreateStripeSessionInput!) {
    createStripeSession(input: $input) {
      stripeSessionId
    }
  }
`;

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState('plan_FyidUQxlYdDu28');

  const [createStripeSession, { error, data }] = useMutation(
    CREATE_STRIPE_SESSION_MUTATION,
    {
      variables: { input: { stripePlanId: selectedPlan } },
    }
  );

  const handlePlanSelect = e => {
    console.log(e.currentTarget.id);
    setSelectedPlan(e.currentTarget.id);
  };

  const handlePlanContinue = async e => {
    let res = await createStripeSession();
    var stripe = Stripe('pk_test_mqMxPm3hGXqDIiwIVvAME4Af');
    stripe
      .redirectToCheckout({
        sessionId: res.data.createStripeSession.stripeSessionId,
      })
      .then(function(result) {
        if (result.error) {
          console.log(result.error.message);
        }
      });
  };

  return (
    <PageSection id="pricing">
      <CenteredHeading>Plans</CenteredHeading>
      <p>Select a plan below and click Continue.</p>
      <PricingContainer>
        <StyledTierButton id="plan_FyidUQxlYdDu28" onClick={handlePlanSelect}>
          <StyledTierHeading>Basic</StyledTierHeading>
          <StyledPrice>
            $25
            <div>per month</div>
          </StyledPrice>
          <StyledTierDetails>
            <li style={{ textAlign: `center` }}>3 credits monthly</li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet orci urna.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet orci urna.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet orci urna.
            </li>
          </StyledTierDetails>
        </StyledTierButton>
        <StyledTierButton id="plan_FyiUKqbkV2ROuY" onClick={handlePlanSelect}>
          <StyledTierHeading>Standard</StyledTierHeading>
          <StyledPrice>
            $35
            <div>per month</div>
          </StyledPrice>
          <StyledTierDetails>
            <li style={{ textAlign: `center` }}>5 credits monthly</li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet orci urna.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet orci urna.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet orci urna.
            </li>
          </StyledTierDetails>
        </StyledTierButton>
        <StyledTierButton id="plan_FyiUoIdKqgbIfv" onClick={handlePlanSelect}>
          <StyledTierHeading>Pro</StyledTierHeading>
          <StyledPrice>
            $40
            <div>per month</div>
          </StyledPrice>
          <StyledTierDetails>
            <li style={{ textAlign: `center` }}>10 credits monthly</li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet orci urna.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet orci urna.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet orci urna.
            </li>
          </StyledTierDetails>
        </StyledTierButton>
      </PricingContainer>
      <ContinueButton
        type="submit"
        value="Continue"
        onClick={handlePlanContinue}>
        Continue
      </ContinueButton>
    </PageSection>
  );
};

export default Plans;
