import classConfig from '@/components/popup/class-config.ts';
import type { PopupProps } from '@/components/popup/popup.tsx';
import Popup from '@/components/popup/popup.tsx';
import { portalStore } from '@/components/portal/use-portal-store.ts';
import { cn } from '@/styles/tool.ts';
import { merge } from 'lodash';
import type { ReactNode } from 'react';

export type PopupHostProps = Omit<PopupProps, 'children'> & {
  /** 弹出内容 */
  content: ReactNode;
  /** 是否允许蒙层穿透点击 */
  maskClickable?: boolean;
};
const defaultConfig: PopupConfigProps = {
  duration: 0,
  position: 'center',
  maskClickable: false,
};
let currentConfig = { ...defaultConfig };
export const PopupHost = (props: PopupHostProps) => {
  const { maskClickable, content, maskProps, ...popupProps } = props;

  return (
    <Popup
      {...popupProps}
      maskProps={{
        ...maskProps,
        className: cn(
          maskProps?.className,
          classConfig.maskClickableConfig({ maskClickable }),
        ),
        renderMode: 'view',
      }}
    >
      {content}
    </Popup>
  );
};

type PopupConfigProps = Omit<
  PopupHostProps,
  'visible' | 'content' | 'onClose'
> & {
  /** 关闭后的回调 */
  afterClose?: () => void;
};
type CloseHandler = {
  close: () => void;
};

const show: (
  content: ReactNode,
  config?: Partial<PopupConfigProps>,
) => CloseHandler = (content, config) => {
  const mergedConfig = merge({}, currentConfig, config);
  const { add, remove } = portalStore.getState();

  const key = add(
    <PopupHost
      {...mergedConfig}
      content={content}
      visible={true}
      onClose={() => {
        close();
      }}
    />,
    'popup',
  );

  const close = () => {
    remove(key);
    mergedConfig.afterClose?.();
  };
  return { close };
};

const config = (conf: PopupConfigProps) => {
  currentConfig = {
    ...currentConfig,
    ...conf,
  };
};

const getConfig = () => ({ ...currentConfig }) as PopupConfigProps;

const clear = () => {
  const { clear: portalClear } = portalStore.getState();
  portalClear('popup');
};
export { clear, config, getConfig, show };
