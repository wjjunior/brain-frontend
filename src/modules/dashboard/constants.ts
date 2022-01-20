const ROUTE_DASHBOARD = '/dashboard';
export const ROUTE_DASHBOARD_HOME = `${ROUTE_DASHBOARD}/home`;
export const ROUTE_ACCOUNT = `${ROUTE_DASHBOARD}/account`;
export const ROUTE_PLANS = `${ROUTE_DASHBOARD}/account/plans`;

export const ROUTES = {
  HOME: ROUTE_DASHBOARD_HOME,
  ACCOUNT: ROUTE_ACCOUNT,
  PLANS: ROUTE_PLANS,
};

const USERS_BASE_PATH = '/v1/Dashboards';
export const ENDPOINT_DASHBOARDS = `${USERS_BASE_PATH}/`;

export const ENDPOINTS = {
  DASHBOARD_SUMMARY: ENDPOINT_DASHBOARDS,
};
