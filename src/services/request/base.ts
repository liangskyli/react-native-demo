import { ajaxLoadingStore } from '@/store';
import type {
  axiosRequest,
  Context,
  Middleware,
} from '@liangskyli/axios-request';

type IAxiosRequestOpts = Parameters<typeof axiosRequest>[0];
const initAxiosRequestOpts: Omit<
  IAxiosRequestOpts,
  'ShowErrorMiddlewareConfig'
> = {
  initConfig: {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  },
  loadingMiddlewareConfig: {
    showLoading: () => {
      ajaxLoadingStore.getState().showLoading();
    },
    hideLoading: () => {
      ajaxLoadingStore.getState().hideLoading();
    },
  },
};

const responseLogMiddlewares: Middleware<Context> = async (ctx, next) => {
  console.log('responseLogMiddlewares:', ctx.config.url, ctx);
  await next();
};

export { initAxiosRequestOpts, responseLogMiddlewares };
