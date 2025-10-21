import type { CheckboxProps } from '@/components/checkbox/checkbox.tsx';
import CheckboxBase from '@/components/checkbox/checkbox.tsx';
import type { CheckboxGroupProps } from '@/components/checkbox/group.tsx';
import CheckboxGroup from '@/components/checkbox/group.tsx';

type CheckboxType = typeof CheckboxBase & {
  Group: typeof CheckboxGroup;
};
const Checkbox = CheckboxBase as CheckboxType;
Checkbox.Group = CheckboxGroup;

export default Checkbox;
export type { CheckboxGroupProps, CheckboxProps };
