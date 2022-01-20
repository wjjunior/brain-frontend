import {
  all,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { Analysis, Actions, ActionTypes, ValidLoadingKeys } from './types';
import {
  DocumentTypes,
  ENDPOINTS,
  ENDPOINT_GET_RESEARCH_FORM_BY_ID,
} from './constants';
import {
  ENDPOINTS as PATIENT_ENDPOINTS,
  ENDPOINT_PATIENTS_DIAGNOSTICS_BY_ID,
  ENDPOINT_PATIENTS_DIAGNOSTICS_BY_PATIENT,
  ENDPOINT_PATIENTS_SAVE_GLOBAL_PROGNOSTIC,
  ENDPOINT_PATIENTS_SAVE_NEUROPSICHOLOGICAL_PROFILE,
  ENDPOINT_PATIENTS_SAVE_PROSPECTIVE_RESULT_MAP,
} from '../patients/constants';
import {
  loadCoreSetFailed,
  loadCoreSetsFailed,
  loadCoreSetsSuccess,
  loadCoreSetSuccess,
  createCoreSetSuccess,
  createCoreSetFailed,
  changeLoadingStatus,
  loadAnalysisSuccess,
  loadAnalysisFailed,
  saveNeuropsichologicalProfileSuccess,
  saveNeuropsichologicalProfileFailed,
  saveProspectiveResultMapFailed,
  saveProspectiveResultMapSuccess,
  saveGlobalPrognosticSuccess,
  saveGlobalPrognosticFailed,
  listPatientDiagnosticsSuccess,
  listPatientDiagnosticsFailed,
  getDiagnosticResultsSuccess,
  getDiagnosticResultsFailed,
  loadHealthImpactSubjectFormSuccess,
  loadHealthImpactSubjectFormFailed,
  saveHealthImpactSubjectFormFailed,
  saveHealthImpactSubjectFormSuccess,
  saveHealthImpactSubjectFormRequest,
} from './actions';

import { post, get } from '../../utils/request';
import { ValueMap } from '../../utils/typings';
import { ENDPOINT_PATIENTS_SAVE_CORE_SET } from '../patients/constants';
import { displayToast } from '../shared/actions';
import { getEnumKeyByEnumValue } from '../../utils/functional';

export default function* rootAuthSaga() {
  yield all([
    fork(function* () {
      yield takeLatest(ActionTypes.LOAD_ANALYSIS_REQUEST, loadAnalysis);
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.LOAD_CORESET_REFERENCES_REQUEST,
        loadCoreSetReferences
      );
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.LOAD_CORESET_REQUEST, loadCoreSetById);
    }),
    fork(function* () {
      yield takeLatest(
        [ActionTypes.UPDATE_FILLED_CORESET_DRAFT],
        persistFilledCoreSetDraft
      );
    }),
    fork(function* () {
      yield takeLatest(ActionTypes.CREATE_CORE_SET, createCoreSet);
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.SAVE_NEUROPSICHOLOGICAL_PROFILE_REQUEST,
        saveNeuropsichologicalProfile
      );
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.SAVE_PROSPECTIVE_RESULT_MAP_REQUEST,
        saveProspectiveResultMap
      );
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.SAVE_GLOBAL_PROGNOSTIC_REQUEST,
        saveGlobalPrognostic
      );
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.LIST_PATIENT_DIAGNOSTICS_REQUEST,
        listPatientDiagnostics
      );
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.GET_DIAGNOSTIC_RESULTS_REQUEST,
        getDiagnosticResults
      );
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.LOAD_HEALTH_IMPACT_SUBJECT_FORM_REQUEST,
        loadHealthImpactSubjectForm
      );
    }),
    fork(function* () {
      yield takeEvery(
        ActionTypes.SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_REQUEST,
        saveHealthImpactReplies
      );
    }),
    fork(function* () {
      yield takeLatest(
        ActionTypes.SAVE_HEALTH_IMPACT_SUBJECTS,
        saveHealthImpactSubjects
      );
    }),
  ]);
}

