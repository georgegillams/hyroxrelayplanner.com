import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import DebugObject from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';

import Skeleton from './Skeleton';

import { LoggedOutOnly } from 'components/common/Walls';
import PageContainer from 'components/common/PageContainer';
import { StyledSignUpForm, StyledTextLink } from './sign-up.styles';
import { VStack } from 'components/common/Stacks';

const SignUp = props => {
  const [credentials, setCredentials] = useState({});

  const {
    signUp,

    signUpState,
    authenticatorState,
  } = props;

  let preSubmitText = null;
  if (signUpState.signUpResult && signUpState.signUpResult.success) {
    preSubmitText = signUpState.signUpResult.success;
  }
  if (signUpState.signUpError && signUpState.signUpError.errorMessage) {
    preSubmitText = signUpState.signUpError.errorMessage;
  }

  const page = (
    <PageContainer bottomPadding>
      <LoggedOutOnly user={authenticatorState.user}>
        <PageTitle name="Sign up">
          <StyledSignUpForm
            loading={signUpState.signingUp}
            credentials={credentials}
            onDataChanged={setCredentials}
            onSubmit={() => {
              signUp(credentials);
            }}
            preSubmitText={preSubmitText}
          />
          <VStack>
            <StyledTextLink href="/login">Already got an account? Login here.</StyledTextLink>
            <StyledTextLink href="/privacy">Privacy policy</StyledTextLink>
          </VStack>
        </PageTitle>
      </LoggedOutOnly>
    </PageContainer>
  );

  return (
    <>
      <LoadingCover loadingSkeleton={Skeleton} loading={authenticatorState.user === undefined} error={false}>
        {page}
      </LoadingCover>
      <DebugObject
        debugTitle="SignUp"
        debugObject={{
          signUp,
          authenticatorState,
          signUpState,
        }}
      />
    </>
  );
};

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  signUpState: PropTypes.shape({
    signingUp: PropTypes.bool,
    signUpError: PropTypes.object,
    signUpResult: PropTypes.object,
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

SignUp.defaultProps = {
  authenticatorState: null,
  signUpState: null,
};

export default SignUp;
