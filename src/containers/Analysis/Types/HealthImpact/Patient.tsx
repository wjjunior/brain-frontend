import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import SharedAnalysisPatientComponent from '../../../../components/Analysis/Shared/Patient';
import { Option } from '../../../../components/Select';
// import { updateFilledHealthImpactDraft } from '../../../../modules/analysis/actions';
import { ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK } from '../../../../modules/analysis/constants';
import { selectors } from '../../../../modules/patients';
import { selectors as analysisSelectors } from '../../../../modules/analysis';
import {
  loadPatient,
  loadPatientsRequest,
} from '../../../../modules/patients/actions';
import { debounce } from '../../../../utils/functional';
import {
  markHealthImpactProgress,
  selectHealthImpactPatient,
} from '../../../../modules/analysis/actions';
import { displayToast } from '../../../../modules/shared/actions';

type PossibleQueryString = {
  patientId?: string;
};

const HealthImpactPatientContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patientsList = useSelector(selectors.patientsList);
  const draftPatientId = useSelector(
    analysisSelectors.draftHealthImpactPatientId
  );
  const focusedPatient = useSelector(selectors.focusedPatient);
  const isPatientsListLoading = useSelector(selectors.isPatientsListLoading);
  const didPatientsError = useSelector(selectors.didPatientsError);
  const isFocusedPatientLoading = useSelector(
    selectors.isFocusedPatientLoading
  );
  const [selectedPatient, setSelectedPatient] = useState<Option | null>(null);
  const { search } = useLocation();

  const query: PossibleQueryString = useMemo(
    () =>
      search
        .substr(1)
        .split('&')
        .map((pair) => pair.split('='))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    [search]
  );

  function onSearchChange(term: string) {
    dispatch(
      loadPatientsRequest(term ? { filter: `name=%${term}%` } : undefined)
    );
  }

  const updateSelectedPatient = useCallback(
    function (options: Option[]) {
      // since we're handling only one option this is valid:
      const [option] = options;
      setSelectedPatient(option);

      // initialize draft with selectedPatient.key
      dispatch(selectHealthImpactPatient(option.key));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!patientsList && !isPatientsListLoading && !didPatientsError) {
      dispatch(loadPatientsRequest());
    }
  }, [dispatch, patientsList, isPatientsListLoading, didPatientsError]);

  useEffect(() => {
    const patientId = draftPatientId || query.patientId;

    if (
      patientId &&
      patientId !== focusedPatient?.id &&
      !isFocusedPatientLoading
    ) {
      if (draftPatientId) {
        dispatch(loadPatient(draftPatientId));
      } else if (typeof query.patientId === 'string') {
        dispatch(loadPatient(query.patientId));
      }
    }
  }, [
    dispatch,
    query,
    draftPatientId,
    focusedPatient,
    isFocusedPatientLoading,
  ]);

  useEffect(() => {
    if (focusedPatient && focusedPatient.id && !selectedPatient) {
      updateSelectedPatient([
        {
          key: focusedPatient.id,
          label: focusedPatient.name,
        },
      ]);
    }
  }, [dispatch, focusedPatient, selectedPatient, updateSelectedPatient]);

  if (isPatientsListLoading || !patientsList || isFocusedPatientLoading) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  const patientOptions: Option[] = patientsList.map((patient) => ({
    key: patient.id,
    label: patient.name,
  }));

  function onNextClick() {
    if (selectedPatient) {
      // initialize draft with selectedPatient.key
      dispatch(selectHealthImpactPatient(selectedPatient.key));
      dispatch(markHealthImpactProgress('patient'));
      navigate(ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK);
    } else {
      dispatch(
        displayToast({
          id: 'health-impact-patient-missing',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.patientNotSelected',
          timeout: 5e3,
        })
      );
    }
  }

  return (
    <SharedAnalysisPatientComponent
      selectedPatient={selectedPatient || undefined}
      patientOptions={patientOptions}
      onPatientSelection={updateSelectedPatient}
      onSearchChange={debounce(onSearchChange, 500)}
      onNextClick={onNextClick}
    />
  );
};

export default HealthImpactPatientContainer;
