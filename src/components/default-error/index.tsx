import Icon from '@/components/icon';
import { useErrorBoundary } from 'react-error-boundary';
import { Text, TouchableOpacity, View } from 'react-native';

type Properties = {
  readonly onReset?: () => void;
};

function DefaultError({ onReset = undefined }: Properties) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <View className="flex-1 items-center justify-center gap-[16] p-[16]">
      <Icon path="404" className="h-[242px] w-[300px]" />
      <Text className="text-[16px] font-bold text-gray-700">
        糟糕！出问题了。
      </Text>
      <Text className="text-center text-[12px] text-gray-700">
        很抱歉给您带来不便。请稍后再试。
      </Text>

      {onReset ? (
        <TouchableOpacity
          onPress={() => {
            resetBoundary();
            onReset();
          }}
        >
          <Text className="text-[16px] text-gray-700">重新加载</Text>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
}

export default DefaultError;
