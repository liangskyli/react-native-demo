import { colors, fonts } from '@/theme/config.ts';
import { gutters, layout } from '@/theme/index.ts';
import { useErrorBoundary } from 'react-error-boundary';
import { Text, TouchableOpacity, View } from 'react-native';

type Properties = {
  readonly onReset?: () => void;
};

function DefaultError({ onReset = undefined }: Properties) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <View
      style={[
        layout.flex_1,
        layout.justifyCenter,
        layout.itemsCenter,
        gutters.gap_16,
        gutters.padding_16,
      ]}
    >
      <Text style={[colors.gray800, fonts.bold, fonts.size_16]}>
        糟糕！出问题了。
      </Text>
      <Text style={[colors.gray800, fonts.size_12, fonts.alignCenter]}>
        很抱歉给您带来不便。请稍后再试。
      </Text>

      {onReset ? (
        <TouchableOpacity
          onPress={() => {
            resetBoundary();
            onReset();
          }}
        >
          <Text style={[colors.gray800, fonts.size_16]}>重新加载</Text>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
}

export default DefaultError;
