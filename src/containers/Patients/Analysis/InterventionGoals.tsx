import React from 'react';
import { useIntl } from 'react-intl';

import SharedPatientAnalysisComponent from '../../../components/Patients/Analysis';
import { Header, Row } from '../../../components/Table';

interface IPatientInterventionGoalsAnalysisProps {}

const PatientInterventionGoalsAnalysis: React.FC<IPatientInterventionGoalsAnalysisProps> = () => {
  const intl = useIntl();

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

  const onButtonClick = () => null;

  return (
    <SharedPatientAnalysisComponent
      title={intl.formatMessage({ id: 'patients.goalsTitle' })}
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

export default PatientInterventionGoalsAnalysis;
