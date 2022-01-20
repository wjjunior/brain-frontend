import { Auth } from './auth/types';
import { Dashboard } from './dashboard/types';
import { Patients } from './patients/types';
import { Analysis } from './analysis/types';
import { Shared } from './shared/types';
import { Accounts } from './account/types';
import { Goals } from './goals/types';

export { default as auth } from './auth/reducer';
export { default as dashboard } from './dashboard/reducer';
export { default as patients } from './patients/reducer';
export { default as analysis } from './analysis/reducer';
export { default as accounts } from './account/reducer';
export { default as goals } from './goals/reducer';
export { default as shared } from './shared/reducer';

export type GlobalState = {
  auth: Auth.ReducerState;
  dashboard: Dashboard.ReducerState;
  patients: Patients.ReducerState;
  analysis: Analysis.ReducerState;
  shared: Shared.ReducerState;
  accounts: Accounts.ReducerState;
  goals: Goals.ReducerState;
};
