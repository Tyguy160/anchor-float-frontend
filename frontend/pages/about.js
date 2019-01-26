import React, { Component } from 'react';
import styled from 'styled-components';

const AboutSection = styled.div`
  /* padding: 20px; */
`;

const AboutHeading = styled.h2`
  padding: 20px;
  text-align: center;
`;

const AboutContent = styled.div`
  padding: 0px 25% 0px 25%;
  font-size: 1.25em;
  line-height: 1.5em;
`;

class About extends Component {
  render() {
    return (
      <AboutSection>
        <AboutHeading>Why We Started Associate Shield</AboutHeading>
        <AboutContent>
          <p>
            In 2017, two friends started a niche content marketing site
            together. Soon after getting into the process of writing, guest
            posting, and acquiring backlinks, we began setting up our site for
            Amazon Associates.
          </p>

          <p>
            It's no secret that affiliate sites take tremendous amounts of work
            and patience. What we didn't anticipate, however, was how easy it
            was for things to go wrong on previously written pieces of content.
          </p>
          <p>Things constantly change in the world of an affilate site...</p>
          <div style={{ display: `grid`, justifyContent: `center` }}>
            <p>Backlinks are lost.</p>
            <p>Keywords are gained.</p>
            <p>Amazon products become unavailable.</p>
          </div>
          <p>
            These ever changing aspects are what led us to creating Associate
            Shield. Our goal with this service is to make running an Amazon
            affiliate site easier on you.
          </p>
          <p>We hope Associate Shield brings you value.</p>
          <p style={{ textAlign: `right`, paddingRight: `200px` }}>
            Cordially,
          </p>
          <p style={{ textAlign: `right` }}>The Associate Shield Team</p>
        </AboutContent>
      </AboutSection>
    );
  }
}

export default About;