function* loadAnalysis(action: Actions.LoadAnalysisRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.Analysis, true));

  const { query } = action.payload;

  const queryString = query
    ? '?' +
      Object.entries(query)
        .map((pair) => pair.join('='))
        .join('&')
    : '';

  try {
    const response: AxiosResponse<Analysis.AnalysisResponseModel> = yield get(
      PATIENT_ENDPOINTS.ANALYSIS + queryString
    );

    if (response.status === 200) {
      const offset = query?.offset ? query?.offset : 0;
      yield put(
        loadAnalysisSuccess(
          response.data,
          response.headers['x-total-count'],
          offset
        )
      );
    }
  } catch (err) {
    yield put(loadAnalysisFailed('errors.serverError.title'));
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.Analysis, false));
  }
}

function* loadCoreSetReferences(action: Actions.LoadCoreSetReferencesRequest) {
  const { query } = action.payload;

  const queryString =
    '?limit=30' +
    (query
      ? '&' +
        Object.entries(query)
          .map((pair) => pair.join('='))
          .join('&')
      : '');

  try {
    const response: AxiosResponse<Analysis.CoreSetReference[]> = yield get(
      ENDPOINTS.LIST_CORESETS + queryString
    );

    if (response.status === 200) {
      const coreSetReferences = response.data;

      yield put(loadCoreSetsSuccess(coreSetReferences));
    }
  } catch (err) {
    yield put(loadCoreSetsFailed());
  }
}

function* loadCoreSetById(action: Actions.LoadCoreSetRequest) {
  const { coreSetId } = action.payload;

  try {
    const response: AxiosResponse<Analysis.RawCoreSet> = yield get(
      ENDPOINTS.GET_CORESET_BY_ID.replace(':id', coreSetId)
    );

    if (response.status === 200) {
      const coreSet = response.data;

      const groupedIcfs = coreSet.icFs.reduce(
        (acc: ValueMap<Analysis.ICF[]>, icF) => ({
          ...acc,
          [icF.category]: [...(acc[icF.category] || []), icF],
        }),
        {}
      );

      yield put(loadCoreSetSuccess({ ...coreSet, icFs: groupedIcfs }));
    }
  } catch (err) {
    yield put(loadCoreSetFailed());
  }
}

function* persistFilledCoreSetDraft(action: Actions.UpdateFilledCoreSetDraft) {
  yield select((state) => state.analysis.draft);
}

function* createCoreSet(action: Actions.CreateCoreSet) {
  yield put(changeLoadingStatus(ValidLoadingKeys.SaveCoreSet, true));

  const { patientId, onSuccess, ...payload } = action.payload;

  try {
    const response: AxiosResponse<Analysis.SaveReportResponse> = yield post(
      ENDPOINT_PATIENTS_SAVE_CORE_SET.replace(':id', patientId),
      payload
    );

    if (response.status === 201) {
      yield put(
        displayToast({
          id: 'analysis-coreset-creation-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'analysis.coreSet.coreSetCreationSuccess',
          timeout: 5e3,
        })
      );
      yield put(createCoreSetSuccess());

      if (typeof onSuccess === 'function') {
        onSuccess(response.data.id);
      }
    }
  } catch (err) {
    yield put(
      displayToast({
        id: 'analysis-coreset-creation-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'analysis.coreSet.coreSetCreationFailed',
        timeout: 5e3,
      })
    );
    yield put(createCoreSetFailed());
  } finally {
    yield put(changeLoadingStatus(ValidLoadingKeys.SaveCoreSet, false));
  }
}

