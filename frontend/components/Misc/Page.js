import React, { Component } from 'react';
import styled from 'styled-components';
import Meta from './Meta';
import Header from '../Nav/Header';
import { Footer, FooterText } from '../styles/styles';

class Page extends Component {
  render() {
    return (
      <>
        <Meta />
        <Header />
        {this.props.children}
        {/* <Footer>
          <FooterText>&copy;{new Date().getFullYear()} Anchor Float</FooterText>
        </Footer> */}
      </>
    );
  }
}

export default Page;
