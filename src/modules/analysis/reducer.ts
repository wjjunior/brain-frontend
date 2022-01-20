import {
  Analysis,
  Actions,
  ActionTypes,
  ValidLoadingKeys,
  ValidHealthImpactDescriptionOnlySubjects,
  ValidHealthImpactSubjectsWithForm,
} from './types';
import { ActionTypes as AuthActionTypes } from '../auth/types';
import { PAGINATION_CORESETS_PER_PAGE } from './constants';

const INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER: Analysis.NeuropsichologicalProfileFormAnswer = {
  qualifier: '0',
  description: '',
};

const initialState: Analysis.ReducerState = {
  [ValidLoadingKeys.Analysis]: false,
  [ValidLoadingKeys.SaveCoreSet]: false,
  [ValidLoadingKeys.SaveNeuropsichologicalProfile]: false,
  [ValidLoadingKeys.SaveProspectiveResultMap]: false,
  [ValidLoadingKeys.SaveGlobalPrognostic]: false,
  [ValidLoadingKeys.SaveHealhImpactResearchForm]: false,
  [ValidLoadingKeys.ListPatientDiagnostics]: false,
  [ValidLoadingKeys.GetDiagnosticResults]: false,
  [ValidLoadingKeys.HealthImpactResearchForm]: false,
  didHealthImpactSubjectResearchFormError: false,
  didCoreSetReferencesError: false,
  didCoreSetError: false,
  isCoreSetReferencesLoading: false,
  isFocusedDiagnosticResultsLoading: false,
  didFocusedDiagnosticResultsError: false,
  isCoreSetLoading: false,
  coreSetReferences: null,
  coreSet: null,
  draft: null,
  totalAnalysis: 0,
  pagination: {
    total: 0,
    per_page: PAGINATION_CORESETS_PER_PAGE,
    current_page: 1,
    last_page: 1,
  },
  analysis: null,
  didAnalysisError: null,
  prospectiveResultMap: {
    draft: {
      progress: {
        patient: false,
        map: false,
        finish: false,
      },
      patientId: null,
      coreSetId: null,
      diagnosticId: null,
    },
  },
  globalPrognostic: {
    draft: {
      progress: {
        patient: false,
        weaknessAndStrengths: false,
        finish: false,
      },
      patientId: null,
      coreSetId: null,
      diagnosticId: null,
    },
  },
  neuropsichologicalProfile: {
    draft: {
      progress: {
        patient: false,
        intelectualOperation: false,
        universalFunctions: false,
        executiveFunctions: false,
        cognitiveFunctions: false,
        additionalInformation: false,
        finish: false,
      },
      patientId: null,
      form: {
        intelectualOperation: {
          intelectualOperation: {
            intelectualOperation: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
          },
        },
        universalFunctions: {
          memoryVerbal: {
            codification: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            storage: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            evocation: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
          },
          memoryNonVerbal: {
            codification: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            storage: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            evocation: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
          },
          attention: {
            sustained: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            focused: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            divided: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            alternated: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            general: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
          },
        },
        executiveFunctions: {
          executiveFunctions: {
            planning: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            implementation: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            correction: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            flexibility: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            impulsiveness: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            operationalMemory: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
          },
        },
        cognitiveFunctions: {
          language: {
            expression: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            comprehension: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
          },
          numericCognition: {
            calculation: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            numericProcessing: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
          },
          socialSkills: {
            socialSkill: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            praxis: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            motorPraxis: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            ideationalPraxis: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
          },
          motorSkills: {
            rough: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
            soft: INITIAL_NEUROPSICHOLOGICAL_PROFILE_ANSWER,
          },
        },
      },
      additionalInformation: {
        medication: [],
        diagnosisAge: '',
        evolutionTime: '',
        familyHistory: '',
        moodSwingEpisodes: '',
        selfTerminationAttempts: 0,
        drugUsage: false,
        drugFrequency: '',
        drugAmount: '',
        drugUsageTime: '',
        psychiatricHospitalizations: 0,
        ectOccurrences: 0,
        mainComplaints: '',
      },
    },
  },
  healthImpact: {
    draft: {
      progress: {
        patient: false,
        subjects: false,
        finish: false,
      },
      patientId: null,
      subjects: {},
    },
  },
  focusedPatientDiagnostics: null,
  focusedDiagnosticResults: null,
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case ActionTypes.CHANGE_LOADING_STATUS: {
      const {
        payload: { loadingKey, newStatus },
      } = action as Actions.ChangeLoadingStatus;

      return { ...state, [loadingKey]: newStatus };
    }

    case ActionTypes.LOAD_ANALYSIS_SUCCESS: {
      const {
        payload: { analysis, totalAnalysis, offset },
      } = action as Actions.LoadAnalysisSuccess;

      return {
        ...state,
        analysis,
        totalAnalysis,
        pagination: {
          ...state.pagination,
          total: totalAnalysis,
          current_page: offset ? offset + 1 : 1,
          last_page: totalAnalysis
            ? Math.ceil(totalAnalysis / state.pagination.per_page)
            : 1,
        },
      };
    }

    case ActionTypes.LOAD_ANALYSIS_FAILED: {
      const {
        payload: { message },
      } = action as Actions.LoadAnalysisFailed;

      return { ...state, didAnalysisError: message };
    }

    case ActionTypes.LOAD_CORESET_REFERENCES_REQUEST: {
      return {
        ...state,
        coreSetReferences: null,
        isCoreSetReferencesLoading: true,
        didCoreSetReferencesError: false,
      };
    }

    case ActionTypes.LOAD_CORESET_REFERENCES_SUCCESS: {
      const { payload } = action as Actions.LoadCoreSetReferencesSuccess;
      return {
        ...state,
        coreSetReferences: payload.coreSetReferences,
        isCoreSetReferencesLoading: false,
        didCoreSetReferencesError: false,
      };
    }

    case ActionTypes.LOAD_CORESET_REFERENCES_FAILED: {
      return {
        ...state,
        isCoreSetReferencesLoading: false,
        didCoreSetReferencesError: true,
      };
    }

    case ActionTypes.LOAD_CORESET_REQUEST: {
      return {
        ...state,
        coreSet: null,
        isCoreSetLoading: true,
        didCoreSetError: false,
      };
    }

    case ActionTypes.LOAD_CORESET_SUCCESS: {
      const { payload } = action as Actions.LoadCoreSetSuccess;
      return {
        ...state,
        coreSet: payload.coreSet,
        isCoreSetLoading: false,
        didCoreSetError: false,
      };
    }

    case ActionTypes.LOAD_CORESET_FAILED: {
      return { ...state, isCoreSetLoading: false, didCoreSetError: true };
    }

    case ActionTypes.UPDATE_FILLED_CORESET_DRAFT: {
      const { payload } = action as Actions.UpdateFilledCoreSetDraft;

      const existingDraft = {
        ...(state.draft || {
          patientId: undefined,
          coreSetId: undefined,
          icfs: {},
        }),
      };

      if (payload.patientId) {
        existingDraft.patientId = payload.patientId;
        existingDraft.icfs = {};
      }

      if (payload.coreSetId) {
        existingDraft.coreSetId = payload.coreSetId;
        existingDraft.icfs = {};
      }

      return { ...state, draft: { ...existingDraft } };
    }

    case ActionTypes.ANSWER_FILLED_CORESET_DRAFT: {
      const {
        payload: { icfId, code, answerId, informationSourceIds, description },
      } = action as Actions.AnswerFilledCoreSetDraft;

      const existingDraft = { ...(state.draft || { icfs: {} }) };
      const existingIcfs = existingDraft.icfs || {};
      const selectedIcfCategory = existingIcfs[icfId] || {
        answers: {},
      };

      if (answerId) {
        selectedIcfCategory.answers[code || ''] = answerId;
      }

      if (informationSourceIds) {
        selectedIcfCategory.informationSourceIds = informationSourceIds;
      }

      if (description !== undefined) {
        selectedIcfCategory.description = description;
      }

      return {
        ...state,
        draft: {
          ...existingDraft,
          icfs: {
            ...existingIcfs,
            [icfId]: {
              ...selectedIcfCategory,
            },
          },
        },
      };
    }

    case ActionTypes.CLEAR_CORESET_DRAFT: {
      return { ...state, draft: null };
    }

    case ActionTypes.CLEAR_CORESET: {
      return { ...state, coreSet: null };
    }

    case ActionTypes.SELECT_NEUROPSICHOLOGICAL_PROFILE_PATIENT: {
      const {
        payload,
      } = action as Actions.SelectNeuropsichologicalProfilePatient;

      return {
        ...state,
        neuropsichologicalProfile: {
          ...state.neuropsichologicalProfile,
          draft: {
            ...state.neuropsichologicalProfile.draft,
            patientId: payload.patientId,
          },
        },
      };
    }

    case ActionTypes.MARK_NEUROPSICHOLOGICAL_PROFILE_PROGRESS: {
      const {
        payload,
      } = action as Actions.MarkNeuropsichologicalProfileProgress;

      return {
        ...state,
        neuropsichologicalProfile: {
          ...state.neuropsichologicalProfile,
          draft: {
            ...state.neuropsichologicalProfile.draft,
            progress: {
              ...state.neuropsichologicalProfile.draft.progress,
              [payload.step]: true,
            },
          },
        },
      };
    }

    case ActionTypes.UPDATE_NEUROPSICHOLOGICAL_PROFILE_FORM: {
      const { payload } = action as Actions.UpdateNeuropsichologicalProfileForm;

      const category = payload.category as keyof Analysis.NeuropsichologicalProfileForm;
      const subcategory = payload.subcategory as Analysis.NeuropsichologicalProfileFormSubcategories;
      const question = payload.question as Analysis.NeuropsichologicalProfileFormQuestions;

      const formIncrement = {
        [category]: {
          ...state.neuropsichologicalProfile.draft.form[category],
          [subcategory]: {
            ...(state.neuropsichologicalProfile.draft.form[category] as any)[
              subcategory
            ],
            [question]: {
              ...(state.neuropsichologicalProfile.draft.form[category] as any)[
                subcategory
              ][question],
            },
          },
        },
      };

      if (payload.qualifier) {
        (formIncrement[category] as any)[subcategory][question].qualifier =
          payload.qualifier;
      }

      if (typeof payload.description === 'string') {
        (formIncrement[category] as any)[subcategory][question].description =
          payload.description;
      }

      return {
        ...state,
        neuropsichologicalProfile: {
          draft: {
            ...state.neuropsichologicalProfile.draft,
            form: {
              ...state.neuropsichologicalProfile.draft.form,
              ...formIncrement,
            },
          },
        },
      };
    }

    case ActionTypes.UPDATE_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO: {
      const {
        payload,
      } = action as Actions.UpdateNeuropsichologicalProfileAdditionalInfo;

      const additionalInformation = {
        ...state.neuropsichologicalProfile.draft.additionalInformation,
        ...payload,
      };

      return {
        ...state,
        neuropsichologicalProfile: {
          draft: {
            ...state.neuropsichologicalProfile.draft,
            additionalInformation,
          },
        },
      };
    }

    case ActionTypes.UPDATE_NEUROPSICHOLOGICAL_PROFILE_MEDICATION: {
      const {
        payload: { index, ...medication },
      } = action as Actions.UpdateNeuropsichologicalProfileMedication;

      const newMedication =
        state.neuropsichologicalProfile.draft.additionalInformation.medication;

      const length = newMedication.length;

      if (length <= index) {
        newMedication.push({ ...medication, dosage: '' });
      }

      newMedication[index].medicationClass = medication.medicationClass;

      if (typeof medication.dosage === 'string') {
        newMedication[index].dosage = medication.dosage;
      }

      return {
        ...state,
        neuropsichologicalProfile: {
          draft: {
            ...state.neuropsichologicalProfile.draft,
            additionalInformation: {
              ...state.neuropsichologicalProfile.draft.additionalInformation,
              medication: newMedication,
            },
          },
        },
      };
    }

    case ActionTypes.REMOVE_NEUROPSICHOLOGICAL_PROFILE_MEDICATION: {
      const {
        payload: { index },
      } = action as Actions.RemoveNeuropsichologicalProfileMedication;

      const newMedication = state.neuropsichologicalProfile.draft.additionalInformation.medication.filter(
        (_, jIndex) => index !== jIndex
      );

      return {
        ...state,
        neuropsichologicalProfile: {
          draft: {
            ...state.neuropsichologicalProfile.draft,
            additionalInformation: {
              ...state.neuropsichologicalProfile.draft.additionalInformation,
              medication: newMedication,
            },
          },
        },
      };
    }

    case ActionTypes.CLEAR_NEUROPSICHOLOGICAL_PROFILE_DRAFT: {
      return {
        ...state,
        neuropsichologicalProfile: {
          ...state.neuropsichologicalProfile,
          draft: initialState.neuropsichologicalProfile.draft,
        },
      };
    }

    case ActionTypes.MARK_HEALTH_IMPACT_PROGRESS: {
      const { payload } = action as Actions.MarkHealthImpactProgress;

      return {
        ...state,
        healthImpact: {
          ...state.healthImpact,
          draft: {
            ...state.healthImpact.draft,
            progress: {
              ...state.healthImpact.draft.progress,
              [payload.step]: payload.state,
            },
          },
        },
      };
    }

    case ActionTypes.CLEAR_HEALTH_IMPACT_DRAFT: {
      return {
        ...state,
        healthImpact: {
          ...state.healthImpact,
          draft: initialState.healthImpact.draft,
        },
      };
    }

    case ActionTypes.SELECT_HEALTH_IMPACT_PATIENT: {
      const { payload } = action as Actions.SelectHealthImpactPatient;

      return {
        ...state,
        healthImpact: {
          ...state.healthImpact,
          draft: {
            ...state.healthImpact.draft,
            patientId: payload.patientId,
          },
        },
      };
    }

    case ActionTypes.SELECT_HEALTH_IMPACT_SUBJECTS: {
      const { payload } = action as Actions.SelectHealthImpactSubjects;

      const newSubjects: { [key: string]: object } = {};

      for (const subject of payload.subjects) {
        switch (subject) {
          case ValidHealthImpactDescriptionOnlySubjects.Stigma:
          case ValidHealthImpactDescriptionOnlySubjects.Personality:
          case ValidHealthImpactDescriptionOnlySubjects.NegativeBeliefs:
            const currentDescriptionSubject =
              state.healthImpact.draft.subjects[subject];

            newSubjects[subject] = currentDescriptionSubject || {
              description: '',
            };
            break;
          case ValidHealthImpactDescriptionOnlySubjects.FamilyRelations:
            const currentFamilyRelationsSubject =
              state.healthImpact.draft.subjects[subject];

            newSubjects[subject] = currentFamilyRelationsSubject || {
              family: '',
              ambient: '',
              context: '',
            };
            break;
          case ValidHealthImpactDescriptionOnlySubjects.OccupationalHistory:
            const currentOccupationalHistorySubject =
              state.healthImpact.draft.subjects[subject];

            newSubjects[subject] = currentOccupationalHistorySubject || {
              work: '',
              leisure: '',
              ambient: '',
              others: '',
            };
            break;
          case ValidHealthImpactSubjectsWithForm.Coping:
          case ValidHealthImpactSubjectsWithForm.Anxiety:
          case ValidHealthImpactSubjectsWithForm.Humour:
          case ValidHealthImpactSubjectsWithForm.LifeQuality:
          case ValidHealthImpactSubjectsWithForm.SleepQuality:
            const currentFormSubject =
              state.healthImpact.draft.subjects[subject];

            newSubjects[subject] = currentFormSubject || {
              description: '',
              form: {
                questions: undefined,
                answers: {},
              },
            };
            break;
          default:
            break;
        }
      }

      return {
        ...state,
        healthImpact: {
          ...state.healthImpact,
          draft: {
            ...state.healthImpact.draft,
            subjects: newSubjects,
          },
        },
      };
    }

    case ActionTypes.UPDATE_HEALTH_IMPACT_OPEN_FIELD: {
      const { payload } = action as Actions.UpdateHealthImpactOpenField;

      return {
        ...state,
        healthImpact: {
          ...state.healthImpact,
          draft: {
            ...state.healthImpact.draft,
            subjects: {
              ...state.healthImpact.draft.subjects,
              [payload.subject]: {
                ...state.healthImpact.draft.subjects[payload.subject],
                [payload.key]: payload.value,
              },
            },
          },
        },
      };
    }

    case ActionTypes.UPDATE_HEALTH_IMPACT_FORM_FIELD: {
      const { payload } = action as Actions.UpdateHealthImpactFormField;

      return {
        ...state,
        healthImpact: {
          ...state.healthImpact,
          draft: {
            ...state.healthImpact.draft,
            subjects: {
              ...state.healthImpact.draft.subjects,
              [payload.subject]: {
                ...state.healthImpact.draft.subjects[payload.subject],
                form: {
                  ...(
                    state.healthImpact.draft.subjects[payload.subject] ||
                    ({} as any)
                  ).form,
                  answers: {
                    ...(
                      state.healthImpact.draft.subjects[payload.subject]
                        ?.form || {}
                    ).answers,
                    [payload.questionId]: payload.answerId,
                  },
                },
              },
            },
          },
        },
      };
    }

    case ActionTypes.LOAD_HEALTH_IMPACT_SUBJECT_FORM_REQUEST: {
      return {
        ...state,
        didHealthImpactSubjectResearchFormError: false,
      };
    }

    case ActionTypes.LOAD_HEALTH_IMPACT_SUBJECT_FORM_SUCCESS: {
      const { payload } = action as Actions.LoadHealthImpactSubjectFormSuccess;

      return {
        ...state,
        healthImpact: {
          ...state.healthImpact,
          draft: {
            ...state.healthImpact.draft,
            subjects: {
              ...state.healthImpact.draft.subjects,
              [payload.subject]: {
                ...state.healthImpact.draft.subjects[payload.subject],
                form: {
                  ...((state.healthImpact.draft.subjects[
                    payload.subject
                  ] as any).form || {}),
                  questions: payload.form,
                },
              },
            },
          },
        },
      };
    }

    case ActionTypes.LOAD_HEALTH_IMPACT_SUBJECT_FORM_FAILED: {
      return {
        ...state,
        didHealthImpactSubjectResearchFormError: true,
      };
    }

    case ActionTypes.CLEAR_PROSPECTIVE_RESULT_MAP_DRAFT: {
      return {
        ...state,
        focusedPatientDiagnostics: null,
        focusedDiagnosticResults: null,
        prospectiveResultMap: {
          ...state.prospectiveResultMap,
          draft: initialState.prospectiveResultMap.draft,
        },
      };
    }

    case ActionTypes.MARK_PROSPECTIVE_RESULT_MAP_PROGRESS: {
      const { payload } = action as Actions.MarkProspectiveResultMapProgress;

      return {
        ...state,
        prospectiveResultMap: {
          ...state.prospectiveResultMap,
          draft: {
            ...state.prospectiveResultMap.draft,
            progress: {
              ...state.prospectiveResultMap.draft.progress,
              [payload.step]: true,
            },
          },
        },
      };
    }

    case ActionTypes.SELECT_PROSPECTIVE_RESULT_MAP_PATIENT: {
      const { payload } = action as Actions.SelectProspectiveResultMapPatient;

      return {
        ...state,
        prospectiveResultMap: {
          ...state.prospectiveResultMap,
          draft: {
            ...state.prospectiveResultMap.draft,
            patientId: payload.patientId,
          },
        },
      };
    }

    case ActionTypes.CLEAR_GLOBAL_PROGNOSTIC_DRAFT: {
      return {
        ...state,
        globalPrognostic: {
          ...state.globalPrognostic,
          draft: initialState.globalPrognostic.draft,
        },
      };
    }

    case ActionTypes.MARK_GLOBAL_PROGNOSTIC_PROGRESS: {
      const { payload } = action as Actions.MarkGlobalPrognosticProgress;

      return {
        ...state,
        globalPrognostic: {
          ...state.globalPrognostic,
          draft: {
            ...state.globalPrognostic.draft,
            progress: {
              ...state.globalPrognostic.draft.progress,
              [payload.step]: true,
            },
          },
        },
      };
    }

    case ActionTypes.SELECT_GLOBAL_PROGNOSTIC_PATIENT: {
      const { payload } = action as Actions.SelectGlobalPrognosticPatient;

      return {
        ...state,
        globalPrognostic: {
          ...state.globalPrognostic,
          draft: {
            ...state.globalPrognostic.draft,
            patientId: payload.patientId,
          },
        },
      };
    }

    case ActionTypes.LIST_PATIENT_DIAGNOSTICS_SUCCESS: {
      const { payload } = action as Actions.ListPatientDiagnosticsSuccess;

      return {
        ...state,
        focusedPatientDiagnostics: payload.diagnostics,
      };
    }

    case ActionTypes.SELECT_PROSPECTIVE_RESULT_MAP_CORESET: {
      const { payload } = action as Actions.SelectProspectiveResultMapCoreSet;

      return {
        ...state,
        prospectiveResultMap: {
          ...state.prospectiveResultMap,
          draft: {
            ...state.prospectiveResultMap.draft,
            coreSetId: payload.coreSetId,
            diagnosticId: payload.diagnosticId,
          },
        },
      };
    }

    case ActionTypes.SELECT_GLOBAL_PROGNOSTIC_CORESET: {
      const { payload } = action as Actions.SelectGlobalPrognosticCoreSet;

      return {
        ...state,
        globalPrognostic: {
          ...state.globalPrognostic,
          draft: {
            ...state.globalPrognostic.draft,
            coreSetId: payload.coreSetId,
            diagnosticId: payload.diagnosticId,
          },
        },
      };
    }

    case ActionTypes.GET_DIAGNOSTIC_RESULTS_REQUEST: {
      return {
        ...state,
        isFocusedDiagnosticResultsLoading: true,
        didFocusedDiagnosticResultsError: false,
      };
    }

    case ActionTypes.GET_DIAGNOSTIC_RESULTS_SUCCESS: {
      const { payload } = action as Actions.GetDiagnosticResultsSuccess;

      return {
        ...state,
        isFocusedDiagnosticResultsLoading: false,
        focusedDiagnosticResults: payload.coreSet,
      };
    }

    case ActionTypes.GET_DIAGNOSTIC_RESULTS_FAILED: {
      return {
        ...state,
        isFocusedDiagnosticResultsLoading: false,
        didFocusedDiagnosticResultsError: true,
      };
    }

    case ActionTypes.CLEAR_FOCUSED_DIAGNOSTIC_RESULTS: {
      return {
        ...state,
        isFocusedDiagnosticResultsLoading: false,
        didFocusedDiagnosticResultsError: false,
        focusedDiagnosticResults: null,
      };
    }

    case AuthActionTypes.ATTEMPT_LOGOUT: {
      return { ...initialState };
    }
  }

  return state;
}
