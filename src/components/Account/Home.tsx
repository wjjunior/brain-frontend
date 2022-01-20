import React from 'react';
import { useIntl } from 'react-intl';

import Flex from '../Flex';
import Breadcrumb from '../Breadcrumb';
import { H6 } from '../Typography';
import SideTabs, { SideTab } from '../Shared/SideTabs';

import { grid } from '../../config/theme';
import {
  ROUTE_ACCOUNT_PERSONAL_INFO,
  // ROUTE_ACCOUNT_MY_PLANS,
} from '../../modules/account/constants';

const CreationComponent: React.FC = ({ children }) => {
  const intl = useIntl();

  const sideTabs: SideTab[] = [
    {
      route: ROUTE_ACCOUNT_PERSONAL_INFO,
      label: 'account.personalInfo',
    },
    // {
    //   route: ROUTE_ACCOUNT_MY_PLANS,
    //   label: 'account.myPlans',
    // },
  ];

  return (
    <Flex direction="column">
      <Flex as="header" direction="column" style={{ marginBottom: grid(3) }}>
        <Breadcrumb>
          {null}
          <Breadcrumb.Item text={intl.formatMessage({ id: 'account.title' })} />
        </Breadcrumb>
        <H6 style={{ marginTop: grid(1) }}>
          {intl.formatMessage({ id: 'account.description' })}
        </H6>
      </Flex>
      <Flex>
        <SideTabs tabs={sideTabs} />
        {children}
      </Flex>
    </Flex>
  );
};

export default CreationComponent;
