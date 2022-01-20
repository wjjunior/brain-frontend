import { ValidLoadingKeys, Actions, ActionTypes, Accounts } from './types';

export const changeLoadingStatus = (
  loadingKey: ValidLoadingKeys,
  newStatus: boolean
): Actions.ChangeLoadingStatus => {
  return {
    type: ActionTypes.CHANGE_LOADING_STATUS,
    payload: { loadingKey, newStatus },
  };
};

export function loadAccount(accountId: string): Actions.LoadAccountRequest {
  return {
    type: ActionTypes.LOAD_ACCOUNT_REQUEST,
    payload: { accountId },
  };
}

export function loadAccountSuccess(
  accountRecord: Accounts.AccountRecord
): Actions.LoadAccountSuccess {
  return {
    type: ActionTypes.LOAD_ACCOUNT_SUCCESS,
    payload: { accountRecord },
  };
}

export function loadAccountFailed(message: string): Actions.LoadAccountFailed {
  return {
    type: ActionTypes.LOAD_ACCOUNT_FAILED,
    payload: { message },
  };
}

export function editAccount(
  accountId: string,
  accountRecord: Accounts.AccountRecord,
  onFinish: (accountId: string) => void
): Actions.EditAccountRequest {
  return {
    type: ActionTypes.EDIT_ACCOUNT_REQUEST,
    payload: { accountId, accountRecord, onFinish },
  };
}

export function editAccountSuccess(
  accountRecord: Accounts.AccountRecord
): Actions.EditAccountSuccess {
  return {
    type: ActionTypes.EDIT_ACCOUNT_SUCCESS,
    payload: { accountRecord },
  };
}

export function editAccountFailed(): Actions.EditAccountFailed {
  return {
    type: ActionTypes.EDIT_ACCOUNT_FAILED,
    payload: {},
  };
}

export function updateAccountPassword(
  accountId: string,
  currentPassword: string,
  newPassword: string,
  onFinish: (accountId: string) => void
): Actions.UpdateAccountPassword {
  return {
    type: ActionTypes.UPDATE_ACCOUNT_PASSWORD,
    payload: { accountId, newPassword, currentPassword, onFinish },
  };
}
