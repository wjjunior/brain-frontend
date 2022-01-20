import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HealthImpactSubjectFormComponent from '../../../../../components/Analysis/Types/HealthImpact/Form';
import { ValidHealthImpactSubjectsWithForm } from '../../../../../modules/analysis/types';
import { selectors } from '../../../../../modules/analysis';
import {
  loadHealthImpactSubjectFormRequest,
  updateHealthImpactFormField,
  updateHealthImpactOpenField,
} from '../../../../../modules/analysis/actions';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import {
  getNextFormRoute,
  getPreviousFormRoute,
  ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_LIFE_QUALITY,
  ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK,
} from '../../../../../modules/analysis/constants';
import { displayToast } from '../../../../../modules/shared/actions';

interface IHealthImpactSubjectsLifeQualityContainerProps {
  subject: ValidHealthImpactSubjectsWithForm;
  researchFormId: string;
}

const HealthImpactSubjectsLifeQualityContainer: React.FC<IHealthImpactSubjectsLifeQualityContainerProps> = ({
  subject,
  researchFormId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draftHealthImpactSelectedSubjects = useSelector(
    selectors.draftHealthImpactSelectedSubjects
  );
  const subjectFormQuestions = useSelector(
    selectors.draftHealthImpactSubjectQuestions(subject)
  );
  const subjectFormAnswers = useSelector(
    selectors.draftHealthImpactSubjectAnswers(subject)
  );
  const subjectFormDescription = useSelector(
    selectors.draftHealthImpactSubjectDescription(subject)
  );
  const isHealthImpactSubjectFormLoading = useSelector(
    selectors.isHealthImpactSubjectFormLoading
  );
  const didHealthImpactSubjectResearchFormError = useSelector(
    selectors.didHealthImpactSubjectResearchFormError
  );

  const isFormPopulated = !!subjectFormQuestions;

  useEffect(() => {
    if (!draftHealthImpactSelectedSubjects.includes(subject)) {
      navigate(ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK);
    }
  }, [navigate, draftHealthImpactSelectedSubjects, subject]);

  useEffect(() => {
    if (
      draftHealthImpactSelectedSubjects.includes(subject) &&
      !isFormPopulated &&
      !isHealthImpactSubjectFormLoading &&
      !didHealthImpactSubjectResearchFormError
    ) {
      dispatch(loadHealthImpactSubjectFormRequest(subject, researchFormId));
    }
  }, [
    dispatch,
    subject,
    researchFormId,
    isFormPopulated,
    isHealthImpactSubjectFormLoading,
    draftHealthImpactSelectedSubjects,
    didHealthImpactSubjectResearchFormError,
  ]);

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateHealthImpactOpenField(subject, 'description', e.target.value)
    );
  const onOptionSelect = (questionId: string, answerId: string) => {
    // store it to redux to be sent later
    dispatch(updateHealthImpactFormField(subject, questionId, answerId));
  };

  if (!subjectFormQuestions || isHealthImpactSubjectFormLoading) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  const onNextClick = () => {
    if (
      subjectFormQuestions.questions.every(
        (question) => (subjectFormAnswers || {})[question.id]
      )
    ) {
      // add validation that all questions were answered, and all inputs typed in
      navigate(
        getNextFormRoute(
          draftHealthImpactSelectedSubjects,
          ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_LIFE_QUALITY
        )
      );
    } else {
      dispatch(
        displayToast({
          id: 'health-impact-subject-form-incomplete',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'analysis.healthImpact.formIncomplete',
          timeout: 5e3,
        })
      );
    }
  };

  const onPreviousClick = () => {
    if (
      subjectFormQuestions.questions.every(
        (question) => (subjectFormAnswers || {})[question.id]
      )
    ) {
      navigate(
        getPreviousFormRoute(
          draftHealthImpactSelectedSubjects,
          ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_LIFE_QUALITY
        )
      );
    } else {
      dispatch(
        displayToast({
          id: 'health-impact-subject-form-incomplete',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'analysis.healthImpact.formIncomplete',
          timeout: 5e3,
        })
      );
    }
  };

  return (
    <HealthImpactSubjectFormComponent
      title={subjectFormQuestions.title}
      description={subjectFormQuestions.description}
      questions={subjectFormQuestions.questions}
      answers={subjectFormAnswers || {}}
      descriptionContent={subjectFormDescription || ''}
      {...{ onDescriptionChange, onOptionSelect, onNextClick, onPreviousClick }}
    />
  );
};

export default HealthImpactSubjectsLifeQualityContainer;
