import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { ValidLoadingKeys, Dashboard, ActionTypes, Actions } from './types';
import { ENDPOINTS } from './constants';

import {
  changeLoadingStatus,
  loadDashboardSuccess,
  loadDashboardFailed,
} from './actions';

import { get } from '../../utils/request';

export default function* rootDashboardSaga() {
  yield all([
    fork(function* () {
      yield takeLatest(ActionTypes.LOAD_DASHBOARD_REQUEST, loadDashboard);
    }),
  ]);
}

function* loadDashboard(action: Actions.loadDashboardRequest) {
  const { fromDatetime } = action.payload;
  yield put(changeLoadingStatus(ValidLoadingKeys.Dashboard, true));

  try {
    const response: AxiosResponse<Dashboard.DashboardResponseModel> = yield get(
      ENDPOINTS.DASHBOARD_SUMMARY,
      {
        params: {
          fromDatetime,
        },
      }
    );

    if (response.status === 200) {
      yield put(loadDashboardSuccess(response.data));
    }
  } catch (err) {
    yield put(loadDashboardFailed({ message: 'errors.serverError.title' }));
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.Dashboard, false));
  }
}
