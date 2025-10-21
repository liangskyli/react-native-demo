import { useLatest } from 'ahooks';
import { useMemo } from 'react';

type noop = (...args: any) => any;

export interface MultipleTriggerOptions {
  /** 触发事件的点击次数，默认值：2 */
  times?: number;
  /** 有效点击次数计算的间隙时间，默认值（ms）：400 */
  clickGap?: number;
  /** 严格模式下必须是点击指定的次数才触发，默认值：true */
  strict?: boolean;
}

function multipleTriggerFn<T extends noop>(
  fn: T,
  options?: MultipleTriggerOptions,
) {
  const { times = 2, clickGap = 400, strict = true } = options || {};

  let lastClickTime = Date.now() - clickGap;
  let count = 0;
  let timer: number;
  const clearTimer = () => {
    clearTimeout(timer);
  };
  const resultFn = (...args: any[]) => {
    const time = Date.now();
    const timeSinceLastClick = time - lastClickTime;
    lastClickTime = time;
    if (timeSinceLastClick < clickGap) {
      count = count + 1;
    } else {
      // 点击断了重新计数
      count = 1;
    }
    if (strict) {
      if (count === times) {
        timer = setTimeout(() => {
          fn(...args);
        }, clickGap) as unknown as number;
      } else {
        clearTimer();
      }
    } else {
      if (count === times) {
        fn(...args);
      } else {
        //
      }
    }
  };
  return {
    run: resultFn,
    cancel: clearTimer,
  };
}

function useMultipleTrigger<T extends noop>(
  fn: T,
  options?: MultipleTriggerOptions,
) {
  const fnRef = useLatest(fn);

  const multipleTriggered = useMemo(
    () =>
      multipleTriggerFn(
        (...args: Parameters<T>): ReturnType<T> =>
          fnRef.current.apply(fnRef.current, args),
        options,
      ),
    [fnRef, options],
  );

  return {
    run: multipleTriggered.run,
    cancel: multipleTriggered.cancel,
  };
}

export default useMultipleTrigger;
