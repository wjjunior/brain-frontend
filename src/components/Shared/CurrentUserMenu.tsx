import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import { H7, H8, Link } from '../Typography';
import {
  ArrowIcon,
  AccountIcon,
  // PlanIcon,
  // HelpIcon,
  LeaveIcon,
} from '../Icons';
import Initials from '../Initials';
import Card from '../Card';
import Flex from '../Flex';

import { themeGrid, themeProp } from '../../utils/functional';
import {
  ROUTE_ACCOUNT_PERSONAL_INFO,
  // ROUTE_ACCOUNT_MY_PLANS,
} from '../../modules/account/constants';
// import { ROUTE_AUTH_HELP_CENTER } from '../../modules/auth/constants';

export interface ICurrentUserMenuProps {
  userDisplayName: string;
  companyDisplayName: string;
  onLogoutClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const CurrentUserMenu: React.FC<ICurrentUserMenuProps> = ({
  userDisplayName,
  companyDisplayName,
  onLogoutClick,
}) => {
  const intl = useIntl();
  const currentUserMenuRef = useRef<HTMLDivElement>(null);
  const [isUserMenuOpen, setUserMenuOpenState] = useState<boolean>(false);

  function onDocumentClick(event: MouseEvent) {
    const ref = currentUserMenuRef.current;

    if (!ref || ref.contains(event.target as Node)) return;

    setUserMenuOpenState(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', onDocumentClick);

    return () => document.removeEventListener('mousedown', onDocumentClick);
  }, []);

  return (
    <CurrentUserMenuWrapper ref={currentUserMenuRef}>
      <UserDetails
        align="center"
        onMouseDown={() =>
          setUserMenuOpenState((currentState) => !currentState)
        }
      >
        <Initials text={userDisplayName} />
        <Flex direction="column" justify="center">
          <H7 bold color="white">
            {userDisplayName}
          </H7>
          <H8 color="white">{companyDisplayName}</H8>
        </Flex>
        <ArrowIcon />
      </UserDetails>
      {isUserMenuOpen && (
        <UserMenu>
          <Flex direction="column">
            <Link to={ROUTE_ACCOUNT_PERSONAL_INFO}>
              <Flex align="center" as="li">
                <AccountIcon />
                <H7 color="gray">
                  {intl.formatMessage({ id: 'userMenu.myAccount' })}
                </H7>
              </Flex>
            </Link>
            {/* <Link to={ROUTE_ACCOUNT_MY_PLANS}>
              <Flex align="center" as="li">
                <PlanIcon />
                <H7 color="gray">{intl.formatMessage({ id: 'userMenu.myPlans' })}</H7>
              </Flex>
            </Link> */}
            <Flex align="center" onClick={onLogoutClick} as="li">
              <LeaveIcon />
              <H7 color="gray">
                {intl.formatMessage({ id: 'userMenu.signOut' })}
              </H7>
            </Flex>
          </Flex>
        </UserMenu>
      )}
    </CurrentUserMenuWrapper>
  );
};

const CurrentUserMenuWrapper = styled.div``;
const UserMenu = styled(Card).attrs({ as: 'ul' })`
  margin-top: ${themeGrid(1.5)};
  right: ${themeGrid(3.75)};
  padding: ${themeGrid(2)};
  box-shadow: 0px 2px 10px rgba(245, 244, 255, 0.64);
  z-index: 10000;

  ${Link} {
    margin-bottom: ${themeGrid(1)};
  }

  li {
    cursor: pointer;

    svg {
      margin-right: ${themeGrid(1)};
    }

    &:hover {
      ${H7} {
        color: ${themeProp('colors.primary.purple')};
      }

      svg path {
        fill: ${themeProp('colors.primary.purple')};
      }
    }
  }

  &,
  &:before {
    position: absolute;
  }

  &:before {
    content: ' ';
    width: ${themeGrid(1.25)};
    height: ${themeGrid(1.25)};
    top: -${themeGrid(0.75)};
    right: ${themeGrid(1.025)};
    transform: rotate(45deg);
    border: 1px solid ${themeProp('colors.primary.silver')};
    border-bottom: none;
    border-right: none;
    background-color: ${themeProp('colors.primary.white')};
  }
`;

const UserDetails = styled(Flex).attrs({ align: 'center' })`
  cursor: pointer;

  svg path {
    fill: ${themeProp('colors.primary.purple')};
  }

  ${Flex} {
    margin: 0 ${themeGrid(1)};
  }
`;

export default CurrentUserMenu;
