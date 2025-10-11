import type { Paths } from '@/navigation/paths.ts';
import type { RootNativeStackScreenProps } from '@/navigation/types.ts';
import List1 from '@/screens/virtual-list/list1.tsx';
import List2 from '@/screens/virtual-list/list2.tsx';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VirtualList = (props: RootNativeStackScreenProps<Paths.virtualList>) => {
  const { route } = props;
  const type = route.params.type;
  return (
    <SafeAreaView className="flex-1" edges={['left', 'right', 'bottom']}>
      {/* 标题栏 */}
      <View className="items-center bg-blue-500 p-3">
        <Text className="text-lg font-bold color-white">VirtualList 演示</Text>
        <Text className="text-sm text-white opacity-80">
          {type === 'list1'
            ? '列表分页滚动:下拉刷新，上拉加载更多'
            : '聊天消息滚动:下拉加载更多'}
        </Text>
      </View>

      {/* 虚拟列表 */}
      {type === 'list1' ? <List1 /> : <List2 />}
    </SafeAreaView>
  );
};
export default VirtualList;
