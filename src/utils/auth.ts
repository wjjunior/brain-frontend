import { Local } from './storage';

import { Auth } from '../modules/auth/types';
import { AUTH_SESSION_KEY } from '../modules/auth/constants';

export function getPersistedAuthSession(): Auth.PersistedSession | null {
  const persistedSession = Local.getJSON<Auth.PersistedSession>(
    AUTH_SESSION_KEY
  );

  if (!Object.keys(persistedSession).length) return null;

  return persistedSession;
}

export function isTokenTypeExpired(type: 'access' | 'refresh'): boolean {
  const persistedSession = getPersistedAuthSession();

  if (!persistedSession) return true;

  const expirationDate = new Date(
    Date.parse(persistedSession[type].expiration)
  );

  if (+expirationDate && new Date() > expirationDate) return true;

  return false;
}

export function isAccessTokenExpired(): boolean {
  return isTokenTypeExpired('access');
}

export function isRefreshTokenExpired(): boolean {
  return isTokenTypeExpired('refresh');
}

export function getTokenType(type: 'access' | 'refresh'): string {
  const persistedSession = getPersistedAuthSession();

  if (!persistedSession) return '';

  return persistedSession[type].token;
}

export function getAccessToken(): string {
  return getTokenType('access');
}

export function getRefreshToken(): string {
  return getTokenType('refresh');
}

export function getUserIdFromSession(): string {
  const persistedSession = getPersistedAuthSession();

  if (!persistedSession) return '';

  return persistedSession.userId;
}

export function setPersistedSession(authResponse: Auth.ITokenResponseModel) {
  return Local.setJSON<Auth.PersistedSession>(AUTH_SESSION_KEY, {
    userId: authResponse.userId,
    access: {
      token: authResponse.accessToken,
      expiration: authResponse.expiration,
    },
    refresh: {
      token: authResponse.refreshToken,
      expiration: authResponse.refreshTokenExpiresIn,
    },
  });
}

export function isSessionPersisted(): boolean {
  return !!getPersistedAuthSession();
}
