import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import ReactGA from "react-ga";
ReactGA.initialize("UA-000000-01");
ReactGA.pageview(window.location.pathname + window.location.search);

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @import url(https://fonts.googleapis.com/css?family=Quicksand);
              @import url(https://fonts.googleapis.com/css?family=Assistant);
              html, body {
                font-family: 'Quicksand','Assistant', sans-serif;
                padding: 0;
                margin: 0;
                color: #383838;
                background-color: whitesmoke;
              }`
            }}
          ></style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
