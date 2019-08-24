import React, { Component } from 'react';
import styled from 'styled-components';

import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import WhatItIs from '../components/WhatItIs';
import OtherFeatures from '../components/OtherFeatures';
// import Pricing from '../components/Pricing';
import FinalCTA from '../components/FinalCTA';

const PageContainer = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`;

class Home extends Component {
  componentDidMount() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  render() {
    return (
      <div>
        <Hero />
        {/* <WhatItIs /> */}
        {/* <HowItWorks /> */}
        {/* <OtherFeatures /> */}
        {/* <Pricing /> */}
        {/* <FinalCTA /> */}
      </div>
    );
  }
}

export default Home;
