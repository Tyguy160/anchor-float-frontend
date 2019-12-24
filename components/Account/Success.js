import React, { useState } from 'react';
import Router from 'next/router';

import {
  PageSection,
  CenteredHeading,
  StyledButton,
  CTAButtonContainer,
} from '../styles/styles';

const Success = () => {
  return (
    <PageSection>
      <CenteredHeading>Thanks for subscribing!</CenteredHeading>
      <p>
        Your subscription was successful. Click on the button below to go to
        your dashboard.
      </p>

      <StyledButton
        onClick={() =>
          Router.push({
            pathname: '/dashboard',
          })
        }>
        Dashboard
      </StyledButton>
    </PageSection>
  );
};

export default Success;
