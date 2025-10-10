import SafeScreen from '@/components/safe-screen';
import type { Paths } from '@/navigation/paths.ts';
import type { RootNativeStackScreenProps } from '@/navigation/types.ts';
import { ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = (props: RootNativeStackScreenProps<Paths.webView>) => {
  const { route, navigation } = props;
  return (
    <SafeScreen
      className="flex-1 items-center justify-center"
      edges={['left', 'right']}
    >
      <View className="h-full w-full flex-1">
        <WebView
          source={{ uri: route.params.uri }}
          renderLoading={() => (
            <ActivityIndicator className="absolute inset-0" />
          )}
          startInLoadingState={true}
          onNavigationStateChange={navState => {
            navigation.setOptions({ title: navState.title });
          }}
        />
      </View>
    </SafeScreen>
  );
};

export default WebViewScreen;
