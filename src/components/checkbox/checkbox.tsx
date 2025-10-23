import Icon from '@/components/icon';
import { cn } from '@/styles/tool.ts';
import type { ReactNode } from 'react';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import classConfig from './class-config';

export type CheckboxProps<T extends string | number = string> = {
  /** 选项标签 */
  label: string;
  /** 选项值 */
  value: T;
  /** 是否选中 */
  checked: boolean;
  /** 是否为半选状态, 优先级高于checked状态 */
  indeterminate?: boolean;
  /** 选中时的回调 */
  onChange: (checked: boolean, value: T) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义框类名 */
  boxClassName?: string;
  /** 自定义标签类名 */
  labelClassName?: string;
  /** 自定义勾选图标 */
  checkedIcon?: ReactNode;
  /** 自定义半选图标 */
  indeterminateIcon?: ReactNode;
};
const Checkbox = <T extends string | number = string>(
  props: CheckboxProps<T>,
) => {
  const {
    label,
    value,
    checked,
    indeterminate = false,
    onChange,
    disabled,
    className,
    boxClassName,
    labelClassName,
    checkedIcon = <Icon path="check" className="size-[14px] text-white" />,
    indeterminateIcon = (
      <Icon path="indeterminate" className="size-[14px] text-white" />
    ),
  } = props;
  return (
    <TouchableOpacity
      className={cn(classConfig.checkboxConfig({ disabled }), className)}
      onPress={() => onChange(!checked, value)}
      disabled={disabled}
      activeOpacity={1}
    >
      <View className={cn(classConfig.boxConfig({ checked }), boxClassName)}>
        {indeterminate ? indeterminateIcon : <>{checked && checkedIcon}</>}
      </View>
      <Text className={cn(classConfig.labelConfig, labelClassName)}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
