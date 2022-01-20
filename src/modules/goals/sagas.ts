import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { ValidLoadingKeys, Goals, ActionTypes, Actions } from './types';

import { ENDPOINTS } from '../patients/constants';

import {
  changeLoadingStatus,
  loadGoalsSuccess,
  loadGoalsFailed,
  createGoalSuccess,
  createGoalFailed,
  loadGoalSuccess,
  loadGoalFailed,
  editGoalSuccess,
  editGoalFailed,
  changeGoalStatusSuccess,
  changeGoalStatusFailed,
} from './actions';

import { get, post, put as putRequest } from '../../utils/request';
import { displayToast } from '../shared/actions';

export default function* rootGoalsSaga() {
  yield all([
    fork(function* () {
      yield takeLatest(ActionTypes.LOAD_GOALS_REQUEST, loadGoals);
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.CREATE_GOAL_REQUEST, createGoal);
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.LOAD_GOAL_REQUEST, getGoalById);
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.EDIT_GOAL_REQUEST, editGoal);
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.CHANGE_GOAL_STATUS_REQUEST,
        changeGoalStatus
      );
    }),
  ]);
}

function* loadGoals(action: Actions.LoadGoalsRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.GoalsList, true));

  const { query } = action.payload;

  const queryString = query
    ? '?' +
      Object.entries(query)
        .map((pair) => pair.join('='))
        .join('&')
    : '';

  try {
    const response: AxiosResponse<Goals.GoalsResponseModel> = yield get(
      ENDPOINTS.GOALS + queryString
    );

    if (response.status === 200) {
      const offset = query?.offset ? query?.offset : 0;

      yield put(
        loadGoalsSuccess(
          response.data,
          response.headers['x-total-count'],
          offset
        )
      );
    }
  } catch (err) {
    yield put(loadGoalsFailed('errors.serverError.title'));
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.GoalsList, false));
  }
}

function* getGoalById(action: Actions.LoadGoalRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.GoalById, true));

  const { patientId, goalId } = action.payload;

  try {
    const response: AxiosResponse<Goals.GoalLoadResponseModel> = yield get(
      ENDPOINTS.GOALS_BY_ID.replace(':id', patientId).replace(':goal', goalId)
    );

    if (response.status === 200) {
      yield put(loadGoalSuccess(response.data));
    }
  } catch (err) {
    yield put(loadGoalFailed());
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.GoalById, false));
  }
}

function* createGoal(action: Actions.CreateGoalRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.GoalWrite, true));

  const { patientId, goalRecord, onFinish } = action.payload;

  try {
    const response: AxiosResponse<Goals.GoalCreationResponseModel> = yield post(
      ENDPOINTS.GOALS.replace(':id', patientId),
      goalRecord
    );

    if (response.status === 201) {
      yield put(createGoalSuccess(patientId, response.data.id));
      yield put(
        displayToast({
          id: 'goal-create-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'goals.createGoalSuccess',
          timeout: 5e3,
        })
      );
      yield call(onFinish, patientId, response.data.id);
    }
  } catch (err) {
    yield put(createGoalFailed());
    yield put(
      displayToast({
        id: 'goal-create-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'goals.createGoalFailed',
        timeout: 5e3,
      })
    );
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.GoalWrite, false));
  }
}

function* editGoal(action: Actions.EditGoalRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.GoalWrite, true));

  const { patientId, goalId, goalRecord, onFinish } = action.payload;

  try {
    const response: AxiosResponse = yield putRequest(
      ENDPOINTS.GOALS_EDIT.replace(':id', patientId).replace(':goal', goalId),
      goalRecord
    );

    if (response.status === 204) {
      yield put(editGoalSuccess(goalRecord));
      yield put(
        displayToast({
          id: 'goal-edit-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'goals.editGoalSuccess',
          timeout: 5e3,
        })
      );
      yield call(onFinish, patientId, goalId);
    }
  } catch (err) {
    yield put(editGoalFailed());
    yield put(
      displayToast({
        id: 'goal-edit-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'goals.editGoalFailed',
        timeout: 5e3,
      })
    );
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.GoalWrite, false));
  }
}

function* changeGoalStatus(action: Actions.ChangeGoalStatusRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.GoalWrite, true));

  const { patientId, goalId, goalStatusRecord, onFinish } = action.payload;

  try {
    const response: AxiosResponse = yield putRequest(
      ENDPOINTS.GOALS_CHANGE_STATUS.replace(':id', patientId).replace(
        ':goal',
        goalId
      ),
      goalStatusRecord
    );

    if (response.status === 204) {
      yield put(changeGoalStatusSuccess(goalStatusRecord));
      yield put(
        displayToast({
          id: 'goal-edit-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'goals.changeGoalStatusSuccess',
          timeout: 5e3,
        })
      );
      yield call(onFinish, patientId, goalId);
    }
  } catch (err) {
    yield put(changeGoalStatusFailed());
    yield put(
      displayToast({
        id: 'goal-edit-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'goals.changeGoalStatusFailed',
        timeout: 5e3,
      })
    );
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.GoalWrite, false));
  }
}
