import {
  all,
  call,
  cancelled,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ValidLoadingKeys, Patients, ActionTypes, Actions } from './types';
import {
  ENDPOINTS,
  EXTERNAL_BRAZIL_ZIPCODE_API_ENDPOINT,
  SOCIAL_ECONOMIC_VALUES,
} from './constants';

import {
  changeLoadingStatus,
  loadPatientsSuccess,
  loadPatientsFailed,
  lookupZipcodeFailed,
  lookupZipcodeSuccess,
  createPatientSuccess,
  createPatientFailed,
  loadPatientSuccess,
  loadPatientFailed,
  editPatientSuccess,
  editPatientFailed,
  loadIcdSuccess,
  loadIcdFailed,
  updateSocialEconomicLevel,
} from './actions';

import { get, post, put as putRequest } from '../../utils/request';
import * as selectors from './selectors';
import { displayToast } from '../shared/actions';

export default function* rootPatientsSaga() {
  yield all([
    fork(function* () {
      yield takeLatest(ActionTypes.LOAD_PATIENTS_REQUEST, loadPatients);
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.LOOKUP_PATIENT_ZIPCODE_REQUEST,
        lookupZipcode
      );
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.CREATE_PATIENT_REQUEST, createPatient);
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.LOAD_PATIENT_REQUEST, getPatientById);
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.EDIT_PATIENT_REQUEST, editPatient);
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.LOAD_ICD_REQUEST, loadIcdRecords);
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.ANSWER_SOCIAL_ECONOMIC_QUESTION,
        handleSocialEconomicAnswer
      );
    }),
  ]);
}

function* loadPatients(action: Actions.LoadPatientsRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.PatientsList, true));

  const { query } = action.payload;

  const queryString = query
    ? '?' +
      Object.entries(query)
        .map((pair) => pair.join('='))
        .join('&')
    : '';

  try {
    const response: AxiosResponse<Patients.PatientsResponseModel> = yield get(
      ENDPOINTS.LIST + queryString
    );

    if (response.status === 200) {
      const offset = query?.offset ? query?.offset : 0;

      yield put(
        loadPatientsSuccess(
          response.data,
          response.headers['x-total-count'],
          offset
        )
      );
    }
  } catch (err) {
    yield put(loadPatientsFailed('errors.serverError.title'));
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.PatientsList, false));
  }
}

function* lookupZipcode(action: Actions.LookupPatientZipcodeRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.ZipcodeLookup, true));

  const { zipcode } = action.payload;

  try {
    const response: AxiosResponse<Patients.ZipCodeLookupResult> = yield call(
      function* () {
        const source = axios.CancelToken.source();

        try {
          return yield call(axios.request, {
            cancelToken: source.token,
            url: EXTERNAL_BRAZIL_ZIPCODE_API_ENDPOINT + zipcode,
          });
        } finally {
          if (yield cancelled()) {
            source.cancel();
          }
        }
      }
    );

    if (response.status === 200) {
      yield put(lookupZipcodeSuccess(response.data));
    }
  } catch (err) {
    const requestError: AxiosError<Patients.ZipCodeLookupError> = err;

    if (requestError.response) {
      yield put(lookupZipcodeFailed(requestError.response.data));
    }
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.ZipcodeLookup, false));
  }
}

function* getPatientById(action: Actions.LoadPatientRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.PatientById, true));

  const { patientId } = action.payload;

  try {
    const response: AxiosResponse<Patients.PatientRecord> = yield get(
      ENDPOINTS.GET_BY_ID.replace(':id', patientId)
    );

    if (response.status === 200) {
      yield put(loadPatientSuccess(response.data));
    }
  } catch (err) {
    yield put(loadPatientFailed());
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.PatientById, false));
  }
}

