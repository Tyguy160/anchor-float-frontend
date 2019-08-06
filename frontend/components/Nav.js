import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import SignOut from './SignOut';
const GET_CURRENT_USER = gql`
  query me {
    me {
      id
    }
  }
`;

const NavBar = styled.div`
  background: #383838;
  height: 60px;
  box-shadow: 0px 2px 2px 2px #787878;
  display: grid;
  grid-template-rows: 1fr auto;
  @media screen and (max-width: 850px) {
    height: 150px;
  }
`;

const Logo = styled.div`
  @media screen and (max-width: 850px) {
    color: #efefef;
    font-size: 2em;
    text-decoration: none;
    text-align: center;

    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px;
    justify-content: center;
    align-self: center;
  }
`;

const Links = styled.div`
  display: flex;
  @media screen and (max-width: 850px) {
    justify-self: center;
    align-self: end;
    padding-bottom: 15px;
  }
`;

export const StyledLink = styled.a`
  color: #efefef;
  text-decoration: none;
  padding: 0px 20px 0px 20px;
  cursor: pointer;
  @media screen and (max-width: 850px) {
    justify-self: center;
  }
`;

const Nav = props => {
  const { loading, data } = useQuery(GET_CURRENT_USER);

  if (loading || !data) {
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
