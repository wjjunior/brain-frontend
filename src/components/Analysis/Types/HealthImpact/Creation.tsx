import React from 'react';
import { useIntl } from 'react-intl';

import Flex from '../../../Flex';
import Breadcrumb from '../../../Breadcrumb';
import { H6, Link } from '../../../Typography';
import SideTabs, { SideTab } from '../../../Shared/SideTabs';

import { grid } from '../../../../config/theme';
import {
  ROUTE_ANALYSIS_HOME,
  ROUTE_ANALYSIS_HEALTH_IMPACT_PATIENT,
  ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS,
  ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_COPING,
  ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_ANXIETY,
  ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_HUMOUR,
  ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_LIFE_QUALITY,
  ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_SLEEP_QUALITY,
  ROUTE_ANALYSIS_HEALTH_IMPACT_FINISH,
} from '../../../../modules/analysis/constants';
import { selectors } from '../../../../modules/analysis';
import { useSelector } from 'react-redux';
import { ValidHealthImpactSubjects } from '../../../../modules/analysis/types';

const HealthImpactCreationComponent: React.FC = ({ children }) => {
  const intl = useIntl();
  const draftHealthImpactProgress = useSelector(
    selectors.draftHealthImpactProgress
  );
  const draftHealthImpactSelectedSubjects = useSelector(
    selectors.draftHealthImpactSelectedSubjects
  );

  const sideTabs: Array<SideTab & { subTabs?: SideTab[] }> = [
    {
      route: ROUTE_ANALYSIS_HEALTH_IMPACT_PATIENT,
      label: 'analysis.choosePatient',
      icon: draftHealthImpactProgress.patient
        ? 'done'
        : draftHealthImpactProgress.patient
        ? 'done'
        : 'pending',
    },
    {
      route: ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS,
      label: 'analysis.healthImpact.subjects',
      icon: draftHealthImpactProgress.subjects ? 'done' : 'pending',
      subTabs: [
        {
          route: ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_COPING,
          label: 'analysis.healthImpact.subjectOptions.coping',
        },
        {
          route: ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_ANXIETY,
          label: 'analysis.healthImpact.subjectOptions.anxiety',
        },
        {
          route: ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_HUMOUR,
          label: 'analysis.healthImpact.subjectOptions.humour',
        },
        {
          route: ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_LIFE_QUALITY,
          label: 'analysis.healthImpact.subjectOptions.lifeQuality',
        },
        {
          route: ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_SLEEP_QUALITY,
          label: 'analysis.healthImpact.subjectOptions.sleepQuality',
        },
      ].filter((subTab) =>
        draftHealthImpactSelectedSubjects.includes(
          subTab.label.split('.').pop() as ValidHealthImpactSubjects
        )
      ),
    },
    {
      route: ROUTE_ANALYSIS_HEALTH_IMPACT_FINISH,
      label: 'analysis.finishAndSave',
      icon: draftHealthImpactProgress.finish ? 'done' : 'pending',
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
              id: 'analysis.healthImpact.title',
            })}
          />
        </Breadcrumb>
        <H6 style={{ marginTop: grid(1) }}>
          {intl.formatMessage({
            id: 'analysis.healthImpact.description',
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

export default HealthImpactCreationComponent;
