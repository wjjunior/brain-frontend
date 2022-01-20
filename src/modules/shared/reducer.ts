import { Shared, ActionTypes, Actions } from './types';
import { ActionTypes as AuthActionTypes } from '../auth/types';

const initialState: Shared.ReducerState = {
  toasts: [],
  plans: [],
  isPlansLoading: false,
  didPlansError: false,
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case ActionTypes.DISPLAY_TOAST: {
      const {
        payload: { toast },
      } = action as Actions.DisplayToast;

      return { ...state, toasts: [...state.toasts, toast] };
    }

    case ActionTypes.CLOSE_TOAST: {
      const {
        payload: { toastId },
      } = action as Actions.CloseToast;

      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== toastId),
      };
    }

    case ActionTypes.GET_PLANS_REQUEST: {
      return {
        ...state,
        isPlansLoading: true,
      };
    }

    case ActionTypes.GET_PLANS_SUCCESS: {
      const { payload } = action as Actions.GetPlansSuccess;

      return {
        ...state,
        plans: payload.plans,
        isPlansLoading: false,
      };
    }

    case ActionTypes.GET_PLANS_FAILED: {
      return {
        ...state,
        isPlansLoading: false,
        didPlansError: true,
      };
    }

    case AuthActionTypes.ATTEMPT_LOGOUT: {
      return { ...initialState };
    }

    default:
      return state;
  }
}
