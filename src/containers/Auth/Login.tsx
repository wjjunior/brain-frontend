import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
// import { Dimmer, Loader } from 'semantic-ui-react';
import Lottie from 'react-lottie';

import animationData from '../../assets/animations/brain.json';

import LoginComponent from '../../components/Auth/Login';
import { selectors, actions, types } from '../../modules/auth';
import { updateValidationText } from '../../modules/auth/actions';
import { ValidFormFieldNames } from '../../modules/auth/types';
import { ValueMap } from '../../utils/typings';

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
  [types.ValidFormFieldNames.Username]: (value: string) => {
    if (value.length < 3) return 'auth.login.validation.usernameMinLength';
    if (value.length > 30) return 'auth.login.validation.usernameMaxLength';
    return '';
  },
  [types.ValidFormFieldNames.Password]: (value: string) => {
    if (value.length < 8) return 'auth.login.validation.passwordMinLength';
    if (value.length > 30) return 'auth.login.validation.passwordMaxLength';
    return '';
  },
};

export default function LoginContainer() {
  const intl = useIntl();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const loginValidationTexts = useSelector(selectors.loginValidationTexts);
  const isAuthenticating = useSelector(selectors.isAuthenticating);
  const dispatch = useDispatch();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { username = '', password = '' } = getInputValues([
      usernameInputRef,
      passwordInputRef,
    ]);

    dispatch(
      actions.attemptLogin(username, password, () => {
        dispatch(
          updateValidationText(
            ValidFormFieldNames.Password,
            intl.formatMessage({ id: 'auth.login.authFailed' })
          )
        );
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

  if (isAuthenticating) {
    return (
      <Lottie
        speed={3}
        options={{
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
      />
    );
    // return (
    //   <Dimmer active inverted>
    //     <Loader size="large" />
    //   </Dimmer>
    // );
  }

  return (
    <>
      <LoginComponent
        hideForgotPassword={false}
        {...{
          usernameValidationText: loginValidationTexts.username,
          passwordValidationText: loginValidationTexts.password,
          onBlur: validateFromInputEvent,
          onChange: validateFromInputEvent,
          usernameInputRef,
          passwordInputRef,
          onSubmit,
        }}
      />
    </>
  );
}
