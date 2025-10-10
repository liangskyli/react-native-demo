import { Platform } from 'react-native';

const config = {
  serverHost:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:8010'
      : 'http://localhost:8010',
  asyncStorageKeys: {
    accessToken: 'accessToken',
  },
};

export default config;
