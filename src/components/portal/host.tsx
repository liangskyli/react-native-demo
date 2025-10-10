import { usePortalStoreStore } from '@/components/portal/use-portal-store.ts';
import React from 'react';
import { View } from 'react-native';

export const PortalHost = () => {
  const { portalList } = usePortalStoreStore();

  return (
    <>
      {portalList.map(item => (
        <View
          className="absolute inset-0"
          style={[{ zIndex: item.key }]}
          key={item.key}
          pointerEvents="box-none"
        >
          {item.elem}
        </View>
      ))}
    </>
  );
};
