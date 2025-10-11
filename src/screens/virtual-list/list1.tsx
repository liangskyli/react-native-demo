import VirtualList from '@/components/virtual-list';
import { useState } from 'react';
import { Text, View } from 'react-native';

type ListItem = {
  id: string;
  type: 'item';
  content: string;
  timestamp: number;
};

// 生成模拟数据
function generateMessages(startId: number, count: number): ListItem[] {
  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;

    // 生成不同长度的内容
    const contentLength = Math.floor(Math.random() * 15) + 1;
    const content = `这是消息 #${id}。${'内容 '.repeat(contentLength)}`;

    return {
      id: `msg-${id}`,
      type: 'item',
      content,
      timestamp: Date.now() - (count - i) * 60000,
    };
  });
}

export default function List1() {
  // 初始化数据：从 ID 100 开始，生成 20 条消息
  const [messages, setMessages] = useState<ListItem[]>(() =>
    generateMessages(100, 20),
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 下拉刷新
  const handleRefresh = async () => {
    console.log('🔄 下拉刷新');
    setRefreshing(true);

    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 重新加载数据
    const newMessages = generateMessages(100, 20);
    setMessages(newMessages);
    setHasMore(true);
    setRefreshing(false);
    setLoadingMore(false);
  };

  // 加载更多（底部）
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;

    console.log('⬇️ 加载更多（底部）');
    setLoadingMore(true);

    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 获取当前最新消息的 ID
    const lastId = parseInt(
      messages[messages.length - 1].id.replace('msg-', ''),
      10,
    );
    console.log('lastId:', lastId);
    // 模拟没有更多数据
    if (lastId >= 150) {
      setHasMore(false);
      console.log('✅ 没有更多数据了（底部）');
      return;
    }
    const newerMessages = generateMessages(lastId + 1, 10);

    setMessages([...messages, ...newerMessages]);

    setLoadingMore(false);
  };

  return (
    <>
      {/* 统计信息 */}
      <View className="border-b border-gray-200 bg-white p-2">
        <Text className="text-center text-xs text-gray-600">
          消息数: {messages.length} | 底部: {hasMore ? '有更多' : '无'}
        </Text>
      </View>

      <VirtualList
        keyExtractor={item => item.id}
        data={messages}
        renderItem={item => <ItemView item={item.item} />}
        // 下拉刷新
        onRefresh={handleRefresh}
        refreshing={refreshing}
        // 底部加载更多
        loadMoreBottom={handleLoadMore}
        hasMoreBottom={hasMore}
      />
    </>
  );
}

const ItemView = ({ item }: { item: ListItem }) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  switch (item.type) {
    case 'item':
    default:
      return (
        <View className="border-b border-red-400 bg-white p-3">
          <View className="mb-2">
            <Text className="text-xs">{formatTime(item.timestamp)}</Text>
          </View>
          <View className="rounded-lg bg-gray-100 p-3">
            <Text className="text-sm color-gray-600">{item.content}</Text>
          </View>
          <Text className="text-right text-xs text-gray-400">#{item.id}</Text>
        </View>
      );
  }
};
