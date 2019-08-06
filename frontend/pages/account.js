import React, { Component } from 'react';
import Authenticate from '../components/Authenticate';

class Account extends Component {
  render(props) {
    return (
      <Authenticate>
        <div>This is the account page</div>;
      </Authenticate>
    );
  }
}

export default Account;
