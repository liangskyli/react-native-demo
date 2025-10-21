import Button from '@/components/button';
import Checkbox from '@/components/checkbox';
import Popup from '@/components/popup';
import Radio from '@/components/radio';
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
  const [radioValue, setRadioValue] = useState('1');
  const handleRadioChange = (value: string) => {
    setRadioValue(value);
    console.log('radio change:', value);
  };
  const handleSelectionChange = (selected: string[]) => {
    console.log('当前选中:', selected);
  };

  return (
    <SafeScreen
      className="flex-1 items-center justify-between"
      edges={['left', 'right']}
    >
      <Text>This is top text.</Text>
      <View className="items-center gap-1">
        <Text>my Screen</Text>
        <Checkbox.Group
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
            { label: '橙子', value: 'orange' },
          ]}
          onChange={handleSelectionChange}
        />
        <Radio.Group
          options={[
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
            { label: '选项3', value: '3' },
          ]}
          initialValue={radioValue}
          onChange={handleRadioChange}
        />
        <Button
          title="VirtualList 列表分页滚动"
          onPress={() => {
            navigation.navigate(Paths.virtualList, { type: 'list1' });
          }}
        />
        <Button
          title="VirtualList 聊天消息滚动"
          onPress={() => {
            navigation.navigate(Paths.virtualList, { type: 'list2' });
          }}
        />
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
          title="查看日志文件"
          onPress={() => {
            navigation.navigate(Paths.logViewer);
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
