import React from 'react';
import styled from 'styled-components';
import { CTAButton, CTAButtonContainer } from './styles/StyledCTA';
import { HeroContainer, HeroHeadline } from './styles/StyledHero';

const Hero = () => {
  return (
    <HeroContainer>
      <HeroHeadline>
        <div>You've worked hard to make valuable content</div>
        <div>Protect Your Asset</div>
      </HeroHeadline>
      <CTAButtonContainer>
        <CTAButton>Learn more</CTAButton>
        <CTAButton>Sign up</CTAButton>
      </CTAButtonContainer>
    </HeroContainer>
  );
};

export default Hero;
