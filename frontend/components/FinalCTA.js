import React from 'react';
import PageSection from './styles/StyledPageSection';
import {
  CTAButton,
  CTAContainer,
  CTAButtonContainer,
} from './styles/StyledCTA';
import { HeroHeadline } from './styles/StyledHero';

const FinalCTA = () => {
  return (
    <PageSection style={{ height: `75vh` }}>
      <CTAContainer>
        <HeroHeadline>Ready to Ensure Your Success?</HeroHeadline>
        <CTAButtonContainer style={{ gridTemplateColumns: `1fr` }}>
          <CTAButton>Sign me up, Scotty!</CTAButton>
        </CTAButtonContainer>
      </CTAContainer>
    </PageSection>
  );
};

export default FinalCTA;
