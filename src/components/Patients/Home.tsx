import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Pagination } from 'semantic-ui-react';
import styled from 'styled-components';

import Table, { Header } from '../Table';
import Card from '../Card';
import Flex from '../Flex';
import Initials from '../Initials';
import TextField from '../TextField';
import Breadcrumb from '../Breadcrumb';
import FilledButton from '../Button';
import { H6, H7, Link } from '../Typography';
import EmptyList from '../Shared/EmptyList';
import DatePicker, { DatePickerInput } from '../DatePicker';

import { grid } from '../../config/theme';
import { themeGrid, themeProp } from '../../utils/functional';
import { ReactComponent as OptionsIcon } from '../../assets/icons/table-options.svg';
import { ReactComponent as AccessLinkIcon } from '../../assets/icons/access-link.svg';
import { ReactComponent as AnalysisRecordIcon } from '../../assets/icons/analysis-record.svg';
import { ROUTE_ANALYSIS_CREATE_CORESET } from '../../modules/analysis/constants';
import { OutlineButton } from '../Button';
import {
  ROUTE_PATIENTS_EDIT,
  ROUTE_PATIENTS_CREATE,
} from '../../modules/patients/constants';

type PatientRow = {
  id: string;
  name: string;
  goals: number;
  goalsInProgress: number;
  diagnostics: number;
  created: string;
};

interface IPatientsHomeComponentProps {
  patientRows: PatientRow[];
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDateSelected: (dateObj: Date) => void;
  searchByName: (name: string) => void;
  filterName: string;
  filterDate?: Date;
  resetFilters: () => void;
}

const PatientsHomeComponent: React.FC<IPatientsHomeComponentProps> = ({
  patientRows,
  activePage,
  totalPages,
  onPageChange,
  onDateSelected,
  searchByName,
  filterName,
  filterDate,
  resetFilters,
}) => {
  const intl = useIntl();

  const patientHeaders: Header[] = [
    {
      key: 'name',
      label: intl.formatMessage({
        id: 'common.name',
      }),
      cellProps: {
        textAlign: 'left',
      },
    },
    {
      key: 'totalGoals',
      label: intl.formatMessage({
        id: 'patients.patientTotalGoals',
      }),
    },
    {
      key: 'goalsInProgress',
      label: intl.formatMessage({
        id: 'patients.patientGoalsInProgress',
      }),
    },
    {
      key: 'totalAnalysis',
      label: intl.formatMessage({
        id: 'patients.patientTotalAnalysis',
      }),
    },
    {
      key: 'createdAt',
      label: intl.formatMessage({
        id: 'common.date',
      }),
    },
    {
      key: 'options',
      label: intl.formatMessage({
        id: 'common.options',
      }),
    },
  ];

  const mappedPatientRows = patientRows.map((row) => ({
    ...row,
    name: (
      <>
        <Link
          to={ROUTE_PATIENTS_EDIT.replace(':verb', 'edit').replace(
            ':id',
            row.id
          )}
        >
          <Initials
            filled
            size={3}
            text={row.name}
            backgroundColor="colors.secondary.green"
          />
          {row.name}
        </Link>
      </>
    ),
    totalGoals: intl.formatNumber(row.goals),
    goalsInProgress: intl.formatNumber(row.goalsInProgress),
    totalAnalysis: intl.formatNumber(row.diagnostics),
    createdAt: intl.formatDate(row.created),
    options: <RowOptions patientId={row.id} />,
  }));

  const [name, setName] = useState(filterName);

  return (
    <Flex direction="column" flex="1" style={{ height: '100%' }}>
      <Flex
        as="header"
        justify="space-between"
        align="flex-start"
        style={{ marginBottom: grid(3) }}
      >
        <Flex direction="column">
          <Breadcrumb>
            {null}
            <Breadcrumb.Item
              text={intl.formatMessage({ id: 'patients.title' })}
            />
          </Breadcrumb>
          <H6 style={{ marginTop: grid(1) }}>
            {intl.formatMessage({ id: 'patients.description' })}
          </H6>
        </Flex>
        <Link to={ROUTE_PATIENTS_CREATE.replace(':verb', 'create')}>
          <FilledButton>
            {intl.formatMessage({ id: 'patients.createPatient' })}
          </FilledButton>
        </Link>
      </Flex>
      <Flex direction="row" align="flex-end">
        <TextField
          id="patient-search"
          labelText={intl.formatMessage({ id: 'patients.searchPatientLabel' })}
          placeholder={intl.formatMessage({
            id: 'patients.searchPatientPlaceholder',
          })}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
            searchByName(e.target.value);
          }}
          style={{ width: grid(32), marginRight: grid(2) }}
          value={name}
        />
        <div>
          <DatePicker
            maxDate={new Date()}
            onChange={(dateArr) => onDateSelected(dateArr[0])}
            value={filterDate?.toISOString()}
            style={{ flex: 0 }}
          >
            <DatePickerInput
              id="date-picker-calendar-id"
              type="text"
              readOnly
              labelText={intl.formatMessage({ id: 'patients.dateRangeLabel' })}
              placeholder={intl.formatMessage({
                id: 'patients.dateRangePlaceholder',
              })}
            />
          </DatePicker>
        </div>
        <div>
          <OutlineButton
            onClick={resetFilters}
            style={{ marginLeft: grid(2) }}
            align="flex-end"
          >
            {intl.formatMessage({ id: 'common.resetFilters' })}
          </OutlineButton>
        </div>
      </Flex>

      {patientRows.length ? (
        <>
          <Table headers={patientHeaders} rows={mappedPatientRows} />
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
        </>
      ) : (
        <EmptyList
          title={intl.formatMessage({ id: 'patients.emptyListTitle' })}
          subtitle={intl.formatMessage({ id: 'patients.emptyListSubtitle' })}
        />
      )}
    </Flex>
  );
};

