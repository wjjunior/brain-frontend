import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import { Header, Row } from '../../../components/Table';
import {
  ROUTE_ANALYSIS_CREATE_CORESET,
  ROUTE_ANALYSIS_REPORT_CORESET,
} from '../../../modules/analysis/constants';
import { selectors, actions } from '../../../modules/analysis';
import SharedPatientAnalysisComponent from '../../../components/Patients/Analysis';
import RowOptions from '../RowOptions';

interface IPatientHealthImpactAnalysisProps {}

const PatientHealthImpactAnalysis: React.FC<IPatientHealthImpactAnalysisProps> = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: patientId } = useParams();
  const focusedPatientDiagnostics = useSelector(
    selectors.focusedPatientDiagnostics
  );
  const isPatientDiagnosticsLoading = useSelector(
    selectors.isPatientDiagnosticsLoading
  );

  useEffect(() => {
    if (!focusedPatientDiagnostics && !isPatientDiagnosticsLoading) {
      dispatch(actions.listPatientDiagnosticsRequest(patientId, 'CoreSet'));
    }
  }, [
    dispatch,
    patientId,
    focusedPatientDiagnostics,
    isPatientDiagnosticsLoading,
  ]);

  const tableHeaders: Header[] = [
    // {
    //   key: 'name',
    //   label: intl.formatMessage({
    //     id: 'common.name',
    //   }),
    //   cellProps: {
    //     textAlign: 'left',
    //   },
    // },
    {
      key: 'code',
      label: intl.formatMessage({
        id: 'common.code',
      }),
    },
    {
      key: 'createdAt',
      label: intl.formatMessage({
        id: 'common.date',
      }),
    },
    {
      key: 'options',
      label: intl.formatMessage({
        id: 'common.options',
      }),
    },
  ];

  if (!focusedPatientDiagnostics || isPatientDiagnosticsLoading) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  const tableRows: Row[] = focusedPatientDiagnostics.map((row) => ({
    ...row,
    createdAt: intl.formatDate(row.created),
    options: (
      <RowOptions
        diagnosticReportUrl={ROUTE_ANALYSIS_REPORT_CORESET.replace(
          ':patientId',
          patientId
        )
          .replace(':coreSetId', row.coreSet.id)
          .replace(':id', row.id)}
      />
    ),
  }));
  const pagination = {
    activePage: 1,
    totalPages: 5,
    onPageChange: () => null,
  };

  const onButtonClick = () =>
    navigate(ROUTE_ANALYSIS_CREATE_CORESET + `?patientId=${patientId}`);

  return (
    <SharedPatientAnalysisComponent
      title={intl.formatMessage({ id: 'patients.healthImpactsTitle' })}
      buttonText={intl.formatMessage({ id: 'common.createAnalysis' })}
      {...{
        onButtonClick,
        tableHeaders,
        tableRows,
        pagination,
      }}
    />
  );
};

export default PatientHealthImpactAnalysis;
