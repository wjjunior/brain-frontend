import React from 'react';
import { useIntl } from 'react-intl';

import Flex from '../../Flex';
import Separator from '../../Separator';
import Progress from '../../Progress';
import { H7 } from '../../Typography';
import { grid } from '../../../config/theme';

import IcFLabel from './IcFLabel';

type Qualifier = {
  value: number;
  color: string;
  name?: string;
  label?: string;
};

export interface IIcFProgress {
  code: string;
  name: string;
  total: number;
  qualifiers: Qualifier[];
}

interface IIcFProgressProps {
  width: string;
  range: string[];
  icFs: IIcFProgress[];
}

const IcFProgress: React.FC<IIcFProgressProps> = ({ icFs, range, width }) => {
  const intl = useIntl();

  return (
    <Flex direction="column">
      <Flex justify="space-between" style={{ marginBottom: grid(2) }}>
        <H7 color="gray">
          {intl.formatMessage({ id: 'common.analysis.items' })}
        </H7>
        <Flex justify="space-between" style={{ width }}>
          {range.map((rangeValue) => (
            <H7 color="gray">{rangeValue}</H7>
          ))}
        </Flex>
      </Flex>
      {icFs.map((icFProgress, index) => (
        <Flex direction="column" key={icFProgress.code}>
          <Flex flex="1" justify="space-between">
            <IcFLabel code={icFProgress.code} name={icFProgress.name} />
            <Flex direction="column" align="flex-end">
              {icFProgress.qualifiers.map((qualifier) => (
                <Flex style={{ marginBottom: grid(3) }}>
                  {!!qualifier.name && <H7 color="gray">{qualifier.name}</H7>}
                  <Progress
                    fillColor={qualifier.color}
                    value={qualifier.value}
                    total={icFProgress.total}
                    label={qualifier.label}
                    progress={!!qualifier.label}
                    style={{ width, marginLeft: grid(2) }}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>
          {!!(icFs.length - 1 !== index) && <Separator margin="0 0 2" />}
        </Flex>
      ))}
    </Flex>
  );
};

export default IcFProgress;
