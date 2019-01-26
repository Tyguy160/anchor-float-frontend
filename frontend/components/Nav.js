import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavBar = styled.div`
  background: #909090;
  height: 60px;
  box-shadow: 0px 2px 2px 2px #787878;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;

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

const StyledLink = styled.a`
  color: #efefef;
  text-decoration: none;
  padding: 20px;
  @media screen and (max-width: 850px) {
    justify-self: center;
  }
`;

const Logo = styled.a`
  font-weight: 800;
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
    <NavBar>
      <Link href="/" passHref>
        <Logo>Affiliate Shield</Logo>
      </Link>
      <Links>
        <Link href="/#how-it-works" passHref>
          <StyledLink>How it works</StyledLink>
        </Link>
        <Link href="/#pricing" passHref>
          <StyledLink>Pricing</StyledLink>
        </Link>
        <Link href="/about" passHref>
          <StyledLink>About</StyledLink>
        </Link>
        <Link href="/signup" passHref>
          <StyledLink>Start a 14 day trial</StyledLink>
        </Link>
        <Link href="/account" passHref>
          <StyledLink>Sign in</StyledLink>
        </Link>
      </Links>
    </NavBar>
  );
};

export default Nav;
