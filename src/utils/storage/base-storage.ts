import type { MMKV } from 'react-native-mmkv';
import { createMMKV } from 'react-native-mmkv';

// @ts-ignore
const baseStorage = new createMMKV({
  id: 'base-storage',
}) as MMKV;

const baseStorageConfig = {
  accessToken: 'accessToken',
};

export default baseStorage;
export { baseStorageConfig };
