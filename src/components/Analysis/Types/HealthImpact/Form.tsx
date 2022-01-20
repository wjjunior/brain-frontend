import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Card from '../../../Card';
import Flex from '../../../Flex';
import { H6 } from '../../../Typography';
import { OutlineButton } from '../../../Button';
import { grid } from '../../../../config/theme';
import { Analysis } from '../../../../modules/analysis/types';
import { themeGrid, themeProp } from '../../../../utils/functional';
import RadioGroup from '../../../Shared/RadioGroup';
import TextArea from '../../../TextArea';

interface IHealthImpactSubjectFormComponentProps {
  title: string;
  description: string;
  descriptionContent: string;
  questions: Analysis.ResearchFormQuestion[];
  answers: { [key: string]: string };
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (questionId: string, answerId: string) => void;
  onNextClick: () => void;
  onPreviousClick: () => void;
}

const HealthImpactSubjectFormComponent: React.FC<IHealthImpactSubjectFormComponentProps> = ({
  title,
  description,
  descriptionContent,
  questions,
  answers,
  onDescriptionChange,
  onOptionSelect,
  onNextClick,
  onPreviousClick,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1">
      <Flex justify="space-between" style={{ marginBottom: grid(2) }}>
        <Flex direction="column">
          <H6>{title}</H6>
          <H6 color="gray" style={{ marginTop: grid(2) }}>
            {description}
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
            <OutlineButton
              size="small"
              onClick={onNextClick}
              style={{ marginRight: grid(1) }}
            >
              {intl.formatMessage({ id: 'common.nextStep' })}
            </OutlineButton>
          </div>
        </Flex>
      </Flex>
      <TextArea
        id="health-impact-form-description"
        value={descriptionContent}
        onChange={onDescriptionChange}
        labelText={intl.formatMessage({
          id: 'analysis.healthImpact.subjectsDescribeLabel',
        })}
        placeholder={intl.formatMessage({
          id: 'analysis.healthImpact.subjectsDescribePlaceholder',
        })}
        style={{ marginBottom: grid(2) }}
      />
      <H6>
        {intl.formatMessage({
          id: 'analysis.healthImpact.form',
        })}
      </H6>
      {questions.map((question) => {
        const options = question.items.map((item) => ({
          key: item.id,
          label: item.name,
        }));

        return (
          <React.Fragment key={question.id}>
            <Flex align="center" style={{ margin: `${grid(3)} 0` }}>
              <Tag style={{ marginRight: grid(1) }}>{question.code}</Tag>
              <H6>{question.title.trim().replace(/\n|\t|\r/g, '')}</H6>
            </Flex>
            <RadioGroup
              selectedOption={options.find(
                (option) => option.key === answers[question.id]
              )}
              options={options}
              onChange={(option) => onOptionSelect(question.id, option.key)}
            />
          </React.Fragment>
        );
      })}
    </Card>
  );
};

const Tag = styled(H6).attrs({ as: 'div' })`
  background: ${themeProp('colors.situational.info')};
  border-radius: ${themeGrid(0.5)};
  padding: ${themeGrid(0.75)};
  width: fit-content;
  height: fit-content;
`;

export default HealthImpactSubjectFormComponent;
