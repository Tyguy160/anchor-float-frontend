import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  PageSection,
  FormContainer,
  ComponentContainer,
  CenteredH2
} from "../styles/styles";
import styled from "styled-components";
import { REPORTS_QUERY } from "../resolvers/resolvers";

const DataContainer = styled.div`
  min-height: 350px;
  display: grid;
`;

const StyledTable = styled.table`
  padding: 20px;
  table-layout: auto;
  text-align: right;
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
  }
`;

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

const DomainData = props => {
  const { loading: userLoading, data: reportData } = useQuery(REPORTS_QUERY, {
    variables: {
      input: {
        domain: props.selectedDomain ? props.selectedDomain.value : null
      }
    }
  });
  const reports = reportData.siteReports ? reportData.siteReports.reports : [];

  return (
    <ComponentContainer>
      <CenteredH2>Reports and Data</CenteredH2>
      <DataContainer>
        {reports.length ? (
          <StyledTable>
            <thead>
              <tr>
                <th>Report Date</th>
                <th>Report URL</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.createdAt}>
                  <td>
                    {`${new Date(Number(report.createdAt)).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )} ${new Date(Number(report.createdAt)).toLocaleTimeString(
                      "en-US"
                    )}`}
                  </td>
                  <td>
                    <a href={report.fileUrl}>Download</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        ) : (
          <p
            style={{
              justifySelf: `center`,
              alignSelf: `center`,
              paddingBottom: `50px`,
              paddingLeft: `10px`,
              paddingRight: `10px`,
              textAlign: `center`
            }}
          >
            When you run a report, it will available for download here!
          </p>
        )}
      </DataContainer>
    </ComponentContainer>
  );
};

export default DomainData;
