import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSitemap,
  faSpider,
  faList,
  faMailBulk,
  faLink,
  faGlobe,
  faChartLine,
  faFileCsv,
} from '@fortawesome/free-solid-svg-icons';

const HeroContainer = styled.div`
  color: white;
  background-image: url('../static/blake-connally-373084-unsplash.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: grid;
  justify-items: center;
`;

const HeroHeadline = styled.div`
  display: grid;
  font-size: 3em;
  text-align: center;
  align-self: end;
  margin-bottom: 100px;
  text-shadow: 1px 1px 3px #888;
`;

const CTA = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
`;

const CTAButton = styled.div`
  margin: 20px;
  padding: 10px 20px 10px 20px;
  box-shadow: 0px 1px 1px 1px #c4941c;
  height: 30px;
  cursor: pointer;
  font-size: 1.5em;
  font-family: 'Quicksand', sans-serif;
  background-color: goldenrod;
  border-radius: 2px;
  border: none;
`;

const PageSection = styled.div`
  padding: 0 20% 0 20%;
  height: 100vh;
  display: grid;
  align-content: center;
  > div > p {
    font-size: 1.2em;
    line-height: 1.8em;
    padding: 10px 0 10px 0;
  }
`;

const StyledHeading = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  margin-left: -50px;
`;

const PricingContainer = styled.div``;

const FinalCTA = styled.div`
  height: 100vh;
  display: grid;
  justify-items: center;
`;

const Home = props => {
  return (
    <div>
      <HeroContainer>
        <HeroHeadline>
          <div>You've worked hard to make valuable content</div>
          <div>Protect Your Asset</div>
        </HeroHeadline>
        <CTA>
          <CTAButton>Learn more</CTAButton>
          <CTAButton>Sign up</CTAButton>
        </CTA>
      </HeroContainer>
      <PageSection id="how-it-works">
        <StyledHeading>What is Affiliate Shield?</StyledHeading>
        <div>
          <p>
            Affiliate Shield is a web app that helps you keep track of
            everything about your Amazon Associates website.
          </p>
          <p>
            One of the biggest risks with Amazon affiliate sites is that your
            product links can stop converting users. This can happen for a few
            reasons:
          </p>
          <ul>
            <li>The product is no longer available</li>
            <li>The product is only available </li>
            <li>You didn't set up your link properly (whoops...)</li>
          </ul>
          <p>
            But here's the scariest part...it's easy to be so focused on
            creating new content, generating new backlinks, and acquiring email
            list signups that you don't notice your monthly revenue dropping
            until it's too late.
          </p>
          <p style={{ textAlign: `center` }}>
            <b>Consider us your insurance policy.</b>
          </p>
          <p>
            After you've subscribed to Affiliate Shield, we crawl your site on a
            weekly basis and email you a digest of what's changed about your
            site. You'll be notified of any affiliate links that likely will
            stop converting for the reasons listed above.
          </p>
        </div>
      </PageSection>
      <PageSection>
        <StyledHeading>How It Works</StyledHeading>
        <div>
          <div>
            <FontAwesomeIcon icon={faSitemap} size="3x" color={`goldenrod`} />
            <p>You input your domain name into our tool</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faSpider} size="3x" color={`goldenrod`} />
            <p>We crawl your website and inspect every page and link</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faList} size="3x" color={`goldenrod`} />
            <p>
              We send you an initial report with lotttts of data about your
              links
            </p>
          </div>
          <div>
            <FontAwesomeIcon icon={faMailBulk} size="3x" color={`goldenrod`} />
            <p>
              Every week from there on, we will crawl your site and send you a
              report of what's changed
            </p>
          </div>
        </div>
      </PageSection>
      <PageSection>
        <StyledHeading>What Else You Get</StyledHeading>
        <div>
          <div>
            <FontAwesomeIcon icon={faLink} size="3x" color={`goldenrod`} />
            <p>Backlink monitoring</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faGlobe} size="3x" color={`goldenrod`} />
            <p>SEO recommendations</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faChartLine} size="3x" color={`goldenrod`} />
            <p>
              Detailed word counts across your site. See how you trend over
              time.
            </p>
          </div>
          <div>
            <FontAwesomeIcon icon={faFileCsv} size="3x" color={`goldenrod`} />
            <p>
              Statistics so detailed that <em>you just can't even</em>
            </p>
          </div>
        </div>
      </PageSection>
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
      <PageSection style={{ height: `75vh` }}>
        <FinalCTA>
          <HeroHeadline>Ready to Ensure Your Success?</HeroHeadline>
          <CTA style={{ gridTemplateColumns: `1fr` }}>
            <CTAButton>Sign me up, Scotty!</CTAButton>
          </CTA>
        </FinalCTA>
      </PageSection>
    </div>
  );
};

export default Home;
