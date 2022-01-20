import { Patients } from './types';

const ROUTE_PATIENTS = '/patients';
export const ROUTE_PATIENTS_HOME = `${ROUTE_PATIENTS}/`;
export const ROUTE_PATIENTS_CREATE = `${ROUTE_PATIENTS}/:verb`;
export const ROUTE_PATIENTS_EDIT = `${ROUTE_PATIENTS}/:verb/id-:id`;
export const ROUTE_PATIENTS_CREATE_PERSONAL_INFO = `${ROUTE_PATIENTS_CREATE}/personal-info`;
export const ROUTE_PATIENTS_CREATE_CLINICAL_INFO = `${ROUTE_PATIENTS_CREATE}/clinical-info/:id`;
export const ROUTE_PATIENTS_EDIT_PERSONAL_INFO = `${ROUTE_PATIENTS_EDIT}/personal-info`;
export const ROUTE_PATIENTS_EDIT_CLINICAL_INFO = `${ROUTE_PATIENTS_EDIT}/clinical-info`;
export const ROUTE_PATIENTS_EDIT_HEALTH_IMPACTS = `${ROUTE_PATIENTS_EDIT}/health-impact`;
export const ROUTE_PATIENTS_EDIT_CORESETS = `${ROUTE_PATIENTS_EDIT}/coreset`;
export const ROUTE_PATIENTS_EDIT_GOALS = `${ROUTE_PATIENTS_EDIT}/goal`;
export const ROUTE_PATIENTS_EDIT_PROSPECTIVE_RESULT_MAPS = `${ROUTE_PATIENTS_EDIT}/prospective-result-map`;
export const ROUTE_PATIENTS_EDIT_GLOBAL_PROGNOSTICS = `${ROUTE_PATIENTS_EDIT}/global-prognostic`;
export const ROUTE_PATIENTS_EDIT_NEUROPSICHOLOGICAL_PROFILES = `${ROUTE_PATIENTS_EDIT}/neuropsichological-profile`;

export const ROUTES = {
  HOME: ROUTE_PATIENTS_HOME,
  CREATE: ROUTE_PATIENTS_CREATE,
  EDIT: ROUTE_PATIENTS_EDIT,
  CREATE_PERSONAL_INFO: ROUTE_PATIENTS_CREATE_PERSONAL_INFO,
  CREATE_CLINICAL_INFO: ROUTE_PATIENTS_CREATE_CLINICAL_INFO,
  EDIT_PERSONAL_INFO: ROUTE_PATIENTS_EDIT_PERSONAL_INFO,
  EDIT_CLINICAL_INFO: ROUTE_PATIENTS_EDIT_CLINICAL_INFO,
  EDIT_HEALTH_IMPACTS: ROUTE_PATIENTS_EDIT_HEALTH_IMPACTS,
  EDIT_CORESETS: ROUTE_PATIENTS_EDIT_CORESETS,
  EDIT_GOALS: ROUTE_PATIENTS_EDIT_GOALS,
  EDIT_PROSPECTIVE_RESULT_MAPS: ROUTE_PATIENTS_EDIT_PROSPECTIVE_RESULT_MAPS,
  EDIT_GLOBAL_PROGNOSTICS: ROUTE_PATIENTS_EDIT_GLOBAL_PROGNOSTICS,
  EDIT_NEUROPSICHOLOGICAL_PROFILES: ROUTE_PATIENTS_EDIT_NEUROPSICHOLOGICAL_PROFILES,
};

const PATIENTS_BASE_PATH = '/v1/Patients';
export const ENDPOINT_PATIENTS = `${PATIENTS_BASE_PATH}/`;
export const ENDPOINT_PATIENTS_BY_ID = `${PATIENTS_BASE_PATH}/:id`;
export const ENDPOINT_PATIENTS_SAVE_CORE_SET = `${PATIENTS_BASE_PATH}/:id/coresets`;
export const ENDPOINT_PATIENTS_SAVE_GLOBAL_PROGNOSTIC = `${PATIENTS_BASE_PATH}/:id/globalprognostic`;
export const ENDPOINT_PATIENTS_SAVE_PROSPECTIVE_RESULT_MAP = `${PATIENTS_BASE_PATH}/:id/prospectiveresultmap`;
export const ENDPOINT_PATIENTS_SAVE_NEUROPSICHOLOGICAL_PROFILE = `${PATIENTS_BASE_PATH}/:id/neuropsichologicalprofile`;
export const ENDPOINT_PATIENTS_SAVE_REPLIES = `${PATIENTS_BASE_PATH}/:id/replies`;
export const ENDPOINT_PATIENTS_DIAGNOSTICS_BY_PATIENT = `${PATIENTS_BASE_PATH}/:id/diagnostics`;
export const ENDPOINT_PATIENTS_DIAGNOSTICS_BY_ID = `${PATIENTS_BASE_PATH}/:patientId/coreSets/:coreSetId/diagnostics/:id`;
export const ENDPOINT_ANALYSIS = `${PATIENTS_BASE_PATH}/analysis`;
export const ENDPOINT_GOALS = `${PATIENTS_BASE_PATH}/:id/goals`;
export const ENDPOINT_GOALS_BY_ID = `${PATIENTS_BASE_PATH}/:id/goals/:goal`;
export const ENDPOINT_GOALS_CHANGE_STATUS = `${PATIENTS_BASE_PATH}/:id/goals/:goal/changeStatus`;

