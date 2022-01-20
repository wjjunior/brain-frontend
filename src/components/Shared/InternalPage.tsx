import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import Flex from '../Flex';
import NavBar from './Navbar';
import SideMenu from './SideMenu';
import Footer from './Footer';
import Toaster from '../../containers/Shared/Toaster';

import { themeGrid, themeProp } from '../../utils/functional';
import { attemptLogout } from '../../modules/auth/actions';
import { getUserIdFromSession } from '../../utils/auth';
import { selectors } from '../../modules/account';
import { selectors as sharedSelectors } from '../../modules/shared';
import { loadAccount } from '../../modules/account/actions';
import { getPlansRequest } from '../../modules/shared/actions';

const InternalPage: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const focusedAccount = useSelector(selectors.focusedAccount);
  const isAccountLoading = useSelector(selectors.isFocusedAccountLoading);
  const didAccountsError = useSelector(selectors.didAccountsError);
  const isPlansLoading = useSelector(sharedSelectors.isPlansLoading);
  const didPlansError = useSelector(sharedSelectors.didPlansError);

  const accountId = getUserIdFromSession();

  useEffect(() => {
    if (
      !focusedAccount &&
      !isAccountLoading &&
      !didAccountsError &&
      accountId
    ) {
      dispatch(loadAccount(accountId));
      dispatch(getPlansRequest());
    }
  }, [dispatch, focusedAccount, isAccountLoading, didAccountsError, accountId]);

  if (!focusedAccount || isAccountLoading || didPlansError || isPlansLoading) {
    return (
      <Dimmer active inverted>
        <Toaster />
        <Loader size="large" />
      </Dimmer>
    );
  }

  const userDisplayName = focusedAccount.name + ' ' + focusedAccount.lastName;

  return (
    <PageWrapper>
      <NavBar
        onLogoutClick={() => dispatch(attemptLogout())}
        userDisplayName={userDisplayName}
        companyDisplayName={focusedAccount.company}
      />
      <Flex as="section" flex="1" style={{ position: 'relative' }}>
        <SideMenu />
        <Toaster />
        <PageContent>
          {children}
          <Footer hideAdminAccess />
        </PageContent>
      </Flex>
    </PageWrapper>
  );
};

const PageWrapper = styled(Flex).attrs({ as: 'main', direction: 'column' })`
  background-color: ${themeProp('colors.secondary.silver')};
  min-height: 100vh;
`;

const PageContent = styled(Flex).attrs({ flex: 1, direction: 'column' })`
  margin: ${themeGrid(3)} ${themeGrid(4)};
`;

export default InternalPage;
