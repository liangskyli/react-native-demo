import type { PortalType } from '@/components/portal/use-portal-store.ts';
import { portalStore } from '@/components/portal/use-portal-store.ts';
import { cn } from '@/styles/tool.ts';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import type { ModalProps, TouchableWithoutFeedbackProps } from 'react-native';
import { Modal, Pressable, View } from 'react-native';

type BaseMaskProps = {
  /** 遮罩层自定义类名 */
  className?: string;
  /** 蒙层的内容 */
  children?: ReactNode;
  /** 点击蒙层自身时触发 */
  onMaskPress?: TouchableWithoutFeedbackProps['onPress'];
  /** 是否在关闭时销毁内容,renderMode不是portal有效 */
  destroyOnClose?: boolean;
  /** 是否显示 */
  visible?: boolean;
  /** 渲染模式:
   * 'portal' - 渲染到Portal容器中
   * 'view' - 直接渲染
   * 'modal' - 原生渲染*/
  renderMode?: 'portal' | 'view' | 'modal';
  /** portalType, renderMode为portal时有效 */
  portalType?: PortalType;
};
type MaskModalProps = Omit<ModalProps, 'children' | 'visible'>;
export type MaskProps = BaseMaskProps & {
  /** renderMode为modal时有效,原生Modal的弹窗属性 */
  modalProps?: MaskModalProps;
};
const Mask = (props: MaskProps) => {
  const {
    visible,
    className,
    children,
    onMaskPress,
    destroyOnClose,
    renderMode = 'portal',
    modalProps,
    portalType = 'mask',
  } = props;
  const portalKeyRef = useRef<number>(null);

  const baseMask = useMemo(
    () => (
      <>
        <Pressable
          className={cn(
            'absolute inset-0 h-full w-full bg-black/70',
            className,
          )}
          onPress={event => {
            if (event.target === event.currentTarget) {
              onMaskPress?.(event);
            }
          }}
        />
        <View className="absolute inset-0">{children}</View>
      </>
    ),
    [className, onMaskPress, children],
  );

  // Portal 模式：动态添加/移除元素
  useEffect(() => {
    if (renderMode === 'portal') {
      const { add, remove } = portalStore.getState();

      if (visible) {
        // 添加到 Portal
        portalKeyRef.current = add(baseMask, portalType);
      } else if (portalKeyRef.current !== null) {
        // 从 Portal 移除
        remove(portalKeyRef.current);
        portalKeyRef.current = null;
      }

      return () => {
        // 组件卸载时清理
        if (portalKeyRef.current !== null) {
          remove(portalKeyRef.current);
          portalKeyRef.current = null;
        }
      };
    }
  }, [baseMask, portalType, renderMode, visible]);

  // Portal 模式不渲染任何内容
  if (renderMode === 'portal') {
    return null;
  }

  // 非Portal 模式：直接渲染
  if (!visible && destroyOnClose) {
    return null;
  }

  return (
    <>
      {renderMode === 'modal' ? (
        <Modal
          statusBarTranslucent
          transparent
          onRequestClose={() => {}}
          {...modalProps}
          visible={visible}
        >
          {baseMask}
        </Modal>
      ) : (
        baseMask
      )}
    </>
  );
};
export default Mask;
