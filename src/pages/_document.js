import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import appConfig from 'helpers/appConfig';
import { ServerStyleSheet } from 'styled-components';
import JSFeatureDetector, { NO_JS_CLASSNAME } from '@george-gillams/components/js-feature-detector';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en-GB" className={NO_JS_CLASSNAME}>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/favicon-180x180.png" />

          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="64x64" href="/static/favicon/favicon-64x64.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/static/favicon/favicon-512x512.png" />

          <link rel="icon" href="/static/favicon/favicon.ico" />

          <link rel="manifest" href="/static/favicon/site.webmanifest" />

          <link rel="mask-icon" href="/static/favicon/favicon.svg" color={appConfig.themeColor} />
          <link rel="shortcut icon" href="/static/favicon/favicon.png" />

          <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
          {this.props.styleTags}
        </Head>

        <body>
          <JSFeatureDetector />
          {/* Fixes FOUC in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1404468 */}
          <script>0</script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
