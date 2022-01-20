import { Accounts, Actions, ActionTypes, ValidLoadingKeys } from './types';

const initialState: Accounts.ReducerState = {
  [ValidLoadingKeys.AccountById]: false,
  [ValidLoadingKeys.AccountWrite]: false,
  focusedAccount: null,
  didAccountsError: null,
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case ActionTypes.CHANGE_LOADING_STATUS: {
      const {
        payload: { loadingKey, newStatus },
      } = action as Actions.ChangeLoadingStatus;

      return { ...state, [loadingKey]: newStatus };
    }
    case ActionTypes.LOAD_ACCOUNT_FAILED:
    case ActionTypes.LOAD_ACCOUNT_REQUEST:
    case ActionTypes.EDIT_ACCOUNT_SUCCESS:
    case ActionTypes.LOAD_ACCOUNT_SUCCESS: {
      const {
        payload: { accountRecord },
      } = action as Actions.LoadAccountSuccess | Actions.EditAccountSuccess;

      return {
        ...state,
        focusedAccount: { ...(state.focusedAccount || {}), ...accountRecord },
      };
    }
    case ActionTypes.UPDATE_ACCOUNT_PASSWORD:
    default:
      return state;
  }
}
