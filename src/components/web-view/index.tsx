import type { HeaderLeftProps } from '@/components/web-view/header-left.tsx';
import HeaderLeft from '@/components/web-view/header-left.tsx';
import type { NativeStackHeaderLeftProps } from '@react-navigation/native-stack';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import type { WebViewProps as BaseWebViewProps } from 'react-native-webview';
import BaseWebView from 'react-native-webview';

export type WebViewProps = BaseWebViewProps & {
  /** 是否设置标题 */
  isSetTitle?: boolean;
  /** 标题 */
  title?: string;
  /** 是否多页模式,多页模式导航显示关闭和返回 */
  isMutiPage?: boolean;
} & Pick<HeaderLeftProps, 'navigation'>;
const WebView = (props: WebViewProps) => {
  const { isSetTitle, title, isMutiPage, navigation, ...webViewProps } = props;
  const webViewRef = useRef<BaseWebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const renderHeaderLeft = useCallback(
    (headerLeftProps: NativeStackHeaderLeftProps) => {
      return (
        <HeaderLeft
          {...headerLeftProps}
          canGoBack={canGoBack}
          webViewRef={webViewRef}
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
    <BaseWebView
      ref={webViewRef}
      renderLoading={() => <ActivityIndicator className="absolute inset-0" />}
      startInLoadingState={true}
      {...webViewProps}
      onNavigationStateChange={navState => {
        setCanGoBack(navState.canGoBack);
        if (isSetTitle) {
          navigation.setOptions({ title: title ?? navState.title });
        }
        webViewProps.onNavigationStateChange?.(navState);
      }}
    />
  );
};
export default WebView;
