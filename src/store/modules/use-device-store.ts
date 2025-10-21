import DeviceInfo from 'react-native-device-info';
import { createStore, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  version?: string;
};

type Action = {
  getVersion: () => string;
};

type DeviceStore = State & Action;

export const deviceStore = createStore<DeviceStore>()(
  immer((set, get) => ({
    getVersion: () => {
      let version = get().version;
      if (!version) {
        version = DeviceInfo.getVersion();
        set(state => {
          state.version = version;
        });
      }
      return version;
    },
  })),
);

export const useDeviceStore = () => {
  return useStore(deviceStore);
};
