import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import DebugObject from 'components/common/DebugObject';
import Paragraph from '@george-gillams/components/paragraph';
import ErrorDisplay from 'components/common/ErrorDisplay';
import PageContainer from 'components/common/PageContainer';

import { withRouter } from 'next/router';
import Spinner from '@george-gillams/components/spinner';

const EmailVerification = props => {
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  const {
    router,
    verify,

    verificationState,
    authenticatorState,
  } = props;

  const { verifyError, verifyResult, verifying } = verificationState;

  useEffect(() => {
    // Prevent react-double render bug by ensuring login request is only made once the component has been mounted for 100ms
    const timeout = setTimeout(() => {
      let token = null;
      if (router && router.query) {
        token = router.query.token;
      }
      if (!verificationAttempted && token) {
        setVerificationAttempted(true);
        verify(token);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [router, verificationAttempted, verify]);

  const success = verifyResult && !verifyError;

  return (
    <PageContainer bottomPadding>
      <PageTitle name={success ? 'Email confirmed' : 'Confirming email'}>
        {success && (
          <>
            <Paragraph>Thank you for confirming your email address</Paragraph>
          </>
        )}
        {(verifying || !verificationAttempted) && <Spinner large />}
        <ErrorDisplay message="Something went wrong whilst confirming your email" error={verifyError}></ErrorDisplay>
      </PageTitle>

      <DebugObject
        debugTitle="EmailVerification"
        debugObject={{
          verify,
          authenticatorState,
          verificationState,
        }}
      />
    </PageContainer>
  );
};

EmailVerification.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
    query: PropTypes.shape({
      token: PropTypes.string,
      redirect: PropTypes.string,
    }).isRequired,
  }),
  verify: PropTypes.func.isRequired,
  verificationState: PropTypes.shape({
    token: PropTypes.string,
    verifying: PropTypes.bool,
    verifyError: PropTypes.object,
    verifyResult: PropTypes.object,
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

EmailVerification.defaultProps = {
  router: null,
  verificationState: null,
  magicLoginState: null,
};

export default withRouter(EmailVerification);
