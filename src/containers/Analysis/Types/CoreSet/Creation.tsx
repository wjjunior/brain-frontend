import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ROUTES } from '../../../../modules/analysis/constants';
import {
  clearCoreSet,
  clearCoreSetDraft,
} from '../../../../modules/analysis/actions';
import { clearFocusedPatient } from '../../../../modules/patients/actions';
import CoreSetCreationComponent from '../../../../components/Analysis/Types/CoreSet/Creation';

import CoreSetPatientContainer from './Patient';
import CoreSetFormCategoriesContainer from './FormCategories';
import CoreSetFormFillingContainer from './FormFilling';
import CoreSetFinishContainer from './Finish';

const CoreSetCreationContainer: React.FC = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // upon leaving analysis creation, clear the draft!
    return () => {
      dispatch(clearCoreSet());
      dispatch(clearCoreSetDraft());
      dispatch(clearFocusedPatient());
    };
  }, [dispatch]);

  return (
    <CoreSetCreationComponent>
      <Routes>
        <Route
          path={ROUTES.CORESET_PATIENT.replace(ROUTES.CREATE_CORESET, '')}
          element={<CoreSetPatientContainer />}
        />
        <Route
          path={ROUTES.CORESET_FORM_CATEGORIES.replace(
            ROUTES.CREATE_CORESET,
            ''
          )}
          element={<CoreSetFormCategoriesContainer />}
        />
        <Route
          path={ROUTES.CORESET_FORM_FILLING.replace(ROUTES.CREATE_CORESET, '')}
          element={<CoreSetFormFillingContainer />}
        />
        <Route
          path={ROUTES.CORESET_FINISH.replace(ROUTES.CREATE_CORESET, '')}
          element={<CoreSetFinishContainer />}
        />
        <Route
          path="//*"
          element={<Navigate to={ROUTES.CORESET_PATIENT + search} replace />}
        />
      </Routes>
    </CoreSetCreationComponent>
  );
};

export default CoreSetCreationContainer;
