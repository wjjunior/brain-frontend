import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import CoreSetFormFillingComponent from '../../../../components/Analysis/Types/CoreSet/FormFilling';
import { selectors } from '../../../../modules/analysis';
import { loadCoreSet } from '../../../../modules/analysis/actions';
import {
  ROUTE_ANALYSIS_CORESET_FINISH,
  ROUTE_ANALYSIS_CORESET_FORM_CATEGORIES,
  ROUTE_ANALYSIS_CORESET_PATIENT,
} from '../../../../modules/analysis/constants';
import { displayToast } from '../../../../modules/shared/actions';

const CoreSetFormFillingContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coreSet = useSelector(selectors.coreSet);
  const draftPatientId = useSelector(selectors.draftPatientId);
  const draftCoreSetId = useSelector(selectors.draftCoreSetId);
  const draftCoreSetIcfs = useSelector(selectors.draftCoreSetIcfs);
  const isCoreSetLoading = useSelector(selectors.isCoreSetLoading);

  function onNextClick() {
    if (Object.keys(draftCoreSetIcfs).length) {
      navigate(ROUTE_ANALYSIS_CORESET_FINISH);
    } else {
      dispatch(
        displayToast({
          id: 'analysis-coreset-not-filled',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'analysis.coreSet.coreSetNotFilled',
          timeout: 5e3,
        })
      );
    }
  }

  function onPreviousClick() {
    navigate(ROUTE_ANALYSIS_CORESET_FORM_CATEGORIES);
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
  }, [dispatch, draftPatientId, draftCoreSetId, navigate]);

  useEffect(() => {
    if (draftCoreSetId && coreSet?.id !== draftCoreSetId) {
      dispatch(loadCoreSet(draftCoreSetId));
    }
  }, [dispatch, draftCoreSetId, coreSet]);

  if (isCoreSetLoading || !coreSet) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  console.log('coreSet:', coreSet);
  return (
    <CoreSetFormFillingComponent
      coreSet={coreSet}
      onNextClick={onNextClick}
      onPreviousClick={onPreviousClick}
    />
  );
};

export default CoreSetFormFillingContainer;
