import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { CTAButtonContainer } from './styles/StyledCTA';
import {
  HeroContainer,
  HeroHeadline,
  HeroSubtext,
  HeroCTAButton,
  HeroCTAButtonContainer,
} from './styles/StyledHero';

const HeroTextContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  color: #565656;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroTextContainer>
        <HeroHeadline>Amazon Associates Link Health Checks</HeroHeadline>
        <HeroSubtext>
          Find out which of your Amazon affiliate links are no longer up-to-date
        </HeroSubtext>
      </HeroTextContainer>
      <HeroCTAButtonContainer>
        <HeroCTAButton>Learn more</HeroCTAButton>
        <Link href="/signup" passHref>
          <HeroCTAButton>Sign up</HeroCTAButton>
        </Link>
      </HeroCTAButtonContainer>
    </HeroContainer>
  );
};

export default Hero;
