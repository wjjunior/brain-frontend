import React from 'react';
import { useIntl } from 'react-intl';
import { Modal } from 'semantic-ui-react';
import { createGlobalStyle } from 'styled-components';

import Flex from '../Flex';
import Separator from '../Separator';
import TextField from '../TextField';
import FilledButton from '../Button';
import { ExternalLink, H5, H6 } from '../Typography';

import { grid } from '../../config/theme';
import { themeProp } from '../../utils/functional';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

interface IUpdatePasswordComponentProps {
  currentPasswordRef: React.RefObject<HTMLInputElement>;
  newPasswordRef: React.RefObject<HTMLInputElement>;
  confirmPasswordRef: React.RefObject<HTMLInputElement>;
  passwordMismatch: boolean;
  onInputChange: () => void;
  onSubmit: () => void;
}

const UpdatePasswordComponent: React.FC<IUpdatePasswordComponentProps> = ({
  currentPasswordRef,
  newPasswordRef,
  confirmPasswordRef,
  passwordMismatch,
  onInputChange,
  onSubmit,
}) => {
  const intl = useIntl();

  const closeModal = () =>
    document.getElementById('update-password')?.parentElement?.click();

  function onSubmitClick() {
    closeModal();
    onSubmit();
  }

  return (
    <Modal
      id="update-password"
      size="mini"
      trigger={
        <H6 style={{ cursor: 'pointer' }}>
          {intl.formatMessage(
            { id: 'account.updatePassword' },
            {
              clickHere: (
                <ExternalLink bold>
                  {intl.formatMessage({ id: 'account.clickHere' })}
                </ExternalLink>
              ),
            }
          )}
        </H6>
      }
    >
      <GlobalStyle />

      <Modal.Content>
        <Flex justify="space-between">
          <H5>
            {intl.formatMessage({
              id: 'account.updatePasswordTitle',
            })}
          </H5>
          <CloseIcon onClick={closeModal} />
        </Flex>
        <Separator margin="3 0" />
        <TextField
          id="current-password"
          type="password"
          autoComplete="current-password"
          ref={currentPasswordRef}
          onChange={() => onInputChange()}
          labelText={intl.formatMessage({ id: 'account.currentPasswordLabel' })}
          placeholder={intl.formatMessage({
            id: 'account.currentPasswordPlaceholder',
          })}
          style={{ marginBottom: grid(2) }}
        />
        <TextField
          id="new-password"
          type="password"
          autoComplete="new-password"
          ref={newPasswordRef}
          onChange={() => onInputChange()}
          labelText={intl.formatMessage({ id: 'account.newPasswordLabel' })}
          placeholder={intl.formatMessage({
            id: 'account.newPasswordPlaceholder',
          })}
          style={{ marginBottom: grid(2) }}
        />
        <TextField
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          ref={confirmPasswordRef}
          onChange={() => onInputChange()}
          labelText={intl.formatMessage({ id: 'account.confirmPasswordLabel' })}
          placeholder={intl.formatMessage({
            id: 'account.confirmPasswordPlaceholder',
          })}
          validationText={
            passwordMismatch
              ? intl.formatMessage({
                  id: 'account.passwordMismatch',
                })
              : ''
          }
        />
        <Flex style={{ marginTop: grid(2) }}>
          <FilledButton
            flex="1"
            justify="center"
            type="submit"
            onClick={onSubmitClick}
          >
            {intl.formatMessage({
              id: 'account.submitNewPassword',
            })}
          </FilledButton>
        </Flex>
      </Modal.Content>
    </Modal>
  );
};

const GlobalStyle = createGlobalStyle`
  .ui.page.modals {
    padding: 0;

    .ui.modal.visible {
      box-shadow: none;
      border-radius: ${grid(0.5)};
      margin: 0;

      svg {
        cursor: pointer;

        path {
          fill: ${themeProp('colors.primary.dark_blue')};
        }
      }
    }
  }
`;

export default UpdatePasswordComponent;
