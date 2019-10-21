import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { USERSITES_QUERY, SITEPAGES_QUERY } from '../resolvers/resolvers';
import { PageSection } from '../styles/styles';
import AddDomain from './AddDomain';
import DomainSettings from './DomainSettings';
import DomainData from './DomainData';
import DomainSelection from './DomainSelection';

const DashboardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
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

  // These hooks are for the selected domain *name*, not the user site
  const [selectedDomain, setSelectedDomain] = useState();

  // These hooks are for the selected user site, not the domain name
  const [selectedUserSite, setSelectedUserSite] = useState();

  const [domain, setDomain] = useState('');
  const [newDomain, setNewDomain] = useState(null);

  return (
    <DashboardContainer>
      <DomainDataContainer>
        <DomainSelection
          styles={{ gridArea: 'domainSelection' }}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          // domain={domain}
          // setDomain={setDomain}
          userSites={userSites}
          selectedUserSite={selectedUserSite}
          setSelectedUserSite={setSelectedUserSite}
        />
        <DomainData />
      </DomainDataContainer>
      <DomainSettingsContainer>
        <DomainSettings
          selectedUserSite={selectedUserSite}
          setSelectedUserSite={setSelectedUserSite}
          // userSites={userSites}
        />
        <AddDomain />
      </DomainSettingsContainer>
    </DashboardContainer>

    // <PageSection>
    //   <DashboardContainer>
    //     <select
    //       defaultValue=""
    //       onChange={async e => {
    //         e.persist();
    //         const hostname = e.target.value;
    //         setSiteSelection(e.target.value);
    //         getSitePages({
    //           variables: { input: { hostname } },
    //         });
    //       }}>
    //       {userSites.userSites &&
    //         userSites.userSites.map(site => (
    //           <option key={site.hostname} value={site.hostname}>
    //             {site.hostname}
    //           </option>
    //         ))}
    //       <option disabled value="">
    //         Select a domain
    //       </option>
    //     </select>
    //     <h2>Dashboard</h2>
    //     {siteSelection ? (
    //       <>
    //         <button>Scan now</button>
    //         <button>Settings</button>
    //         <StyledTable>
    //           <thead>
    //             <tr style={{ borderBottom: `2px gray solid` }}>
    //               <th>Category</th>
    //               <th>%</th>
    //               <th>#</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td>Pages</td>
    //               <td>-</td>
    //               <td style={{ fontWeight: `bold` }}>
    //                 {sitePages.sitePages
    //                   ? sitePages.sitePages.site.pages.length
    //                   : '?'}
    //               </td>
    //             </tr>
    //             <tr>
    //               <td>Amazon products</td>
    //               <td>-</td>
    //               <td style={{ fontWeight: `bold` }}>156</td>
    //             </tr>
    //             <tr>
    //               <td>Amazon affiliate links</td>
    //               <td />
    //               <td style={{ fontWeight: `bold` }}>420</td>
    //             </tr>
    //             <tr>
    //               <td style={{ paddingLeft: `40px` }}>OK links</td>
    //               <td style={{ color: `green`, fontWeight: `bold` }}>89.1</td>
    //               <td style={{ color: `green`, fontWeight: `bold` }}>374</td>
    //             </tr>
    //             <tr>
    //               <td style={{ paddingLeft: `40px` }}>NOK links</td>
    //               <td style={{ color: `red`, fontWeight: `bold` }}>10.9</td>
    //               <td style={{ color: `red`, fontWeight: `bold` }}>46</td>
    //             </tr>
    //             <tr>
    //               <td style={{ paddingLeft: `60px` }}>Unavailable</td>
    //               <td>30.4</td>
    //               <td>14</td>
    //             </tr>
    //             <tr>
    //               <td style={{ paddingLeft: `60px` }}>404</td>
    //               <td>19.6</td>
    //               <td>9</td>
    //             </tr>
    //             <tr>
    //               <td style={{ paddingLeft: `60px` }}>Out of stock</td>
    //               <td>8.7</td>
    //               <td>4</td>
    //             </tr>
    //             <tr>
    //               <td style={{ paddingLeft: `60px` }}>
    //                 Links missing affiliate tag
    //               </td>
    //               <td>15.2</td>
    //               <td>7</td>
    //             </tr>
    //             <tr>
    //               <td style={{ paddingLeft: `60px` }}>
    //                 Links under rating review threshold of X.X
    //               </td>
    //               <td>26.1</td>
    //               <td>12</td>
    //             </tr>
    //             <tr>
    //               <td>Site word count</td>
    //               <td />
    //               <td style={{ fontWeight: `bold` }}>
    //                 {
    //                   sitePages.sitePages &&
    //                   sitePages.sitePages.site &&
    //                   sitePages.sitePages.site.pages
    //                   ? sitePages.sitePages.site.pages
    //                       .map(page => page.wordCount)
    //                       .reduce((acc, pres) => acc + pres, 0)
    //                   : '?'
    //                 }
    //               </td>
    //             </tr>
    //             <tr>
    //               <td>Word count per page</td>
    //               <td />
    //               <td style={{ fontWeight: `bold` }}>1442</td>
    //             </tr>
    //           </tbody>
    //         </StyledTable>
    //       </>
    //     ) : (
    //       <div>Please select a domain to see its dashboard</div>
    //     )}
    //     <h2>Previous scans</h2>
    //     {siteSelection ? (
    //       <div>
    //         <ul>
    //           <li>
    //             <div>
    //               https://www.TripleBarCoffee.com
    //               <button>+</button>
    //             </div>
    //             <i>07/02/19 17:54 UTC</i>
    //           </li>
    //           <li>
    //             <div>
    //               https://www.TripleBarCoffee.com
    //               <button>+</button>
    //             </div>
    //             <i>07/05/19 17:54 UTC</i>
    //           </li>
    //           <li>
    //             <div>
    //               https://www.TripleBarCoffee.com
    //               <button>+</button>
    //             </div>
    //             <i>07/08/19 17:54 UTC</i>
    //           </li>
    //         </ul>
    //       </div>
    //     ) : (
    //       <div>Please select a domain to see previous scans</div>
    //     )}
    //   </DashboardContainer>
    // </PageSection>
  );
};

export default Dashboard;
