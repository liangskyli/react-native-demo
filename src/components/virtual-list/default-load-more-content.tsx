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
      <View className="h-[40px] items-center justify-center">
        <Text className="text-sm text-gray-500">没有更多数据了</Text>
      </View>
    );
  }

  return (
    <View className="h-[40px] items-center justify-center">
      {failed ? (
        <View className="flex-row">
          <Text>加载失败</Text>
          <Pressable onPress={() => retry()}>
            <Text className="ml-2 text-blue-500">重新加载</Text>
          </Pressable>
        </View>
      ) : (
        <Text className="text-sm text-gray-500">加载中...</Text>
      )}
    </View>
  );
};
export default DefaultLoadMoreContent;
