export enum ActionTypes {
  CHANGE_LOADING_STATUS = 'patients/CHANGE_LOADING_STATUS',
  LOAD_PATIENTS_REQUEST = 'patients/LOAD_PATIENTS_REQUEST',
  LOAD_PATIENTS_SUCCESS = 'patients/LOAD_PATIENTS_SUCCESS',
  LOAD_PATIENTS_FAILED = 'patients/LOAD_PATIENTS_FAILED',
  LOOKUP_PATIENT_ZIPCODE_REQUEST = 'patients/LOOKUP_PATIENT_ZIPCODE_REQUEST',
  LOOKUP_PATIENT_ZIPCODE_SUCCESS = 'patients/LOOKUP_PATIENT_ZIPCODE_SUCCESS',
  LOOKUP_PATIENT_ZIPCODE_FAILED = 'patients/LOOKUP_PATENT_ZIPCODE_FAILED',
  CREATE_PATIENT_REQUEST = 'patients/CREATE_PATIENT_REQUEST',
  CREATE_PATIENT_SUCCESS = 'patients/CREATE_PATIENT_SUCCESS',
  CREATE_PATIENT_FAILED = 'patients/CREATE_PATIENT_FAILED',
  LOAD_PATIENT_REQUEST = 'patients/LOAD_PATIENT_REQUEST',
  LOAD_PATIENT_SUCCESS = 'patients/LOAD_PATIENT_SUCCESS',
  LOAD_PATIENT_FAILED = 'patients/LOAD_PATIENT_FAILED',
  EDIT_PATIENT_REQUEST = 'patients/EDIT_PATIENT_REQUEST',
  EDIT_PATIENT_SUCCESS = 'patients/EDIT_PATIENT_SUCCESS',
  EDIT_PATIENT_FAILED = 'patients/EDIT_PATIENT_FAILED',
  CLEAR_FOCUSED_PATIENT = 'patients/CLEAR_FOCUSED_PATIENT',
  LOAD_ICD_REQUEST = 'patients/LOAD_ICD_REQUEST',
  LOAD_ICD_SUCCESS = 'patients/LOAD_ICD_SUCCESS',
  LOAD_ICD_FAILED = 'patients/LOAD_ICD_FAILED',
  ANSWER_SOCIAL_ECONOMIC_QUESTION = 'patients/ANSWER_SOCIAL_ECONOMIC_QUESTION',
  UPDATE_SOCIAL_ECONOMIC_LEVEL = 'patients/UPDATE_SOCIAL_ECONOMIC_LEVEL',
  UPDATE_VALIDATION_TEXT = 'patients/UPDATE_VALIDATION_TEXT',
}

export declare namespace ActionPayloads {
  type ChangeLoadingStatus = {
    loadingKey: ValidLoadingKeys;
    newStatus: boolean;
  };

  type LoadPatientsRequest = {
    query?: Patients.PatientsQuery;
  };

  type LoadPatientsSuccess = {
    patientsList: Patients.PatientsResponseModel;
    totalPatients: number;
    offset: number;
  };

  type LoadPatientsFailed = {
    message: string;
  };

  type LookupPatientZipcodeRequest = {
    zipcode: string;
  };

  type LookupPatientZipcodeSuccess = {
    zipcodeLookupResult: Patients.ZipCodeLookupResult;
  };

  type LookupPatientZipcodeFailed = {
    zipcodeLookupError?: Patients.ZipCodeLookupError;
  };

  type CreatePatientRequest = {
    patientRecord: Patients.PatientRecordPersonalInformation;
    onFinish: (patientId: string) => void;
  };

  type CreatePatientSuccess = {
    patientId: string;
  };

  type LoadPatientRequest = {
    patientId: string;
  };

  type LoadPatientSuccess = {
    patientRecord: Patients.PatientRecord;
  };

  type EditPatientRequest = {
    patientId: string;
    patientRecord:
      | Patients.PatientRecordPersonalInformation
      | Patients.PatientRecordClinicalInformation;
    onFinish: (patientId: string) => void;
  };

  type EditPatientSuccess = {
    patientRecord:
      | Patients.PatientRecordPersonalInformation
      | Patients.PatientRecordClinicalInformation;
  };

  type LoadIcdRequest = {
    query: {
      filter?: string;
      limit?: number;
      offset?: number;
    };
  };

  type LoadIcdSuccess = {
    icdRecords: Patients.IcdRecord[];
    totalCount: number;
    currentOffset: number;
    searchText: string;
  };

  type UpdateSocialEconomicLevel = {
    newSocialEconomicLevel: Patients.SocialEconomicLevels;
  };

