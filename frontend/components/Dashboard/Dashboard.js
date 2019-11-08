import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import {
  USERSITES_QUERY,
  SITEPAGES_QUERY,
  GET_CURRENT_USER,
} from '../resolvers/resolvers';
import { PageSection } from '../styles/styles';
import AddDomain from './AddDomain';
import DomainSettings from './DomainSettings';
import DomainData from './DomainData';
import DomainSelection from './DomainSelection';

const DashboardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 20px;
`;

const DomainSettingsContainer = styled.div`
  flex: 1;
  order: 2;
`;

const DomainDataContainer = styled.div`
  flex: 2;
  order: 1;
  min-width: 60%;
`;

const StyledTable = styled.table`
  padding: 20px;
  width: 100%;
  table-layout: auto;
  text-align: right;
  border-collapse: collapse;
  th,
  td {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  th:nth-child(1) {
    text-align: left;
  }
  td:nth-child(1) {
    text-align: left;
    padding-left: 20px;
  }
  tr {
    border-bottom: 1px darkgray solid;
  }
`;

const Dashboard = () => {
  const { loading: domainsLoading, data: userSites } = useQuery(
    USERSITES_QUERY
  );

  const { loading: userLoading, data: userData } = useQuery(GET_CURRENT_USER);

  // These hooks are for the selected domain *name*, not the user site
  const [selectedDomain, setSelectedDomain] = useState();

  // These hooks are for the selected user site, not the domain name
  const [selectedUserSite, setSelectedUserSite] = useState();

  const [domain, setDomain] = useState('');
  const [newDomain, setNewDomain] = useState(null);

  return (
    <DashboardContainer>
      <DomainDataContainer>
        <div>Credits remaining: {userData.me.creditsRemaining}</div>
        <DomainSelection
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          userSites={userSites}
          selectedUserSite={selectedUserSite}
          setSelectedUserSite={setSelectedUserSite}
          userData={userData}
        />
        <DomainData />
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
