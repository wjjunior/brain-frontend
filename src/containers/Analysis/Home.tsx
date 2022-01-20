import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { subDays, format } from 'date-fns';

import InternalError from '../../components/Errors/InternalError';
import AnalysisHomeComponent from '../../components/Analysis/Home';
import { Option } from '../../components/Select';
import { selectors, actions } from '../../modules/analysis';
import { selectors as patientsSelectors } from '../../modules/patients';
import { loadPatientsRequest } from '../../modules/patients/actions';
import { debounce } from '../../utils/functional';

const isoWithoutMillis = (d: Date) => d.toISOString().split('.')[0];

export default function AnalysisHomeContainer() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const analysisList = useSelector(selectors.analysis);
  const pagination = useSelector(selectors.pagination);
  const isAnalysisLoading = useSelector(selectors.isAnalysisLoading);
  const didAnalysisError = useSelector(selectors.didAnalysisError);

  const patientsList = useSelector(patientsSelectors.patientsList);
  const didPatientsError = useSelector(patientsSelectors.didPatientsError);
  const isPatientsListLoading = useSelector(
    patientsSelectors.isPatientsListLoading
  );

  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Option | null>(null);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<Option[]>(
    []
  );

  const [dateRange, setDateRange] = useState(
    format(subDays(new Date(), 7), 'yyyy-MM-dd')
  );
  const [dateRangeSelectedOption, setDateRangeSelectedOption] = useState({
    key: '7',
    label: intl.formatMessage({ id: 'dashboard.lastXDays' }, { days: 7 }),
  });

  function onSearchChange(term: string) {
    dispatch(
      loadPatientsRequest(term ? { filter: `name=%${term}%` } : undefined)
    );
  }

  const dateRangeOptions = [
    {
      key: '7',
      label: intl.formatMessage({ id: 'dashboard.lastXDays' }, { days: 7 }),
    },
    {
      key: '14',
      label: intl.formatMessage({ id: 'dashboard.lastXDays' }, { days: 14 }),
    },
    {
      key: '28',
      label: intl.formatMessage({ id: 'dashboard.lastXDays' }, { days: 28 }),
    },
  ];

  useEffect(() => {
    if (!patientsList && !isPatientsListLoading && !didPatientsError) {
      dispatch(loadPatientsRequest());
    }
  }, [dispatch, patientsList, isPatientsListLoading, didPatientsError]);

  useEffect(() => {
    dispatch(
      actions.loadAnalysisRequest({
        offset,
        limit: pagination.per_page,
        filter,
      })
    );
  }, [offset, dispatch, pagination.per_page, filter]);

  useEffect(() => {
    const filterArr = [];

    if (selectedPatient) {
      filterArr.push({
        'patient.name': `=%${selectedPatient.label}%`,
      });
    }

    if (selectedAnalysisType.length) {
      filterArr.push({
        DiagnosticType: `=${selectedAnalysisType[0].key}`,
      });
    }

    if (dateRange) {
      filterArr.push({
        created: `>${isoWithoutMillis(new Date(dateRange))}z`,
      });
    }

    setFilter(
      filterArr
        .map((filterPart) => Object.entries(filterPart)[0].join(''))
        .join(';')
    );
  }, [selectedPatient, selectedAnalysisType, dateRange]);

  if (
    isAnalysisLoading ||
    !analysisList ||
    !patientsList ||
    isPatientsListLoading
  ) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  if (!isAnalysisLoading && didAnalysisError) {
    return <InternalError />;
  }

  const onPageChange = (page: number): void => {
    const offset = page - 1;
    setOffset(offset);
  };

  const patientOptions: Option[] = patientsList.map((patient) => ({
    key: patient.id,
    label: patient.name,
  }));

  const updateSelectedPatient = (options: Option[]) => {
    const [option] = options;
    setSelectedPatient(option);
  };

  const resetFilters = () => {
    setFilter('');
    setSelectedPatient(null);
  };

  const analysisTypeOptions = [
    {
      key: 'CoreSet',
      label: intl.formatMessage({ id: 'common.analysis.coreSet' }),
    },
    {
      key: 'ProspectiveResultMap',
      label: intl.formatMessage({ id: 'common.analysis.prospectiveResultMap' }),
    },
    {
      key: 'GlobalPrognostic',
      label: intl.formatMessage({ id: 'common.analysis.globalPrognostic' }),
    },
    {
      key: 'NeuropsichologicalProfile',
      label: intl.formatMessage({
        id: 'common.analysis.neuropsichologicalProfile',
      }),
    },
  ];

  const onDateRangeSelect = (days: string) => {
    setDateRange(format(subDays(new Date(), parseInt(days)), 'yyyy-MM-dd'));
    setDateRangeSelectedOption({
      key: days,
      label: intl.formatMessage(
        { id: 'dashboard.lastXDays' },
        { days: parseInt(days) }
      ),
    });
  };

  return (
    <AnalysisHomeComponent
      dateRangeSelectedOption={dateRangeSelectedOption}
      dateRangeOptions={dateRangeOptions}
      analysisRows={analysisList}
      activePage={pagination.current_page}
      totalPages={pagination.last_page}
      onPageChange={onPageChange}
      selectedPatient={selectedPatient || undefined}
      patientOptions={patientOptions}
      onPatientSelection={updateSelectedPatient}
      onSearchChange={debounce(onSearchChange, 500)}
      resetFilters={resetFilters}
      selectedAnalysisType={selectedAnalysisType || undefined}
      analysisTypeOptions={analysisTypeOptions}
      onAnalysisTypeSelect={setSelectedAnalysisType}
      onDateRangeSelect={onDateRangeSelect}
    />
  );
}
