import { cn } from '@/styles/tool.ts';
import type { TouchableHighlightProps } from 'react-native';
import { Text, TouchableHighlight } from 'react-native';

export type ButtonProps = TouchableHighlightProps & {
  /** 按钮类名 */
  className?: string;
  /** 按钮文本类名,使用title时有效 */
  textClassName?: string;
  /** 按钮文本, 使用时忽略children */
  title?: string;
};
const Button = (props: ButtonProps) => {
  const {
    className,
    textClassName,
    title,
    underlayColor = '#1d4ed8',
    children,
    ...buttonProps
  } = props;

  return (
    <TouchableHighlight
      {...buttonProps}
      className={cn(
        'items-center justify-center rounded-[4px]',
        'bg-blue-600 disabled:bg-blue-400',
        'px-4 py-2',
        className,
      )}
      underlayColor={underlayColor}
    >
      {title ? (
        <Text className={cn('text-sm text-white', textClassName)}>{title}</Text>
      ) : (
        children
      )}
    </TouchableHighlight>
  );
};
export default Button;
