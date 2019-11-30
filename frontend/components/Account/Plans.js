import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import toasts from '../Misc/Toasts';
import PlanComponent from './PlanComponent';
import Router from 'next/router';

import {
  GET_CURRENT_USER,
  CREATE_STRIPE_SESSION_MUTATION,
  UPDATE_STRIPE_SUBSCRIPTION_MUTATION,
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
  const [selectedPlan, setSelectedPlan] = useState('');
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState(
    currentUser.stripeSubscriptionId
  );

  const [createStripeSession, { error, data }] = useMutation(
    CREATE_STRIPE_SESSION_MUTATION,
    {
      variables: { input: { stripePlanId: selectedPlan } },
    }
  );

  const [updateStripeSubscription] = useMutation(
    UPDATE_STRIPE_SUBSCRIPTION_MUTATION,
    {
      variables: {
        input: { stripePlanId: selectedPlan },
      },
    }
  );

  const handlePlanSelect = e => {
    console.log(e.currentTarget.id);
    setSelectedPlan(e.currentTarget.id);
  };

  const handlePlanContinue = async e => {
    if (selectedPlan === '') {
      return;
    }

    // Update plan or create new subscription

    console.log(currentUser.data.me.plan.level);
    if (currentUser.data.me.plan.level > 0) {
      let res = await updateStripeSubscription();
      console.log(res);
      if (res) {
        Router.push({
          pathname: '/account',
        });
        toasts.successMessage(res.data.updateStripeSubscription.message);
      } else {
        toasts.errorMessage('Something went wrong...');
      }
    } else {
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
    }
  };

  return (
    <PageSection id="pricing">
      <CenteredHeading>Plans</CenteredHeading>
      <p>Select a plan below and click Continue.</p>
      <PricingContainer>
        <PlanComponent
          planId="plan_GGjkWrQ9lZNBwI"
          planTitle="Economy"
          planPrice="$20"
          planCredits="1"
          onClick={handlePlanSelect}
          handlePlanSelect={handlePlanSelect}
        />
        <PlanComponent
          planId="plan_GGjlaO7xQD0kk8"
          planTitle="Basic"
          planPrice="$45"
          planCredits="3"
          onClick={handlePlanSelect}
          handlePlanSelect={handlePlanSelect}
        />
        <PlanComponent
          planId="plan_GGjlQ5w2ioUStl"
          planTitle="Standard"
          planPrice="$60"
          planCredits="5"
          onClick={handlePlanSelect}
          handlePlanSelect={handlePlanSelect}
        />
        <PlanComponent
          planId="plan_GGjljwH7KKU8qR"
          planTitle="Pro"
          planPrice="$75"
          planCredits="10"
          onClick={handlePlanSelect}
          handlePlanSelect={handlePlanSelect}
        />
      </PricingContainer>
      <ContinueButton
        type="submit"
        value="Continue"
        onClick={handlePlanContinue}
        disabled={!selectedPlan}>
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
