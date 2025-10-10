import Icon from '@/components/icon';
import Popup from '@/components/popup';
import { cn } from '@/styles/tool.ts';
import { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

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
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let rotateAnimationClass: Animated.CompositeAnimation | undefined;
    if (visible) {
      rotateAnimation.setValue(0); // 初始化角度为0
      rotateAnimationClass = Animated.loop(
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 1000, // 旋转一圈的时间，例如1秒
          useNativeDriver: true, // 如果可能，使用原生驱动可以提高性能
        }),
      );
      rotateAnimationClass.start();
    }
    return () => {
      rotateAnimationClass?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const spin = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Popup visible={visible} maskProps={{ className: 'bg-black/0' }}>
      <View
        className={cn(
          'h-[96px] w-[96px] items-center justify-center bg-black/70',
          bodyClassName,
        )}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Icon path="loading" width={40} height={40} color="#fff" />
        </Animated.View>
        <Text className={cn('mt-[4px] text-[14px] text-white', textClassName)}>
          加载中...
        </Text>
      </View>
    </Popup>
  );
};
export default Loading;
