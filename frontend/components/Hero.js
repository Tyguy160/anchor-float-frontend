import React from 'react';
import styled from 'styled-components';
import { CTAButtonContainer } from './styles/StyledCTA';
import {
  HeroContainer,
  HeroHeadline,
  HeroCTAButton,
  HeroCTAButtonContainer,
} from './styles/StyledHero';

const Hero = () => {
  return (
    <HeroContainer>
      <HeroHeadline>
        You've worked hard to make valuable content
        <br />
        Now protect your asset
      </HeroHeadline>
      <HeroCTAButtonContainer>
        <HeroCTAButton>Learn more</HeroCTAButton>
        <HeroCTAButton>Sign up</HeroCTAButton>
      </HeroCTAButtonContainer>
    </HeroContainer>
  );
};

export default Hero;
