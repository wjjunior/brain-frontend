import React from 'react';
import { useIntl } from 'react-intl';

import Card from '../../Card';
import Flex from '../../Flex';
import { H6 } from '../../Typography';
import FilledButton, { OutlineButton } from '../../Button';
import { grid } from '../../../config/theme';
import Input from '../../Input';

interface SharedIAnalysisFinishComponentProps {
  patientName: string;
  coreSetCategoryName?: string;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const SharedAnalysisFinishComponent: React.FC<SharedIAnalysisFinishComponentProps> = ({
  patientName,
  coreSetCategoryName,
  onPreviousClick,
  onNextClick,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1">
      <Flex justify="space-between">
        <Flex direction="column">
          <H6>{intl.formatMessage({ id: 'analysis.finishAndSave' })}</H6>
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
            <FilledButton size="small" onClick={onNextClick}>
              {intl.formatMessage({ id: 'analysis.generateAndSave' })}
            </FilledButton>
          </div>
        </Flex>
      </Flex>
      <H6 bold color="gray" style={{ margin: `${grid(2)} 0 ${grid(1)}` }}>
        {intl.formatMessage({ id: 'common.patient' })}
      </H6>
      <Input readOnly value={patientName} />
      {!!coreSetCategoryName && (
        <>
          <H6 bold color="gray" style={{ margin: `${grid(2)} 0 ${grid(1)}` }}>
            {intl.formatMessage({ id: 'common.analysis.coreSet' })}
          </H6>
          <Input readOnly value={coreSetCategoryName} />
        </>
      )}
    </Card>
  );
};

export default SharedAnalysisFinishComponent;
