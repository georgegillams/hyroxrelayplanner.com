import React from 'react';
import PageContainer from 'components/common/PageContainer';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import LoadingCover from '@george-gillams/components/loading-cover';
import DebugObject from 'components/common/DebugObject';
import Button from 'components/common/Button';
import { BUTTON_TYPES } from '@george-gillams/components/button/constants';
import { setPostLoginRedirect } from 'client-utils/common/storageHelpers';

import Skeleton from './Skeleton';

import { LoggedInOnly } from 'components/common/Walls';
import { Details, StyledButton, ControlPanel } from './account.styles';

const Account = props => {
  const {
    logout,
    requestVerificationEmail,

    accountState,
    authenticatorState,
  } = props;
  const { user } = authenticatorState;

  const showEmail = user && user.email;
  const showUname = user && user.uname;
  const showUserDetails = showEmail || showUname;

  const page = (
    <PageContainer bottomPadding>
      <LoggedInOnly
        user={authenticatorState.user}
        setLoginRedirect={() => {
          setPostLoginRedirect('account');
        }}>
        <PageTitle name="Account">
          {showUserDetails && (
            <Details>
              {showEmail && <div>{`Email: ${user.email}`}</div>}
              {showUname && <div>{`Display name: ${user.uname}`}</div>}
            </Details>
          )}
          <ControlPanel>
            {user && !user.emailVerified && (
              <>
                <StyledButton
                  loading={accountState && accountState.requestingVerificationEmail}
                  onClick={requestVerificationEmail}>
                  Get a new verification email
                </StyledButton>
              </>
            )}
            {user && user.admin && (
              <>
                <StyledButton href="/admin">Admin</StyledButton>
              </>
            )}
            <Button
              buttonType={BUTTON_TYPES.destructive}
              loading={accountState && accountState.loggingOut}
              onClick={logout}>
              Logout
            </Button>
          </ControlPanel>
        </PageTitle>
      </LoggedInOnly>
    </PageContainer>
  );

  return (
    <>
      <LoadingCover loadingSkeleton={Skeleton} loading={authenticatorState.user === undefined} error={false}>
        {page}
      </LoadingCover>
      <DebugObject
        debugTitle="Account"
        debugObject={{
          logout,
          authenticatorState,
          accountState,
        }}
      />
    </>
  );
};

Account.propTypes = {
  logout: PropTypes.func.isRequired,
  requestVerificationEmail: PropTypes.func.isRequired,
  accountState: PropTypes.shape({
    loggingOut: PropTypes.bool,
    logOutError: PropTypes.object,
    logOutResult: PropTypes.object,
    requestingVerificationEmail: PropTypes.bool,
    requestVerificationEmailError: PropTypes.object,
    requestVerificationEmailResult: PropTypes.object,
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

Account.defaultProps = {
  authenticatorState: null,
  logoutState: null,
};

export default Account;
