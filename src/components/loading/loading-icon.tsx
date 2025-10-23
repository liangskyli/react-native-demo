import Icon from '@/components/icon';
import { useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import type { SvgProps } from 'react-native-svg';

type LoadingIconProps = {
  /** 是否显示动画 */
  visibleAnimated: boolean;
  /** icon自定义样式 */
  className?: string;
} & Pick<SvgProps, 'width' | 'height' | 'color'>;
const LoadingIcon = (props: LoadingIconProps) => {
  const { visibleAnimated, ...svgProps } = props;
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (visibleAnimated) {
      // 启动无限循环的旋转动画
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1, // -1 表示无限循环
        false, // 不反向
      );
    }

    return () => {
      cancelAnimation(rotation);
      rotation.value = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleAnimated]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  return (
    <Animated.View style={animatedStyle}>
      <Icon path="loading" {...svgProps} />
    </Animated.View>
  );
};
export default LoadingIcon;
