export enum ActionTypes {
  LOAD_CORESET_REFERENCES_REQUEST = 'analysis/LOAD_CORESET_REFERENCES_REQUEST',
  LOAD_CORESET_REFERENCES_SUCCESS = 'analysis/LOAD_CORESET_REFERENCES_SUCCESS',
  LOAD_CORESET_REFERENCES_FAILED = 'analysis/LOAD_CORESET_REFERENCES_FAILED',
  LOAD_CORESET_REQUEST = 'analysis/LOAD_CORESET_REQUEST',
  LOAD_CORESET_SUCCESS = 'analysis/LOAD_CORESET_SUCCESS',
  LOAD_CORESET_FAILED = 'analysis/LOAD_CORESET_FAILED',
  UPDATE_FILLED_CORESET_DRAFT = 'analysis/UPDATE_FILLED_CORESET_DRAFT',
  ANSWER_FILLED_CORESET_DRAFT = 'analysis/ANSWER_FILLED_CORESET_DRAFT',
  CREATE_CORE_SET = 'analysis/CREATE_CORE_SET',
  CREATE_CORE_SET_SUCCESS = 'analysis/CREATE_CORE_SET_SUCCESS',
  CREATE_CORE_SET_FAILED = 'analysis/CREATE_CORE_SET_FAILED',
  LOAD_ANALYSIS_REQUEST = 'analysis/LOAD_ANALYSIS_REQUEST',
  LOAD_ANALYSIS_SUCCESS = 'analysis/LOAD_ANALYSIS_SUCCESS',
  LOAD_ANALYSIS_FAILED = 'analysis/LOAD_ANALYSIS_FAILED',
  CHANGE_LOADING_STATUS = 'analysis/CHANGE_LOADING_STATUS',
  CLEAR_CORESET_DRAFT = 'analysis/CLEAR_CORESET_DRAFT',
  CLEAR_CORESET = 'analysis/CLEAR_CORESET',
  UPDATE_NEUROPSICHOLOGICAL_PROFILE_FORM = 'analysis/UPDATE_NEUROPSICHOLOGICAL_PROFILE_FORM',
  UPDATE_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO = 'analysis/UPDATE_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO',
  UPDATE_NEUROPSICHOLOGICAL_PROFILE_MEDICATION = 'analysis/UPDATE_NEUROPSICHOLOGICAL_PROFILE_MEDICATION',
  REMOVE_NEUROPSICHOLOGICAL_PROFILE_MEDICATION = 'analysis/REMOVE_NEUROPSICHOLOGICAL_PROFILE_MEDICATION',
  CLEAR_NEUROPSICHOLOGICAL_PROFILE_DRAFT = 'analysis/CLEAR_NEUROPSICHOLOGICAL_PROFILE_DRAFT',
  MARK_NEUROPSICHOLOGICAL_PROFILE_PROGRESS = 'analysis/MARK_NEUROPSICHOLOGICAL_PROFILE_PROGRESS',
  SELECT_NEUROPSICHOLOGICAL_PROFILE_PATIENT = 'analysis/SELECT_NEUROPSICHOLOGICAL_PROFILE_PATIENT',
  SELECT_HEALTH_IMPACT_PATIENT = 'analysis/SELECT_HEALTH_IMPACT_PATIENT',
  CLEAR_HEALTH_IMPACT_DRAFT = 'analysis/CLEAR_HEALTH_IMPACT_DRAFT',
  SELECT_HEALTH_IMPACT_SUBJECTS = 'analysis/SELECT_HEALTH_IMPACT_SUBJECTS',
  LOAD_HEALTH_IMPACT_SUBJECT_FORM_REQUEST = 'analysis/LOAD_HEALTH_IMPACT_SUBJECT_FORM_REQUEST',
  LOAD_HEALTH_IMPACT_SUBJECT_FORM_SUCCESS = 'analysis/LOAD_HEALTH_IMPACT_SUBJECT_FORM_SUCCESS',
  LOAD_HEALTH_IMPACT_SUBJECT_FORM_FAILED = 'analysis/LOAD_HEALTH_IMPACT_SUBJECT_FORM_FAILED',
  MARK_HEALTH_IMPACT_PROGRESS = 'analysis/MARK_HEALTH_IMPACT_PROGRESS',
  UPDATE_HEALTH_IMPACT_OPEN_FIELD = 'analysis/UPDATE_HEALTH_IMPACT_OPEN_FIELD',
  UPDATE_HEALTH_IMPACT_FORM_FIELD = 'analysis/UPDATE_HEALTH_IMPACT_FORM_FIELD',
  SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_REQUEST = 'analysis/SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_REQUEST',
  SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_SUCCESS = 'analysis/SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_SUCCESS',
  SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_FAILED = 'analysis/SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_FAILED',
  SAVE_HEALTH_IMPACT_SUBJECTS = 'analysis/SAVE_HEALTH_IMPACT_SUBJECTS',
  SAVE_NEUROPSICHOLOGICAL_PROFILE_REQUEST = 'analysis/SAVE_NEUROPSICHOLOGICAL_PROFILE_REQUEST',
  SAVE_NEUROPSICHOLOGICAL_PROFILE_SUCCESS = 'analysis/SAVE_NEUROPSICHOLOGICAL_PROFILE_SUCCESS',
  SAVE_NEUROPSICHOLOGICAL_PROFILE_FAILED = 'analysis/SAVE_NEUROPSICHOLOGICAL_PROFILE_FAILED',
  CLEAR_PROSPECTIVE_RESULT_MAP_DRAFT = 'analysis/CLEAR_PROSPECTIVE_RESULT_MAP_DRAFT',
  MARK_PROSPECTIVE_RESULT_MAP_PROGRESS = 'analysis/MARK_PROSPECTIVE_RESULT_MAP_PROGRESS',
  SELECT_PROSPECTIVE_RESULT_MAP_PATIENT = 'analysis/SELECT_PROSPECTIVE_RESULT_MAP_PATIENT',
  SELECT_PROSPECTIVE_RESULT_MAP_CORESET = 'analysis/SELECT_PROSPECTIVE_RESULT_MAP_CORESET',
  CLEAR_GLOBAL_PROGNOSTIC_DRAFT = 'analysis/CLEAR_GLOBAL_PROGNOSTIC_DRAFT',
  MARK_GLOBAL_PROGNOSTIC_PROGRESS = 'analysis/MARK_GLOBAL_PROGNOSTIC_PROGRESS',
  SELECT_GLOBAL_PROGNOSTIC_PATIENT = 'analysis/SELECT_GLOBAL_PROGNOSTIC_PATIENT',
  SELECT_GLOBAL_PROGNOSTIC_CORESET = 'analysis/SELECT_GLOBAL_PROGNOSTIC_CORESET',
  SAVE_PROSPECTIVE_RESULT_MAP_REQUEST = 'analysis/SAVE_PROSPECTIVE_RESULT_MAP_REQUEST',
  SAVE_PROSPECTIVE_RESULT_MAP_SUCCESS = 'analysis/SAVE_PROSPECTIVE_RESULT_MAP_SUCCESS',
  SAVE_PROSPECTIVE_RESULT_MAP_FAILED = 'analysis/SAVE_PROSPECTIVE_RESULT_MAP_FAILED',
  SAVE_GLOBAL_PROGNOSTIC_REQUEST = 'analysis/SAVE_GLOBAL_PROGNOSTIC_REQUEST',
  SAVE_GLOBAL_PROGNOSTIC_SUCCESS = 'analysis/SAVE_GLOBAL_PROGNOSTIC_SUCCESS',
  SAVE_GLOBAL_PROGNOSTIC_FAILED = 'analysis/SAVE_GLOBAL_PROGNOSTIC_FAILED',
  LIST_PATIENT_DIAGNOSTICS_REQUEST = 'analysis/LIST_PATIENT_DIAGNOSTICS_REQUEST',
  LIST_PATIENT_DIAGNOSTICS_SUCCESS = 'analysis/LIST_PATIENT_DIAGNOSTICS_SUCCESS',
  LIST_PATIENT_DIAGNOSTICS_FAILED = 'analysis/LIST_PATIENT_DIAGNOSTICS_FAILED',
  GET_DIAGNOSTIC_RESULTS_REQUEST = 'analysis/GET_DIAGNOSTIC_RESULTS_REQUEST',
  GET_DIAGNOSTIC_RESULTS_SUCCESS = 'analysis/GET_DIAGNOSTIC_RESULTS_SUCCESS',
  GET_DIAGNOSTIC_RESULTS_FAILED = 'analysis/GET_DIAGNOSTIC_RESULTS_FAILED',
  CLEAR_FOCUSED_DIAGNOSTIC_RESULTS = 'analysis/CLEAR_FOCUSED_DIAGNOSTIC_RESULTS',
}

