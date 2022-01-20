import React, { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HealthImpactFinishComponent from '../../../../components/Analysis/Types/HealthImpact/Finish';
import { Option } from '../../../../components/Select';
import { selectors } from '../../../../modules/analysis';
import { selectors as patientSelectors } from '../../../../modules/patients';
import {
  markHealthImpactProgress,
  saveHealthImpactSubjects,
} from '../../../../modules/analysis/actions';
import {
  ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK,
  ROUTE_ANALYSIS_HEALTH_IMPACT_PATIENT,
  HEALTH_IMPACT_FORM_SUBJECTS,
  ROUTE_ANALYSIS_HOME,
} from '../../../../modules/analysis/constants';
import {
  Analysis,
  ValidHealthImpactSubjects,
  ValidHealthImpactSubjectsWithForm,
} from '../../../../modules/analysis/types';
import { loadPatient } from '../../../../modules/patients/actions';
import { displayToast } from '../../../../modules/shared/actions';
import { Dimmer, Loader } from 'semantic-ui-react';

const HealthImpactFinishContainer: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const focusedPatient = useSelector(patientSelectors.focusedPatient);
  const isFocusedPatientLoading = useSelector(
    patientSelectors.isFocusedPatientLoading
  );

  const draftPatientId = useSelector(selectors.draftHealthImpactPatientId);
  const draftHealthImpactSelectedSubjects = useSelector(
    selectors.draftHealthImpactSelectedSubjects
  );
  const isHealhImpactResearchFormSaving = useSelector(
    selectors.isHealhImpactResearchFormSaving
  );
  const draftHealthImpactSubjects = useSelector(
    selectors.draftHealthImpactSubjects
  );

  const getIntlOptions = useCallback(
    function (prefix: string, order?: boolean): Option[] {
      const options = Object.keys(intl.messages)
        .filter((key) => key.includes(prefix))
        .map((key) => ({
          key: key.replace(prefix, ''),
          label: intl.formatMessage({ id: key }),
        }));

      if (order) {
        return options.sort((a, b) =>
          b.label > a.label ? -1 : a.label > b.label ? 1 : 0
        );
      }

      return options;
    },
    [intl]
  );

  const subjectOptions = useMemo(
    () => getIntlOptions('analysis.healthImpact.subjectOptions.'),
    [getIntlOptions]
  );

  const onPreviousClick = () =>
    navigate(ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK);
  const onNextClick = () => {
    if (!draftPatientId) return;

    if (!selectedSubjects.length) {
      dispatch(markHealthImpactProgress('finish', false));
      dispatch(
        displayToast({
          id: 'health-impact-no-subject-selected',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'analysis.healthImpact.noSubjectSelected',
          timeout: 5e3,
        })
      );

      return navigate(ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK);
    }

    for (const subjectKey in draftHealthImpactSubjects) {
      const subject =
        draftHealthImpactSubjects[subjectKey as ValidHealthImpactSubjects];

      if (!subject || 'form' in subject) continue;

      if (Object.values(subject).some((value) => !value)) {
        dispatch(markHealthImpactProgress('finish', false));
        dispatch(
          displayToast({
            id: 'health-impact-subject-empty',
            kind: 'info',
            titleKey: 'common.hey',
            subtitleKey: 'analysis.healthImpact.subjectEmpty',
            timeout: 5e3,
          })
        );

        return navigate(ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK);
      }
    }

    const selectedFormSubjects = selectedSubjects
      .filter((subject) => HEALTH_IMPACT_FORM_SUBJECTS.includes(subject.key))
      .map(
        (subject) =>
          draftHealthImpactSubjects[
            subject.key as ValidHealthImpactSubjectsWithForm
          ]
      );

    if (
      selectedFormSubjects.some(
        (subject) =>
          !subject?.description ||
          !subject?.form.questions ||
          (subject.form.questions.questions.length || 0) !==
            Object.keys(subject?.form.answers || {}).length
      )
    ) {
      dispatch(markHealthImpactProgress('finish', false));
      dispatch(
        displayToast({
          id: 'health-impact-subject-empty',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'analysis.healthImpact.subjectEmpty',
          timeout: 5e3,
        })
      );

      return navigate(ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK);
    }

    // save subjects
    const subjects: Analysis.RepliesRequestParams[] = [];

    for (const subjectKey in draftHealthImpactSubjects) {
      const subject =
        draftHealthImpactSubjects[subjectKey as ValidHealthImpactSubjects];

      if (!subject) continue;

      if ('form' in subject) {
        subjects.push({
          notesF: subject.description,
          questions: Object.entries(
            subject.form.answers
          ).map(([key, value]) => ({ questionId: key, notesQ: value })),
        });
      } else {
        subjects.push({
          questions: Object.values(subject).map((value) => ({ notesQ: value })),
        });
      }
    }

    dispatch(
      saveHealthImpactSubjects(draftPatientId, subjects, function () {
        navigate(ROUTE_ANALYSIS_HOME);
      })
    );
  };

  useEffect(() => {
    if (!draftPatientId) {
      dispatch(
        displayToast({
          id: 'health-impact-patient-missing',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.patientNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_HEALTH_IMPACT_PATIENT);
      return;
    }

    dispatch(markHealthImpactProgress('finish'));
  }, [draftPatientId, dispatch, navigate]);

  useEffect(() => {
    if (
      draftPatientId &&
      draftPatientId !== focusedPatient?.id &&
      !isFocusedPatientLoading
    ) {
      dispatch(loadPatient(draftPatientId));
    }
  }, [dispatch, focusedPatient, draftPatientId, isFocusedPatientLoading]);

  if (
    isFocusedPatientLoading ||
    !focusedPatient ||
    isHealhImpactResearchFormSaving
  ) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  const selectedSubjects = subjectOptions.filter((option) =>
    draftHealthImpactSelectedSubjects.includes(
      option.key as ValidHealthImpactSubjects
    )
  );

  return (
    <HealthImpactFinishComponent
      patientName={focusedPatient.name}
      {...{ selectedSubjects, onPreviousClick, onNextClick }}
    />
  );
};

export default HealthImpactFinishContainer;
