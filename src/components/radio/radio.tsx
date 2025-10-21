import type { CheckboxProps } from '@/components/checkbox';
import Checkbox from '@/components/checkbox';
import classConfig from '@/components/radio/class-config.ts';
import { cn } from '@/styles/tool.ts';
import React from 'react';
import { View } from 'react-native';

export type RadioProps<T extends string | number = string> = Omit<
  CheckboxProps<T>,
  'indeterminate' | 'onChange'
> & {
  /** 选中时的回调 */
  onPress?: (value: T) => void;
  /** 自定义点类名 */
  dotClassName?: string;
};
const Radio = <T extends string | number = string>(props: RadioProps<T>) => {
  const { onPress, dotClassName, checkedIcon, boxClassName, ...checkboxProps } =
    props;
  return (
    <Checkbox
      {...checkboxProps}
      boxClassName={cn(
        classConfig.radioBoxConfig({ checked: checkboxProps.checked }),
        boxClassName,
      )}
      checkedIcon={
        checkedIcon ?? (
          <View className={cn(classConfig.radioDotConfig, dotClassName)} />
        )
      }
      onChange={(_checked, value) => {
        onPress?.(value);
      }}
    />
  );
};

export default Radio;
