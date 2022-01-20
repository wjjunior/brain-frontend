export enum ActionTypes {
  LOAD_ACCOUNT_REQUEST = 'accounts/LOAD_ACCOUNT_REQUEST',
  CHANGE_LOADING_STATUS = 'accounts/CHANGE_LOADING_STATUS',
  LOAD_ACCOUNT_SUCCESS = 'accounts/LOAD_ACCOUNT_SUCCESS',
  LOAD_ACCOUNT_FAILED = 'accounts/LOAD_ACCOUNT_FAILED',
  EDIT_ACCOUNT_REQUEST = 'accounts/EDIT_ACCOUNT_REQUEST',
  EDIT_ACCOUNT_SUCCESS = 'accounts/EDIT_ACCOUNT_SUCCESS',
  EDIT_ACCOUNT_FAILED = 'accounts/EDIT_ACCOUNT_FAILED',
  UPDATE_ACCOUNT_PASSWORD = 'accounts/UPDATE_ACCOUNT_PASSWORD',
}

export declare namespace ActionPayloads {
  type LoadAccountRequest = {
    accountId: string;
  };

  type ChangeLoadingStatus = {
    loadingKey: ValidLoadingKeys;
    newStatus: boolean;
  };

  type LoadAccountSuccess = {
    accountRecord: Accounts.AccountRecord;
  };

  type LoadAccountFailed = {
    message: string;
  };

  type EditAccountRequest = {
    accountId: string;
    accountRecord: Accounts.AccountRecord;
    onFinish: (accountId: string) => void;
  };

  type EditAccountSuccess = {
    accountRecord: Accounts.AccountRecord;
  };

  type UpdateAccountPassword = {
    accountId: string;
    currentPassword: string;
    newPassword: string;
    onFinish: (accountId: string) => void;
  };
}

export declare namespace Actions {
  type LoadAccountRequest = {
    type: ActionTypes.LOAD_ACCOUNT_REQUEST;
    payload: ActionPayloads.LoadAccountRequest;
  };

  type ChangeLoadingStatus = {
    type: ActionTypes.CHANGE_LOADING_STATUS;
    payload: ActionPayloads.ChangeLoadingStatus;
  };

  type LoadAccountSuccess = {
    type: ActionTypes.LOAD_ACCOUNT_SUCCESS;
    payload: ActionPayloads.LoadAccountSuccess;
  };

  type LoadAccountFailed = {
    type: ActionTypes.LOAD_ACCOUNT_FAILED;
    payload: ActionPayloads.LoadAccountFailed;
  };

  type EditAccountRequest = {
    type: ActionTypes.EDIT_ACCOUNT_REQUEST;
    payload: ActionPayloads.EditAccountRequest;
  };

  type EditAccountSuccess = {
    type: ActionTypes.EDIT_ACCOUNT_SUCCESS;
    payload: ActionPayloads.EditAccountSuccess;
  };

  type EditAccountFailed = {
    type: ActionTypes.EDIT_ACCOUNT_FAILED;
    payload: {};
  };

  type UpdateAccountPassword = {
    type: ActionTypes.UPDATE_ACCOUNT_PASSWORD;
    payload: ActionPayloads.UpdateAccountPassword;
  };
}

export enum ValidLoadingKeys {
  AccountById = 'loadingKey/ACCOUNT_BY_ID',
  AccountWrite = 'loadingKey/ACCOUNT_WRITE',
}

type AccountPlan = {
  id: string;
  description: string;
};

export declare namespace Accounts {
  type AccountRecord = {
    id: string;
    name: string;
    lastName: string;
    document: string;
    documentType: string;
    language: string;
    country: string;
    timezone: string;
    userName: string;
    phone: string;
    email: string;
    company: string;
    created: string;
    updated: string;
    plan: AccountPlan;
  };

  type ReducerState = {
    [ValidLoadingKeys.AccountById]: boolean;
    [ValidLoadingKeys.AccountWrite]: boolean;
    focusedAccount: Accounts.AccountRecord | null;
    didAccountsError: null | string;
  };
}
