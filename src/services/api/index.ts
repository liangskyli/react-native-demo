import type { IBaseJsonData } from '@/services/request/base.ts';
import request from '@/services/request/base.ts';

const createApi = request.createApi();
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