export declare namespace ActionPayloads {
  type ChangeLoadingStatus = {
    loadingKey: ValidLoadingKeys;
    newStatus: boolean;
  };

  type LoadAnalysisRequest = {
    query?: Analysis.AnalysisQuery;
  };

  type LoadAnalysisSuccess = {
    analysis: Analysis.AnalysisResponseModel;
    totalAnalysis: number;
    offset: number;
  };

  type LoadAnalysisFailed = {
    message: string;
  };

  type LoadCoreSetReferencesRequest = {
    query?: Analysis.AnalysisQuery;
  };

  type LoadCoreSetReferencesSuccess = {
    coreSetReferences: Analysis.CoreSetReference[];
  };

  type LoadCoreSetRequest = {
    coreSetId: string;
  };

  type LoadCoreSetSuccess = {
    coreSet: Analysis.CoreSet;
  };

  type UpdateFilledCoreSetDraft = {
    patientId?: string;
    coreSetId?: string;
  };

  type AnswerFilledCoreSetDraft = {
    icfId: string;
    code?: string;
    answerId?: string;
    description?: string;
    informationSourceIds?: string[];
  };

  type CreateCoreSet = {
    patientId: string;
    coreSetId: string;
    icfs: Analysis.SavingIcf[];
    onSuccess: (newDiagnosticId: string) => void;
  };

