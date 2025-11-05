import { LoadingIcon } from '@/components/loading';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type LoadMoreContentProps = {
  hasMore?: boolean;
  failed: boolean;
  retry: () => void;
};

const DefaultLoadMoreContent = (props: LoadMoreContentProps) => {
  const { failed, retry } = props;
  if (props.hasMore === false) {
    return (
      <View className="h-10 items-center justify-center">
        <Text className="text-sm text-gray-500">没有更多数据了</Text>
      </View>
    );
  }

  return (
    <View className="h-10 items-center justify-center">
      {failed ? (
        <View className="flex-row">
          <Text>加载失败</Text>
          <Pressable onPress={() => retry()}>
            <Text className="ml-2 text-blue-500">重新加载</Text>
          </Pressable>
        </View>
      ) : (
        <LoadingIcon visibleAnimated className="size-5 text-gray-500" />
      )}
    </View>
  );
};
export default DefaultLoadMoreContent;
