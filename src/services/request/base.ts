import { BUILD_TIMESTAMP } from '@/build-info.ts';
import { ajaxLoadingStore } from '@/store';
import { userStore } from '@/store/modules/use-user-store.ts';
import config from '@/utils/config.ts';
import type {
  Context,
  IRequestConfig,
  Middleware,
} from '@liangskyli/axios-request';
import { axiosRequest } from '@liangskyli/axios-request';
import dayjs from 'dayjs';

const { serverHost } = config;

export type IBaseJsonData<T = unknown> = {
  retCode: number;
  retMsg?: string;
  data: T;
};
const request = axiosRequest({
  initConfig: {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: serverHost,
  },
  loadingMiddlewareConfig: {
    showLoading: () => {
      ajaxLoadingStore.getState().showLoading();
    },
    hideLoading: () => {
      ajaxLoadingStore.getState().hideLoading();
    },
  },
  serializedResponseMiddlewareConfig: {
    serializedResponseCodeKey: 'retCode',
    serializedResponseSuccessCode: 0,
    serializedResponseDataKey: 'data',
  },
  ShowErrorMiddlewareConfig: {
    showError: (err, ctx) => {
      console.log('showError:', err, ctx);
    },
  },
});

const requestProcessMiddlewares: Middleware<
  Context<IRequestConfig, IBaseJsonData>
> = async (ctx, next) => {
  const { config } = ctx;
  const { accessToken } = userStore.getState().loginData;
  config.headers!.Authorization = `Bearer ${accessToken}`;
  // add buildTime to url params
  const commonParams = {
    buildTime: dayjs(BUILD_TIMESTAMP).format('YYYY-MM-DD HH:mm:ss'),
  };
  config.params = { ...commonParams, ...config.params };
  await next();
};
request.middlewares.request.use(requestProcessMiddlewares);

const responseLogMiddlewares: Middleware<
  Context<IRequestConfig, IBaseJsonData>
> = async (ctx, next) => {
  console.log('responseLogMiddlewares:', ctx.config.url, ctx);
  await next();
};
request.middlewares.response.use(responseLogMiddlewares);

export default request;
export type { IRequestConfig };
