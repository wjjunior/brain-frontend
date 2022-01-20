import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import Flex from '../../../Flex';
import { H6, H7, Label } from '../../../Typography';
import RadioGroup, { Option as RadioOption } from '../../../Shared/RadioGroup';
import CheckboxGroup, {
  Option as CheckboxOption,
} from '../../../Shared/CheckboxGroup';

import { ValueMap } from '../../../../utils/typings';
import { colors, grid } from '../../../../config/theme';
import { themeGrid, themeProp } from '../../../../utils/functional';
import { Analysis } from '../../../../modules/analysis/types';
import IcFLabel from '../../Shared/IcFLabel';
import TextArea from '../../../TextArea';
import { ENVIRONMENTAL_FACTORS_QUALIFIER_MAP } from '../../../../modules/analysis/constants';

type ICoreSetIcFComponentProps = {
  icF: Analysis.ICF;
  draftIcF?: Analysis.AnsweredIcf;
  onInformationSourceSelected: (options: CheckboxOption[]) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIcFAnswered: (o: RadioOption, code: string) => void;
};

const CoreSetIcFComponent: React.FC<ICoreSetIcFComponentProps> = ({
  icF,
  draftIcF,
  onInformationSourceSelected,
  onDescriptionChange,
  onIcFAnswered,
}) => {
  const intl = useIntl();
  const answerGroups = icF.answers.reduce(
    (acc: ValueMap<Analysis.AnswerOption[]>, answer) => ({
      ...acc,
      [answer.code]: [...(acc[answer.code] || []), answer],
    }),
    {}
  );

  const informationSourceOptions: CheckboxOption[] = icF.informationSources.map(
    (infoSource) => ({
      key: infoSource.id,
      label: infoSource.description,
    })
  );

  const informationSourceMap: ValueMap<CheckboxOption> = icF.informationSources.reduce(
    (acc, infoSource) => ({
      ...acc,
      [infoSource.id]: {
        key: infoSource.id,
        label: infoSource.description,
      },
    }),
    {}
  );

  const selectedInformationSources: CheckboxOption[] = (
    draftIcF?.informationSourceIds || []
  )
    .map((infoSourceId) => informationSourceMap[infoSourceId])
    .filter(Boolean);

  return (
    <Flex direction="column" flex="1" style={{ margin: `${grid(2)} 0` }}>
      <IcFLabel code={icF.code} name={icF.name} />
      <H7
        style={{
          color: colors.secondary.gray,
          marginBottom: grid(1),
          lineHeight: grid(1.7575),
        }}
      >
        {icF.description
          .replace(/(\\(r↵?|t))+/g, ' ')
          .split('\n')
          .map((chunk, i) => (
            <React.Fragment key={i}>
              {!i && <br />}
              {chunk}
            </React.Fragment>
          ))}
      </H7>
      {Object.entries(answerGroups).map(([key, answerGroup]) => {
        const selectedAnswerId = draftIcF ? draftIcF.answers[key] : undefined;
        const selectedAnswer = selectedAnswerId
          ? answerGroup.find((answer) => answer.id === selectedAnswerId)
          : undefined;

        if (icF.code.startsWith('e')) {
          answerGroup = answerGroup
            .sort((aA, aB) =>
              parseInt(aB.qualifier) > parseInt(aA.qualifier)
                ? -1
                : parseInt(aB.qualifier) < parseInt(aA.qualifier)
                ? 1
                : 0
            )
            .map((answer) => ({
              ...answer,
              qualifier:
                ENVIRONMENTAL_FACTORS_QUALIFIER_MAP[parseInt(answer.qualifier)],
            }));
        }

        const options = answerGroup.map((answer) => ({
          key: answer.id,
          label: <AnswerOption answer={answer} />,
        }));

        const selectedOption = selectedAnswer
          ? {
              key: selectedAnswer.id,
              label: <AnswerOption answer={selectedAnswer} />,
            }
          : undefined;

        return (
          <Flex key={key} direction="column" style={{ margin: `${grid(1)} 0` }}>
            {!!key && (
              <span style={{ marginBottom: grid(1) }}>
                <BorderH6 style={{ marginRight: grid(1) }}>
                  {answerGroup[0].code}
                </BorderH6>
                <InlineH6>{answerGroup[0].name}</InlineH6>
              </span>
            )}
            <RadioGroup
              selectedOption={selectedOption}
              onChange={(option) => onIcFAnswered(option, key)}
              options={options}
            />
          </Flex>
        );
      })}
      <Flex direction="column" style={{ margin: `${grid(2)} 0` }}>
        <Label style={{ marginBottom: grid(1) }}>
          {intl.formatMessage({ id: 'analysis.coreSet.informationSources' })}
        </Label>
        <CheckboxGroup
          onChange={onInformationSourceSelected}
          selectedOptions={selectedInformationSources}
          options={informationSourceOptions}
        />
      </Flex>
      <Flex flex="1">
        <TextArea
          id="problem-description"
          value={draftIcF?.description}
          labelText={intl.formatMessage({
            id: 'analysis.coreSet.problemDescriptionLabel',
          })}
          placeholder={intl.formatMessage({
            id: 'analysis.coreSet.problemDescriptionPlaceholder',
          })}
          onChange={onDescriptionChange}
          flex="1"
        />
      </Flex>
    </Flex>
  );
};

const AnswerOption: React.FC<{ answer: Analysis.AnswerOption }> = ({
  answer,
}) => (
  <Flex direction="column" justify="center">
    <H6 align="center">{answer.qualifier}</H6>
    <H6 align="center" style={{ textTransform: 'capitalize' }}>
      {answer.description.toLowerCase()}
    </H6>
  </Flex>
);

const InlineH6 = styled(H6).attrs({ as: 'span' })``;

const BorderH6 = styled(H6).attrs({ as: 'span' })`
  border: 1px solid ${themeProp('colors.primary.silver')};
  border-radius: ${themeGrid(0.5)};
  padding: ${themeGrid(0.5)};
`;

export default CoreSetIcFComponent;
