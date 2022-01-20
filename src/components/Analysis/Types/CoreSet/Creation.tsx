import React from 'react';
import { useIntl } from 'react-intl';

import Flex from '../../../Flex';
import Breadcrumb from '../../../Breadcrumb';
import { H6, Link } from '../../../Typography';
import SideTabs, { SideTab } from '../../../Shared/SideTabs';

import { grid } from '../../../../config/theme';
import {
  ROUTE_ANALYSIS_CORESET_PATIENT,
  ROUTE_ANALYSIS_CORESET_FORM_CATEGORIES,
  ROUTE_ANALYSIS_CORESET_FORM_FILLING,
  ROUTE_ANALYSIS_CORESET_FINISH,
  ROUTE_ANALYSIS_HOME,
} from '../../../../modules/analysis/constants';

const CreationComponent: React.FC = ({ children }) => {
  const intl = useIntl();

  const sideTabs: SideTab[] = [
    {
      route: ROUTE_ANALYSIS_CORESET_PATIENT,
      label: 'analysis.choosePatient',
      icon: 'pending',
    },
    {
      route: ROUTE_ANALYSIS_CORESET_FORM_CATEGORIES,
      label: 'analysis.coreSet.configureForm',
      icon: 'pending',
    },
    {
      route: ROUTE_ANALYSIS_CORESET_FORM_FILLING,
      label: 'analysis.coreSet.fillForm',
      icon: 'pending',
    },
    {
      route: ROUTE_ANALYSIS_CORESET_FINISH,
      label: 'analysis.finishAndSave',
      icon: 'pending',
    },
  ];

  return (
    <Flex direction="column">
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
          text={intl.formatMessage({ id: 'analysis.coreSet.title' })}
        />
      </Breadcrumb>
      <H6 style={{ margin: `${grid(1)} 0 ${grid(3)}` }}>
        {intl.formatMessage({ id: 'analysis.coreSet.description' })}
      </H6>
      <Flex>
        <SideTabs tabs={sideTabs} />
        {children}
      </Flex>
    </Flex>
  );
};

export default CreationComponent;
