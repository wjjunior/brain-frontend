import { GlobalState } from '../';
import { ValidLoadingKeys } from './types';

export const dashboardSummary = (state: GlobalState) =>
  state.dashboard.dashboardSummary;
export const isDashboardLoading = (state: GlobalState) =>
  state.dashboard[ValidLoadingKeys.Dashboard];
export const didDashboardError = (state: GlobalState) =>
  state.dashboard.didDashboardError;
