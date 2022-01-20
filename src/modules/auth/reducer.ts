import { isSessionPersisted } from '../../utils/auth';

import { ValidLoadingKeys, Actions, ActionTypes, Auth } from './types';

const initialState: Auth.ReducerState = {
  isAuthenticated: isSessionPersisted(),
  [ValidLoadingKeys.Login]: false,
  [ValidLoadingKeys.LoadUser]: false,
  [ValidLoadingKeys.RecoverPassword]: false,
  loginValidationTexts: { username: '', password: '', email: '' },
  didAuthenticationError: false,
  didUserLoadError: false,
  didRecoverPasswordError: false,
  currentUser: null,
  recoverPasswordEmail: '',
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case ActionTypes.CHANGE_LOADING_STATUS: {
      const {
        payload: { loadingKey, newStatus },
      } = action as Actions.ChangeLoadingStatus;

      return { ...state, [loadingKey]: newStatus };
    }

    case ActionTypes.LOGIN_ATTEMPT_SUCCEEDED: {
      return { ...state, didAuthenticationError: false, isAuthenticated: true };
    }

    case ActionTypes.UPDATE_VALIDATION_TEXT: {
      const {
        payload: { formFieldName, newText },
      } = action as Actions.UpdateValidationText;

      return {
        ...state,
        loginValidationTexts: {
          ...state.loginValidationTexts,
          [formFieldName]: newText,
        },
      };
    }

    case ActionTypes.LOGIN_ATTEMPT_FAILED: {
      return {
        ...state,
        didAuthenticationError: true,
      };
    }

    case ActionTypes.LOAD_USER_SUCCESS: {
      const {
        payload: { userRecord },
      } = action as Actions.LoadUserSuccess;

      return {
        ...state,
        currentUser: userRecord,
      };
    }

    case ActionTypes.LOAD_USER_FAILED: {
      return {
        ...state,
        didUserLoadError: true,
      };
    }

    case ActionTypes.ATTEMPT_LOGOUT: {
      return { ...initialState, isAuthenticated: false };
    }

    case ActionTypes.RECOVER_PASSWORD_FAILED: {
      return {
        ...state,
        didRecoverPasswordError: true,
      };
    }

    case ActionTypes.RECOVER_PASSWORD_SUCCESS: {
      const {
        payload: { email },
      } = action as Actions.RecoverPasswordSuccess;
      return {
        ...state,
        recoverPasswordEmail: email,
      };
    }
  }

  return state;
}
