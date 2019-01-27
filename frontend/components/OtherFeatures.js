import React from 'react';
import PageSection from './styles/StyledPageSection';
import StyledHeading from './styles/StyledHeading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLink,
  faGlobe,
  faChartLine,
  faFileCsv,
} from '@fortawesome/free-solid-svg-icons';

const OtherFeatures = () => {
  return (
    <PageSection>
      <StyledHeading>What Else You Get</StyledHeading>
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
          Detailed word counts across your site. See how you trend over time.
        </p>
      </div>
      <div>
        <FontAwesomeIcon icon={faFileCsv} size="3x" color={`goldenrod`} />
        <p>
          Statistics so detailed that <em>you just can't even</em>
        </p>
      </div>
    </PageSection>
  );
};

export default OtherFeatures;