  type UpdateNeuropsichologicalProfileAdditionalInfo = {
    [key in Analysis.NeuropsichologicalAdditionalInfoKeys]?:
      | string
      | number
      | boolean;
  };

  type UpdateNeuropsichologicalProfileMedication = {
    index: number;
    medicationClass: Analysis.NeuropsichologicalMedicationClasses;
    dosage?: string;
  };

  type RemoveNeuropsichologicalProfileMedication = {
    index: number;
  };

  type UpdateNeuropsichologicalProfileForm = {
    category: string;
    subcategory: string;
    question: string;
    qualifier?: string;
    description?: string;
  };

  type MarkNeuropsichologicalProfileProgress = {
    step: string;
  };

  type SelectNeuropsichologicalProfilePatient = {
    patientId: string;
  };

  type SelectHealthImpactPatient = {
    patientId: string;
  };

  type SelectHealthImpactSubjects = {
    subjects: Array<ValidHealthImpactSubjects>;
  };

  type LoadHealthImpactSubjectFormRequest = {
    subject: ValidHealthImpactSubjects;
    formId: string;
  };

  type LoadHealthImpactSubjectFormSuccess = {
    subject: ValidHealthImpactSubjects;
    form: Analysis.ResearchForm;
  };

  type SaveHealthImpactSubjects = {
    patientId: string;
    subjects: Analysis.RepliesRequestParams[];
    onSaveAll: () => void;
  };

  type SaveHealthImpactSubjectRepliesRequest = {
    patientId: string;
  } & Analysis.RepliesRequestParams;

  type MarkHealthImpactProgress = {
    step: string;
    state: boolean;
  };

  type UpdateHealthImpactOpenField = {
    subject: ValidHealthImpactSubjects;
    key: string;
    value: string;
  };

  type UpdateHealthImpactFormField = {
    subject: ValidHealthImpactSubjectsWithForm;
    questionId: string;
    answerId: string;
  };

  type SaveNeuropsichologicalProfileRequest = {
    patientId: string;
    form: Analysis.NeuropsichologicalProfileForm;
    additionalInformation: Analysis.NeuropsichologicalProfileAdditionalInfo;
    onSuccess: () => void;
  };

  type MarkProspectiveResultMapProgress = {
    step: string;
  };

  type SelectProspectiveResultMapPatient = {
    patientId: string;
  };

  type MarkGlobalPrognosticProgress = {
    step: string;
  };

  type SelectGlobalPrognosticPatient = {
    patientId: string;
  };

  type SaveProspectiveResultMapRequest = {
    patientId: string;
    coreSetId: string;
    diagnosticId: string;
    onSuccess: (newDiagnosticId: string) => void;
  };

  type SaveGlobalPrognosticRequest = {
    patientId: string;
    coreSetId: string;
    diagnosticId: string;
    onSuccess: (newDiagnosticId: string) => void;
  };

  type ListPatientDiagnosticsRequest = {
    patientId: string;
    diagnosticType?: string;
  };

  type ListPatientDiagnosticsSuccess = {
    diagnostics: Analysis.AnalysisResponseModel;
  };

  type GetDiagnosticResultsRequest = {
    patientId: string;
    coreSetId: string;
    diagnosticId: string;
    query?: Analysis.AnalysisQuery;
  };

  type GetDiagnosticResultsSuccess = {
    coreSet: Analysis.CoreSetResult[];
  };

  type SelectProspectiveResultMapCoreSet = {
    coreSetId: string;
    diagnosticId: string;
  };

  type SelectGlobalPrognosticCoreSet = {
    coreSetId: string;
    diagnosticId: string;
  };
}

export declare namespace Actions {
  type LoadAnalysisRequest = {
    type: ActionTypes.LOAD_ANALYSIS_REQUEST;
    payload: ActionPayloads.LoadAnalysisRequest;
  };

  type ChangeLoadingStatus = {
    type: ActionTypes.CHANGE_LOADING_STATUS;
    payload: ActionPayloads.ChangeLoadingStatus;
  };

  type LoadAnalysisSuccess = {
    type: ActionTypes.LOAD_ANALYSIS_SUCCESS;
    payload: ActionPayloads.LoadAnalysisSuccess;
  };

  type LoadAnalysisFailed = {
    type: ActionTypes.LOAD_ANALYSIS_FAILED;
    payload: ActionPayloads.LoadAnalysisFailed;
  };

  type LoadCoreSetReferencesRequest = {
    type: ActionTypes.LOAD_CORESET_REFERENCES_REQUEST;
    payload: ActionPayloads.LoadCoreSetReferencesRequest;
  };

