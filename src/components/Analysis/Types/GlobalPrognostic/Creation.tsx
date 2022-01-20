import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import Flex from '../../../Flex';
import Breadcrumb from '../../../Breadcrumb';
import { H6, Link } from '../../../Typography';
import SideTabs, { SideTab } from '../../../Shared/SideTabs';

import { grid } from '../../../../config/theme';
import {
  ROUTE_ANALYSIS_HOME,
  ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_FINISH,
  ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_WEAKNESS_AND_STRENGTHS,
  ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_PATIENT,
} from '../../../../modules/analysis/constants';
import { selectors } from '../../../../modules/analysis';

const GlobalPrognosticCreationComponent: React.FC = ({ children }) => {
  const intl = useIntl();
  const draftGlobalPrognosticProgress = useSelector(
    selectors.draftGlobalPrognosticProgress
  );

  const sideTabs: SideTab[] = [
    {
      route: ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_PATIENT,
      label: 'analysis.choosePatient',
      icon: draftGlobalPrognosticProgress.patient ? 'done' : 'pending',
    },
    {
      route: ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_WEAKNESS_AND_STRENGTHS,
      label: 'analysis.globalPrognostic.weaknessAndStrengths',
      icon: draftGlobalPrognosticProgress.weaknessAndStrengths
        ? 'done'
        : 'pending',
    },
    {
      route: ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_FINISH,
      label: 'analysis.finishAndSave',
      icon: draftGlobalPrognosticProgress.finish ? 'done' : 'pending',
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
              id: 'analysis.globalPrognostic.title',
            })}
          />
        </Breadcrumb>
        <H6 style={{ marginTop: grid(1) }}>
          {intl.formatMessage({
            id: 'analysis.globalPrognostic.description',
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

export default GlobalPrognosticCreationComponent;
