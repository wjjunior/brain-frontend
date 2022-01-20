import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import SharedPatientAnalysisComponent from '../../../components/Patients/Analysis';
import { Header, Row } from '../../../components/Table';
import { selectors, actions } from '../../../modules/analysis';
import {
  ROUTE_ANALYSIS_CREATE_NEUROPSICHOLOGICAL_PROFILE,
  ROUTE_ANALYSIS_REPORT_NEUROPSICHOLOGICAL_PROFILE,
} from '../../../modules/analysis/constants';
import RowOptions from '../RowOptions';

interface IPatientNeuropsichologicalProfilesAnalysisProps {}

const PatientNeuropsichologicalProfilesAnalysis: React.FC<IPatientNeuropsichologicalProfilesAnalysisProps> = () => {
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
      dispatch(
        actions.listPatientDiagnosticsRequest(patientId, 'GlobalPrognostic')
      );
    }
  }, [
    dispatch,
    patientId,
    focusedPatientDiagnostics,
    isPatientDiagnosticsLoading,
  ]);

  const tableHeaders: Header[] = [
    {
      key: 'name',
      label: intl.formatMessage({
        id: 'common.name',
      }),
      cellProps: {
        textAlign: 'left',
      },
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
        diagnosticReportUrl={ROUTE_ANALYSIS_REPORT_NEUROPSICHOLOGICAL_PROFILE.replace(
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
    navigate(
      ROUTE_ANALYSIS_CREATE_NEUROPSICHOLOGICAL_PROFILE +
        `?patientId=${patientId}`
    );

  return (
    <SharedPatientAnalysisComponent
      title={intl.formatMessage({
        id: 'patients.neuropsichologicalProfilesTitle',
      })}
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

export default PatientNeuropsichologicalProfilesAnalysis;
