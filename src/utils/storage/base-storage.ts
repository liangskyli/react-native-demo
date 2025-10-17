import { MMKV } from 'react-native-mmkv';

const baseStorage = new MMKV({
  id: 'base-storage',
});

export default baseStorage;
