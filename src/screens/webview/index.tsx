import SafeScreen from '@/components/safe-screen';
import WebView from '@/components/web-view';
import type { Paths } from '@/navigation/paths.ts';
import type { RootNativeStackScreenProps } from '@/navigation/types.ts';
import { View } from 'react-native';

const WebViewScreen = (props: RootNativeStackScreenProps<Paths.webView>) => {
  const { route, navigation } = props;

  return (
    <SafeScreen
      className="flex-1 items-center justify-center"
      edges={['left', 'right']}
    >
      <View className="h-full w-full flex-1">
        <WebView isSetTitle {...route.params} navigation={navigation} />
      </View>
    </SafeScreen>
  );
};

export default WebViewScreen;
