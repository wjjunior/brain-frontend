import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomeContainer from '../../containers/Account/Home';
import PersonalInfoContainer from '../../containers/Account/PersonalInfo';
import MyPlansContainer from '../../containers/Account/MyPlans';

import { ROUTES } from '../../modules/account/constants';

export default function AccountHomePage() {
  return (
    <HomeContainer>
      <Routes>
        <Route
          path={ROUTES.PERSONAL_INFO.replace(ROUTES.HOME, '')}
          element={<PersonalInfoContainer />}
        />
        <Route
          path={ROUTES.MY_PLANS.replace(ROUTES.HOME, '')}
          element={<MyPlansContainer />}
        />
        <Route
          path="//*"
          element={<Navigate to={ROUTES.PERSONAL_INFO} replace />}
        />
      </Routes>
    </HomeContainer>
  );
}
