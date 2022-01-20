import React from 'react';
import { useIntl } from 'react-intl';

import { H6, H7, H8 } from '../../Typography';
import { TimelineItem } from '../../Timeline';
import Card from '../../Card';

import { colors, grid } from '../../../config/theme';

type IcdRankPlacement = {
  description: string;
  patients: number;
};

export interface IIcdRankingsProps {
  icdRankPlacements: IcdRankPlacement[];
}

const IcdRankings: React.FC<IIcdRankingsProps> = ({ icdRankPlacements }) => {
  const intl = useIntl();

  return (
    <Card style={{ marginTop: grid(2), maxHeight: grid(35) }}>
      <H6 style={{ marginBottom: grid(2) }}>
        {intl.formatMessage({ id: 'dashboard.icdRankingsTitle' })}
      </H6>
      <div style={{ overflowY: 'auto' }}>
        {icdRankPlacements.map(({ description, patients }, index) => (
          <TimelineItem key={description} bulletContent={<H8>{index + 1}</H8>}>
            <H7>{description}</H7>
            <H7
              bold
              style={{ color: colors.secondary.gray, marginTop: grid(0.5) }}
            >
              {intl.formatMessage(
                { id: 'dashboard.icdRankingTotalPatients' },
                { totalPatients: intl.formatNumber(patients) }
              )}
            </H7>
          </TimelineItem>
        ))}
      </div>
    </Card>
  );
};

export default IcdRankings;
