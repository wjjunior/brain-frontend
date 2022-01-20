import React, { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import AnalysisSharedCoreSetProgressComponent from '../../../../components/Analysis/Shared/CoreSetProgress';
import { IIcFProgress } from '../../../../components/Analysis/Shared/IcFProgress';
import { ISelectProps, Option } from '../../../../components/Select';
import { selectors } from '../../../../modules/analysis';
import {
  getDiagnosticResultsRequest,
  markGlobalPrognosticProgress,
} from '../../../../modules/analysis/actions';
import {
  ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_FINISH,
  ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_PATIENT,
  totalQualifiersMap,
  valueQualifiersMap,
} from '../../../../modules/analysis/constants';
import { displayToast } from '../../../../modules/shared/actions';
import { ValueMap } from '../../../../utils/typings';

const GlobalPrognosticWeaknessAndStrengthsContainer: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draftPatientId = useSelector(selectors.draftGlobalPrognosticPatientId);
  const draftDiagnosticId = useSelector(
    selectors.draftGlobalPrognosticDiagnosticId
  );
  const draftCoreSetId = useSelector(selectors.draftGlobalPrognosticCoreSetId);
  const focusedDiagnosticResults = useSelector(
    selectors.focusedDiagnosticResults
  );
  const isFocusedDiagnosticResultsLoading = useSelector(
    selectors.isFocusedDiagnosticResultsLoading
  );

  const filterOptions = useMemo(
    () => [
      {
        key: 'negative',
        label: intl.formatMessage({
          id: 'analysis.globalPrognostic.weaknesses',
        }),
      },
      {
        key: 'positive',
        label: intl.formatMessage({
          id: 'analysis.globalPrognostic.strengths',
        }),
      },
    ],
    [intl]
  );

  const [selectedFilterOptions, setSelectedFilterOptions] = useState<Option[]>([
    filterOptions[0],
  ]);

  useEffect(() => {
    if (draftPatientId) {
      dispatch(markGlobalPrognosticProgress('weaknessAndStrengths'));
    }
  }, [dispatch, draftPatientId]);

  useEffect(() => {
    if (!draftPatientId) {
      dispatch(
        displayToast({
          id: 'global-prognostic-patient-missing',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.patientNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_PATIENT);
      return;
    }

    if (!draftDiagnosticId || !draftCoreSetId) {
      dispatch(
        displayToast({
          id: 'global-prognostic-patient-missing',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.diagnosticNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_PATIENT);
      return;
    }

    dispatch(
      getDiagnosticResultsRequest(
        draftPatientId,
        draftCoreSetId,
        draftDiagnosticId,
        {
          score: selectedFilterOptions[0].key,
        }
      )
    );
  }, [
    dispatch,
    navigate,
    draftPatientId,
    draftCoreSetId,
    draftDiagnosticId,
    selectedFilterOptions,
  ]);

  const onPreviousClick = () =>
    navigate(ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_PATIENT);
  const onNextClick = () => navigate(ROUTE_ANALYSIS_GLOBAL_PROGNOSTIC_FINISH);

  const filter: ISelectProps = {
    options: filterOptions,
    selectedOptions: selectedFilterOptions,
    onChange: onFilterChange,
    placeholder: '',
  };

  function onFilterChange(options: Option[]) {
    setSelectedFilterOptions(options);
  }

  if (isFocusedDiagnosticResultsLoading || !focusedDiagnosticResults) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  type ValidCategories =
    | 'bodyFunctions'
    | 'bodyStructures'
    | 'environmentalFactors'
    | 'activitiesAndParticipation';

  type IcFProgress = {
    [key in ValidCategories]?: IIcFProgress[];
  };

  const icFs: IcFProgress = {};

  for (const icF of focusedDiagnosticResults.icfs) {
    const categoryMap: ValueMap<ValidCategories> = {
      'FUNÇÕES DO CORPO': 'bodyFunctions',
      'ESTRUTURAS DO CORPO': 'bodyStructures',
      'ATIVIDADES E PARTICIPAÇÃO': 'activitiesAndParticipation',
      'FATORES AMBIENTAIS': 'environmentalFactors',
    };

    const category = categoryMap[icF.category];

    if (!icFs[category]) {
      icFs[category] = [];
    }

    const colorOptions = [
      'situational.warning',
      'situational.info',
      'secondary.green',
    ];

    if (Array.isArray(icFs[category])) {
      const categoryIcfs = icFs[category];

      if (categoryIcfs) {
        categoryIcfs.push({
          code: icF.code,
          name: icF.name,
          total: totalQualifiersMap[icF.category],
          qualifiers: icF.answers.map((answer) => {
            const categoryQualifiersMap = valueQualifiersMap[icF.category];
            const actualValue = categoryQualifiersMap[answer.qualifier];

            if (typeof actualValue === 'undefined') {
              console.log('Unmapped value', icF.category, answer.qualifier);
            }

            return {
              value: actualValue || answer.qualifier,
              name: answer.name,
              color: colorOptions.shift() || 'situational.warning',
            };
          }),
        });
      }
    }
  }

  return (
    <AnalysisSharedCoreSetProgressComponent
      title={intl.formatMessage({
        id: 'analysis.globalPrognostic.weaknessAndStrengths',
      })}
      description={intl.formatMessage({
        id: 'analysis.globalPrognostic.weaknessAndStrengthsDescription',
      })}
      {...{ icFs, filter, onNextClick, onPreviousClick }}
    />
  );
};

export default GlobalPrognosticWeaknessAndStrengthsContainer;
