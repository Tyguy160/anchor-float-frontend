import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import Error from '../Misc/ErrorMessage';
import styled from 'styled-components';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { USERSITES_QUERY, SITEPAGES_QUERY } from '../resolvers/resolvers';
import { PageSection } from '../styles/styles';
import { get } from 'http';

const StyledAddDomainButton = styled.button`
  margin: 10px;
  width: 30px;
  height: 30px;
`;

const DashboardContainer = styled.div`
  /* margin: 20px; */
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

  const [
    getSitePages,
    { loading: sitePagesLoading, data: sitePages },
  ] = useLazyQuery(SITEPAGES_QUERY);

  useEffect(() => {
    // getSitePages(siteSelection);
  });

  const [siteSelection, setSiteSelection] = useState('');

  return (
    <PageSection>
      <DashboardContainer>
        <select
          defaultValue=""
          onChange={async e => {
            e.persist();
            console.log(e.target.value);
            const hostname = e.target.value;
            setSiteSelection(e.target.value);
            getSitePages({
              variables: { input: { hostname } },
            });
          }}>
          {console.log(sitePages)}
          {userSites.userSites &&
            userSites.userSites.map(site => (
              <option key={site.hostname} value={site.hostname}>
                {site.hostname}
              </option>
            ))}
          <option disabled value="">
            Select a domain
          </option>
        </select>
        <h2>Dashboard</h2>
        {siteSelection ? (
          <>
            <button>Scan now</button>
            <button>Settings</button>
            <StyledTable>
              <thead>
                <tr style={{ borderBottom: `2px gray solid` }}>
                  <th>Category</th>
                  <th>%</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pages</td>
                  <td>-</td>
                  <td style={{ fontWeight: `bold` }}>
                    {sitePages.sitePages
                      ? sitePages.sitePages.site.pages.length
                      : '?'}
                  </td>
                </tr>
                <tr>
                  <td>Amazon products</td>
                  <td>-</td>
                  <td style={{ fontWeight: `bold` }}>156</td>
                </tr>
                <tr>
                  <td>Amazon affiliate links</td>
                  <td />
                  <td style={{ fontWeight: `bold` }}>420</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: `40px` }}>OK links</td>
                  <td style={{ color: `green`, fontWeight: `bold` }}>89.1</td>
                  <td style={{ color: `green`, fontWeight: `bold` }}>374</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: `40px` }}>NOK links</td>
                  <td style={{ color: `red`, fontWeight: `bold` }}>10.9</td>
                  <td style={{ color: `red`, fontWeight: `bold` }}>46</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: `60px` }}>Unavailable</td>
                  <td>30.4</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: `60px` }}>404</td>
                  <td>19.6</td>
                  <td>9</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: `60px` }}>Out of stock</td>
                  <td>8.7</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: `60px` }}>
                    Links missing affiliate tag
                  </td>
                  <td>15.2</td>
                  <td>7</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: `60px` }}>
                    Links under rating review threshold of X.X
                  </td>
                  <td>26.1</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>Site word count</td>
                  <td />
                  <td style={{ fontWeight: `bold` }}>
                    {sitePages.sitePages
                      ? sitePages.sitePages.site.pages
                          .map(page => page.wordCount)
                          .reduce((acc, pres) => acc + pres)
                      : '?'}
                  </td>
                </tr>
                <tr>
                  <td>Word count per page</td>
                  <td />
                  <td style={{ fontWeight: `bold` }}>1442</td>
                </tr>
              </tbody>
            </StyledTable>
          </>
        ) : (
          <div>Please select a domain to see its dashboard</div>
        )}
        <h2>Previous scans</h2>
        {siteSelection ? (
          <div>
            <ul>
              <li>
                <div>
                  https://www.TripleBarCoffee.com
                  <button>+</button>
                </div>
                <i>07/02/19 17:54 UTC</i>
              </li>
              <li>
                <div>
                  https://www.TripleBarCoffee.com
                  <button>+</button>
                </div>
                <i>07/05/19 17:54 UTC</i>
              </li>
              <li>
                <div>
                  https://www.TripleBarCoffee.com
                  <button>+</button>
                </div>
                <i>07/08/19 17:54 UTC</i>
              </li>
            </ul>
          </div>
        ) : (
          <div>Please select a domain to see previous scans</div>
        )}
        {/*         
        // getTdProps={(state, rowInfo, column) => {
        //   return {
        //     style: {
        //       color:
        //         column.id === 'unavailable' && rowInfo.row.unavailable > 0
        //           ? 'white'
        //           : 'black',
        //       backgroundColor:
        //         column.id === 'unavailable' && rowInfo.row.unavailable > 0
        //           ? `#d71616`
        //           : '',
        //     },
        //   };
        // }}
        // columns={[
        //   {
        //     Header: 'Page',
        //     columns: [
        //       {
        //         Header: 'Page',
        //         accessor: 'pageTitle',
        //         Cell: row => (
        //           <Link
        //             prefetch
        //             href={{
        //               pathname: '/webpage',
        //               query: { id: row.original.id },
        //             }}>
        //             <a>{row.value}</a>
        //           </Link>
        //         ),
        //       },

        //       { Header: 'URL', accessor: 'url' },
        //       { Header: 'Word Count', accessor: 'wordCount' },
        //     ],
        //   },
        //   {
        //     Header: 'Links',
        //     columns: [
        //       { Header: 'Valid', accessor: 'valid' },

        //       {
        //         Header: '3rd Party',
        //         accessor: 'thirdParty',
        //       },
        //       {
        //         Header: 'Unavailable',
        //         accessor: 'unavailable',
        //       },
        //       { Header: 'Total Links', accessor: 'totalLinks' },
        //     ],
        //   },
        // ]}
        // defaultPageSize={10}
        // className="-striped -highlight"
       */}
      </DashboardContainer>
    </PageSection>
  );
};

