import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NeuropsichologicalProfileFinishComponent from '../../../../components/Analysis/Types/NeuropsichologicalProfile/Finish';
import { selectors } from '../../../../modules/analysis';
import { selectors as patientSelectors } from '../../../../modules/patients';
import {
  markNeuropsichologicalProfileProgress,
  saveNeuropsichologicalProfileRequest,
} from '../../../../modules/analysis/actions';
import {
  ROUTE_ANALYSIS_HOME,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_PATIENT,
} from '../../../../modules/analysis/constants';
import { displayToast } from '../../../../modules/shared/actions';
import { loadPatient } from '../../../../modules/patients/actions';
import { Dimmer, Loader } from 'semantic-ui-react';

const NeuropsichologicalProfileFinishContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draftNeuropsichologicalProfileForm = useSelector(
    selectors.draftNeuropsichologicalProfileForm
  );
  const draftNeuropsichologicalProfileAdditionalInfo = useSelector(
    selectors.draftNeuropsichologicalProfileAdditionalInfo
  );
  const focusedPatient = useSelector(patientSelectors.focusedPatient);
  const isFocusedPatientLoading = useSelector(
    patientSelectors.isFocusedPatientLoading
  );

  const draftPatientId = useSelector(
    selectors.draftNeuropsichologicalProfilePatientId
  );
  const isNeuropsichologicalProfileSaving = useSelector(
    selectors.isNeuropsichologicalProfileSaving
  );

  const onPreviousClick = () =>
    navigate(ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO);
  const onNextClick = () => {
    if (draftPatientId) {
      dispatch(
        saveNeuropsichologicalProfileRequest(
          draftPatientId,
          draftNeuropsichologicalProfileForm,
          draftNeuropsichologicalProfileAdditionalInfo,
          () => navigate(ROUTE_ANALYSIS_HOME)
        )
      );
    }
  };

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

    dispatch(markNeuropsichologicalProfileProgress('finish'));
  }, [draftPatientId, dispatch, navigate]);

  useEffect(() => {
    if (
      draftPatientId &&
      draftPatientId !== focusedPatient?.id &&
      !isFocusedPatientLoading
    ) {
      dispatch(loadPatient(draftPatientId));
    }
  }, [dispatch, focusedPatient, draftPatientId, isFocusedPatientLoading]);

  if (
    isFocusedPatientLoading ||
    !focusedPatient ||
    isNeuropsichologicalProfileSaving
  ) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  return (
    <NeuropsichologicalProfileFinishComponent
      patientName={focusedPatient.name}
      onPreviousClick={onPreviousClick}
      onNextClick={onNextClick}
    />
  );
};

export default NeuropsichologicalProfileFinishContainer;