function* createPatient(action: Actions.CreatePatientRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.PatientWrite, true));

  const { patientRecord, onFinish } = action.payload;

  try {
    const response: AxiosResponse<Patients.PatientCreationResponseModel> = yield post(
      ENDPOINTS.CREATE,
      patientRecord
    );

    if (response.status === 201) {
      yield put(createPatientSuccess(response.data.id));
      yield put(
        displayToast({
          id: 'patient-create-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'patients.createPatientSuccess',
          timeout: 5e3,
        })
      );
      yield call(onFinish, response.data.id);
    }
  } catch (err) {
    yield put(createPatientFailed());
    yield put(
      displayToast({
        id: 'patient-create-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'patients.createPatientFailed',
        timeout: 5e3,
      })
    );
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.PatientWrite, false));
  }
}

function* editPatient(action: Actions.EditPatientRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.PatientWrite, true));

  const { patientId, patientRecord, onFinish } = action.payload;

  try {
    const response: AxiosResponse = yield putRequest(
      ENDPOINTS.EDIT.replace(':id', patientId),
      patientRecord
    );

    if (response.status === 204) {
      yield put(editPatientSuccess(patientRecord));
      yield put(
        displayToast({
          id: 'patient-edit-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'patients.editPatientSuccess',
          timeout: 5e3,
        })
      );
      yield call(onFinish, patientId);
    }
  } catch (err) {
    yield put(editPatientFailed());
    yield put(
      displayToast({
        id: 'patient-edit-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'patients.editPatientFailed',
        timeout: 5e3,
      })
    );
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.PatientWrite, false));
  }
}

function* loadIcdRecords(action: Actions.LoadIcdRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.IcdReferences, true));

  const { query } = action.payload;

  const queryString = query
    ? '?' +
      Object.entries(query)
        .map((pair) => pair.join('='))
        .join('&')
    : '';

  try {
    const response: AxiosResponse<Patients.IcdRecord[]> = yield get(
      ENDPOINTS.LIST_ICDS + queryString
    );

    if (response.status === 200) {
      yield put(
        loadIcdSuccess(
          response.data,
          parseInt(response.headers['x-total-count']),
          query.offset || 0,
          query.filter || ''
        )
      );
    }
  } catch (err) {
    yield put(loadIcdFailed());
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.IcdReferences, false));
  }
}

function* handleSocialEconomicAnswer() {
  const socialEconomicAnswers: Patients.SocialEconomicAnswers = yield select(
    selectors.socialEconomicAnswers
  );

  let score = 0;

  if (socialEconomicAnswers.educationLevel) {
    score +=
      SOCIAL_ECONOMIC_VALUES.EDUCATION_LEVELS[
        socialEconomicAnswers.educationLevel
      ];
  }

  for (const key of Object.keys(socialEconomicAnswers.assets)) {
    const assetKey = key as Patients.AssetValidKeys;
    const keyAnswer = socialEconomicAnswers.assets[assetKey];

    if (keyAnswer) {
      score += SOCIAL_ECONOMIC_VALUES.ASSETS[assetKey][keyAnswer];
    }
  }

  for (const key of Object.keys(socialEconomicAnswers.publicServices)) {
    const serviceKey = key as Patients.PublicServiceValidKeys;
    const keyAnswer = socialEconomicAnswers.publicServices[serviceKey];

    if (keyAnswer) {
      score += SOCIAL_ECONOMIC_VALUES.PUBLIC_SERVICES[serviceKey][keyAnswer];
    }
  }

  // now that we have a score..
  let socialEconomicLevel: Patients.SocialEconomicLevels = 'DE';

  if (score <= 16) {
    socialEconomicLevel = 'DE';
  }

  if (score >= 17 && score <= 22) {
    socialEconomicLevel = 'C2';
  }

  if (score >= 23 && score <= 28) {
    socialEconomicLevel = 'C1';
  }

  if (score >= 29 && score <= 37) {
    socialEconomicLevel = 'B2';
  }

  if (score >= 38 && score <= 44) {
    socialEconomicLevel = 'B1';
  }

  if (score >= 45) {
    socialEconomicLevel = 'A';
  }

  yield put(updateSocialEconomicLevel(socialEconomicLevel));
}
