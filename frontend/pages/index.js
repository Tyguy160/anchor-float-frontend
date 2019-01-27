import React, { Component } from 'react';
import styled from 'styled-components';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhatItIs from '../components/WhatItIs';
import OtherFeatures from '../components/OtherFeatures';
import Pricing from '../components/Pricing';
import FinalCTA from '../components/FinalCTA';

const PricingContainer = styled.div``;

const Home = props => {
  return (
    <div>
      <Hero />
      <WhatItIs />
      <HowItWorks />
      <OtherFeatures />
      <Pricing />
      <FinalCTA />
    </div>
  );
};

export default Home;
