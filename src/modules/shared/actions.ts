import { Actions, ActionTypes, Shared } from './types';

export function displayToast(toast: Shared.Toast): Actions.DisplayToast {
  return {
    type: ActionTypes.DISPLAY_TOAST,
    payload: { toast },
  };
}

export function closeToast(toastId: string): Actions.CloseToast {
  return {
    type: ActionTypes.CLOSE_TOAST,
    payload: { toastId },
  };
}

export function getPlansRequest(): Actions.GetPlansRequest {
  return {
    type: ActionTypes.GET_PLANS_REQUEST,
    payload: {},
  };
}

export function getPlansSuccess(plans: Shared.Plan[]): Actions.GetPlansSuccess {
  return {
    type: ActionTypes.GET_PLANS_SUCCESS,
    payload: { plans },
  };
}

export function getPlansFailed(): Actions.GetPlansFailed {
  return {
    type: ActionTypes.GET_PLANS_FAILED,
    payload: {},
  };
}
