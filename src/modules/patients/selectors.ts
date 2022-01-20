import { GlobalState } from '..';
import { ValidLoadingKeys } from './types';

export const patientsList = (state: GlobalState) => state.patients.patientsList;
export const totalPatients = (state: GlobalState) =>
  state.patients.totalPatients;
export const pagination = (state: GlobalState) => state.patients.pagination;
export const icdPagination = (state: GlobalState) =>
  state.patients.icdPagination;
export const isPatientsListLoading = (state: GlobalState) =>
  state.patients[ValidLoadingKeys.PatientsList];
export const isFocusedPatientLoading = (state: GlobalState) =>
  state.patients[ValidLoadingKeys.PatientById];
export const isPatientWriteLoading = (state: GlobalState) =>
  state.patients[ValidLoadingKeys.PatientWrite];
export const isZipcodeLookupLoading = (state: GlobalState) =>
  state.patients[ValidLoadingKeys.ZipcodeLookup];
export const isIcdReferencesLoading = (state: GlobalState) =>
  state.patients[ValidLoadingKeys.IcdReferences];
export const didPatientsError = (state: GlobalState) =>
  state.patients.didPatientsError;
export const latestZipcodeLookup = (state: GlobalState) =>
  state.patients.latestZipcodeLookup;
export const focusedPatient = (state: GlobalState) =>
  state.patients.focusedPatient;
export const icdReferences = (state: GlobalState) => state.patients.icdRecords;
export const socialEconomicAnswers = (state: GlobalState) =>
  state.patients.socialEconomicAnswers;
export const socialEconomicLevel = (state: GlobalState) =>
  state.patients.socialEconomicLevel;
export const patientValidationTexts = (state: GlobalState) =>
  state.patients.patientValidationTexts;
export const socialEconomicValidationText = (state: GlobalState) =>
  state.patients.patientValidationTexts['social-economic-level'];
