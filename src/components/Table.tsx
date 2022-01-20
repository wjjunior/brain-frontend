import React from 'react';
import styled from 'styled-components';
import { Table, TableCellProps } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { H6 } from './Typography';
import { themeGrid, themeProp } from '../utils/functional';

export type Header = {
  key: string;
  label: string;
  cellProps?: TableCellProps;
};

export type Row = {
  [key: string]: number | string | React.ReactNode;
};

interface ITableProps {
  headers: Header[];
  rows: Row[];
}

const MyTable: React.FC<ITableProps> = ({ headers, rows }) => (
  <StyledTable basic padded="very" textAlign="center">
    <Table.Header>
      <Table.Row>
        {headers.map((header, i) => (
          <Table.HeaderCell key={header.key}>
            <H6 color="gray">{header.label}</H6>
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {rows.map((row, i) => (
        <Table.Row key={i}>
          {headers.map((header, j) => (
            <Table.Cell key={j} {...(header.cellProps || {})}>
              <H6 bold={!j} color="gray">
                {row[header.key]}
              </H6>
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </StyledTable>
);

const StyledTable = styled(Table)`
  &.ui.table {
    background-color: ${themeProp('colors.primary.white')};
    border: 1px solid ${themeProp('colors.primary.silver')};

    .table-options path {
      fill: ${themeProp('colors.primary.purple')};
    }

    td:first-of-type,
    th:first-of-type {
      max-width: ${themeGrid(37)};

      ${H6} {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    &[class*='very padded'] td,
    &[class*='very padded'] th {
      padding: ${themeGrid(2)};

      &:first-of-type {
        padding-left: ${themeGrid(4)};
      }

      &:last-of-type {
        padding-right: ${themeGrid(4)};
      }
    }

    /* making sure its not header row */
    tr:not(:first-child:last-child):hover {
      cursor: pointer;
      background-color: ${themeProp('colors.secondary.silver')};

      td ${H6} {
        color: ${themeProp('colors.primary.purple')};
      }

      .table-options {
        border-radius: ${themeGrid(0.5)};
        background-color: ${themeProp('colors.primary.silver')};
      }
    }
  }
`;

export default MyTable;
