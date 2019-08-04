import React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  display: grid;
  height: 100%;
  align-items: center;
  justify-items: center;
  padding: 20px;
`;

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <ErrorMessage>
        <h2>{this.props.statusCode}</h2>
        <p>Uh oh...something went wrong. That page doesn't seem to exist 🤷‍</p>
      </ErrorMessage>
    );
  }
}
