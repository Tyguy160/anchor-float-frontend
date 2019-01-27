import React from 'react';
import PageSection from './styles/StyledPageSection';
import StyledHeading from './styles/StyledHeading';

const Pricing = () => {
  return (
    <PageSection id="pricing">
      <StyledHeading>Pricing</StyledHeading>
      <div>
        <h3>Tier 1</h3>
        <ul>
          <li>$20/mo</li>
          <li>1 site</li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet orci urna.
          </li>
        </ul>
      </div>
      <div>
        <h3>Tier 2</h3>
        <ul>
          <li>$50/mo</li>
          <li>3 sites</li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet orci urna.
          </li>
        </ul>
      </div>
      <div>
        <h3>Tier 3</h3>
        <ul>
          <li>$120/mo</li>
          <li>10 sites</li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet orci urna.
          </li>
        </ul>
      </div>
      <div>
        <h3>Enterprise</h3>
        <ul>
          <li>Looking to keep track of more than 10 affiliate sites?</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </PageSection>
  );
};

export default Pricing;