  type AnswerSocialEconomicQuestion = {
    educationLevel?: Patients.EducationLevelAnswers;
    asset?: {
      key: Patients.AssetValidKeys;
      value: Patients.AssetValidAnswers;
    };
    publicService?: {
      key: Patients.PublicServiceValidKeys;
      value: Patients.PublicServiceAnswers;
    };
  };

  type UpdateValidationText = {
    formFieldName: ValidFormFieldNames;
    newText: string;
  };
}

export declare namespace Actions {
  type LoadPatientsRequest = {
    type: ActionTypes.LOAD_PATIENTS_REQUEST;
    payload: ActionPayloads.LoadPatientsRequest;
  };

  type ChangeLoadingStatus = {
    type: ActionTypes.CHANGE_LOADING_STATUS;
    payload: ActionPayloads.ChangeLoadingStatus;
  };

  type LoadPatientsSuccess = {
    type: ActionTypes.LOAD_PATIENTS_SUCCESS;
    payload: ActionPayloads.LoadPatientsSuccess;
  };

  type LoadPatientsFailed = {
    type: ActionTypes.LOAD_PATIENTS_FAILED;
    payload: ActionPayloads.LoadPatientsFailed;
  };

  type LookupPatientZipcodeRequest = {
    type: ActionTypes.LOOKUP_PATIENT_ZIPCODE_REQUEST;
    payload: ActionPayloads.LookupPatientZipcodeRequest;
  };

  type LookupPatientZipcodeSuccess = {
    type: ActionTypes.LOOKUP_PATIENT_ZIPCODE_SUCCESS;
    payload: ActionPayloads.LookupPatientZipcodeSuccess;
  };

  type LookupPatientZipcodeFailed = {
    type: ActionTypes.LOOKUP_PATIENT_ZIPCODE_FAILED;
    payload: ActionPayloads.LookupPatientZipcodeFailed;
  };

  type CreatePatientRequest = {
    type: ActionTypes.CREATE_PATIENT_REQUEST;
    payload: ActionPayloads.CreatePatientRequest;
  };

  type CreatePatientSuccess = {
    type: ActionTypes.CREATE_PATIENT_SUCCESS;
    payload: ActionPayloads.CreatePatientSuccess;
  };

  type CreatePatientFailed = {
    type: ActionTypes.CREATE_PATIENT_FAILED;
    payload: {};
  };

  type LoadPatientRequest = {
    type: ActionTypes.LOAD_PATIENT_REQUEST;
    payload: ActionPayloads.LoadPatientRequest;
  };

  type LoadPatientSuccess = {
    type: ActionTypes.LOAD_PATIENT_SUCCESS;
    payload: ActionPayloads.LoadPatientSuccess;
  };

  type LoadPatientFailed = {
    type: ActionTypes.LOAD_PATIENT_FAILED;
    payload: {};
  };

  type ClearFocusedPatient = {
    type: ActionTypes.CLEAR_FOCUSED_PATIENT;
    payload: {};
  };

  type EditPatientRequest = {
    type: ActionTypes.EDIT_PATIENT_REQUEST;
    payload: ActionPayloads.EditPatientRequest;
  };

  type EditPatientSuccess = {
    type: ActionTypes.EDIT_PATIENT_SUCCESS;
    payload: ActionPayloads.EditPatientSuccess;
  };

  type EditPatientFailed = {
    type: ActionTypes.EDIT_PATIENT_FAILED;
    payload: {};
  };

  type LoadIcdRequest = {
    type: ActionTypes.LOAD_ICD_REQUEST;
    payload: ActionPayloads.LoadIcdRequest;
  };

  type LoadIcdSuccess = {
    type: ActionTypes.LOAD_ICD_SUCCESS;
    payload: ActionPayloads.LoadIcdSuccess;
  };

  type LoadIcdFailed = {
    type: ActionTypes.LOAD_ICD_FAILED;
    payload: {};
  };

  type UpdateSocialEconomicLevel = {
    type: ActionTypes.UPDATE_SOCIAL_ECONOMIC_LEVEL;
    payload: ActionPayloads.UpdateSocialEconomicLevel;
  };

  type AnswerSocialEconomicQuestion = {
    type: ActionTypes.ANSWER_SOCIAL_ECONOMIC_QUESTION;
    payload: ActionPayloads.AnswerSocialEconomicQuestion;
  };

  type UpdateValidationText = {
    type: ActionTypes.UPDATE_VALIDATION_TEXT;
    payload: ActionPayloads.UpdateValidationText;
  };
}

