import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import SignOut from '../Account/SignOut';

import { GET_CURRENT_USER } from '../resolvers/resolvers';

import { NavBar, Logo, Links, StyledLink } from '../styles/styles';

const Nav = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER);
  const me = data ? data.me : null;
  return (
    <NavBar>
      <Link href="/" passHref>
        <Logo style={{ cursor: 'pointer' }}>
          <img
            src="/logo.png"
            style={{
              maxHeight: `30px`,
              marginTop: `5px`,
            }}
          />
          <div style={{ cursor: 'pointer' }}>Anchor Float</div>
        </Logo>
      </Link>
      <Links>
        {me && (
          <>
            <Link href="/dashboard" passHref>
              <StyledLink>Dashboard</StyledLink>
            </Link>
            <Link href="/account" passHref>
              <StyledLink>Account</StyledLink>
            </Link>
            <SignOut />
          </>
        )}
        {!me && (
          <>
            <Link href="/signup" passHref>
              <StyledLink>Sign Up</StyledLink>
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
          </>
        )}
      </Links>
    </NavBar>
  );
};

export default Nav;
