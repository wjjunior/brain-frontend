import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import ClinicalInfoComponent, {
  Field,
} from '../../../components/Patients/CreationSteps/ClinicalInfo';
import { Option } from '../../../components/Select';
import { grid } from '../../../config/theme';
import { VerbModes } from '../../../modules/analysis/constants';
import { selectors } from '../../../modules/patients';
import {
  editPatient,
  loadIcdRequest,
  loadPatient,
} from '../../../modules/patients/actions';
import { ROUTE_PATIENTS_HOME } from '../../../modules/patients/constants';
import { Patients } from '../../../modules/patients/types';
import { debounce } from '../../../utils/functional';

const ClinicalInfoContainer: React.FC = () => {
  const diagnosisRef = useRef<HTMLInputElement>(null);
  const cognitiveEmotionalComplaintsRef = useRef<HTMLInputElement>(null);
  const performanceCapacityComplaintsRef = useRef<HTMLInputElement>(null);
  const hospitalizationsCountRef = useRef<HTMLInputElement>(null);
  const familyHistoryRef = useRef<HTMLInputElement>(null);
  const additionalInfoRef = useRef<HTMLInputElement>(null);

  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: patientId, verb: mode } = useParams();
  const icdReferences = useSelector(selectors.icdReferences);

  const existingPatient = useSelector(selectors.focusedPatient);
  const icdPagination = useSelector(selectors.icdPagination);
  const isIcdReferencesLoading = useSelector(selectors.isIcdReferencesLoading);
  const isPatientWriteLoading = useSelector(selectors.isPatientWriteLoading);
  const isFocusedPatientLoading = useSelector(
    selectors.isFocusedPatientLoading
  );
  const [disableEdit, setDisableEdit] = useState<boolean>(false);
  const [icdPage, setIcdPage] = useState<number>(1);
  const [icdSearch, setIcdSearch] = useState<string>('');

  const [
    selectedManualPreference,
    setSelectedManualPreference,
  ] = useState<Option | null>(null);
  const [
    selectedPhysicalActivity,
    setSelectedPhysicalActivity,
  ] = useState<Option | null>(null);
  const [selectedCaseHistory, setSelectedCaseHistory] = useState<Option | null>(
    null
  );
  const [selectedIcdCodes, setSelectedIcdCodes] = useState<string[]>([]);
  const [occurrenceStart, setOccurrenceStart] = useState<Date | undefined>(
    undefined
  );

  const caseHistoryOptions = useMemo(
    () => [
      {
        key: 'psychiatricDisorder',
        label: intl.formatMessage({
          id: 'patients.clinicalInfo.caseOfOptions.psychiatricDisorder',
        }),
      },
      {
        key: 'encephalicInjury',
        label: intl.formatMessage({
          id: 'patients.clinicalInfo.caseOfOptions.encephalicInjury',
        }),
      },
      {
        key: 'both',
        label: intl.formatMessage({
          id: 'patients.clinicalInfo.caseOfOptions.both',
        }),
      },
    ],
    [intl]
  );

  const manualPreferenceOptions = useMemo(
    () => [
      {
        key: 'l',
        label: intl.formatMessage({
          id: 'common.manualPreferences.leftHanded',
        }),
      },
      {
        key: 'r',
        label: intl.formatMessage({
          id: 'common.manualPreferences.rightHanded',
        }),
      },
      {
        key: 'a',
        label: intl.formatMessage({
          id: 'common.manualPreferences.ambidextrous',
        }),
      },
    ],
    [intl]
  );

  const physicalActivityOptions = useMemo(
    () => [
      {
        key: 'true',
        label: intl.formatMessage({
          id: 'common.physicalActivityLevels.no',
        }),
      },
      {
        key: 'false',
        label: intl.formatMessage({
          id: 'common.physicalActivityLevels.yes',
        }),
      },
    ],
    [intl]
  );

  useEffect(() => {
    if (
      icdPage - 1 === icdPagination.current_page &&
      icdPagination.search_text === `description=%${icdSearch}%`
    )
      return;

    dispatch(
      loadIcdRequest({
        filter: icdSearch ? `description=%${icdSearch}%` : undefined,
        limit: icdPagination.per_page,
        offset: icdPage - 1,
      })
    );
  }, [
    dispatch,
    icdPage,
    icdPagination.current_page,
    icdSearch,
    icdPagination.search_text,
    icdPagination.per_page,
  ]);

  useEffect(() => {
    if (!patientId) return;

    if (!existingPatient && !isFocusedPatientLoading) {
      dispatch(loadPatient(patientId));
      return;
    }

    if (!existingPatient) return;

    if (mode === VerbModes.Edit) setDisableEdit(true);

    if (existingPatient.manualPreference) {
      const option = manualPreferenceOptions.find(
        (option) => option.key === `${existingPatient.manualPreference}`
      );

      if (option) {
        setSelectedManualPreference(option);
      }
    }

    if (existingPatient.physicalActivity) {
      setSelectedPhysicalActivity(physicalActivityOptions[0]);
    } else {
      setSelectedPhysicalActivity(physicalActivityOptions[1]);
    }

    if (existingPatient.icdCodes.length) {
      // const icdOptions = existingPatient.icdCodes
      //   .map((icdCode) => icdReferenceMap[icdCode.id])
      //   .filter(Boolean)
      //   .map((icdRecord) => ({ key: icdRecord.id, label: icdRecord.label }));
      // if (icdOptions.length) {
      // }

      setSelectedIcdCodes(existingPatient.icdCodes.map((obj) => obj.id));
    }

    if (existingPatient.caseHistory) {
      const option = caseHistoryOptions.find(
        (option) => option.key === existingPatient.caseHistory
      );

      if (option) {
        setSelectedCaseHistory(option);
      }
    }

    if (existingPatient.startOccurrence) {
      const parsedDate = new Date(existingPatient.startOccurrence);

      if (+parsedDate) {
        setOccurrenceStart(parsedDate);
      }
    }

    // resizing fields
    if (diagnosisRef.current) {
      diagnosisRef.current.style.minHeight = 'auto';
      diagnosisRef.current.style.minHeight =
        diagnosisRef.current.scrollHeight + 'px';
    }

    if (cognitiveEmotionalComplaintsRef.current) {
      cognitiveEmotionalComplaintsRef.current.style.minHeight = 'auto';
      cognitiveEmotionalComplaintsRef.current.style.minHeight =
        cognitiveEmotionalComplaintsRef.current.scrollHeight + 'px';
    }

    if (performanceCapacityComplaintsRef.current) {
      performanceCapacityComplaintsRef.current.style.minHeight = 'auto';
      performanceCapacityComplaintsRef.current.style.minHeight =
        performanceCapacityComplaintsRef.current.scrollHeight + 'px';
    }

    if (familyHistoryRef.current) {
      familyHistoryRef.current.style.minHeight = 'auto';
      familyHistoryRef.current.style.minHeight =
        familyHistoryRef.current.scrollHeight + 'px';
    }

    if (additionalInfoRef.current) {
      additionalInfoRef.current.style.minHeight = 'auto';
      additionalInfoRef.current.style.minHeight =
        additionalInfoRef.current.scrollHeight + 'px';
    }
  }, [
    intl,
    patientId,
    existingPatient,
    manualPreferenceOptions,
    physicalActivityOptions,
    dispatch,
    isFocusedPatientLoading,
    caseHistoryOptions,
    mode,
  ]);

  const manualPreferenceField = {
    id: 'manual-preference',
    selectProps: {
      options: manualPreferenceOptions,
      selectedOptions: selectedManualPreference
        ? [selectedManualPreference]
        : [],
      onChange: ([option]: Option[]) => setSelectedManualPreference(option),
      placeholder: intl.formatMessage({
        id: 'patients.clinicalInfo.manualPreferencePlaceholder',
      }),
      labelText: intl.formatMessage({
        id: 'patients.clinicalInfo.manualPreferenceLabel',
      }),
    },
  };

  const caseHistoryField = {
    id: 'case-history',
    selectProps: {
      options: caseHistoryOptions,
      selectedOptions: selectedCaseHistory ? [selectedCaseHistory] : [],
      onChange: ([option]: Option[]) => {
        if (!option) {
          setOccurrenceStart(undefined);
        }

        setSelectedCaseHistory(option);
      },
      placeholder: intl.formatMessage({
        id: 'patients.clinicalInfo.caseHistoryPlaceholder',
      }),
      labelText: intl.formatMessage({
        id: 'patients.clinicalInfo.caseHistoryLabel',
      }),
    },
  };

  const clinicalInfoFields: Field[][] = [
    [
      {
        id: 'diagnosis',
        type: 'text',
        defaultValue: existingPatient?.diagnostic || undefined,
        ref: diagnosisRef,
        style: { marginRight: grid(4) },
        placeholder: intl.formatMessage({
          id: 'patients.clinicalInfo.diagnosisPlaceholder',
        }),
        labelText: intl.formatMessage({
          id: 'patients.clinicalInfo.diagnosisLabel',
        }),
      },
    ],
    [
      {
        id: 'cognitive-emotional-behaviour-complaints',
        type: 'text',
        defaultValue: existingPatient?.cognitiveDeficitComplaints || undefined,
        ref: cognitiveEmotionalComplaintsRef,
        style: { marginRight: grid(4) },
        placeholder: intl.formatMessage({
          id:
            'patients.clinicalInfo.cognitiveEmotionalBehaviourComplaintsPlaceholder',
        }),
        labelText: intl.formatMessage({
          id:
            'patients.clinicalInfo.cognitiveEmotionalBehaviourComplaintsLabel',
        }),
      },
    ],
    [
      {
        id: 'performance-capacity-complaints',
        type: 'text',
        defaultValue:
          existingPatient?.performanceCapacityComplaints || undefined,
        ref: performanceCapacityComplaintsRef,
        style: { marginRight: grid(4) },
        placeholder: intl.formatMessage({
          id: 'patients.clinicalInfo.performanceCapacityPlaceholder',
        }),
        labelText: intl.formatMessage({
          id: 'patients.clinicalInfo.performanceCapacityLevel',
        }),
      },
    ],
  ];

  const clinicalHistoryFields: Field[][] = [
    [
      {
        id: 'hospitalizations-count',
        type: 'number',
        min: 0,
        ref: hospitalizationsCountRef,
        defaultValue: existingPatient
          ? `${existingPatient.hospitalizations}`
          : '0',
        labelText: intl.formatMessage({
          id: 'patients.clinicalInfo.hospitalizationsCountLabel',
        }),
      },
      {
        id: 'physicalActivityStatus',
        selectProps: {
          options: physicalActivityOptions,
          selectedOptions: selectedPhysicalActivity
            ? [selectedPhysicalActivity]
            : [],
          onChange: ([option]: Option[]) => setSelectedPhysicalActivity(option),
          placeholder: intl.formatMessage({
            id: 'patients.clinicalInfo.physicalActivityStatusPlaceholder',
          }),
          labelText: intl.formatMessage({
            id: 'patients.clinicalInfo.physicalActivityStatusLabel',
          }),
        },
      },
    ],
    [
      {
        id: 'familyHistory',
        type: 'text',
        ref: familyHistoryRef,
        style: { marginRight: grid(4) },
        defaultValue: existingPatient?.familyHistory || undefined,
        placeholder: intl.formatMessage({
          id: 'patients.clinicalInfo.familyHistoryPlaceholder',
        }),
        labelText: intl.formatMessage({
          id: 'patients.clinicalInfo.familyHistoryLabel',
        }),
      },
    ],
    [
      {
        id: 'additionalInfo',
        type: 'text',
        ref: additionalInfoRef,
        style: { marginRight: grid(4) },
        defaultValue: existingPatient?.additionalInformation || undefined,
        placeholder: intl.formatMessage({
          id: 'patients.clinicalInfo.additionalInfoPlaceholder',
        }),
        labelText: intl.formatMessage({
          id: 'patients.clinicalInfo.additionalInfoLabel',
        }),
      },
    ],
  ];

  const buildPatientRecord = (): Patients.PatientRecordClinicalInformation => {
    return {
      manualPreference: selectedManualPreference
        ? parseInt(selectedManualPreference.key)
        : 0,
      icdCodes: selectedIcdCodes.map((option) => ({ id: option })),
      diagnostic: diagnosisRef.current?.value || '',
      startOccurrence: occurrenceStart?.toISOString() || null,
      startOccurrenceInformed: false,
      caseHistory: selectedCaseHistory?.key || null,
      hospitalizations:
        parseInt(hospitalizationsCountRef.current?.value || '') || 0,
      physicalActivity: selectedManualPreference
        ? selectedManualPreference.key === 'true'
          ? true
          : false
        : false,
      familyHistory: familyHistoryRef.current?.value || '',
      additionalInformation: additionalInfoRef.current?.value || '',
      cognitiveDeficitComplaints:
        cognitiveEmotionalComplaintsRef.current?.value || '',
      performanceCapacityComplaints:
        performanceCapacityComplaintsRef.current?.value || '',
    };
  };

  const onSubmit = () =>
    debounce((patientRecord: Patients.PatientRecordClinicalInformation) => {
      dispatch(
        editPatient(patientId, patientRecord, function onFinish() {
          navigate(ROUTE_PATIENTS_HOME);
        })
      );
    }, 500)(buildPatientRecord());

  const onEnableEditClick = () => {
    debounce(function onEnableEditClick() {
      setDisableEdit(false);
    }, 500)();
  };

  const icdPageItems = icdReferences.map((icd) => ({
    key: icd.id,
    label: icd.label,
  }));

  return (
    <>
      {(isFocusedPatientLoading ||
        isPatientWriteLoading ||
        isIcdReferencesLoading) && (
        <Dimmer active inverted>
          <Loader size="large" />
        </Dimmer>
      )}
      <ClinicalInfoComponent
        {...{
          onSubmit,
          occurrenceStart,
          onDateSelected: setOccurrenceStart,
          clinicalHistoryFields,
          clinicalInfoFields,
          manualPreferenceField,
          activeIcdPage: icdPage,
          totalIcdPages: Math.ceil(
            icdPagination.total / icdPagination.per_page
          ),
          icdPageItems,
          selectedIcds: selectedIcdCodes,
          onIcdPageChange: setIcdPage,
          onSelectedIcdsChange: setSelectedIcdCodes,
          onIcdSearchChange: setIcdSearch,
          isIcdReferencesLoading,
          caseHistoryField,
          selectedCaseHistory,
          disableEdit,
          onEnableEditClick,
        }}
      />
    </>
  );
};

export default ClinicalInfoContainer;
