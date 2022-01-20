import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import CreationContainer from '../../containers/Patients/Creation';
import ClinicalInfoContainer from '../../containers/Patients/CreationSteps/ClinicalInfo';
import PersonalInfoContainer from '../../containers/Patients/CreationSteps/PersonalInfo';
import { clearFocusedPatient } from '../../modules/patients/actions';

import { ROUTES } from '../../modules/patients/constants';

export default function PatientsCreationPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // upon leaving patient creation, clear the focused patient!
    return () => {
      dispatch(clearFocusedPatient());
    };
  }, [dispatch]);

  return (
    <CreationContainer>
      <Routes>
        <Route
          path={ROUTES.CREATE_PERSONAL_INFO.replace(ROUTES.CREATE, '')}
          element={<PersonalInfoContainer />}
        />
        <Route
          path={ROUTES.CREATE_CLINICAL_INFO.replace(ROUTES.CREATE, '')}
          element={<ClinicalInfoContainer />}
        />
        <Route
          path="//*"
          element={
            <Navigate
              to={ROUTES.CREATE_PERSONAL_INFO.replace(':verb', 'create')}
              replace
            />
          }
        />
      </Routes>
    </CreationContainer>
  );
}
