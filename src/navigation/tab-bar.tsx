import { Paths } from '@/navigation/paths.ts';
import type {
  HomeTabParamList,
  ScreenRouteConfig,
} from '@/navigation/types.ts';
import HomeScreen from '@/screens/home';
import MyScreen from '@/screens/my';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { ComponentType } from 'react';

const BottomTab = createBottomTabNavigator<HomeTabParamList>();

const tabbarList: ScreenRouteConfig<
  HomeTabParamList,
  BottomTabNavigationOptions
>[] = [
  {
    name: Paths.home,
    options: { headerShown: true, title: '首页' },
    component: HomeScreen as ComponentType,
  },
  {
    name: Paths.my,
    options: { headerShown: true, title: '我的' },
    component: MyScreen as ComponentType,
  },
];
const TabBar = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      {tabbarList.map(m => {
        return <BottomTab.Screen {...m} />;
      })}
    </BottomTab.Navigator>
  );
};
export default TabBar;
