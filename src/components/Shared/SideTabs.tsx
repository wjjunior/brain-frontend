import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import cc from 'classcat';

import Flex from '../Flex';
import Card from '../Card';
import { H6 } from '../Typography';

import { themeGrid, themeProp } from '../../utils/functional';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { ReactComponent as FilledCheckIcon } from '../../assets/icons/filled-check.svg';

export type SideTab = {
  route: string;
  label: string;
  icon?: 'done' | 'pending';
};

interface ISideTabprops {
  tabs: Array<SideTab & { subTabs?: SideTab[] }>;
  disabledNavigation?: boolean;
}

const SideTab: React.FC<ISideTabprops> = ({ tabs, disabledNavigation }) => {
  const intl = useIntl();
  const { pathname } = useLocation();

  return (
    <SideTabCard>
      <Flex direction="column" as="ul" flex="1">
        {tabs.map(({ route, label, icon, subTabs }) => {
          const isParentMatching = subTabs
            ? pathname.includes(route)
            : pathname === route;

          const parentItem = (
            <NavLink key={route} to={disabledNavigation ? '#' : route}>
              <SideTabItem
                className={cc({
                  active: isParentMatching,
                })}
              >
                <H6>{intl.formatMessage({ id: label })}</H6>
                {!!(icon && icon === 'done') ? (
                  <FilledCheckIcon
                    className={cc({
                      done: true,
                      active: isParentMatching,
                    })}
                  />
                ) : !!(icon && icon === 'pending') ? (
                  <CheckIcon />
                ) : null}
              </SideTabItem>
            </NavLink>
          );

          if (!subTabs || !isParentMatching) return parentItem;

          return (
            <Flex direction="column" key={route}>
              {parentItem}
              {subTabs.map((subTab) => (
                <NavLink
                  key={subTab.route}
                  to={disabledNavigation ? '#' : subTab.route}
                >
                  <SideTabSubItem
                    className={cc({
                      active: pathname === subTab.route,
                    })}
                  >
                    <H6>{intl.formatMessage({ id: subTab.label })}</H6>
                  </SideTabSubItem>
                </NavLink>
              ))}
            </Flex>
          );
        })}
      </Flex>
    </SideTabCard>
  );
};

const SideTabCard = styled(Card).attrs({
  as: 'nav',
})`
  padding: 0;
  margin-right: ${themeGrid(4)};
  width: ${themeGrid(32)};
`;

const TRANSITION_DURATION = '150ms';

const SideTabItem = styled(Flex).attrs({
  as: 'li',
  justify: 'space-between',
  align: 'center',
  flex: 1,
})`
  padding: ${themeGrid(2)};
  transition: background-color ${TRANSITION_DURATION} ease-in-out;

  ${H6} {
    flex: 1;
    color: ${themeProp('colors.primary.gray')};
    transition: color ${TRANSITION_DURATION} ease-in-out;
  }

  svg {
    path {
      fill: ${themeProp('colors.secondary.gray')};
    }

    &.done path {
      fill: ${themeProp('colors.primary.gray')};
    }
  }

  &.active {
    cursor: default;
    background-color: ${themeProp('colors.primary.purple')};

    ${H6} {
      display: flex;
      color: ${themeProp('colors.primary.white')};
    }

    svg path {
      fill: ${themeProp('colors.primary.white')};
    }
  }
`;

const SideTabSubItem = styled(SideTabItem)`
  background-color: ${themeProp('colors.secondary.silver')};
  border-bottom: 1px solid ${themeProp('colors.primary.silver')};
  padding-left: ${themeGrid(6)};

  &.active {
    background-color: ${themeProp('colors.primary.white')};

    ${H6} {
      color: ${themeProp('colors.primary.purple')};
    }
  }
`;

export default SideTab;
