import { commonRouteList } from '@/navigation/router/common.ts';
import { loggedInRouteList } from '@/navigation/router/logged-in.ts';
import { notLoggedInRouteList } from '@/navigation/router/not-logged-in.ts';
import { useUserStore } from '@/store/modules/use-user-store.ts';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootNativeStackParamList } from './types.ts';

const RootNativeStack = createNativeStackNavigator<RootNativeStackParamList>();

const ApplicationNavigator = () => {
  const { isLogin } = useUserStore();

  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootNativeStack.Navigator
        screenOptions={{
          headerBackButtonDisplayMode: 'minimal',
          headerTitleAlign: 'center',
        }}
      >
        {isLogin ? (
          <>
            {loggedInRouteList.map(m => {
              return <RootNativeStack.Screen {...m} />;
            })}
          </>
        ) : (
          <>
            {notLoggedInRouteList.map(m => {
              return <RootNativeStack.Screen {...m} />;
            })}
          </>
        )}
        {commonRouteList.map(m => {
          return <RootNativeStack.Screen {...m} />;
        })}
      </RootNativeStack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
