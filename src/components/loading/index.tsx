import LoadingIcon from '@/components/loading/loading-icon.tsx';
import Popup from '@/components/popup';
import { cn } from '@/styles/tool.ts';
import { Text, View } from 'react-native';

export type Props = {
  /** 是否显示 */
  visible: boolean;
  /** 内容区域自定义类名 */
  bodyClassName?: string;
  /** 文本区域自定义类名 */
  textClassName?: string;
};

const Loading = (props: Props) => {
  const { visible, bodyClassName, textClassName } = props;

  return (
    <Popup visible={visible} maskProps={{ className: 'bg-black/0' }}>
      <View
        className={cn(
          'size-[96px] items-center justify-center bg-black/70',
          bodyClassName,
        )}
      >
        <LoadingIcon visibleAnimated={visible} className="size-10 text-white" />
        <Text className={cn('mt-1 text-sm text-white', textClassName)}>
          加载中...
        </Text>
      </View>
    </Popup>
  );
};

export default Loading;
export { LoadingIcon };
