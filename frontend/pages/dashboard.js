import React, { Component } from 'react';
import Authenticate from '../components/Account/Authenticate';
import Dashboard from '../components/Dashboard/Dashboard';

class DashboardPage extends Component {
  render() {
    return (
      <Authenticate>
        <Dashboard />
      </Authenticate>
    );
  }
}

export default DashboardPage;
