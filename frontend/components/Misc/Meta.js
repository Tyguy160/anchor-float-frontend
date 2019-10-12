import Head from 'next/head';

const Meta = () => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/favicon.png" />
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      <title>Associate Engine</title>
      <script src="https://js.stripe.com/v3/"></script>
    </Head>
  );
};

export default Meta;
