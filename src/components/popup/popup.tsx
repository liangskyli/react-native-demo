import type { MaskProps } from '@/components/mask';
import Mask from '@/components/mask';
import classConfig from '@/components/popup/class-config.ts';
import SafeScreen from '@/components/safe-screen';
import { cn } from '@/styles/tool.ts';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

export type Position = 'bottom' | 'top' | 'left' | 'right' | 'center' | 'none';
export type PopupProps = {
  /** 是否显示 */
  visible: boolean;
  /** 弹出位置 */
  position?: Position;
  /** 弹出内容 */
  children?: ReactNode;
  /** 点击蒙层是否可以关闭 */
  maskClosable?: boolean;
  /** 关闭时的回调 */
  onClose?: () => void;
  /** 内容区域类名 */
  bodyClassName?: string;
  /** 显示持续时间(毫秒)，设置为 0 则不会自动关闭 */
  duration?: number;
  /** 蒙层属性 */
  maskProps?: Omit<MaskProps, 'visible' | 'children' | 'onMaskPress'>;
};

const Popup = (props: PopupProps) => {
  const {
    visible,
    position = 'center',
    children,
    maskClosable,
    onClose,
    bodyClassName,
    duration = 0,
    maskProps,
  } = props;

  useEffect(() => {
    let timer: number | undefined;
    if (visible && duration > 0) {
      timer = setTimeout(() => {
        onClose?.();
      }, duration) as unknown as number;
    }
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  return (
    <Mask
      {...maskProps}
      visible={visible}
      onMaskPress={maskClosable ? onClose : undefined}
    >
      <SafeScreen
        className={cn(classConfig.bodyConfig({ position }), bodyClassName)}
      >
        {children}
      </SafeScreen>
    </Mask>
  );
};
export default Popup;
