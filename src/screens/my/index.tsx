import Button from '@/components/button';
import Checkbox from '@/components/checkbox';
import Popup from '@/components/popup';
import Radio from '@/components/radio';
import SafeScreen from '@/components/safe-screen';
import Switch from '@/components/switch';
import Toast from '@/components/toast';
import useMultipleTrigger from '@/hooks/use-multiple-trigger.tsx';
import { Paths } from '@/navigation/paths.ts';
import type { HomeTabScreenProps } from '@/navigation/types.ts';
import { ajaxLoadingStore } from '@/store';
import { useUserStore } from '@/store/modules/use-user-store.ts';
import { popUpSetEnvEnum } from '@/utils/change-env';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

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
  const { run: onClickPopUpEnv } = useMultipleTrigger(
    () => {
      popUpSetEnvEnum();
    },
    { times: 6 },
  );
  const [switch1, setSwitch1] = useState(false);
  const popUpShow = () => {
    const { close } = Popup.show(
      <View className="flex-1 items-center">
        <Text className="text-[16px]">内容</Text>
        <Button
          onPress={() => {
            Toast.show('Toast 内容2');
          }}
        >
          toast
        </Button>
        <Button
          onPress={() => {
            ajaxLoadingStore.getState().showLoading();
            setTimeout(() => {
              ajaxLoadingStore.getState().hideLoading();
            }, 3000);
          }}
        >
          loading
        </Button>
        <Button
          onPress={() => {
            close();
          }}
        >
          关闭
        </Button>
      </View>,
      { bodyClassName: 'p-0' },
    );
  };

  return (
    <SafeScreen
      className="flex-1 items-center justify-between"
      edges={['left', 'right']}
    >
      <Text>This is top text.</Text>
      <View className="items-center gap-1">
        <Text>my Screen</Text>
        <View className="flex-row items-center gap-2">
          <Switch value={switch1} onChange={setSwitch1} />
          <Switch value={true} disabled />
          <Switch
            value={switch1}
            onChange={setSwitch1}
            width={70}
            height={40}
            thumbSize={30}
            checkedText="开"
            uncheckedText="关"
          />
        </View>
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
          loading={true}
          onPress={() => {
            navigation.navigate(Paths.virtualList, { type: 'list1' });
          }}
        >
          loading
        </Button>
        <Button
          onPress={() => {
            navigation.navigate(Paths.virtualList, { type: 'list1' });
          }}
        >
          VirtualList 列表分页滚动
        </Button>
        <Button
          onPress={() => {
            navigation.navigate(Paths.virtualList, { type: 'list2' });
          }}
        >
          VirtualList 聊天消息滚动
        </Button>
        <Button
          onPress={() => {
            setPopupVisible(true);
          }}
        >
          popup1
        </Button>
        <Button
          onPress={() => {
            popUpShow();
          }}
        >
          popup2
        </Button>
        <Button
          onPress={() => {
            onClickPopUpEnv();
          }}
        >
          连续点6次
        </Button>
        <Button
          onPress={() => {
            Toast.show('Toast 内容');
          }}
        >
          toast
        </Button>
        <Button
          onPress={() => {
            navigation.navigate(Paths.webView, {
              source: { uri: 'https://qq.com' },
              isMutiPage: true,
            });
          }}
        >
          Go to webView
        </Button>
        <Button
          onPress={() => {
            navigation.navigate(Paths.webView, {
              originWhitelist: ['*'],
              source: { html: '<h1>Hello world</h1>' },
              title: 'Hello world',
            });
          }}
        >
          Go to webView html
        </Button>
        <Button
          onPress={() => {
            navigation.navigate(Paths.logViewer);
          }}
        >
          查看日志文件
        </Button>
        <Button
          onPress={() => {
            cleanLoginData();
          }}
        >
          Login out
        </Button>
      </View>
      <Text>This is bottom text.</Text>
      <Popup
        visible={popupVisible}
        maskClosable={true}
        onClose={() => setPopupVisible(false)}
        bodyClassName="p-0"
        position="bottom"
        /*edges={[]}*/
      >
        <View className="flex-1 items-center">
          <ScrollView className="h-[200px]">
            <Text className="text-[16px]">内容</Text>
            <Text className="text-[16px]">内容</Text>
            <Text className="text-[16px]">内容</Text>
            <Text className="text-[16px]">内容</Text>
            <Text className="text-[16px]">内容</Text>
            <Button
              onPress={() => {
                Toast.show('Toast 内容2内容2内容2内容2');
              }}
            >
              toast
            </Button>
            <Button
              onPress={() => {
                ajaxLoadingStore.getState().showLoading();
                setTimeout(() => {
                  ajaxLoadingStore.getState().hideLoading();
                }, 3000);
              }}
            >
              loading
            </Button>
            <Button
              onPress={() => {
                popUpShow();
              }}
            >
              popup2
            </Button>
            <Button
              onPress={() => {
                setPopupVisible(false);
              }}
            >
              关闭
            </Button>
          </ScrollView>
        </View>
      </Popup>
    </SafeScreen>
  );
};

export default MyScreen;
