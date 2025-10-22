import Button from '@/components/button';
import SafeScreen from '@/components/safe-screen';
import { Paths } from '@/navigation/paths.ts';
import type { HomeTabScreenProps } from '@/navigation/types.ts';
import { NewAppScreen } from '@react-native/new-app-screen';
import { Text, View } from 'react-native';

const HomeScreen = (props: HomeTabScreenProps<Paths.home>) => {
  const { navigation } = props;

  return (
    <SafeScreen className="flex-1" edges={['left', 'right', 'bottom']}>
      <View className="h-[80] items-center justify-center">
        <Text>Home Screen</Text>
        <Button
          onPress={() => {
            navigation.navigate(Paths.detail, { id: '1' });
          }}
        >
          Go to Detail
        </Button>
      </View>
      <NewAppScreen />
    </SafeScreen>
  );
};

export default HomeScreen;
