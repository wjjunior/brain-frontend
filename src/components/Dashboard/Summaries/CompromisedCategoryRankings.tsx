import React from 'react';
import { useIntl } from 'react-intl';

import { H6, H7, H8 } from '../../Typography';
import { TimelineItem } from '../../Timeline';
import Card from '../../Card';

import { colors, grid } from '../../../config/theme';

type CompromisedCategory = {
  name: string;
  total: number;
};

export interface ICompromisedCategoryRankingsProps {
  compromisedCategories: CompromisedCategory[];
}

const CompromisedCategoryRankings: React.FC<ICompromisedCategoryRankingsProps> = ({
  compromisedCategories,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1" style={{ marginRight: grid(3), maxHeight: grid(40) }}>
      <H6 style={{ marginBottom: grid(2) }}>
        {intl.formatMessage({ id: 'dashboard.compromisedCategoriesTitle' })}
      </H6>
      <div style={{ overflowY: 'auto' }}>
        {compromisedCategories.map(({ name, total }, index) => (
          <TimelineItem key={name + index} bulletContent={<H8>{index + 1}</H8>}>
            <H7>{name}</H7>
            <H7
              bold
              style={{ color: colors.secondary.gray, marginTop: grid(0.5) }}
            >
              {intl.formatMessage(
                { id: 'dashboard.compromisedCategoryScore' },
                { score: intl.formatNumber(total) }
              )}
            </H7>
          </TimelineItem>
        ))}
      </div>
    </Card>
  );
};

export default CompromisedCategoryRankings;
