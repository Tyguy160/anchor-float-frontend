import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PageSection from '../components/styles/StyledPageSection';
import StyledHeading from '../components/styles/StyledHeading';
import { CTAButton, CTAButtonContainer } from '../components/styles/StyledCTA';

const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  /* grid-template-areas: 'tier-1' 'tier-2' 'tier-3' 'enterprise'; */
  justify-content: center;

  @media screen and (max-width: 800px) {
  }
`;

const StyledTierContainer = styled.div`
  margin: 20px;
  border-radius: 5px;
  padding: 0 10px 0px 10px;
  box-shadow: 1px 1px 10px 1px #999;
`;

const StyledTierHeading = styled.h3`
  font-size: 1.5em;
  text-align: center;
  margin: 0;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
`;

const StyledPrice = styled.h4`
  text-align: center;
  font-size: 2.5em;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin: 0;
  > div {
    padding: 5px;
    font-size: 1rem;
  }
`;

const StyledTierDetails = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 20px 20px 20px;
  > li {
    padding-top: 10px;
  }
  border-bottom: 1px solid #ccc;
`;

const StyledPricingCTAButton = styled(CTAButton)`
  margin: 20px;
  align-self: center;
`;

const StyledPricingCTAButtonContainer = styled(CTAButtonContainer)``;

class Pricing extends Component {
  render() {
    return (
      <PageSection id="pricing">
        <StyledHeading>Pricing</StyledHeading>
        <PricingContainer>
          <StyledTierContainer>
            <StyledTierHeading>Basic</StyledTierHeading>
            <StyledPrice>
              $20
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
            <StyledTierHeading>Standard</StyledTierHeading>
            <StyledPrice>
              $50
              <div>per month</div>
            </StyledPrice>
            <StyledTierDetails>
              <li style={{ textAlign: `center` }}>3 sites</li>
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
              $120
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
        </PricingContainer>
        <StyledTierContainer>
          <StyledTierHeading>Enterprise</StyledTierHeading>
          <p style={{ textAlign: `center` }}>
            Looking to keep track of more than 10 affiliate sites?
          </p>
          <StyledPricingCTAButtonContainer>
            <StyledPricingCTAButton>Contact Us</StyledPricingCTAButton>
          </StyledPricingCTAButtonContainer>
        </StyledTierContainer>
      </PageSection>
    );
  }
}

export default Pricing;
