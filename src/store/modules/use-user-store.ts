import requestApi from '@/services/api';
import config from '@/utils/config.ts';
import baseStorage from '@/utils/storage/base-storage.ts';
import { createStore, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  isLaunched: boolean;
  loginData: {
    accessToken: string;
    userInfo?: {
      userId: string;
    };
  };
  isLogin: boolean;
};

type Action = {
  updateToken: (accessToken: State['loginData']['accessToken']) => void;
  saveLoginData: (data: Required<State['loginData']>) => void;
  cleanLoginData: () => void;
  initLoginStatus: () => Promise<void>;
};

type UserStore = State & Action;

const { accessToken: accessTokenKey } = config.asyncStorageKeys;
const storageAccessToken = (accessToken: string) => {
  baseStorage.set(accessTokenKey, accessToken);
};

export const userStore = createStore<UserStore>()(
  immer(set => ({
    isLaunched: false,
    loginData: {
      accessToken: '',
    },
    isLogin: false,
    updateToken: accessToken => {
      set(state => {
        state.loginData.accessToken = accessToken;
        state.isLogin = true;
      });
      storageAccessToken(accessToken);
    },
    saveLoginData: data => {
      set(state => {
        state.loginData = data;
        state.isLogin = true;
      });
      storageAccessToken(data.accessToken);
    },
    cleanLoginData: () => {
      set(state => {
        state.loginData = { accessToken: '', userInfo: undefined };
        state.isLogin = false;
      });
      baseStorage.delete(accessTokenKey);
    },
    initLoginStatus: async () => {
      let isLaunched = false;
      let userInfo: State['loginData']['userInfo'];
      let newAccessToken = '';
      try {
        const accessToken = baseStorage.getString(accessTokenKey);
        if (accessToken) {
          const result = await requestApi.isLogin({
            params: { accessToken },
          });
          newAccessToken = result.data.accessToken;
          userInfo = result.data.userInfo;
          storageAccessToken(newAccessToken);
        }
        isLaunched = true;
      } catch (error) {
        console.log('initLoginStatus error:', error);
        isLaunched = true;
      }

      set(state => {
        state.isLogin = !!userInfo;
        state.loginData = { accessToken: newAccessToken, userInfo };
        state.isLaunched = isLaunched;
      });
    },
  })),
);

export const useUserStore = () => {
  return useStore(userStore);
};
