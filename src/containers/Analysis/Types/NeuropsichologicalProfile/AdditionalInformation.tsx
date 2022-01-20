import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NeuropsichologicalProfileAdditionalInformationComponent from '../../../../components/Analysis/Types/NeuropsichologicalProfile/AdditionalInformation';
import { Option } from '../../../../components/Select';
import { selectors } from '../../../../modules/analysis';
import {
  markNeuropsichologicalProfileProgress,
  removeNeuropsichologicalProfileMedication,
  updateNeuropsichologicalProfileAdditionalInfo,
  updateNeuropsichologicalProfileMedication,
} from '../../../../modules/analysis/actions';
import {
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_COGNITIVE_FUNCTIONS,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_FINISH,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_PATIENT,
} from '../../../../modules/analysis/constants';
import { Analysis } from '../../../../modules/analysis/types';
import { displayToast } from '../../../../modules/shared/actions';
import { debounce } from '../../../../utils/functional';

const NeuropsichologicalProfileAdditionalInformationContainer: React.FC = () => {
  const intl = useIntl();
  const getIntlOptions = useCallback(
    function (prefix: string, order?: boolean): Option[] {
      const options = Object.keys(intl.messages)
        .filter((key) => key.includes(prefix))
        .map((key) => ({
          key: key.replace(prefix, ''),
          label: intl.formatMessage({ id: key }),
        }));

      if (order) {
        return options.sort((a, b) =>
          b.label > a.label ? -1 : a.label > b.label ? 1 : 0
        );
      }

      return options;
    },
    [intl]
  );

  const medicationOptions = useMemo(
    () =>
      getIntlOptions(
        'analysis.neuropsichologicalProfile.medicationOptions.',
        true
      ),
    [getIntlOptions]
  );

  const drugUsageOptions = useMemo(
    () =>
      getIntlOptions('analysis.neuropsichologicalProfile.drugUsageOptions.'),
    [getIntlOptions]
  );

  const drugFrequencyOptions = useMemo(
    () =>
      getIntlOptions(
        'analysis.neuropsichologicalProfile.drugFrequencyOptions.'
      ),
    [getIntlOptions]
  );

  const dispatch = useDispatch();
  const draftPatientId = useSelector(
    selectors.draftNeuropsichologicalProfilePatientId
  );

  const navigate = useNavigate();
  const onPreviousClick = () =>
    navigate(ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_COGNITIVE_FUNCTIONS);
  const onNextClick = () =>
    navigate(ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_FINISH);

  useEffect(() => {
    if (!draftPatientId) {
      dispatch(
        displayToast({
          id: 'neuropsichological-profile-patient-missing',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.patientNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_PATIENT);
      return;
    }

    dispatch(markNeuropsichologicalProfileProgress('additionalInformation'));
  }, [draftPatientId, dispatch, navigate]);

  const draftAdditionalInfo = useSelector(
    selectors.draftNeuropsichologicalProfileAdditionalInfo
  );
  const [selectedMedication, setSelectedMedication] = useState<Option[][]>(
    draftAdditionalInfo.medication.length
      ? draftAdditionalInfo.medication.map((medication) =>
          medicationOptions.filter(
            (option) => option.key === medication.medicationClass
          )
        )
      : [[]]
  );
  const [selectedDrugUsage, setSelectedDrugUsage] = useState<Option[]>(
    drugUsageOptions.filter(
      (option) => option.key === String(draftAdditionalInfo.drugUsage)
    )
  );
  const [selectedDrugFrequency, setSelectedDrugFrequency] = useState<Option[]>(
    drugFrequencyOptions.filter(
      (option) => option.key === draftAdditionalInfo.drugFrequency
    )
  );

  const dispatchUpdateAdditionalInfo = debounce(
    (
      fieldName: Analysis.NeuropsichologicalAdditionalInfoKeys,
      fieldValue: string | number | boolean
    ) =>
      dispatch(
        updateNeuropsichologicalProfileAdditionalInfo({
          [fieldName]: fieldValue,
        })
      ),
    300
  );

  const dispatchUpdateMedication = debounce(
    (
      index: number,
      medicationClass: Analysis.NeuropsichologicalMedicationClasses,
      dosage?: string
    ) =>
      dispatch(
        updateNeuropsichologicalProfileMedication({
          index,
          medicationClass,
          dosage,
        })
      ),
    500
  );

  const onTextFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fieldName = e.target
        .name as Analysis.NeuropsichologicalAdditionalInfoKeys;
      const fieldType = e.target.type;
      const fieldValue =
        fieldType === 'number' ? parseInt(e.target.value) : e.target.value;

      dispatch(
        updateNeuropsichologicalProfileAdditionalInfo({
          [fieldName]: fieldValue,
        })
      );
    },
    [dispatch]
  );

  function onMedicationSelect(options: Option[], index: number) {
    dispatchUpdateMedication(index, options[0].key);

    setSelectedMedication((currentState) =>
      currentState.map((medication, jIndex) =>
        index === jIndex ? options : medication
      )
    );
  }

  function onMedicationDosageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    medicationClass: Analysis.NeuropsichologicalMedicationClasses
  ) {
    dispatchUpdateMedication(index, medicationClass, e.target.value);
  }

  function addMedication() {
    if (selectedMedication.some((options) => !options.length)) return;
    if (draftAdditionalInfo.medication.some((medication) => !medication.dosage))
      return;
    setSelectedMedication((currentState) => [...currentState, []]);
  }

  function removeMedication(index: number) {
    dispatch(removeNeuropsichologicalProfileMedication(index));
    setSelectedMedication((currentState) =>
      currentState.filter((_, jIndex) => index !== jIndex)
    );
  }

  function onDrugUsageSelect(options: Option[]) {
    setSelectedDrugUsage(options);
    dispatchUpdateAdditionalInfo(
      'drugUsage',
      options[0].key === 'true' ? true : false
    );
  }

  function onDrugFrequencySelect(options: Option[]) {
    setSelectedDrugFrequency(options);
    dispatchUpdateAdditionalInfo('drugFrequency', options[0].key);
  }

  function onDiagnosisAgeSelected(dateObj: Date) {
    dispatchUpdateAdditionalInfo('diagnosisAge', dateObj.toISOString());
  }

  return (
    <NeuropsichologicalProfileAdditionalInformationComponent
      {...{
        medicationOptions,
        drugUsageOptions,
        drugFrequencyOptions,
        selectedMedication,
        selectedDrugUsage,
        selectedDrugFrequency,
        medicationDosages: draftAdditionalInfo.medication.map(
          (medication) => medication.dosage
        ),
        draftAdditionalInfo,
        onNextClick,
        onPreviousClick,
        onTextFieldChange,
        onMedicationSelect,
        addMedication,
        removeMedication,
        onDrugUsageSelect,
        onDrugFrequencySelect,
        onMedicationDosageChange,
        onDiagnosisAgeSelected,
      }}
    />
  );
};

export default NeuropsichologicalProfileAdditionalInformationContainer;
