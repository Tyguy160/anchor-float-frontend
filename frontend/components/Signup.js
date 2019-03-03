import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import StripeCheckout from 'react-stripe-checkout';

import signup from '../pages/signup';
import LoadingGraphic from './LoadingGraphic';
import {
  Container,
  SignupHeading,
  SignupFormContainer,
  ContinueButton,
} from './SignupContainer';
import SignupContainer from './SignupContainer';

const PAGE_COUNT_QUERY = gql`
  mutation PAGE_COUNT_QUERY($domain: String!, $sitemap: String!) {
    getPageCount(domain: $name, email: $email, password: $password) {
      id
    }
  }
`;

const LoadingContainer = styled(Container)`
  text-align: center;
  justify-items: center;
`;

const PricingContainer = styled(Container)``;

const PricingHeading = styled(SignupHeading)``;

const InnerPricingContainer = styled(SignupFormContainer)`
  max-width: 350px;
`;

const Pricing = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 4px;
  padding: 25px;

  @media screen and (min-width: 400px) {
    box-shadow: 0px 2px 10px 2px #ccc;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Price = styled.div`
  margin: 0;
  font-size: 3em;
  font-weight: 300;
  padding: 0;
  text-align: center;
  /* :before {
    content: '$';
    font-size: 0.7em;
    vertical-align: text-top;
  } */
`;

const PriceDetails = styled.div`
  color: #999;
  text-align: center;
  padding-bottom: 10px;
`;

const WebsiteDetails = styled.div`
  text-align: center;
  padding-top: 10px;
  display: grid;
  grid-gap: 10px;
`;

const handler = StripeCheckout.configure({
  key: 'pk_test_mqMxPm3hGXqDIiwIVvAME4Af',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: function(token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
  },
});

class Signup extends Component {
  state = {
    websiteURL: 'www.example.com',
    sitemapURLs: 'www.example.com/sitemap.xml',
    pageCount: 614,
  };

  createAccount = async (e, signup) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Call the mutation
    const res = await signup();

    console.log(res.data);
    console.log('Created account');
  };

  requestPricing = async (e, pricing) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Call the mutation
    const res = await pricing();

    // console.log(res.data);
    console.log('Requested pricing');
  };

  handleChange = e => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: value,
    });
  };

  openStripe = e => {
    // Open Checkout with further options:
    handler.open({
      name: 'Maschino LLC',
      description: '2 widgets',
      amount: 2000,
    });
    e.preventDefault();
  };

  // Close Checkout on page navigation:
  // window.addEventListener('popstate', function() {
  //   handler.close();
  // });

  render() {
    return (
      <Mutation mutation={PAGE_COUNT_QUERY} variables={this.state}>
        {(getPageCount, { loading, error, data }) =>
          loading ? (
            <LoadingContainer>
              <div>
                <h1>Hang tight...</h1>
                <h3>We're generating your site's pricing</h3>
              </div>
              <LoadingGraphic />
            </LoadingContainer>
          ) : !data ? (
            <PricingContainer>
              <PricingHeading>Get your site's report today!</PricingHeading>
              <InnerPricingContainer>
                <Pricing>
                  <Price>{(49 + this.state.pageCount * 0.05).toFixed(2)}</Price>
                  {}
                  <PriceDetails>$49 + $0.05/page</PriceDetails>
                  <hr style={{ width: '100%', size: '1px' }} />
                  <WebsiteDetails>
                    <div>www.example.com</div>
                    <div>{this.state.pageCount} pages</div>
                  </WebsiteDetails>
                </Pricing>
                <ButtonContainer>
                  <ContinueButton type="submit" value="Start over" />
                  <button id="customButton">Purchase</button>
                </ButtonContainer>
              </InnerPricingContainer>
            </PricingContainer>
          ) : (
            <SignupContainer
              error={error}
              websiteURL={this.state.websiteURL}
              sitemapURLs={this.state.sitemapURLs}
              handleChange={this.handleChange}
            />
          )
        }
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };
