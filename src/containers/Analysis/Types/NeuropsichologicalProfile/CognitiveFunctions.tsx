import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NeuropsichologicalProfileCategoryFormQuestionsComponent from '../../../../components/Analysis/Types/NeuropsichologicalProfile/CategoryFormQuestions';
import { Option } from '../../../../components/Shared/RadioGroup';
import { selectors } from '../../../../modules/analysis';
import {
  markNeuropsichologicalProfileProgress,
  updateNeuropsichologicalProfileForm,
} from '../../../../modules/analysis/actions';
import {
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_EXECUTIVE_FUNCTIONS,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_PATIENT,
} from '../../../../modules/analysis/constants';
import { displayToast } from '../../../../modules/shared/actions';

const NeuropsichologicalProfileCognitiveFunctionsContainer: React.FC = () => {
  const category = 'cognitiveFunctions';

  const intl = useIntl();
  const dispatch = useDispatch();
  const draftNeuropsichologicalProfileFormCategory = useSelector(
    selectors.draftNeuropsichologicalProfileFormCategory(category)
  );
  const draftPatientId = useSelector(
    selectors.draftNeuropsichologicalProfilePatientId
  );

  const navigate = useNavigate();
  const onPreviousClick = () =>
    navigate(ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_EXECUTIVE_FUNCTIONS);
  const onNextClick = () =>
    navigate(ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_ADDITIONAL_INFO);

  useEffect(() => {
    if (!draftPatientId) {
      dispatch(
        displayToast({
          id: 'neuropsichological-profile-patient-missing',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.patientNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_PATIENT);
      return;
    }

    dispatch(markNeuropsichologicalProfileProgress(category));
  }, [draftPatientId, dispatch, navigate]);

  const categories = [
    {
      id: 'language',
      name: intl.formatMessage({
        id: 'analysis.neuropsichologicalProfile.cognitiveFunctionsLanguage',
      }),
      nameTooltip:
        'analysis.neuropsichologicalProfile.cognitiveFunctionsLanguageTooltip',
      questions: [
        {
          id: 'expression',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.cognitiveFunctionsLanguageQuestions.expression',
          }),
        },
        {
          id: 'comprehension',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.cognitiveFunctionsLanguageQuestions.comprehension',
          }),
        },
      ],
    },
    {
      id: 'numericCognition',
      name: intl.formatMessage({
        id:
          'analysis.neuropsichologicalProfile.cognitiveFunctionsNumericCognition',
      }),
      nameTooltip:
        'analysis.neuropsichologicalProfile.cognitiveFunctionsNumericCognitionTooltip',
      questions: [
        {
          id: 'calculation',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.cognitiveFunctionsNumericCognitionQuestions.calculation',
          }),
        },
        {
          id: 'numericProcessing',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.cognitiveFunctionsNumericCognitionQuestions.numericProcessing',
          }),
        },
      ],
    },
    {
      id: 'socialSkills',
      name: intl.formatMessage({
        id: 'analysis.neuropsichologicalProfile.cognitiveFunctionsSocialSkills',
      }),
      nameTooltip:
        'analysis.neuropsichologicalProfile.cognitiveFunctionsSocialSkillsTooltip',
      questions: [
        {
          id: 'socialSkill',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.cognitiveFunctionsSocialSkillsQuestions.socialSkill',
          }),
        },
        {
          id: 'praxis',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.cognitiveFunctionsSocialSkillsQuestions.praxis',
          }),
        },
        {
          id: 'motorPraxis',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.cognitiveFunctionsSocialSkillsQuestions.motorPraxis',
          }),
        },
        {
          id: 'ideationalPraxis',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.cognitiveFunctionsSocialSkillsQuestions.ideationalPraxis',
          }),
        },
      ],
    },
    {
      id: 'motorSkills',
      name: intl.formatMessage({
        id: 'analysis.neuropsichologicalProfile.cognitiveFunctionsMotorSkills',
      }),
      nameTooltip:
        'analysis.neuropsichologicalProfile.cognitiveFunctionsMotorSkillsTooltip',
      questions: [
        {
          id: 'rough',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.cognitiveFunctionsMotorSkillsQuestions.rough',
          }),
        },
        {
          id: 'soft',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.cognitiveFunctionsMotorSkillsQuestions.soft',
          }),
        },
      ],
    },
  ];

  function onQuestionAnswered(
    subcategory: string,
    question: string,
    option: Option
  ) {
    dispatch(
      updateNeuropsichologicalProfileForm({
        category,
        subcategory,
        question,
        qualifier: option.key,
      })
    );
  }

  function configureSubcategoryOnDescriptionChange(subcategory: string) {
    return function configureQuestionOnDescriptionChange(question: string) {
      return function onDescriptionChange(
        e: React.ChangeEvent<HTMLInputElement>
      ) {
        dispatch(
          updateNeuropsichologicalProfileForm({
            category,
            subcategory,
            question,
            description: e.target.value,
          })
        );
      };
    };
  }

  return (
    <NeuropsichologicalProfileCategoryFormQuestionsComponent
      title={intl.formatMessage({
        id: 'analysis.neuropsichologicalProfile.cognitiveFunctions',
      })}
      {...{
        categories,
        selectedAnswers: draftNeuropsichologicalProfileFormCategory,
        onNextClick,
        onPreviousClick,
        onQuestionAnswered,
        configureSubcategoryOnDescriptionChange,
      }}
    />
  );
};

export default NeuropsichologicalProfileCognitiveFunctionsContainer;
