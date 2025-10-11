import Button from '@/components/button';
import type { VirtualListProps } from '@/components/virtual-list';
import VirtualList from '@/components/virtual-list';
import { useRef, useState } from 'react';
import { Text, View } from 'react-native';

// 定义消息数据类型
type ListItem = {
  id: string;
  type: 'text';
  content: string;
  timestamp: number;
  user: {
    id: string;
    name: string;
  };
};

// 生成模拟数据
function generateMessages(startId: number, count: number): ListItem[] {
  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;

    // 生成不同长度的内容
    const contentLength = Math.floor(Math.random() * 15) + 1;
    const content = `这是消息 #${id}。${'内容 '.repeat(contentLength)}`;
    const isMyInfo = Math.floor(Math.random() * 10) % 10 === 1;
    return {
      id: `msg-${id}`,
      type: 'text',
      content,
      timestamp: Date.now() - (count - i) * 60000,
      user: {
        id: isMyInfo ? 'id1' : 'id2',
        name: isMyInfo ? 'name1' : 'name2',
      },
    };
  });
}

export default function List2() {
  // 初始化数据：从 ID 100 开始，生成 20 条消息
  const [messages, setMessages] = useState<ListItem[]>(() =>
    generateMessages(100, 20),
  );
  const listRef = useRef<VirtualListProps<ListItem>['ref'] | null>(null);

  const [loadingMoreTop, setLoadingMoreTop] = useState(false);
  const [hasMoreTop, setHasMoreTop] = useState(true);

  // 加载更多（顶部）
  const handleLoadMoreTop = async () => {
    if (loadingMoreTop || !hasMoreTop) return;

    console.log('⬆️ 加载更多（顶部）');
    setLoadingMoreTop(true);

    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 获取当前最早消息的 ID
    const firstId = parseInt(messages[0].id.replace('msg-', ''), 10);
    console.log('firstId:', firstId, messages);
    // 模拟没有更早的消息
    if (firstId <= 80) {
      setHasMoreTop(false);
      console.log('✅ 没有更早的消息了（顶部）');
      return;
    }

    const olderMessages = generateMessages(firstId - 10, 10);
    setMessages([...olderMessages, ...messages]);
    setLoadingMoreTop(false);
  };

  return (
    <>
      {/* 统计信息 */}
      <View className="border-b border-gray-200 bg-white p-2">
        <Text className="text-center text-xs text-gray-600">
          消息数: {messages.length} | 顶部: {hasMoreTop ? '有更多' : '无'}
        </Text>
      </View>

      <VirtualList
        ref={listRef as any}
        keyExtractor={item => item.id}
        data={messages}
        renderItem={item => <ItemView item={item.item} />}
        maintainVisibleContentPosition={{
          startRenderingFromBottom: true,
          autoscrollToBottomThreshold: 0.2,
        }}
        // 顶部加载更多
        loadMoreTop={handleLoadMoreTop}
        hasMoreTop={hasMoreTop}
        getItemType={item => {
          return item.type;
        }}
      />
      <View>
        <Button
          title="add"
          onPress={() => {
            setMessages([
              ...messages,
              {
                id: `id-${messages.length}`,
                type: 'text',
                content: `新内容${messages.length}`,
                timestamp: Date.now(),
                user: {
                  id: 'id1',
                  name: 'name1',
                },
              },
            ]);
          }}
        />
      </View>
    </>
  );
}

const ItemView = ({ item }: { item: ListItem }) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  switch (item.type) {
    case 'text':
    default:
      return (
        <View
          className={`${item.user.id === 'id1' ? 'items-end' : 'items-start'} border-b border-red-400 bg-white p-3`}
        >
          <View className="mb-2">
            <Text className="text-xs">{formatTime(item.timestamp)}</Text>
          </View>
          <View className="max-w-[80%] rounded-lg bg-gray-100 p-3">
            <Text className="text-sm color-gray-600">{item.content}</Text>
          </View>
          <Text className="text-right text-xs text-gray-400">#{item.id}</Text>
        </View>
      );
  }
};
