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
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_INTELECTUAL_OPERATION,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_PATIENT,
  ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_ATTENTION,
} from '../../../../../modules/analysis/constants';
import { displayToast } from '../../../../../modules/shared/actions';

const NeuropsichologicalProfileUniversalFunctionsMemoryContainer: React.FC = () => {
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
    navigate(ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_INTELECTUAL_OPERATION);
  const onNextClick = () =>
    navigate(
      ROUTE_ANALYSIS_NEUROPSICHOLOGICAL_PROFILE_UNIVERSAL_FUNCTIONS_ATTENTION
    );

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

  const universalFunctionsMemoryQuestions = [
    {
      id: 'codification',
      subject: intl.formatMessage({
        id:
          'analysis.neuropsichologicalProfile.universalFunctionsMemoryQuestions.codification',
      }),
    },
    {
      id: 'storage',
      subject: intl.formatMessage({
        id:
          'analysis.neuropsichologicalProfile.universalFunctionsMemoryQuestions.storage',
      }),
    },
    {
      id: 'evocation',
      subject: intl.formatMessage({
        id:
          'analysis.neuropsichologicalProfile.universalFunctionsMemoryQuestions.evocation',
      }),
    },
  ];

  const categories = [
    {
      id: 'memoryVerbal',
      name: intl.formatMessage({
        id: 'analysis.neuropsichologicalProfile.universalFunctionsMemoryVerbal',
      }),
      questions: universalFunctionsMemoryQuestions,
    },
    {
      id: 'memoryNonVerbal',
      name: intl.formatMessage({
        id:
          'analysis.neuropsichologicalProfile.universalFunctionsMemoryNonVerbal',
      }),
      questions: universalFunctionsMemoryQuestions,
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
        id: 'analysis.neuropsichologicalProfile.universalFunctionsMemory',
      })}
      titleTooltip="analysis.neuropsichologicalProfile.universalFunctionsMemoryTooltip"
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

export default NeuropsichologicalProfileUniversalFunctionsMemoryContainer;
