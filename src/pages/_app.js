import React from 'react';

import { Provider } from 'react-redux';
import Head from 'next/head';
import App from 'next/app';
import Analytics from 'containers/common/Analytics';
import Konami from 'containers/common/Konami';
import Notifications from 'containers/common/Notifications';

import withReduxStore from 'client-utils/common/redux/with-redux-store';
import appConfig from 'helpers/appConfig';
import AppWrapper from 'components/common/AppWrapper';
import { enableES5 } from 'immer';

import GlobalCSS from 'global.styles';
import ErrorBoundary from 'components/ErrorBoundary';
import { StyledThemeProvider } from '@george-gillams/components/styled-theming';
import { HYROX_THEME } from 'constants/hyrox-theme';

// Ensures that `immer` will work inside Internet Explorer
enableES5();

class Srr extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <React.StrictMode>
        <Head>
          <title>{appConfig.projectTitle}</title>
          {appConfig.app.head.meta.map(m => (
            <meta key={m.property} name={m.property} content={m.content} />
          ))}
        </Head>
        <GlobalCSS />

        <ErrorBoundary>
          <StyledThemeProvider theme={HYROX_THEME}>
            <Provider store={reduxStore}>
              <AppWrapper>
                <Notifications />
                <Konami />
                <Analytics />
                <Component {...pageProps} />
              </AppWrapper>
            </Provider>
          </StyledThemeProvider>
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}

export default withReduxStore(Srr);
