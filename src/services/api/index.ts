import type { IBaseJsonData } from '@/services/request/base.ts';
import request from '@/services/request/base.ts';
import config from '@/utils/config.ts';

const { serverHost } = config;
const createApi = request.createApi({ baseURL: serverHost });
const requestApi = {
  getList: createApi<IBaseJsonData<{ name: string }>>({
    url: '/test1/get-list',
    method: 'GET',
  }),
  isLogin: createApi<
    IBaseJsonData<{ accessToken: string; userInfo?: { userId: string } }>
  >({
    url: '/login/is-login',
    method: 'GET',
    customOptions: { loadingEnabled: false },
  }),
};
export default requestApi;
