import requestApi from '@/services/api';
import baseStorage, {
  baseStorageConfig,
} from '@/utils/storage/base-storage.ts';
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
  updateIsLaunched: (isLaunched: boolean) => void;
  updateToken: (accessToken: State['loginData']['accessToken']) => void;
  saveLoginData: (data: Required<State['loginData']>) => void;
  cleanLoginData: () => void;
  initLoginStatus: () => Promise<void>;
};

type UserStore = State & Action;

const { accessToken: accessTokenKey } = baseStorageConfig;
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
    updateIsLaunched: isLaunched => {
      set(state => {
        state.isLaunched = isLaunched;
      });
    },
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
      baseStorage.remove(accessTokenKey);
    },
    initLoginStatus: async () => {
      let userInfo: State['loginData']['userInfo'];
      let newAccessToken = '';
      const accessToken = baseStorage.getString(accessTokenKey);
      if (accessToken) {
        const result = await requestApi.isLogin({
          params: { accessToken },
        });
        newAccessToken = result.data.accessToken;
        userInfo = result.data.userInfo;
        storageAccessToken(newAccessToken);
      }

      set(state => {
        state.isLogin = !!userInfo;
        state.loginData = { accessToken: newAccessToken, userInfo };
      });
    },
  })),
);

export const useUserStore = () => {
  return useStore(userStore);
};