function* saveNeuropsichologicalProfile(
  action: Actions.SaveNeuropsichologicalProfileRequest
) {
  yield put(
    changeLoadingStatus(ValidLoadingKeys.SaveNeuropsichologicalProfile, true)
  );

  const { patientId, onSuccess, ...payload } = action.payload;

  try {
    const response: AxiosResponse<any> = yield post(
      ENDPOINT_PATIENTS_SAVE_NEUROPSICHOLOGICAL_PROFILE.replace(
        ':id',
        patientId
      ),
      payload
    );

    if (response.status === 201) {
      yield put(saveNeuropsichologicalProfileSuccess());
      yield put(
        displayToast({
          id: 'patient-create-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'analysis.neuropsichologicalProfile.saveSuccess',
          timeout: 5e3,
        })
      );
      onSuccess();
    }
  } catch (err) {
    yield put(
      displayToast({
        id: 'analysis-neuropsichological-profile-save-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'analysis.neuropsichologicalProfile.saveFailed',
        timeout: 5e3,
      })
    );
    yield put(saveNeuropsichologicalProfileFailed());
  } finally {
    yield put(
      changeLoadingStatus(ValidLoadingKeys.SaveNeuropsichologicalProfile, false)
    );
  }
}

function* saveProspectiveResultMap(
  action: Actions.SaveProspectiveResultMapRequest
) {
  yield put(
    changeLoadingStatus(ValidLoadingKeys.SaveProspectiveResultMap, true)
  );

  const { patientId, onSuccess, ...payload } = action.payload;

  try {
    const response: AxiosResponse<Analysis.SaveReportResponse> = yield post(
      ENDPOINT_PATIENTS_SAVE_PROSPECTIVE_RESULT_MAP.replace(':id', patientId),
      payload
    );

    if (response.status === 201) {
      yield put(saveProspectiveResultMapSuccess());
      yield put(
        displayToast({
          id: 'patient-create-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'analysis.prospectiveResultMap.saveSuccess',
          timeout: 5e3,
        })
      );
      onSuccess(response.data.id);
    }
  } catch (err) {
    yield put(
      displayToast({
        id: 'analysis-prospective-result-map-save-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'analysis.prospectiveResultMap.saveFailed',
        timeout: 5e3,
      })
    );
    yield put(saveProspectiveResultMapFailed());
  } finally {
    yield put(
      changeLoadingStatus(ValidLoadingKeys.SaveProspectiveResultMap, false)
    );
  }
}

function* saveGlobalPrognostic(action: Actions.SaveGlobalPrognosticRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.SaveGlobalPrognostic, true));

  const { patientId, onSuccess, ...payload } = action.payload;

  try {
    const response: AxiosResponse<Analysis.SaveReportResponse> = yield post(
      ENDPOINT_PATIENTS_SAVE_GLOBAL_PROGNOSTIC.replace(':id', patientId),
      payload
    );

    if (response.status === 201) {
      yield put(saveGlobalPrognosticSuccess());
      yield put(
        displayToast({
          id: 'analysis-global-prognostic-save-success',
          kind: 'success',
          titleKey: 'common.ok',
          subtitleKey: 'analysis.globalPrognostic.saveSuccess',
          timeout: 5e3,
        })
      );
      onSuccess(response.data.id);
    }
  } catch (err) {
    yield put(
      displayToast({
        id: 'analysis-global-prognostic-save-failed',
        kind: 'error',
        titleKey: 'common.oops',
        subtitleKey: 'analysis.globalPrognostic.saveFailed',
        timeout: 5e3,
      })
    );
    yield put(saveGlobalPrognosticFailed());
  } finally {
    yield put(
      changeLoadingStatus(ValidLoadingKeys.SaveGlobalPrognostic, false)
    );
  }
}

function* listPatientDiagnostics(
  action: Actions.ListPatientDiagnosticsRequest
) {
  yield put(changeLoadingStatus(ValidLoadingKeys.ListPatientDiagnostics, true));

  const { diagnosticType } = action.payload;

  const diagnosticTypeString = diagnosticType
    ? `?filter=DiagnosticType=${getEnumKeyByEnumValue(
        DocumentTypes,
        diagnosticType
      )}`
    : '';

  try {
    const response: AxiosResponse<Analysis.AnalysisResponseModel> = yield get(
      ENDPOINT_PATIENTS_DIAGNOSTICS_BY_PATIENT.replace(
        ':id',
        action.payload.patientId
      ) + diagnosticTypeString
    );

    if (response.status === 200) {
      yield put(listPatientDiagnosticsSuccess(response.data));
    }
  } catch (err) {
    yield put(listPatientDiagnosticsFailed());
  } finally {
    yield put(
      changeLoadingStatus(ValidLoadingKeys.ListPatientDiagnostics, false)
    );
  }
}

