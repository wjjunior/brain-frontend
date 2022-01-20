import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import Flex from '../Flex';
import Breadcrumb from '../Breadcrumb';
import { H6, Link } from '../Typography';
import SideTabs, { SideTab } from '../Shared/SideTabs';

import { grid } from '../../config/theme';
import {
  ROUTE_PATIENTS_CREATE_PERSONAL_INFO,
  ROUTE_PATIENTS_EDIT_CLINICAL_INFO,
  ROUTE_PATIENTS_EDIT_CORESETS,
  // ROUTE_PATIENTS_EDIT_PROSPECTIVE_RESULT_MAPS,
  // ROUTE_PATIENTS_EDIT_GLOBAL_PROGNOSTICS,
  // ROUTE_PATIENTS_EDIT_NEUROPSICHOLOGICAL_PROFILES,
  // ROUTE_PATIENTS_EDIT_HEALTH_IMPACTS,
  // ROUTE_PATIENTS_EDIT_GOALS,
  ROUTE_PATIENTS_EDIT_PERSONAL_INFO,
  ROUTE_PATIENTS_HOME,
} from '../../modules/patients/constants';

const EditComponent: React.FC = ({ children }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { id: patientId } = useParams();

  if (!patientId) {
    navigate(ROUTE_PATIENTS_CREATE_PERSONAL_INFO.replace(':verb', 'create'));
    return null;
  }

  const replace = (route: string): string =>
    route.replace(':verb', 'edit').replace(':id', patientId);

  const sideTabs: SideTab[] = [
    {
      route: replace(ROUTE_PATIENTS_EDIT_PERSONAL_INFO),
      label: 'patients.personalInfoTitle',
    },
    {
      route: replace(ROUTE_PATIENTS_EDIT_CLINICAL_INFO),
      label: 'patients.clinicalInfoTitle',
    },
    {
      route: replace(ROUTE_PATIENTS_EDIT_CORESETS),
      label: 'patients.coreSetsTitle',
    },
    // {
    //   route: replace(ROUTE_PATIENTS_EDIT_PROSPECTIVE_RESULT_MAPS),
    //   label: 'patients.prospectiveResultMapsTitle',
    // },
    // {
    //   route: replace(ROUTE_PATIENTS_EDIT_GLOBAL_PROGNOSTICS),
    //   label: 'patients.globalPrognosticsTitle',
    // },
    // {
    //   route: replace(ROUTE_PATIENTS_EDIT_NEUROPSICHOLOGICAL_PROFILES),
    //   label: 'patients.neuropsichologicalProfilesTitle',
    // },
    // {
    //   route: replace(ROUTE_PATIENTS_EDIT_GOALS),
    //   label: 'patients.goalsTitle',
    // },
    // {
    //   route: replace(ROUTE_PATIENTS_EDIT_HEALTH_IMPACTS),
    //   label: 'patients.healthImpactsTitle',
    // },
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

export default EditComponent;
