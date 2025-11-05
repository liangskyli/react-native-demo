import type { MaskProps } from '@/components/mask';
import Mask from '@/components/mask';
import classConfig from '@/components/popup/class-config.ts';
import SafeScreen from '@/components/safe-screen';
import { cn } from '@/styles/tool.ts';
import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';
import type { Edge } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  /** SafeScreen属性，默认没设置 */
  edges?: Edge[];
};

const defaultEdges: Record<Position, Edge[]> = {
  top: ['top'],
  bottom: ['bottom'],
  left: ['top', 'bottom'],
  right: ['top', 'bottom'],
  center: [],
  none: [],
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
    edges,
  } = props;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    let timer: number | undefined;
    if (visible && duration > 0) {
      timer = setTimeout(() => {
        onClose?.();
      }, duration) as unknown as number;
    }
    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  const mergedEdges = edges ? edges : defaultEdges[position];
  const mergedEdgesStyles = useMemo(() => {
    const styles: Record<string, number> = {};

    if (mergedEdges.includes('top')) {
      styles.paddingTop = insets.top;
    }
    if (mergedEdges.includes('bottom')) {
      styles.paddingBottom = insets.bottom;
    }
    if (mergedEdges.includes('left')) {
      styles.paddingLeft = insets.left;
    }
    if (mergedEdges.includes('right')) {
      styles.paddingRight = insets.right;
    }

    return styles;
  }, [insets.bottom, insets.left, insets.right, insets.top, mergedEdges]);
  return (
    <Mask
      portalType="popup"
      {...maskProps}
      visible={visible}
      onMaskPress={maskClosable ? onClose : undefined}
    >
      <SafeScreen
        className={cn(classConfig.bodyConfig({ position }), bodyClassName)}
        edges={[]}
        style={mergedEdgesStyles}
      >
        {children}
      </SafeScreen>
    </Mask>
  );
};
export default Popup;
