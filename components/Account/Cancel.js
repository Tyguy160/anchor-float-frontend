import React, { useState } from 'react';
import Router from 'next/router';

import {
  PageSection,
  CenteredHeading,
  StyledButton,
  CTAButtonContainer,
} from '../styles/styles';

const Cancel = () => {
  return (
    <PageSection>
      <CenteredHeading>We're sorry to see you go!</CenteredHeading>
      <p>
        If you have any constructive feedback for how we can improve our
        service, please don't hesitate to&nbsp;
        <a href="mailto:feedback@anchorfloat.com">contact us</a>.
      </p>
    </PageSection>
  );
};

export default Cancel;
