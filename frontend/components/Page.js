import React, { Component } from 'react';
import styled from 'styled-components';
import Meta from './Meta';
import Header from './Header';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: whitesmoke;
`;

class Page extends Component {
  render() {
    return (
      <PageContainer>
        <Meta />
        <Header />
        {this.props.children}
      </PageContainer>
    );
  }
}

export default Page;
