import { cn } from '@/styles/tool.ts';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ModalProps, TouchableWithoutFeedbackProps } from 'react-native';
import { Modal, Pressable } from 'react-native';

type BaseMaskProps = {
  /** 遮罩层自定义类名 */
  className?: string;
  /** 蒙层的内容 */
  children?: ReactNode;
  /** 点击蒙层自身时触发 */
  onMaskPress?: TouchableWithoutFeedbackProps['onPress'];
  /** 是否在关闭时销毁内容 */
  destroyOnClose?: boolean;
  /** 是否显示 */
  visible?: boolean;
  /** 是否用原生Modal的弹窗,默认true, false时，要确保放在根元素最后，才能确保全屏显示*/
  isUseModal?: boolean;
};
type MaskModalProps = Omit<ModalProps, 'children' | 'visible'>;
export type MaskProps = BaseMaskProps & {
  /** isUseModal为true时有效,原生Modal的弹窗属性 */
  modalProps?: MaskModalProps;
};
const Mask = (props: MaskProps) => {
  const {
    visible,
    className,
    children,
    onMaskPress,
    destroyOnClose,
    isUseModal = true,
    modalProps,
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const timeout = useRef<number>(null);

  useEffect(() => {
    if (visible) {
      // android闪耀，延迟显示
      timeout.current = setTimeout(
        () => setIsVisible(true),
        0,
      ) as unknown as number;
    } else {
      setIsVisible(false);
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [visible]);

  if (!visible && destroyOnClose) {
    return null;
  }

  const baseMask = (
    <Pressable
      className={cn(
        'absolute inset-0 bg-black/70',
        isVisible ? '' : 'hidden',
        className,
      )}
      onPress={event => {
        if (event.target === event.currentTarget) {
          onMaskPress?.(event);
        }
      }}
    >
      {children}
    </Pressable>
  );

  return (
    <>
      {isUseModal ? (
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
