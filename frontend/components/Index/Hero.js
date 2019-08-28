import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import {
  HeroContainer,
  HeroTextContainer,
  HeroHeadline,
  HeroSubtext,
  HeroCTAButton,
  HeroCTAButtonContainer,
} from '../styles/styles';

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
        <Link href="/about" passHref>
          <HeroCTAButton>Learn more</HeroCTAButton>
        </Link>
        <Link href="/signup" passHref>
          <HeroCTAButton>Sign up</HeroCTAButton>
        </Link>
      </HeroCTAButtonContainer>
    </HeroContainer>
  );
};

export default Hero;
