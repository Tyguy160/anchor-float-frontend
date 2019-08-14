import React, { Component } from 'react';
import Authenticate from '../components/Authenticate';
import Dashboard from '../components/Dashboard';

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