  type LoadCoreSetReferencesSuccess = {
    type: ActionTypes.LOAD_CORESET_REFERENCES_SUCCESS;
    payload: ActionPayloads.LoadCoreSetReferencesSuccess;
  };

  type LoadCoreSetReferencesFailed = {
    type: ActionTypes.LOAD_CORESET_REFERENCES_FAILED;
    payload: {};
  };
  type LoadCoreSetRequest = {
    type: ActionTypes.LOAD_CORESET_REQUEST;
    payload: ActionPayloads.LoadCoreSetRequest;
  };

  type LoadCoreSetSuccess = {
    type: ActionTypes.LOAD_CORESET_SUCCESS;
    payload: ActionPayloads.LoadCoreSetSuccess;
  };

  type LoadCoreSetFailed = {
    type: ActionTypes.LOAD_CORESET_FAILED;
    payload: {};
  };

  type UpdateFilledCoreSetDraft = {
    type: ActionTypes.UPDATE_FILLED_CORESET_DRAFT;
    payload: ActionPayloads.UpdateFilledCoreSetDraft;
  };

  type AnswerFilledCoreSetDraft = {
    type: ActionTypes.ANSWER_FILLED_CORESET_DRAFT;
    payload: ActionPayloads.AnswerFilledCoreSetDraft;
  };

  type CreateCoreSet = {
    type: ActionTypes.CREATE_CORE_SET;
    payload: ActionPayloads.CreateCoreSet;
  };

  type CreateCoreSetSuccess = {
    type: ActionTypes.CREATE_CORE_SET_SUCCESS;
    payload: {};
  };

  type CreateCoreSetFailed = {
    type: ActionTypes.CREATE_CORE_SET_FAILED;
    payload: {};
  };

  type ClearCoreSetDraft = {
    type: ActionTypes.CLEAR_CORESET_DRAFT;
    payload: {};
  };

  type ClearCoreSet = {
    type: ActionTypes.CLEAR_CORESET;
    payload: {};
  };

  type UpdateNeuropsichologicalProfileAdditionalInfo = {
    type: ActionTypes.UPDATE_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO;
    payload: ActionPayloads.UpdateNeuropsichologicalProfileAdditionalInfo;
  };

  type UpdateNeuropsichologicalProfileMedication = {
    type: ActionTypes.UPDATE_NEUROPSICHOLOGICAL_PROFILE_MEDICATION;
    payload: ActionPayloads.UpdateNeuropsichologicalProfileMedication;
  };

  type RemoveNeuropsichologicalProfileMedication = {
    type: ActionTypes.REMOVE_NEUROPSICHOLOGICAL_PROFILE_MEDICATION;
    payload: ActionPayloads.RemoveNeuropsichologicalProfileMedication;
  };

  type ClearNeuropsichologicalProfileDraft = {
    type: ActionTypes.CLEAR_NEUROPSICHOLOGICAL_PROFILE_DRAFT;
    payload: {};
  };

  type UpdateNeuropsichologicalProfileForm = {
    type: ActionTypes.UPDATE_NEUROPSICHOLOGICAL_PROFILE_FORM;
    payload: ActionPayloads.UpdateNeuropsichologicalProfileForm;
  };

  type MarkNeuropsichologicalProfileProgress = {
    type: ActionTypes.MARK_NEUROPSICHOLOGICAL_PROFILE_PROGRESS;
    payload: ActionPayloads.MarkNeuropsichologicalProfileProgress;
  };

  type SelectNeuropsichologicalProfilePatient = {
    type: ActionTypes.SELECT_NEUROPSICHOLOGICAL_PROFILE_PATIENT;
    payload: ActionPayloads.SelectNeuropsichologicalProfilePatient;
  };

  type SelectHealthImpactPatient = {
    type: ActionTypes.SELECT_HEALTH_IMPACT_PATIENT;
    payload: ActionPayloads.SelectHealthImpactPatient;
  };

  type ClearHealthImpactDraft = {
    type: ActionTypes.CLEAR_HEALTH_IMPACT_DRAFT;
    payload: {};
  };

  type SelectHealthImpactSubjects = {
    type: ActionTypes.SELECT_HEALTH_IMPACT_SUBJECTS;
    payload: ActionPayloads.SelectHealthImpactSubjects;
  };

  type LoadHealthImpactSubjectFormRequest = {
    type: ActionTypes.LOAD_HEALTH_IMPACT_SUBJECT_FORM_REQUEST;
    payload: ActionPayloads.LoadHealthImpactSubjectFormRequest;
  };

  type LoadHealthImpactSubjectFormSuccess = {
    type: ActionTypes.LOAD_HEALTH_IMPACT_SUBJECT_FORM_SUCCESS;
    payload: ActionPayloads.LoadHealthImpactSubjectFormSuccess;
  };