export enum ValidLoadingKeys {
  PatientsList = 'loadingKey/PATIENTS_LIST',
  PatientById = 'loadingKey/PATIENT_BY_ID',
  PatientWrite = 'loadingKey/PATIENT_WRITE',
  ZipcodeLookup = 'loadingKey/ZIPCODE_LOOKUP',
  IcdReferences = 'loadingKey/ICD_REFERENCES',
}

export enum ValidFormFieldNames {
  FullName = 'full-name',
  IdDocumentType = 'id-document-type',
  IdDocumentNumber = 'id-document-number',
  EducationLevel = 'education-level',
  Profession = 'profession',
  Gender = 'gender',
  MaritalStatus = 'marital-status',
  Email = 'email',
  PhoneNumber = 'phone-number',
  Zipcode = 'zipcode',
  Address = 'address',
  City = 'city',
  State = 'state-or-province',
  Country = 'country',
  BirthDate = 'birthdate',
  SocialEconomicLevel = 'social-economic-level',
}

export declare namespace Patients {
  type Patient = {
    id: string;
    userId: string;
    name: string;
    created: string;
    goals: number;
    goalsInProgress: number;
    diagnostics: number;
  };

  type PatientsResponseModel = Patient[];

  type PatientCreationResponseModel = { id: string };

  type ZipCodeLookupResult = {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
  };

  type ZipCodeLookupError = {
    name: string;
    message: string;
    type: string;
    errors: Array<{
      name: string;
      message: string;
      service: string;
    }>;
  };

  type PatientRecordPersonalInformation = {
    name: string;
    documentType: string;
    document: string;
    birthdate: string | null;
    gender: number;
    education: string;
    occupation: string;
    phone: string;
    email: string;
    maritalStatus: string;
    postalCode: string;
    street: string;
    city: string;
    state: string;
    country: string;
    economicClassification: Patients.SocialEconomicLevels | null;
  };

  type PatientRecordClinicalInformation = {
    manualPreference: number;
    icdCodes: { id: string }[];
    diagnostic: string | null;
    startOccurrence: string | null;
    startOccurrenceInformed: boolean;
    caseHistory: string | null;
    hospitalizations: number;
    physicalActivity: boolean;
    familyHistory: string | null;
    additionalInformation: string | null;
    cognitiveDeficitComplaints: string | null;
    performanceCapacityComplaints: string | null;
  };

  type PatientRecord = PatientRecordPersonalInformation &
    PatientRecordClinicalInformation & { id: string | null };

  type IcdRecord = {
    id: string;
    description: string;
    label: string;
  };

  type PatientsQuery = {
    filter?: string;
    offset?: number;
    limit?: number;
  };

  type SocialEconomicLevels = 'A' | 'B1' | 'B2' | 'C1' | 'C2' | 'DE';

  type AssetValidAnswers = '0' | '1' | '2' | '3' | '4+';
  type AssetValidKeys =
    | 'bathrooms'
    | 'housekeepers'
    | 'cars'
    | 'computers'
    | 'dishwashers'
    | 'washingMachine'
    | 'fridges'
    | 'freezer'
    | 'dvd'
    | 'microwave'
    | 'motorcycle'
    | 'clothesDryer';
  type EducationLevelAnswers =
    | 'illiterateOrMiddleSchoolOneIncomplete'
    | 'middleSchoolTwoIncomplete'
    | 'highSchoolIncomplete'
    | 'bachelorsIncomplete'
    | 'bachelorsComplete';
  type PublicServiceValidKeys = 'pipedWater' | 'pavedStreets';
  type PublicServiceAnswers = 'yes' | 'no';

  type SocialEconomicAnswers = {
    educationLevel: EducationLevelAnswers | null;
    assets: {
      [key in AssetValidKeys]: AssetValidAnswers | null;
    };
    publicServices: {
      [key in PublicServiceValidKeys]: PublicServiceAnswers | null;
    };
  };

  type ReducerState = {
    totalPatients: number;
    [ValidLoadingKeys.PatientsList]: boolean;
    [ValidLoadingKeys.PatientById]: boolean;
    [ValidLoadingKeys.ZipcodeLookup]: boolean;
    [ValidLoadingKeys.IcdReferences]: boolean;
    [ValidLoadingKeys.PatientWrite]: boolean;
    patientsList: PatientsResponseModel | null;
    focusedPatient: Patients.PatientRecord | null;
    didPatientsError: string | null;
    latestZipcodeLookup: ZipCodeLookupResult | null;
    icdRecords: Patients.IcdRecord[];
    pagination: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
    icdPagination: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      search_text: string;
    };
    socialEconomicAnswers: SocialEconomicAnswers;
    socialEconomicLevel: SocialEconomicLevels | null;
    patientValidationTexts: {
      [key in ValidFormFieldNames]: string;
    };
  };
}
