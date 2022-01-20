import React from 'react';

import Card from '../Card';
import Flex from '../Flex';
import { H6 } from '../Typography';
import FilledButton from '../Button';
import Table, { Header, Row } from '../Table';

import { grid } from '../../config/theme';
import { Pagination } from 'semantic-ui-react';

interface ISharedPatientAnalysisComponentProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
  pagination: {
    activePage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
  };
  tableHeaders: Header[];
  tableRows: Row[];
}

const SharedPatientAnalysisComponent: React.FC<ISharedPatientAnalysisComponentProps> = ({
  title,
  buttonText,
  pagination,
  tableHeaders,
  tableRows,
  onButtonClick,
}) => {
  return (
    <Card flex="1">
      <Flex
        align="flex-start"
        justify="space-between"
        style={{ marginBottom: grid(2) }}
      >
        <H6>{title}</H6>
        <div>
          <FilledButton onClick={onButtonClick}>{buttonText}</FilledButton>
        </div>
      </Flex>
      <Table headers={tableHeaders} rows={tableRows} />
      <Flex>
        <Pagination
          activePage={pagination.activePage}
          nextItem={null}
          prevItem={null}
          totalPages={pagination.totalPages}
          style={{ marginTop: grid(2) }}
          onPageChange={(
            _: React.MouseEvent<HTMLAnchorElement>,
            { activePage }
          ) => pagination.onPageChange(activePage as number)}
        />
      </Flex>
    </Card>
  );
};

export default SharedPatientAnalysisComponent;
