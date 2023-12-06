import { takeLatest, put, call, select } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { loadPlan, loadTeam } from './actions';
import { selectState } from './selectors';

export function* doLoadTeam() {
  const currentState = yield select(selectState());
  const { teamId } = currentState;
  const requestURL = apiStructure.loadTeam.fullPath.replace(':teamId', teamId);

  try {
    yield put(loadTeam.request());

    const result = yield call(request, requestURL, {
      method: 'GET',
    });

    if (result.error) {
      yield put(loadTeam.failure(result));
    } else {
      yield put(loadTeam.success(result));
    }
  } catch (err) {
    yield put(loadTeam.failure(err));
  } finally {
    yield put(loadTeam.fulfill());
  }
}

export function* doLoadPlan() {
  const currentState = yield select(selectState());
  const { teamId } = currentState;
  const requestURL = apiStructure.loadPlan.fullPath.replace(':teamId', teamId);

  try {
    yield put(loadPlan.request());

    const result = yield call(request, requestURL, {
      method: 'GET',
    });

    if (result.error) {
      yield put(loadPlan.failure(result));
    } else {
      yield put(loadPlan.success(result));
    }
  } catch (err) {
    yield put(loadPlan.failure(err));
  } finally {
    yield put(loadPlan.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(loadTeam.TRIGGER, doLoadTeam);
  yield takeLatest(loadPlan.TRIGGER, doLoadPlan);
}
