import SafeScreen from '@/components/safe-screen';
import type { RootStackNavigationProp } from '@/navigation/types.ts';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, StyleSheet, Text } from 'react-native';

const DetailScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <SafeScreen style={styles.container} edges={['right', 'bottom', 'left']}>
      <Text>Detail Screen</Text>
      <Button
        title="Go back"
        onPress={() => {
          navigation.pop();
        }}
      />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailScreen;
