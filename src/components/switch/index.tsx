import classConfig from '@/components/switch/class-config.ts';
import { cn } from '@/styles/tool.ts';
import type { ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import type { ColorValue } from 'react-native';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';
import LoadingIcon from '../loading/loading-icon.tsx';

type SwitchProps = {
  /** 开关状态 */
  value?: boolean;
  /** 开关状态变化回调 */
  onChange?: (value: boolean) => void;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 轨道颜色 */
  trackColor?: { off?: ColorValue; on?: ColorValue };
  /** 滑块颜色 */
  thumbColor?: ColorValue;
  /** 滑块大小 */
  thumbSize?: number;
  /** 动画持续时间 */
  animationDuration?: number;
  /** 选中时的文本 */
  checkedText?: ReactNode;
  /** 非选中时的文本 */
  uncheckedText?: ReactNode;
  /** 加载状态 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
};
const Switch = (props: SwitchProps) => {
  const {
    value = false,
    onChange,
    disabled = false,
    trackColor,
    thumbColor = colors.white,
    width = 54,
    height = 30,
    thumbSize = 24,
    animationDuration = 200,
    checkedText,
    uncheckedText,
    loading,
    className,
  } = props;

  const isDisabled = disabled || loading;
  const defaultTrackColor: SwitchProps['trackColor'] = {
    off: colors.gray['300'],
    on: colors.blue['600'],
  };
  const [isOn, setIsOn] = useState(value);
  const padding = (height - thumbSize) / 2;
  const translateX = useRef(
    new Animated.Value(value ? width - thumbSize - padding : padding),
  ).current;

  const toggleSwitch = () => {
    if (isDisabled) return;

    const newValue = !isOn;
    setIsOn(newValue);

    // 动画效果
    Animated.timing(translateX, {
      toValue: newValue ? width - thumbSize - padding : padding,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();

    onChange?.(newValue);
  };

  // 计算轨道和滑块样式
  const trackStyle = {
    width,
    height,
    borderRadius: height / 2,
    backgroundColor: isOn
      ? (trackColor?.on ?? defaultTrackColor.on)
      : (trackColor?.off ?? defaultTrackColor.off),
  };

  const thumbStyle = {
    width: thumbSize,
    height: thumbSize,
    backgroundColor: thumbColor,
    transform: [{ translateX }],
  };

  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      className={cn(
        classConfig.containerConfig({ disabled: isDisabled }),
        className,
      )}
      disabled={isDisabled}
      activeOpacity={1}
    >
      <View className="justify-center" style={trackStyle}>
        {isOn && (
          <Text className="absolute left-2 text-sm text-white">
            {checkedText}
          </Text>
        )}
        <Animated.View
          className="absolute items-center justify-center rounded-full"
          style={thumbStyle}
        >
          {loading && (
            <LoadingIcon
              visibleAnimated
              width={thumbSize - 6}
              height={thumbSize - 6}
              color={trackStyle.backgroundColor}
            />
          )}
        </Animated.View>
        {!isOn && (
          <Text className="absolute right-2 text-sm text-gray-700">
            {uncheckedText}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Switch;
