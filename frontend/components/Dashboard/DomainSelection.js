import React, { useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Domain } from 'domain';
import styled from 'styled-components';
import toasts from '../Misc/Toasts';
import {
  USERSITES_QUERY,
  SITEPAGES_QUERY,
  RUN_SITE_REPORT_MUTATION,
} from '../resolvers/resolvers';
import Select from 'react-select';

import {
  StyledButton,
  StyledDropdown,
  PageSection,
  SignupFormContainer,
  ComponentContainer,
} from '../styles/styles';

const DomainSelection = props => {
  const [runSiteReport, { error, data }] = useMutation(
    RUN_SITE_REPORT_MUTATION,
    {
      variables: {
        input: {
          hostname: props.selectedDomain ? props.selectedDomain.value : null,
        },
      },
    }
  );
  return (
    <ComponentContainer>
      <StyledDropdown>
        <Select
          value={props.selectedDomain}
          onChange={selectedOption => {
            // Finds the selected site from the list of user sites
            const selectedSite = props.userSites.userSites.find(
              userSite => userSite.hostname === selectedOption.value
            );

            //   // Sets the domain information in state
            //   props.setDomain(selectedSite.hostname);
            props.setSelectedUserSite(selectedSite);

            // Sets the domain option in the dropdown
            props.setSelectedDomain(selectedOption);
          }}
          options={
            props.userSites.userSites &&
            props.userSites.userSites.map(site => ({
              value: site.hostname,
              label: site.hostname,
            }))
          }
        />
      </StyledDropdown>
      <StyledButton
        disabled={props.selectedDomain ? false : true}
        onClick={async () => {
          try {
            toasts.successMessage(
              'Queued up your report. Please check back shortly!'
            );
            await runSiteReport();
          } catch (err) {
            toasts.errorMessage(
              `You don't have enough credits to generate this report`
            );
          }
        }}>
        Run report
      </StyledButton>
    </ComponentContainer>
  );
};

export default DomainSelection;
