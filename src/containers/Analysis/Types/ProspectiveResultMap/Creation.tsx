import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ROUTES } from '../../../../modules/analysis/constants';
import ProspectiveResultMapCreationComponent from '../../../../components/Analysis/Types/ProspectiveResultMap/Creation';

import ProspectiveResultMapPatientContainer from './Patient';
import ProspectiveResultMapMapContainer from './Map';
import ProspectiveResultMapFinishContainer from './Finish';
import { clearProspectiveResultMapDraft } from '../../../../modules/analysis/actions';

const ProspectiveResultMapCreationContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();

  useEffect(() => {
    return () => {
      dispatch(clearProspectiveResultMapDraft());
    };
  }, [dispatch]);

  return (
    <ProspectiveResultMapCreationComponent>
      <Routes>
        <Route
          path={ROUTES.PROSPECTIVE_RESULT_MAP_PATIENT.replace(
            ROUTES.CREATE_PROSPECTIVE_RESULT_MAP,
            ''
          )}
          element={<ProspectiveResultMapPatientContainer />}
        />
        <Route
          path={ROUTES.PROSPECTIVE_RESULT_MAP_MAP.replace(
            ROUTES.CREATE_PROSPECTIVE_RESULT_MAP,
            ''
          )}
          element={<ProspectiveResultMapMapContainer />}
        />
        <Route
          path={ROUTES.PROSPECTIVE_RESULT_MAP_FINISH.replace(
            ROUTES.CREATE_PROSPECTIVE_RESULT_MAP,
            ''
          )}
          element={<ProspectiveResultMapFinishContainer />}
        />
        <Route
          path="//*"
          element={
            <Navigate
              to={ROUTES.PROSPECTIVE_RESULT_MAP_PATIENT + search}
              replace
            />
          }
        />
      </Routes>
    </ProspectiveResultMapCreationComponent>
  );
};

export default ProspectiveResultMapCreationContainer;
