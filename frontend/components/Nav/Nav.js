import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import SignOut from '../Account/SignOut';

import { GET_CURRENT_USER } from '../resolvers/resolvers';

import { NavBar, Logo, Links, StyledLink } from '../styles/styles';

const Nav = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  if (loading || !data.me) {
    return (
      <NavBar>
        <Link href="/" passHref>
          <Logo style={{ cursor: 'pointer' }}>
            <img
              src="/static/logo.png"
              style={{
                maxHeight: `30px`,
                marginTop: `5px`,
              }}
            />
            <div style={{ cursor: 'pointer' }}>Anchor Float</div>
          </Logo>
        </Link>
        <Links>
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
