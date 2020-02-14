import React from 'react';
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
        <HeroHeadline>Amazon Associates Link Checking</HeroHeadline>
        <HeroSubtext>Detailed reporting on your Amazon affiliate links</HeroSubtext>
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
