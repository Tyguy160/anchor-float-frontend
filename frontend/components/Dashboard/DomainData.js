import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  PageSection,
  SignupFormContainer,
  ComponentContainer,
  CenteredH2,
} from '../styles/styles';
import ReactTable from 'react-table';
import styled from 'styled-components';

const DataContainer = styled.div`
  min-height: 350px;
`;

const DomainData = () => {
  return (
    <PageSection>
      <ComponentContainer>
        <CenteredH2>Reports and Data</CenteredH2>
        <DataContainer>
          <div>Dashboard data goes here</div>
        </DataContainer>
      </ComponentContainer>
    </PageSection>
  );
};

export default DomainData;
