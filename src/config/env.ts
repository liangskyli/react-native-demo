import { Platform } from 'react-native';

/** 接口地址环境枚举 */
export const EnvEnumMap = {
  dev: 'dev',
  test: 'test',
  release: 'release',
  prod: 'prod',
} as const;

/** 接口地址环境类型 */
export type EnvEnumType = keyof typeof EnvEnumMap;

/** 接口地址类型枚举 */
export const HostEnumMap = {
  default: 'default',
  host2: 'host2',
} as const;

export type HostEnumType = keyof typeof HostEnumMap;

type IHostMap = Record<HostEnumType, Record<EnvEnumType, string>>;

const defaultLocal =
  Platform.OS === 'android' ? 'http://10.0.2.2:8010' : 'http://localhost:8010';
export const HostMap: IHostMap = {
  [HostEnumMap.default]: {
    [EnvEnumMap.dev]: defaultLocal,
    [EnvEnumMap.test]: 'https://test.example.cn',
    [EnvEnumMap.release]: 'https://beta.example.cn',
    [EnvEnumMap.prod]: 'https://prod.example.cn',
  },
  [HostEnumMap.host2]: {
    [EnvEnumMap.dev]: 'http://0.0.0.0:8001',
    [EnvEnumMap.test]: 'https://test2.example.cn',
    [EnvEnumMap.release]: 'https://beta2.example.cn',
    [EnvEnumMap.prod]: 'https://prod2.example.cn',
  },
};
