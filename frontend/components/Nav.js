import React from 'react';
import Link from 'next/link';

const Nav = () => {
  return (
    <div>
      <Link href="/">
        <a>Affiliate Shield</a>
      </Link>
      {/* <Link href="/about">
        <a>About</a>
      </Link> */}
      <Link href="/signup">
        <a>Sign Up</a>
      </Link>
      {/* <Link href="/account">
        <a>Account</a>
      </Link> */}
    </div>
  );
};

export default Nav;
