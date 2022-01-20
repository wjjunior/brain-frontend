export enum ActionTypes {
  LOAD_DASHBOARD_REQUEST = 'dashboard/LOAD_DASHBOARD_REQUEST',
  CHANGE_LOADING_STATUS = 'auth/CHANGE_LOADING_STATUS',
  LOAD_DASHBOARD_SUCCESS = 'dashboard/LOAD_DASHBOARD_SUCCESS',
  LOAD_DASHBOARD_FAILED = 'dashboard/LOAD_DASHBOARD_FAILED',
}

export declare namespace ActionPayloads {
  type LoadDashboardRequest = {
    fromDatetime: string;
  };

  type ChangeLoadingStatus = {
    loadingKey: ValidLoadingKeys;
    newStatus: boolean;
  };

  type LoadDashboardFailed = {
    message: string;
  };
}

export declare namespace Actions {
  type loadDashboardRequest = {
    type: ActionTypes.LOAD_DASHBOARD_REQUEST;
    payload: ActionPayloads.LoadDashboardRequest;
  };

  type ChangeLoadingStatus = {
    type: ActionTypes.CHANGE_LOADING_STATUS;
    payload: ActionPayloads.ChangeLoadingStatus;
  };

  type loadDashboardSuccess = {
    type: ActionTypes.LOAD_DASHBOARD_SUCCESS;
    payload: Dashboard.DashboardResponseModel;
  };

  type loadDashboardFailed = {
    type: ActionTypes.LOAD_DASHBOARD_FAILED;
    payload: ActionPayloads.LoadDashboardFailed;
  };
}

export enum ValidLoadingKeys {
  Dashboard = 'loadingKey/DASHBOARD',
}

type TopIcdSummary = {
  description: string;
  patients: number;
};

type TopDiagnosticSummary = {
  coreSet: string;
  patient: string;
  date: string;
};

type TopCoreSetsSummary = {
  description: string;
  total: number;
};

type TopCoreSetCategoriesSummary = {
  name: string;
  total: number;
};

type GenderSummary = {
  attendances: number;
  maleTotal: number;
  malePercentage: number;
  femaleTotal: number;
  femalePercentage: number;
};

type GoalsSummary = {
  goalsTotal: number;
  goalsAchievedTotal: number;
  goalsAchievedPercentage: number;
  goalsNotMetTotal: number;
  goalsNotMetPercentage: number;
  goalsInProgressTotal: number;
  goalsInProgressPercentage: number;
};

type TopGoalsSummary = {
  name: string;
  patient: string;
  date: string;
};

export declare namespace Dashboard {
  type DashboardResponseModel = {
    patientsTotal: number;
    diagnosticsTotal: number;
    ageRange: number;
    topIcdSummary: TopIcdSummary[];
    topDiagnosticSummary: TopDiagnosticSummary[];
    genderSummary: GenderSummary;
    topCoreSetsSummary: TopCoreSetsSummary[];
    topCoreSetCategoriesSummary: TopCoreSetCategoriesSummary[];
    goalsSummary: GoalsSummary;
    topGoalsSummary: TopGoalsSummary[];
  };

  type ReducerState = {
    dashboardSummary: DashboardResponseModel | null;
    [ValidLoadingKeys.Dashboard]: boolean;
    didDashboardError: null | string;
  };
}
