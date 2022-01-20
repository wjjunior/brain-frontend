import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import Flex from '../../../Flex';
import Tooltip from '../../../Tooltip';
import { H7, H8 } from '../../../Typography';
import { colors, grid } from '../../../../config/theme';
import CoreSetCategoryLabel from '../../Shared/CoreSetCategoryLabel';
import RadioGroup, { Option } from '../../../Shared/RadioGroup';
import TextField from '../../../TextField';
import { Analysis } from '../../../../modules/analysis/types';

type Question = {
  id: string;
  subject?: string;
};

export interface INeuropsichologicalProfileFormQuestionComponentProps {
  id: string;
  name: string;
  nameTooltip?: string;
  questions: Question[];
  selectedAnswers: {
    [key: string]: Analysis.NeuropsichologicalProfileFormAnswer;
  };
  onQuestionAnswered: (question: string, option: Option) => void;
  configureQuestionOnDescriptionChange: (
    question: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NeuropsichologicalProfileFormQuestionComponent: React.FC<INeuropsichologicalProfileFormQuestionComponentProps> = ({
  id,
  name,
  nameTooltip,
  questions,
  onQuestionAnswered,
  selectedAnswers,
  configureQuestionOnDescriptionChange,
}) => {
  const intl = useIntl();

  const neuropsichologicalFormOptions: Option[] = useMemo(
    () => [
      {
        key: '1',
        label: intl.formatMessage({
          id: 'analysis.neuropsichologicalProfile.qualifiers.1',
        }),
      },
      {
        key: '2',
        label: intl.formatMessage({
          id: 'analysis.neuropsichologicalProfile.qualifiers.2',
        }),
      },
      {
        key: '3',
        label: intl.formatMessage({
          id: 'analysis.neuropsichologicalProfile.qualifiers.3',
        }),
      },
      {
        key: '4',
        label: intl.formatMessage({
          id: 'analysis.neuropsichologicalProfile.qualifiers.4',
        }),
      },
      {
        key: '0',
        label: intl.formatMessage({
          id: 'analysis.neuropsichologicalProfile.qualifiers.0',
        }),
      },
    ],
    [intl]
  );

  return (
    <Flex direction="column">
      <CoreSetCategoryLabel>
        {name}
        {!!nameTooltip && (
          <Tooltip wide="very" position="bottom left">
            <H8>
              {intl.formatMessage(
                {
                  id: nameTooltip,
                },
                { linebreak: <br /> }
              )}
            </H8>
          </Tooltip>
        )}
      </CoreSetCategoryLabel>
      {questions.map((question, index) => (
        <Flex
          key={question.id}
          direction="column"
          style={{ marginTop: grid(2), paddingLeft: grid(1.5) }}
        >
          {!!question.subject && (
            <Flex align="center">
              <Flex
                as="span"
                justify="center"
                align="center"
                style={{
                  width: grid(3),
                  height: grid(3),
                  borderRadius: grid(0.5),
                  border: `1px solid ${colors.primary.silver}`,
                  marginRight: grid(1),
                }}
              >
                {index + 1}
              </Flex>
              <H7 color="gray">{question.subject}</H7>
            </Flex>
          )}
          <div style={{ margin: `${grid(2)} 0 ${grid(3)}` }}>
            <RadioGroup
              prefix={id + question.id}
              options={neuropsichologicalFormOptions}
              selectedOption={neuropsichologicalFormOptions.find(
                (option) =>
                  option.key === selectedAnswers[question.id].qualifier
              )}
              onChange={(option) => onQuestionAnswered(question.id, option)}
            />
          </div>
          <TextField
            id={'intelectual-operation-description' + id + question.id}
            value={selectedAnswers[question.id].description}
            onChange={configureQuestionOnDescriptionChange(question.id)}
            labelText={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.describeLabel',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.neuropsichologicalProfile.describePlaceholder',
            })}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default NeuropsichologicalProfileFormQuestionComponent;
