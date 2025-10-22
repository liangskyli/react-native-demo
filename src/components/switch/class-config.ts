import { cva } from 'class-variance-authority';

const defaultConfig = {
  container: {
    base: '',
    disabled: {
      true: 'opacity-40',
    },
  },
};

const containerConfig = cva(defaultConfig.container.base, {
  variants: {
    disabled: defaultConfig.container.disabled,
  },
});

const classConfig = {
  containerConfig,
};

export default classConfig;