  type LoadHealthImpactSubjectFormFailed = {
    type: ActionTypes.LOAD_HEALTH_IMPACT_SUBJECT_FORM_FAILED;
    payload: {};
  };

  type SaveHealthImpactSubjects = {
    type: ActionTypes.SAVE_HEALTH_IMPACT_SUBJECTS;
    payload: ActionPayloads.SaveHealthImpactSubjects;
  };

  type SaveHealthImpactSubjectRepliesRequest = {
    type: ActionTypes.SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_REQUEST;
    payload: ActionPayloads.SaveHealthImpactSubjectRepliesRequest;
  };

  type SaveHealthImpactSubjectRepliesSuccess = {
    type: ActionTypes.SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_SUCCESS;
    payload: {};
  };

  type SaveHealthImpactSubjectRepliesFailed = {
    type: ActionTypes.SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_FAILED;
    payload: {};
  };

  type MarkHealthImpactProgress = {
    type: ActionTypes.MARK_HEALTH_IMPACT_PROGRESS;
    payload: ActionPayloads.MarkHealthImpactProgress;
  };

  type UpdateHealthImpactOpenField = {
    type: ActionTypes.UPDATE_HEALTH_IMPACT_OPEN_FIELD;
    payload: ActionPayloads.UpdateHealthImpactOpenField;
  };

  type UpdateHealthImpactFormField = {
    type: ActionTypes.UPDATE_HEALTH_IMPACT_FORM_FIELD;
    payload: ActionPayloads.UpdateHealthImpactFormField;
  };

  type SaveNeuropsichologicalProfileRequest = {
    type: ActionTypes.SAVE_NEUROPSICHOLOGICAL_PROFILE_REQUEST;
    payload: ActionPayloads.SaveNeuropsichologicalProfileRequest;
  };

  type SaveNeuropsichologicalProfileSuccess = {
    type: ActionTypes.SAVE_NEUROPSICHOLOGICAL_PROFILE_SUCCESS;
    payload: {};
  };

  type SaveNeuropsichologicalProfileFailed = {
    type: ActionTypes.SAVE_NEUROPSICHOLOGICAL_PROFILE_FAILED;
    payload: {};
  };

  type ClearProspectiveResultMapDraft = {
    type: ActionTypes.CLEAR_PROSPECTIVE_RESULT_MAP_DRAFT;
    payload: {};
  };

  type MarkProspectiveResultMapProgress = {
    type: ActionTypes.MARK_PROSPECTIVE_RESULT_MAP_PROGRESS;
    payload: ActionPayloads.MarkProspectiveResultMapProgress;
  };

  type SelectProspectiveResultMapPatient = {
    type: ActionTypes.SELECT_PROSPECTIVE_RESULT_MAP_PATIENT;
    payload: ActionPayloads.SelectProspectiveResultMapPatient;
  };

  type ClearGlobalPrognosticDraft = {
    type: ActionTypes.CLEAR_GLOBAL_PROGNOSTIC_DRAFT;
    payload: {};
  };

  type MarkGlobalPrognosticProgress = {
    type: ActionTypes.MARK_GLOBAL_PROGNOSTIC_PROGRESS;
    payload: ActionPayloads.MarkGlobalPrognosticProgress;
  };

  type SelectGlobalPrognosticPatient = {
    type: ActionTypes.SELECT_GLOBAL_PROGNOSTIC_PATIENT;
    payload: ActionPayloads.SelectGlobalPrognosticPatient;
  };

  type SaveProspectiveResultMapRequest = {
    type: ActionTypes.SAVE_PROSPECTIVE_RESULT_MAP_REQUEST;
    payload: ActionPayloads.SaveProspectiveResultMapRequest;
  };

  type SaveProspectiveResultMapSuccess = {
    type: ActionTypes.SAVE_PROSPECTIVE_RESULT_MAP_SUCCESS;
    payload: {};
  };

  type SaveProspectiveResultMapFailed = {
    type: ActionTypes.SAVE_PROSPECTIVE_RESULT_MAP_FAILED;
    payload: {};
  };

  type SaveGlobalPrognosticRequest = {
    type: ActionTypes.SAVE_GLOBAL_PROGNOSTIC_REQUEST;
    payload: ActionPayloads.SaveGlobalPrognosticRequest;
  };

  type SaveGlobalPrognosticSuccess = {
    type: ActionTypes.SAVE_GLOBAL_PROGNOSTIC_SUCCESS;
    payload: {};
  };

  type SaveGlobalPrognosticFailed = {
    type: ActionTypes.SAVE_GLOBAL_PROGNOSTIC_FAILED;
    payload: {};
  };

  type ListPatientDiagnosticsRequest = {
    type: ActionTypes.LIST_PATIENT_DIAGNOSTICS_REQUEST;
    payload: ActionPayloads.ListPatientDiagnosticsRequest;
  };

  type ListPatientDiagnosticsSuccess = {
    type: ActionTypes.LIST_PATIENT_DIAGNOSTICS_SUCCESS;
    payload: ActionPayloads.ListPatientDiagnosticsSuccess;
  };

