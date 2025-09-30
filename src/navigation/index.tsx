import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { otherList } from './router.ts';
import type { RootStackParamList } from './types.ts';

const Stack = createStackNavigator<RootStackParamList>();

const ApplicationNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator>
          {/*<Stack.Screen component={Startup} name={Paths.Startup} />*/}
          {/*其它没有 TabBar 页面路由*/}
          {otherList.map(m => {
            return (
              <Stack.Screen
                name={m.path}
                component={m.component}
                options={{ ...m.options }}
                key={m.path}
              />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
