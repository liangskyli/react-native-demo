import SafeScreen from '@/components/safe-screen';
import type { Paths } from '@/navigation/paths.ts';
import type { RootNativeStackScreenProps } from '@/navigation/types.ts';
import HeaderLeft from '@/screens/webview/components/header-left';
import type { NativeStackHeaderLeftProps } from '@react-navigation/native-stack';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = (props: RootNativeStackScreenProps<Paths.webView>) => {
  const { route, navigation } = props;
  const { isMutiPage, ...webViewProps } = route.params;
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const renderHeaderLeft = useCallback(
    (headerLeftProps: NativeStackHeaderLeftProps) => {
      return (
        <HeaderLeft
          {...headerLeftProps}
          canGoBack={canGoBack}
          webViewRef={webViewRef as any}
          navigation={navigation}
        />
      );
    },
    [canGoBack, navigation],
  );

  useLayoutEffect(() => {
    if (isMutiPage) {
      navigation.setOptions({
        headerLeft: renderHeaderLeft,
      });
    }
  }, [isMutiPage, navigation, renderHeaderLeft]);
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
          {...webViewProps}
          onNavigationStateChange={navState => {
            setCanGoBack(navState.canGoBack);
            navigation.setOptions({ title: navState.title });
            webViewProps.onNavigationStateChange?.(navState);
          }}
        />
      </View>
    </SafeScreen>
  );
};

export default WebViewScreen;
