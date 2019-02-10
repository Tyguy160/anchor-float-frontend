import React from 'react';
import DomainReport from '../components/DomainReport';
import Authenticate from '../components/Authenticate';
const Report = props => {
  return (
    <Authenticate>
      <DomainReport id={props.query.id} />
    </Authenticate>
  );
};

export default Report;