// state = {
//   domain: '', //Domain that you are selecting and querying
//   showAddDomain: false,
// };

// saveToState = e => {
//   this.setState({ [e.target.name]: e.target.value });
// };

// toggleAddDomain = () => {
//   this.setState({
//     showAddDomain: !this.state.showAddDomain,
//   });
//   console.log('Toggled addDomain window');
// };

// hideAddDomain = () => {
//   this.setState({
//     showAddDomain: false,
//   });
//   console.log('Closed the addDomain window');
// };
//   {/* //   <Query */}
//   {/* //     query={CURRENT_USER_QUERY} */}
//   {/* //     onCompleted={() => console.log('Completed the query')}> */}
//   {/* //     {({ data, error, loading }) => ( */}
//   {/* //       <> */}
//   {/* //         <Error error={error} /> */}
//   {/* <label htmlFor="domains" onChange={this.saveToState}> */}
//     {/* <select name="domain" id="domain"> */}
//       {/* //             {loading ? ( */}
//       {/* <option>Loading...</option> */}
//       {/* // ) : data.me.domains.length ? ( // data.me.domains.map(domain => ( */}
//       {/* <option key={domain.id}>{domain.hostname}</option> */}
//       {/* // )) // ) : ( // <option name="">No domains</option> */}
//       {/* // )} */}
//     {/* </select> */}
//   {/* </label> */}
//   {/*
// //         <StyledAddDomainButton
// //           disabled={this.state.showAddDomain}
// //           onClick={this.toggleAddDomain}>
// //           +
// //         </StyledAddDomainButton>
// //         <AddDomain
// //           showAddDomain={this.state.showAddDomain}
// //           toggleAddDomain={this.toggleAddDomain}
// //           hideAddDomain={this.hideAddDomain}
// //         />
// //         <DomainDataDisplay data={data} domain={this.state.domain} />
// //       </>
// //     )}
// //   </Query>*/}

export default Dashboard;
