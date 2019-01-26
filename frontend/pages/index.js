import React, { Component } from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  color: white;
  background-image: url('../static/blake-connally-373084-unsplash.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: grid;
  justify-items: center;
`;

const HeroHeadline = styled.div`
  display: grid;
  font-size: 3em;
  text-align: center;
  align-self: end;
  margin-bottom: 100px;
  text-shadow: 1px 1px 3px #888;
`;

const CTA = styled.div`
  > button {
    margin: 20px;
    padding: 10px 20px 10px 20px;
    box-shadow: 1px 1px 1px 1px #c4941c;
    cursor: pointer;
    font-size: 1.5em;
    font-family: 'Quicksand', sans-serif;
    background-color: goldenrod;
    border-radius: 2px;
    border: none;
  }
`;

const Home = props => {
  return (
    <div>
      <HeroContainer>
        <HeroHeadline>
          <div>You've worked hard to make valuable content</div>
          <div>Protect Your Asset</div>
        </HeroHeadline>
        <CTA>
          <button>Learn more</button>
          <button>Sign up</button>
        </CTA>
      </HeroContainer>
      <div>
        <h2>What is Affiliate Shield?</h2>
      </div>

      <div>
        <h2>What You Get</h2>
      </div>

      <div>
        <h2>How It Works</h2>
      </div>

      <div id="pricing">
        <h2>Pricing</h2>
      </div>
    </div>
  );
};

export default Home;