  type ListPatientDiagnosticsFailed = {
    type: ActionTypes.LIST_PATIENT_DIAGNOSTICS_FAILED;
    payload: {};
  };

  type GetDiagnosticResultsRequest = {
    type: ActionTypes.GET_DIAGNOSTIC_RESULTS_REQUEST;
    payload: ActionPayloads.GetDiagnosticResultsRequest;
  };

  type GetDiagnosticResultsSuccess = {
    type: ActionTypes.GET_DIAGNOSTIC_RESULTS_SUCCESS;
    payload: ActionPayloads.GetDiagnosticResultsSuccess;
  };

  type GetDiagnosticResultsFailed = {
    type: ActionTypes.GET_DIAGNOSTIC_RESULTS_FAILED;
    payload: {};
  };

  type SelectProspectiveResultMapCoreSet = {
    type: ActionTypes.SELECT_PROSPECTIVE_RESULT_MAP_CORESET;
    payload: ActionPayloads.SelectProspectiveResultMapCoreSet;
  };

  type SelectGlobalPrognosticCoreSet = {
    type: ActionTypes.SELECT_GLOBAL_PROGNOSTIC_CORESET;
    payload: ActionPayloads.SelectGlobalPrognosticCoreSet;
  };

  type ClearFocusedDiagnosticResults = {
    type: ActionTypes.CLEAR_FOCUSED_DIAGNOSTIC_RESULTS;
    payload: {};
  };
}

export enum ValidLoadingKeys {
  Analysis = 'loadingKey/ANALYSIS',
  SaveNeuropsichologicalProfile = 'loadingKey/SAVE_NEUROPSICHOLOGICAL_PROFILE',
  SaveProspectiveResultMap = 'loadingKey/SAVE_PROSPECTIVE_RESULT_MAP',
  SaveGlobalPrognostic = 'loadingKey/SAVE_GLOBAL_PROGNOSTIC',
  SaveCoreSet = 'loadingKey/SAVE_CORESET',
  SaveHealhImpactResearchForm = 'loading/SAVE_HEALTH_IMPACT_RESEARCH_FORM',
  ListPatientDiagnostics = 'loadingKey/LIST_PATIENT_DIAGNOSTICS',
  GetDiagnosticResults = 'loadingKey/GET_DIAGNOSTIC_RESULTS',
  HealthImpactResearchForm = 'loadingKey/HEALTH_IMPACT_RESEARCH_FORM',
  SaveHealthImpactReplies = 'loadingKey/SAVE_HEALTH_IMPACT_REPLIES',
}

export enum ValidHealthImpactDescriptionOnlySubjects {
  Stigma = 'stigma',
  Personality = 'personality',
  OccupationalHistory = 'occupationalHistory',
  NegativeBeliefs = 'negativeBeliefs',
  FamilyRelations = 'familyRelations',
}

export enum ValidHealthImpactSubjectsWithForm {
  Coping = 'coping',
  Anxiety = 'anxiety',
  Humour = 'humour',
  LifeQuality = 'lifeQuality',
  SleepQuality = 'sleepQuality',
}

export type ValidHealthImpactSubjects =
  | ValidHealthImpactDescriptionOnlySubjects
  | ValidHealthImpactSubjectsWithForm;

export declare namespace Analysis {
  type AnswerOption = {
    id: string;
    code: string;
    name: string;
    qualifier: string;
    description: string;
  };

  type InformationSource = {
    id: string;
    description: string;
  };

  type ICF = {
    id: string;
    code: string;
    description: string;
    category: string;
    information: string;
    name: string;
    answers: AnswerOption[];
    informationSources: InformationSource[];
  };

  type RawCoreSet = {
    id: string;
    code: string;
    description: string;
    icFs: ICF[];
  };

  type CoreSet = {
    id: string;
    code: string;
    description: string;
    icFs: {
      [key: string]: ICF[];
    };
  };

  type CoreSetReference = {
    id: string;
    code: string;
    description: string;
    planId: string;
  };

  type AnalysisQuery = {
    filter?: string;
    offset?: number;
    limit?: number;
    score?: string;
  };

  type Analysis = {
    id: string;
    code: string;
    diagnosticType: string;
    diagnosticUri: string | null;
    coreSet: {
      id: string;
      description: string;
    };
    patient: {
      id: string;
      name: string;
    };
    created: string;
  };

  type AnalysisResponseModel = Analysis[];

  type AnsweredIcf = {
    answers: { [key: string]: string };
    description: string;
    informationSourceIds?: string[];
  };

  type FilledCoreSetDraft = {
    patientId: string;
    coreSetId?: string;
    icfs: {
      [key: string]: AnsweredIcf;
    };
  };

  type SavingIcf = {
    id: string;
    description: string;
    answers: { id: string }[];
    informationSources: { id: string }[];
  };

