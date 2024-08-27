/**
 * 该文件可自行根据业务逻辑进行调整
 */
import { useAppConfig } from '@vben/hooks';
import { preferences } from '@vben/preferences';
import {
  authenticateResponseInterceptor,
  errorMessageResponseInterceptor,
  type InternalAxiosRequestConfig,
  RequestClient,
} from '@vben/request';
import { useAccessStore, useUserStore } from '@vben/stores';

import { ElMessage } from 'element-plus';

import { useAuthStore } from '#/store';
import { removeEmptyKeys, signature } from '#/util/sign-verification';

import { refreshTokenApi } from './core';

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

function createRequestClient(baseURL: string) {
  const client = new RequestClient({
    baseURL,
  });

  /**
   * 重新认证逻辑
   */
  async function doReAuthenticate() {
    console.warn('Access token or refresh token is invalid or expired. ');
    const accessStore = useAccessStore();
    const authStore = useAuthStore();
    accessStore.setAccessToken(null);
    if (
      preferences.app.loginExpiredMode === 'modal' &&
      accessStore.isAccessChecked
    ) {
      accessStore.setLoginExpired(true);
    } else {
      await authStore.logout();
    }
  }

  /**
   * 刷新token逻辑
   */
  async function doRefreshToken() {
    const accessStore = useAccessStore();
    const resp = await refreshTokenApi();
    const newToken = resp.data;
    accessStore.setAccessToken(newToken);
    return newToken;
  }

  function formatToken(token: null | string) {
    return token ? `Bearer ${token}` : null;
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: async (config) => {
      const accessStore = useAccessStore();

      config.headers.Authorization = formatToken(accessStore.accessToken);
      config.headers['Accept-Language'] = preferences.app.locale;
      // 构建通用参数在前
      makeRequestComParams(config);
      // 构建签名在后
      makeRequestSign(config);

      return config;
    },
  });

  // response数据解构
  client.addResponseInterceptor({
    fulfilled: (response) => {
      const { data: responseData, status } = response;
      const { code, data, message: msg } = responseData;
      if (status >= 200 && status < 400 && (code === 200 || code === 0)) {
        return data;
      }
      switch (code) {
        case 2001: {
          doReAuthenticate()
          break;
        }
        default: {
          break;
        }
      }
      throw new Error(`Error ${status}: ${msg}`);
    },
  });

  // token过期的处理
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: preferences.app.enableRefreshToken,
      formatToken,
    }),
  );

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string) => ElMessage.error(msg)),
  );

  return client;
}

/**
 *  构建签名
 * @param config
 */
function makeRequestSign(config: InternalAxiosRequestConfig<any>) {
  const signBody = config.data ?? config.params;
  const sign = signature(signBody);
  config.method?.toLocaleUpperCase() === `POST`
    ? (config.data = Object.assign(config.data || {}, { sign }))
    : (config.params = Object.assign(config.params || {}, { sign }));
}

/**
 * 构建通用参数
 * @param config
 */
function makeRequestComParams(config: InternalAxiosRequestConfig<any>) {
  const userStore = useUserStore();
  const accessStore = useAccessStore();
  const userId = userStore.userId;
  const sessionToken = accessStore.accessToken;
  const timestamp = Date.now();

  const commonParams = {
    sessionToken,
    timestamp,
    userId,
  };

  const method = config.method?.toLocaleUpperCase();
  if (method === `POST`) {
    config.data = removeEmptyKeys(
      Object.assign(config.data || {}, commonParams),
    );
  } else if (method === `GET`) {
    config.params = removeEmptyKeys(
      Object.assign(config.params || {}, commonParams),
    );
  }
}

export const requestClient = createRequestClient(apiURL);

export const baseRequestClient = new RequestClient({ baseURL: apiURL });
