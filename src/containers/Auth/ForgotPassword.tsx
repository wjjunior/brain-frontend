import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import ForgotPasswordComponent from '../../components/Auth/ForgotPassword';
import { selectors, actions, types } from '../../modules/auth';
import { ValueMap } from '../../utils/typings';
import { ROUTES } from '../../modules/auth/constants';

function getInputValues(
  inputRefs: Array<React.RefObject<HTMLInputElement>>
): ValueMap<string> {
  const inputValues: ValueMap<string> = {};

  for (const inputRef of inputRefs) {
    if (inputRef.current) {
      inputValues[inputRef.current.name] = inputRef.current.value;
    }
  }

  return inputValues;
}

type ValidatorFn = (value: string) => string;

const validators: ValueMap<ValidatorFn> = {
  [types.ValidFormFieldNames.Email]: (value: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (typeof value === 'string') {
      if (!emailRegex.test(value))
        return 'patients.personalInfo.validation.invalidEmail';
    }

    return '';
  },
};

export default function ForgotPasswordContainer() {
  const intl = useIntl();
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const loginValidationTexts = useSelector(selectors.loginValidationTexts);
  const isResetingPassword = useSelector(selectors.isResetingPassword);
  const dispatch = useDispatch();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { email = '' } = getInputValues([emailInputRef]);
    dispatch(
      actions.recoverPassword(email, () => {
        navigate(ROUTES.RESET_SENT);
      })
    );
  }

  function validateFromInputEvent(
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) {
    const input = event.target;
    const formFieldName = input.name as types.ValidFormFieldNames;
    const validateFn = validators[formFieldName];
    const validationTextId = validateFn(input.value);

    const currentValidationText = loginValidationTexts[formFieldName];

    if (
      (currentValidationText && validationTextId) ||
      (!currentValidationText && !validationTextId) ||
      (!currentValidationText && event.type === 'change')
    )
      return;

    dispatch(
      actions.updateValidationText(
        formFieldName,
        validationTextId
          ? intl.formatMessage({ id: validationTextId })
          : validationTextId
      )
    );
  }

  if (isResetingPassword) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  return (
    <>
      <ForgotPasswordComponent
        {...{
          emailValidationText: loginValidationTexts.email,
          onBlur: validateFromInputEvent,
          onChange: validateFromInputEvent,
          emailInputRef,
          onSubmit,
        }}
      />
    </>
  );
}
