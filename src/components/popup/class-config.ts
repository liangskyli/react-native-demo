import { cva } from 'class-variance-authority';

const defaultConfig = {
  body: {
    base: 'bg-white absolute',
    position: {
      bottom: 'w-full bottom-0',
      top: 'w-full top-0',
      left: ' h-full left-0',
      right: 'h-full right-0',
      center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      none: '',
    },
  },
  maskClickable: {
    true: 'pointer-events-box-none',
  },
};

const bodyConfig = cva(defaultConfig.body.base, {
  variants: {
    position: defaultConfig.body.position,
  },
});
const maskClickableConfig = cva('', {
  variants: {
    maskClickable: defaultConfig.maskClickable,
  },
});

const classConfig = {
  bodyConfig,
  maskClickableConfig,
};

export default classConfig;
