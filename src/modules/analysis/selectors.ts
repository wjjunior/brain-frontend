import { GlobalState } from '../';
import {
  Analysis,
  ValidHealthImpactSubjects,
  ValidHealthImpactSubjectsWithForm,
  ValidLoadingKeys,
} from './types';

// const authState = (state: GlobalState) => state.analysis;
export const coreSetReferences = (state: GlobalState) =>
  state.analysis.coreSetReferences;
export const analysis = (state: GlobalState) => state.analysis.analysis;
export const isAnalysisLoading = (state: GlobalState) =>
  state.analysis[ValidLoadingKeys.Analysis];
export const didAnalysisError = (state: GlobalState) =>
  state.analysis.didAnalysisError;
export const pagination = (state: GlobalState) => state.analysis.pagination;
export const coreSet = (state: GlobalState) => state.analysis.coreSet;
export const isCoreSetReferencesLoading = (state: GlobalState) =>
  state.analysis.isCoreSetReferencesLoading;
export const isCoreSetLoading = (state: GlobalState) =>
  state.analysis.isCoreSetLoading;
export const didCoreSetReferencesError = (state: GlobalState) =>
  state.analysis.didCoreSetReferencesError;
export const didCoreSetError = (state: GlobalState) =>
  state.analysis.didCoreSetError;
export const draftPatientId = (state: GlobalState) =>
  state.analysis.draft?.patientId || null;
export const draftCoreSetId = (state: GlobalState) =>
  state.analysis.draft?.coreSetId || null;
export const draftCoreSetIcfs = (state: GlobalState) =>
  state.analysis.draft?.icfs || {};
export const draftCoreSetIcfById = (icFId: string) => (state: GlobalState) =>
  state.analysis.draft?.icfs[icFId];
export const coreSetIcFById = (categoryId: string, icFId: string) => (
  state: GlobalState
) => state.analysis.coreSet?.icFs[categoryId].find((icF) => icF.id === icFId);
export const draftNeuropsichologicalProfileFormCategory = (
  category: keyof Analysis.NeuropsichologicalProfileForm
) => (state: GlobalState) =>
  state.analysis.neuropsichologicalProfile.draft.form[category];
export const draftNeuropsichologicalProfileForm = (state: GlobalState) =>
  state.analysis.neuropsichologicalProfile.draft.form;
export const draftNeuropsichologicalProfileAdditionalInfo = (
  state: GlobalState
) => state.analysis.neuropsichologicalProfile.draft.additionalInformation;
export const draftNeuropsichologicalProfilePatientId = (state: GlobalState) =>
  state.analysis.neuropsichologicalProfile.draft.patientId;
export const draftNeuropsichologicalProfileProgress = (state: GlobalState) =>
  state.analysis.neuropsichologicalProfile.draft.progress;
export const draftHealthImpactPatientId = (state: GlobalState) =>
  state.analysis.healthImpact.draft.patientId;
export const draftHealthImpactProgress = (state: GlobalState) =>
  state.analysis.healthImpact.draft.progress;
export const draftHealthImpactSelectedSubjects = (state: GlobalState) =>
  Object.keys(state.analysis.healthImpact.draft.subjects) as Array<
    ValidHealthImpactSubjects
  >;
export const draftHealthImpactSubjects = (state: GlobalState) =>
  state.analysis.healthImpact.draft.subjects;
export const draftHealthImpactSubject = (
  subject: ValidHealthImpactSubjects
) => (state: GlobalState) =>
  state.analysis.healthImpact.draft.subjects[subject];
export const draftHealthImpactSubjectQuestions = (
  subject: ValidHealthImpactSubjectsWithForm
) => (state: GlobalState) => {
  const subjectObj = state.analysis.healthImpact.draft.subjects[subject];

  return subjectObj?.form.questions;
};
export const draftHealthImpactSubjectAnswers = (
  subject: ValidHealthImpactSubjectsWithForm
) => (state: GlobalState) => {
  const subjectObj = state.analysis.healthImpact.draft.subjects[subject];

  return subjectObj?.form.answers;
};
export const draftHealthImpactSubjectDescription = (
  subject: ValidHealthImpactSubjectsWithForm
) => (state: GlobalState) => {
  const subjectObj = state.analysis.healthImpact.draft.subjects[subject];

  return subjectObj?.description;
};
export const isHealthImpactSubjectFormLoading = (state: GlobalState) =>
  state.analysis[ValidLoadingKeys.HealthImpactResearchForm];
export const didHealthImpactSubjectResearchFormError = (state: GlobalState) =>
  state.analysis.didHealthImpactSubjectResearchFormError;
export const draftProspectiveResultMapPatientId = (state: GlobalState) =>
  state.analysis.prospectiveResultMap.draft.patientId;
export const draftGlobalPrognosticPatientId = (state: GlobalState) =>
  state.analysis.globalPrognostic.draft.patientId;
export const draftProspectiveResultMapDiagnosticId = (state: GlobalState) =>
  state.analysis.prospectiveResultMap.draft.diagnosticId;
export const draftGlobalPrognosticDiagnosticId = (state: GlobalState) =>
  state.analysis.globalPrognostic.draft.diagnosticId;
export const draftProspectiveResultMapCoreSetId = (state: GlobalState) =>
  state.analysis.prospectiveResultMap.draft.coreSetId;
export const draftGlobalPrognosticCoreSetId = (state: GlobalState) =>
  state.analysis.globalPrognostic.draft.coreSetId;
export const draftProspectiveResultMapProgress = (state: GlobalState) =>
  state.analysis.prospectiveResultMap.draft.progress;
export const draftGlobalPrognosticProgress = (state: GlobalState) =>
  state.analysis.globalPrognostic.draft.progress;
export const isPatientDiagnosticsLoading = (state: GlobalState) =>
  state.analysis[ValidLoadingKeys.ListPatientDiagnostics];
export const focusedPatientDiagnostics = (state: GlobalState) =>
  state.analysis.focusedPatientDiagnostics;
export const focusedDiagnosticResults = (state: GlobalState) =>
  state.analysis.focusedDiagnosticResults;
export const isFocusedDiagnosticResultsLoading = (state: GlobalState) =>
  state.analysis.isFocusedDiagnosticResultsLoading;
export const didFocusedDiagnosticResultsError = (state: GlobalState) =>
  state.analysis.didFocusedDiagnosticResultsError;
export const isCoreSetSaving = (state: GlobalState) =>
  state.analysis[ValidLoadingKeys.SaveCoreSet];
export const isProspectiveResultMapSaving = (state: GlobalState) =>
  state.analysis[ValidLoadingKeys.SaveProspectiveResultMap];
export const isGlobalPrognosticSaving = (state: GlobalState) =>
  state.analysis[ValidLoadingKeys.SaveGlobalPrognostic];
export const isNeuropsichologicalProfileSaving = (state: GlobalState) =>
  state.analysis[ValidLoadingKeys.SaveNeuropsichologicalProfile];
export const isHealhImpactResearchFormSaving = (state: GlobalState) =>
  state.analysis[ValidLoadingKeys.SaveHealhImpactResearchForm];
