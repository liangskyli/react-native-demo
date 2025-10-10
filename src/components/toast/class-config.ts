import { cva } from 'class-variance-authority';

const defaultConfig = {
  maskProps: {
    base: 'bg-black/0',
    maskClickable: {
      true: 'pointer-events-box-none',
    },
  },
  body: {
    base: 'bg-black/70 max-w-[80%] min-w-[120px] rounded-lg px-4 py-3',
    position: {
      top: 'top-[30%] -translate-y-[30%]',
      center: '',
      bottom: 'top-[70%] -translate-y-[70%] ',
    },
  },
};

const maskPropsConfig = cva(defaultConfig.maskProps.base, {
  variants: {
    maskClickable: defaultConfig.maskProps.maskClickable,
  },
});

const bodyConfig = cva(defaultConfig.body.base, {
  variants: {
    position: defaultConfig.body.position,
  },
});

const classConfig = {
  maskPropsConfig,
  bodyConfig,
};

export default classConfig;
