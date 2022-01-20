export enum ActionTypes {
  CHANGE_LOADING_STATUS = 'goals/CHANGE_LOADING_STATUS',
  LOAD_GOALS_REQUEST = 'goals/LOAD_GOALS_REQUEST',
  LOAD_GOALS_SUCCESS = 'goals/LOAD_GOALS_SUCCESS',
  LOAD_GOALS_FAILED = 'goals/LOAD_GOALS_FAILED',
  CREATE_GOAL_REQUEST = 'goals/CREATE_GOAL_REQUEST',
  CREATE_GOAL_SUCCESS = 'goals/CREATE_GOAL_SUCCESS',
  CREATE_GOAL_FAILED = 'goals/CREATE_GOAL_FAILED',
  LOAD_GOAL_REQUEST = 'goals/LOAD_GOAL_REQUEST',
  LOAD_GOAL_SUCCESS = 'goals/LOAD_GOAL_SUCCESS',
  LOAD_GOAL_FAILED = 'goals/LOAD_GOAL_FAILED',
  CLEAR_FOCUSED_GOAL = 'goals/CLEAR_FOCUSED_GOAL',
  EDIT_GOAL_REQUEST = 'goals/EDIT_GOAL_REQUEST',
  EDIT_GOAL_SUCCESS = 'goals/EDIT_GOAL_SUCCESS',
  EDIT_GOAL_FAILED = 'goals/EDIT_GOAL_FAILED',
  CHANGE_GOAL_STATUS_REQUEST = 'goals/CHANGE_GOAL_STATUS_REQUEST',
  CHANGE_GOAL_STATUS_SUCCESS = 'goals/CHANGE_GOAL_STATUS_SUCCESS',
  CHANGE_GOAL_STATUS_FAILED = 'goals/CHANGE_GOAL_STATUS_FAILED',
}

export declare namespace ActionPayloads {
  type ChangeLoadingStatus = {
    loadingKey: ValidLoadingKeys;
    newStatus: boolean;
  };

  type LoadGoalsRequest = {
    patientId: string;
    query?: Goals.GoalsQuery;
  };

  type LoadGoalsSuccess = {
    goalsList: Goals.GoalsResponseModel;
    totalGoals: number;
    offset: number;
  };

  type LoadGoalsFailed = {
    message: string;
  };

  type CreateGoalRequest = {
    patientId: string;
    goalRecord: Goals.GoalRecord;
    onFinish: (patientId: string, goalId: string) => void;
  };

  type CreateGoalSuccess = {
    goalId: string;
  };

  type LoadGoalRequest = {
    patientId: string;
    goalId: string;
  };

  type LoadGoalSuccess = {
    goalRecord: Goals.GoalLoadResponseModel;
  };

  type EditGoalRequest = {
    patientId: string;
    goalId: string;
    goalRecord: Goals.GoalRecord;
    onFinish: (patientId: string, goalId: string) => void;
  };

  type EditGoalSuccess = {
    goalRecord: Goals.GoalRecord;
  };

  type ChangeGoalStatusRequest = {
    patientId: string;
    goalId: string;
    goalStatusRecord: Goals.GoalStatusRecord;
    onFinish: (patientId: string, goalId: string) => void;
  };

  type ChangeGoalStatusSuccess = {
    goalStatusRecord: Goals.GoalStatusRecord;
  };
}

export declare namespace Actions {
  type LoadGoalsRequest = {
    type: ActionTypes.LOAD_GOALS_REQUEST;
    payload: ActionPayloads.LoadGoalsRequest;
  };

  type ChangeLoadingStatus = {
    type: ActionTypes.CHANGE_LOADING_STATUS;
    payload: ActionPayloads.ChangeLoadingStatus;
  };

  type LoadGoalsSuccess = {
    type: ActionTypes.LOAD_GOALS_SUCCESS;
    payload: ActionPayloads.LoadGoalsSuccess;
  };

  type LoadGoalsFailed = {
    type: ActionTypes.LOAD_GOALS_FAILED;
    payload: ActionPayloads.LoadGoalsFailed;
  };

  type CreateGoalRequest = {
    type: ActionTypes.CREATE_GOAL_REQUEST;
    payload: ActionPayloads.CreateGoalRequest;
  };

  type CreateGoalSuccess = {
    type: ActionTypes.CREATE_GOAL_SUCCESS;
    payload: ActionPayloads.CreateGoalSuccess;
  };

  type CreateGoalFailed = {
    type: ActionTypes.CREATE_GOAL_FAILED;
    payload: {};
  };

  type LoadGoalRequest = {
    type: ActionTypes.LOAD_GOAL_REQUEST;
    payload: ActionPayloads.LoadGoalRequest;
  };

  type LoadGoalSuccess = {
    type: ActionTypes.LOAD_GOAL_SUCCESS;
    payload: ActionPayloads.LoadGoalSuccess;
  };

  type LoadGoalFailed = {
    type: ActionTypes.LOAD_GOAL_FAILED;
    payload: {};
  };

  type ClearFocusedGoal = {
    type: ActionTypes.CLEAR_FOCUSED_GOAL;
    payload: {};
  };

  type EditGoalRequest = {
    type: ActionTypes.EDIT_GOAL_REQUEST;
    payload: ActionPayloads.EditGoalRequest;
  };

  type EditGoalSuccess = {
    type: ActionTypes.EDIT_GOAL_SUCCESS;
    payload: ActionPayloads.EditGoalSuccess;
  };

  type EditGoalFailed = {
    type: ActionTypes.EDIT_GOAL_FAILED;
    payload: {};
  };

  type ChangeGoalStatusRequest = {
    type: ActionTypes.CHANGE_GOAL_STATUS_REQUEST;
    payload: ActionPayloads.ChangeGoalStatusRequest;
  };

  type ChangeGoalStatusSuccess = {
    type: ActionTypes.CHANGE_GOAL_STATUS_SUCCESS;
    payload: ActionPayloads.ChangeGoalStatusSuccess;
  };

  type ChangeGoalStatusFailed = {
    type: ActionTypes.CHANGE_GOAL_STATUS_FAILED;
    payload: {};
  };
}

export enum ValidLoadingKeys {
  GoalsList = 'loadingKey/GOALS_LIST',
  GoalWrite = 'loadingKey/GOAL_WRITE',
  GoalById = 'loadingKey/GOAL_BY_ID',
}

export declare namespace Goals {
  type GoalsQuery = {
    filter?: string;
    offset?: number;
    limit?: number;
  };

  type Goal = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    status: number;
  };

  type GoalsResponseModel = Goal[];

  type GoalRecord = {
    name: string;
    objective: string;
    startDate: string;
    endDate: string;
    description: string;
    spiTherapistInitial: number;
    spiPatientInitial: number;
    spiOtherInitial: number;
  };

  type GoalStatusRecord = {
    date: string;
    status: number;
  };

  type GoalLoadResponseModel = GoalRecord & {
    id: string;
    status: number;
    spiTherapistFinal: number;
    spiPatientFinal: number;
    spiOtherFinal: number;
  };

  type GoalCreationResponseModel = { id: string };

  type ReducerState = {
    totalGoals: number;
    [ValidLoadingKeys.GoalsList]: boolean;
    [ValidLoadingKeys.GoalWrite]: boolean;
    [ValidLoadingKeys.GoalById]: boolean;
    goalsList: GoalsResponseModel | null;
    focusedGoal: Goals.GoalRecord | null;
    didGoalsError: string | null;
    pagination: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
  };
}
