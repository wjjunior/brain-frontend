import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import Flex from '../Flex';
import { H4, H6, H7, Link } from '../Typography';
import Separator from '../Separator';
import TextField from '../TextField';
import Button, { OutlineButton } from '../Button';
import AuthTemplate from './AuthTemplate';

import { themeGrid } from '../../utils/functional';
import { ROUTES } from '../../modules/auth/constants';
import Toaster from '../../containers/Shared/Toaster';

interface IForgotPasswordComponentProps {
  emailValidationText: string;
  emailInputRef: React.RefObject<HTMLInputElement>;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ForgotPasswordComponent: React.FC<IForgotPasswordComponentProps> = ({
  emailValidationText,
  emailInputRef,
  onBlur,
  onChange,
  onSubmit,
}) => {
  const intl = useIntl();

  return (
    <AuthTemplate>
      <Toaster />
      <H4 bold align="center">
        {intl.formatMessage({ id: 'auth.forgotPassword.title' })}
      </H4>
      <Separator margin="3 0" />
      <H6>{intl.formatMessage({ id: 'auth.forgotPassword.instructions' })}</H6>
      <ForgotPasswordForm onSubmit={onSubmit}>
        <TextField
          required
          id="email"
          type="email"
          labelText={intl.formatMessage({
            id: 'auth.forgotPassword.registeredEmail',
          })}
          placeholder={intl.formatMessage({
            id: 'auth.forgotPassword.registeredEmailPlaceholder',
          })}
          ref={emailInputRef}
          validationText={emailValidationText}
          onBlur={onBlur}
          onChange={onChange}
        />
        <Flex>
          <Button flex="1" justify="center" type="submit">
            {intl.formatMessage({ id: 'auth.forgotPassword.recoverPassword' })}
          </Button>
        </Flex>
        <Link to={ROUTES.LOGIN}>
          <Flex>
            <OutlineButton flex="1" justify="center" type="button">
              {intl.formatMessage({ id: 'auth.forgotPassword.cancelRecovery' })}
            </OutlineButton>
          </Flex>
        </Link>
      </ForgotPasswordForm>
      <H7>{intl.formatMessage({ id: 'auth.recoveryDetails' })}</H7>
    </AuthTemplate>
  );
};

const ForgotPasswordForm = styled.form`
  margin-top: ${themeGrid(2)};

  ${TextField} {
    margin-bottom: ${themeGrid(3)};
  }

  button {
    margin-bottom: ${themeGrid(2)};
  }
`;

export default ForgotPasswordComponent;
