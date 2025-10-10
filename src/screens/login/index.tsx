import Button from '@/components/button';
import SafeScreen from '@/components/safe-screen';
import { useUserStore } from '@/store/modules/use-user-store.ts';
import { Text, View } from 'react-native';

const LoginScreen = () => {
  const { saveLoginData } = useUserStore();
  return (
    <SafeScreen className="flex-1 items-center justify-between">
      <Text>This is top text.</Text>
      <View className="items-center gap-1">
        <Text>login Screen</Text>
        <Button
          title="Login"
          onPress={() => {
            saveLoginData({
              accessToken: 'accessToken',
              userInfo: { userId: '1' },
            });
          }}
        />
      </View>
      <Text>This is bottom text.</Text>
    </SafeScreen>
  );
};

export default LoginScreen;
