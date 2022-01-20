import React from 'react';
import { useIntl } from 'react-intl';

import { H6, H7, H8 } from '../../Typography';
import { TimelineItem } from '../../Timeline';
import Card from '../../Card';

import { colors, grid } from '../../../config/theme';

type CoreSetPlacement = {
  description: string;
  total: number;
};

export interface ICoreSetRankingsProps {
  coreSetRankPlacements: CoreSetPlacement[];
}

const CoreSetRankings: React.FC<ICoreSetRankingsProps> = ({
  coreSetRankPlacements,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1.01" style={{ marginRight: grid(3), maxHeight: grid(40) }}>
      <H6 style={{ marginBottom: grid(2) }}>
        {intl.formatMessage({ id: 'dashboard.coreSetRankingsTitle' })}
      </H6>
      <div style={{ overflowY: 'auto' }}>
        {coreSetRankPlacements.map(({ description, total }, index) => (
          <TimelineItem
            key={description + index}
            bulletContent={<H8>{index + 1}</H8>}
          >
            <H7>{description}</H7>
            <H7
              bold
              style={{ color: colors.secondary.gray, marginTop: grid(0.5) }}
            >
              {intl.formatMessage(
                { id: 'dashboard.coreSetRankingTotalRecords' },
                { totalRecords: intl.formatNumber(total) }
              )}
            </H7>
          </TimelineItem>
        ))}
      </div>
    </Card>
  );
};

export default CoreSetRankings;
