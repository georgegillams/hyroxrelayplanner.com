import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DebugObject from 'components/common/DebugObject';

const Authenticator = props => {
  const { loadAuth, authenticatorState } = props;

  useEffect(() => {
    loadAuth();
  }, []);

  return (
    <div>
      <DebugObject
        debugTitle="Authenticator"
        debugObject={{
          loadAuth,
          authenticatorState,
        }}
      />
    </div>
  );
};

Authenticator.propTypes = {
  loadAuth: PropTypes.func.isRequired,
  authenticatorState: PropTypes.shape({
    loadingAuth: PropTypes.bool,
    loadAuthError: PropTypes.object,
    user: PropTypes.object,
  }).isRequired,
};

Authenticator.defaultProps = {};

export default Authenticator;
