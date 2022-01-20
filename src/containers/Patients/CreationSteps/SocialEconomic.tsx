import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import SocialEconomicComponent, {
  Question,
} from '../../../components/Patients/CreationSteps/SocialEconomic';
import { Option } from '../../../components/Shared/RadioGroup';
import { selectors } from '../../../modules/patients';
import { answerSocialEconomicQuestion } from '../../../modules/patients/actions';
import { ActionPayloads, Patients } from '../../../modules/patients/types';

const SocialEconomicContainer: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const currentSocialEconomicLevel = useSelector(selectors.socialEconomicLevel);
  const socialEconomicAnswers = useSelector(selectors.socialEconomicAnswers);
  const socialEconomicValidationText = useSelector(
    selectors.socialEconomicValidationText
  );

  const getIntlOptions = useCallback(
    function (prefix: string) {
      return Object.keys(intl.messages)
        .filter((key) => key.includes(prefix))
        .map((key) => ({
          key: key.replace(prefix, ''),
          label: intl.formatMessage({ id: key }),
        }))
        .sort((a, b) => (b.label > a.label ? -1 : a.label > b.label ? 1 : 0));
    },
    [intl]
  );

  const questions: Question[] = useMemo(
    () =>
      [
        ...getIntlOptions(
          'patients.personalInfo.socialEconomicQuestions.assets.'
        ).map((option) => ({
          ...option,
          label: intl.formatMessage(
            {
              id: 'patients.personalInfo.socialEconomicQuestions.assetsPrefix',
            },
            { asset: option.label }
          ),
          parentKey: 'assets',
          options: (() => [
            {
              key: '0',
              label: '0',
            },
            {
              key: '1',
              label: '1',
            },
            {
              key: '2',
              label: '2',
            },
            {
              key: '3',
              label: '3',
            },
            {
              key: '4+',
              label: intl.formatMessage({ id: 'common.fourOrMore' }),
            },
          ])(),
        })),
        {
          key: 'educationLevel',
          parentKey: 'educationLevel',
          label: intl.formatMessage({
            id:
              'patients.personalInfo.socialEconomicQuestions.educationLevelQuestion',
          }),
          options: getIntlOptions(
            'patients.personalInfo.socialEconomicQuestions.educationLevel.'
          ),
        },
        ...getIntlOptions(
          'patients.personalInfo.socialEconomicQuestions.publicServices.'
        ).map((option) => ({
          ...option,
          parentKey: 'publicServices',
          label: intl.formatMessage(
            {
              id:
                'patients.personalInfo.socialEconomicQuestions.publicServicesPrefix',
            },
            { service: option.label }
          ),
          options: (() => [
            {
              key: 'yes',
              label: intl.formatMessage({ id: 'common.yes' }),
            },
            {
              key: 'no',
              label: intl.formatMessage({ id: 'common.no' }),
            },
          ])(),
        })),
      ].map((question) => {
        let existingAnswer: string | null = null;

        if (question.parentKey === 'educationLevel') {
          existingAnswer = socialEconomicAnswers[question.parentKey];
        }

        if (question.parentKey === 'assets') {
          existingAnswer =
            socialEconomicAnswers[question.parentKey][
              question.key as Patients.AssetValidKeys
            ];
        }

        if (question.parentKey === 'publicServices') {
          existingAnswer =
            socialEconomicAnswers[question.parentKey][
              question.key as Patients.PublicServiceValidKeys
            ];
        }

        const selectedOption = existingAnswer
          ? question.options.find((option) => option.key === existingAnswer)
          : undefined;

        return {
          ...question,
          selectedOption: selectedOption || undefined,
        };
      }),
    [intl, getIntlOptions, socialEconomicAnswers]
  );

  function onQuestionAnswered(parentKey: string, key: string, option: Option) {
    const actionPayload: ActionPayloads.AnswerSocialEconomicQuestion = {};

    switch (parentKey) {
      case 'educationLevel': {
        actionPayload.educationLevel = option.key as Patients.EducationLevelAnswers;

        break;
      }

      case 'assets': {
        actionPayload.asset = {
          key: key as Patients.AssetValidKeys,
          value: option.key as Patients.AssetValidAnswers,
        };

        break;
      }

      case 'publicServices': {
        actionPayload.publicService = {
          key: key as Patients.PublicServiceValidKeys,
          value: option.key as Patients.PublicServiceAnswers,
        };

        break;
      }

      default:
        return;
    }

    return dispatch(answerSocialEconomicQuestion(actionPayload));
  }

  return (
    <SocialEconomicComponent
      {...{
        currentSocialEconomicLevel,
        questions,
        onQuestionAnswered,
        socialEconomicValidationText,
      }}
    />
  );
};

export default SocialEconomicContainer;
