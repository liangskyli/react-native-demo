import { useKeyboard } from '@/components/keyboard-aware-view/use-keyboard.ts';
import type { ReactNode } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export type KeyboardAwareViewProps = {
  /** 子组件 */
  children: ReactNode;
  /** 是否启用键盘避让（默认 true） */
  enabled?: boolean;
  /** 额外的偏移量（默认 0） */
  extraOffset?: number;
  /** 容器类名 */
  className?: string;
};

/**
 * 键盘感知容器组件
 *
 * 自动根据键盘高度调整 paddingBottom，避免内容被键盘遮挡
 *
 * @example
 * ```typescript
 * <KeyboardAwareView>
 *   <ScrollView>
 *     <TextInput />
 *   </ScrollView>
 * </KeyboardAwareView>
 * ```
 */
const KeyboardAwareView = (props: KeyboardAwareViewProps) => {
  const { children, enabled = true, extraOffset = 0, className } = props;
  const { offset: keyboardOffset } = useKeyboard();

  const animatedStyle = useAnimatedStyle(() => {
    if (!enabled) {
      return {};
    }

    return {
      paddingBottom: keyboardOffset.value + extraOffset,
    };
  });

  return (
    <Animated.View className={className} style={[animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default KeyboardAwareView;
export { useKeyboard };
