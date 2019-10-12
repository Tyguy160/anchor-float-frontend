import React, { Component } from 'react';
import Router from 'next/router';

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
  CenteredHeading,
} from '../components/styles/styles';

class Pricing extends Component {
  render() {
    return (
      <PageSection id="pricing">
        <CenteredHeading>Pricing</CenteredHeading>
        <PricingContainer>
          <StyledTierContainer>
            <StyledTierHeading>Basic</StyledTierHeading>
            <StyledPrice>
              $20
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
          </StyledTierContainer>
          <StyledTierContainer>
            <StyledTierHeading>Standard</StyledTierHeading>
            <StyledPrice>
              $50
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
          </StyledTierContainer>
          <StyledTierContainer>
            <StyledTierHeading>Advanced</StyledTierHeading>
            <StyledPrice>
              $80
              <div>per month</div>
            </StyledPrice>
            <StyledTierDetails>
              <li style={{ textAlign: `center` }}>10 sites</li>
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
          </StyledTierContainer>
          {/* <EnterpriseStyledTierContainer>
            <StyledTierHeading>Enterprise</StyledTierHeading>
            <p style={{ textAlign: `center` }}>
              Looking to keep track of more than 10 affiliate sites?
            </p>
            <StyledPricingCTAButtonContainer>
              <StyledPricingCTAButton>Contact Us</StyledPricingCTAButton>
            </StyledPricingCTAButtonContainer>
          </EnterpriseStyledTierContainer> */}
        </PricingContainer>

        <StyledPricingCTAButton onClick={() => Router.push('/signup')}>
          Sign Up
        </StyledPricingCTAButton>
      </PageSection>
    );
  }
}

export default Pricing;
