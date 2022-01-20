import React from 'react';
import { useIntl } from 'react-intl';

import Card from '../../../Card';
import Flex from '../../../Flex';
import { H6 } from '../../../Typography';
import { OutlineButton } from '../../../Button';
import { grid } from '../../../../config/theme';
import Select, { Option } from '../../../Select';

interface ICoreSetFormCategoriesComponentProps {
  coreSetOptions: Option[];
  selectedCoreSet?: Option;
  onSearchChange: (term: string) => void;
  onCoreSetSelection: (options: Option[]) => void;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const CoreSetFormCategoriesComponent: React.FC<ICoreSetFormCategoriesComponentProps> = ({
  coreSetOptions,
  selectedCoreSet,
  onCoreSetSelection,
  onSearchChange,
  onPreviousClick,
  onNextClick,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1">
      <Flex justify="space-between">
        <Flex direction="column">
          <H6>
            {intl.formatMessage({ id: 'analysis.coreSet.configureForm' })}
          </H6>
          <H6 color="gray" style={{ marginTop: grid(2) }}>
            {intl.formatMessage({
              id: 'analysis.coreSet.configureFormDescription',
            })}
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
      <H6 color="gray" style={{ margin: `${grid(2)} 0` }}>
        {intl.formatMessage({ id: 'analysis.coreSet.selectCategory' })}
      </H6>
      <Select
        searchable
        options={coreSetOptions}
        selectedOptions={selectedCoreSet ? [selectedCoreSet] : []}
        onSearchChange={onSearchChange}
        onChange={onCoreSetSelection}
        searchPlaceHolder={intl.formatMessage({
          id: 'analysis.searchByName',
        })}
        placeholder={intl.formatMessage({
          id: 'analysis.coreSet.selectCategoryPlaceholder',
        })}
      />
    </Card>
  );
};

export default CoreSetFormCategoriesComponent;
