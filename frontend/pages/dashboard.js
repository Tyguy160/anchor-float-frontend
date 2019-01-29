import React, { Component } from 'react';
import Authenticate from '../components/Authenticate';

class Dashboard extends Component {
  render() {
    return (
      <Authenticate>
        <div>This is a dashboard</div>
      </Authenticate>
    );
  }
}

export default Dashboard;
