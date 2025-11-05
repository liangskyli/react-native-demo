import type { LoadMoreContentProps } from '@/components/virtual-list/default-load-more-content.tsx';
import DefaultLoadMoreContent from '@/components/virtual-list/default-load-more-content.tsx';
import type { FlashListProps, FlashListRef } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import type { ReactNode, Ref } from 'react';
import React, { useCallback, useRef, useState } from 'react';

export type VirtualListProps<T> = FlashListProps<T> & {
  /** 顶部加载更多回调,用于向前分页加载 */
  loadMoreTop?: (isRetry: boolean) => Promise<void>;
  /** 顶部是否还有更多内容 */
  hasMoreTop?: boolean;
  /** 底部加载更多回调 */
  loadMoreBottom?: (isRetry: boolean) => Promise<void>;
  /** 底部是否还有更多内容 */
  hasMoreBottom?: boolean;
  /** 列表ref */
  ref?: FlashListRef<T>;
  /** 自定义渲染加载更多内容（顶部和底部） */
  loadMoreContent?: (props: LoadMoreContentProps) => ReactNode;
};

const VirtualList = <T = any,>(props: VirtualListProps<T>) => {
  const {
    loadMoreTop,
    hasMoreTop,
    loadMoreBottom,
    hasMoreBottom,
    ListHeaderComponent,
    ListFooterComponent,
    onEndReached,
    ref,
    onStartReached,
    loadMoreContent = loadMoreContentProps => (
      <DefaultLoadMoreContent {...loadMoreContentProps} />
    ),
    ...otherProps
  } = props;

  const loadingTopRef = useRef(false);
  const [failedTop, setFailedTop] = useState(false);

  const doLoadMoreTop = useCallback(
    async (isRetry: boolean) => {
      setFailedTop(false);
      if (!hasMoreTop || loadingTopRef.current) {
        return;
      }
      loadingTopRef.current = true;
      try {
        await loadMoreTop?.(isRetry);
      } catch (error) {
        console.error('loadMoreTop error:', error);
      }
      loadingTopRef.current = false;
    },
    [hasMoreTop, loadMoreTop],
  );
  const innerOnStartReached = async () => {
    onStartReached?.();
    await doLoadMoreTop(false);
  };

  const loadingBottomRef = useRef(false);
  const [failed, setFailed] = useState(false);

  const doLoadMore = useCallback(
    async (isRetry: boolean) => {
      setFailed(false);
      if (!hasMoreBottom || loadingBottomRef.current) {
        return;
      }
      loadingBottomRef.current = true;
      try {
        await loadMoreBottom?.(isRetry);
      } catch (error) {
        console.error('loadMoreBottom error:', error);
      }
      loadingBottomRef.current = false;
    },
    [hasMoreBottom, loadMoreBottom],
  );
  const innerOnEndReached = async () => {
    onEndReached?.();
    await doLoadMore(false);
  };

  const innerListHeaderComponent = () => {
    return (
      <>
        {ListHeaderComponent}
        {loadingTopRef.current &&
          loadMoreContent({
            failed: failedTop,
            retry: () => doLoadMoreTop(true),
          })}
      </>
    );
  };

  const innerListFooterComponent = () => {
    if (loadingBottomRef.current) {
      return (
        <>
          {loadMoreContent({
            failed: failed,
            retry: () => doLoadMore(true),
          })}
        </>
      );
    }
    if (ListFooterComponent && typeof ListFooterComponent === 'function') {
      return <ListFooterComponent />;
    }

    return <>{ListFooterComponent}</>;
  };

  return (
    <FlashList
      {...otherProps}
      ref={ref as Ref<FlashListRef<T>> | undefined}
      onStartReached={innerOnStartReached}
      onEndReached={innerOnEndReached}
      ListHeaderComponent={innerListHeaderComponent}
      ListFooterComponent={innerListFooterComponent}
    />
  );
};

export default VirtualList;
