import { memo } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectState as selectAuthenticatorState } from 'containers/common/Authenticator/selectors';

import TeamPage from './Container';
import { selectState } from './selectors';
import { loadPlan, loadTeam } from './actions';
import injectSaga from 'client-utils/common/redux/inject-saga';
import injectReducer from 'client-utils/common/redux/inject-reducer';

import { KEY } from './constants';
import saga from './saga';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  authenticatorState: selectAuthenticatorState(),
  teamState: selectState(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadTeam: payload => dispatch(loadTeam(payload)),
    loadPlan: payload => dispatch(loadPlan(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: KEY, saga });
const withReducer = injectReducer({ key: KEY, reducer });

export default compose(withSaga, withReducer, withConnect, memo)(TeamPage);
