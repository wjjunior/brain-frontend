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
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_COGNITIVE_FUNCTIONS,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_PATIENT,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_ATTENTION,
} from '../../../../modules/analysis/constants';
import { displayToast } from '../../../../modules/shared/actions';

const NeuropsichologicalProfileExecutiveFunctionsContainer: React.FC = () => {
  const category = 'executiveFunctions';

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
      ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_ATTENTION
    );
  const onNextClick = () =>
    navigate(ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_COGNITIVE_FUNCTIONS);

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
      id: 'executiveFunctions',
      name: intl.formatMessage({
        id: 'analysis.neuropsichologicalProfile.executiveFunctions',
      }),
      questions: [
        {
          id: 'planning',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.executiveFunctionsQuestions.planning',
          }),
        },
        {
          id: 'implementation',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.executiveFunctionsQuestions.implementation',
          }),
        },
        {
          id: 'correction',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.executiveFunctionsQuestions.correction',
          }),
        },
        {
          id: 'flexibility',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.executiveFunctionsQuestions.flexibility',
          }),
        },
        {
          id: 'impulsiveness',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.executiveFunctionsQuestions.impulsiveness',
          }),
        },
        {
          id: 'operationalMemory',
          subject: intl.formatMessage({
            id:
              'analysis.neuropsichologicalProfile.executiveFunctionsQuestions.operationalMemory',
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
        id: 'analysis.neuropsichologicalProfile.executiveFunctions',
      })}
      titleTooltip="analysis.neuropsichologicalProfile.executiveFunctionsTooltip"
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

export default NeuropsichologicalProfileExecutiveFunctionsContainer;
