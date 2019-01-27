import React from 'react';
import PageSection from './styles/StyledPageSection';
import StyledHeading from './styles/StyledHeading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSitemap,
  faSpider,
  faList,
  faMailBulk,
} from '@fortawesome/free-solid-svg-icons';

const HowItWorks = () => {
  return (
    <PageSection>
      <StyledHeading>How It Works</StyledHeading>
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
          We send you an initial report with lotttts of data about your links
        </p>
      </div>
      <div>
        <FontAwesomeIcon icon={faMailBulk} size="3x" color={`goldenrod`} />
        <p>
          Every week from there on, we will crawl your site and send you a
          report of what's changed
        </p>
      </div>
    </PageSection>
  );
};

export default HowItWorks;
