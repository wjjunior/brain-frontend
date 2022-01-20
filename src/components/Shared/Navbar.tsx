import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo';
import Flex from '../Flex';
import CurrentUserMenu, { ICurrentUserMenuProps } from './CurrentUserMenu';

import { themeGrid, themeProp } from '../../utils/functional';

interface INavBarProps extends ICurrentUserMenuProps {
  className?: string;
}

const NavBar = styled<(props: INavBarProps) => JSX.Element>(
  ({ className, ...currentUserMenuProps }) => (
    <NavBarWrapper align="center" justify="space-between" className={className}>
      <Logo width={56} height={56} />
      <CurrentUserMenu {...currentUserMenuProps} />
    </NavBarWrapper>
  )
)``;

const NavBarWrapper = styled(Flex).attrs({ as: 'nav' })`
  background-color: ${themeProp('colors.primary.gray')};
  height: ${themeGrid(7)};
  padding: ${themeGrid(2)} ${themeGrid(4)};
  box-shadow: 0 ${themeGrid(0.5)} ${themeGrid(0.5)} ${themeGrid(0.25)} #f7f7ff;
`;

export default NavBar;
