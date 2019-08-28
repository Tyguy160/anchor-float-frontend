import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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
              $0
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
            <StyledPricingCTAButtonContainer>
              <Link href="/signup" passHref>
                <StyledPricingCTAButton>Sign Up</StyledPricingCTAButton>
              </Link>
            </StyledPricingCTAButtonContainer>
          </StyledTierContainer>
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
            <StyledPricingCTAButtonContainer>
              <Link href="/signup" passHref>
                <StyledPricingCTAButton>Sign Up</StyledPricingCTAButton>
              </Link>
            </StyledPricingCTAButtonContainer>
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
            <StyledPricingCTAButtonContainer>
              <Link href="/signup" passHref>
                <StyledPricingCTAButton>Sign Up</StyledPricingCTAButton>
              </Link>
            </StyledPricingCTAButtonContainer>
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
            <StyledPricingCTAButtonContainer>
              <Link href="/signup" passHref>
                <StyledPricingCTAButton>Sign Up</StyledPricingCTAButton>
              </Link>
            </StyledPricingCTAButtonContainer>
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
      </PageSection>
    );
  }
}

export default Pricing;
