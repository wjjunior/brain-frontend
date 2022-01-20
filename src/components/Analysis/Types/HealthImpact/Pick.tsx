import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Card from '../../../Card';
import Flex from '../../../Flex';
import Separator from '../../../Separator';
import SelectField from '../../../SelectField';
import { H6, H7 } from '../../../Typography';
import { OutlineButton } from '../../../Button';
import { grid } from '../../../../config/theme';
import { Option } from '../../../Select';
import { themeGrid, themeProp } from '../../../../utils/functional';
import { Analysis } from '../../../../modules/analysis/types';

import { ReactComponent as CloseIcon } from '../../../../assets/icons/close.svg';
import TextArea from '../../../TextArea';

interface IHealthImpactFinishComponentProps {
  draftHealthImpactSubjects: Analysis.HealthImpactSubjects;
  subjectOptions: Option[];
  selectedSubjects: Option[];
  onOpenFieldChange: (subject: string, key: string, value: string) => void;
  onSubjectSelect: (options: Option[]) => void;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const HealthImpactFinishComponent: React.FC<IHealthImpactFinishComponentProps> = ({
  draftHealthImpactSubjects,
  subjectOptions,
  selectedSubjects,
  onOpenFieldChange,
  onSubjectSelect,
  onPreviousClick,
  onNextClick,
}) => {
  const intl = useIntl();

  const displayedText = (
    <Flex wrap="wrap">
      {selectedSubjects.map((option) => (
        <BorderedH7 key={option.key}>
          {option.label}
          <CloseIcon
            width={grid(1.5)}
            height={grid(1.5)}
            style={{
              marginLeft: grid(0.5),
              top: grid(0.25),
              position: 'relative',
              zIndex: 1,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSubjectSelect(
                selectedSubjects.filter((subject) => subject.key !== option.key)
              );
            }}
          />
        </BorderedH7>
      ))}
    </Flex>
  );

  const configureInputChange = (subject: string, key: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => onOpenFieldChange(subject, key, e.target.value);

  return (
    <Card flex="1">
      <Flex justify="space-between" style={{ marginBottom: grid(2) }}>
        <Flex direction="column">
          <H6>
            {intl.formatMessage({ id: 'analysis.healthImpact.subjects' })}
          </H6>
          <H6 color="gray" style={{ marginTop: grid(2) }}>
            {intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescription',
            })}
          </H6>
        </Flex>
        <Flex
          justify="flex-end"
          style={{ marginTop: grid(2), paddingLeft: grid(1.5) }}
        >
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
            <OutlineButton size="small" onClick={onNextClick}>
              {intl.formatMessage({ id: 'common.nextStep' })}
            </OutlineButton>
          </div>
        </Flex>
      </Flex>
      <StyledSelectField
        id="health-impact-pick-subjects"
        multiple
        options={subjectOptions}
        selectedOptions={selectedSubjects}
        displayedText={
          selectedSubjects.length
            ? displayedText
            : intl.formatMessage({
                id: 'analysis.healthImpact.subjectSelectPlaceholder',
              })
        }
        onChange={onSubjectSelect}
        labelText={intl.formatMessage({
          id: 'analysis.healthImpact.subjectSelectLabel',
        })}
        placeholder={intl.formatMessage({
          id: 'analysis.healthImpact.subjectSelectPlaceholder',
        })}
      />
      <Separator margin="2 0 3" />
      {!!draftHealthImpactSubjects.stigma && (
        <Flex direction="column">
          <TextArea
            id="health-impact-stigma"
            value={draftHealthImpactSubjects.stigma.description}
            onChange={configureInputChange('stigma', 'description')}
            labelText={intl.formatMessage({
              id: 'analysis.healthImpact.subjectOptions.stigma',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescribePlaceholder',
            })}
            style={{ overflowY: 'hidden' }}
          />
          <Separator margin="2 0" />
        </Flex>
      )}
      {!!draftHealthImpactSubjects.personality && (
        <Flex direction="column">
          <TextArea
            id="health-impact-personality"
            value={draftHealthImpactSubjects.personality.description}
            onChange={configureInputChange('personality', 'description')}
            labelText={intl.formatMessage({
              id: 'analysis.healthImpact.subjectOptions.personality',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescribePlaceholder',
            })}
            style={{ overflowY: 'hidden' }}
          />
          <Separator margin="2 0" />
        </Flex>
      )}
      {!!draftHealthImpactSubjects.negativeBeliefs && (
        <Flex direction="column">
          <TextArea
            id="health-impact-negative-beliefs"
            value={draftHealthImpactSubjects.negativeBeliefs.description}
            onChange={configureInputChange('negativeBeliefs', 'description')}
            labelText={intl.formatMessage({
              id: 'analysis.healthImpact.subjectOptions.negativeBeliefs',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescribePlaceholder',
            })}
            style={{ overflowY: 'hidden' }}
          />
          <Separator margin="2 0" />
        </Flex>
      )}
      {!!draftHealthImpactSubjects.familyRelations && (
        <Flex direction="column">
          <H6 style={{ marginBottom: grid(3) }}>
            {intl.formatMessage({
              id: 'analysis.healthImpact.subjectOptions.familyRelations',
            })}
          </H6>
          <TextArea
            id="health-impact-family-relations-family"
            value={draftHealthImpactSubjects.familyRelations.family}
            onChange={configureInputChange('familyRelations', 'family')}
            labelText={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsFamilyRelationsFields.family',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescribePlaceholder',
            })}
            style={{ marginBottom: grid(3), overflowY: 'hidden' }}
          />
          <TextArea
            id="health-impact-family-relations-ambient"
            value={draftHealthImpactSubjects.familyRelations.ambient}
            onChange={configureInputChange('familyRelations', 'ambient')}
            labelText={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsFamilyRelationsFields.ambient',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescribePlaceholder',
            })}
            style={{ marginBottom: grid(3), overflowY: 'hidden' }}
          />
          <TextArea
            id="health-impact-family-relations-context"
            value={draftHealthImpactSubjects.familyRelations.context}
            onChange={configureInputChange('familyRelations', 'context')}
            labelText={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsFamilyRelationsFields.context',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescribePlaceholder',
            })}
            style={{ marginBottom: grid(3), overflowY: 'hidden' }}
          />
          <Separator margin="0 0 2" />
        </Flex>
      )}
      {!!draftHealthImpactSubjects.occupationalHistory && (
        <Flex direction="column">
          <H6 style={{ marginBottom: grid(3) }}>
            {intl.formatMessage({
              id: 'analysis.healthImpact.subjectOptions.occupationalHistory',
            })}
          </H6>
          <TextArea
            id="health-impact-occupational-history-work"
            value={draftHealthImpactSubjects.occupationalHistory.work}
            onChange={configureInputChange('occupationalHistory', 'work')}
            labelText={intl.formatMessage({
              id:
                'analysis.healthImpact.subjectsOccupationalHistoryFields.work',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescribePlaceholder',
            })}
            style={{ marginBottom: grid(3), overflowY: 'hidden' }}
          />
          <TextArea
            id="health-impact-occupational-history-leisure"
            value={draftHealthImpactSubjects.occupationalHistory.leisure}
            onChange={configureInputChange('occupationalHistory', 'leisure')}
            labelText={intl.formatMessage({
              id:
                'analysis.healthImpact.subjectsOccupationalHistoryFields.leisure',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescribePlaceholder',
            })}
            style={{ marginBottom: grid(3), overflowY: 'hidden' }}
          />
          <TextArea
            id="health-impact-occupational-history-ambient"
            value={draftHealthImpactSubjects.occupationalHistory.ambient}
            onChange={configureInputChange('occupationalHistory', 'ambient')}
            labelText={intl.formatMessage({
              id:
                'analysis.healthImpact.subjectsOccupationalHistoryFields.ambient',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescribePlaceholder',
            })}
            style={{ marginBottom: grid(3), overflowY: 'hidden' }}
          />
          <TextArea
            id="health-impact-occupational-history-others"
            value={draftHealthImpactSubjects.occupationalHistory.others}
            onChange={configureInputChange('occupationalHistory', 'others')}
            labelText={intl.formatMessage({
              id:
                'analysis.healthImpact.subjectsOccupationalHistoryFields.others',
            })}
            placeholder={intl.formatMessage({
              id: 'analysis.healthImpact.subjectsDescribePlaceholder',
            })}
            style={{ marginBottom: grid(3), overflowY: 'hidden' }}
          />
          <Separator margin="0 0 2" />
        </Flex>
      )}
    </Card>
  );
};

const BorderedH7 = styled(H7).attrs({ color: 'gray' })`
  padding: ${themeGrid(0.25)};
  border-radius: ${themeGrid(0.5)};
  border: 1px solid ${themeProp('colors.primary.silver')};
  margin-right: ${themeGrid(1)};
  margin-bottom: ${themeGrid(1)};
`;

const StyledSelectField = styled(SelectField)`
  button {
    max-height: none;
    padding-bottom: 2px;
  }
`;

export default HealthImpactFinishComponent;
