import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import Flex from '../Flex';
import { H4, H6, H7, ExternalLink, Link } from '../Typography';
import Separator from '../Separator';
import Button, { OutlineButton } from '../Button';
import AuthTemplate from './AuthTemplate';

import { themeGrid } from '../../utils/functional';
import { ROUTES } from '../../modules/auth/constants';

interface IResetSentComponentProps {
  emailAddress: string;
  resendEmail: () => void;
}

const ResetSentComponent: React.FC<IResetSentComponentProps> = ({
  emailAddress,
  resendEmail,
}) => {
  const intl = useIntl();

  return (
    <AuthTemplate>
      <H4 bold align="center">
        {intl.formatMessage({ id: 'auth.resetSent.title' })}
      </H4>
      <Separator margin="3 0" />
      <RecoveryProcess direction="column">
        <H6>
          {intl.formatMessage(
            {
              id: 'auth.resetSent.linkWasSent',
            },
            {
              emailAddress: (
                <ExternalLink href={`mailto:${emailAddress}`} target="_blank">
                  {emailAddress}
                </ExternalLink>
              ),
            }
          )}
        </H6>
        <H6 bold>
          {intl.formatMessage({ id: 'auth.resetSent.troubleshootingTitle' })}
        </H6>
        <H6>
          {intl.formatMessage({
            id: 'auth.resetSent.troubleshootingInstructions',
          })}
        </H6>
        <Button flex="1" justify="center" type="submit" onClick={resendEmail}>
          {intl.formatMessage({ id: 'auth.resetSent.resendLink' })}
        </Button>
        <Link to={ROUTES.LOGIN}>
          <Flex>
            <OutlineButton flex="1" justify="center" type="button">
              {intl.formatMessage({ id: 'auth.resetSent.goToLogin' })}
            </OutlineButton>
          </Flex>
        </Link>
      </RecoveryProcess>
      <H7>{intl.formatMessage({ id: 'auth.recoveryDetails' })}</H7>
    </AuthTemplate>
  );
};

const RecoveryProcess = styled(Flex)`
  button {
    margin-bottom: ${themeGrid(1.75)};
  }

  ${H6} {
    margin-bottom: ${themeGrid(1)};
  }
`;

export default ResetSentComponent;
