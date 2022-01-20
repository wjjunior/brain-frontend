import {
  Actions,
  ActionTypes,
  Auth,
  ValidFormFieldNames,
  ValidLoadingKeys,
} from './types';

export function attemptLogin(
  username: string,
  password: string,
  onFail: () => void
): Actions.AttemptLogin {
  return {
    type: ActionTypes.ATTEMPT_LOGIN,
    payload: { username, password, onFail },
  };
}

export function changeLoadingStatus(
  loadingKey: ValidLoadingKeys,
  newStatus: boolean
): Actions.ChangeLoadingStatus {
  return {
    type: ActionTypes.CHANGE_LOADING_STATUS,
    payload: { loadingKey, newStatus },
  };
}

export function loginAttemptFailed(): Actions.LoginAttemptFailed {
  return {
    type: ActionTypes.LOGIN_ATTEMPT_FAILED,
    payload: {},
  };
}

export function loginAttemptSucceeded(): Actions.LoginAttemptSucceeded {
  return {
    type: ActionTypes.LOGIN_ATTEMPT_SUCCEEDED,
    payload: {},
  };
}

export function updateValidationText(
  formFieldName: ValidFormFieldNames,
  newText: string
): Actions.UpdateValidationText {
  return {
    type: ActionTypes.UPDATE_VALIDATION_TEXT,
    payload: { formFieldName, newText },
  };
}

export function attemptLogout(): Actions.AttemptLogout {
  return {
    type: ActionTypes.ATTEMPT_LOGOUT,
    payload: {},
  };
}

export function loadUser(userId: string): Actions.LoadUser {
  return {
    type: ActionTypes.LOAD_USER_REQUEST,
    payload: { userId },
  };
}

export function loadUserSuccess(
  userRecord: Auth.UserRecord
): Actions.LoadUserSuccess {
  return {
    type: ActionTypes.LOAD_USER_SUCCESS,
    payload: { userRecord },
  };
}

export function loadUserFailed(): Actions.LoadUserFailed {
  return {
    type: ActionTypes.LOAD_USER_FAILED,
    payload: {},
  };
}

export function refreshToken(
  userId: string,
  refreshToken: string
): Actions.RefreshToken {
  return {
    type: ActionTypes.REFRESH_TOKEN,
    payload: { userId, refreshToken },
  };
}

export function recoverPassword(
  email: string,
  onSuccess: () => void
): Actions.RecoverPasswordRequest {
  return {
    type: ActionTypes.RECOVER_PASSWORD_REQUEST,
    payload: { email, onSuccess },
  };
}

export function recoverPasswordFailed(): Actions.RecoverPasswordFailed {
  return {
    type: ActionTypes.RECOVER_PASSWORD_FAILED,
    payload: {},
  };
}

export function recoverPasswordSuccess(
  email: string
): Actions.RecoverPasswordSuccess {
  return {
    type: ActionTypes.RECOVER_PASSWORD_SUCCESS,
    payload: { email },
  };
}
