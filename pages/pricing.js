import React, { Component } from "react";
import Router from "next/router";
import { useQuery } from "@apollo/react-hooks";
import PlanComponent from "../components/Account/PlanComponent";

import {
  GET_CURRENT_USER,
  CREATE_STRIPE_SESSION_MUTATION,
  UPDATE_STRIPE_SUBSCRIPTION_MUTATION,
  SUBSCRIPTION_PLANS_QUERY
} from "../components/resolvers/resolvers";

import {
  PricingContainer,
  StyledTierContainer,
  EnterpriseStyledTierContainer,
  StyledTierHeading,
  StyledPrice,
  StyledTierDetails,
  StyledPricingCTAButton,
  StyledPricingCTAButtonContainer,
  CTAButton,
  CTAButtonContainer,
  StyledHeading,
  StyledButton,
  PageSection,
  CenteredHeading
} from "../components/styles/styles";

const Pricing = () => {
  const { data: plans } = useQuery(SUBSCRIPTION_PLANS_QUERY);
  return (
    <PageSection id="pricing">
      <CenteredHeading>Pricing</CenteredHeading>
      <PricingContainer>
        {console.log(plans)}
        {plans.subscriptionPlans
          ? plans.subscriptionPlans
              .filter(plan => plan.name !== "Free") // Remove the free plan from the list
              .sort((a, b) => (a.level > b.level ? 1 : -1)) // Sort the list of plans by level
              .map(plan => (
                <PlanComponent
                  planId={plan.stripePlanId}
                  planTitle={plan.name}
                  planPrice={`$` + plan.pricePerMonth}
                  planCredits={plan.creditsPerMonth}
                  key={plan.level}
                  disabled
                />
              ))
          : "Loading"}
      </PricingContainer>

      <StyledPricingCTAButton onClick={() => Router.push("/signup")}>
        Sign Up
      </StyledPricingCTAButton>
    </PageSection>
  );
};

export default Pricing;
