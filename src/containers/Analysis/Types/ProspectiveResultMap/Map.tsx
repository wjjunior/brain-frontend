import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AnalysisSharedCoreSetProgressComponent from '../../../../components/Analysis/Shared/CoreSetProgress';
import {
  getDiagnosticResultsRequest,
  markProspectiveResultMapProgress,
} from '../../../../modules/analysis/actions';
import { selectors } from '../../../../modules/analysis';
import { displayToast } from '../../../../modules/shared/actions';
import {
  ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_FINISH,
  ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_PATIENT,
  totalQualifiersMap,
  valueQualifiersMap,
} from '../../../../modules/analysis/constants';
import { Dimmer, Loader } from 'semantic-ui-react';
import { IIcFProgress } from '../../../../components/Analysis/Shared/IcFProgress';
import { ValueMap } from '../../../../utils/typings';

const ProspectiveResultMapMapContainer: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const draftPatientId = useSelector(
    selectors.draftProspectiveResultMapPatientId
  );
  const draftDiagnosticId = useSelector(
    selectors.draftProspectiveResultMapDiagnosticId
  );
  const draftCoreSetId = useSelector(
    selectors.draftProspectiveResultMapCoreSetId
  );
  const focusedDiagnosticResults = useSelector(
    selectors.focusedDiagnosticResults
  );
  const isFocusedDiagnosticResultsLoading = useSelector(
    selectors.isFocusedDiagnosticResultsLoading
  );

  useEffect(() => {
    if (draftPatientId) {
      dispatch(markProspectiveResultMapProgress('map'));
    }
  }, [dispatch, draftPatientId]);

  useEffect(() => {
    if (!draftPatientId) {
      dispatch(
        displayToast({
          id: 'prospective-result-map-patient-missing',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.patientNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_PATIENT);
      return;
    }

    if (!draftDiagnosticId || !draftCoreSetId) {
      dispatch(
        displayToast({
          id: 'prospective-result-map-patient-missing',
          kind: 'info',
          titleKey: 'common.hey',
          subtitleKey: 'common.diagnosticNotSelected',
          timeout: 5e3,
        })
      );
      navigate(ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_PATIENT);
      return;
    }
    dispatch(
      getDiagnosticResultsRequest(
        draftPatientId,
        draftCoreSetId,
        draftDiagnosticId,
        { score: 'negative' }
      )
    );
  }, [dispatch, navigate, draftPatientId, draftCoreSetId, draftDiagnosticId]);

  const onPreviousClick = () =>
    navigate(ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_PATIENT);
  const onNextClick = () =>
    navigate(ROUTE_ANALYSIS_PROSPECTIVE_RESULT_MAP_FINISH);

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
      title={intl.formatMessage({ id: 'analysis.prospectiveResultMap.title' })}
      description={intl.formatMessage({
        id: 'analysis.prospectiveResultMap.mapDescription',
      })}
      icFs={icFs}
      {...{ onNextClick, onPreviousClick }}
    />
  );
};

export default ProspectiveResultMapMapContainer;
