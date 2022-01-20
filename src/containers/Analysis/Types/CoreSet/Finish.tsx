import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SharedAnalysisFinishComponent from '../../../../components/Analysis/Shared/Finish';
import {
  ROUTE_ANALYSIS_CORESET_FORM_CATEGORIES,
  ROUTE_ANALYSIS_CORESET_FORM_FILLING,
  ROUTE_ANALYSIS_CORESET_PATIENT,
  ROUTE_ANALYSIS_REPORT_CORESET,
} from '../../../../modules/analysis/constants';
import { selectors } from '../../../../modules/analysis';
import { selectors as patientSelectors } from '../../../../modules/patients';
import { Dimmer, Loader } from 'semantic-ui-react';
import { loadPatient } from '../../../../modules/patients/actions';
import {
  saveCoreSetRequest,
  loadCoreSet,
} from '../../../../modules/analysis/actions';
import { displayToast } from '../../../../modules/shared/actions';

const CoreSetFinishContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draftCoreSetId = useSelector(selectors.draftCoreSetId);
  const draftPatientId = useSelector(selectors.draftPatientId);
  const draftCoreSetIcfs = useSelector(selectors.draftCoreSetIcfs);
  const coreSet = useSelector(selectors.coreSet);
  const isCoreSetLoading = useSelector(selectors.isCoreSetLoading);
  const focusedPatient = useSelector(patientSelectors.focusedPatient);
  const isFocusedPatientLoading = useSelector(
    patientSelectors.isFocusedPatientLoading
  );
  const isCoreSetSaving = useSelector(selectors.isCoreSetLoading);

  function onNextClick() {
    if (draftPatientId && coreSet && draftCoreSetIcfs) {
      dispatch(
        saveCoreSetRequest(
          draftPatientId,
          coreSet.id,
          Object.entries(draftCoreSetIcfs).map(([key, icf]) => ({
            id: key,
            description: icf.description || '',
            answers: Object.values(icf.answers).map((id) => ({ id })),
            informationSources: (
              icf.informationSourceIds || []
            ).map((infoSourceId) => ({ id: infoSourceId })),
          })),
          (newDiagnosticId) =>
            navigate(
              ROUTE_ANALYSIS_REPORT_CORESET.replace(
                ':patientId',
                draftPatientId
              )
                .replace(':coreSetId', coreSet.id)
                .replace(':id', newDiagnosticId)
            )
        )
      );
    }
  }

  function onPreviousClick() {
    navigate(ROUTE_ANALYSIS_CORESET_FORM_FILLING);
  }

  useEffect(() => {
    if (!draftPatientId) {
      dispatch(
        displayToast({
          id: 'analysis-coreset-patient-not-selected',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.patientNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_CORESET_PATIENT);
      return;
    }

    if (!draftCoreSetId) {
      dispatch(
        displayToast({
          id: 'analysis-coreset-coreset-not-selected',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'analysis.coreSet.coreSetNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_CORESET_FORM_CATEGORIES);
      return;
    }

    if (!Object.keys(draftCoreSetIcfs).length) {
      dispatch(
        displayToast({
          id: 'analysis-coreset-form-empty',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'analysis.coreSet.formEmpty',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_CORESET_FORM_FILLING);
      return;
    }
  }, [draftPatientId, draftCoreSetId, navigate, draftCoreSetIcfs, dispatch]);

  useEffect(() => {
    if (
      draftPatientId &&
      draftPatientId !== focusedPatient?.id &&
      !isFocusedPatientLoading
    ) {
      dispatch(loadPatient(draftPatientId));
    }
  }, [dispatch, focusedPatient, draftPatientId, isFocusedPatientLoading]);

  useEffect(() => {
    if (draftCoreSetId && draftCoreSetId !== coreSet?.id && !isCoreSetLoading) {
      dispatch(loadCoreSet(draftCoreSetId));
    }
  }, [dispatch, coreSet, draftCoreSetId, isCoreSetLoading]);

  if (
    isCoreSetLoading ||
    isFocusedPatientLoading ||
    isCoreSetSaving ||
    !focusedPatient ||
    !coreSet
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
      coreSetCategoryName={coreSet.description}
      onPreviousClick={onPreviousClick}
      onNextClick={onNextClick}
    />
  );
};

export default CoreSetFinishContainer;
