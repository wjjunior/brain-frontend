import { ActionPayloads } from './types';
import { Actions, ActionTypes, Dashboard, ValidLoadingKeys } from './types';

export const changeLoadingStatus = (
  loadingKey: ValidLoadingKeys,
  newStatus: boolean
): Actions.ChangeLoadingStatus => {
  return {
    type: ActionTypes.CHANGE_LOADING_STATUS,
    payload: { loadingKey, newStatus },
  };
};

export const loadDashboardRequest = (
  fromDatetime: string
): Actions.loadDashboardRequest => {
  return {
    type: ActionTypes.LOAD_DASHBOARD_REQUEST,
    payload: { fromDatetime },
  };
};

export const loadDashboardSuccess = (
  dashboardSummary: Dashboard.DashboardResponseModel
): Actions.loadDashboardSuccess => {
  return {
    type: ActionTypes.LOAD_DASHBOARD_SUCCESS,
    payload: dashboardSummary,
  };
};

export const loadDashboardFailed = (
  message: ActionPayloads.LoadDashboardFailed
): Actions.loadDashboardFailed => {
  return {
    type: ActionTypes.LOAD_DASHBOARD_FAILED,
    payload: message,
  };
};
