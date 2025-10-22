import { cn } from '@/styles/tool.ts';
import type { ReactNode } from 'react';
import React from 'react';
import type { ColorValue, TouchableHighlightProps } from 'react-native';
import { Text, TouchableHighlight, View } from 'react-native';
import LoadingIcon from '../loading/loading-icon.tsx';

export type ButtonProps = TouchableHighlightProps & {
  /** 按钮类名 */
  className?: string;
  /** 按钮文本类名,使用title时有效 */
  textClassName?: string;
  /** 按钮文本 */
  children?: ReactNode;
  /** 加载状态 */
  loading?: boolean;
  /** 加载图标颜色 */
  loadingColor?: ColorValue;
  /** 加载图标大小 */
  loadingSize?: number;
};
const Button = (props: ButtonProps) => {
  const {
    className,
    textClassName,
    underlayColor = '#1d4ed8',
    children,
    disabled,
    loading,
    loadingColor = '#fff',
    loadingSize = 16,
    ...buttonProps
  } = props;
  const isDisabled = disabled || loading;

  return (
    <TouchableHighlight
      {...buttonProps}
      disabled={isDisabled}
      className={cn(
        'items-center justify-center rounded-[4px]',
        'bg-blue-600 disabled:bg-blue-400',
        'px-4 py-2',
        className,
      )}
      underlayColor={underlayColor}
    >
      <Text className={cn('text-sm text-white', textClassName)}>
        {loading ? (
          <View className="flex-row">
            <View className="mr-1.5 justify-center align-middle">
              <LoadingIcon
                visibleAnimated
                width={loadingSize}
                height={loadingSize}
                color={loadingColor}
              />
            </View>
            <Text className={cn('text-sm text-white', textClassName)}>
              {children}
            </Text>
          </View>
        ) : (
          children
        )}
      </Text>
    </TouchableHighlight>
  );
};
export default Button;
