import React, { Component } from "react";
import styled from "styled-components";
import Meta from "./Meta";
import Header from "../Nav/Header";
import { Footer, FooterText } from "../styles/styles";

class Page extends Component {
  render() {
    return (
      <>
        <Meta />
        <Header />
        {this.props.children}
      </>
    );
  }
}

export default Page;