  type NeuropsichologicalProfileUniversalFunctionsMemoryQuestions =
    | 'codification'
    | 'storage'
    | 'evocation';

  type NeuropsichologicalProfileUniversalFunctionsAttentionQuestions =
    | 'sustained'
    | 'focused'
    | 'divided'
    | 'alternated'
    | 'general';

  type NeuropsichologicalProfileExecutiveFunctionsQuestions =
    | 'planning'
    | 'implementation'
    | 'correction'
    | 'flexibility'
    | 'impulsiveness'
    | 'operationalMemory';

  type NeuropsichologicalProfileCognitiveFunctionsLanguageQuestions =
    | 'expression'
    | 'comprehension';

  type NeuropsichologicalProfileCognitiveFunctionsNumericCognitionQuestions =
    | 'calculation'
    | 'numericProcessing';

  type NeuropsichologicalProfileCognitiveFunctionsSocialSkillsQuestions =
    | 'socialSkill'
    | 'praxis'
    | 'motorPraxis'
    | 'ideationalPraxis';

  type NeuropsichologicalProfileCognitiveFunctionsMotorSkillsQuestions =
    | 'rough'
    | 'soft';

  type NeuropsichologicalAdditionalInfoKeys =
    | 'diagnosisAge'
    | 'evolutionTime'
    | 'familyHistory'
    | 'moodSwingEpisodes'
    | 'selfTerminationAttempts'
    | 'drugUsage'
    | 'drugFrequency'
    | 'drugAmount'
    | 'drugUsageTime'
    | 'psychiatricHospitalizations'
    | 'ectOccurrences'
    | 'mainComplaints';

  type NeuropsichologicalMedicationClasses =
    | 'antidepressants'
    | 'moodStabilizers'
    | 'antipsychotics'
    | 'psychostimulants'
    | 'benzodiazepines';

  type NeuropsichologicalProfileFormSubcategories =
    | 'intelectualOperation'
    | 'memoryVerbal'
    | 'memoryNonVerbal'
    | 'attention'
    | 'executiveFunctions'
    | 'language'
    | 'numericCognition'
    | 'socialSkills'
    | 'motorSkills';

  type NeuropsichologicalProfileFormQuestions =
    | NeuropsichologicalProfileUniversalFunctionsMemoryQuestions
    | NeuropsichologicalProfileUniversalFunctionsAttentionQuestions
    | NeuropsichologicalProfileExecutiveFunctionsQuestions
    | NeuropsichologicalProfileCognitiveFunctionsLanguageQuestions
    | NeuropsichologicalProfileCognitiveFunctionsNumericCognitionQuestions
    | NeuropsichologicalProfileCognitiveFunctionsSocialSkillsQuestions
    | NeuropsichologicalProfileCognitiveFunctionsMotorSkillsQuestions
    | NeuropsichologicalAdditionalInfoKeys
    | NeuropsichologicalMedicationClasses;

  type NeuropsichologicalProfileFormAnswer = {
    qualifier: '1' | '2' | '3' | '4' | '0';
    description: '';
  };

  type NeuropsichologicalProfileForm = {
    intelectualOperation: {
      intelectualOperation: {
        intelectualOperation: NeuropsichologicalProfileFormAnswer;
      };
    };
    universalFunctions: {
      memoryVerbal: {
        [key in NeuropsichologicalProfileUniversalFunctionsMemoryQuestions]: NeuropsichologicalProfileFormAnswer;
      };
      memoryNonVerbal: {
        [key in NeuropsichologicalProfileUniversalFunctionsMemoryQuestions]: NeuropsichologicalProfileFormAnswer;
      };
      attention: {
        [key in NeuropsichologicalProfileUniversalFunctionsAttentionQuestions]: NeuropsichologicalProfileFormAnswer;
      };
    };
    executiveFunctions: {
      executiveFunctions: {
        [key in NeuropsichologicalProfileExecutiveFunctionsQuestions]: NeuropsichologicalProfileFormAnswer;
      };
    };
    cognitiveFunctions: {
      language: {
        [key in NeuropsichologicalProfileCognitiveFunctionsLanguageQuestions]: NeuropsichologicalProfileFormAnswer;
      };
      numericCognition: {
        [key in NeuropsichologicalProfileCognitiveFunctionsNumericCognitionQuestions]: NeuropsichologicalProfileFormAnswer;
      };
      socialSkills: {
        [key in NeuropsichologicalProfileCognitiveFunctionsSocialSkillsQuestions]: NeuropsichologicalProfileFormAnswer;
      };
      motorSkills: {
        [key in NeuropsichologicalProfileCognitiveFunctionsMotorSkillsQuestions]: NeuropsichologicalProfileFormAnswer;
      };
    };
  };

