import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import PlanComponent from './PlanComponent';

import {
  GET_CURRENT_USER,
  CREATE_STRIPE_SESSION_MUTATION,
} from '../resolvers/resolvers';

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

const Plans = () => {
  const currentUser = useQuery(GET_CURRENT_USER);
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
        <PlanComponent
          planId="plan_FyidUQxlYdDu28"
          planTitle="Basic"
          planPrice="$25"
          planCredits="3"
          onClick={handlePlanSelect}
          handlePlanSelect={handlePlanSelect}
        />
        <PlanComponent
          planId="plan_FyiUKqbkV2ROuY"
          planTitle="Standard"
          planPrice="$35"
          planCredits="5"
          onClick={handlePlanSelect}
          handlePlanSelect={handlePlanSelect}
        />
        <PlanComponent
          planId="plan_FyiUoIdKqgbIfv"
          planTitle="Pro"
          planPrice="$40"
          planCredits="10"
          onClick={handlePlanSelect}
          handlePlanSelect={handlePlanSelect}
        />
      </PricingContainer>
      <ContinueButton
        type="submit"
        value="Continue"
        onClick={handlePlanContinue}>
        {!currentUser.loading && currentUser.data.me
          ? currentUser.data.me.plan.level == 0
            ? `Continue`
            : `Update`
          : 'Continue'}
      </ContinueButton>
    </PageSection>
  );
};

export default Plans;
