import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { ValidLoadingKeys, Auth, Actions, ActionTypes } from './types';
import { AUTH_SESSION_KEY, ENDPOINTS } from './constants';
import {
  attemptLogout,
  changeLoadingStatus,
  loadUserFailed,
  loadUserSuccess,
  loginAttemptSucceeded,
  recoverPasswordFailed,
  recoverPasswordSuccess,
} from './actions';

import { Local } from '../../utils/storage';
import { get, post } from '../../utils/request';
import { setPersistedSession } from '../../utils/auth';
import { displayToast, getPlansRequest } from '../shared/actions';
import { loadAccount } from '../account/actions';
import { ActionTypes as AccountActionTypes } from '../account/types';

export default function* rootAuthSaga() {
  yield all([
    fork(function* () {
      yield takeLatest(ActionTypes.ATTEMPT_LOGIN, attemptLogin);
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.ATTEMPT_LOGOUT, () =>
        Local.remove(AUTH_SESSION_KEY)
      );
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.LOAD_USER_REQUEST, loadUser);
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.REFRESH_TOKEN, refreshToken);
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.RECOVER_PASSWORD_REQUEST, recoverPassword);
    }),
  ]);
}

function* attemptLogin(action: Actions.AttemptLogin) {
  const { onFail, ...authCredentials } = action.payload;
  yield put(changeLoadingStatus(ValidLoadingKeys.Login, true));

  try {
    const response: AxiosResponse<Auth.ITokenResponseModel> = yield post(
      ENDPOINTS.AUTHENTICATE,
      authCredentials
    );

    if (response.status === 200) {
      const authResponse = response.data;

      if (authResponse.accessToken) {
        setPersistedSession(authResponse);

        yield put(loadAccount(authResponse.userId));
        yield put(getPlansRequest());
        yield take(AccountActionTypes.LOAD_ACCOUNT_SUCCESS);
        yield put(loginAttemptSucceeded());
      }
    }
  } catch (err) {
    console.log(err);
    // const requestError: AxiosError<Auth.ITokenResponseModel> = err;

    // TODO: handle error message from response body and show it in the screen
    yield call(onFail);
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.Login, false));
  }
}

function* loadUser(action: Actions.LoadUser) {
  const { userId } = action.payload;
  yield put(changeLoadingStatus(ValidLoadingKeys.LoadUser, true));

  try {
    const response: AxiosResponse<Auth.UserRecord> = yield get(
      ENDPOINTS.GET_USER_BY_ID.replace(':id', userId)
    );

    if (response.status === 200) {
      yield put(loadUserSuccess(response.data));
    }
  } catch (err) {
    yield put(loadUserFailed());
    yield put(
      displayToast({
        id: 'load-user-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'auth.loadUserFailed',
      })
    );
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.LoadUser, false));
  }
}

function* refreshToken(action: Actions.RefreshToken) {
  try {
    const response: AxiosResponse<Auth.ITokenResponseModel> = yield post(
      ENDPOINTS.REFRESH_TOKEN,
      action.payload
    );

    if (response.status === 200) {
      const authResponse = response.data;

      if (authResponse.accessToken) {
        setPersistedSession(authResponse);

        yield put(loginAttemptSucceeded());
      }
    }
  } catch (err) {
    yield put(attemptLogout());
  }
}

function* recoverPassword(action: Actions.RecoverPasswordRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.RecoverPassword, true));

  const { email, onSuccess } = action.payload;
  try {
    console.log(email);
    const response: AxiosResponse = yield post(ENDPOINTS.RECOVER_PASSWORD, {
      email,
    });

    if (response.status === 200) {
      yield put(recoverPasswordSuccess(email));
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  } catch (err) {
    yield put(recoverPasswordFailed());
    yield put(
      displayToast({
        id: 'recover-password-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'auth.recoverPasswordFailed',
        timeout: 5e3,
      })
    );
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.RecoverPassword, false));
  }
}
