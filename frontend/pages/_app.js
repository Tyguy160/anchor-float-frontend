import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from '@apollo/react-hooks';
import withData from '../lib/withData';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    @import url(https://fonts.googleapis.com/css?family=Assistant);
    @import url(https://fonts.googleapis.com/css?family=Quicksand);
    font-family: 'Quicksand','Assistant', sans-serif;
    padding: 0;
    margin: 0;
    color: #383838;
    background-color: whitesmoke
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
      <Container>
        <GlobalStyle />
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
