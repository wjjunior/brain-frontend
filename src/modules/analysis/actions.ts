import {
  Analysis,
  Actions,
  ActionTypes,
  ActionPayloads,
  ValidLoadingKeys,
  ValidHealthImpactSubjects,
  ValidHealthImpactSubjectsWithForm,
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

export const loadAnalysisRequest = (
  query?: Analysis.AnalysisQuery
): Actions.LoadAnalysisRequest => {
  return {
    type: ActionTypes.LOAD_ANALYSIS_REQUEST,
    payload: { query },
  };
};

export const loadAnalysisSuccess = (
  analysis: Analysis.AnalysisResponseModel,
  totalAnalysis: number,
  offset: number
): Actions.LoadAnalysisSuccess => {
  return {
    type: ActionTypes.LOAD_ANALYSIS_SUCCESS,
    payload: { analysis, totalAnalysis, offset },
  };
};

export const loadAnalysisFailed = (
  message: string
): Actions.LoadAnalysisFailed => {
  return {
    type: ActionTypes.LOAD_ANALYSIS_FAILED,
    payload: { message },
  };
};

export function loadCoreSets(
  query?: Analysis.AnalysisQuery
): Actions.LoadCoreSetReferencesRequest {
  return {
    type: ActionTypes.LOAD_CORESET_REFERENCES_REQUEST,
    payload: { query },
  };
}

export function loadCoreSetsSuccess(
  coreSetReferences: Analysis.CoreSetReference[]
): Actions.LoadCoreSetReferencesSuccess {
  return {
    type: ActionTypes.LOAD_CORESET_REFERENCES_SUCCESS,
    payload: { coreSetReferences },
  };
}

export function loadCoreSetsFailed(): Actions.LoadCoreSetReferencesFailed {
  return {
    type: ActionTypes.LOAD_CORESET_REFERENCES_FAILED,
    payload: {},
  };
}

export function loadCoreSet(coreSetId: string): Actions.LoadCoreSetRequest {
  return {
    type: ActionTypes.LOAD_CORESET_REQUEST,
    payload: { coreSetId },
  };
}

export function loadCoreSetSuccess(
  coreSet: Analysis.CoreSet
): Actions.LoadCoreSetSuccess {
  return {
    type: ActionTypes.LOAD_CORESET_SUCCESS,
    payload: { coreSet },
  };
}

export function loadCoreSetFailed(): Actions.LoadCoreSetFailed {
  return {
    type: ActionTypes.LOAD_CORESET_FAILED,
    payload: {},
  };
}

export function updateFilledCoreSetDraft({
  patientId,
  coreSetId,
}: ActionPayloads.UpdateFilledCoreSetDraft): Actions.UpdateFilledCoreSetDraft {
  return {
    type: ActionTypes.UPDATE_FILLED_CORESET_DRAFT,
    payload: { patientId, coreSetId },
  };
}

export function answerFilledCoreSetDraft({
  icfId,
  answerId,
  description,
  code,
  informationSourceIds,
}: ActionPayloads.AnswerFilledCoreSetDraft): Actions.AnswerFilledCoreSetDraft {
  return {
    type: ActionTypes.ANSWER_FILLED_CORESET_DRAFT,
    payload: { icfId, answerId, code, description, informationSourceIds },
  };
}

export function saveCoreSetRequest(
  patientId: string,
  coreSetId: string,
  icfs: Analysis.SavingIcf[],
  onSuccess: (newDiagnosticId: string) => void
): Actions.CreateCoreSet {
  return {
    type: ActionTypes.CREATE_CORE_SET,
    payload: { patientId, coreSetId, icfs, onSuccess },
  };
}

export function createCoreSetFailed(): Actions.CreateCoreSetFailed {
  return {
    type: ActionTypes.CREATE_CORE_SET_FAILED,
    payload: {},
  };
}

export function createCoreSetSuccess(): Actions.CreateCoreSetSuccess {
  return {
    type: ActionTypes.CREATE_CORE_SET_SUCCESS,
    payload: {},
  };
}

export function clearCoreSetDraft(): Actions.ClearCoreSetDraft {
  return {
    type: ActionTypes.CLEAR_CORESET_DRAFT,
    payload: {},
  };
}

export function clearCoreSet(): Actions.ClearCoreSet {
  return {
    type: ActionTypes.CLEAR_CORESET,
    payload: {},
  };
}

export function updateNeuropsichologicalProfileAdditionalInfo(
  payload: ActionPayloads.UpdateNeuropsichologicalProfileAdditionalInfo
): Actions.UpdateNeuropsichologicalProfileAdditionalInfo {
  return {
    type: ActionTypes.UPDATE_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO,
    payload: payload,
  };
}

export function updateNeuropsichologicalProfileMedication(
  payload: ActionPayloads.UpdateNeuropsichologicalProfileMedication
): Actions.UpdateNeuropsichologicalProfileMedication {
  return {
    type: ActionTypes.UPDATE_NEUROPSICHOLOGICAL_PROFILE_MEDICATION,
    payload: payload,
  };
}

export function removeNeuropsichologicalProfileMedication(
  index: number
): Actions.RemoveNeuropsichologicalProfileMedication {
  return {
    type: ActionTypes.REMOVE_NEUROPSICHOLOGICAL_PROFILE_MEDICATION,
    payload: { index },
  };
}

export function clearNeuropsichologicalProfileDraft(): Actions.ClearNeuropsichologicalProfileDraft {
  return {
    type: ActionTypes.CLEAR_NEUROPSICHOLOGICAL_PROFILE_DRAFT,
    payload: {},
  };
}

export function updateNeuropsichologicalProfileForm(
  payload: ActionPayloads.UpdateNeuropsichologicalProfileForm
): Actions.UpdateNeuropsichologicalProfileForm {
  return {
    type: ActionTypes.UPDATE_NEUROPSICHOLOGICAL_PROFILE_FORM,
    payload: payload,
  };
}

export function markNeuropsichologicalProfileProgress(
  step: string
): Actions.MarkNeuropsichologicalProfileProgress {
  return {
    type: ActionTypes.MARK_NEUROPSICHOLOGICAL_PROFILE_PROGRESS,
    payload: { step },
  };
}

export function selectNeuropsichologicalProfilePatient(
  patientId: string
): Actions.SelectNeuropsichologicalProfilePatient {
  return {
    type: ActionTypes.SELECT_NEUROPSICHOLOGICAL_PROFILE_PATIENT,
    payload: { patientId },
  };
}

export function selectHealthImpactPatient(
  patientId: string
): Actions.SelectHealthImpactPatient {
  return {
    type: ActionTypes.SELECT_HEALTH_IMPACT_PATIENT,
    payload: { patientId },
  };
}

export function selectHealthImpactSubjects(
  subjects: Array<ValidHealthImpactSubjects>
): Actions.SelectHealthImpactSubjects {
  return {
    type: ActionTypes.SELECT_HEALTH_IMPACT_SUBJECTS,
    payload: { subjects },
  };
}

export function clearHealthImpactDraft(): Actions.ClearHealthImpactDraft {
  return {
    type: ActionTypes.CLEAR_HEALTH_IMPACT_DRAFT,
    payload: {},
  };
}

export function loadHealthImpactSubjectFormRequest(
  subject: ValidHealthImpactSubjects,
  formId: string
): Actions.LoadHealthImpactSubjectFormRequest {
  return {
    type: ActionTypes.LOAD_HEALTH_IMPACT_SUBJECT_FORM_REQUEST,
    payload: { subject, formId },
  };
}

export function loadHealthImpactSubjectFormSuccess(
  subject: ValidHealthImpactSubjects,
  form: Analysis.ResearchForm
): Actions.LoadHealthImpactSubjectFormSuccess {
  return {
    type: ActionTypes.LOAD_HEALTH_IMPACT_SUBJECT_FORM_SUCCESS,
    payload: { subject, form },
  };
}

export function loadHealthImpactSubjectFormFailed(): Actions.LoadHealthImpactSubjectFormFailed {
  return {
    type: ActionTypes.LOAD_HEALTH_IMPACT_SUBJECT_FORM_FAILED,
    payload: {},
  };
}

export function saveHealthImpactSubjects(
  patientId: string,
  subjects: any[],
  onSaveAll: () => void
): Actions.SaveHealthImpactSubjects {
  return {
    type: ActionTypes.SAVE_HEALTH_IMPACT_SUBJECTS,
    payload: { patientId, subjects, onSaveAll },
  };
}

export function saveHealthImpactSubjectFormRequest({
  patientId,
  questions,
  notesL,
  notesF,
}: Analysis.RepliesRequestParams & {
  patientId: string;
}): Actions.SaveHealthImpactSubjectRepliesRequest {
  return {
    type: ActionTypes.SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_REQUEST,
    payload: { patientId, notesF, notesL, questions },
  };
}

export function saveHealthImpactSubjectFormSuccess(): Actions.SaveHealthImpactSubjectRepliesSuccess {
  return {
    type: ActionTypes.SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_SUCCESS,
    payload: {},
  };
}

export function saveHealthImpactSubjectFormFailed(): Actions.SaveHealthImpactSubjectRepliesFailed {
  return {
    type: ActionTypes.SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_FAILED,
    payload: {},
  };
}

export function markHealthImpactProgress(
  step: string,
  state: boolean = true
): Actions.MarkHealthImpactProgress {
  return {
    type: ActionTypes.MARK_HEALTH_IMPACT_PROGRESS,
    payload: { step, state },
  };
}

export function updateHealthImpactOpenField(
  subject: ValidHealthImpactSubjects,
  key: string,
  value: string
): Actions.UpdateHealthImpactOpenField {
  return {
    type: ActionTypes.UPDATE_HEALTH_IMPACT_OPEN_FIELD,
    payload: { subject, key, value },
  };
}

export function updateHealthImpactFormField(
  subject: ValidHealthImpactSubjectsWithForm,
  questionId: string,
  answerId: string
): Actions.UpdateHealthImpactFormField {
  return {
    type: ActionTypes.UPDATE_HEALTH_IMPACT_FORM_FIELD,
    payload: { subject, questionId, answerId },
  };
}

export function saveNeuropsichologicalProfileRequest(
  patientId: string,
  form: Analysis.NeuropsichologicalProfileForm,
  additionalInformation: Analysis.NeuropsichologicalProfileAdditionalInfo,
  onSuccess: () => void
): Actions.SaveNeuropsichologicalProfileRequest {
  return {
    type: ActionTypes.SAVE_NEUROPSICHOLOGICAL_PROFILE_REQUEST,
    payload: { patientId, form, additionalInformation, onSuccess },
  };
}

export function saveNeuropsichologicalProfileSuccess(): Actions.SaveNeuropsichologicalProfileSuccess {
  return {
    type: ActionTypes.SAVE_NEUROPSICHOLOGICAL_PROFILE_SUCCESS,
    payload: {},
  };
}

export function saveNeuropsichologicalProfileFailed(): Actions.SaveNeuropsichologicalProfileFailed {
  return {
    type: ActionTypes.SAVE_NEUROPSICHOLOGICAL_PROFILE_FAILED,
    payload: {},
  };
}

export function clearProspectiveResultMapDraft(): Actions.ClearProspectiveResultMapDraft {
  return {
    type: ActionTypes.CLEAR_PROSPECTIVE_RESULT_MAP_DRAFT,
    payload: {},
  };
}

export function markProspectiveResultMapProgress(
  step: string
): Actions.MarkProspectiveResultMapProgress {
  return {
    type: ActionTypes.MARK_PROSPECTIVE_RESULT_MAP_PROGRESS,
    payload: { step },
  };
}

export function selectProspectiveResultMapPatient(
  patientId: string
): Actions.SelectProspectiveResultMapPatient {
  return {
    type: ActionTypes.SELECT_PROSPECTIVE_RESULT_MAP_PATIENT,
    payload: { patientId },
  };
}

export function clearGlobalPrognosticDraft(): Actions.ClearGlobalPrognosticDraft {
  return {
    type: ActionTypes.CLEAR_GLOBAL_PROGNOSTIC_DRAFT,
    payload: {},
  };
}

export function markGlobalPrognosticProgress(
  step: string
): Actions.MarkGlobalPrognosticProgress {
  return {
    type: ActionTypes.MARK_GLOBAL_PROGNOSTIC_PROGRESS,
    payload: { step },
  };
}

export function selectGlobalPrognosticPatient(
  patientId: string
): Actions.SelectGlobalPrognosticPatient {
  return {
    type: ActionTypes.SELECT_GLOBAL_PROGNOSTIC_PATIENT,
    payload: { patientId },
  };
}

export function saveProspectiveResultMapRequest(
  patientId: string,
  coreSetId: string,
  diagnosticId: string,
  onSuccess: (newDiagnosticId: string) => void
): Actions.SaveProspectiveResultMapRequest {
  return {
    type: ActionTypes.SAVE_PROSPECTIVE_RESULT_MAP_REQUEST,
    payload: { patientId, coreSetId, diagnosticId, onSuccess },
  };
}

export function saveProspectiveResultMapSuccess(): Actions.SaveProspectiveResultMapSuccess {
  return {
    type: ActionTypes.SAVE_PROSPECTIVE_RESULT_MAP_SUCCESS,
    payload: {},
  };
}

export function saveProspectiveResultMapFailed(): Actions.SaveProspectiveResultMapFailed {
  return {
    type: ActionTypes.SAVE_PROSPECTIVE_RESULT_MAP_FAILED,
    payload: {},
  };
}

export function saveGlobalPrognosticRequest(
  patientId: string,
  coreSetId: string,
  diagnosticId: string,
  onSuccess: (newDiagnosticId: string) => void
): Actions.SaveGlobalPrognosticRequest {
  return {
    type: ActionTypes.SAVE_GLOBAL_PROGNOSTIC_REQUEST,
    payload: { patientId, coreSetId, diagnosticId, onSuccess },
  };
}

export function saveGlobalPrognosticSuccess(): Actions.SaveGlobalPrognosticSuccess {
  return {
    type: ActionTypes.SAVE_GLOBAL_PROGNOSTIC_SUCCESS,
    payload: {},
  };
}

export function saveGlobalPrognosticFailed(): Actions.SaveGlobalPrognosticFailed {
  return {
    type: ActionTypes.SAVE_GLOBAL_PROGNOSTIC_FAILED,
    payload: {},
  };
}

export function listPatientDiagnosticsRequest(
  patientId: string,
  diagnosticType?: string
): Actions.ListPatientDiagnosticsRequest {
  return {
    type: ActionTypes.LIST_PATIENT_DIAGNOSTICS_REQUEST,
    payload: { patientId, diagnosticType },
  };
}

export function listPatientDiagnosticsSuccess(
  diagnostics: Analysis.AnalysisResponseModel
): Actions.ListPatientDiagnosticsSuccess {
  return {
    type: ActionTypes.LIST_PATIENT_DIAGNOSTICS_SUCCESS,
    payload: { diagnostics },
  };
}

export function listPatientDiagnosticsFailed(): Actions.ListPatientDiagnosticsFailed {
  return {
    type: ActionTypes.LIST_PATIENT_DIAGNOSTICS_FAILED,
    payload: {},
  };
}

export function getDiagnosticResultsRequest(
  patientId: string,
  coreSetId: string,
  diagnosticId: string,
  query?: Analysis.AnalysisQuery
): Actions.GetDiagnosticResultsRequest {
  return {
    type: ActionTypes.GET_DIAGNOSTIC_RESULTS_REQUEST,
    payload: { patientId, coreSetId, diagnosticId, query },
  };
}

export function getDiagnosticResultsSuccess(
  coreSet: Analysis.CoreSetResult[]
): Actions.GetDiagnosticResultsSuccess {
  return {
    type: ActionTypes.GET_DIAGNOSTIC_RESULTS_SUCCESS,
    payload: { coreSet },
  };
}

export function getDiagnosticResultsFailed(): Actions.GetDiagnosticResultsFailed {
  return {
    type: ActionTypes.GET_DIAGNOSTIC_RESULTS_FAILED,
    payload: {},
  };
}

export function selectProspectiveResultMapCoreSet(
  coreSetId: string,
  diagnosticId: string
): Actions.SelectProspectiveResultMapCoreSet {
  return {
    type: ActionTypes.SELECT_PROSPECTIVE_RESULT_MAP_CORESET,
    payload: { coreSetId, diagnosticId },
  };
}

export function selectGlobalPrognosticCoreSet(
  coreSetId: string,
  diagnosticId: string
): Actions.SelectGlobalPrognosticCoreSet {
  return {
    type: ActionTypes.SELECT_GLOBAL_PROGNOSTIC_CORESET,
    payload: { coreSetId, diagnosticId },
  };
}

export function clearFocusedDiagnosticResults(): Actions.ClearFocusedDiagnosticResults {
  return {
    type: ActionTypes.CLEAR_FOCUSED_DIAGNOSTIC_RESULTS,
    payload: {},
  };
}
