import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import DebugObject from 'components/common/DebugObject';
import Paragraph from '@george-gillams/components/paragraph';

import TextLink from 'components/common/TextLink';
import ErrorDisplay from 'components/common/ErrorDisplay';
import { withRouter } from 'next/router';
import { REDIRECT_REGEX } from '@george-gillams/webapp/helpers/regexConstants';
import Spinner from '@george-gillams/components/spinner';
import PageContainer from 'components/common/PageContainer';

const MagicLogin = props => {
  const [loginAttempted, setLoginAttempted] = useState(false);

  const {
    router,

    login,

    magicLoginState,
    authenticatorState,
  } = props;

  const { logInError, logInResult, loggingIn } = magicLoginState;

  useEffect(() => {
    // Prevent react-double render bug by ensuring login request is only made once the component has been mounted for 100ms
    const timeout = setTimeout(() => {
      let token = null;
      if (router && router.query) {
        token = router.query.token;
      }
      if (!loginAttempted && token) {
        setLoginAttempted(true);
        login(token);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [router, loginAttempted, login]);

  const { user } = authenticatorState;

  const success = user && logInResult && !logInError;

  let redirectLocation = 'account';
  if (success) {
    if (router && router.query) {
      redirectLocation = router.query.redirect;
    }
    if (!redirectLocation || redirectLocation === '' || !redirectLocation.match(REDIRECT_REGEX)) {
      redirectLocation = 'account';
    }
    setTimeout(() => {
      router.push(`/${redirectLocation}`);
    }, 1000);
  }

  return (
    <PageContainer bottomPadding>
      <PageTitle name={success ? 'Logged in' : 'Logging in'}>
        {success && (
          <Paragraph>
            Logged in!
            <br />
            You will now be redirected to the {redirectLocation} page
            <br />
            <TextLink href={redirectLocation}>Not been redirected? Click here</TextLink>
          </Paragraph>
        )}
        {(loggingIn || !loginAttempted) && <Spinner large />}
        <ErrorDisplay message="Something went wrong logging you in" error={logInError}>
          <TextLink href={'/login'}>Try logging in again</TextLink>
        </ErrorDisplay>
      </PageTitle>
      <DebugObject
        debugTitle="MagicLogin"
        debugObject={{
          login,
          authenticatorState,
          magicLoginState,
        }}
      />
    </PageContainer>
  );
};

MagicLogin.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
    query: PropTypes.shape({
      token: PropTypes.string,
      redirect: PropTypes.string,
    }).isRequired,
  }),
  login: PropTypes.func.isRequired,
  magicLoginState: PropTypes.shape({
    token: PropTypes.string,
    loggingIn: PropTypes.bool,
    logInError: PropTypes.object,
    logInResult: PropTypes.object,
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

MagicLogin.defaultProps = {
  router: null,
  authenticatorState: null,
  magicLoginState: null,
};

export default withRouter(MagicLogin);
