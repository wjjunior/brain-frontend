import { PAGINATION_GOALS_PER_PAGE } from './constants';
import { Actions, ActionTypes, Goals, ValidLoadingKeys } from './types';

const initialState: Goals.ReducerState = {
  totalGoals: 0,
  [ValidLoadingKeys.GoalsList]: false,
  [ValidLoadingKeys.GoalWrite]: false,
  [ValidLoadingKeys.GoalById]: false,
  didGoalsError: null,
  focusedGoal: null,
  goalsList: null,
  pagination: {
    total: 0,
    per_page: PAGINATION_GOALS_PER_PAGE,
    current_page: 1,
    last_page: 1,
  },
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case ActionTypes.CHANGE_LOADING_STATUS: {
      const {
        payload: { loadingKey, newStatus },
      } = action as Actions.ChangeLoadingStatus;

      return { ...state, [loadingKey]: newStatus };
    }

    case ActionTypes.LOAD_GOALS_SUCCESS: {
      const {
        payload: { goalsList, totalGoals, offset },
      } = action as Actions.LoadGoalsSuccess;

      return {
        ...state,
        goalsList,
        totalGoals,
        pagination: {
          ...state.pagination,
          total: totalGoals,
          current_page: offset ? offset + 1 : 1,
          last_page: totalGoals
            ? Math.ceil(totalGoals / state.pagination.per_page)
            : 1,
        },
      };
    }

    case ActionTypes.LOAD_GOALS_FAILED: {
      const {
        payload: { message },
      } = action as Actions.LoadGoalsFailed;

      return { ...state, didPatientsError: message };
    }

    case ActionTypes.LOAD_GOAL_FAILED:
    case ActionTypes.LOAD_GOAL_REQUEST:
    case ActionTypes.CLEAR_FOCUSED_GOAL: {
      return {
        ...state,
        focusedGoal: null,
      };
    }
    case ActionTypes.EDIT_GOAL_SUCCESS:
    case ActionTypes.LOAD_GOAL_SUCCESS: {
      const {
        payload: { goalRecord },
      } = action as Actions.LoadGoalSuccess | Actions.EditGoalSuccess;

      return {
        ...state,
        focusedPatient: { ...(state.focusedGoal || {}), ...goalRecord },
      };
    }

    case ActionTypes.CREATE_GOAL_SUCCESS: {
      const {
        payload: { goalId },
      } = action as Actions.CreateGoalSuccess;

      return {
        ...state,
        focusedGoal: { ...(state.focusedGoal || {}), id: goalId },
      };
    }

    case ActionTypes.CHANGE_GOAL_STATUS_SUCCESS: {
      const {
        payload: { goalStatusRecord },
      } = action as Actions.ChangeGoalStatusSuccess;

      return {
        ...state,
        focusedPatient: { ...(state.focusedGoal || {}), ...goalStatusRecord },
      };
    }

    default:
      return state;
  }
}
