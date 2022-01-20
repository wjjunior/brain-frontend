import {
  ActionPayloads,
  Actions,
  ActionTypes,
  Patients,
  ValidFormFieldNames,
  ValidLoadingKeys,
} from './types';

export const changeLoadingStatus = (
  loadingKey: ValidLoadingKeys,
  newStatus: boolean
): Actions.ChangeLoadingStatus => {
  return {
    type: ActionTypes.CHANGE_LOADING_STATUS,
    payload: { loadingKey, newStatus },
  };
};

export const loadPatientsRequest = (
  query?: Patients.PatientsQuery
): Actions.LoadPatientsRequest => {
  return {
    type: ActionTypes.LOAD_PATIENTS_REQUEST,
    payload: { query },
  };
};

export const loadPatientsSuccess = (
  patientsList: Patients.PatientsResponseModel,
  totalPatients: number,
  offset: number
): Actions.LoadPatientsSuccess => {
  return {
    type: ActionTypes.LOAD_PATIENTS_SUCCESS,
    payload: { patientsList, totalPatients, offset },
  };
};

export const loadPatientsFailed = (
  message: string
): Actions.LoadPatientsFailed => {
  return {
    type: ActionTypes.LOAD_PATIENTS_FAILED,
    payload: { message },
  };
};

export function lookupZipcode(
  zipcode: string
): Actions.LookupPatientZipcodeRequest {
  return {
    type: ActionTypes.LOOKUP_PATIENT_ZIPCODE_REQUEST,
    payload: { zipcode },
  };
}

export function lookupZipcodeSuccess(
  zipcodeLookupResult: Patients.ZipCodeLookupResult
): Actions.LookupPatientZipcodeSuccess {
  return {
    type: ActionTypes.LOOKUP_PATIENT_ZIPCODE_SUCCESS,
    payload: { zipcodeLookupResult },
  };
}

export function lookupZipcodeFailed(
  zipcodeLookupError?: Patients.ZipCodeLookupError
): Actions.LookupPatientZipcodeFailed {
  return {
    type: ActionTypes.LOOKUP_PATIENT_ZIPCODE_FAILED,
    payload: { zipcodeLookupError },
  };
}

export function createPatient(
  patientRecord: Patients.PatientRecordPersonalInformation,
  onFinish: (patientId: string) => void
): Actions.CreatePatientRequest {
  return {
    type: ActionTypes.CREATE_PATIENT_REQUEST,
    payload: { patientRecord, onFinish },
  };
}

export function createPatientSuccess(
  patientId: string
): Actions.CreatePatientSuccess {
  return {
    type: ActionTypes.CREATE_PATIENT_SUCCESS,
    payload: { patientId },
  };
}

export function createPatientFailed(): Actions.CreatePatientFailed {
  return {
    type: ActionTypes.CREATE_PATIENT_FAILED,
    payload: {},
  };
}

export function loadPatient(patientId: string): Actions.LoadPatientRequest {
  return {
    type: ActionTypes.LOAD_PATIENT_REQUEST,
    payload: { patientId },
  };
}

export function loadPatientSuccess(
  patientRecord: Patients.PatientRecord
): Actions.LoadPatientSuccess {
  return {
    type: ActionTypes.LOAD_PATIENT_SUCCESS,
    payload: { patientRecord },
  };
}

export function loadPatientFailed(): Actions.LoadPatientFailed {
  return {
    type: ActionTypes.LOAD_PATIENT_FAILED,
    payload: {},
  };
}

export function clearFocusedPatient(): Actions.ClearFocusedPatient {
  return {
    type: ActionTypes.CLEAR_FOCUSED_PATIENT,
    payload: {},
  };
}

export function editPatient(
  patientId: string,
  patientRecord:
    | Patients.PatientRecordPersonalInformation
    | Patients.PatientRecordClinicalInformation,
  onFinish: (patientId: string) => void
): Actions.EditPatientRequest {
  return {
    type: ActionTypes.EDIT_PATIENT_REQUEST,
    payload: { patientId, patientRecord, onFinish },
  };
}

export function editPatientSuccess(
  patientRecord:
    | Patients.PatientRecordPersonalInformation
    | Patients.PatientRecordClinicalInformation
): Actions.EditPatientSuccess {
  return {
    type: ActionTypes.EDIT_PATIENT_SUCCESS,
    payload: { patientRecord },
  };
}

export function editPatientFailed(): Actions.EditPatientFailed {
  return {
    type: ActionTypes.EDIT_PATIENT_FAILED,
    payload: {},
  };
}

export function loadIcdRequest(query: {
  filter?: string;
  limit?: number;
  offset?: number;
}): Actions.LoadIcdRequest {
  return {
    type: ActionTypes.LOAD_ICD_REQUEST,
    payload: { query },
  };
}

export function loadIcdSuccess(
  icdRecords: Patients.IcdRecord[],
  totalCount: number,
  currentOffset: number,
  searchText: string
): Actions.LoadIcdSuccess {
  return {
    type: ActionTypes.LOAD_ICD_SUCCESS,
    payload: { icdRecords, totalCount, currentOffset, searchText },
  };
}

export function loadIcdFailed(): Actions.LoadIcdFailed {
  return {
    type: ActionTypes.LOAD_ICD_FAILED,
    payload: {},
  };
}

export function updateSocialEconomicLevel(
  newSocialEconomicLevel: Patients.SocialEconomicLevels
): Actions.UpdateSocialEconomicLevel {
  return {
    type: ActionTypes.UPDATE_SOCIAL_ECONOMIC_LEVEL,
    payload: { newSocialEconomicLevel },
  };
}

export function answerSocialEconomicQuestion(
  payload: ActionPayloads.AnswerSocialEconomicQuestion
): Actions.AnswerSocialEconomicQuestion {
  return {
    type: ActionTypes.ANSWER_SOCIAL_ECONOMIC_QUESTION,
    payload,
  };
}

export function updateValidationText(
  formFieldName: ValidFormFieldNames,
  newText: string
): Actions.UpdateValidationText {
  return {
    type: ActionTypes.UPDATE_VALIDATION_TEXT,
    payload: { formFieldName, newText },
  };
}
