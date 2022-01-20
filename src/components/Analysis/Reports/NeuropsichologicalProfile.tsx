import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import CoreSetCategoryLabel from '../Shared/CoreSetCategoryLabel';
import IcFProgress, { IIcFProgress } from '../Shared/IcFProgress';
import Card from '../../Card';
import Flex from '../../Flex';
import Input from '../../Input';
import Separator from '../../Separator';
import Breadcrumb from '../../Breadcrumb';
import Select, { Option } from '../../Select';
import { H4, H6, H7, Link } from '../../Typography';
import { colors, grid } from '../../../config/theme';

import { ROUTE_ANALYSIS_HOME } from '../../../modules/analysis/constants';
import Circle from '../../Circle';

interface IReportNeuropsichologicalProfileComponentProps {
  patientName: string;
  fillDate: string;
  categories: Array<{
    label: string;
    v?: number;
    l?: number;
    n?: number;
    e?: number;
  }>;
  sectionOptions: Option[];
  selectedSection: Option[];
  onSectionSelect: (options: Option[]) => void;
  sectionResults: IIcFProgress[];
}

const ReportNeuropsichologicalProfileComponent: React.FC<IReportNeuropsichologicalProfileComponentProps> = ({
  patientName,
  fillDate,
  categories,
  sectionOptions,
  selectedSection,
  sectionResults,
  onSectionSelect,
}) => {
  const intl = useIntl();

  const colorOptions = [
    colors.situational.warning,
    colors.situational.info,
    colors.secondary.green,
  ];

  const bars = categories
    .map((category) => Object.keys(category).filter((key) => key !== 'label'))
    .flat()
    .filter((key, index, arr) => arr.indexOf(key) === index);

  const legends =
    bars.length > 1
      ? bars.map((bar, index) => ({ label: bar, color: colorOptions[index] }))
      : [];

  return (
    <Flex direction="column">
      <Flex direction="column" style={{ marginBottom: grid(3) }}>
        <Breadcrumb>
          <Breadcrumb.Item
            text={intl.formatMessage({ id: 'sideMenu.analysisHome' })}
            linkComponent={(props) => (
              <Link {...props} to={ROUTE_ANALYSIS_HOME}></Link>
            )}
          />
          <Breadcrumb.Item
            text={intl.formatMessage({ id: 'analysis.reportsTitle' })}
          />
          <Breadcrumb.Item
            text={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.reportTitle',
            })}
          />
        </Breadcrumb>
        <H6 style={{ marginTop: grid(1) }}>
          {intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.reportDescription',
          })}
        </H6>
      </Flex>
      <Card flex="1" style={{ padding: grid(4) }}>
        <H4 color="gray" bold style={{ marginBottom: grid(3) }}>
          {intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.reportResultTitle',
          })}
        </H4>
        <Flex flex="1">
          <Flex flex="1" direction="column" style={{ marginRight: grid(4) }}>
            <H6 bold color="gray" style={{ marginBottom: grid(2) }}>
              {intl.formatMessage({
                id: 'common.patient',
              })}
            </H6>
            <Input readOnly value={patientName} />
          </Flex>
          {/* <Flex flex="1" direction="column">
            <H6 bold color="gray" style={{ marginBottom: grid(2) }}>
              {intl.formatMessage({
                id: 'common.fillDate',
              })}
            </H6>
            <Input readOnly value={intl.formatDate(fillDate)} />
          </Flex> */}
        </Flex>
        <Separator margin="2 0" />
        <CoreSetCategoryLabel style={{ marginTop: 0, marginBottom: grid(2) }}>
          {intl.formatMessage({
            id: 'common.generalInfo',
          })}
        </CoreSetCategoryLabel>
        <Card>
          <Flex justify="flex-end" style={{ marginBottom: grid(2) }}>
            {legends.map((legend) => (
              <LegendItem>
                <H7 color="primary.gray">
                  <Circle
                    backgroundColor="gray"
                    style={{ backgroundColor: legend.color }}
                  />
                  {legend.label}
                </H7>
              </LegendItem>
            ))}
          </Flex>
          <StyledBarChart
            layout="vertical"
            width={document.body.clientWidth - 372}
            height={260}
            barGap={16}
            barSize={16}
            data={categories}
          >
            <CartesianGrid color={colors.primary.silver} horizontal={false} />
            <XAxis
              type="number"
              tickMargin={16}
              tickLine={false}
              stroke={colors.secondary.gray}
            />
            <YAxis
              dataKey="label"
              type="category"
              width={128}
              axisLine={false}
              tickLine={false}
              tickMargin={16}
              stroke={colors.secondary.gray}
            />
            {bars.map((key) => (
              <Bar
                dataKey={key}
                fill={colorOptions.shift() || colors.situational.warning}
                minPointSize={16}
                radius={4}
              />
            ))}
          </StyledBarChart>
        </Card>
        <H6 color="gray" style={{ marginTop: grid(3), marginBottom: grid(1) }}>
          {intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.reportEasierWithFilters',
          })}
        </H6>
        <H6 bold color="gray" style={{ marginBottom: grid(2) }}>
          {intl.formatMessage({
            id: 'analysis.neuropsichologicalProfile.reportFilterLabel',
          })}
        </H6>
        <Select
          placeholder=""
          options={sectionOptions}
          selectedOptions={selectedSection}
          onChange={onSectionSelect}
        />
        <Card style={{ marginTop: grid(2) }}>
          <IcFProgress
            width={grid(48)}
            range={['0', '1', '2', '3', '4']}
            icFs={sectionResults}
          />
        </Card>
      </Card>
    </Flex>
  );
};

const LegendItem = styled(Flex).attrs({
  as: 'li',
})`
  ${Circle} {
    margin-right: ${grid(1)};
  }

  &:not(:last-of-type) {
    margin-right: ${grid(3)};
  }
`;

const StyledBarChart = styled(BarChart)`
  .recharts-cartesian-axis-line {
    stroke: ${colors.primary.silver};
  }

  .recharts-cartesian-axis:not(.yAxis)
    .recharts-cartesian-axis-tick:nth-child(3)
    text {
    fill: ${colors.primary.gray};
  }

  .recharts-cartesian-grid-vertical line {
    stroke-dasharray: 6 4;

    &:first-child {
      visibility: hidden;
    }

    &:nth-child(3) {
      stroke: ${colors.primary.gray};
    }
  }
`;

export default ReportNeuropsichologicalProfileComponent;
