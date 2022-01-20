import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Pagination } from 'semantic-ui-react';
import styled from 'styled-components';

import Table, { Header } from '../Table';
import Card from '../Card';
import Flex from '../Flex';
import Initials from '../Initials';
import Breadcrumb from '../Breadcrumb';
import FilledButton from '../Button';
import { H6, H7, Link } from '../Typography';

import { grid } from '../../config/theme';
import { themeGrid, themeProp } from '../../utils/functional';
import { ReactComponent as OptionsIcon } from '../../assets/icons/table-options.svg';
import { ReactComponent as AccessLinkIcon } from '../../assets/icons/access-link.svg';
import { ReactComponent as AnalysisRecordIcon } from '../../assets/icons/analysis-record.svg';
import { ReactComponent as ViewIcon } from '../../assets/icons/view.svg';
import { ROUTE_PATIENTS_EDIT } from '../../modules/patients/constants';
import Select, { Option } from '../Select';
import { OutlineButton } from '../Button';

import TypeSelection from './TypeSelection';
import SelectField from '../SelectField';
import EmptyList from '../Shared/EmptyList';
import { ValueMap } from '../../utils/typings';
import {
  ROUTE_ANALYSIS_REPORT_CORESET,
  // ROUTE_ANALYSIS_REPORT_GLOBAL_PROGNOSTIC,
  // ROUTE_ANALYSIS_REPORT_NEUROPSICHOLOGICAL_PROFILE,
  // ROUTE_ANALYSIS_REPORT_PROSPECTIVE_RESULT_MAP,
} from '../../modules/analysis/constants';

type AnalysisRow = {
  id: string;
  code: string;
  diagnosticType: string;
  diagnosticUri: string | null;
  coreSet: {
    id: string;
    description: string;
  };
  patient: {
    id: string;
    name: string;
  };
  created: string;
};

interface IAnalysisHomeComponentProps {
  analysisRows: AnalysisRow[];
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  patientOptions: Option[];
  selectedPatient?: Option;
  onSearchChange: (term: string) => void;
  onPatientSelection: (options: Option[]) => void;
  resetFilters: () => void;
  analysisTypeOptions: Option[];
  selectedAnalysisType: Option[];
  dateRangeOptions: Option[];
  dateRangeSelectedOption: {
    key: string;
    label: string;
  };
  onAnalysisTypeSelect: (options: Option[]) => void;
  onDateRangeSelect: (days: string) => void;
}

