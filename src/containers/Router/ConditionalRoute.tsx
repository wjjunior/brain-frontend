import React from 'react';
import { Navigate, Route } from 'react-router-dom';

export interface IRouteProps {
  caseSensitive?: boolean;
  children?: React.ReactNode;
  element?: React.ReactElement | null;
  path?: string;
}

interface IConditionalRouteProps extends IRouteProps {
  redirectLink: string;
  condition: () => boolean;
}

const ConditionalRoute: React.FC<IConditionalRouteProps> = ({
  redirectLink,
  condition,
  ...routeProps
}) => {
  if (!condition()) {
    return <Navigate to={redirectLink} />;
  }

  return <Route {...routeProps} />;
};

export default ConditionalRoute;
