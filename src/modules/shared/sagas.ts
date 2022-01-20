import { AxiosResponse } from 'axios';
import { put, all, delay, fork, takeEvery } from 'redux-saga/effects';

import { ActionTypes, Actions, Shared } from './types';
import { closeToast, getPlansFailed, getPlansSuccess } from './actions';
import { ENDPOINTS } from './constants';
import { get } from '../../utils/request';

export default function* rootPatientsSaga() {
  yield all([
    fork(function* () {
      yield takeEvery(ActionTypes.DISPLAY_TOAST, displayToast);
    }),
    fork(function* () {
      yield takeEvery(ActionTypes.GET_PLANS_REQUEST, getPlans);
    }),
  ]);
}

function* displayToast(action: Actions.DisplayToast) {
  const { toast } = action.payload;

  if (toast.timeout) {
    yield delay(toast.timeout);
    yield put(closeToast(toast.id));
  }
}

function* getPlans() {
  try {
    const response: AxiosResponse<Shared.Plan[]> = yield get(ENDPOINTS.PLANS);

    if (response.status === 200) {
      yield put(getPlansSuccess(response.data));
    }
  } catch (err) {
    yield put(getPlansFailed());
  }
}
