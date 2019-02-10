import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
const SINGLE_WEBPAGE_QUERY = gql`
  query SINGLE_WEBPAGE_QUERY($id: ID!) {
    page(where: { id: $id }) {
      id
      url
      pageTitle
      wordCount
      links {
        id
        url
        affiliateTagged
        affiliateTagName
        product {
          asin
          availability
        }
      }
    }
  }
`;
class SingleWebPage extends Component {
  render() {
    return (
      <Query
        query={SINGLE_WEBPAGE_QUERY}
        variables={{ id: this.props.id ? this.props.id : '' }}>
        {({ loading, data, error }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return (
              <div>
                <Error />
                <p>I'm sorry, but that page doesn't exist</p>;
              </div>
            );
          }

          if (data.page) {
            console.log(data);
            const listOfAffiliateLinks = data.page.links.filter(
              link => link.affiliateTagged
            );
            // .map(link => link.product);
            console.log(listOfAffiliateLinks);
            return (
              <div>
                <h3>{data.page.pageTitle}</h3>
                {data.page.links.map(link =>
                  link.product ? <p>{link.product.asin}</p> : <p>No asin</p>
                )}
              </div>
            );
          } else {
            return <p>Looks like something went wrong...</p>;
          }
        }}
      </Query>
    );
  }
}

export default SingleWebPage;
