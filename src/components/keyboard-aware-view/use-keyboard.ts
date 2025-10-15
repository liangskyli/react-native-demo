import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * 获取键盘动画值的 Hook
 *
 * @returns 键盘高度、进度和偏移量
 *
 * @example
 * ```typescript
 * const { height, progress, offset } = useKeyboard();
 *
 * const animatedStyle = useAnimatedStyle(() => {
 *   return {
 *     paddingBottom: offset.value,
 *     opacity: 1 - progress.value * 0.5,
 *   };
 * });
 * ```
 */
export function useKeyboard() {
  const insets = useSafeAreaInsets();
  const { height: keyboardHeight, progress } = useReanimatedKeyboardAnimation();

  // 将 insets.bottom 转换为 SharedValue，避免依赖项变化
  const insetsBottom = useSharedValue(insets.bottom);

  // 当 insets.bottom 变化时更新 SharedValue
  useEffect(() => {
    insetsBottom.value = insets.bottom;
  }, [insets.bottom, insetsBottom]);

  const offset = useDerivedValue(() => {
    'worklet';

    // 取绝对值，因为某些情况下 keyboardHeight 可能是负数
    const absoluteKeyboardHeight = Math.abs(keyboardHeight.value);

    // 键盘未打开
    if (absoluteKeyboardHeight === 0) {
      return 0;
    }

    // iOS: 键盘高度已包含底部安全区域，需要减去
    if (Platform.OS === 'ios') {
      return absoluteKeyboardHeight - insetsBottom.value;
    }

    // Android: 直接使用键盘高度
    return absoluteKeyboardHeight;
  }, [keyboardHeight, insetsBottom]);

  return {
    /** 键盘高度（像素） */
    height: keyboardHeight,
    /** 键盘打开进度（0-1） */
    progress,
    /** 键盘偏移量（已考虑安全区域） */
    offset,
  };
}
