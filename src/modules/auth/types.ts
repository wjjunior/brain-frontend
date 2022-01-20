export enum ActionTypes {
  ATTEMPT_LOGIN = 'auth/ATTEMPT_LOGIN',
  LOGIN_ATTEMPT_FAILED = 'auth/LOGIN_ATTEMPT_FAILED',
  LOGIN_ATTEMPT_SUCCEEDED = 'auth/LOGIN_ATTEMPT_SUCCEEDED',
  CHANGE_LOADING_STATUS = 'auth/CHANGE_LOADING_STATUS',
  UPDATE_VALIDATION_TEXT = 'auth/UPDATE_VALIDATION_TEXT',
  LOAD_USER_REQUEST = 'auth/LOAD_USER_REQUEST',
  LOAD_USER_SUCCESS = 'auth/LOAD_USER_SUCCESS',
  LOAD_USER_FAILED = 'auth/LOAD_USER_FAILED',
  REFRESH_TOKEN = 'auth/REFRESH_TOKEN',
  ATTEMPT_LOGOUT = 'auth/ATTEMPT_LOGOUT',
  RECOVER_PASSWORD_REQUEST = 'auth/RECOVER_PASSWORD_REQUEST',
  RECOVER_PASSWORD_SUCCESS = 'auth/RECOVER_PASSWORD_SUCCESS',
  RECOVER_PASSWORD_FAILED = 'auth/RECOVER_PASSWORD_FAILED',
}

export declare namespace ActionPayloads {
  type AttemptLogin = {
    username: string;
    password: string;
    onFail: () => void;
  };

  type ChangeLoadingStatus = {
    loadingKey: ValidLoadingKeys;
    newStatus: boolean;
  };

  type UpdateValidationText = {
    formFieldName: ValidFormFieldNames;
    newText: string;
  };

  type LoadUser = {
    userId: string;
  };

  type LoadUserSuccess = {
    userRecord: Auth.UserRecord;
  };

  type RefreshToken = {
    userId: string;
    refreshToken: string;
  };

  type RecoverPasswordRequest = {
    email: string;
    onSuccess: () => void;
  };

  type RecoverPasswordSuccess = {
    email: string;
  };
}

export declare namespace Actions {
  type AttemptLogin = {
    type: ActionTypes.ATTEMPT_LOGIN;
    payload: ActionPayloads.AttemptLogin;
  };

  type ChangeLoadingStatus = {
    type: ActionTypes.CHANGE_LOADING_STATUS;
    payload: ActionPayloads.ChangeLoadingStatus;
  };

  type LoginAttemptFailed = {
    type: ActionTypes.LOGIN_ATTEMPT_FAILED;
    payload: {};
  };

  type LoginAttemptSucceeded = {
    type: ActionTypes.LOGIN_ATTEMPT_SUCCEEDED;
    payload: {};
  };

  type UpdateValidationText = {
    type: ActionTypes.UPDATE_VALIDATION_TEXT;
    payload: ActionPayloads.UpdateValidationText;
  };

  type AttemptLogout = {
    type: ActionTypes.ATTEMPT_LOGOUT;
    payload: {};
  };

  type LoadUser = {
    type: ActionTypes.LOAD_USER_REQUEST;
    payload: ActionPayloads.LoadUser;
  };

  type LoadUserSuccess = {
    type: ActionTypes.LOAD_USER_SUCCESS;
    payload: ActionPayloads.LoadUserSuccess;
  };

  type LoadUserFailed = {
    type: ActionTypes.LOAD_USER_FAILED;
    payload: {};
  };

  type RefreshToken = {
    type: ActionTypes.REFRESH_TOKEN;
    payload: ActionPayloads.RefreshToken;
  };

  type RecoverPasswordRequest = {
    type: ActionTypes.RECOVER_PASSWORD_REQUEST;
    payload: ActionPayloads.RecoverPasswordRequest;
  };

  type RecoverPasswordSuccess = {
    type: ActionTypes.RECOVER_PASSWORD_SUCCESS;
    payload: ActionPayloads.RecoverPasswordSuccess;
  };

  type RecoverPasswordFailed = {
    type: ActionTypes.RECOVER_PASSWORD_FAILED;
    payload: {};
  };
}

export enum ValidLoadingKeys {
  Login = 'loadingKey/LOGIN',
  LoadUser = 'loadingKey/LOAD_USER',
  RecoverPassword = 'loadingKey/RECOVER_PASSWORD',
}

export enum ValidFormFieldNames {
  Username = 'username',
  Password = 'password',
  Email = 'email',
}
type AccountPlan = {
  id: string;
  description: string;
};

export declare namespace Auth {
  type ITokenResponseModel = {
    authenticated: boolean;
    expiration: string;
    accessToken: string;
    message: string;
    created: string;
    userId: string;
    refreshToken: string;
    refreshTokenExpiresIn: string;
  };

  type UserRecord = {
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

  type TokenInfo = { token: string; expiration: string };

  type PersistedSession = {
    userId: string;
    access: TokenInfo;
    refresh: TokenInfo;
    [key: string]: string | TokenInfo;
  };

  type ReducerState = {
    isAuthenticated: boolean;
    [ValidLoadingKeys.Login]: boolean;
    [ValidLoadingKeys.LoadUser]: boolean;
    [ValidLoadingKeys.RecoverPassword]: boolean;
    loginValidationTexts: {
      [key in ValidFormFieldNames]: string;
    };
    didAuthenticationError: boolean;
    didUserLoadError: boolean;
    didRecoverPasswordError: boolean;
    currentUser: UserRecord | null;
    recoverPasswordEmail: string;
  };
}
