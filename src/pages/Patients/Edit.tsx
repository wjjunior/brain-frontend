import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

import EditContainer from '../../containers/Patients/Edit';
import PersonalInfoContainer from '../../containers/Patients/CreationSteps/PersonalInfo';
import ClinicalInfoContainer from '../../containers/Patients/CreationSteps/ClinicalInfo';
import PatientHealthImpactAnalysis from '../../containers/Patients/Analysis/HealthImpact';
import PatientCoreSetsAnalysis from '../../containers/Patients/Analysis/CoreSet';
import PatientInterventionGoalsAnalysis from '../../containers/Patients/Analysis/InterventionGoals';
import PatientProspectiveResultMapsAnalysis from '../../containers/Patients/Analysis/ProspectiveResultMap';
import PatientGlobalPrognosticsAnalysis from '../../containers/Patients/Analysis/GlobalPrognostic';
import PatientNeuropsichologicalProfilesAnalysis from '../../containers/Patients/Analysis/NeuropsichologicalProfile';

import { ROUTES } from '../../modules/patients/constants';
import { clearFocusedPatient } from '../../modules/patients/actions';

export default function PatientsEditPage() {
  const { id: patientId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // upon leaving patient creation, clear the focused patient!
    return () => {
      dispatch(clearFocusedPatient());
    };
  }, [dispatch]);

  return (
    <EditContainer>
      <Routes>
        <Route
          path={ROUTES.EDIT_PERSONAL_INFO.replace(ROUTES.EDIT, '')}
          element={<PersonalInfoContainer />}
        />
        <Route
          path={ROUTES.EDIT_CLINICAL_INFO.replace(ROUTES.EDIT, '')}
          element={<ClinicalInfoContainer />}
        />
        <Route
          path={ROUTES.EDIT_HEALTH_IMPACTS.replace(ROUTES.EDIT, '')}
          element={<PatientHealthImpactAnalysis />}
        />
        <Route
          path={ROUTES.EDIT_CORESETS.replace(ROUTES.EDIT, '')}
          element={<PatientCoreSetsAnalysis />}
        />
        <Route
          path={ROUTES.EDIT_GOALS.replace(ROUTES.EDIT, '')}
          element={<PatientInterventionGoalsAnalysis />}
        />
        <Route
          path={ROUTES.EDIT_PROSPECTIVE_RESULT_MAPS.replace(ROUTES.EDIT, '')}
          element={<PatientProspectiveResultMapsAnalysis />}
        />
        <Route
          path={ROUTES.EDIT_GLOBAL_PROGNOSTICS.replace(ROUTES.EDIT, '')}
          element={<PatientGlobalPrognosticsAnalysis />}
        />
        <Route
          path={ROUTES.EDIT_NEUROPSICHOLOGICAL_PROFILES.replace(
            ROUTES.EDIT,
            ''
          )}
          element={<PatientNeuropsichologicalProfilesAnalysis />}
        />
        <Route
          path="//*"
          element={
            <Navigate
              to={ROUTES.EDIT_PERSONAL_INFO.replace(':verb', 'edit').replace(
                ':id',
                patientId
              )}
              replace
            />
          }
        />
      </Routes>
    </EditContainer>
  );
}
