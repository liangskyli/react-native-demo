import Button from '@/components/button';
import Popup from '@/components/popup';
import SafeScreen from '@/components/safe-screen';
import Toast from '@/components/toast';
import { Paths } from '@/navigation/paths.ts';
import type { HomeTabScreenProps } from '@/navigation/types.ts';
import { useUserStore } from '@/store/modules/use-user-store.ts';
import { useState } from 'react';
import { Text, View } from 'react-native';

const MyScreen = (props: HomeTabScreenProps<Paths.my>) => {
  const { navigation } = props;
  const { cleanLoginData } = useUserStore();
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <SafeScreen
      className="flex-1 items-center justify-between"
      edges={['left', 'right']}
    >
      <Text>This is top text.</Text>
      <View className="items-center gap-1">
        <Text>my Screen</Text>
        <Button
          title="popup"
          onPress={() => {
            setPopupVisible(true);
          }}
        />
        <Button
          title="popup method"
          onPress={() => {
            const { close } = Popup.show(
              <View className="flex-1 items-center p-4">
                <Text className="text-[16px]">Popup内容</Text>
                <Button
                  title="关闭"
                  onPress={() => {
                    close();
                  }}
                />
              </View>,
            );
          }}
        />
        <Button
          title="toast"
          onPress={() => {
            Toast.show('Toast 内容');
          }}
        />
        <Button
          title="Go to webView"
          onPress={() => {
            navigation.navigate(Paths.webView, { uri: 'https://qq.com' });
          }}
        />
        <Button
          title="Login out"
          onPress={() => {
            cleanLoginData();
          }}
        />
      </View>
      <Text>This is bottom text.</Text>
      <Popup
        visible={popupVisible}
        maskClosable={true}
        maskProps={{ modalProps: { animationType: 'none' } }}
        onClose={() => setPopupVisible(false)}
        bodyClassName="p-10"
        position="center"
      >
        <View className="flex-1 items-center">
          <Text className="text-[16px]">内容</Text>
          <Button
            title="关闭"
            onPress={() => {
              setPopupVisible(false);
            }}
          />
        </View>
      </Popup>
    </SafeScreen>
  );
};

export default MyScreen;
