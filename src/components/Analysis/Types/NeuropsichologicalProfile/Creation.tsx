import React from 'react';
import { useIntl } from 'react-intl';

import Flex from '../../../Flex';
import Breadcrumb from '../../../Breadcrumb';
import { H6, Link } from '../../../Typography';
import SideTabs, { SideTab } from '../../../Shared/SideTabs';

import { grid } from '../../../../config/theme';
import {
  ROUTE_ANALYSIS_HOME,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_PATIENT,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_INTELECTUAL_OPERATION,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_ATTENTION,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_MEMORY,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_EXECUTIVE_FUNCTIONS,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_COGNITIVE_FUNCTIONS,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_FINISH,
} from '../../../../modules/analysis/constants';
import { selectors } from '../../../../modules/analysis';
import { useSelector } from 'react-redux';

const NeuropsichologicalProfileCreationComponent: React.FC = ({ children }) => {
  const intl = useIntl();
  const draftNeuropsichologicalProfileProgress = useSelector(
    selectors.draftNeuropsichologicalProfileProgress
  );

  const sideTabs: Array<SideTab & { subTabs?: SideTab[] }> = [
    {
      route: ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_PATIENT,
      label: 'analysis.choosePatient',
      icon: draftNeuropsichologicalProfileProgress.patient
        ? 'done'
        : draftNeuropsichologicalProfileProgress.patient
        ? 'done'
        : 'pending',
    },
    {
      route: ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_INTELECTUAL_OPERATION,
      label: 'analysis.neuropsichologicalProfile.intelectualOperation',
      icon: draftNeuropsichologicalProfileProgress.intelectualOperation
        ? 'done'
        : 'pending',
    },
    {
      route: ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS,
      label: 'analysis.neuropsichologicalProfile.universalFunctions',
      icon: draftNeuropsichologicalProfileProgress.universalFunctions
        ? 'done'
        : 'pending',
      subTabs: [
        {
          route: ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_MEMORY,
          label: 'analysis.neuropsichologicalProfile.universalFunctionsMemory',
        },
        {
          route: ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_ATTENTION,
          label:
            'analysis.neuropsichologicalProfile.universalFunctionsAttention',
        },
      ],
    },
    {
      route: ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_EXECUTIVE_FUNCTIONS,
      label: 'analysis.neuropsichologicalProfile.executiveFunctions',
      icon: draftNeuropsichologicalProfileProgress.executiveFunctions
        ? 'done'
        : 'pending',
    },
    {
      route: ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_COGNITIVE_FUNCTIONS,
      label: 'analysis.neuropsichologicalProfile.cognitiveFunctions',
      icon: draftNeuropsichologicalProfileProgress.cognitiveFunctions
        ? 'done'
        : 'pending',
    },
    {
      route: ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO,
      label: 'analysis.neuropsichologicalProfile.additionalInformation',
      icon: draftNeuropsichologicalProfileProgress.additionalInformation
        ? 'done'
        : 'pending',
    },
    {
      route: ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_FINISH,
      label: 'analysis.finishAndSave',
      icon: draftNeuropsichologicalProfileProgress.finish ? 'done' : 'pending',
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
              id: 'analysis.neuropsichologicalProfile.title',
            })}
          />
        </Breadcrumb>
        <H6 style={{ marginTop: grid(1) }}>
          {intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.description',
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

export default NeuropsichologicalProfileCreationComponent;
