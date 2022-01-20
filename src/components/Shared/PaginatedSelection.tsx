import React from 'react';
import { useIntl } from 'react-intl';
import { Dimmer, Loader, Modal, Pagination } from 'semantic-ui-react';
import { createGlobalStyle } from 'styled-components';

import Flex from '../Flex';
import Card from '../Card';
import Separator from '../Separator';
import TextField from '../TextField';
import FilledButton from '../Button';
import { H5, H6, H7 } from '../Typography';

import { grid } from '../../config/theme';
import { themeProp } from '../../utils/functional';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import Checkbox from '../Checkbox';

interface IPaginatedSelectionComponentProps {
  trigger: React.ReactNode;
  activePage: number;
  totalPages: number;
  pageItems: { key: string; label: string }[];
  selectedItems: string[];
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onSelectedItemsChange: (selectedItems: string[]) => void;
  onSearchFilterChange: (searchFilter: string) => void;
}

const PaginatedSelectionComponent: React.FC<IPaginatedSelectionComponentProps> = ({
  trigger,
  activePage,
  totalPages,
  pageItems,
  selectedItems,
  isLoading,
  onPageChange,
  onSelectedItemsChange,
  onSearchFilterChange,
}) => {
  const intl = useIntl();

  const closeModal = () =>
    document.getElementById('paginated-selection')?.parentElement?.click();

  function onClose() {
    onSearchFilterChange('');
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    onSearchFilterChange(e.target.value);
    onPageChange(1);
  }

  function onDeselectAll() {
    onSelectedItemsChange([]);
  }

  function onItemClicked(item: { key: string; label: string }) {
    if (selectedItems.includes(item.key)) {
      return onSelectedItemsChange(
        selectedItems.filter((itemKey) => itemKey !== item.key)
      );
    }

    onSelectedItemsChange([...selectedItems, item.key]);
  }

  return (
    <Modal
      id="paginated-selection"
      size="mini"
      trigger={trigger}
      style={{ minWidth: grid(110) }}
      onClose={onClose}
    >
      <GlobalStyle />

      <Modal.Content>
        <Flex justify="space-between">
          <H5>
            {intl.formatMessage({
              id: 'patients.clinicalInfo.icdCodesPlaceholder',
            })}
          </H5>
          <CloseIcon onClick={closeModal} />
        </Flex>
        <Separator margin="2 0" />
        <Flex justify="space-between" align="flex-end">
          <TextField
            id="search-icd"
            onChange={onSearchChange}
            labelText={intl.formatMessage({ id: 'common.search' })}
            placeholder={intl.formatMessage({
              id: 'common.searchPlaceholder',
            })}
          />
          <div>
            <FilledButton
              flex="1"
              justify="center"
              type="submit"
              onClick={() => closeModal()}
            >
              {intl.formatMessage({
                id: 'common.saveSelection',
              })}
            </FilledButton>
          </div>
        </Flex>
        <Card flex="1" style={{ margin: `${grid(2)} 0` }}>
          <Flex>
            <H6 bold>
              {intl.formatMessage(
                {
                  id: 'common.selectedItems',
                },
                { number: selectedItems.length }
              )}
            </H6>
            <H6
              color="purple"
              style={{ marginLeft: grid(2), cursor: 'pointer' }}
              onClick={onDeselectAll}
            >
              {intl.formatMessage({
                id: 'common.cleanSelectedItems',
              })}
            </H6>
          </Flex>
          <Flex direction="column">
            {isLoading ? (
              <Dimmer active inverted>
                <Loader size="large" />
              </Dimmer>
            ) : (
              pageItems.map((item, index) => (
                <>
                  <Flex
                    flex="1"
                    align="center"
                    key={item.key}
                    style={{ padding: `${grid(2)} 0`, cursor: 'pointer' }}
                    onClick={() => onItemClicked(item)}
                  >
                    <Checkbox
                      checked={selectedItems.includes(item.key)}
                      style={{ marginRight: grid(2) }}
                    />
                    <H7 bold>{item.label}</H7>
                  </Flex>
                  {index < pageItems.length - 1 && <Separator margin="0" />}
                </>
              ))
            )}
          </Flex>
        </Card>
        <Flex>
          <Pagination
            activePage={activePage}
            nextItem={null}
            prevItem={null}
            totalPages={totalPages}
            onPageChange={(
              _: React.MouseEvent<HTMLAnchorElement>,
              { activePage }
            ) => onPageChange(activePage as number)}
          />
        </Flex>
      </Modal.Content>
    </Modal>
  );
};

const GlobalStyle = createGlobalStyle`
  .ui.page.modals {
    padding: 0;

    .ui.modal.visible {
      box-shadow: none;
      border-radius: ${grid(0.5)};
      margin: 0;

      svg {
        cursor: pointer;

        path {
          fill: ${themeProp('colors.primary.dark_blue')};
        }
      }
    }
  }
`;

export default PaginatedSelectionComponent;
