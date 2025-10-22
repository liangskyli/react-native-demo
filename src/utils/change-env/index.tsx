import Button from '@/components/button';
import Popup from '@/components/popup';
import Radio from '@/components/radio';
import { EnvEnumMap } from '@/config/env.ts';
import { envStore } from '@/store/modules/use-env-store.ts';
import { Text, View } from 'react-native';

export const popUpSetEnvEnum = () => {
  const { envEnumType, updateEnvEnumType } = envStore.getState();
  const { close } = Popup.show(
    <View className="flex-1 items-center gap-3 p-3">
      <Text>切换环境</Text>
      <Radio.Group
        options={[
          { label: EnvEnumMap.dev, value: EnvEnumMap.dev },
          { label: EnvEnumMap.test, value: EnvEnumMap.test },
          { label: EnvEnumMap.release, value: EnvEnumMap.release },
          { label: EnvEnumMap.prod, value: EnvEnumMap.prod },
        ]}
        initialValue={envEnumType}
        onChange={value => {
          updateEnvEnumType(value);
          close();
        }}
      />
      <Button
        onPress={() => {
          close();
        }}
      >
        关闭
      </Button>
    </View>,
  );
};
