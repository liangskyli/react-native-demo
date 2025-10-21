import { cva } from 'class-variance-authority';

const defaultConfig = {
  group: 'flex-row gap-2',
  checkbox: {
    checkbox: {
      base: 'flex-row items-center',
      disabled: {
        true: 'opacity-40',
      },
    },
    box: {
      base: 'w-5 h-5 rounded border bg-white mr-2 justify-center items-center',
      checked: {
        false: 'border-gray-300',
        true: 'border-blue-600 bg-blue-600',
      },
    },
    icon: 'h-2.5 w-2.5',
    label: 'text-sm text-gray-700',
  },
};

const checkboxConfig = cva(defaultConfig.checkbox.checkbox.base, {
  variants: {
    disabled: defaultConfig.checkbox.checkbox.disabled,
  },
});
const boxConfig = cva(defaultConfig.checkbox.box.base, {
  variants: {
    checked: defaultConfig.checkbox.box.checked,
  },
  defaultVariants: {
    checked: false,
  },
});

const classConfig = {
  groupConfig: defaultConfig.group,
  checkboxConfig: checkboxConfig,
  boxConfig: boxConfig,
  labelConfig: defaultConfig.checkbox.label,
};

export default classConfig;
