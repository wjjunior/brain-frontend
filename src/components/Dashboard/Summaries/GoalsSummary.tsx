import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { RadialBarChart, RadialBar } from 'recharts';

import { H3, H6, H7, H8 } from '../../Typography';
import Card from '../../Card';
import Separator from '../../Separator';
import Flex from '../../Flex';
import Circle from '../../Circle';

import { colors, grid } from '../../../config/theme';
import { themeGrid } from '../../../utils/functional';

type GoalsSummary = {
  total: number;
  percentage: number;
  label: string;
};

export interface IGoalsSummaryProps {
  goalsSummary: {
    total: number;
    achieved: GoalsSummary;
    unachieved: GoalsSummary;
  };
}

const GoalsSummary: React.FC<IGoalsSummaryProps> = ({ goalsSummary }) => {
  const intl = useIntl();

  const data = [
    {
      name: 'unachieved_patient_appointments',
      value: goalsSummary.unachieved.percentage,
      fill: colors.situational.info,
    },
    {
      name: 'achieved_patient_appointments',
      value: goalsSummary.achieved.percentage,
      fill: colors.secondary.blue,
    },
    {
      name: 'total_goals',
      value: 100,
      fill: colors.primary.purple,
      strokeLineCap: 'round',
    },
  ];

  return (
    <Card style={{ maxHeight: grid(35) }}>
      <H6>{intl.formatMessage({ id: 'dashboard.goalsSummaryTitle' })}</H6>
      <Flex flex="1" direction="column" justify="center" align="center">
        <RadialBarChart
          data={data}
          width={180}
          height={180}
          innerRadius="65%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          barSize={6}
        >
          <RadialBar
            animationDuration={600}
            animationEasing="ease-in-out"
            dataKey="value"
            cornerRadius="100%"
          />
        </RadialBarChart>
        <Flex
          direction="column"
          align="center"
          style={{ position: 'absolute' }}
        >
          <H8
            align="center"
            style={{ maxWidth: grid(7.5), marginBottom: grid(0.5) }}
          >
            {intl.formatMessage({ id: 'dashboard.appointmentsTotalTitle' })}
          </H8>
          <H3 color="purple">{intl.formatNumber(goalsSummary.total)}</H3>
        </Flex>
      </Flex>
      <Separator margin="0 0 2 0" />
      <ul>
        <LegendItem>
          <H7 color="gray">
            <Circle backgroundColor="secondary.blue" />{' '}
            {goalsSummary.achieved.label}
          </H7>
          <H7 color="gray">
            {intl.formatMessage(
              { id: 'dashboard.legendValue' },
              {
                total: intl.formatNumber(goalsSummary.achieved.total),
                percentage: Math.floor(goalsSummary.achieved.percentage),
              }
            )}
          </H7>
        </LegendItem>
        <LegendItem>
          <H7 color="gray">
            <Circle backgroundColor="situational.info" />{' '}
            {goalsSummary.unachieved.label}
          </H7>
          <H7 color="gray">
            {intl.formatMessage(
              { id: 'dashboard.legendValue' },
              {
                total: intl.formatNumber(goalsSummary.unachieved.total),
                percentage: Math.floor(goalsSummary.unachieved.percentage),
              }
            )}
          </H7>
        </LegendItem>
      </ul>
    </Card>
  );
};

const LegendItem = styled(Flex).attrs({
  as: 'li',
  justify: 'space-between',
})`
  &:not(:last-of-type) {
    margin-bottom: ${themeGrid(2)};
  }
`;

export default GoalsSummary;
