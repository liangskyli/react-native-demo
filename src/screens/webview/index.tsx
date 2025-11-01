import AssetsImage from '@/components/assets-image';
import Icon from '@/components/icon';
import SafeScreen from '@/components/safe-screen';
import type { Paths } from '@/navigation/paths.ts';
import type { RootNativeStackScreenProps } from '@/navigation/types.ts';
import { useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = (props: RootNativeStackScreenProps<Paths.webView>) => {
  const { route, navigation } = props;
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => {
        return (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon path="close" className="size-[28px] color-[#007AFF]" />
            </TouchableOpacity>
            {canGoBack && (
              <TouchableOpacity
                onPress={() => {
                  webViewRef.current!.goBack();
                }}
              >
                <AssetsImage
                  path="back-icon"
                  className="ml-2 h-[21px] w-[12px]"
                />
              </TouchableOpacity>
            )}
          </>
        );
      },
    });
  }, [canGoBack, navigation]);
  return (
    <SafeScreen
      className="flex-1 items-center justify-center"
      edges={['left', 'right']}
    >
      <View className="h-full w-full flex-1">
        <WebView
          ref={webViewRef}
          renderLoading={() => (
            <ActivityIndicator className="absolute inset-0" />
          )}
          startInLoadingState={true}
          {...route.params}
          onNavigationStateChange={navState => {
            setCanGoBack(navState.canGoBack);
            navigation.setOptions({ title: navState.title });
            route.params.onNavigationStateChange?.(navState);
          }}
        />
      </View>
    </SafeScreen>
  );
};

export default WebViewScreen;