const AnalysisHomeComponent: React.FC<IAnalysisHomeComponentProps> = ({
  analysisRows,
  activePage,
  totalPages,
  dateRangeOptions,
  dateRangeSelectedOption,
  onPageChange,
  patientOptions,
  selectedPatient,
  onSearchChange,
  onPatientSelection,
  resetFilters,
  analysisTypeOptions,
  selectedAnalysisType,
  onAnalysisTypeSelect,
  onDateRangeSelect,
}) => {
  const intl = useIntl();

  const analysisHeaders: Header[] = [
    {
      key: 'type',
      label: intl.formatMessage({
        id: 'common.type',
      }),
      cellProps: {
        textAlign: 'left',
      },
    },
    {
      key: 'code',
      label: intl.formatMessage({
        id: 'common.code',
      }),
      cellProps: {
        textAlign: 'left',
      },
    },
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
      key: 'createdAtDate',
      label: intl.formatMessage({
        id: 'common.date',
      }),
    },
    {
      key: 'createdAtTime',
      label: intl.formatMessage({
        id: 'common.hour',
      }),
    },
    {
      key: 'options',
      label: intl.formatMessage({
        id: 'common.options',
      }),
    },
  ];

  const DiagnosticTypesMap: ValueMap<string> = {
    CoreSet: 'common.analysis.coreSet',
    GlobalPrognostic: 'common.analysis.globalPrognostic',
    ProspectiveResultMap: 'common.analysis.prospectiveResultMap',
    NeuropsichologicalProfile: 'common.analysis.neuropsichologicalProfile',
  };

  const getDiagnosticReportUrl = (
    type: string,
    patientId: string,
    coreSetId: string,
    diagnosticId: string
  ): string | undefined => {
    let route: string;

    switch (type) {
      case 'CoreSet':
        route = ROUTE_ANALYSIS_REPORT_CORESET;
        break;
      // case 'GlobalPrognostic':
      //   route = ROUTE_ANALYSIS_REPORT_GLOBAL_PROGNOSTIC;
      //   break;
      // case 'ProspectiveResultMap':
      //   route = ROUTE_ANALYSIS_REPORT_PROSPECTIVE_RESULT_MAP;
      //   break;
      // case 'NeuropsichologicalProfile':
      //   route = ROUTE_ANALYSIS_REPORT_NEUROPSICHOLOGICAL_PROFILE;
      //   break;
      default:
        return;
    }

    return route
      .replace(':patientId', patientId)
      .replace(':coreSetId', coreSetId)
      .replace(':id', diagnosticId);
  };

  const mappedAnalysisRows = analysisRows.map((row) => ({
    ...row,
    name: (
      <>
        <Initials
          filled
          size={3}
          text={row.patient.name}
          backgroundColor="colors.secondary.green"
        />
        {row.patient.name}
      </>
    ),
    type: intl.formatMessage({
      id: DiagnosticTypesMap[row.diagnosticType],
    }),
    createdAtDate: intl.formatDate(row.created),
    createdAtTime: intl.formatTime(row.created),
    options: (
      <RowOptions
        patientId={row.patient.id}
        diagnosticReportUrl={getDiagnosticReportUrl(
          row.diagnosticType,
          row.patient.id,
          row.coreSet.id,
          row.id
        )}
      />
    ),
  }));

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
              text={intl.formatMessage({ id: 'analysis.title' })}
            />
          </Breadcrumb>
          <H6 style={{ marginTop: grid(1) }}>
            {intl.formatMessage({ id: 'analysis.description' })}
          </H6>
        </Flex>
        <TypeSelection
          trigger={
            <FilledButton>
              {intl.formatMessage({ id: 'analysis.createAnalysis' })}
            </FilledButton>
          }
        />
      </Flex>
      <Flex direction="row" align="flex-end" justify="space-between">
        <Flex direction="row" align="flex-end">
          <SelectField
            id="analysis-selection"
            options={analysisTypeOptions}
            selectedOptions={selectedAnalysisType}
            onChange={onAnalysisTypeSelect}
            labelText={intl.formatMessage({ id: 'common.type' })}
            placeholder={intl.formatMessage({
              id: 'analysis.selectAnalysisTypePlaceholder',
            })}
            style={{ width: grid(32), marginRight: grid(2) }}
          />
          <SelectField
            searchable
            options={patientOptions}
            selectedOptions={selectedPatient ? [selectedPatient] : []}
            onSearchChange={onSearchChange}
            onChange={onPatientSelection}
            labelText={intl.formatMessage({ id: 'common.patient' })}
            searchPlaceHolder={intl.formatMessage({
              id: 'analysis.searchByName',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.selectPatientPlaceholder',
            })}
            style={{ width: grid(32), marginRight: grid(2) }}
          />
          <div>
            <OutlineButton onClick={resetFilters}>
              {intl.formatMessage({ id: 'common.resetFilters' })}
            </OutlineButton>
          </div>
        </Flex>
        <Select
          options={dateRangeOptions}
          selectedOptions={[dateRangeSelectedOption]}
          onChange={([option]: Option[]) => onDateRangeSelect(option.key)}
          placeholder={intl.formatMessage({
            id: 'dashboard.selectDateRange',
          })}
        />
      </Flex>

      {mappedAnalysisRows.length ? (
        <>
          <Table headers={analysisHeaders} rows={mappedAnalysisRows} />
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
          title={intl.formatMessage({ id: 'analysis.emptyListTitle' })}
          subtitle={intl.formatMessage({ id: 'analysis.emptyListSubtitle' })}
        />
      )}
    </Flex>
  );
};

interface IRowOptionsProps {
  patientId: string;
  diagnosticReportUrl?: string;
}

const RowOptions: React.FC<IRowOptionsProps> = ({
  patientId,
  diagnosticReportUrl,
}) => {
  const intl = useIntl();
  const currentRowOptionsRef = useRef<HTMLDivElement>(null);
  const [isRowOptionsOpen, setRowOptionsOpenState] = useState<boolean>(false);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      const ref = currentRowOptionsRef.current;
      const modalElement = document.getElementById('analysis-type-selection');
      const target = event.target as Node;

      if (
        !ref ||
        ref.contains(target) ||
        (modalElement && modalElement.contains(target))
      )
        return;

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

          <TypeSelection
            patientId={patientId}
            trigger={
              <Flex align="center" as="li">
                <AnalysisRecordIcon />
                <H7>{intl.formatMessage({ id: 'analysis.createAnalysis' })}</H7>
              </Flex>
            }
          />

          {!!diagnosticReportUrl && (
            <Link to={diagnosticReportUrl}>
              <Flex align="center" as="li">
                <ViewIcon />
                <H7>{intl.formatMessage({ id: 'common.viewFile' })}</H7>
              </Flex>
            </Link>
          )}
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
  width: ${themeGrid(22)};
  z-index: 1;

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

export default AnalysisHomeComponent;
