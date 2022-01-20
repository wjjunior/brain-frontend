import { GlobalState } from '..';
import { ValidLoadingKeys } from './types';

export const goalsList = (state: GlobalState) => state.goals.goalsList;
export const totalGoals = (state: GlobalState) => state.goals.totalGoals;
export const pagination = (state: GlobalState) => state.goals.pagination;
export const isGoalsListLoading = (state: GlobalState) =>
  state.goals[ValidLoadingKeys.GoalsList];
export const didGoalsError = (state: GlobalState) => state.goals.didGoalsError;
export const isGoalWriteLoading = (state: GlobalState) =>
  state.goals[ValidLoadingKeys.GoalWrite];
export const focusedGoal = (state: GlobalState) => state.goals.focusedGoal;
export const isFocusedGoalLoading = (state: GlobalState) =>
  state.goals[ValidLoadingKeys.GoalById];
