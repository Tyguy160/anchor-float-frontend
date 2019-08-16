import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SignOut from './SignOut';

import { NavBar, Logo, Links, StyledLink } from './styles/styles';

const GET_CURRENT_USER = gql`
  query me {
    me {
      id
    }
  }
`;

const Nav = props => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  if (loading || !data.me) {
    return (
      <NavBar>
        <Link href="/" passHref>
          <Logo>
            <img
              src="/static/logo.png"
              style={{
                maxHeight: `30px`,
                marginTop: `5px`,
              }}
            />
            <div>Anchor Float</div>
          </Logo>
        </Link>
        <Links>
          {/* <Link href="/signup" passHref>
            <StyledLink>Sign Up</StyledLink>
          </Link> */}
          {/* <Link href="/#learn-more" passHref>
            <StyledLink>Learn More</StyledLink>
          </Link> */}
          <Link href="/" passHref>
            <StyledLink>Home</StyledLink>
          </Link>
          <Link href="/pricing" passHref>
            <StyledLink>Pricing</StyledLink>
          </Link>
          <Link href="/about" passHref>
            <StyledLink>About</StyledLink>
          </Link>
          <Link href="/signin" passHref>
            <StyledLink>Sign In</StyledLink>
          </Link>
        </Links>
      </NavBar>
    );
  }
  if (data) {
    return (
      <NavBar>
        <Link href="/" passHref>
          <Logo>
            <img
              src="/static/logo.png"
              style={{
                maxHeight: `30px`,
                marginTop: `5px`,
              }}
            />
            <div>Anchor Float</div>
          </Logo>
        </Link>
        <Links>
          <Link href="/dashboard" passHref>
            <StyledLink>Dashboard</StyledLink>
          </Link>
          {/* <Link href="/domains" passHref>
            <StyledLink>Domains</StyledLink>
          </Link> */}
          <Link href="/account" passHref>
            <StyledLink>Account</StyledLink>
          </Link>
          <SignOut />
        </Links>
      </NavBar>
    );
  }
};

export default Nav;
