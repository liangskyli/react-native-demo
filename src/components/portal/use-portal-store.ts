import type { ReactNode } from 'react';
import { createStore, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type PortalType = 'toast' | 'popup';
type State = {
  key: number;
  portalList: { elem: ReactNode; key: number; type: PortalType }[];
};

type Action = {
  add: (elem: ReactNode, type: PortalType) => number;
  remove: (key: number) => void;
  clear: (type?: PortalType) => void;
};

type PortalStoreStore = State & Action;
const InitKey = 100;

export const portalStore = createStore<PortalStoreStore>()(
  immer(set => ({
    key: InitKey,
    portalList: [],
    add: (elem, type) => {
      let newKey: number;
      set(state => {
        const currentKey = state.portalList.length === 0 ? InitKey : state.key;
        state.portalList = [
          ...state.portalList,
          { elem, key: currentKey, type },
        ];
        newKey = currentKey;
        state.key = currentKey + 1;
      });
      return newKey!;
    },
    remove: key =>
      set(state => {
        state.portalList = state.portalList.filter(item => item.key !== key);
      }),
    clear: type => {
      set(state => {
        if (type) {
          state.portalList = state.portalList.filter(
            item => item.type !== type,
          );
        } else {
          state.portalList = [];
          state.key = InitKey;
        }
      });
    },
  })),
);

export const usePortalStoreStore = () => {
  return useStore(portalStore);
};
