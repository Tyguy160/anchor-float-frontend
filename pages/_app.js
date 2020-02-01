import App from "next/app";
import Page from "../components/Misc/Page";
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../lib/withData";
import { createGlobalStyle } from "styled-components";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
import Router from "next/router";

import * as gtag from "../lib/analytics";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

toast.configure({
  className: css({
    borderRadius: "5px"
  })
});

const GlobalStyle = createGlobalStyle`
  @import url(https://fonts.googleapis.com/css?family=Assistant);
  @import url(https://fonts.googleapis.com/css?family=Quicksand);
  html, body {
    font-family: 'Quicksand','Assistant', sans-serif;
    padding: 0;
    margin: 0;
    color: #383838;
    background-color: whitesmoke;
  }
`;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // This exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </>
    );
  }
}

export default withData(MyApp);
