import React from 'react';
import { useIntl } from 'react-intl';

import Flex from '../Flex';
import { H7, Link } from '../Typography';
import { GhostButton } from '../Button';
// import { ROUTES } from '../../modules/auth/constants';
import { colors, grid } from '../../config/theme';

interface IFooterProps {
  hideAdminAccess?: boolean;
}

const Footer: React.FC<IFooterProps> = ({ hideAdminAccess }) => {
  const intl = useIntl();

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{ marginTop: grid(2) }}
    >
      <Flex>
        <Link to={'mailto:suporte@brain.app.br'}>
          <GhostButton size="small" style={{ color: colors.secondary.blue }}>
            {intl.formatMessage({ id: 'footer.support' })}
          </GhostButton>
        </Link>
        {/* <Link to={ROUTES.HELP_CENTER}>
          <GhostButton size="small">
            {intl.formatMessage({ id: 'common.helpCenter' })}
          </GhostButton>
        </Link> */}
        {/* {!hideAdminAccess && (
          <Link to={ROUTES.ADMIN_ACCESS}>
            <GhostButton size="small">
              {intl.formatMessage({ id: 'footer.adminAccess' })}
            </GhostButton>
          </Link>
        )} */}
      </Flex>
      <H7 color="gray">{intl.formatMessage({ id: 'footer.copyright' })}</H7>
    </Flex>
  );
};

export default Footer;
