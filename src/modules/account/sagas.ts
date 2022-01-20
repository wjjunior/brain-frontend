import { AxiosResponse } from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  changeLoadingStatus,
  loadAccountFailed,
  loadAccountSuccess,
  editAccountSuccess,
  editAccountFailed,
} from './actions';
import { Accounts, Actions, ActionTypes, ValidLoadingKeys } from './types';
import { get, post, put as putRequest } from '../../utils/request';
import { ENDPOINTS } from './constants';
import { displayToast } from '../shared/actions';

export default function* rootAccountsSaga() {
  yield all([
    fork(function* () {
      yield takeLatest(ActionTypes.LOAD_ACCOUNT_REQUEST, getAccountById);
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.EDIT_ACCOUNT_REQUEST, editAccount);
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.UPDATE_ACCOUNT_PASSWORD,
        updateAccountPassword
      );
    }),
  ]);
}

function* getAccountById(action: Actions.LoadAccountRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.AccountById, true));

  const { accountId } = action.payload;

  try {
    const response: AxiosResponse<Accounts.AccountRecord> = yield get(
      ENDPOINTS.GET_BY_ID.replace(':id', accountId)
    );

    if (response.status === 200) {
      yield put(loadAccountSuccess(response.data));
    }
  } catch (err) {
    yield put(loadAccountFailed(err.message));
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.AccountById, false));
  }
}

function* editAccount(action: Actions.EditAccountRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.AccountWrite, true));

  const { accountId, accountRecord, onFinish } = action.payload;

  try {
    const response: AxiosResponse = yield putRequest(
      ENDPOINTS.EDIT.replace(':id', accountId),
      accountRecord
    );

    if (response.status === 204) {
      yield put(editAccountSuccess(accountRecord));
      yield put(
        displayToast({
          id: 'account-edit-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'account.editAccountSuccess',
          timeout: 5e3,
        })
      );
      yield call(onFinish, accountId);
    }
  } catch (err) {
    yield put(editAccountFailed());
    yield put(
      displayToast({
        id: 'account-edit-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'account.editAccountFailed',
        timeout: 5e3,
      })
    );
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.AccountWrite, false));
  }
}

function* updateAccountPassword(action: Actions.UpdateAccountPassword) {
  yield put(changeLoadingStatus(ValidLoadingKeys.AccountWrite, true));

  const { accountId, currentPassword, newPassword, onFinish } = action.payload;

  try {
    const response: AxiosResponse = yield post(
      ENDPOINTS.UPDATE_PASSWORD.replace(':id', accountId),
      {
        currentPassword,
        newPassword,
      }
    );

    if (response.status === 204) {
      yield put(
        displayToast({
          id: 'account-edit-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'account.updateAccountPasswordSuccess',
          timeout: 5e3,
        })
      );
      yield call(onFinish, accountId);
    }
  } catch (err) {
    yield put(editAccountFailed());
    yield put(
      displayToast({
        id: 'account-edit-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'account.updateAccountPasswordFailed',
        timeout: 5e3,
      })
    );
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.AccountWrite, false));
  }
}
