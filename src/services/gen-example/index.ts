import { BUILD_TIMESTAMP } from '@/build-info.ts';
import Toast from '@/components/toast';
import handleError from '@/services/gen-example/handle-error.ts';
import {
  initAxiosRequestOpts,
  responseLogMiddlewares,
} from '@/services/request/base.ts';
import { deviceStore } from '@/store/modules/use-device-store.ts';
import { envStore } from '@/store/modules/use-env-store.ts';
import { userStore } from '@/store/modules/use-user-store.ts';
import type {
  Context,
  IRequestConfig,
  Middleware,
  SerializedError,
} from '@liangskyli/axios-request';
import { axiosRequest } from '@liangskyli/axios-request';
import dayjs from 'dayjs';

export type IBaseJsonData<T = unknown> = {
  retCode: number;
  retMsg?: string;
  data: T;
};
const request = axiosRequest({
  ...initAxiosRequestOpts,
  serializedResponseMiddlewareConfig: {
    serializedResponseCodeKey: 'retCode',
    serializedResponseSuccessCode: 0,
    serializedResponseDataKey: 'data',
  },
  ShowErrorMiddlewareConfig: {
    handleError: (err, ctx) => {
      return handleError?.(err, ctx);
    },
    showError: (err: SerializedError<'retCode', 'retMsg'>, ctx) => {
      console.error('showError:', err, ctx);
      Toast.show(err.retMsg);
    },
  },
});

const requestProcessMiddlewares: Middleware<
  Context<IRequestConfig, IBaseJsonData>
> = async (ctx, next) => {
  const { config } = ctx;
  config.baseURL = envStore.getState().getServerHost('default');
  const { accessToken } = userStore.getState().loginData;
  config.headers!.Authorization = `Bearer ${accessToken}`;
  const appVersion = deviceStore.getState().getVersion();
  const commonParams = {
    buildTime: dayjs(BUILD_TIMESTAMP).format('YYYY-MM-DD HH:mm:ss'),
    appVersion,
  };
  config.params = { ...commonParams, ...config.params };
  await next();
};
request.middlewares.request.use(requestProcessMiddlewares);

request.middlewares.response.use(responseLogMiddlewares);

export default request;
export type { IRequestConfig };
