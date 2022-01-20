import { all } from 'redux-saga/effects';

import rootAuthSaga from './auth/sagas';
import rootDashboardSaga from './dashboard/sagas';
import rootPatientsSaga from './patients/sagas';
import rootAnalysisSaga from './analysis/sagas';
import rootSharedSaga from './shared/sagas';
import rootAccountsSaga from './account/sagas';
import rootGoalsSaga from './goals/sagas';

export default function* rootSaga() {
  yield all([
    rootAuthSaga(),
    rootDashboardSaga(),
    rootPatientsSaga(),
    rootAnalysisSaga(),
    rootSharedSaga(),
    rootAccountsSaga(),
    rootGoalsSaga(),
  ]);
}
