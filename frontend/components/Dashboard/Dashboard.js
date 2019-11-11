import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USERSITES_QUERY, GET_CURRENT_USER } from '../resolvers/resolvers';
import AddDomain from './AddDomain';
import DomainSettings from './DomainSettings';
import DomainData from './DomainData';
import DomainSelection from './DomainSelection';
import {
  DashboardContainer,
  DomainSettingsContainer,
  DomainDataContainer,
} from '../styles/styles';

const Dashboard = () => {
  const { loading: domainsLoading, data: userSites } = useQuery(
    USERSITES_QUERY
  );

  const { loading: userLoading, data: userData } = useQuery(GET_CURRENT_USER);

  // These hooks are for the selected domain *name*, not the user site
  const [selectedDomain, setSelectedDomain] = useState();

  // These hooks are for the selected user site, not the domain name
  const [selectedUserSite, setSelectedUserSite] = useState();

  return (
    <DashboardContainer>
      <DomainDataContainer>
        <div>
          Credits remaining:{' '}
          {!userLoading && userData
            ? userData.me.creditsRemaining
            : 'Loading...'}
        </div>
        <DomainSelection
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          userSites={userSites}
          selectedUserSite={selectedUserSite}
          setSelectedUserSite={setSelectedUserSite}
          userData={userData}
        />
        <DomainData selectedDomain={selectedDomain} />
      </DomainDataContainer>
      <DomainSettingsContainer>
        <DomainSettings
          selectedUserSite={selectedUserSite}
          setSelectedUserSite={setSelectedUserSite}
        />
        <AddDomain />
      </DomainSettingsContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
