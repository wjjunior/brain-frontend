import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HealthImpactSubjectsPickComponent from '../../../../../components/Analysis/Types/HealthImpact/Pick';
import { Option } from '../../../../../components/Select';
import { selectors } from '../../../../../modules/analysis';
import {
  markHealthImpactProgress,
  selectHealthImpactSubjects,
  updateHealthImpactOpenField,
} from '../../../../../modules/analysis/actions';
import {
  getNextFormRoute,
  HEALTH_IMPACT_FORM_SUBJECTS,
  ROUTE_ANALYSIS_HEALTH_IMPACT_FINISH,
  ROUTE_ANALYSIS_HEALTH_IMPACT_PATIENT,
  ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK,
} from '../../../../../modules/analysis/constants';
import { ValidHealthImpactSubjects } from '../../../../../modules/analysis/types';
import { displayToast } from '../../../../../modules/shared/actions';

const HealthImpactSubjectsPickContainer: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const draftPatientId = useSelector(selectors.draftHealthImpactPatientId);
  const draftHealthImpactSelectedSubjects = useSelector(
    selectors.draftHealthImpactSelectedSubjects
  );
  const draftHealthImpactSubjects = useSelector(
    selectors.draftHealthImpactSubjects
  );

  const [selectedSubjects, setSelectedSubjects] = useState<Option[]>(
    subjectOptions.filter((option) =>
      draftHealthImpactSelectedSubjects.includes(
        option.key as ValidHealthImpactSubjects
      )
    )
  );

  useEffect(() => {
    dispatch(markHealthImpactProgress('subjects', !!selectedSubjects.length));
  }, [dispatch, selectedSubjects.length]);

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
  }, [dispatch, draftPatientId, navigate]);

  const onPreviousClick = () => navigate(ROUTE_ANALYSIS_HEALTH_IMPACT_PATIENT);
  const onNextClick = () => {
    if (!selectedSubjects.length) {
      dispatch(
        displayToast({
          id: 'health-impact-no-subject-selected',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'analysis.healthImpact.noSubjectSelected',
          timeout: 5e3,
        })
      );
      return;
    }

    for (const subjectKey in draftHealthImpactSubjects) {
      const subject =
        draftHealthImpactSubjects[subjectKey as ValidHealthImpactSubjects];

      if (!subject || 'form' in subject) continue;

      if (Object.values(subject).some((value) => !value)) {
        dispatch(
          displayToast({
            id: 'health-impact-subject-empty',
            kind: 'info',
            titleKey: 'common.hey',
            subtitleKey: 'analysis.healthImpact.subjectEmpty',
            timeout: 5e3,
          })
        );
        return;
      }
    }

    const selectedFormSubjects = selectedSubjects.filter((subject) =>
      HEALTH_IMPACT_FORM_SUBJECTS.includes(subject.key)
    );

    if (!selectedFormSubjects.length) {
      return navigate(ROUTE_ANALYSIS_HEALTH_IMPACT_FINISH);
    }

    // redirect to next form
    navigate(
      getNextFormRoute(
        draftHealthImpactSelectedSubjects,
        ROUTE_ANALYSIS_HEALTH_IMPACT_SUBJECTS_PICK
      )
    );
  };
  const onSubjectSelect = (options: Option[]) => {
    setSelectedSubjects(options);
    dispatch(
      selectHealthImpactSubjects(
        options.map((option) => option.key) as Array<ValidHealthImpactSubjects>
      )
    );
  };

  function onOpenFieldChange(subject: string, key: string, value: string) {
    dispatch(
      updateHealthImpactOpenField(
        subject as ValidHealthImpactSubjects,
        key,
        value
      )
    );
  }

  return (
    <HealthImpactSubjectsPickComponent
      {...{
        subjectOptions,
        selectedSubjects,
        draftHealthImpactSubjects,
        onSubjectSelect,
        onPreviousClick,
        onNextClick,
        onOpenFieldChange,
      }}
    />
  );
};

export default HealthImpactSubjectsPickContainer;
