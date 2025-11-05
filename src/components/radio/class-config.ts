import { cva } from 'class-variance-authority';

const defaultConfig = {
  group: 'flex-row gap-2',
  radio: {
    radioBox: {
      base: 'size-5 rounded-full border bg-white mr-2 justify-center items-center',
      checked: {
        false: 'border-gray-300',
        true: 'border-blue-600',
      },
    },
    radioDot: 'size-3 rounded-full bg-blue-600',
  },
};

const radioBoxConfig = cva(defaultConfig.radio.radioBox.base, {
  variants: {
    checked: defaultConfig.radio.radioBox.checked,
  },
  defaultVariants: {
    checked: false,
  },
});

const classConfig = {
  groupConfig: defaultConfig.group,
  radioBoxConfig,
  radioDotConfig: defaultConfig.radio.radioDot,
};

export default classConfig;
