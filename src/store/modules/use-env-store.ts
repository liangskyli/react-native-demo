import { BUILD_envEnumType } from '@/build-info.ts';
import type { EnvEnumType, HostEnumType } from '@/config/env.ts';
import { EnvEnumMap, HostMap } from '@/config/env.ts';
import * as z from 'zod';
import { createStore, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  envEnumType?: EnvEnumType;
};

type Action = {
  initEnvEnumType: () => void;
  updateEnvEnumType: (envEnumType: EnvEnumType) => void;
  getServerHost: (hostEnumType: HostEnumType) => string;
};

type EnvStore = State & Action;

const updateEnvEnum = (envEnum: EnvEnumType) => {
  let env: EnvEnumType | undefined;
  try {
    const envEnumTypes = z.literal<EnvEnumType[]>([
      'dev',
      'test',
      'release',
      'prod',
    ]);
    env = envEnumTypes.parse(envEnum);
  } catch (error) {
    console.error(`Couldn't load the BUILD_envEnumType: ${envEnum}`, error);
  }
  return env;
};

export const envStore = createStore<EnvStore>()(
  immer((set, get) => ({
    initEnvEnumType: () => {
      const defaultEnv: EnvEnumType | undefined =
        updateEnvEnum(BUILD_envEnumType);
      set(state => {
        state.envEnumType = state.envEnumType ?? defaultEnv;
      });
    },
    updateEnvEnumType: envEnum =>
      set(state => {
        state.envEnumType = updateEnvEnum(envEnum);
      }),
    getServerHost: hostEnumType => {
      const envEnumType = get().envEnumType ?? EnvEnumMap.prod;
      return HostMap[hostEnumType][envEnumType];
    },
  })),
);

export const useEnvStore = () => {
  return useStore(envStore);
};
