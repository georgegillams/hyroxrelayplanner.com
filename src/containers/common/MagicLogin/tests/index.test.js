import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialState } from '../reducer';
import { initialState as initialAuthenticatorState } from 'containers/common/Authenticator/reducer';

import configureStore from 'client-utils/common/redux/configure-store';

import MagicLoginIndex from '../index';
import MagicLogin from '../Container';

jest.mock('next/router', () => ({ withRouter: component => component }));

describe('<MagicLogin />', () => {
  let store;
  const spy = jest.fn();

  beforeAll(() => {
    store = configureStore({});
  });

  it('should render correctly - index', () => {
    const { container } = render(
      <Provider store={store}>
        <MagicLoginIndex />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with initial state', () => {
    const { container } = render(
      <Provider store={store}>
        <MagicLogin
          login={spy}
          magicLoginState={{
            ...initialState,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with loggingIn=true', () => {
    const { container } = render(
      <Provider store={store}>
        <MagicLogin
          login={spy}
          magicLoginState={{
            ...initialState,
            loggingIn: true,
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with logInError', () => {
    const { container } = render(
      <Provider store={store}>
        <MagicLogin
          login={spy}
          magicLoginState={{
            ...initialState,
            logInError: { error: 'not_found', errorMessage: 'Invalid session' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with user', () => {
    const { container } = render(
      <Provider store={store}>
        <MagicLogin
          login={spy}
          magicLoginState={{
            ...initialState,
            logInResult: { success: 'logged in' },
          }}
          authenticatorState={{
            ...initialAuthenticatorState,
            user: { name: 'userName' },
          }}
        />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
