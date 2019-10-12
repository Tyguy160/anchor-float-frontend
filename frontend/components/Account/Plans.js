import React, { useState } from 'react';
import Link from 'next/link';

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
  const [selectedPlan, setSelectedPlan] = useState('plan_FyidUQxlYdDu28');

  const handlePlanSelect = e => {
    console.log(e.currentTarget.id);
    setSelectedPlan(e.currentTarget.id);
  };

  const handlePlanContinue = e => {
    console.log(`You picked ${selectedPlan}`);
    var stripe = Stripe('pk_test_mqMxPm3hGXqDIiwIVvAME4Af');
    stripe
      .redirectToCheckout({
        items: [{ plan: selectedPlan, quantity: 1 }],
        successUrl: 'http://localhost.com:3000/success',
        cancelUrl: 'http://localhost.com:3000/canceled',
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
      <PricingContainer>
        <StyledTierButton id="plan_FyidUQxlYdDu28" onClick={handlePlanSelect}>
          <StyledTierHeading>Basic</StyledTierHeading>
          <StyledPrice>
            $25
            <div>per month</div>
          </StyledPrice>
          <StyledTierDetails>
            <li style={{ textAlign: `center` }}>1 site</li>
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
            <li style={{ textAlign: `center` }}>3 site</li>
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
            <li style={{ textAlign: `center` }}>5 sites</li>
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
