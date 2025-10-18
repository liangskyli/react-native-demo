import AssetsImage from '@/components/assets-image';
import Button from '@/components/button';
import SafeScreen from '@/components/safe-screen';
import type { Paths } from '@/navigation/paths.ts';
import type { RootNativeStackScreenProps } from '@/navigation/types.ts';
import { requestApi } from '@/services/gen-example/schema-api/request-api.ts';
import { Text, View } from 'react-native';

const DetailScreen = (props: RootNativeStackScreenProps<Paths.detail>) => {
  const { navigation, route } = props;

  return (
    <SafeScreen
      className="flex-1 items-center justify-between"
      edges={['left', 'right', 'bottom']}
    >
      <Text>This is top text.</Text>
      <View className="items-center gap-1">
        <Text>Detail Screen:{route.params.id}</Text>
        <AssetsImage path="tom" className="h-[80] w-[100]" />
        <Button
          title="Go back"
          onPress={() => {
            navigation.pop();
          }}
        />
        <Button
          title="get axios data"
          onPress={async () => {
            await requestApi['/v1/building/get-list'].get({
              params: { activityId: 1 },
            });
          }}
        />
      </View>
      <Text>This is bottom text.</Text>
    </SafeScreen>
  );
};

export default DetailScreen;
