import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ROUTES } from '../../../../modules/analysis/constants';
import HealthImpactCreationComponent from '../../../../components/Analysis/Types/HealthImpact/Creation';
import { clearHealthImpactDraft } from '../../../../modules/analysis/actions';

import HealthImpactPatientContainer from './Patient';
import HealthImpactSubjectsPickContainer from './Subjects/Pick';
import HealthImpactSubjectsCopingContainer from './Subjects/Coping';
import HealthImpactSubjectsAnxietyContainer from './Subjects/Anxiety';
import HealthImpactSubjectsHumourContainer from './Subjects/Humour';
import HealthImpactSubjectsLifeQualityContainer from './Subjects/LifeQuality';
import HealthImpactSubjectsSleepQualityContainer from './Subjects/SleepQuality';
import HealthImpactFinishContainer from './Finish';
import { ValidHealthImpactSubjectsWithForm } from '../../../../modules/analysis/types';

const HealthImpactCreationContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();

  useEffect(() => {
    return () => {
      dispatch(clearHealthImpactDraft());
    };
  }, [dispatch]);

  return (
    <HealthImpactCreationComponent>
      <Routes>
        <Route
          path={ROUTES.HEALTH_IMPACT_PATIENT.replace(
            ROUTES.CREATE_HEALTH_IMPACT,
            ''
          )}
          element={<HealthImpactPatientContainer />}
        />
        <Route
          path={
            ROUTES.HEALTH_IMPACT_SUBJECTS.replace(
              ROUTES.CREATE_HEALTH_IMPACT,
              ''
            ) + '/*'
          }
        >
          <Route
            path={ROUTES.HEALTH_IMPACT_SUBJECTS_PICK.replace(
              ROUTES.HEALTH_IMPACT_SUBJECTS,
              ''
            )}
            element={<HealthImpactSubjectsPickContainer />}
          />
          <Route
            path={ROUTES.HEALTH_IMPACT_SUBJECTS_COPING.replace(
              ROUTES.HEALTH_IMPACT_SUBJECTS,
              ''
            )}
            element={<HealthImpactSubjectsCopingContainer researchFormId="" />}
          />
          <Route
            path={ROUTES.HEALTH_IMPACT_SUBJECTS_ANXIETY.replace(
              ROUTES.HEALTH_IMPACT_SUBJECTS,
              ''
            )}
            element={<HealthImpactSubjectsAnxietyContainer researchFormId="" />}
          />
          <Route
            path={ROUTES.HEALTH_IMPACT_SUBJECTS_HUMOUR.replace(
              ROUTES.HEALTH_IMPACT_SUBJECTS,
              ''
            )}
            element={<HealthImpactSubjectsHumourContainer researchFormId="" />}
          />
          <Route
            path={ROUTES.HEALTH_IMPACT_SUBJECTS_LIFE_QUALITY.replace(
              ROUTES.HEALTH_IMPACT_SUBJECTS,
              ''
            )}
            element={
              <HealthImpactSubjectsLifeQualityContainer
                subject={'lifeQuality' as ValidHealthImpactSubjectsWithForm}
                researchFormId="7e9d54f6-841b-eb11-b57d-142d27e330a4"
              />
            }
          />
          <Route
            path={ROUTES.HEALTH_IMPACT_SUBJECTS_SLEEP_QUALITY.replace(
              ROUTES.HEALTH_IMPACT_SUBJECTS,
              ''
            )}
            element={
              <HealthImpactSubjectsSleepQualityContainer researchFormId="" />
            }
          />
          <Route
            path="//*"
            element={
              <Navigate to={ROUTES.HEALTH_IMPACT_SUBJECTS_PICK} replace />
            }
          />
        </Route>
        <Route
          path={ROUTES.HEALTH_IMPACT_FINISH.replace(
            ROUTES.CREATE_HEALTH_IMPACT,
            ''
          )}
          element={<HealthImpactFinishContainer />}
        />
        <Route
          path="//*"
          element={
            <Navigate to={ROUTES.HEALTH_IMPACT_PATIENT + search} replace />
          }
        />
      </Routes>
    </HealthImpactCreationComponent>
  );
};

export default HealthImpactCreationContainer;
