import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NeuropsichologicalProfileCategoryFormQuestionsComponent from '../../../../../components/Analysis/Types/NeuropsichologicalProfile/CategoryFormQuestions';
import { Option } from '../../../../../components/Shared/RadioGroup';
import { selectors } from '../../../../../modules/analysis';
import {
  markNeuropsichologicalProfileProgress,
  updateNeuropsichologicalProfileForm,
} from '../../../../../modules/analysis/actions';
import {
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_EXECUTIVE_FUNCTIONS,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_PATIENT,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_MEMORY,
} from '../../../../../modules/analysis/constants';
import { displayToast } from '../../../../../modules/shared/actions';

const NeuropsichologicalProfileUniversalFunctionsAttentionContainer: React.FC = () => {
  const category = 'universalFunctions';

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
    navigate(
      ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_MEMORY
    );
  const onNextClick = () =>
    navigate(ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_EXECUTIVE_FUNCTIONS);

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
      id: 'attention',
      name: intl.formatMessage({
        id: 'analysis.neuropsichologicalProfile.universalFunctionsAttention',
      }),
      questions: [
        {
          id: 'sustained',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.universalFunctionsAttentionQuestions.sustained',
          }),
        },
        {
          id: 'focused',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.universalFunctionsAttentionQuestions.focused',
          }),
        },
        {
          id: 'divided',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.universalFunctionsAttentionQuestions.divided',
          }),
        },
        {
          id: 'alternated',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.universalFunctionsAttentionQuestions.alternated',
          }),
        },
        {
          id: 'general',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.universalFunctionsAttentionQuestions.general',
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
        id: 'analysis.neuropsichologicalProfile.universalFunctionsAttention',
      })}
      titleTooltip="analysis.neuropsichologicalProfile.universalFunctionsAttentionTooltip"
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

export default NeuropsichologicalProfileUniversalFunctionsAttentionContainer;
