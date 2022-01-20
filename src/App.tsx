import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PublicRoute, PrivateRoute } from './containers/Router';
import { ROUTES as AUTH_ROUTES } from './modules/auth/constants';
import { attemptLogout, loginAttemptSucceeded } from './modules/auth/actions';
import { ROUTE_DASHBOARD_HOME } from './modules/dashboard/constants';
import {
  ROUTE_ANALYSIS_CREATE,
  ROUTE_ANALYSIS_CREATE_CORESET,
  ROUTE_ANALYSIS_CREATE_GLOBAL_PROGNOSTIC,
  ROUTE_ANALYSIS_CREATE_HEALTH_IMPACT,
  ROUTE_ANALYSIS_CREATE_NEUROPSICHOLOGICAL_PROFILE,
  ROUTE_ANALYSIS_CREATE_PROSPECTIVE_RESULT_MAP,
  ROUTE_ANALYSIS_HOME,
  ROUTE_ANALYSIS_REPORT,
  ROUTE_ANALYSIS_REPORT_CORESET,
  ROUTE_ANALYSIS_REPORT_GLOBAL_PROGNOSTIC,
  ROUTE_ANALYSIS_REPORT_NEUROPSICHOLOGICAL_PROFILE,
  ROUTE_ANALYSIS_REPORT_PROSPECTIVE_RESULT_MAP,
} from './modules/analysis/constants';
import {
  ROUTE_PATIENTS_CREATE,
  ROUTE_PATIENTS_EDIT,
  ROUTE_PATIENTS_HOME,
} from './modules/patients/constants';

import { LoginPage, ForgotPasswordPage, ResetSentPage } from './pages/Auth';
import { DashboardHomePage } from './pages/Dashboard';
import {
  PatientsHomePage,
  PatientsCreationPage,
  PatientsEditPage,
} from './pages/Patients';
import { AnalysisHomePage } from './pages/Analysis';
import { AccountHomePage } from './pages/Account';
import { NotFoundPage } from './pages/Errors';

import CoreSetCreationContainer from './containers/Analysis/Types/CoreSet/Creation';
import ProspectiveResultMapCreationContainer from './containers/Analysis/Types/ProspectiveResultMap/Creation';
import GlobalPrognosticCreationContainer from './containers/Analysis/Types/GlobalPrognostic/Creation';
import NeuropsichologicalProfileCreationContainer from './containers/Analysis/Types/NeuropsichologicalProfile/Creation';
import HealthImpactCreationContainer from './containers/Analysis/Types/HealthImpact/Creation';

import ReportCoreSetContainer from './containers/Analysis/Reports/CoreSet';
import ReportGlobalPrognosticContainer from './containers/Analysis/Reports/GlobalPrognostic';
import ReportProspectiveResultMapContainer from './containers/Analysis/Reports/ProspectiveResultMap';
import ReportNeuropsichologicalProfileContainer from './containers/Analysis/Reports/NeuropsichologicalProfile';

import InternalPage from './components/Shared/InternalPage';
import { isSessionPersisted } from './utils/auth';
import { ROUTE_ACCOUNT_HOME } from './modules/account/constants';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSessionPersisted()) {
      dispatch(loginAttemptSucceeded());
    } else {
      dispatch(attemptLogout());
    }
  }, [dispatch]);

  return (
    <Routes>
      <PublicRoute path="/auth">
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-sent" element={<ResetSentPage />} />
      </PublicRoute>
      <PrivateRoute path="/">
        <InternalPage>
          <Routes>
            <Route
              path={ROUTE_DASHBOARD_HOME}
              element={<DashboardHomePage />}
            />
            <Route
              path={ROUTE_ACCOUNT_HOME + '/*'}
              element={<AccountHomePage />}
            />
            <Route path={ROUTE_PATIENTS_HOME} element={<PatientsHomePage />} />
            <Route
              path={ROUTE_PATIENTS_EDIT + '/*'}
              element={<PatientsEditPage />}
            />
            <Route
              path={ROUTE_PATIENTS_CREATE + '/*'}
              element={<PatientsCreationPage />}
            />
            <Route path={ROUTE_ANALYSIS_HOME} element={<AnalysisHomePage />} />
            <Route path={ROUTE_ANALYSIS_CREATE + '/*'}>
              <Route
                path={
                  ROUTE_ANALYSIS_CREATE_CORESET.replace(
                    ROUTE_ANALYSIS_CREATE,
                    ''
                  ) + '/*'
                }
                element={<CoreSetCreationContainer />}
              />
              <Route
                path={
                  ROUTE_ANALYSIS_CREATE_PROSPECTIVE_RESULT_MAP.replace(
                    ROUTE_ANALYSIS_CREATE,
                    ''
                  ) + '/*'
                }
                element={<ProspectiveResultMapCreationContainer />}
              />
              <Route
                path={
                  ROUTE_ANALYSIS_CREATE_GLOBAL_PROGNOSTIC.replace(
                    ROUTE_ANALYSIS_CREATE,
                    ''
                  ) + '/*'
                }
                element={<GlobalPrognosticCreationContainer />}
              />
              <Route
                path={
                  ROUTE_ANALYSIS_CREATE_NEUROPSICHOLOGICAL_PROFILE.replace(
                    ROUTE_ANALYSIS_CREATE,
                    ''
                  ) + '/*'
                }
                element={<NeuropsichologicalProfileCreationContainer />}
              />
              <Route
                path={
                  ROUTE_ANALYSIS_CREATE_HEALTH_IMPACT.replace(
                    ROUTE_ANALYSIS_CREATE,
                    ''
                  ) + '/*'
                }
                element={<HealthImpactCreationContainer />}
              />
            </Route>
            <Route path={ROUTE_ANALYSIS_REPORT + '/*'}>
              <Route
                path={ROUTE_ANALYSIS_REPORT_CORESET.replace(
                  ROUTE_ANALYSIS_REPORT,
                  ''
                )}
                element={<ReportCoreSetContainer />}
              />
              <Route
                path={ROUTE_ANALYSIS_REPORT_GLOBAL_PROGNOSTIC.replace(
                  ROUTE_ANALYSIS_REPORT,
                  ''
                )}
                element={<ReportGlobalPrognosticContainer />}
              />
              <Route
                path={ROUTE_ANALYSIS_REPORT_PROSPECTIVE_RESULT_MAP.replace(
                  ROUTE_ANALYSIS_REPORT,
                  ''
                )}
                element={<ReportProspectiveResultMapContainer />}
              />
              <Route
                path={ROUTE_ANALYSIS_REPORT_NEUROPSICHOLOGICAL_PROFILE.replace(
                  ROUTE_ANALYSIS_REPORT,
                  ''
                )}
                element={<ReportNeuropsichologicalProfileContainer />}
              />
            </Route>
            <Route path="/" element={<Navigate to={ROUTE_DASHBOARD_HOME} />} />
          </Routes>
        </InternalPage>
      </PrivateRoute>
      <Route path="/" element={<Navigate to={AUTH_ROUTES.LOGIN} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