function* getDiagnosticResults(action: Actions.GetDiagnosticResultsRequest) {
  yield put(changeLoadingStatus(ValidLoadingKeys.GetDiagnosticResults, true));

  const { patientId, coreSetId, diagnosticId, query } = action.payload;

  const queryString = query
    ? '?' +
      Object.entries(query)
        .map((pair) => pair.join('='))
        .join('&')
    : '';

  try {
    const response: AxiosResponse<Analysis.CoreSetResult[]> = yield get(
      ENDPOINT_PATIENTS_DIAGNOSTICS_BY_ID.replace(':patientId', patientId)
        .replace(':coreSetId', coreSetId)
        .replace(':id', diagnosticId) + queryString
    );

    if (response.status === 200) {
      yield put(getDiagnosticResultsSuccess(response.data));
    }
  } catch (err) {
    yield put(getDiagnosticResultsFailed());
  } finally {
    yield put(
      changeLoadingStatus(ValidLoadingKeys.GetDiagnosticResults, false)
    );
  }
}

function* loadHealthImpactSubjectForm(
  action: Actions.LoadHealthImpactSubjectFormRequest
) {
  yield put(
    changeLoadingStatus(ValidLoadingKeys.HealthImpactResearchForm, true)
  );

  try {
    const response: AxiosResponse<Analysis.ResearchForm> = yield get(
      ENDPOINT_GET_RESEARCH_FORM_BY_ID.replace(':id', action.payload.formId)
    );

    if (response.status === 200) {
      yield put(
        loadHealthImpactSubjectFormSuccess(
          action.payload.subject,
          response.data
        )
      );
    }
  } catch (err) {
    yield put(loadHealthImpactSubjectFormFailed());
  } finally {
    yield put(
      changeLoadingStatus(ValidLoadingKeys.HealthImpactResearchForm, false)
    );
  }
}

function* saveHealthImpactReplies(
  action: Actions.SaveHealthImpactSubjectRepliesRequest
) {
  const { patientId, notesF, notesL, questions } = action.payload;

  const requestBody = {
    notesF,
    replies: {
      notesL,
      questions: questions.map((question) => ({
        notesQ: question.notesQ,
        researchFormQuestionId: question.questionId,
      })),
    },
  };

  try {
    const response: AxiosResponse<Analysis.SaveReportResponse> = yield post(
      PATIENT_ENDPOINTS.SAVE_REPLIES.replace(':id', patientId),
      requestBody
    );

    if (response.status === 201) {
      yield put(saveHealthImpactSubjectFormSuccess());
    }
  } catch (err) {
    yield put(saveHealthImpactSubjectFormFailed());
  }
}

function* saveHealthImpactSubjects(action: Actions.SaveHealthImpactSubjects) {
  yield put(
    changeLoadingStatus(ValidLoadingKeys.SaveHealthImpactReplies, true)
  );

  const { patientId, onSaveAll, subjects } = action.payload;

  for (const subject of subjects) {
    yield put(saveHealthImpactSubjectFormRequest({ patientId, ...subject }));

    const action = yield take([
      ActionTypes.SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_SUCCESS,
      ActionTypes.SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_FAILED,
    ]);

    if (action.type === ActionTypes.SAVE_HEALTH_IMPACT_SUBJECT_REPLIES_FAILED) {
      yield put(
        displayToast({
          id: 'analysis-health-impact-save-failed',
          kind: 'error',
          titleKey: 'common.oops',
          subtitleKey: 'analysis.healthImpact.saveFailed',
          timeout: 5e3,
        })
      );
      return;
    }
  }

  yield put(
    displayToast({
      id: 'analysis-health-impact-save-success',
      kind: 'success',
      titleKey: 'common.ok',
      subtitleKey: 'analysis.healthImpact.saveSuccess',
      timeout: 5e3,
    })
  );

  onSaveAll();

  yield put(
    changeLoadingStatus(ValidLoadingKeys.SaveHealthImpactReplies, false)
  );
}
