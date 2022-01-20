import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import ResetSentComponent from '../../components/Auth/ResetSent';
import { selectors, actions } from '../../modules/auth';
import { ROUTES } from '../../modules/auth/constants';

export default function ForgotPasswordContainer() {
  const navigate = useNavigate();
  const recoverPasswordEmail = useSelector(selectors.recoverPasswordEmail);
  const isResetingPassword = useSelector(selectors.isResetingPassword);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!recoverPasswordEmail) {
      navigate(ROUTES.LOGIN);
    }
  }, [navigate, recoverPasswordEmail]);

  const resendEmail = () => {
    dispatch(
      actions.recoverPassword(recoverPasswordEmail, () => {
        navigate(ROUTES.RESET_SENT);
      })
    );
  };

  if (isResetingPassword) {
    return (
      <Dimmer active inverted>
        <Loader size="large" />
      </Dimmer>
    );
  }

  return (
    <>
      <ResetSentComponent
        {...{
          emailAddress: recoverPasswordEmail,
          resendEmail,
        }}
      />
    </>
  );
}
