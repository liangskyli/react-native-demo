import requestApi from '@/services/api';
import config from '@/utils/config.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  updateToken: (
    accessToken: State['loginData']['accessToken'],
  ) => Promise<void>;
  saveLoginData: (data: Required<State['loginData']>) => Promise<void>;
  cleanLoginData: () => Promise<void>;
  initLoginStatus: () => Promise<void>;
};

type UserStore = State & Action;

const { accessToken: accessTokenKey } = config.asyncStorageKeys;
const storageAccessToken = async (accessToken: string) => {
  await AsyncStorage.setItem(accessTokenKey, accessToken);
};

export const userStore = createStore<UserStore>()(
  immer(set => ({
    isLaunched: false,
    loginData: {
      accessToken: '',
    },
    isLogin: false,
    updateToken: async accessToken => {
      set(state => {
        state.loginData.accessToken = accessToken;
        state.isLogin = true;
      });
      await storageAccessToken(accessToken);
    },
    saveLoginData: async data => {
      set(state => {
        state.loginData = data;
        state.isLogin = true;
      });
      await storageAccessToken(data.accessToken);
    },
    cleanLoginData: async () => {
      set(state => {
        state.loginData = { accessToken: '', userInfo: undefined };
        state.isLogin = false;
      });
      await AsyncStorage.removeItem(accessTokenKey);
    },
    initLoginStatus: async () => {
      let isLaunched = false;
      let userInfo: State['loginData']['userInfo'];
      let newAccessToken = '';
      try {
        const accessToken = await AsyncStorage.getItem(accessTokenKey);
        if (accessToken) {
          const result = await requestApi.isLogin({
            params: { accessToken },
          });
          newAccessToken = result.data.accessToken;
          userInfo = result.data.userInfo;
          await storageAccessToken(newAccessToken);
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
