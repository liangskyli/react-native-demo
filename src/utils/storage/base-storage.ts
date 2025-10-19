import { MMKV } from 'react-native-mmkv';

const baseStorage = new MMKV({
  id: 'base-storage',
});

const baseStorageConfig = {
  accessToken: 'accessToken',
};

export default baseStorage;
export { baseStorageConfig };
