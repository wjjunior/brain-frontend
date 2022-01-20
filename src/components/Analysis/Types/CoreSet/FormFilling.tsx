import React from 'react';
import { useIntl } from 'react-intl';

import Card from '../../../Card';
import Flex from '../../../Flex';
import { H6 } from '../../../Typography';
import { OutlineButton } from '../../../Button';
import { colors, grid } from '../../../../config/theme';
import { Analysis } from '../../../../modules/analysis/types';
import CoreSetIcFContainer from '../../../../containers/Analysis/Types/CoreSet/IcF';
import CoreSetCategoryLabel from '../../Shared/CoreSetCategoryLabel';

interface ICoreSetFormFillingComponentProps {
  coreSet: Analysis.CoreSet;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const CoreSetFormFillingComponent: React.FC<ICoreSetFormFillingComponentProps> = ({
  coreSet,
  onPreviousClick,
  onNextClick,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1">
      <Flex justify="space-between">
        <H6>{intl.formatMessage({ id: 'analysis.coreSet.fillFormTitle' })}</H6>
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
      <H6 color="gray" style={{ marginBottom: grid(2) }}>
        {coreSet.description}
      </H6>
      {Object.entries(coreSet.icFs).map(([key, category]) => (
        <CoreSetCategory
          key={key}
          categoryTitle={key}
          categoryDescription={intl.formatMessage(
            {
              id: 'common.analysis.coreSetDescriptions.' + key,
            },
            {
              linebreak: <br />,
            }
          )}
          category={category}
        />
      ))}
      <Flex justify="flex-end">
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

interface ICoreSetCategoryProps {
  category: Analysis.ICF[];
  categoryTitle: string;
  categoryDescription: string | React.ReactNodeArray;
}

const CoreSetCategory: React.FC<ICoreSetCategoryProps> = ({
  category,
  categoryTitle,
  categoryDescription,
}) => {
  return (
    <Flex style={{ marginTop: grid(2) }} direction="column">
      <CoreSetCategoryLabel>{categoryTitle}</CoreSetCategoryLabel>
      <H6 style={{ color: colors.secondary.gray, lineHeight: grid(2.05) }}>
        {categoryDescription}
      </H6>
      {category.map((icF) => (
        <CoreSetIcFContainer
          categoryId={categoryTitle}
          key={icF.id}
          icFId={icF.id}
        />
      ))}
    </Flex>
  );
};

export default CoreSetFormFillingComponent;
