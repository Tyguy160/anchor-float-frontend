import React, { Component } from 'react';
import Authenticate from '../components/Authenticate';
import DomainContainer from '../components/DomainContainer';

class Domains extends Component {
  render() {
    return (
      <Authenticate>
        <DomainContainer />
      </Authenticate>
    );
  }
}

export default Domains;
