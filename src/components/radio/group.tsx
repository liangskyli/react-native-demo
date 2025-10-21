import classConfig from '@/components/radio/class-config.ts';
import type { RadioProps } from '@/components/radio/radio.tsx';
import Radio from '@/components/radio/radio.tsx';
import { cn } from '@/styles/tool.ts';
import React, { useState } from 'react';
import { View } from 'react-native';

export type RadioGroupProps<T extends string | number = string> = {
  /** 选项列表 */
  options: Pick<RadioProps<T>, 'label' | 'value' | 'disabled'>[];
  /** 选项变化回调 */
  onChange: RadioProps<T>['onPress'];
  /** 初始选中值 */
  initialValue?: T;
  /** 自定义类名 */
  className?: string;
  /** 是否允许取消选择 */
  allowDeselect?: boolean;
  /** 选项自定义类名和icon */
  radioProps?: Pick<
    RadioProps<T>,
    | 'className'
    | 'boxClassName'
    | 'dotClassName'
    | 'labelClassName'
    | 'checkedIcon'
  >;
};
const RadioGroup = <T extends string | number = string>(
  props: RadioGroupProps<T>,
) => {
  const {
    options,
    onChange,
    initialValue,
    className,
    allowDeselect,
    radioProps,
  } = props;
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handlePress: RadioProps<T>['onPress'] = value => {
    if (allowDeselect && selectedValue === value) {
      setSelectedValue(undefined);
      onChange?.(undefined as any);
    } else {
      setSelectedValue(value);
      onChange?.(value);
    }
  };

  return (
    <View className={cn(classConfig.groupConfig, className)}>
      {options.map(option => (
        <Radio
          {...option}
          {...radioProps}
          key={option.value}
          checked={selectedValue === option.value}
          onPress={handlePress}
        />
      ))}
    </View>
  );
};

export default RadioGroup;
