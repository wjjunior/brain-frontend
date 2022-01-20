import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import SharedAnalysisFinishComponent from '../../../../components/Analysis/Shared/Finish';
import { selectors } from '../../../../modules/analysis';
import {
  markProspectiveResultMapProgress,
  saveProspectiveResultMapRequest,
} from '../../../../modules/analysis/actions';
import {
  ROUTE_ANALYSIS_HOME,
  ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_MAP,
  ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_PATIENT,
  // ROUTE_ANALYSIS_REPORT_PROSPECTIVE_RESULT_MAP,
} from '../../../../modules/analysis/constants';
import { selectors as patientSelectors } from '../../../../modules/patients';
import { loadPatient } from '../../../../modules/patients/actions';
import { displayToast } from '../../../../modules/shared/actions';

const ProspectiveResultMapFinishContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draftCoreSetId = useSelector(
    selectors.draftProspectiveResultMapCoreSetId
  );
  const draftDiagnosticId = useSelector(
    selectors.draftProspectiveResultMapDiagnosticId
  );
  // const coreSet = useSelector(selectors.coreSet);
  // const isCoreSetLoading = useSelector(selectors.isCoreSetLoading);
  const focusedPatient = useSelector(patientSelectors.focusedPatient);
  const isFocusedPatientLoading = useSelector(
    patientSelectors.isFocusedPatientLoading
  );
  const isProspectiveResultMapSaving = useSelector(
    selectors.isProspectiveResultMapSaving
  );

  const draftPatientId = useSelector(
    selectors.draftProspectiveResultMapPatientId
  );

  function onNextClick() {
    if (draftPatientId && draftCoreSetId && draftDiagnosticId) {
      dispatch(
        saveProspectiveResultMapRequest(
          draftPatientId,
          draftCoreSetId,
          draftDiagnosticId,
          (newDiagnosticId) => {
            navigate(ROUTE_ANALYSIS_HOME);
            // navigate(
            //   ROUTE_ANALYSIS_REPORT_PROSPECTIVE_RESULT_MAP.replace(
            //     ':patientId',
            //     draftPatientId
            //   )
            //     .replace(':coreSetId', draftCoreSetId)
            //     .replace(':id', newDiagnosticId)
            // );
          }
        )
      );
    }
  }

  function onPreviousClick() {
    navigate(ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_MAP);
  }

  useEffect(() => {
    if (!draftPatientId) {
      dispatch(
        displayToast({
          id: 'prospective-result-map-patient-missing',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.patientNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_PATIENT);
      return;
    }

    dispatch(markProspectiveResultMapProgress('finish'));
  }, [draftPatientId, dispatch, navigate]);

  // useEffect(() => {
  //   if (!draftPatientId) {
  //     dispatch(
  //       displayToast({
  //         id: 'analysis-coreset-patient-not-selected',
  //         kind: 'info',
  //         titleKey: 'common.hey',
  //         subtitleKey: 'common.patientNotSelected',
  //         timeout: 5e3,
  //       })
  //     );
  //     navigate(ROUTE_ANALYSIS_CORESET_PATIENT);
  //     return;
  //   }

  //   if (!draftCoreSetId) {
  //     dispatch(
  //       displayToast({
  //         id: 'analysis-coreset-coreset-not-selected',
  //         kind: 'info',
  //         titleKey: 'common.hey',
  //         subtitleKey: 'analysis.coreSet.coreSetNotSelected',
  //         timeout: 5e3,
  //       })
  //     );
  //     navigate(ROUTE_ANALYSIS_CORESET_FORM_CATEGORIES);
  //     return;
  //   }

  //   if (!Object.keys(draftCoreSetIcfs).length) {
  //     dispatch(
  //       displayToast({
  //         id: 'analysis-coreset-form-empty',
  //         kind: 'info',
  //         titleKey: 'common.hey',
  //         subtitleKey: 'analysis.coreSet.formEmpty',
  //         timeout: 5e3,
  //       })
  //     );
  //     navigate(ROUTE_ANALYSIS_CORESET_FORM_FILLING);
  //     return;
  //   }
  // }, [draftPatientId, draftCoreSetId, navigate, draftCoreSetIcfs, dispatch]);

  useEffect(() => {
    if (
      draftPatientId &&
      draftPatientId !== focusedPatient?.id &&
      !isFocusedPatientLoading
    ) {
      dispatch(loadPatient(draftPatientId));
    }
  }, [dispatch, focusedPatient, draftPatientId, isFocusedPatientLoading]);

  // useEffect(() => {
  //   if (draftCoreSetId && draftCoreSetId !== coreSet?.id && !isCoreSetLoading) {
  //     dispatch(loadCoreSet(draftCoreSetId));
  //   }
  // }, [dispatch, coreSet, draftCoreSetId, isCoreSetLoading]);

  if (
    isFocusedPatientLoading ||
    !focusedPatient ||
    isProspectiveResultMapSaving
  ) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  return (
    <SharedAnalysisFinishComponent
      patientName={focusedPatient.name}
      onPreviousClick={onPreviousClick}
      onNextClick={onNextClick}
    />
  );
};

export default ProspectiveResultMapFinishContainer;
