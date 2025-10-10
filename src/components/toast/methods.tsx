import type { PopupProps } from '@/components/popup';
import Popup from '@/components/popup';
import { portalStore } from '@/components/portal/use-portal-store.ts';
import classConfig from '@/components/toast/class-config.ts';
import { cn } from '@/styles/tool.ts';
import { merge } from 'lodash';
import { Text } from 'react-native';

const sleep = (time: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, time);
  });
};

// Toast的位置类型
type ToastPosition = 'top' | 'bottom' | 'center';
export type ToastHostProps = Pick<PopupProps, 'visible' | 'bodyClassName'> & {
  /** toast内容 */
  content: string;
  /** toast内容类名 */
  contentClassName?: string;
  /** toast位置 */
  position: ToastPosition;
  /** 是否允许蒙层穿透点击 */
  maskClickable?: boolean;
};
const defaultConfig: ToastConfigProps = {
  duration: 3000,
  position: 'center',
  maskClickable: false,
};
let currentConfig = { ...defaultConfig };
export const ToastHost = (props: ToastHostProps) => {
  const {
    bodyClassName,
    content,
    contentClassName,
    position,
    maskClickable,
    ...popupProps
  } = props;

  return (
    <Popup
      {...popupProps}
      maskProps={{
        className: classConfig.maskPropsConfig({ maskClickable }),
        isUseModal: !maskClickable,
      }}
      bodyClassName={cn(classConfig.bodyConfig({ position }), bodyClassName)}
    >
      <Text
        className={cn(
          'break-words text-center text-[14px] text-white',
          contentClassName,
        )}
      >
        {content}
      </Text>
    </Popup>
  );
};

type ToastConfigProps = Omit<ToastHostProps, 'visible' | 'content'> & {
  /** 显示持续时间(毫秒)，设置为 0 则不会自动关闭 */
  duration?: number;
  /** 关闭后的回调 */
  afterClose?: () => void;
};
type CloseHandler = {
  close: () => void;
};

const show: (
  content: string,
  config?: Partial<ToastConfigProps>,
) => Promise<CloseHandler> = async (content, config) => {
  const mergedConfig = merge(currentConfig, config);
  const { duration, afterClose, position, maskClickable } = mergedConfig;
  const { add, remove, clear } = portalStore.getState();

  // 单例模式
  clear('toast');
  const key = add(
    <ToastHost
      content={content}
      visible={true}
      position={position}
      maskClickable={maskClickable}
    />,
    'toast',
  );

  const close = () => {
    remove(key);
    afterClose?.();
  };
  if (duration !== undefined && duration > 0) {
    await sleep(duration);
    close();
  }
  return { close };
};

const config = (conf: ToastConfigProps) => {
  currentConfig = {
    ...currentConfig,
    ...conf,
  };
};

const getConfig = () => ({ ...currentConfig }) as ToastConfigProps;

const clear = () => {
  const { clear } = portalStore.getState();
  clear('toast');
};
export { clear, config, getConfig, show };
