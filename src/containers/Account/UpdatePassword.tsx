import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import UpdatePasswordComponent from '../../components/Account/UpdatePassword';
import { actions } from '../../modules/account';
import { ROUTE_ACCOUNT_HOME } from '../../modules/account/constants';
import { getUserIdFromSession } from '../../utils/auth';
import { debounce } from '../../utils/functional';

const UpdatePasswordContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
  const accountId = getUserIdFromSession();

  function onSubmit() {
    if (passwordMismatch) return;
    if (newPasswordRef.current && currentPasswordRef.current) {
      dispatch(
        actions.updateAccountPassword(
          accountId,
          currentPasswordRef.current.value,
          newPasswordRef.current.value,
          function onFinish() {
            navigate(ROUTE_ACCOUNT_HOME);
          }
        )
      );
    }
  }

  const onInputChange = debounce(function () {
    const newPasswordMismatchState = !!(
      currentPasswordRef.current &&
      newPasswordRef.current &&
      confirmPasswordRef.current &&
      newPasswordRef.current.value &&
      confirmPasswordRef.current.value &&
      newPasswordRef.current.value !== confirmPasswordRef.current.value
    );

    if (passwordMismatch !== newPasswordMismatchState) {
      setPasswordMismatch(newPasswordMismatchState);
    }
  }, 500);

  return (
    <UpdatePasswordComponent
      {...{
        onSubmit,
        onInputChange,
        passwordMismatch,
        currentPasswordRef,
        newPasswordRef,
        confirmPasswordRef,
      }}
    />
  );
};

export default UpdatePasswordContainer;
