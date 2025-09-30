import SafeScreen from '@/components/safe-screen';
import { Paths } from '@/navigation/paths.ts';
import type { RootScreenProps } from '@/navigation/types.ts';
import { NewAppScreen } from '@react-native/new-app-screen';
import { Button, StyleSheet, Text, View } from 'react-native';

const HomeScreen = (props: RootScreenProps<Paths.home>) => {
  const { navigation } = props;

  return (
    <SafeScreen style={styles.container}>
      <View style={styles.header}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Detail"
          onPress={() => {
            navigation.push(Paths.detail);
          }}
        />
      </View>
      <NewAppScreen />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
