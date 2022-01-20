import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import SharedAnalysisPatientComponent from '../../../../components/Analysis/Shared/Patient';
import { Option } from '../../../../components/Select';
// import { updateFilledProspectiveResultMapDraft } from '../../../../modules/analysis/actions';
import {
  ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_MAP,
  DocumentTypes,
} from '../../../../modules/analysis/constants';
import { selectors } from '../../../../modules/patients';
import { selectors as analysisSelectors } from '../../../../modules/analysis';
import {
  loadPatient,
  loadPatientsRequest,
} from '../../../../modules/patients/actions';
import { debounce } from '../../../../utils/functional';
import {
  listPatientDiagnosticsRequest,
  markProspectiveResultMapProgress,
  selectProspectiveResultMapCoreSet,
  selectProspectiveResultMapPatient,
} from '../../../../modules/analysis/actions';
import { displayToast } from '../../../../modules/shared/actions';
import { useIntl } from 'react-intl';

type PossibleQueryString = {
  patientId?: string;
};

const ProspectiveResultMapPatientContainer: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patientsList = useSelector(selectors.patientsList);
  const draftPatientId = useSelector(
    analysisSelectors.draftProspectiveResultMapPatientId
  );
  const focusedPatient = useSelector(selectors.focusedPatient);
  const isPatientsListLoading = useSelector(selectors.isPatientsListLoading);
  const isFocusedPatientLoading = useSelector(
    selectors.isFocusedPatientLoading
  );
  const isPatientDiagnosticsLoading = useSelector(
    analysisSelectors.isPatientDiagnosticsLoading
  );
  const focusedPatientDiagnostics = useSelector(
    analysisSelectors.focusedPatientDiagnostics
  );
  const [selectedPatient, setSelectedPatient] = useState<Option | null>(null);
  const [selectedCoreSet, setSelectedCoreSet] = useState<Option | null>(null);
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
      dispatch(selectProspectiveResultMapPatient(option.key));
      dispatch(
        listPatientDiagnosticsRequest(option.key, DocumentTypes.CoreSet)
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (!patientsList && !isPatientsListLoading) {
      dispatch(loadPatientsRequest());
    }
  }, [dispatch, patientsList, isPatientsListLoading]);

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
    if (
      focusedPatient &&
      focusedPatient.id &&
      !selectedPatient &&
      draftPatientId
    ) {
      updateSelectedPatient([
        {
          key: focusedPatient.id,
          label: focusedPatient.name,
        },
      ]);
    }

    if (!draftPatientId && typeof query.patientId !== 'string') {
      setSelectedPatient(null);
    }
  }, [
    dispatch,
    focusedPatient,
    selectedPatient,
    draftPatientId,
    updateSelectedPatient,
    query.patientId,
  ]);

  if (
    isPatientsListLoading ||
    !patientsList ||
    isFocusedPatientLoading ||
    isPatientDiagnosticsLoading
  ) {
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
    if (selectedPatient && selectedCoreSet) {
      // initialize draft with selectedPatient.key
      dispatch(selectProspectiveResultMapPatient(selectedPatient.key));
      const [coreSetId, diagnosticId] = selectedCoreSet.key.split(':');
      dispatch(selectProspectiveResultMapCoreSet(coreSetId, diagnosticId));
      dispatch(markProspectiveResultMapProgress('patient'));
      navigate(ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_MAP);
    } else {
      if (!selectedPatient) {
        return dispatch(
          displayToast({
            id: 'prospective-result-map-patient-missing',
            kind: 'info',
            titleKey: 'common.hey',
            subtitleKey: 'common.patientNotSelected',
            timeout: 5e3,
          })
        );
      }

      if (!selectedCoreSet) {
        return dispatch(
          displayToast({
            id: 'prospective-result-map-patient-missing',
            kind: 'info',
            titleKey: 'common.hey',
            subtitleKey: 'common.diagnosticNotSelected',
            timeout: 5e3,
          })
        );
      }
    }
  }

  function onCoreSetSelection(options: Option[]) {
    const [option] = options;
    const [coreSetId, diagnosticId] = option.key.split(':');

    setSelectedCoreSet(option);
    dispatch(selectProspectiveResultMapCoreSet(coreSetId, diagnosticId));
  }

  const coreSetOptions = focusedPatientDiagnostics
    ? focusedPatientDiagnostics.map((diagnostic) => ({
        key: diagnostic.coreSet.id + ':' + diagnostic.id,
        label: `${diagnostic.coreSet.description} - ${
          diagnostic.code
        } - ${intl.formatDate(diagnostic.created)} ${intl.formatTime(
          diagnostic.created
        )}`,
      }))
    : [];

  return (
    <SharedAnalysisPatientComponent
      selectedPatient={selectedPatient || undefined}
      patientOptions={patientOptions}
      onPatientSelection={updateSelectedPatient}
      onSearchChange={debounce(onSearchChange, 500)}
      onNextClick={onNextClick}
      coreSetOptions={coreSetOptions}
      selectedCoreSet={selectedCoreSet || undefined}
      onCoreSetSelection={onCoreSetSelection}
    />
  );
};

export default ProspectiveResultMapPatientContainer;
