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
  display: grid;
`;

const DomainData = () => {
  return (
    <ComponentContainer>
      <CenteredH2>Reports and Data</CenteredH2>
      <DataContainer>
        <p
          style={{
            justifySelf: `center`,
            alignSelf: `center`,
            paddingBottom: `50px`,
            paddingLeft: `10px`,
            paddingRight: `10px`,
            textAlign: `center`,
          }}>
          When you run a report, it will available for download here!
        </p>
      </DataContainer>
    </ComponentContainer>
  );
};

export default DomainData;
