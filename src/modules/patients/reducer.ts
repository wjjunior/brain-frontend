import {
  PAGINATION_ICDS_PER_PAGE,
  PAGINATION_PATIENTS_PER_PAGE,
} from './constants';
import {
  Actions,
  ActionTypes,
  Patients,
  ValidFormFieldNames,
  ValidLoadingKeys,
} from './types';
import { ActionTypes as AuthActionTypes } from '../auth/types';
import { patientValidationTexts } from './selectors';

const initialState: Patients.ReducerState = {
  totalPatients: 0,
  [ValidLoadingKeys.PatientsList]: false,
  [ValidLoadingKeys.PatientById]: false,
  [ValidLoadingKeys.PatientWrite]: false,
  [ValidLoadingKeys.ZipcodeLookup]: false,
  [ValidLoadingKeys.IcdReferences]: false,
  patientsList: null,
  focusedPatient: null,
  didPatientsError: null,
  latestZipcodeLookup: null,
  icdRecords: [],
  pagination: {
    total: 0,
    per_page: PAGINATION_PATIENTS_PER_PAGE,
    current_page: 1,
    last_page: 1,
  },
  icdPagination: {
    total: 0,
    per_page: PAGINATION_ICDS_PER_PAGE,
    current_page: 1,
    last_page: 1,
    search_text: '',
  },
  socialEconomicLevel: null,
  socialEconomicAnswers: {
    educationLevel: null,
    assets: {
      bathrooms: null,
      housekeepers: null,
      cars: null,
      computers: null,
      dishwashers: null,
      washingMachine: null,
      fridges: null,
      freezer: null,
      dvd: null,
      microwave: null,
      motorcycle: null,
      clothesDryer: null,
    },
    publicServices: {
      pipedWater: null,
      pavedStreets: null,
    },
  },
  patientValidationTexts: {
    [ValidFormFieldNames.FullName]: '',
    [ValidFormFieldNames.IdDocumentType]: '',
    [ValidFormFieldNames.IdDocumentNumber]: '',
    [ValidFormFieldNames.EducationLevel]: '',
    [ValidFormFieldNames.Profession]: '',
    [ValidFormFieldNames.Gender]: '',
    [ValidFormFieldNames.MaritalStatus]: '',
    [ValidFormFieldNames.Email]: '',
    [ValidFormFieldNames.PhoneNumber]: '',
    [ValidFormFieldNames.Zipcode]: '',
    [ValidFormFieldNames.Address]: '',
    [ValidFormFieldNames.City]: '',
    [ValidFormFieldNames.State]: '',
    [ValidFormFieldNames.Country]: '',
    [ValidFormFieldNames.BirthDate]: '',
    [ValidFormFieldNames.SocialEconomicLevel]: '',
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

    case ActionTypes.LOAD_PATIENTS_SUCCESS: {
      const {
        payload: { patientsList, totalPatients, offset },
      } = action as Actions.LoadPatientsSuccess;

      return {
        ...state,
        patientsList,
        totalPatients,
        pagination: {
          ...state.pagination,
          total: totalPatients,
          current_page: offset ? offset + 1 : 1,
          last_page: totalPatients
            ? Math.ceil(totalPatients / state.pagination.per_page)
            : 1,
        },
      };
    }

    case ActionTypes.LOAD_PATIENTS_FAILED: {
      const {
        payload: { message },
      } = action as Actions.LoadPatientsFailed;

      return { ...state, didPatientsError: message };
    }

    case ActionTypes.LOOKUP_PATIENT_ZIPCODE_FAILED:
    case ActionTypes.LOOKUP_PATIENT_ZIPCODE_REQUEST: {
      return { ...state, latestZipcodeLookup: null };
    }

    case ActionTypes.LOOKUP_PATIENT_ZIPCODE_SUCCESS: {
      const {
        payload: { zipcodeLookupResult },
      } = action as Actions.LookupPatientZipcodeSuccess;

      return { ...state, latestZipcodeLookup: zipcodeLookupResult };
    }

    case ActionTypes.LOAD_PATIENT_FAILED:
    case ActionTypes.LOAD_PATIENT_REQUEST:
    case ActionTypes.CLEAR_FOCUSED_PATIENT: {
      const dirtyFields = Object.entries(state.patientValidationTexts)
        .filter(([key, value]) => value)
        .reduce((acc, [key]) => ({ ...acc, [key]: '' }), {});

      return {
        ...state,
        focusedPatient: null,
        socialEconomicLevel: null,
        latestZipcodeLookup: null,
        socialEconomicAnswers: {
          educationLevel: null,
          assets: {
            bathrooms: null,
            housekeepers: null,
            cars: null,
            computers: null,
            dishwashers: null,
            washingMachine: null,
            fridges: null,
            freezer: null,
            dvd: null,
            microwave: null,
            motorcycle: null,
            clothesDryer: null,
          },
          publicServices: {
            pipedWater: null,
            pavedStreets: null,
          },
        },
        patientValidationTexts: { ...patientValidationTexts, ...dirtyFields },
      };
    }

    case ActionTypes.EDIT_PATIENT_SUCCESS:
    case ActionTypes.LOAD_PATIENT_SUCCESS: {
      const {
        payload: { patientRecord },
      } = action as Actions.LoadPatientSuccess | Actions.EditPatientSuccess;

      return {
        ...state,
        focusedPatient: { ...(state.focusedPatient || {}), ...patientRecord },
      };
    }

    case ActionTypes.CREATE_PATIENT_SUCCESS: {
      const {
        payload: { patientId },
      } = action as Actions.CreatePatientSuccess;

      return {
        ...state,
        focusedPatient: { ...(state.focusedPatient || {}), id: patientId },
      };
    }

    case ActionTypes.LOAD_ICD_SUCCESS: {
      const {
        payload: { icdRecords, totalCount, currentOffset, searchText },
      } = action as Actions.LoadIcdSuccess;

      return {
        ...state,
        icdRecords,
        icdPagination: {
          ...state.icdPagination,
          total: totalCount,
          current_page: currentOffset,
          search_text: searchText,
        },
      };
    }

    case ActionTypes.UPDATE_SOCIAL_ECONOMIC_LEVEL: {
      const {
        payload: { newSocialEconomicLevel },
      } = action as Actions.UpdateSocialEconomicLevel;

      return {
        ...state,
        socialEconomicLevel: newSocialEconomicLevel,
        patientValidationTexts: {
          ...state.patientValidationTexts,
          [ValidFormFieldNames.SocialEconomicLevel]: '',
        },
      };
    }

    case ActionTypes.ANSWER_SOCIAL_ECONOMIC_QUESTION: {
      const {
        payload: { asset, publicService, educationLevel },
      } = action as Actions.AnswerSocialEconomicQuestion;

      const newSocialEconomicAnswers: Patients.SocialEconomicAnswers = {
        ...state.socialEconomicAnswers,
      };

      if (asset) {
        newSocialEconomicAnswers.assets[asset.key] = asset.value;
      }

      if (publicService) {
        newSocialEconomicAnswers.publicServices[publicService.key] =
          publicService.value;
      }

      if (educationLevel) {
        newSocialEconomicAnswers.educationLevel = educationLevel;
      }

      return { ...state, socialEconomicAnswers: newSocialEconomicAnswers };
    }

    case ActionTypes.UPDATE_VALIDATION_TEXT: {
      const {
        payload: { formFieldName, newText },
      } = action as Actions.UpdateValidationText;

      return {
        ...state,
        patientValidationTexts: {
          ...state.patientValidationTexts,
          [formFieldName]: newText,
        },
      };
    }

    case AuthActionTypes.ATTEMPT_LOGOUT: {
      return { ...initialState };
    }

    default:
      return state;
  }
}
