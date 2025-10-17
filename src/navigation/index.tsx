import Loading from '@/components/loading';
import { Paths } from '@/navigation/paths.ts';
import LaunchScreen from '@/screens/launch';
import { useAjaxLoadingStore } from '@/store';
import { useUserStore } from '@/store/modules/use-user-store.ts';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  commonScreenRouteConfigList,
  hasLoginScreenRouteConfigList,
  noLoginScreenRouteConfigList,
} from './router.ts';
import type { RootNativeStackParamList } from './types.ts';

const RootNativeStack = createNativeStackNavigator<RootNativeStackParamList>();

const ApplicationNavigator = () => {
  const { isLoading } = useAjaxLoadingStore();
  const { isLogin, isLaunched } = useUserStore();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DefaultTheme}>
        <RootNativeStack.Navigator
          screenOptions={{
            headerBackButtonDisplayMode: 'minimal',
            headerTitleAlign: 'center',
          }}
          layout={({ children }) => (
            <>
              <Loading visible={isLoading} />
              {children}
            </>
          )}
        >
          {isLaunched ? (
            <>
              {isLogin ? (
                <>
                  {hasLoginScreenRouteConfigList.map(m => {
                    return <RootNativeStack.Screen {...m} />;
                  })}
                </>
              ) : (
                <>
                  {noLoginScreenRouteConfigList.map(m => {
                    return <RootNativeStack.Screen {...m} />;
                  })}
                </>
              )}

              {commonScreenRouteConfigList.map(m => {
                return <RootNativeStack.Screen {...m} />;
              })}
            </>
          ) : (
            <RootNativeStack.Screen
              name={Paths.launch}
              component={LaunchScreen}
              options={{ headerShown: false }}
            />
          )}
        </RootNativeStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default ApplicationNavigator;
