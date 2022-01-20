import { GlobalState } from '..';
import { ValidLoadingKeys } from './types';

export const isFocusedAccountLoading = (state: GlobalState) =>
  state.accounts[ValidLoadingKeys.AccountById];
export const didAccountsError = (state: GlobalState) =>
  state.accounts.didAccountsError;
export const focusedAccount = (state: GlobalState) =>
  state.accounts.focusedAccount;
export const focusedAccountLanguage = (state: GlobalState) =>
  state.accounts.focusedAccount?.language;
export const isAccountWriteLoading = (state: GlobalState) =>
  state.accounts[ValidLoadingKeys.AccountWrite];
