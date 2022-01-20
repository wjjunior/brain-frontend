import React from 'react';
import { useIntl } from 'react-intl';

import { H6, H7, H8 } from '../../Typography';
import Card from '../../Card';
import Flex from '../../Flex';
import Separator from '../../Separator';

import { colors, grid } from '../../../config/theme';
// import { ROUTE_PATIENTS_EDIT } from '../../../modules/patients/constants';
// import { ReactComponent as LinkIcon } from '../../../assets/icons/access-link.svg';

type Goal = {
  name: string;
  // patientId: string;
  patient: string;
  date: string;
};

export interface IGoalsInProgressProps {
  latestGoals: Goal[];
}

const GoalsInProgress: React.FC<IGoalsInProgressProps> = ({ latestGoals }) => {
  const intl = useIntl();

  return (
    <Card style={{ marginTop: grid(2), maxHeight: grid(53) }}>
      <H6 style={{ marginBottom: grid(2) }}>
        {intl.formatMessage({ id: 'dashboard.goalsInProgressTitle' })}
      </H6>
      <div style={{ overflowY: 'auto' }}>
        {latestGoals.map((goal) => (
          <Flex
            direction="column"
            key={goal.name}
            style={{ marginRight: grid(1) }}
          >
            <Flex justify="space-between">
              <H7>{goal.name}</H7>
              <H8 style={{ color: colors.secondary.gray }}>
                {intl.formatDate(goal.date)}
              </H8>
            </Flex>
            <H7
              bold
              truncateText
              style={{
                color: colors.secondary.gray,
                maxWidth: grid(20),
                margin: `${grid(0.5)} 0`,
              }}
            >
              {intl.formatMessage(
                { id: 'dashboard.patientName' },
                { patientName: goal.patient }
              )}
            </H7>
            {/* <Link
              to={ROUTE_PATIENTS_EDIT.replace(':id', goal.patientId)}
              style={{ fontSize: grid(1.5) }}
            > */}
            {/* <Flex align="center">
              <LinkIcon />
              <span style={{ marginLeft: grid(0.5) }}>
                {intl.formatMessage({ id: 'common.openRecord' })}
              </span>
            </Flex> */}
            {/* </Link> */}
            <Separator margin="2 0" />
          </Flex>
        ))}
      </div>
    </Card>
  );
};

export default GoalsInProgress;
