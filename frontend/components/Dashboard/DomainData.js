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
import { REPORTS_QUERY } from '../resolvers/resolvers';

const DataContainer = styled.div`
  min-height: 350px;
  display: grid;
`;

const DomainData = props => {
  const { loading: userLoading, data: reportData } = useQuery(REPORTS_QUERY, {
    variables: {
      input: {
        domain: props.selectedDomain ? props.selectedDomain.value : null,
      },
    },
  });
  const reports = reportData.siteReports ? reportData.siteReports.reports : [];

  return (
    <ComponentContainer>
      <CenteredH2>Reports and Data</CenteredH2>
      <DataContainer>
        {reports.length ? (
          <table>
            <thead>
              <tr>
                <th>Report Date</th>
                <th>Report URL</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.createdAt}>
                  <td>{Date(report.createdAt)}</td>
                  <td>
                    <a href={report.fileUrl}>Download</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
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
        )}
      </DataContainer>
    </ComponentContainer>
  );
};

export default DomainData;
