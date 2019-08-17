import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import AddDomain from './AddDomain';
import styled from 'styled-components';
import DomainDataDisplay from './DomainDataDisplay';
import { useQuery } from '@apollo/react-hooks';
import { USERSITES_QUERY } from './resolvers/resolvers';

const StyledAddDomainButton = styled.button`
  margin: 10px;
  width: 30px;
  height: 30px;
`;

const DashboardContainer = styled.div`
  padding: 20px;
`;

const StyledTable = styled.table`
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

  return (
    <DashboardContainer>
      <select defaultValue="">
        {userSites.userSites &&
          userSites.userSites.map(site => (
            <option key={site.hostname}>{site.hostname}</option>
          ))}
        <option disabled value="">
          Select a domain
        </option>
      </select>
      <h2>Dashboard</h2>
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
            <td style={{ fontWeight: `bold` }}>65</td>
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
            <td style={{ paddingLeft: `60px` }}>Links missing affiliate tag</td>
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
            <td style={{ fontWeight: `bold` }}>93730</td>
          </tr>
          <tr>
            <td>Word count per page</td>
            <td />
            <td style={{ fontWeight: `bold` }}>1442</td>
          </tr>
        </tbody>
      </StyledTable>
      <h2>Previous scans</h2>
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
