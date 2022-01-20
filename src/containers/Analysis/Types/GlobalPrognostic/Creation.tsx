import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ROUTES } from '../../../../modules/analysis/constants';
import GlobalPrognosticCreationComponent from '../../../../components/Analysis/Types/GlobalPrognostic/Creation';

import GlobalPrognosticPatientContainer from './Patient';
import GlobalPrognosticWeaknessAndStrengthsContainer from './WeaknessAndStrengths';
import GlobalPrognosticFinishContainer from './Finish';
import { clearGlobalPrognosticDraft } from '../../../../modules/analysis/actions';

const GlobalPrognosticCreationContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();

  useEffect(() => {
    return () => {
      dispatch(clearGlobalPrognosticDraft());
    };
  }, [dispatch]);

  return (
    <GlobalPrognosticCreationComponent>
      <Routes>
        <Route
          path={ROUTES.GLOBAL_PROGNOSTIC_PATIENT.replace(
            ROUTES.CREATE_GLOBAL_PROGNOSTIC,
            ''
          )}
          element={<GlobalPrognosticPatientContainer />}
        />
        <Route
          path={ROUTES.GLOBAL_PROGNOSTIC_WEAKNESS_AND_STRENGTHS.replace(
            ROUTES.CREATE_GLOBAL_PROGNOSTIC,
            ''
          )}
          element={<GlobalPrognosticWeaknessAndStrengthsContainer />}
        />
        <Route
          path={ROUTES.GLOBAL_PROGNOSTIC_FINISH.replace(
            ROUTES.CREATE_GLOBAL_PROGNOSTIC,
            ''
          )}
          element={<GlobalPrognosticFinishContainer />}
        />
        <Route
          path="//*"
          element={
            <Navigate to={ROUTES.GLOBAL_PROGNOSTIC_PATIENT + search} replace />
          }
        />
      </Routes>
    </GlobalPrognosticCreationComponent>
  );
};

export default GlobalPrognosticCreationContainer;
