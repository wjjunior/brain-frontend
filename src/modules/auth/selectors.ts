import { GlobalState } from '../';
import { ValidLoadingKeys } from './types';

// const authState = (state: GlobalState) => state.auth;
export const isAuthenticated = (state: GlobalState) =>
  state.auth.isAuthenticated;
export const loginValidationTexts = (state: GlobalState) =>
  state.auth.loginValidationTexts;
export const didAuthenticationError = (state: GlobalState) =>
  state.auth.didAuthenticationError;
export const isAuthenticating = (state: GlobalState) =>
  state.auth[ValidLoadingKeys.Login];
export const isLoadingUser = (state: GlobalState) =>
  state.auth[ValidLoadingKeys.LoadUser];
export const didUserLoadError = (state: GlobalState) =>
  state.auth.didUserLoadError;
export const currentUser = (state: GlobalState) => state.auth.currentUser;
export const isResetingPassword = (state: GlobalState) =>
  state.auth[ValidLoadingKeys.RecoverPassword];
export const recoverPasswordEmail = (state: GlobalState) =>
  state.auth.recoverPasswordEmail;
