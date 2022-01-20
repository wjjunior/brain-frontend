import React from 'react';
import { useSelector } from 'react-redux';

import ConditionalRoute, { IRouteProps } from './ConditionalRoute';
import { ROUTE_AUTH_LOGIN } from '../../modules/auth/constants';
import { selectors } from '../../modules/auth';

const PrivateRoute: React.FC<IRouteProps> = (props) => {
  const isAuthenticated = useSelector(selectors.isAuthenticated);

  return (
    <ConditionalRoute
      {...props}
      condition={() => isAuthenticated}
      redirectLink={ROUTE_AUTH_LOGIN}
    />
  );
};

export default PrivateRoute;
