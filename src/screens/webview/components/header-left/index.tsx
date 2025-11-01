import AssetsImage from '@/components/assets-image';
import Icon from '@/components/icon';
import type { Paths } from '@/navigation/paths.ts';
import type { RootNativeStackScreenProps } from '@/navigation/types.ts';
import type { NativeStackHeaderLeftProps } from '@react-navigation/native-stack';
import type { RefObject } from 'react';
import { TouchableOpacity } from 'react-native';
import type WebView from 'react-native-webview';

type HeaderLeftProps = NativeStackHeaderLeftProps & {
  webViewRef: RefObject<WebView>;
  navigation: RootNativeStackScreenProps<Paths.webView>['navigation'];
};
const HeaderLeft = (props: HeaderLeftProps) => {
  const { canGoBack, webViewRef, navigation } = props;
  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon path="close" className="-ml-2 size-[28px] color-[#007AFF]" />
      </TouchableOpacity>
      {canGoBack && (
        <TouchableOpacity
          onPress={() => {
            webViewRef.current!.goBack();
          }}
        >
          <AssetsImage path="back-icon" className="h-[21px] w-[12px]" />
        </TouchableOpacity>
      )}
    </>
  );
};
export default HeaderLeft;
