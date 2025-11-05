import AssetsImage from '@/components/assets-image';
import Icon from '@/components/icon';
import type { RootNativeStackScreenProps } from '@/navigation/types.ts';
import type { NativeStackHeaderLeftProps } from '@react-navigation/native-stack';
import type { RefObject } from 'react';
import { TouchableOpacity } from 'react-native';
import type WebView from 'react-native-webview';

export type HeaderLeftProps = NativeStackHeaderLeftProps & {
  /** webview ref */
  webViewRef: RefObject<WebView | null>;
  /** 导航 */
  navigation: RootNativeStackScreenProps<any>['navigation'];
};
const HeaderLeft = (props: HeaderLeftProps) => {
  const { canGoBack, webViewRef, navigation } = props;
  return (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon path="close" className="-ml-2 size-7 color-[#007AFF]" />
      </TouchableOpacity>
      {canGoBack && (
        <TouchableOpacity
          onPress={() => {
            webViewRef.current!.goBack();
          }}
        >
          <AssetsImage path="back-icon" className="size-[21px]" />
        </TouchableOpacity>
      )}
    </>
  );
};
export default HeaderLeft;
