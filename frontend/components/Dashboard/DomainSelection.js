import React, { useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { Domain } from 'domain';
import styled from 'styled-components';
import { USERSITES_QUERY, SITEPAGES_QUERY } from '../resolvers/resolvers';
import Select from 'react-select';

import {
  StyledButton,
  StyledDropdown,
  PageSection,
  SignupFormContainer,
  ComponentContainer,
} from '../styles/styles';

const DomainSelection = props => {
  return (
    <PageSection>
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
        <StyledButton disabled={props.selectedDomain ? false : true}>
          Run report
        </StyledButton>
      </ComponentContainer>
    </PageSection>
  );
};

export default DomainSelection;
