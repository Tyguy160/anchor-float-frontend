import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import toasts from "../Misc/Toasts";
import { RUN_SITE_REPORT_MUTATION } from "../resolvers/resolvers";
import Select from "react-select";

import {
  StyledButton,
  StyledDropdown,
  ComponentContainer
} from "../styles/styles";

const DomainSelection = props => {
  const [runSiteReport, { error, data }] = useMutation(
    RUN_SITE_REPORT_MUTATION,
    {
      variables: {
        input: {
          hostname: props.selectedDomain ? props.selectedDomain.value : null
        }
      }
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

            // Refetch the userSites on change in selection
            props.refetchUserSites();

            // Sets the domain information in state
            // props.setDomain(selectedSite.hostname);
            props.setSelectedUserSite(selectedSite);

            // Sets the domain option in the dropdown
            props.setSelectedDomain(selectedOption);
          }}
          options={
            props.userSites.userSites &&
            props.userSites.userSites.map(site => ({
              value: site.hostname,
              label: site.hostname
            }))
          }
        />
      </StyledDropdown>
      <StyledButton
        disabled={
          // Check if userSites and selectedDomain exist,
          // then find the selectedDomain in the list of userSites,
          // then check to see if a report is currently runnning
          props.userSites.userSites && props.selectedDomain
            ? props.userSites.userSites.find(
                site => site.hostname === props.selectedDomain.value
              ).runningReport
            : true
        }
        onClick={async () => {
          try {
            await runSiteReport();
            await props.refetchUserSites();
            toasts.successMessage(
              "Queued up your report. Please check back shortly!"
            );
          } catch (err) {
            console.log(err);
            toasts.errorMessage(
              `You don't have enough credits to generate this report`
            );
          }
        }}
      >
        Run report
      </StyledButton>
    </ComponentContainer>
  );
};

export default DomainSelection;
