import { takeLatest, put, call } from 'redux-saga/effects';

import request from 'client-utils/common/request';
import apiStructure from 'helpers/common/apiStructure';

import { createTeam } from './actions';

export function* doCreateTeam() {
  const requestURL = apiStructure.createTeam.fullPath;

  try {
    yield put(createTeam.request());

    const result = yield call(request, requestURL, {
      method: 'POST',
    });

    if (result.error) {
      yield put(createTeam.failure(result));
    } else {
      yield put(createTeam.success(result));
    }
  } catch (err) {
    yield put(createTeam.failure(err));
  } finally {
    yield put(createTeam.fulfill());
  }
}

export default function* saga() {
  yield takeLatest(createTeam.TRIGGER, doCreateTeam);
}
