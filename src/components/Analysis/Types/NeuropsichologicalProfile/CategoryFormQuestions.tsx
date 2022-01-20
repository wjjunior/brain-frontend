import React from 'react';
import { useIntl } from 'react-intl';

import Card from '../../../Card';
import Flex from '../../../Flex';
import Tooltip from '../../../Tooltip';
import { H6, H8 } from '../../../Typography';
import { OutlineButton } from '../../../Button';
import { grid } from '../../../../config/theme';

import NeuropsichologicalProfileFormQuestionComponent, {
  INeuropsichologicalProfileFormQuestionComponentProps,
} from './FormQuestion';
import { Option } from '../../../Shared/RadioGroup';
import { Analysis } from '../../../../modules/analysis/types';

interface INeuropsichologicalProfileCategoryFormQuestionsComponentProps {
  title: string;
  titleTooltip?: string;
  description?: string;
  onPreviousClick: () => void;
  onNextClick: () => void;
  categories: Omit<
    INeuropsichologicalProfileFormQuestionComponentProps,
    | 'onQuestionAnswered'
    | 'selectedAnswers'
    | 'configureQuestionOnDescriptionChange'
  >[];
  selectedAnswers: {
    [key: string]: {
      [key: string]: Analysis.NeuropsichologicalProfileFormAnswer;
    };
  };
  onQuestionAnswered: (
    categoryId: string,
    questionId: string,
    option: Option
  ) => void;
  configureSubcategoryOnDescriptionChange?: (
    category: string
  ) => (question: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NeuropsichologicalProfileCategoryFormQuestionsComponent: React.FC<INeuropsichologicalProfileCategoryFormQuestionsComponentProps> = ({
  configureSubcategoryOnDescriptionChange,
  onQuestionAnswered,
  onPreviousClick,
  onNextClick,
  title,
  titleTooltip,
  description,
  categories,
  selectedAnswers,
}) => {
  const intl = useIntl();

  return (
    <Card flex="1">
      <Flex justify="space-between">
        <Flex direction="column">
          <H6>
            {title}
            {!!titleTooltip && (
              <Tooltip wide="very" position="bottom left">
                <H8>
                  {intl.formatMessage(
                    {
                      id: titleTooltip,
                    },
                    { linebreak: <br /> }
                  )}
                </H8>
              </Tooltip>
            )}
          </H6>
          {!!description && (
            <H6 color="gray" style={{ marginTop: grid(2) }}>
              {description}
            </H6>
          )}
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
            <OutlineButton size="small" onClick={onNextClick}>
              {intl.formatMessage({ id: 'common.nextStep' })}
            </OutlineButton>
          </div>
        </Flex>
      </Flex>
      {categories.map((category) => (
        <NeuropsichologicalProfileFormQuestionComponent
          key={category.id}
          selectedAnswers={selectedAnswers[category.id] || {}}
          onQuestionAnswered={(questionId, option) =>
            onQuestionAnswered(category.id, questionId, option)
          }
          configureQuestionOnDescriptionChange={
            configureSubcategoryOnDescriptionChange
              ? configureSubcategoryOnDescriptionChange(category.id)
              : () => () => null
          }
          {...category}
        />
      ))}
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
    </Card>
  );
};

export default NeuropsichologicalProfileCategoryFormQuestionsComponent;
