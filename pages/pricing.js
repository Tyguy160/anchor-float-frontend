import React, { Component } from "react";
import Router from "next/router";
import PlanComponent from "../components/Account/PlanComponent";

import {
  GET_CURRENT_USER,
  CREATE_STRIPE_SESSION_MUTATION,
  UPDATE_STRIPE_SUBSCRIPTION_MUTATION
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

export const plans = [
  {
    planId: "0",
    planTitle: "Economy",
    planPrice: "$20",
    planCredits: 1,
    planDescription:
      "The perfect plan for those with a single, small affiliate site"
  },
  {
    planId: "1",
    planTitle: "Basic",
    planPrice: "$45",
    planCredits: 3,
    planDescription: "The best value for a small portfolio affiliate sites"
  },
  {
    planId: "2",
    planTitle: "Standard",
    planPrice: "$60",
    planCredits: 5,
    planDescription:
      "For those with a well established group of affiliate sites"
  },
  {
    planId: "3",
    planTitle: "Pro",
    planPrice: "$75",
    planCredits: 10,
    planDescription: "The best value for a small portfolio affiliate sites"
  }
];

const Pricing = () => {
  return (
    <PageSection id="pricing">
      <CenteredHeading>Pricing</CenteredHeading>
      <PricingContainer>
        {plans.map(plan => {
          return (
            <PlanComponent
              planId={plan.planId}
              planTitle={plan.planTitle}
              planPrice={plan.planPrice}
              planCredits={plan.planCredits}
              planDescription={plan.planDescription}
              key={plan.planId}
              // disabled
            />
          );
        })}
      </PricingContainer>

      <StyledPricingCTAButton onClick={() => Router.push("/signup")}>
        Sign Up
      </StyledPricingCTAButton>
    </PageSection>
  );
};

export default Pricing;
