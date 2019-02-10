import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';

// TODO: This piece of code is serious work in progress...

const DOMAIN_REPORT_QUERY = gql`
  query DOMAIN_REPORT_QUERY($id: ID!) {
    domain(where: { id: $id }) {
      hostname
      pages {
        wordCount
        links {
          id
          product {
            asin
            availability
          }
        }
        amazonProducts: links(where: { product: { availability: AMAZON } }) {
          id
          product {
            asin
          }
        }
        unavailableProducts: links(
          where: { product: { availability: UNAVAILABLE } }
        ) {
          id
          product {
            asin
          }
        }
        thirdPartyProducts: links(
          where: { product: { availability: THIRDPARTY } }
        ) {
          id
          product {
            asin
          }
        }
      }
    }
  }
`;

class DomainReport extends Component {
  render() {
    return (
      <Query
        query={DOMAIN_REPORT_QUERY}
        variables={{ id: this.props.id ? this.props.id : '' }}>
        {({ loading, data, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error />;
          console.log(data);

          return (
            <div>
              <h2>Domain Report - {data.domain.hostname}</h2>
              <h3>Site Totals</h3>
              <div>Total pages: {data.domain.pages.length}</div>
              <div>
                Total word count:{' '}
                {data.domain.pages
                  .map(page => page.wordCount)
                  .reduce((accumulator, total) => accumulator + total)}
              </div>
              <div>
                Total links:{' '}
                {data.domain.pages
                  .map(page => page.links.length)
                  .reduce((accumulator, total) => accumulator + total)}
              </div>
              <div>
                Total Affiliate Links:{' '}
                {console.log(
                  data.domain.pages.map(page => page.amazonProducts)
                )
                //   .filter(product => (product ? 1 : 0))
                //   .reduce((accumulator, total) => accumulator + total)
                }
              </div>
              <h3>Unavailable</h3>
              <h3>3rd Part</h3>
              This is the report for your domain
            </div>
          );
        }}
      </Query>
    );
  }
}

export default DomainReport;
