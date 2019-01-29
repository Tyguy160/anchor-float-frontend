import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import User from './User';
import SignOut from './SignOut';

const NavBar = styled.div`
  background: #383838;
  height: 60px;
  box-shadow: 0px 2px 2px 2px #787878;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  z-index: 1;

  @media screen and (max-width: 850px) {
    grid-template-columns: auto;
    height: 120px;
  }
`;

const Links = styled.div`
  justify-self: end;
  display: grid;
  align-items: center;
  display: block;
  @media screen and (max-width: 850px) {
    justify-self: center;
    align-self: center;
  }
`;

export const StyledLink = styled.a`
  color: #efefef;
  text-decoration: none;
  padding: 20px;
  cursor: pointer;
  @media screen and (max-width: 850px) {
    justify-self: center;
  }
`;

const Logo = styled.a`
  font-size: 1.5em;
  color: #efefef;
  padding-left: 20px;
  text-decoration: none;
  @media screen and (max-width: 850px) {
    padding: 0px;
    text-align: center;
    font-size: 2em;
  }
`;

const Nav = () => {
  return (
    <User>
      {payload => (
        <NavBar>
          {payload.data.me && (
            <>
              <Link href="/dashboard" passHref>
                <Logo>Affiliate Shield</Logo>
              </Link>
              <Links>
                <Link href="/dashboard" passHref>
                  <StyledLink>Dashboard</StyledLink>
                </Link>
                <Link href="/account" passHref>
                  <StyledLink>Account</StyledLink>
                </Link>
                {/* //TODO: Create sign out functionality */}
                <SignOut />
              </Links>
            </>
          )}
          {!payload.data.me && (
            <>
              <Link href="/" passHref>
                <Logo>Affiliate Shield</Logo>
              </Link>
              <Links>
                <Link href="/#learn-more" passHref>
                  <StyledLink>Learn More</StyledLink>
                </Link>
                <Link href="/#pricing" passHref>
                  <StyledLink>Pricing</StyledLink>
                </Link>
                <Link href="/about" passHref>
                  <StyledLink>About</StyledLink>
                </Link>
                <Link href="/signup" passHref>
                  <StyledLink>Start 14-day trial</StyledLink>
                </Link>
                <Link href="/signin" passHref>
                  <StyledLink>Sign In</StyledLink>
                </Link>
              </Links>
            </>
          )}
        </NavBar>
      )}
    </User>
  );
};

export default Nav;
