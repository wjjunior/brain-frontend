import { Actions, ActionTypes, Dashboard, ValidLoadingKeys } from './types';
import { ActionTypes as AuthActionTypes } from '../auth/types';

const initialState: Dashboard.ReducerState = {
  dashboardSummary: null,
  [ValidLoadingKeys.Dashboard]: false,
  didDashboardError: null,
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case ActionTypes.CHANGE_LOADING_STATUS: {
      const {
        payload: { loadingKey, newStatus },
      } = action as Actions.ChangeLoadingStatus;

      return { ...state, [loadingKey]: newStatus };
    }

    case ActionTypes.LOAD_DASHBOARD_REQUEST: {
      return { ...state };
    }

    case ActionTypes.LOAD_DASHBOARD_SUCCESS: {
      return {
        ...state,
        dashboardSummary: action.payload,
      };
    }

    case ActionTypes.LOAD_DASHBOARD_FAILED: {
      const {
        payload: { message },
      } = action as Actions.loadDashboardFailed;

      return {
        ...state,
        didDashboardError: message,
      };
    }

    case AuthActionTypes.ATTEMPT_LOGOUT: {
      return { ...initialState };
    }

    default:
      return state;
  }
}