interface IRowOptionsProps {
  patientId: string;
}

const RowOptions: React.FC<IRowOptionsProps> = ({ patientId }) => {
  const intl = useIntl();
  const currentRowOptionsRef = useRef<HTMLDivElement>(null);
  const [isRowOptionsOpen, setRowOptionsOpenState] = useState<boolean>(false);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      const ref = currentRowOptionsRef.current;

      if (!ref || ref.contains(event.target as Node)) return;

      setRowOptionsOpenState(false);
    }

    document.addEventListener('mousedown', onDocumentClick);

    return () => document.removeEventListener('mousedown', onDocumentClick);
  }, []);

  return (
    <Flex
      ref={currentRowOptionsRef}
      onMouseLeave={() => setRowOptionsOpenState(false)}
      style={{ position: 'relative' }}
    >
      <OptionsIcon
        onClick={() => setRowOptionsOpenState((currentState) => !currentState)}
      />
      {isRowOptionsOpen && (
        <RowMenu>
          <Link
            to={ROUTE_PATIENTS_EDIT.replace(':verb', 'edit').replace(
              ':id',
              patientId
            )}
          >
            <Flex align="center" as="li">
              <AccessLinkIcon />
              <H7>{intl.formatMessage({ id: 'common.openRecord' })}</H7>
            </Flex>
          </Link>

          <Link to={ROUTE_ANALYSIS_CREATE_CORESET + `?patientId=${patientId}`}>
            <Flex align="center" as="li">
              <AnalysisRecordIcon />
              <H7>{intl.formatMessage({ id: 'common.createAnalysis' })}</H7>
            </Flex>
          </Link>
        </RowMenu>
      )}
    </Flex>
  );
};

const RowMenu = styled(Card).attrs({ as: 'ul' })`
  box-shadow: 0px 2px 10px rgba(245, 244, 255, 0.64);
  margin-top: ${themeGrid(3)};
  margin-left: -${themeGrid(14.75)};
  padding: ${themeGrid(2)};
  width: ${themeGrid(18)};
  z-index: 1;

  ${Link}:not(:last-of-type) {
    margin-bottom: ${themeGrid(1)};
  }

  li {
    cursor: pointer;

    svg {
      margin-right: ${themeGrid(2)};

      path {
        fill: ${themeProp('colors.primary.gray')};
      }
    }

    &:hover {
      ${H7} {
        color: ${themeProp('colors.primary.purple')};
      }

      svg path {
        fill: ${themeProp('colors.primary.purple')};
      }
    }
  }

  &,
  &:before {
    position: absolute;
  }

  &:before {
    content: ' ';
    width: ${themeGrid(1.25)};
    height: ${themeGrid(1.25)};
    top: -${themeGrid(0.75)};
    right: ${themeGrid(1.025)};
    transform: rotate(45deg);
    border-bottom: none !important;
    border-right: none !important;
    border: 1px solid ${themeProp('colors.primary.silver')};
    background-color: ${themeProp('colors.primary.white')};
  }
`;

export default PatientsHomeComponent;
