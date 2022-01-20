import React from 'react';
import { useSelector } from 'react-redux';

import ConditionalRoute, { IRouteProps } from './ConditionalRoute';
import { ROUTE_DASHBOARD_HOME } from '../../modules/dashboard/constants';
import { selectors } from '../../modules/auth';

const PublicRoute: React.FC<IRouteProps> = (props) => {
  const isAuthenticated = useSelector(selectors.isAuthenticated);

  return (
    <ConditionalRoute
      {...props}
      condition={() => !isAuthenticated}
      redirectLink={ROUTE_DASHBOARD_HOME}
    />
  );
};

export default PublicRoute;