  type NeuropsichologicalProfileAdditionalInfo = {
    medication: {
      medicationClass: NeuropsichologicalMedicationClasses;
      dosage: string;
    }[];
    diagnosisAge: string;
    evolutionTime: string;
    familyHistory: string;
    moodSwingEpisodes: string;
    selfTerminationAttempts: number;
    drugUsage: boolean;
    drugFrequency: string;
    drugAmount: string;
    drugUsageTime: string;
    psychiatricHospitalizations: number;
    ectOccurrences: number;
    mainComplaints: string;
  };

  type ResearchFormQuestion = {
    id: string;
    code: string;
    title: string;
    description: string;
    items: [
      {
        id: string;
        name: string;
        description: string;
      }
    ];
  };

  type ResearchForm = {
    id: string;
    researchFormType: string;
    title: string;
    description: string;
    questions: ResearchFormQuestion[];
  };

  type HealthImpactSubjects = {
    [ValidHealthImpactDescriptionOnlySubjects.Stigma]?: {
      description: string;
    };
    [ValidHealthImpactDescriptionOnlySubjects.Personality]?: {
      description: string;
    };
    [ValidHealthImpactDescriptionOnlySubjects.NegativeBeliefs]?: {
      description: string;
    };
    [ValidHealthImpactDescriptionOnlySubjects.FamilyRelations]?: {
      family: string;
      ambient: string;
      context: string;
    };
    [ValidHealthImpactDescriptionOnlySubjects.OccupationalHistory]?: {
      work: string;
      leisure: string;
      ambient: string;
      others: string;
    };
  } & {
    [key in ValidHealthImpactSubjectsWithForm]?: {
      description: string;
      form: {
        questions?: ResearchForm;
        answers: {
          [key: string]: string;
        };
      };
    };
  };

  type Icf = {
    id: string;
    code: string;
    category: string;
    name: string;
    description: string;
    problemDescription: string;
    answers: Array<{
      id: string;
      code: string;
      name: string;
      description: string;
      qualifier: number;
    }>;
    informationSources: Array<{
      id: string;
      description: string;
    }>;
  };

  type SaveReportResponse = {
    id: string;
    code: string;
    diagnosticUri: string | null;
  };

  type CoreSetResult = {
    id: string;
    code: string;
    description: string;
    created: string;
    diagnosticDate: string;
    icfs: Icf[];
  };

  type RepliesRequestParams = {
    notesF?: string;
    notesL?: string;
    questions: { notesQ: string; questionId?: string }[];
  };

  type ReducerState = {
    [ValidLoadingKeys.Analysis]: boolean;
    [ValidLoadingKeys.SaveCoreSet]: boolean;
    [ValidLoadingKeys.SaveNeuropsichologicalProfile]: boolean;
    [ValidLoadingKeys.SaveProspectiveResultMap]: boolean;
    [ValidLoadingKeys.SaveGlobalPrognostic]: boolean;
    [ValidLoadingKeys.SaveHealhImpactResearchForm]: boolean;
    [ValidLoadingKeys.ListPatientDiagnostics]: boolean;
    [ValidLoadingKeys.GetDiagnosticResults]: boolean;
    [ValidLoadingKeys.HealthImpactResearchForm]: boolean;
    didHealthImpactSubjectResearchFormError: boolean;
    isFocusedDiagnosticResultsLoading: boolean;
    didFocusedDiagnosticResultsError: boolean;
    didCoreSetReferencesError: boolean;
    didCoreSetError: boolean;
    isCoreSetReferencesLoading: boolean;
    isCoreSetLoading: boolean;
    coreSetReferences: CoreSetReference[] | null;
    coreSet: CoreSet | null;
    draft: FilledCoreSetDraft | null;
    totalAnalysis: number;
    analysis: AnalysisResponseModel | null;
    didAnalysisError: string | null;
    pagination: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
    focusedPatientDiagnostics: AnalysisResponseModel | null;
    focusedDiagnosticResults: CoreSetResult | null;
    prospectiveResultMap: {
      draft: {
        progress: {
          patient: boolean;
          map: boolean;
          finish: boolean;
        };
        patientId: string | null;
        coreSetId: string | null;
        diagnosticId: string | null;
      };
    };
    globalPrognostic: {
      draft: {
        progress: {
          patient: boolean;
          weaknessAndStrengths: boolean;
          finish: boolean;
        };
        patientId: string | null;
        coreSetId: string | null;
        diagnosticId: string | null;
      };
    };
    neuropsichologicalProfile: {
      draft: {
        progress: {
          patient: boolean;
          intelectualOperation: boolean;
          universalFunctions: boolean;
          executiveFunctions: boolean;
          cognitiveFunctions: boolean;
          additionalInformation: boolean;
          finish: boolean;
        };
        patientId: string | null;
        form: NeuropsichologicalProfileForm;
        additionalInformation: NeuropsichologicalProfileAdditionalInfo;
      };
    };
    healthImpact: {
      draft: {
        progress: {
          patient: boolean;
          subjects: boolean;
          finish: boolean;
        };
        patientId: string | null;
        subjects: HealthImpactSubjects;
      };
    };
  };
}
