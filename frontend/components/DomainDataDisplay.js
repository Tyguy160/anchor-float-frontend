// import React from 'react';
// import { Query, Mutation } from 'react-apollo';
// import gql from 'graphql-tag';
// import ReactTable from 'react-table';
// import styled from 'styled-components';
// import Error from './ErrorMessage';
// import Link from 'next/link';
// import Router from 'next/router';

// const DOMAIN_PAGES_QUERY = gql`
//   query DOMAIN_PAGES_QUERY($hostname: String!) {
//     pages(hostname: $hostname) {
//       id
//       url
//       pageTitle
//       wordCount
//       links {
//         id
//         url
//         product {
//           id
//           asin
//           name
//           availability
//         }
//       }
//     }
//   }
// `;

// const DASHBOARD_INITIAL_LOAD = gql`
//   query DASHBOARD_INITIAL_LOAD {
//     me {
//       id
//       email
//       name
//       domains(first: 1) {
//         id
//         hostname
//         pages(first: 20) {
//           id
//           url
//           wordCount
//         }
//       }
//     }
//     domains {
//       id
//       hostname
//     }
//   }
// `;

// const StyledTableContainer = styled.div`
//   margin: 0 20px 20px 20px;
// `;

// function countLinks(links, linkType) {
//   return links
//     .filter(link => link.product)
//     .filter(link => link.product.availability === linkType).length;
// }

// const DomainDataDisplay = props => {
//   return (
//     <div>
//       <h3>Domain Data</h3>
//       <StyledTableContainer>
//         {props.data.me.domains.length ? (
//           <Query
//             query={DOMAIN_PAGES_QUERY}
//             variables={{
//               hostname: props.domain.length
//                 ? props.domain
//                 : props.data.me.domains[0].hostname,
//             }}>
//             {({ loading, data, error }) => {
//               if (loading) {
//                 return <p>Loading...</p>;
//               }
//               if (error) {
//                 return <Error />;
//               }
//               if (data.pages.length) {
//                 let dataArray = [];
//                 data.pages.map(page => {
//                   let url = new URL(page.url);
//                   let pageData = {
//                     pageTitle: page.pageTitle ? page.pageTitle : 'My Page',
//                     url: <a href={url}>{url.pathname}</a>,
//                     id: page.id,
//                     wordCount: page.wordCount,
//                     valid: countLinks(page.links, 'AMAZON'),
//                     thirdParty: countLinks(page.links, 'THIRDPARTY'),
//                     unavailable: countLinks(page.links, 'UNAVAILABLE'),
//                     totalLinks: page.links.length,
//                   };
//                   dataArray.push(pageData);
//                 });

//                 return (
//                   <>
//                     <ReactTable
//                       data={dataArray}
//                       defaultSorted={[
//                         {
//                           id: 'unavailable',
//                           desc: true,
//                         },
//                       ]}
//                       getTdProps={(state, rowInfo, column) => {
//                         return {
//                           style: {
//                             color:
//                               column.id === 'unavailable' &&
//                               rowInfo.row.unavailable > 0
//                                 ? 'white'
//                                 : 'black',
//                             backgroundColor:
//                               column.id === 'unavailable' &&
//                               rowInfo.row.unavailable > 0
//                                 ? `#d71616`
//                                 : '',
//                           },
//                         };
//                       }}
//                       columns={[
//                         {
//                           Header: 'Page',
//                           columns: [
//                             {
//                               Header: 'Page',
//                               accessor: 'pageTitle',
//                               Cell: row => (
//                                 <Link
//                                   prefetch
//                                   href={{
//                                     pathname: '/webpage',
//                                     query: { id: row.original.id },
//                                   }}>
//                                   <a>{row.value}</a>
//                                 </Link>
//                               ),
//                             },

//                             { Header: 'URL', accessor: 'url' },
//                             { Header: 'Word Count', accessor: 'wordCount' },
//                           ],
//                         },
//                         {
//                           Header: 'Links',
//                           columns: [
//                             { Header: 'Valid', accessor: 'valid' },

//                             {
//                               Header: '3rd Party',
//                               accessor: 'thirdParty',
//                             },
//                             {
//                               Header: 'Unavailable',
//                               accessor: 'unavailable',
//                             },
//                             { Header: 'Total Links', accessor: 'totalLinks' },
//                           ],
//                         },
//                       ]}
//                       defaultPageSize={10}
//                       className="-striped -highlight"
//                     />
//                     <div>
//                       <h3>Unavailable Products</h3>
//                       <ul>
//                         <li>
//                           {data.pages
//                             .map(page => countLinks(page.links, 'UNAVAILABLE'))
//                             .reduce(
//                               (accumulator, currentValue) =>
//                                 accumulator + currentValue
//                             )}
//                         </li>
//                       </ul>
//                     </div>
//                     <div>
//                       <h3>3rd Party Products</h3>
//                       <ul>
//                         <li>
//                           {data.pages
//                             .map(page => countLinks(page.links, 'THIRDPARTY'))
//                             .reduce(
//                               (accumulator, currentValue) =>
//                                 accumulator + currentValue
//                             )}
//                         </li>
//                       </ul>
//                     </div>
//                   </>
//                 );
//               } else {
//                 return (
//                   <div>
//                     No pages exist for this domain.
//                     <div>
//                       Add one <button>here</button>
//                     </div>
//                   </div>
//                 );
//               }
//             }}
//           </Query>
//         ) : (
//           'No data'
//         )}
//       </StyledTableContainer>
//     </div>
//   );
// };

// export default DomainDataDisplay;
