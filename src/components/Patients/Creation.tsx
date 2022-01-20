import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import Flex from '../Flex';
import Breadcrumb from '../Breadcrumb';
import { H6, Link } from '../Typography';
import SideTabs, { SideTab } from '../Shared/SideTabs';

import { grid } from '../../config/theme';
import {
  ROUTE_PATIENTS_CREATE_CLINICAL_INFO,
  ROUTE_PATIENTS_CREATE_PERSONAL_INFO,
  ROUTE_PATIENTS_EDIT_CLINICAL_INFO,
  ROUTE_PATIENTS_EDIT_PERSONAL_INFO,
  ROUTE_PATIENTS_HOME,
} from '../../modules/patients/constants';

const CreationComponent: React.FC = ({ children }) => {
  const intl = useIntl();
  const { id: patientId } = useParams();

  const sideTabs: SideTab[] = [
    {
      route: patientId
        ? ROUTE_PATIENTS_EDIT_PERSONAL_INFO.replace(':verb', 'edit').replace(
            ':id',
            patientId
          )
        : ROUTE_PATIENTS_CREATE_PERSONAL_INFO.replace(':verb', 'create'),
      label: 'patients.personalInfoTitle',
      icon: 'pending',
    },
    {
      route: patientId
        ? ROUTE_PATIENTS_EDIT_CLINICAL_INFO.replace(':verb', 'edit').replace(
            ':id',
            patientId
          )
        : ROUTE_PATIENTS_CREATE_CLINICAL_INFO.replace(
            ':verb',
            'create'
          ).replace(':id', patientId ? patientId : ''),
      label: 'patients.clinicalInfoTitle',
      icon: 'pending',
    },
  ];

  return (
    <Flex direction="column">
      <Flex direction="column" style={{ marginBottom: grid(3) }}>
        <Breadcrumb>
          <Breadcrumb.Item
            text={intl.formatMessage({ id: 'sideMenu.patientsHome' })}
            linkComponent={(props) => (
              <Link {...props} to={ROUTE_PATIENTS_HOME}></Link>
            )}
          />
          <Breadcrumb.Item
            text={intl.formatMessage({ id: 'patients.newPatientTitle' })}
          />
        </Breadcrumb>
        <H6 style={{ marginTop: grid(1) }}>
          {intl.formatMessage({ id: 'patients.newPatientDescription' })}
        </H6>
      </Flex>
      <Flex>
        <SideTabs tabs={sideTabs} />
        {children}
      </Flex>
    </Flex>
  );
};

export default CreationComponent;
