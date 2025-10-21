import classConfig from '@/components/checkbox/class-config.ts';
import { cn } from '@/styles/tool.ts';
import React, { useState } from 'react';
import { View } from 'react-native';
import type { CheckboxProps } from './checkbox';
import Checkbox from './checkbox';

export type CheckboxGroupProps<T extends string | number = string> = {
  options: Pick<
    CheckboxProps<T>,
    'label' | 'value' | 'disabled' | 'indeterminate'
  >[];
  /** 初始选中值 */
  initialSelected?: T[];
  /** 选项变化回调 */
  onChange?: (selectedValues: T[]) => void;
  /** 是否单选 */
  singleSelect?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 选项自定义类名和icon */
  checkboxProps?: Pick<
    CheckboxProps,
    | 'className'
    | 'boxClassName'
    | 'labelClassName'
    | 'checkedIcon'
    | 'indeterminateIcon'
  >;
};
const CheckboxGroup = <T extends string | number = string>(
  props: CheckboxGroupProps<T>,
) => {
  const {
    options,
    initialSelected = [],
    onChange,
    singleSelect = false,
    className,
    checkboxProps,
  } = props;
  const [selectedValues, setSelectedValues] = useState(initialSelected);

  const handleChange = (isChecked: boolean, value: T) => {
    let newSelected: T[];
    if (singleSelect) {
      newSelected = isChecked ? [value] : [];
    } else {
      newSelected = isChecked
        ? [...selectedValues, value]
        : selectedValues.filter(v => v !== value);
    }

    setSelectedValues(newSelected);
    onChange && onChange(newSelected);
  };

  return (
    <View className={cn(classConfig.groupConfig, className)}>
      {options.map(option => (
        <Checkbox
          {...checkboxProps}
          key={option.value}
          label={option.label}
          value={option.value}
          checked={selectedValues.includes(option.value)}
          onChange={handleChange}
        />
      ))}
    </View>
  );
};

export default CheckboxGroup;