const ICDS_BASE_PATH = '/v1/Icds';
export const ENDPOINT_ICDS_LIST = `${ICDS_BASE_PATH}/`;

export const EXTERNAL_BRAZIL_ZIPCODE_API_ENDPOINT =
  'https://brasilapi.com.br/api/cep/v1/';

export const ENDPOINTS = {
  LIST: ENDPOINT_PATIENTS,
  CREATE: ENDPOINT_PATIENTS,
  GET_BY_ID: ENDPOINT_PATIENTS_BY_ID,
  EDIT: ENDPOINT_PATIENTS_BY_ID,
  LIST_ICDS: ENDPOINT_ICDS_LIST,
  SAVE_CORE_SET: ENDPOINT_PATIENTS_SAVE_CORE_SET,
  SAVE_NEUROPSICHOLOGICAL_PROFILE: ENDPOINT_PATIENTS_SAVE_NEUROPSICHOLOGICAL_PROFILE,
  SAVE_PROSPECTIVE_RESULT_MAP: ENDPOINT_PATIENTS_SAVE_PROSPECTIVE_RESULT_MAP,
  SAVE_GLOBAL_PROGNOSTIC: ENDPOINT_PATIENTS_SAVE_GLOBAL_PROGNOSTIC,
  DIAGNOSTICS_BY_PATIENT: ENDPOINT_PATIENTS_DIAGNOSTICS_BY_PATIENT,
  DIAGNOSTICS_BY_ID: ENDPOINT_PATIENTS_DIAGNOSTICS_BY_ID,
  ANALYSIS: ENDPOINT_ANALYSIS,
  GOALS: ENDPOINT_GOALS,
  GOALS_BY_ID: ENDPOINT_GOALS_BY_ID,
  GOALS_EDIT: ENDPOINT_GOALS_BY_ID,
  GOALS_CHANGE_STATUS: ENDPOINT_GOALS_CHANGE_STATUS,
  SAVE_REPLIES: ENDPOINT_PATIENTS_SAVE_REPLIES,
};

export const AGE_RANGE_CHILDREN = [0, 11];
export const AGE_RANGE_YOUNG = [12, 19];
export const AGE_RANGE_ADULT = [20, 59];
export const AGE_RANGE_ELDER = [59, 150];

export const AGE_RANGES = {
  CHILDREN: AGE_RANGE_CHILDREN,
  YOUNG: AGE_RANGE_YOUNG,
  ADULT: AGE_RANGE_ADULT,
  ELDER: AGE_RANGE_ELDER,
};

type SocialEconomicValueConstants = {
  ASSETS: {
    [key in Patients.AssetValidKeys]: {
      [key in Patients.AssetValidAnswers]: number;
    };
  };
  PUBLIC_SERVICES: {
    [key in Patients.PublicServiceValidKeys]: {
      [key in Patients.PublicServiceAnswers]: number;
    };
  };
  EDUCATION_LEVELS: {
    [key in Patients.EducationLevelAnswers]: number;
  };
};

export const SOCIAL_ECONOMIC_VALUES: SocialEconomicValueConstants = {
  ASSETS: {
    bathrooms: {
      '0': 0,
      '1': 3,
      '2': 7,
      '3': 10,
      '4+': 14,
    },
    housekeepers: {
      '0': 0,
      '1': 3,
      '2': 7,
      '3': 10,
      '4+': 13,
    },
    cars: {
      '0': 0,
      '1': 3,
      '2': 5,
      '3': 8,
      '4+': 11,
    },
    computers: {
      '0': 0,
      '1': 3,
      '2': 6,
      '3': 8,
      '4+': 11,
    },
    dishwashers: {
      '0': 0,
      '1': 3,
      '2': 6,
      '3': 6,
      '4+': 6,
    },
    fridges: {
      '0': 0,
      '1': 2,
      '2': 3,
      '3': 5,
      '4+': 5,
    },
    freezer: {
      '0': 0,
      '1': 2,
      '2': 4,
      '3': 6,
      '4+': 6,
    },
    washingMachine: {
      '0': 0,
      '1': 2,
      '2': 4,
      '3': 6,
      '4+': 6,
    },
    dvd: {
      '0': 0,
      '1': 1,
      '2': 3,
      '3': 4,
      '4+': 6,
    },
    microwave: {
      '0': 0,
      '1': 2,
      '2': 4,
      '3': 4,
      '4+': 4,
    },
    motorcycle: {
      '0': 0,
      '1': 1,
      '2': 3,
      '3': 3,
      '4+': 3,
    },
    clothesDryer: {
      '0': 0,
      '1': 2,
      '2': 2,
      '3': 2,
      '4+': 2,
    },
  },
  PUBLIC_SERVICES: {
    pipedWater: {
      yes: 4,
      no: 0,
    },
    pavedStreets: {
      yes: 2,
      no: 0,
    },
  },
  EDUCATION_LEVELS: {
    illiterateOrMiddleSchoolOneIncomplete: 0,
    middleSchoolTwoIncomplete: 1,
    highSchoolIncomplete: 2,
    bachelorsIncomplete: 4,
    bachelorsComplete: 7,
  },
};

export const PAGINATION_PATIENTS_PER_PAGE = 10;
export const PAGINATION_ICDS_PER_PAGE = 20;
