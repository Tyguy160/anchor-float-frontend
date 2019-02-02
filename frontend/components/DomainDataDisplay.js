import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styled from 'styled-components';
const DOMAIN_PAGES_QUERY = gql`
  query DOMAIN_PAGES_QUERY($hostname: String!) {
    pages(hostname: $hostname) {
      id
      url
      pageTitle
    }
  }
`;

const DASHBOARD_INITIAL_LOAD = gql`
  query DASHBOARD_INITIAL_LOAD {
    me {
      id
      email
      name
      domains(first: 1) {
        id
        hostname
        pages(first: 20) {
          id
          url
          wordCount
        }
      }
    }
    domains {
      id
      hostname
    }
  }
`;

const StyledTableContainer = styled.div`
  margin: 0 20px 20px 20px;
`;

const DomainDataDisplay = props => {
  return (
    <div>
      <h3>Domain Data</h3>
      <StyledTableContainer>
        {props.data.me.domains.length ? (
          <Query
            query={DOMAIN_PAGES_QUERY}
            variables={{
              hostname: props.domain.length
                ? props.domain
                : props.data.me.domains[0].hostname,
            }}>
            {payload => {
              if (payload.data.pages.length) {
                let data = [];
                payload.data.pages.map(page => {
                  let pageData = {
                    pageTitle: page.pageTitle ? page.pageTitle : 'My Page',
                    url: <a href={page.url}>{page.url}</a>,
                    wordCount: page.wordCount
                      ? page.wordCount
                      : Math.round(Math.random() * 1212 + 1),
                    valid: Math.round(Math.random() * 11 + 1),
                    thirdParty: Math.round(Math.random() * 11 + 1),
                    unavailable: Math.round(Math.random() * 11 + 1),
                    totalLinks: 'NaN',
                  };
                  data.push(pageData);
                });

                return (
                  <ReactTable
                    data={data}
                    columns={[
                      {
                        Header: 'Page',
                        columns: [
                          { Header: 'Page', accessor: 'pageTitle' },

                          { Header: 'URL', accessor: 'url' },
                          { Header: 'Word Count', accessor: 'wordCount' },
                        ],
                      },
                      {
                        Header: 'Links',
                        columns: [
                          { Header: 'Valid', accessor: 'valid' },

                          { Header: '3rd Party', accessor: 'thirdParty' },
                          {
                            Header: 'Unavailable',
                            accessor: 'unavailable',
                          },
                          { Header: 'Total Links', accessor: 'totalLinks' },
                        ],
                      },
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                );

                // <div key={page.id}>
                //   {console.log(props.data.me.domains[3].id)}
                //   <span>
                //     <a href={page.url}>
                //       Page {payload.data.pages.indexOf(page) + 1}
                //     </a>
                //     <div>Good: </div>
                //     <div>3rd Party: </div>
                //     <div>Unavailable: </div>
                //   </span>
                // </div>
              } else {
                <div>
                  No pages exist for this domain.
                  <div>
                    Add one <button>here</button>
                  </div>
                </div>;
              }
            }}
          </Query>
        ) : (
          'No data'
        )}
      </StyledTableContainer>
    </div>
  );
};

export default DomainDataDisplay;
