import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';

import ReportNeuropsichologicalProfileComponent from '../../../components/Analysis/Reports/NeuropsichologicalProfile';
import { IIcFProgress } from '../../../components/Analysis/Shared/IcFProgress';
import { Option } from '../../../components/Select';
import {
  clearFocusedDiagnosticResults,
  getDiagnosticResultsRequest,
} from '../../../modules/analysis/actions';
import {
  totalQualifiersMap,
  valueQualifiersMap,
} from '../../../modules/analysis/constants';
import { Analysis } from '../../../modules/analysis/types';
import { selectors } from '../../../modules/analysis';
import { selectors as patientSelectors } from '../../../modules/patients';
import { loadPatient } from '../../../modules/patients/actions';
import { ValueMap } from '../../../utils/typings';

interface IReportNeuropsichologicalProfileContainerProps {}

const ReportNeuropsichologicalProfileContainer: React.FC<IReportNeuropsichologicalProfileContainerProps> = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const patientId = params.patientId;
  const coreSetId = params.coreSetId;
  const diagnosticId = params.id;
  const focusedDiagnosticResults = useSelector(
    selectors.focusedDiagnosticResults
  );
  const focusedPatient = useSelector(patientSelectors.focusedPatient);
  const didFocusedDiagnosticResultsError = useSelector(
    selectors.didFocusedDiagnosticResultsError
  );
  const isFocusedDiagnosticResultsLoading = useSelector(
    selectors.isFocusedDiagnosticResultsLoading
  );
  const isFocusedPatientLoading = useSelector(
    patientSelectors.isFocusedPatientLoading
  );

  const groupedIcfs = (focusedDiagnosticResults?.icfs || []).reduce(
    (acc: ValueMap<Analysis.Icf[]>, icF) => ({
      ...acc,
      [icF.category]: [...(acc[icF.category] || []), icF],
    }),
    {}
  );

  const icfCategories = Object.keys(groupedIcfs);

  const sectionOptions = icfCategories.map((label, key) => ({
    key: `${key}`,
    label,
  }));

  const [selectedSection, setSelectedSection] = useState<Option[]>([]);

  useEffect(() => {
    if (!selectedSection.length && sectionOptions.length) {
      setSelectedSection([sectionOptions[0]]);
    }
  }, [selectedSection, sectionOptions]);

  useEffect(() => {
    if (patientId !== focusedPatient?.id && !isFocusedPatientLoading) {
      dispatch(loadPatient(patientId));
    }
  }, [dispatch, patientId, focusedPatient, isFocusedPatientLoading]);

  useEffect(() => {
    return () => {
      dispatch(clearFocusedDiagnosticResults());
    };
  }, [dispatch]);

  useEffect(() => {
    if (
      !focusedDiagnosticResults &&
      !didFocusedDiagnosticResultsError &&
      !isFocusedDiagnosticResultsLoading
    ) {
      dispatch(getDiagnosticResultsRequest(patientId, coreSetId, diagnosticId));
    }
  }, [
    dispatch,
    patientId,
    coreSetId,
    diagnosticId,
    focusedDiagnosticResults,
    didFocusedDiagnosticResultsError,
    isFocusedDiagnosticResultsLoading,
  ]);

  if (
    isFocusedPatientLoading ||
    !focusedPatient ||
    isFocusedDiagnosticResultsLoading ||
    !focusedDiagnosticResults
  ) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  const sectionResults: IIcFProgress[] = !!selectedSection.length
    ? groupedIcfs[selectedSection[0].label].map((icF) => {
        const colorOptions = [
          'situational.warning',
          'situational.info',
          'secondary.green',
        ];

        const category = selectedSection[0].label;

        return {
          code: icF.code,
          name: icF.name,
          total: totalQualifiersMap[category],
          qualifiers: icF.answers.map((answer) => {
            const actualValue = valueQualifiersMap[category][answer.qualifier];

            if (typeof actualValue === 'undefined') {
              console.log('Unmapped value', category, answer.qualifier);
            }

            return {
              value: actualValue || answer.qualifier,
              name: answer.code,
              color: colorOptions.shift() || 'situational.warning',
            };
          }),
        };
      })
    : [];

  const categories = !!selectedSection.length
    ? groupedIcfs[selectedSection[0].label].map((icF) => {
        const graphData: ValueMap<number> = {};

        for (const answer of icF.answers) {
          graphData[answer.code || 'v'] = answer.qualifier;
        }

        return { ...graphData, label: icF.code };
      })
    : [];

  return (
    <ReportNeuropsichologicalProfileComponent
      patientName={focusedPatient.name}
      fillDate={new Date().toISOString()}
      {...{
        sectionOptions,
        selectedSection,
        onSectionSelect: setSelectedSection,
        categories,
        sectionResults,
      }}
    />
  );
};

export default ReportNeuropsichologicalProfileContainer;
