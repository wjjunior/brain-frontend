import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import cc from 'classcat';

import Flex from '../Flex';
import { H6 } from '../Typography';

import { themeGrid, themeProp } from '../../utils/functional';
import { ROUTE_DASHBOARD_HOME } from '../../modules/dashboard/constants';
import { ROUTE_PATIENTS_HOME } from '../../modules/patients/constants';
import { ROUTE_ANALYSIS_HOME } from '../../modules/analysis/constants';
// import { ROUTE_ACCOUNT_MY_PLANS } from '../../modules/account/constants';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg';
import { ReactComponent as DashboardIcon } from '../../assets/icons/menu-dashboard.svg';
import { ReactComponent as PatientsIcon } from '../../assets/icons/menu-patients.svg';
import { ReactComponent as AnalysisIcon } from '../../assets/icons/menu-analysis.svg';
// import { ReactComponent as OtherPlansIcon } from '../../assets/icons/menu-other-plans.svg';

export default function SideMenu() {
  const intl = useIntl();
  const { pathname } = useLocation();

  const items = [
    {
      route: ROUTE_DASHBOARD_HOME,
      label: 'sideMenu.dashboardHome',
      icon: () => <DashboardIcon />,
    },
    {
      route: ROUTE_PATIENTS_HOME,
      label: 'sideMenu.patientsHome',
      icon: () => <PatientsIcon />,
    },
    {
      route: ROUTE_ANALYSIS_HOME,
      label: 'sideMenu.analysisHome',
      icon: () => <AnalysisIcon />,
    },
    // {
    //   route: ROUTE_ACCOUNT_MY_PLANS,
    //   label: 'sideMenu.otherPlans',
    //   icon: () => <OtherPlansIcon />,
    // },
  ];

  return (
    <SideMenuWrapper>
      <Flex direction="column" as="ul" flex="1">
        {items.map(({ route, label, icon: Icon }) => (
          <NavLink key={route} to={route}>
            <SideMenuItem
              className={cc({ active: pathname.startsWith(route) })}
            >
              <Icon />
              <H6 color="gray">{intl.formatMessage({ id: label })}</H6>
              <ArrowIcon />
            </SideMenuItem>
          </NavLink>
        ))}
      </Flex>
    </SideMenuWrapper>
  );
}

const SideMenuWrapper = styled(Flex).attrs({
  as: 'aside',
  direction: 'column',
})`
  margin-top: ${themeGrid(1)};
  width: ${themeGrid(27.25)};
`;

const TRANSITION_DURATION = '150ms';

const SideMenuItem = styled(Flex).attrs({ as: 'li', align: 'center', flex: 1 })`
  height: ${themeGrid(5)};
  margin-top: ${themeGrid(2)};
  padding: ${themeGrid(1)} ${themeGrid(2)} ${themeGrid(1)} ${themeGrid(3)};
  border-radius: 0 ${themeGrid(1)} ${themeGrid(1)} 0;
  transition: background-color ${TRANSITION_DURATION} ease-in-out;

  ${H6} {
    flex: 1;
    transition: color ${TRANSITION_DURATION} ease-in-out;
  }

  svg {
    path {
      transition: fill ${TRANSITION_DURATION} ease-in-out;
      fill: ${themeProp('colors.primary.gray')};
    }

    &:last-of-type {
      transition: opacity ${TRANSITION_DURATION} ease-in-out;
      transform: rotate(-90deg);
    }

    &:first-of-type {
      margin-right: ${themeGrid(2)};
    }
  }

  &.active {
    background-color: ${themeProp('colors.primary.purple')};

    ${H6} {
      display: flex;
      color: ${themeProp('colors.primary.white')};
    }

    svg {
      path {
        fill: ${themeProp('colors.primary.white')};
      }

      &:last-of-type {
        opacity: 0;
      }
    }
  }
`;
