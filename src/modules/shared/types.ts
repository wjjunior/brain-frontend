import { InlineNotificationProps } from 'carbon-components-react';

export enum ActionTypes {
  CLOSE_TOAST = 'shared/CLOSE_TOAST',
  DISPLAY_TOAST = 'shared/DISPLAY_TOAST',
  GET_PLANS_REQUEST = 'shared/GET_PLANS_REQUEST',
  GET_PLANS_SUCCESS = 'shared/GET_PLANS_SUCCESS',
  GET_PLANS_FAILED = 'shared/GET_PLANS_FAILED',
}

export declare namespace ActionPayloads {
  type DisplayToast = {
    toast: Shared.Toast;
  };

  type CloseToast = {
    toastId: string;
  };

  type GetPlansSuccess = {
    plans: Shared.Plan[];
  };
}

export declare namespace Actions {
  type DisplayToast = {
    type: ActionTypes.DISPLAY_TOAST;
    payload: ActionPayloads.DisplayToast;
  };

  type CloseToast = {
    type: ActionTypes.CLOSE_TOAST;
    payload: ActionPayloads.CloseToast;
  };

  type GetPlansRequest = {
    type: ActionTypes.GET_PLANS_REQUEST;
    payload: {};
  };

  type GetPlansSuccess = {
    type: ActionTypes.GET_PLANS_SUCCESS;
    payload: ActionPayloads.GetPlansSuccess;
  };

  type GetPlansFailed = {
    type: ActionTypes.GET_PLANS_FAILED;
    payload: {};
  };
}

export declare namespace Shared {
  interface Toast extends Omit<InlineNotificationProps, 'title'> {
    id: string;
    timeout?: number;
    titleKey?: string;
    subtitleKey?: string;
    title?: React.ReactNode;
    action?: React.ReactNode;
  }

  type Plan = {
    id: string;
    description: string;
    value: number;
  };

  type ReducerState = {
    toasts: Toast[];
    plans: Plan[];
    isPlansLoading: boolean;
    didPlansError: boolean;
  };
}
