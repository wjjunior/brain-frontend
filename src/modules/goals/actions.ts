import { Actions, ActionTypes, Goals, ValidLoadingKeys } from './types';

export const changeLoadingStatus = (
  loadingKey: ValidLoadingKeys,
  newStatus: boolean
): Actions.ChangeLoadingStatus => {
  return {
    type: ActionTypes.CHANGE_LOADING_STATUS,
    payload: { loadingKey, newStatus },
  };
};

export const loadGoalsRequest = (
  patientId: string,
  query?: Goals.GoalsQuery
): Actions.LoadGoalsRequest => {
  return {
    type: ActionTypes.LOAD_GOALS_REQUEST,
    payload: { patientId, query },
  };
};

export const loadGoalsSuccess = (
  goalsList: Goals.GoalsResponseModel,
  totalGoals: number,
  offset: number
): Actions.LoadGoalsSuccess => {
  return {
    type: ActionTypes.LOAD_GOALS_SUCCESS,
    payload: { goalsList, totalGoals, offset },
  };
};

export const loadGoalsFailed = (message: string): Actions.LoadGoalsFailed => {
  return {
    type: ActionTypes.LOAD_GOALS_FAILED,
    payload: { message },
  };
};

export function createGoal(
  patientId: string,
  goalRecord: Goals.GoalRecord,
  onFinish: (patientId: string, goalId: string) => void
): Actions.CreateGoalRequest {
  return {
    type: ActionTypes.CREATE_GOAL_REQUEST,
    payload: { patientId, goalRecord, onFinish },
  };
}

export function createGoalSuccess(
  patientId: string,
  goalId: string
): Actions.CreateGoalSuccess {
  return {
    type: ActionTypes.CREATE_GOAL_SUCCESS,
    payload: { goalId },
  };
}

export function createGoalFailed(): Actions.CreateGoalFailed {
  return {
    type: ActionTypes.CREATE_GOAL_FAILED,
    payload: {},
  };
}

export function loadGoal(
  patientId: string,
  goalId: string
): Actions.LoadGoalRequest {
  return {
    type: ActionTypes.LOAD_GOAL_REQUEST,
    payload: { patientId, goalId },
  };
}

export function loadGoalSuccess(
  goalRecord: Goals.GoalLoadResponseModel
): Actions.LoadGoalSuccess {
  return {
    type: ActionTypes.LOAD_GOAL_SUCCESS,
    payload: { goalRecord },
  };
}

export function loadGoalFailed(): Actions.LoadGoalFailed {
  return {
    type: ActionTypes.LOAD_GOAL_FAILED,
    payload: {},
  };
}

export function editGoal(
  patientId: string,
  goalId: string,
  goalRecord: Goals.GoalRecord,
  onFinish: (patientId: string, goalId: string) => void
): Actions.EditGoalRequest {
  return {
    type: ActionTypes.EDIT_GOAL_REQUEST,
    payload: { patientId, goalId, goalRecord, onFinish },
  };
}

export function editGoalSuccess(
  goalRecord: Goals.GoalRecord
): Actions.EditGoalSuccess {
  return {
    type: ActionTypes.EDIT_GOAL_SUCCESS,
    payload: { goalRecord },
  };
}

export function editGoalFailed(): Actions.EditGoalFailed {
  return {
    type: ActionTypes.EDIT_GOAL_FAILED,
    payload: {},
  };
}

export function changeGoalStatus(
  patientId: string,
  goalId: string,
  goalStatusRecord: Goals.GoalStatusRecord,
  onFinish: (patientId: string, goalId: string) => void
): Actions.ChangeGoalStatusRequest {
  return {
    type: ActionTypes.CHANGE_GOAL_STATUS_REQUEST,
    payload: { patientId, goalId, goalStatusRecord, onFinish },
  };
}

export function changeGoalStatusSuccess(
  goalStatusRecord: Goals.GoalStatusRecord
): Actions.ChangeGoalStatusSuccess {
  return {
    type: ActionTypes.CHANGE_GOAL_STATUS_SUCCESS,
    payload: { goalStatusRecord },
  };
}

export function changeGoalStatusFailed(): Actions.ChangeGoalStatusFailed {
  return {
    type: ActionTypes.CHANGE_GOAL_STATUS_FAILED,
    payload: {},
  };
}
