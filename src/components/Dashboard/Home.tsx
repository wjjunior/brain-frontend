import React from 'react';
import { useIntl } from 'react-intl';

import Flex from '../Flex';
import Card from '../Card';
import Breadcrumb from '../Breadcrumb';
import Select, { Option } from '../Select';
import { H3, H6, H7 } from '../Typography';
import { grid } from '../../config/theme';

import { ReactComponent as PatientsIcon } from '../../assets/icons/patients-summary.svg';
import { ReactComponent as AnalysisIcon } from '../../assets/icons/analysis-summary.svg';
import { ReactComponent as AgeIcon } from '../../assets/icons/age-summary.svg';

import IcdRankings, { IIcdRankingsProps } from './Summaries/IcdRankings';
import GenderSummary, { IGenderSummaryProps } from './Summaries/GenderSummary';
import GoalsSummary, { IGoalsSummaryProps } from './Summaries/GoalsSummary';
import LatestAnalysis, {
  ILatestAnalysisProps,
} from './Summaries/LatestAnalysis';
import GoalsInProgress, {
  IGoalsInProgressProps,
} from './Summaries/GoalsInProgress';
import CoreSetRankings, {
  ICoreSetRankingsProps,
} from './Summaries/CoreSetRankings';
import CompromisedCategoryRankings, {
  ICompromisedCategoryRankingsProps,
} from './Summaries/CompromisedCategoryRankings';

interface IDashboardHomeComponentProps
  extends IIcdRankingsProps,
    ILatestAnalysisProps,
    IGenderSummaryProps,
    IGoalsSummaryProps,
    IGoalsInProgressProps,
    ICoreSetRankingsProps,
    ICompromisedCategoryRankingsProps {
  dateRangeOptions: Option[];
  dateRangeSelectedOption: {
    key: string;
    label: string;
  };
  totalPatients: number;
  totalAnalysis: number;
  mostCommonAgeGroup: string;
  ageRange: number[];
  fullName: string;
  onDateRangeSelect: (days: string) => void;
}

const DashboardHomeComponent: React.FC<IDashboardHomeComponentProps> = ({
  icdRankPlacements,
  latestAnalysis,
  latestGoals,
  goalsSummary,
  compromisedCategories,
  coreSetRankPlacements,
  genderSummary,
  dateRangeOptions,
  dateRangeSelectedOption,
  fullName,
  totalAnalysis,
  totalPatients,
  mostCommonAgeGroup,
  ageRange,
  onDateRangeSelect,
}) => {
  const intl = useIntl();

  return (
    <Flex flex="1" direction="column">
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
              text={intl.formatMessage(
                { id: 'dashboard.greeting' },
                { fullName }
              )}
            />
          </Breadcrumb>
          <H6 style={{ marginTop: grid(1) }}>
            {intl.formatMessage({ id: 'dashboard.description' })}
          </H6>
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

      <Flex>
        <Flex flex="3.45" direction="column">
          <Flex>
            <Flex flex="1" direction="column" style={{ marginRight: grid(3) }}>
              <ColumnSummary
                summaryTitle={intl.formatMessage({
                  id: 'dashboard.patientsSummaryTitle',
                })}
                summaryValue={intl.formatNumber(totalPatients)}
                icon={<PatientsIcon />}
              />
              <IcdRankings icdRankPlacements={icdRankPlacements} />
            </Flex>

            <Flex flex="1" direction="column" style={{ marginRight: grid(3) }}>
              <ColumnSummary
                summaryTitle={intl.formatMessage({
                  id: 'dashboard.analysisSummaryTitle',
                })}
                summaryValue={intl.formatNumber(totalAnalysis)}
                icon={<AnalysisIcon />}
              />
              <LatestAnalysis latestAnalysis={latestAnalysis} />
            </Flex>

            <Flex flex="1" direction="column" style={{ marginRight: grid(3) }}>
              <ColumnSummary
                summaryTitle={intl.formatMessage({
                  id: 'dashboard.ageRangeTitle',
                })}
                summaryValue={intl.formatMessage({
                  id: mostCommonAgeGroup,
                })}
                summaryDescription={intl.formatMessage(
                  {
                    id: 'common.ageRangesSuffix',
                  },
                  { from: ageRange[0], to: ageRange[1] }
                )}
                icon={<AgeIcon />}
              />

              <GenderSummary genderSummary={genderSummary} />
            </Flex>
          </Flex>

          <Flex flex="1" style={{ marginTop: grid(2) }}>
            <CoreSetRankings coreSetRankPlacements={coreSetRankPlacements} />

            <CompromisedCategoryRankings
              compromisedCategories={compromisedCategories}
            />
          </Flex>
        </Flex>

        <Flex flex="1" direction="column">
          <GoalsSummary goalsSummary={goalsSummary} />

          <GoalsInProgress latestGoals={latestGoals} />
        </Flex>
      </Flex>
    </Flex>
  );
};

interface IColumnSummaryProps {
  summaryTitle: string;
  summaryValue: string;
  summaryDescription?: string;
  icon?: React.ReactNode;
}

export const ColumnSummary: React.FC<IColumnSummaryProps> = ({
  summaryTitle,
  summaryValue,
  summaryDescription,
  icon,
}) => (
  <Card>
    <H6>{summaryTitle}</H6>
    <Flex justify="space-between" align="center" style={{ marginTop: '8px' }}>
      <Flex align="flex-end">
        <H3>{summaryValue}</H3>
        {!!summaryDescription && (
          <H7 color="gray" style={{ marginLeft: grid(1) }}>
            {summaryDescription}
          </H7>
        )}
      </Flex>
      {icon}
    </Flex>
  </Card>
);

export default DashboardHomeComponent;
