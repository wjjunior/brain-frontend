import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import SharedPatientAnalysisComponent from '../../../components/Patients/Analysis';
import { Header, Row } from '../../../components/Table';
import { ROUTE_ANALYSIS_CREATE_HEALTH_IMPACT } from '../../../modules/analysis/constants';

interface IPatientHealthImpactAnalysisProps {}

const PatientHealthImpactAnalysis: React.FC<IPatientHealthImpactAnalysisProps> = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { id: patientId } = useParams();

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

  const tableRows: Row[] = [];
  const pagination = {
    activePage: 1,
    totalPages: 5,
    onPageChange: () => null,
  };

  const onButtonClick = () =>
    navigate(ROUTE_ANALYSIS_CREATE_HEALTH_IMPACT + `?patientId=${patientId}`);

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
