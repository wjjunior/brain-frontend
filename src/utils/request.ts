import { put as putEffect, call, cancelled, select } from 'redux-saga/effects';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { attemptLogout, refreshToken } from '../modules/auth/actions';

import {
  getAccessToken,
  getRefreshToken,
  getUserIdFromSession,
  isAccessTokenExpired,
  isRefreshTokenExpired,
} from './auth';
import { PUBLIC_ENDPOINT_LIST } from '../modules/auth/constants';
import { selectors } from '../modules/account';

const BASE_URL =
  window.location.host === 'uat.brain.app.br'
    ? 'https://apiuat.brain.app.br'
    : 'https://apidev.brain.app.br';

export function request(config: AxiosRequestConfig = {}) {
  return call(function* () {
    const source = axios.CancelToken.source();

    if (typeof config.headers !== 'object') {
      config.headers = {};
    }

    if (!PUBLIC_ENDPOINT_LIST.includes(config.url || '')) {
      if (isRefreshTokenExpired()) {
        return yield putEffect(attemptLogout());
      }

      if (isAccessTokenExpired()) {
        yield putEffect(
          refreshToken(getUserIdFromSession(), getRefreshToken())
        );
      }

      config.headers.Authorization = 'Bearer ' + getAccessToken();
    }

    config.url = BASE_URL + config.url;

    const language = yield select(selectors.focusedAccountLanguage);

    config.headers['Accept-Language'] =
      language || navigator.languages.join(',');

    try {
      return yield call(axios.request, {
        cancelToken: source.token,
        ...config,
      });
    } catch (err) {
      const requestError: AxiosError = err;

      if (requestError.response && requestError.response.status === 401) {
        if (
          !PUBLIC_ENDPOINT_LIST.includes(
            (config.url || '').replace(BASE_URL, '')
          )
        ) {
          yield putEffect(
            refreshToken(getUserIdFromSession(), getRefreshToken())
          );
        }
      }
    } finally {
      if (yield cancelled()) {
        source.cancel();
      }
    }
  });
}

export function get(url: string, config: AxiosRequestConfig = {}) {
  return request({ method: 'GET', url, ...config });
}

export function del(url: string, config: AxiosRequestConfig = {}) {
  return request({ method: 'DELETE', url, ...config });
}

export function post(
  url: string,
  data: unknown,
  config: AxiosRequestConfig = {}
) {
  return request({ method: 'POST', url, data, ...config });
}

export function put(
  url: string,
  data: unknown,
  config: AxiosRequestConfig = {}
) {
  return request({ method: 'PUT', url, data, ...config });
}
