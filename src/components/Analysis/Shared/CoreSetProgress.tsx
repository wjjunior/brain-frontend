import React from 'react';
import { useIntl } from 'react-intl';

import Card from '../../Card';
import Flex from '../../Flex';
import { H6 } from '../../Typography';
import { OutlineButton } from '../../Button';
import { grid } from '../../../config/theme';

import IcFProgress, { IIcFProgress } from '../Shared/IcFProgress';
import CoreSetCategory from '../Shared/CoreSetCategory';
import Select, { ISelectProps } from '../../Select';

interface IAnalysisSharedCoreSetProgressProps {
  icFs: {
    [key in
      | 'bodyFunctions'
      | 'bodyStructures'
      | 'environmentalFactors'
      | 'activitiesAndParticipation']?: IIcFProgress[];
  };
  title: string;
  description: string;
  filter?: ISelectProps;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const AnalysisSharedCoreSetProgress: React.FC<IAnalysisSharedCoreSetProgressProps> = ({
  icFs,
  title,
  description,
  filter,
  onPreviousClick,
  onNextClick,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1">
      <Flex justify="space-between">
        <Flex direction="column">
          <H6>{title}</H6>
          <H6 color="gray" style={{ marginTop: grid(2) }}>
            {description}
          </H6>
        </Flex>
        <Flex>
          <div>
            <OutlineButton
              size="small"
              onClick={onPreviousClick}
              style={{ marginRight: grid(1) }}
            >
              {intl.formatMessage({ id: 'common.previousStep' })}
            </OutlineButton>
          </div>
          <div>
            <OutlineButton size="small" onClick={onNextClick}>
              {intl.formatMessage({ id: 'common.nextStep' })}
            </OutlineButton>
          </div>
        </Flex>
      </Flex>
      {!!filter && (
        <Flex style={{ marginTop: grid(2) }}>
          <Select {...filter} style={{ flex: '1' }} />
        </Flex>
      )}
      {icFs.bodyFunctions && (
        <CoreSetCategory
          title={intl.formatMessage({
            id: 'common.analysis.coreSetCategories.bodyFunctions',
          })}
          description={intl.formatMessage({
            id: 'common.analysis.coreSetCategories.bodyFunctionsDescription',
          })}
        >
          <IcFProgress
            width={grid(36)}
            icFs={icFs.bodyFunctions}
            range={['0', '1', '2', '3', '4']}
          />
        </CoreSetCategory>
      )}
      {icFs.bodyStructures && (
        <CoreSetCategory
          title={intl.formatMessage({
            id: 'common.analysis.coreSetCategories.bodyStructures',
          })}
          description={intl.formatMessage({
            id: 'common.analysis.coreSetCategories.bodyStructuresDescription',
          })}
        >
          <IcFProgress
            width={grid(36)}
            icFs={icFs.bodyStructures}
            range={['0', '1', '2', '3', '4']}
          />
        </CoreSetCategory>
      )}
      {icFs.environmentalFactors && (
        <CoreSetCategory
          title={intl.formatMessage({
            id: 'common.analysis.coreSetCategories.environmentalFactors',
          })}
          description={intl.formatMessage(
            {
              id:
                'common.analysis.coreSetCategories.environmentalFactorsDescription',
            },
            {
              linebreak: <br />,
            }
          )}
        >
          <IcFProgress
            width={grid(52)}
            icFs={icFs.environmentalFactors}
            range={['+4', '+3', '+2', '+1', '0', '1', '2', '3', '4']}
          />
        </CoreSetCategory>
      )}
      {icFs.activitiesAndParticipation && (
        <CoreSetCategory
          title={intl.formatMessage({
            id: 'common.analysis.coreSetCategories.activitiesAndParticipation',
          })}
          description={intl.formatMessage(
            {
              id:
                'common.analysis.coreSetCategories.activitiesAndParticipationDescription',
            },
            {
              linebreak: <br />,
            }
          )}
        >
          <IcFProgress
            width={grid(36)}
            icFs={icFs.activitiesAndParticipation}
            range={['0', '1', '2', '3', '4']}
          />
        </CoreSetCategory>
      )}
      <Flex justify="flex-end" style={{ marginTop: grid(3) }}>
        <div>
          <OutlineButton
            size="small"
            onClick={onPreviousClick}
            style={{ marginRight: grid(1) }}
          >
            {intl.formatMessage({ id: 'common.previousStep' })}
          </OutlineButton>
        </div>
        <div>
          <OutlineButton size="small" onClick={onNextClick}>
            {intl.formatMessage({ id: 'common.nextStep' })}
          </OutlineButton>
        </div>
      </Flex>
    </Card>
  );
};

export default AnalysisSharedCoreSetProgress;
