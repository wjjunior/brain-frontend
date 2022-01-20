import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import Flex from '../Flex';
import { H4, Link } from '../Typography';
import Separator from '../Separator';
import TextField from '../TextField';
import Button, { GhostButton } from '../Button';
import AuthTemplate from './AuthTemplate';

import { themeGrid } from '../../utils/functional';
import { ROUTES } from '../../modules/auth/constants';

interface ILoginComponentProps {
  usernameValidationText: string;
  passwordValidationText: string;
  usernameInputRef: React.RefObject<HTMLInputElement>;
  passwordInputRef: React.RefObject<HTMLInputElement>;
  hideForgotPassword: boolean;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginComponent: React.FC<ILoginComponentProps> = ({
  usernameValidationText,
  passwordValidationText,
  usernameInputRef,
  passwordInputRef,
  hideForgotPassword,
  onBlur,
  onChange,
  onSubmit,
}) => {
  const intl = useIntl();

  return (
    <AuthTemplate>
      <H4 bold align="center">
        {intl.formatMessage({ id: 'auth.login.title' })}
      </H4>
      <Separator margin="3 0" />
      <LoginForm onSubmit={onSubmit}>
        <TextField
          required
          minLength={3}
          maxLength={30}
          id="username"
          type="username"
          onBlur={onBlur}
          onChange={onChange}
          ref={usernameInputRef}
          validationText={usernameValidationText}
          labelText={intl.formatMessage({
            id: 'auth.login.usernameFieldLabel',
          })}
          placeholder={intl.formatMessage({
            id: 'auth.login.usernameFieldPlaceholder',
          })}
        />
        <TextField
          required
          minLength={8}
          maxLength={30}
          id="password"
          type="password"
          onBlur={onBlur}
          onChange={onChange}
          ref={passwordInputRef}
          validationText={passwordValidationText}
          labelText={intl.formatMessage({
            id: 'auth.login.passwordFieldLabel',
          })}
          placeholder={intl.formatMessage({
            id: 'auth.login.passwordFieldPlaceholder',
          })}
        />
        {!hideForgotPassword && (
          <Link to={ROUTES.FORGOT_PASSWORD}>
            <GhostButton size="small" type="button">
              {intl.formatMessage({ id: 'auth.login.forgotPassword' })}
            </GhostButton>
          </Link>
        )}
        <Flex>
          <Button flex="1" justify="center" type="submit">
            {intl.formatMessage({ id: 'auth.login.accessButton' })}
          </Button>
        </Flex>
      </LoginForm>
    </AuthTemplate>
  );
};

const LoginForm = styled.form`
  ${TextField} {
    margin-bottom: ${themeGrid(2)};
  }

  ${Button}:last-of-type {
    margin-top: ${themeGrid(3)};
  }
`;

export default LoginComponent;
