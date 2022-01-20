import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Card from '../../../Card';
import Flex from '../../../Flex';
import Input from '../../../Input';
import { H6, H7 } from '../../../Typography';
import FilledButton, { OutlineButton } from '../../../Button';
import { grid } from '../../../../config/theme';
import { Option } from '../../../Select';
import { themeGrid, themeProp } from '../../../../utils/functional';

interface IHealthImpactFinishComponentProps {
  patientName: string;
  selectedSubjects: Option[];
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const HealthImpactFinishComponent: React.FC<IHealthImpactFinishComponentProps> = ({
  patientName,
  selectedSubjects,
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
      <H6 bold color="gray" style={{ margin: `${grid(2)} 0 ${grid(1)}` }}>
        {intl.formatMessage({ id: 'analysis.healthImpact.subjectsSelected' })}
      </H6>
      <Card>
        <Flex wrap="wrap">
          {selectedSubjects.map((subject) => (
            <BorderedH7 key={subject.key}>{subject.label}</BorderedH7>
          ))}
        </Flex>
      </Card>
    </Card>
  );
};

const BorderedH7 = styled(H7).attrs({ color: 'gray' })`
  padding: ${themeGrid(0.25)};
  border-radius: ${themeGrid(0.5)};
  border: 1px solid ${themeProp('colors.primary.silver')};
  margin-right: ${themeGrid(1)};
  margin-bottom: ${themeGrid(1)};
`;

export default HealthImpactFinishComponent;
