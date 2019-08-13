import React, { Component } from 'react';
import Authenticate from '../components/Authenticate';
import Account from '../components/Account';
class AccountPage extends Component {
  render(props) {
    return (
      <Authenticate>
        <Account />
      </Authenticate>
    );
  }
}

export default AccountPage;
