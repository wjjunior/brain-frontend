import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import Flex from '../../../Flex';
import Breadcrumb from '../../../Breadcrumb';
import { H6, Link } from '../../../Typography';
import SideTabs, { SideTab } from '../../../Shared/SideTabs';

import { grid } from '../../../../config/theme';
import {
  ROUTE_ANALYSIS_HOME,
  ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_FINISH,
  ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_MAP,
  ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_PATIENT,
} from '../../../../modules/analysis/constants';
import { selectors } from '../../../../modules/analysis';

const ProspectiveResultMapCreationComponent: React.FC = ({ children }) => {
  const intl = useIntl();
  const draftProspectiveResultMapProgress = useSelector(
    selectors.draftProspectiveResultMapProgress
  );

  const sideTabs: SideTab[] = [
    {
      route: ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_PATIENT,
      label: 'analysis.choosePatient',
      icon: draftProspectiveResultMapProgress.patient ? 'done' : 'pending',
    },
    {
      route: ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_MAP,
      label: 'analysis.prospectiveResultMap.title',
      icon: draftProspectiveResultMapProgress.map ? 'done' : 'pending',
    },
    {
      route: ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_FINISH,
      label: 'analysis.finishAndSave',
      icon: draftProspectiveResultMapProgress.finish ? 'done' : 'pending',
    },
  ];

  return (
    <Flex direction="column">
      <Flex direction="column" style={{ marginBottom: grid(3) }}>
        <Breadcrumb>
          <Breadcrumb.Item
            text={intl.formatMessage({ id: 'sideMenu.analysisHome' })}
            linkComponent={(props) => (
              <Link {...props} to={ROUTE_ANALYSIS_HOME}></Link>
            )}
          />
          <Breadcrumb.Item
            text={intl.formatMessage({ id: 'analysis.createAnalysis' })}
          />
          <Breadcrumb.Item
            text={intl.formatMessage({
              id: 'analysis.prospectiveResultMap.title',
            })}
          />
        </Breadcrumb>
        <H6 style={{ marginTop: grid(1) }}>
          {intl.formatMessage({
            id: 'analysis.prospectiveResultMap.description',
          })}
        </H6>
      </Flex>
      <Flex>
        <SideTabs tabs={sideTabs} />
        {children}
      </Flex>
    </Flex>
  );
};

export default ProspectiveResultMapCreationComponent;
